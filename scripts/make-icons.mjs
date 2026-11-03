// Renders the Blueprint app icon to every size the manifest and iOS need.
// Run: npm run icons   (uses the Playwright that ships with this machine / your global install)
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

// Three workflow blocks joined by dashed connectors, on cobalt grid paper.
const art = (scale) => `<g transform="translate(50 50) scale(${scale}) translate(-50 -50)">
  <path d="M44 31H52V50H58" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="4 3"/>
  <path d="M71 59V69H44" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="4 3"/>
  <rect x="18" y="22" width="26" height="18" rx="3" fill="#ffffff"/><circle cx="26" cy="31" r="4" fill="#1f5fd6"/>
  <rect x="58" y="41" width="26" height="18" rx="3" fill="#ffffff"/>
  <rect x="18" y="60" width="26" height="18" rx="3" fill="#bcd3ff"/>
</g>`;
const icon = (scale, size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
<defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#ffffff" stroke-opacity=".13" stroke-width="1"/></pattern></defs>
<rect width="100" height="100" fill="#1f5fd6"/><rect width="100" height="100" fill="url(#g)"/>
${art(scale)}
</svg>`;

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icon.svg', icon(1, 512));
const out = [
  ['public/icons/icon-192.png', 192, 1],
  ['public/icons/icon-512.png', 512, 1],
  ['public/icons/apple-touch-icon.png', 180, 1],
  ['public/icons/icon-maskable-512.png', 512, 0.78],
  ['public/favicon.png', 64, 1],
];
const browser = await chromium.launch();
for (const [path, size, scale] of out) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<body style="margin:0">${icon(scale, size)}</body>`);
  await page.screenshot({ path });
  await page.close();
  console.log('wrote', path);
}
await browser.close();
