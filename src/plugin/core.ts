/**
 * Vite 插件核心逻辑
 */

import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

export interface DemoCodePluginOptions {
  /**
   * 需要处理的文件路径模式（支持正则或字符串）
   * @default 'index.js'
   */
  include?: string | RegExp;

  /**
   * Demo 文件路径匹配模式
   * @default '/demo/'
   */
  demoPattern?: string;

  /**
   * 全局变量名
   * @default 'window.__DOC_SDK_DEMO_CODES__'
   */
  globalVar?: string;

  /**
   * 自定义导入语句匹配正则
   */
  importRegex?: RegExp;

  /**
   * 自定义变量名解析函数
   * 从导入变量名解析出组件名和 demo 名
   * @example buttonBasic -> { component: 'button', demo: 'basic' }
   */
  parseVarName?: (varName: string) => { component: string; demo: string } | null;

  /**
   * 自定义代码转换函数
   * 可以对读取的源码进行处理
   */
  transform?: (code: string, filePath: string, varName: string) => string;

  /**
   * 是否开启调试模式
   * @default false
   */
  debug?: boolean;

  /**
   * 支持的文件扩展名
   * @default ['.js', '.jsx', '.ts', '.tsx']
   */
  extensions?: string[];

  /**
   * 文件编码
   * @default 'utf-8'
   */
  encoding?: BufferEncoding;

  /**
   * 注入位置标记
   * 插件会在此标记之前注入代码
   * @default 'window.__DOC_SDK_DEMOS__'
   */
  injectBefore?: string;
}

interface ParsedDemo {
  component: string;
  demo: string;
}

interface DemoImport {
  varName: string;
  importPath: string;
  fullMatch: string;
}

interface DemoCodes {
  [component: string]: {
    [demo: string]: string;
  };
}

/**
 * 默认变量名解析函数
 * 解析 camelCase 格式：buttonBasic -> { component: 'button', demo: 'basic' }
 */
const defaultParseVarName = (varName: string): ParsedDemo | null => {
  const match = varName.match(/^([a-z]+)([A-Z][a-zA-Z]*)$/);
  if (match) {
    const [, component, demo] = match;
    const demoName = demo.charAt(0).toLowerCase() + demo.slice(1);
    return { component, demo: demoName };
  }
  return null;
};

/**
 * 默认代码转换函数
 */
const defaultTransform = (code: string): string => code;

/**
 * 创建 Vite 插件
 */
export function createDemoCodePlugin(options: DemoCodePluginOptions = {}): Plugin {
  // 默认配置
  const config: Required<DemoCodePluginOptions> = {
    include: options.include ?? 'index.js',
    demoPattern: options.demoPattern ?? '/demo/',
    globalVar: options.globalVar ?? 'window.__DOC_SDK_DEMO_CODES__',
    importRegex: options.importRegex ?? /import\s+(\w+)\s+from\s+['"](.+?\/demo\/.+?\.(jsx?|tsx?))['"]/g,
    parseVarName: options.parseVarName ?? defaultParseVarName,
    transform: options.transform ?? defaultTransform,
    debug: options.debug ?? false,
    extensions: options.extensions ?? ['.js', '.jsx', '.ts', '.tsx'],
    encoding: options.encoding ?? 'utf-8',
    injectBefore: options.injectBefore ?? 'window.__DOC_SDK_DEMOS__',
  };

  // 日志函数
  const log = (...args: any[]) => {
    if (config.debug) {
      console.log('[doc-render-sdk:plugin]', ...args);
    }
  };

  const warn = (...args: any[]) => {
    console.warn('[doc-render-sdk:plugin]', ...args);
  };

  /**
   * 检查是否需要处理此文件
   */
  const shouldProcess = (id: string): boolean => {
    if (typeof config.include === 'string') {
      return id.includes(config.include);
    }
    if (config.include instanceof RegExp) {
      return config.include.test(id);
    }
    return id.includes('index.js');
  };

  /**
   * 查找所有 demo 导入
   */
  const findDemoImports = (code: string): DemoImport[] => {
    const demoImports: DemoImport[] = [];
    const importRegex = new RegExp(config.importRegex.source, config.importRegex.flags);
    let match: RegExpExecArray | null;

    while ((match = importRegex.exec(code)) !== null) {
      const [fullMatch, varName, importPath] = match;
      
      if (importPath.includes(config.demoPattern)) {
        demoImports.push({ varName, importPath, fullMatch });
        log('Found demo import:', { varName, importPath });
      }
    }

    return demoImports;
  };

  /**
   * 读取 demo 源码
   */
  const readDemoCode = (
    id: string,
    demoImports: DemoImport[]
  ): { demoCodes: DemoCodes; successCount: number; failCount: number } => {
    const demoCodes: DemoCodes = {};
    let successCount = 0;
    let failCount = 0;

    for (const { varName, importPath } of demoImports) {
      try {
        // 解析相对路径
        const fullPath = path.resolve(path.dirname(id), importPath);
        
        // 检查文件是否存在
        if (!fs.existsSync(fullPath)) {
          warn(`File not found: ${fullPath}`);
          failCount++;
          continue;
        }

        // 读取源码
        let sourceCode = fs.readFileSync(fullPath, config.encoding);
        
        // 应用自定义转换
        sourceCode = config.transform(sourceCode, fullPath, varName);
        
        // 解析变量名
        const parsed = config.parseVarName(varName);
        
        if (!parsed) {
          warn(`Failed to parse variable name: ${varName}`);
          warn(`Expected format: {componentName}{DemoName}, e.g., buttonBasic, inputValidation`);
          failCount++;
          continue;
        }

        const { component, demo } = parsed;
        
        // 存储代码
        if (!demoCodes[component]) {
          demoCodes[component] = {};
        }
        demoCodes[component][demo] = sourceCode;
        
        log(`✓ Loaded: ${component}/${demo}`);
        successCount++;
        
      } catch (error) {
        warn(`Failed to read demo source: ${importPath}`, (error as Error).message);
        failCount++;
      }
    }

    return { demoCodes, successCount, failCount };
  };

  /**
   * 生成注入代码
   */
  const generateInjectionCode = (demoCodes: DemoCodes): string => {
    return `
// Auto-generated by doc-render-sdk/plugin
// Do not edit manually - this will be regenerated on each build
${config.globalVar} = ${JSON.stringify(demoCodes, null, 2)};
`;
  };

  /**
   * 注入代码到源文件
   */
  const injectCode = (code: string, injectionCode: string): string => {
    if (code.includes(config.injectBefore)) {
      log(`Injected before ${config.injectBefore}`);
      return code.replace(
        new RegExp(config.injectBefore.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        injectionCode + '\n' + config.injectBefore
      );
    } else {
      log('Injected at the beginning of file');
      return injectionCode + '\n' + code;
    }
  };

  return {
    name: 'doc-render-sdk:demo-code',
    
    enforce: 'pre',

    /**
     * 配置解析完成后的钩子
     */
    configResolved() {
      log('Plugin initialized with config:', {
        include: config.include,
        demoPattern: config.demoPattern,
        globalVar: config.globalVar,
        extensions: config.extensions,
        debug: config.debug,
      });
    },

    /**
     * 开发服务器启动时的钩子
     */
    configureServer(server) {
      log('Development server started');
      
      // 监听 demo 文件变化，触发热更新
      server.watcher.on('change', (file) => {
        if (file.includes(config.demoPattern)) {
          log('Demo file changed:', file);
          // 触发完整重载以更新代码
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      });
    },

    /**
     * 转换代码
     */
    transform(code: string, id: string) {
      // 检查是否需要处理此文件
      if (!shouldProcess(id)) {
        return null;
      }

      log('Processing file:', id);

      // 查找所有 demo 导入
      const demoImports = findDemoImports(code);

      if (demoImports.length === 0) {
        log('No demo imports found');
        return null;
      }

      // 读取 demo 源码
      const { demoCodes, successCount, failCount } = readDemoCode(id, demoImports);

      // 如果没有成功读取任何文件，返回 null
      if (successCount === 0) {
        warn('No demo codes were loaded successfully');
        return null;
      }

      log(`Summary: ${successCount} succeeded, ${failCount} failed`);

      // 生成注入代码
      const injectionCode = generateInjectionCode(demoCodes);

      // 注入代码
      const injectedCode = injectCode(code, injectionCode);

      return {
        code: injectedCode,
        map: null,
      };
    },
  };
}

/**
 * 预设配置
 */
export const presets = {
  /**
   * 默认配置（适用于 doc-render-sdk）
   */
  default: {} as DemoCodePluginOptions,

  /**
   * 严格模式：更严格的命名检查
   */
  strict: {
    parseVarName: (varName: string) => {
      const match = varName.match(/^([a-z][a-z0-9]*)([A-Z][a-zA-Z0-9]*)$/);
      if (!match) {
        throw new Error(`Invalid variable name: ${varName}. Must be in camelCase format.`);
      }
      const [, component, demo] = match;
      const demoName = demo.charAt(0).toLowerCase() + demo.slice(1);
      return { component, demo: demoName };
    },
  } as DemoCodePluginOptions,

  /**
   * 宽松模式：支持更灵活的命名
   */
  loose: {
    parseVarName: (varName: string) => {
      // 支持下划线分隔
      if (varName.includes('_')) {
        const parts = varName.split('_');
        if (parts.length >= 2) {
          return {
            component: parts[0],
            demo: parts.slice(1).join('_'),
          };
        }
      }
      
      // 回退到默认解析
      return defaultParseVarName(varName);
    },
  } as DemoCodePluginOptions,

  /**
   * TypeScript 项目配置
   */
  typescript: {
    importRegex: /import\s+(\w+)\s+from\s+['"](.+?\/demo\/.+?\.(tsx?|jsx?))['"]/g,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  } as DemoCodePluginOptions,
};
