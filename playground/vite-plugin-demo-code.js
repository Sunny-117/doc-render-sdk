import fs from 'fs';
import path from 'path';

/**
 * Vite 插件：自动注入 demo 源码
 * 自动读取 demo 文件的源码并注入到全局变量中
 */
export default function demoCodPlugin() {
  return {
    name: 'vite-plugin-demo-code',
    
    transform(code, id) {
      // 只处理 playground/index.js
      if (!id.includes('playground/index.js')) {
        return null;
      }

      // 查找所有 demo 导入
      const demoImports = [];
      const importRegex = /import\s+(\w+)\s+from\s+['"](.+?\/demo\/.+?\.jsx)['"]/g;
      let match;

      while ((match = importRegex.exec(code)) !== null) {
        const [, varName, importPath] = match;
        demoImports.push({ varName, importPath });
      }

      if (demoImports.length === 0) {
        return null;
      }

      // 读取每个 demo 文件的源码
      const demoCodes = {};
      
      for (const { varName, importPath } of demoImports) {
        try {
          // 解析相对路径
          const fullPath = path.resolve(path.dirname(id), importPath);
          
          if (fs.existsSync(fullPath)) {
            const sourceCode = fs.readFileSync(fullPath, 'utf-8');
            
            // 从变量名推断组件名和 demo 名
            // 例如: buttonBasic -> button/basic
            const match = varName.match(/^([a-z]+)([A-Z][a-z]+)$/);
            if (match) {
              const [, component, demo] = match;
              const demoName = demo.toLowerCase();
              
              if (!demoCodes[component]) {
                demoCodes[component] = {};
              }
              demoCodes[component][demoName] = sourceCode;
            }
          }
        } catch (error) {
          console.warn(`Failed to read demo source: ${importPath}`, error);
        }
      }

      // 生成代码注入
      const codeInjection = `
// Auto-generated demo codes
window.__DOC_SDK_DEMO_CODES__ = ${JSON.stringify(demoCodes, null, 2)};
`;

      // 在 window.__DOC_SDK_DEMOS__ 之前注入
      const injectedCode = code.replace(
        /window\.__DOC_SDK_DEMOS__/,
        codeInjection + '\nwindow.__DOC_SDK_DEMOS__'
      );

      return {
        code: injectedCode,
        map: null
      };
    }
  };
}
