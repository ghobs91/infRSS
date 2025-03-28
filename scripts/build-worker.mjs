// scripts/build-worker.mjs
import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.resolve(__dirname, '../app/workers/transformer-worker.ts')],
  outfile: path.resolve(__dirname, '../public/workers/transformer-worker.js'),
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  platform: 'browser',
});
