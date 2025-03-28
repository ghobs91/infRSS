// scripts/dev-worker.mjs
import { context } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ctx = await context({
  entryPoints: [path.resolve(__dirname, '../app/workers/transformer-worker.ts')],
  outfile: path.resolve(__dirname, '../public/workers/transformer-worker.js'),
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  platform: 'browser',
});

await ctx.watch();
console.log('[watch] Transformer worker rebuild watching...');
