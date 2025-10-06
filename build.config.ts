import { defineConfig } from 'robuild';

export default defineConfig({
  entries: [
    {
      input: 'src/index.ts',
      format: 'esm',
      dts: true,
      clean: true,
      external: ['react', 'react-dom'],
      type: 'bundle',
    }
  ],
});
