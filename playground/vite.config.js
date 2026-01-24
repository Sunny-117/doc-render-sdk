import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import demoCodePlugin from './vite-plugin-demo-code.js';

export default defineConfig({
  plugins: [
    react(),
    demoCodePlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'doc-render-sdk': resolve(__dirname, '../src/index.ts')
    }
  },
  optimizeDeps: {
    exclude: ['doc-render-sdk'],
    esbuildOptions: {
      preserveSymlinks: true
    }
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
