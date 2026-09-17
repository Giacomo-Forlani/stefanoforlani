// Scarica una volta i font da Google Fonts e li salva in public/fonts,
// così il sito li serve dal proprio dominio (nessuna richiesta a Google: GDPR).
// Uso: node scripts/scarica-font.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const css2 =
  'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=DM+Sans:wght@400..600&display=swap';

// Nome file atteso da src/styles/global.css
const targets = {
  'Newsreader|normal': 'newsreader-latin-v1.woff2',
  'Newsreader|italic': 'newsreader-italic-latin-v1.woff2',
  'DM Sans|normal': 'dm-sans-latin-v1.woff2',
};

const ua =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const css = await (await fetch(css2, { headers: { 'User-Agent': ua } })).text();

await mkdir(new URL('../public/fonts/', import.meta.url), { recursive: true });

const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face\s*{([^}]*)}/g)];
let saved = 0;
for (const [, subset, body] of blocks) {
  if (subset !== 'latin') continue;
  const family = body.match(/font-family:\s*'([^']+)'/)[1];
  const style = body.match(/font-style:\s*(\w+)/)[1];
  const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
  const name = targets[`${family}|${style}`];
  if (!name) continue;
  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(new URL(`../public/fonts/${name}`, import.meta.url), data);
  console.log(`✓ ${name} (${Math.round(data.length / 1024)} KB)`);
  saved++;
}

if (saved !== Object.keys(targets).length) {
  console.error(`Attesi ${Object.keys(targets).length} file, salvati ${saved}.`);
  process.exit(1);
}
