import { defineConfig } from 'robuild';

export default defineConfig({
  entries: [
    {
      input: 'src/index.ts',
      format: 'esm',
      dts: true,
      clean: true,
      noExternal: ['lodash-es'],
      type: 'bundle',
    }
  ],
});
