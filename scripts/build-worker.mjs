// scripts/build-worker.mjs
import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.resolve(__dirname, '../workers/transformer-worker.ts')],
  outfile: path.resolve(__dirname, '../public/workers/transformer-worker.js'),
  bundle: true,
  format: 'iife', // Change to IIFE format for better browser compatibility
  target: ['es2020'],
  platform: 'browser',
  loader: { '.ts': 'ts' },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  sourcemap: true,
  minify: false, // Disable minification for development
});
