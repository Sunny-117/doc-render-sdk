import { defineConfig } from 'robuild';

export default defineConfig({
    entry: ['src/index.ts', 'src/plugin/index.ts'],
    format: 'esm',
    dts: true,
    clean: true,
})
