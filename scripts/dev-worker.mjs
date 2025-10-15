// scripts/dev-worker.mjs
import { context } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Watch transformer worker
const transformerCtx = await context({
  entryPoints: [path.resolve(__dirname, '../workers/transformer-worker.ts')],
  outfile: path.resolve(__dirname, '../public/workers/transformer-worker.js'),
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  platform: 'browser',
});

await transformerCtx.watch();
console.log('[watch] Transformer worker rebuild watching...');

// Watch RSS parser worker
const rssParserCtx = await context({
  entryPoints: [path.resolve(__dirname, '../workers/rss-parser-worker.ts')],
  outfile: path.resolve(__dirname, '../public/workers/rss-parser-worker.js'),
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  platform: 'browser',
});

await rssParserCtx.watch();
console.log('[watch] RSS Parser worker rebuild watching...');
