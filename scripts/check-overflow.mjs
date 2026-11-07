// Fails if anything on any screen sticks out past a phone's edge (the "page stretches sideways" bug).
// Loads the builder with deliberately long text, the case that broke it before.
// Needs `npm run dev` running. Run: npm run check:overflow
import { createRequire } from 'node:module';
const { chromium, devices } = createRequire(import.meta.url)('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:5173/Learning-AI-Auto/';
const LONG = 'make sure the name and email match making name the priority to correct typos in emails if an invalid email is inputted leave it blank';
const ROUTES = ['#/', '#/path', '#/module/found', '#/module/capstone', '#/lesson/found-01', '#/lesson/scale-04', '#/lesson/capstone-01',
  '#/builder', '#/review', '#/library', '#/template/proposal', '#/template/roi', '#/template/contract', '#/glossary', '#/progress', '#/settings', '#/lesson/exam-01'];

// Any visible element whose right edge passes the screen, unless it sits inside a sideways scroller on purpose.
const findOverflow = () => {
  const vw = document.documentElement.clientWidth;
  const scrolls = (n) => { for (let p = n.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || (o === 'hidden' && p !== document.body)) return true; } return false; };
  const bad = [];
  for (const n of document.querySelectorAll('body *')) {
    const r = n.getBoundingClientRect();
    if (!r.width || r.right <= vw + 1 || scrolls(n)) continue;
    if (n.closest('[hidden], details:not([open]) > :not(summary)')) continue;
    bad.push(`${n.tagName.toLowerCase()}.${[...n.classList].join('.')} right=${Math.round(r.right)}`);
  }
  return { vw, bad: bad.slice(0, 5) };
};

const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 1 });
const p = await ctx.newPage();
let failures = 0;
p.on('pageerror', (e) => { failures++; console.log('✗ page error:', e.message); });
const check = async (label) => {
  await p.waitForTimeout(250);
  const { vw, bad } = await p.evaluate(findOverflow);
  if (bad.length) { failures++; console.log(`✗ ${label} (screen ${vw}px)\n    ${bad.join('\n    ')}`); } else console.log(`✓ ${label}`);
};

for (const r of ROUTES) { await p.goto(BASE + r); await check(r); }

// Builder with a stress workflow: long detail names, long message, every tab.
await p.goto(BASE + '#/builder/first-flow');
await p.waitForSelector('.bw');
await p.evaluate(async (long) => {
  const store = await import('/Learning-AI-Auto/src/core/store.js');
  const prog = await import('/Learning-AI-Auto/src/core/progress.js');
  const eng = await import('/Learning-AI-Auto/src/sim/engine.js');
  const wf = eng.newWorkflow('dental');
  wf.trigger = { type: 'form.new' };
  const add = (type, cfg) => { const s = eng.makeStep(wf, type); Object.assign(s.config, cfg); wf.steps.push(s); return s; };
  const ex = add('ai.extract', { text: '{{trigger.reason}}', fields: `name, ${long}, ${long} again` });
  add('crm.upsert', { email: '{{trigger.email}}', name: '{{trigger.name}}' });
  add('cal.create', { title: `{{trigger.name}} ${long}`, when: '{{trigger.preferred_time}}' });
  add('email.send', { to: '{{trigger.email}}', subject: long, body: `Hello {{trigger.name}} {{${ex.id}.name}} ${long.replaceAll(' ', '')}` });
  await store.saveProgress(prog.saveDraft(store.getProgress(), 'first-flow', wf));
}, LONG);
await p.reload();
await p.waitForSelector('.bw');
await check('builder: flow');
for (const [i, name] of [[1, 'extract'], [4, 'email']]) {
  await p.click(`.bf__card >> nth=${i}`);
  await check(`builder: step settings (${name})`);
  await p.click('[data-tab="flow"]');
}
await p.click('[data-tab="data"]'); await check('builder: test data');
await p.click('[data-run]');
for (let i = 0; i < await p.locator('.run').count(); i++) { await p.click(`.run >> nth=${i}`); await check(`builder: results run ${i + 1}`); }
await p.click('[data-grade]'); await check('builder: checks');

await b.close();
console.log(failures ? `\n${failures} screen(s) overflow.` : '\nNo screen overflows.');
process.exit(failures ? 1 : 0);
