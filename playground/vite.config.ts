import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { createDemoCodePlugin } from 'doc-render-sdk/plugin';

export default defineConfig({
  // GitHub Pages 部署时需要设置 base 路径
  // 如果部署到 https://username.github.io/repo-name/，设置为 '/repo-name/'
  // 如果部署到根路径，设置为 '/'
  base: process.env.NODE_ENV === 'production' ? '/doc-render-sdk/' : '/',
  
  plugins: [
    react(),
    // Demo 代码自动生成插件
    createDemoCodePlugin({
      // 基础配置
      include: 'index.js',                    // 处理的文件
      demoPattern: '/demo/',                  // Demo 文件路径模式
      globalVar: 'window.__DOC_SDK_DEMO_CODES__', // 全局变量名
      
      // 开发环境开启调试
      debug: process.env.NODE_ENV === 'development',
      
      // 可选：自定义代码转换
      // transform: (code, filePath, varName) => {
      //   // 例如：移除所有注释
      //   return code.replace(/\/\/.*/g, '');
      // }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'doc-render-sdk': resolve(__dirname, '../dist/index.mjs'),
      // 确保 React 只有一个实例
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime')
    },
    dedupe: ['react', 'react-dom']
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});
