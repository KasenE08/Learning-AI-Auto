// Exports each concept's app icon from concepts.html to SVG + PNG (512, 180 apple-touch, 192).
// Run from the repo root: node design/render-icons.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const OUT = 'design/icons';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve('design/concepts.html')).href, { waitUntil: 'domcontentloaded' });
const icons = await page.evaluate(() => window.ICONS);
for (const [id, svg] of Object.entries(icons)) {
  writeFileSync(`${OUT}/${id}.svg`, svg);
  for (const size of [512, 192, 180]) {
    const p = await browser.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`);
    await p.screenshot({ path: `${OUT}/${id}-${size}.png` });
    await p.close();
  }
  console.log('wrote', id);
}
await browser.close();
