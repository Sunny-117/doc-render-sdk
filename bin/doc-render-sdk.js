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
 * 创建组件目录结构
 */
function createComponentStructure(projectDir) {
  const components = ['button', 'input', 'card'];
  
  components.forEach(comp => {
    const compDir = path.join(projectDir, 'components', comp, 'demo');
    fs.mkdirSync(compDir, { recursive: true });
    
    // 创建 demo 文件
    createDemoFiles(projectDir, comp);
  });
}

/**
 * 创建 demo 文件
 */
function createDemoFiles(projectDir, componentName) {
  const demos = {
    button: {
      basic: `import React from 'react';
import { Button } from 'antd';

export default function BasicButton() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </div>
  );
}`,
      sizes: `import React from 'react';
import { Button } from 'antd';

export default function ButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="large">Large</Button>
      <Button>Default</Button>
      <Button size="small">Small</Button>
    </div>
  );
}`
    },
    input: {
      basic: `import React from 'react';
import { Input } from 'antd';

export default function BasicInput() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Input placeholder="Basic usage" />
      <Input placeholder="Disabled" disabled />
      <Input.Password placeholder="Password" />
    </div>
  );
}`
    },
    card: {
      basic: `import React from 'react';
import { Card } from 'antd';

export default function BasicCard() {
  return (
    <Card title="Card Title" style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}`
    }
  };

  const componentDemos = demos[componentName] || {};
  
  Object.entries(componentDemos).forEach(([demoName, content]) => {
    const demoPath = path.join(projectDir, 'components', componentName, 'demo', `${demoName}.jsx`);
    fs.writeFileSync(demoPath, content);
  });
}

/**
 * 创建 Vite 配置
 */
function createViteConfig(projectDir) {
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { createDemoCodePlugin } from 'doc-render-sdk/plugin';

export default defineConfig({
  plugins: [
    react(),
    createDemoCodePlugin({
      include: 'index.js',
      demoPattern: '/demo/',
      globalVar: 'window.__DOC_SDK_DEMO_CODES__',
      debug: process.env.NODE_ENV === 'development',
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
`;

  fs.writeFileSync(path.join(projectDir, 'vite.config.js'), viteConfig);
}

/**
 * 创建入口文件
 */
function createIndexFile(projectDir) {
  const indexJs = `import DocSDK from 'doc-render-sdk';

// Button 组件 demos
import buttonBasic from './components/button/demo/basic.jsx';
import buttonSizes from './components/button/demo/sizes.jsx';

// Input 组件 demos
import inputBasic from './components/input/demo/basic.jsx';

// Card 组件 demos
import cardBasic from './components/card/demo/basic.jsx';

// 注册全局组件
window.__DOC_SDK_DEMOS__ = {
  'button': {
    'basic': buttonBasic,
    'sizes': buttonSizes,
  },
  'input': {
    'basic': inputBasic,
  },
  'card': {
    'basic': cardBasic,
  },
};

// Demo 源码将由 vite-plugin-demo-code 自动注入

// 注册 API 文档
window.__DOC_SDK_APIS__ = {
  'button': {
    'Button': [
      {
        param: 'type',
        type: 'string',
        desc: '按钮类型',
        option: 'default | primary | dashed | text | link',
        default: 'default',
        required: false
      },
      {
        param: 'size',
        type: 'string',
        desc: '按钮尺寸',
        option: 'small | middle | large',
        default: 'middle',
        required: false
      },
      {
        param: 'disabled',
        type: 'boolean',
        desc: '是否禁用',
        option: 'true | false',
        default: 'false',
        required: false
      },
      {
        param: 'onClick',
        type: 'function',
        desc: '点击事件回调',
        option: '(event) => void',
        default: '-',
        required: false
      },
    ]
  },
  'input': {
    'Input': [
      {
        param: 'value',
        type: 'string',
        desc: '输入框的值',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'placeholder',
        type: 'string',
        desc: '占位文本',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'disabled',
        type: 'boolean',
        desc: '是否禁用',
        option: 'true | false',
        default: 'false',
        required: false
      },
      {
        param: 'onChange',
        type: 'function',
        desc: '值变化时的回调',
        option: '(e) => void',
        default: '-',
        required: false
      },
    ]
  },
  'card': {
    'Card': [
      {
        param: 'title',
        type: 'string | ReactNode',
        desc: '卡片标题',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'bordered',
        type: 'boolean',
        desc: '是否有边框',
        option: 'true | false',
        default: 'true',
        required: false
      },
      {
        param: 'children',
        type: 'ReactNode',
        desc: '卡片内容',
        option: '-',
        default: '-',
        required: false
      },
    ]
  },
};

// 创建文档SDK实例
const docSdk = new DocSDK({
  title: 'My Component Library',
  description: '基于 Doc SDK 构建的组件文档',
  version: '1.0.0',
  
  theme: {
    name: 'default',
    colors: {
      primary: '#1890ff'
    }
  },
  
  layout: {
    type: 'sidebar',
    sidebar: {
      width: 280,
      collapsible: true
    }
  },
  
  components: {
    'button': {
      label: 'Button 按钮',
      description: '按钮用于触发一个操作',
      group: '基础组件',
      demos: [
        {
          title: '按钮类型',
          desc: '按钮有五种类型：默认按钮、主要按钮、虚线按钮、文本按钮和链接按钮',
          source: 'basic'
        },
        {
          title: '按钮尺寸',
          desc: '按钮有三种尺寸：大、中、小',
          source: 'sizes'
        }
      ],
      apis: [
        {
          title: 'Button Props',
          apiKey: 'Button'
        }
      ]
    },
    'input': {
      label: 'Input 输入框',
      description: '通过鼠标或键盘输入内容',
      group: '表单组件',
      demos: [
        {
          title: '基础用法',
          desc: '基础的输入框用法',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Input Props',
          apiKey: 'Input'
        }
      ]
    },
    'card': {
      label: 'Card 卡片',
      description: '通用卡片容器',
      group: '数据展示',
      demos: [
        {
          title: '基础卡片',
          desc: '包含标题、内容的基础卡片',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Card Props',
          apiKey: 'Card'
        }
      ]
    },
  },
  
  installation: \`# 使用 npm
npm install my-component-library

# 使用 yarn
yarn add my-component-library

# 使用 pnpm
pnpm add my-component-library\`,
  
  usage: \`import { Button } from 'my-component-library';

function App() {
  return <Button type="primary">Click me</Button>;
}\`,
  
  features: [
    {
      icon: '🎨',
      title: '主题定制',
      description: '支持自定义主题颜色、字体、间距等'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '完美适配桌面端和移动端'
    },
    {
      icon: '⚡',
      title: '高性能',
      description: '采用 React 18 和虚拟滚动技术'
    },
    {
      icon: '🔍',
      title: '智能搜索',
      description: '内置全文搜索功能'
    }
  ],
  
  footerLinks: [
    {
      text: 'GitHub',
      url: 'https://github.com/yourusername/your-repo',
      external: true
    }
  ]
});

// 渲染文档
docSdk.render('#app');
`;

  fs.writeFileSync(path.join(projectDir, 'index.js'), indexJs);
}

/**
 * 创建 HTML 文件
 */
function createIndexHtml(projectDir) {
  const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Component Library</title>
</head>
<body>
  <div id="app"></div>
  <script src="index.js" type="module"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(projectDir, 'index.html'), indexHtml);
}

/**
 * 创建 README
 */
function createReadme(projectDir) {
  const readme = `# ${path.basename(projectDir)}

基于 Doc SDK 构建的组件文档站点。

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
\`\`\`

## 项目结构

\`\`\`
${path.basename(projectDir)}/
├── components/          # 组件目录
│   ├── button/
│   │   └── demo/       # Button 组件示例
│   ├── input/
│   │   └── demo/       # Input 组件示例
│   └── card/
│       └── demo/       # Card 组件示例
├── index.html          # HTML 入口
├── index.js            # JS 入口
├── vite.config.js      # Vite 配置
└── package.json
\`\`\`

## 添加新组件

1. 在 \`components/\` 目录下创建组件文件夹
2. 在 \`components/your-component/demo/\` 下创建示例文件
3. 在 \`index.js\` 中注册组件和 API 文档

## 文档

- [Doc SDK 文档](https://github.com/Sunny-117/doc-render-sdk)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
`;

  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
}

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
    type: 'module',
    main: 'index.js',
    scripts: {
      dev: 'doc-render-sdk dev',
      build: 'doc-render-sdk build',
      preview: 'doc-render-sdk preview'
    },
    dependencies: {
      'doc-render-sdk': `^${sdkVersion}`,
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'antd': '6.0.0-alpha.3'
    },
    devDependencies: {
      'vite': '7.1.8',
      '@vitejs/plugin-react': '5.0.4'
    }
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // 创建组件目录结构
  createComponentStructure(projectDir);

  // 生成 vite.config.js
  createViteConfig(projectDir);

  // 生成入口文件
  createIndexFile(projectDir);

  // 生成HTML文件
  createIndexHtml(projectDir);

  // 生成README
  createReadme(projectDir);
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
async function startDevServer(configPath, options) {
  try {
    const { createServer } = require('vite');
    const react = require('@vitejs/plugin-react');
    
    // 尝试加载 doc-render-sdk 插件
    let demoPlugin = null;
    try {
      const { createDemoCodePlugin } = require('doc-render-sdk/plugin');
      demoPlugin = createDemoCodePlugin({
        include: 'index.js',
        demoPattern: '/demo/',
        globalVar: 'window.__DOC_SDK_DEMO_CODES__',
        debug: true,
      });
    } catch (err) {
      console.warn('⚠️  未找到 doc-render-sdk 插件，将跳过 demo 代码注入功能');
    }

    const plugins = [react()];
    if (demoPlugin) {
      plugins.push(demoPlugin);
    }

    const server = await createServer({
      root: process.cwd(),
      server: {
        port: Number(options.port) || 3000,
        host: options.host || 'localhost',
        open: true
      },
      plugins
    });

    await server.listen();
    server.printUrls();
    
    console.log('\n✨ 开发服务器已启动！');
  } catch (err) {
    console.error('❌ 启动开发服务器失败:', err);
    process.exit(1);
  }
}

/**
 * 构建项目
 */
async function buildProject(configPath, options) {
  try {
    const { build } = require('vite');
    const react = require('@vitejs/plugin-react');
    const outDir = options.output || 'dist';

    // 尝试加载 doc-render-sdk 插件
    let demoPlugin = null;
    try {
      const { createDemoCodePlugin } = require('doc-render-sdk/plugin');
      demoPlugin = createDemoCodePlugin({
        include: 'index.js',
        demoPattern: '/demo/',
        globalVar: 'window.__DOC_SDK_DEMO_CODES__',
        debug: false,
      });
    } catch (err) {
      console.warn('⚠️  未找到 doc-render-sdk 插件，将跳过 demo 代码注入功能');
    }

    const plugins = [react()];
    if (demoPlugin) {
      plugins.push(demoPlugin);
    }

    console.log('📦 开始构建...');

    await build({
      root: process.cwd(),
      build: {
        outDir
      },
      plugins
    });

    console.log('✅ 构建完成!');
    console.log(`📁 输出目录: ${outDir}`);
  } catch (err) {
    console.error('❌ 构建失败:', err);
    process.exit(1);
  }
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
async function previewBuild(options) {
  try {
    const { preview } = require('vite');
    const port = Number(options.port) || 3000;

    console.log('👀 启动预览服务器...');

    const server = await preview({
      root: process.cwd(),
      preview: {
        port,
        open: true
      }
    });

    server.printUrls();
    console.log('\n✨ 预览服务器已启动！');
  } catch (err) {
    console.error('❌ 启动预览服务器失败:', err);
    process.exit(1);
  }
}