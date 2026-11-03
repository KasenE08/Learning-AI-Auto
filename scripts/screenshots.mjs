// iPhone + laptop screenshots of the main screens. Needs `npm run dev` running.
// Run: npm run shots   → screenshots/<device>-<screen>.png
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium, devices } = createRequire(import.meta.url)('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:5173/Learning-AI-Auto/';
const ONLY = process.argv[2];
const SHOTS = [
  ['home', '?demo#/'],
  ['path', '?demo#/path'],
  ['module', '?demo#/module/found'],
  ['lesson', '?demo#/lesson/found-01'],
  ['builder', '?demo#/builder'],
  ['workspace', '?demo#/builder/first-flow'],
  ['review', '?demo#/review'],
  ['progress', '?demo#/progress'],
];
mkdirSync('screenshots', { recursive: true });
const browser = await chromium.launch();
const targets = [
  ['iphone', { ...devices['iPhone 13'] }],
  ['laptop', { viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 }],
];
for (const [name, opts] of targets) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log(`[${name}] page error:`, e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log(`[${name}] console:`, m.text()); });
  for (const [id, hash] of SHOTS) {
    if (ONLY && ONLY !== id) continue;
    await page.goto(BASE + hash);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/${name}-${id}.png`, fullPage: name === 'iphone' ? false : true });
  }
  await ctx.close();
}
await browser.close();
console.log('done');
