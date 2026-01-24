#!/usr/bin/env node

/**
 * Doc SDK CLI 工具
 */
const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const sdkVersion = require('../package.json').version;
program
  .name('doc-render-sdk')
  .description('Doc SDK CLI - 文档站点构建工具')
  .version('1.0.0');

// 创建新项目
program
  .command('create <project-name>')
  .description('创建新的文档项目')
  .option('-t, --template <template>', '使用模板', 'default')
  .action(async (projectName, options) => {
    console.log(`🚀 创建文档项目: ${projectName}`);
    
    const projectDir = path.resolve(projectName);
    
    if (fs.existsSync(projectDir)) {
      console.error(`❌ 目录已存在: ${projectDir}`);
      process.exit(1);
    }

    try {
      await createProject(projectDir, options.template);
      console.log('✅ 项目创建成功!');
      console.log(`📁 项目目录: ${projectDir}`);
      console.log('\n下一步:');
      console.log(`  cd ${projectName}`);
      console.log('  npm install');
      console.log('  npm run dev');
    } catch (error) {
      console.error('❌ 创建失败:', error.message);
      process.exit(1);
    }
  });

// 开发服务器
program
  .command('dev')
  .description('启动开发服务器')
  .option('-p, --port <port>', '端口号', '8080')
  .option('-h, --host <host>', '主机地址', 'localhost')
  .action(async (options) => {
    console.log('🚀 启动开发服务器...');
    
    const configPath = findConfig();
    if (!configPath) {
      console.error('❌ 未找到配置文件');
      process.exit(1);
    }

    await startDevServer(configPath, options);
  });

// 构建项目
program
  .command('build')
  .description('构建文档站点')
  .option('-o, --output <dir>', '输出目录', 'dist')
  .action(async (options) => {
    console.log('📦 构建文档站点...');
    
    const configPath = findConfig();
    if (!configPath) {
      console.error('❌ 未找到配置文件');
      process.exit(1);
    }

    await buildProject(configPath, options);
  });


// 预览构建结果
program
  .command('preview')
  .description('预览构建结果')
  .option('-p, --port <port>', '端口号', '3000')
  .option('-d, --dir <dir>', '构建目录', 'dist')
  .action((options) => {
    console.log('👀 预览构建结果...');
    previewBuild(options);
  });

program.parse();

/**
 * 创建新项目
 */
async function createProject(projectDir, template) {
  // 创建项目目录
  fs.mkdirSync(projectDir, { recursive: true });

  // 生成package.json
  const packageJson = {
    name: path.basename(projectDir),
    version: '1.0.0',
    description: 'Documentation site built with Doc SDK',
    main: 'index.jsx',
      scripts: {
        dev: 'doc-render-sdk dev',
        build: 'doc-render-sdk build',
        // TODO
        // preview: 'doc-render-sdk preview'
      },
      dependencies: {
        'doc-render-sdk': sdkVersion,
         "react": "^18.2.0",
         "react-dom": "^18.2.0"
      },
      devDependencies: {
        vite: '^5.0.0',
        '@vitejs/plugin-react': '^3.1.0'
      }
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // 生成配置文件
  const config = {
    title: 'My Documentation',
    description: 'Component documentation built with Doc SDK',
    version: '1.0.0',
    components: {
      'example': {
        label: 'Example Component',
        description: 'An example component to get you started',
        demos: [
          {
            title: 'Basic Usage',
            desc: 'Basic usage of the component',
            source: 'basic'
          }
        ],
        apis: [
          {
            title: 'Example',
            apiKey: 'Example'
          }
        ]
      }
    }
  };

  fs.writeFileSync(
    path.join(projectDir, 'doc.config.js'),
    `export default ${JSON.stringify(config, null, 2)};`
  );

  // 生成入口文件
  const indexJs = `import DocSDK from 'doc-render-sdk';
import config from './doc.config.js';

// 注册示例组件
const ExampleComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Example Component</h3>
      <p>This is an example component.</p>
    </div>
  );
};

// 注册全局组件
window.__DOC_SDK_DEMOS__ = {
  'example': {
    'basic': ExampleComponent
  }
};

window.__DOC_SDK_DEMO_CODES__ = {
  'example': {
    'basic': \`const ExampleComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Example Component</h3>
      <p>This is an example component.</p>
    </div>
  );
};\`
  }
};

window.__DOC_SDK_APIS__ = {
  'example': {
    'Example': [
      {
        param: 'children',
        type: 'ReactNode',
        desc: 'The content of the component',
        option: '',
        default: '',
        required: false
      }
    ]
  }
};

const docSdk = new DocSDK(config);
docSdk.render('#app');
`;

  fs.writeFileSync(path.join(projectDir, 'index.jsx'), indexJs);

  // 生成HTML文件
  const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Documentation</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script src="index.jsx" type="module"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(projectDir, 'index.html'), indexHtml);

  // 生成README
  const readme = `# ${path.basename(projectDir)}

Documentation site built with Doc SDK.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview build

## Documentation

- [Doc SDK Documentation](https://github.com/Sunny-117/doc-render-sdk)
`;

  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
}

/**
 * 查找配置文件
 */
function findConfig() {
  const configFiles = [
    'doc.config.js',
    'doc.config.json',
    'docs.config.js',
    'docs.config.json'
  ];

  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      return path.resolve(file);
    }
  }

  return null;
}

/**
 * 启动开发服务器
 */
function startDevServer(configPath, options) {
  // Use Vite Node API to create a dev server via createViteServer
  (async () => {
    try {
      const server = await createViteServer({
        root: process.cwd(),
        server: {
          port: Number(options.port) || 8080,
          host: options.host || 'localhost'
        },
        plugins: createVitePlugins()
      });

      await server.listen();
      server.printUrls();
    } catch (err) {
      console.error('❌ 启动 Vite 开发服务器失败:', err);
      process.exit(1);
    }
  })();
}

/**
 * 构建项目
 */
function buildProject(configPath, options) {
  // Use Vite build API with plugin-react
  (async () => {
    try {
      const { build } = require('vite');
      const outDir = options.output || 'dist';

      console.log('📦 running vite build...');

      await build({
        root: process.cwd(),
        build: {
          outDir
        },
        plugins: createVitePlugins()
      });

      console.log('✅ 构建完成!');
    } catch (err) {
      console.error('❌ Vite 构建失败:', err);
      process.exit(1);
    }
  })();
}

/**
 * Create Vite server with shared plugins
 */
function createViteServer(options = {}) {
  const { createServer } = require('vite');
  const plugins = createVitePlugins();
  return createServer({ ...options, plugins });
}

function createVitePlugins() {
  try {
    const reactPlugin = require('@vitejs/plugin-react');
    return [reactPlugin()];
  } catch (err) {
    // If plugin not installed, return empty array and let Vite warn later
    return [];
  }
}

/**
 * 预览构建结果
 */
function previewBuild(options) {
  // Use Vite programmatic preview API if available, else fallback to npx vite preview
  const distDir = options.dir || 'dist';
  const port = Number(options.port) || 3000;

  try {
    const vite = require('vite');
    if (typeof vite.preview === 'function') {
      // Vite exposes preview function in some versions
      (async () => {
        try {
          const server = await vite.preview({ root: process.cwd(), preview: { port } });
          console.log(`📖 预览地址: http://localhost:${port}`);
        } catch (err) {
          console.error('❌ 启动 Vite preview 失败:', err);
          process.exit(1);
        }
      })();
      return;
    }

    // Fallback: try to create a server configured for preview
    if (typeof vite.createServer === 'function') {
      (async () => {
        try {
          const server = await vite.createServer({ root: process.cwd(), preview: { port } });
          await server.listen();
          console.log(`📖 预览地址: http://localhost:${port}`);
        } catch (err) {
          // continue to fallback
          console.error('❌ 使用 createServer 作为 preview 启动失败，回退到 CLI:', err.message || err);
        }
      })();
      return;
    }
  } catch (err) {
    // vite not installed locally, will fallback to npx
  }

  // Final fallback: spawn npx vite preview
  const args = ['vite', 'preview', '--port', String(port)];
  const child = spawn('npx', args, { stdio: 'inherit', shell: true, cwd: process.cwd() });
  child.on('close', (code) => process.exit(code));
}