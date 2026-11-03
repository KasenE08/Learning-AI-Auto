// "Build it for real": a build you do in a free no-code tool outside the app.
// The app gives the exact brief, a grading prompt to paste into Claude with your build,
// and a matching checklist. You tick what Claude confirmed; the result is saved to progress.
// spec: { id, title, goal, steps: [..], data?: [..lines of test data], prompt, checklist: [..] }
import { html, el } from '../dom.js';
import { rich } from '../rich.js';
import { icons } from '../icons.js';
import { copyText } from './copy.js';
import { getProgress, saveProgress } from '../../core/store.js';
import { recordOutside } from '../../core/progress.js';

export const FREE_TOOL_RULE = 'Use the free plan of any no-code automation tool that does not ask for a credit card. If signup asks for a card, stop and pick another tool.';

export function gradingPrompt(spec) {
  return `${spec.prompt.trim()}

I built this in a no-code automation tool. I'm attaching screenshots or an export of the workflow and of one test run.

Grade my build against this checklist. For each item, answer PASS or FAIL with one sentence of evidence from what I shared. Only answer PASS if you can actually see it; if you can't tell, answer FAIL and say what I should show you.

${spec.checklist.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Finish with the number of items that passed, then the single most important fix.`;
}

export function outsideBuild(spec, lessonId) {
  const key = `${lessonId}:${spec.id}`;
  const saved = getProgress().outside?.[key];
  const checked = new Set(saved?.checked || []);
  const prompt = gradingPrompt(spec);
  const box = el(html`<section class="ob">
    <span class="kicker">Outside the app · free tool, no card</span>
    <h3 class="h3">${spec.title}</h3>
    <p>${rich(spec.goal)}</p>
    <p class="ob__rule">${icons.lock}<span>${FREE_TOOL_RULE}</span></p>
    <details class="ob__sec" open><summary>1 · What to build</summary><ol class="ob__steps">${spec.steps.map((s) => html`<li>${rich(s)}</li>`)}</ol></details>
    ${spec.data?.length ? html`<details class="ob__sec"><summary>2 · Test it with this fake data</summary><ul class="ob__data mono">${spec.data.map((d) => html`<li>${d}</li>`)}</ul></details>` : ''}
    <details class="ob__sec"><summary>${spec.data?.length ? '3' : '2'} · Get it graded by Claude</summary>
      <p class="muted">Copy this prompt into Claude, attach screenshots of your workflow and one test run, and send.</p>
      <pre class="ob__prompt" tabindex="0">${prompt}</pre>
      <button type="button" class="btn" data-copy>${icons.copy}Copy grading prompt</button>
    </details>
    <div class="ob__sec ob__check">
      <b>Tick only what Claude marked PASS</b>
      <ul class="checklist">${spec.checklist.map((c, i) => html`<li><label><input type="checkbox" data-i="${i}" ${checked.has(i) ? 'checked' : ''}><span>${rich(c)}</span></label></li>`)}</ul>
      <div class="btn-row"><button type="button" class="btn btn--primary" data-save>Save result</button><span class="ob__status mono" aria-live="polite">${saved ? `Saved: ${saved.checked.length}/${saved.total} · ${new Date(saved.at).toLocaleDateString()}` : 'Not saved yet'}</span></div>
    </div>
  </section>`);
  box.querySelector('[data-copy]').addEventListener('click', async (e) => {
    const ok = await copyText(prompt, box.querySelector('.ob__prompt'));
    e.currentTarget.lastChild.textContent = ok ? 'Copied' : 'Selected: copy it manually';
  });
  box.addEventListener('change', (e) => {
    const i = e.target.dataset.i;
    if (i == null) return;
    if (e.target.checked) checked.add(Number(i)); else checked.delete(Number(i));
  });
  box.querySelector('[data-save]').addEventListener('click', async () => {
    const list = [...checked].sort((a, b) => a - b);
    await saveProgress(recordOutside(getProgress(), key, list, spec.checklist.length));
    box.querySelector('.ob__status').textContent = `Saved: ${list.length}/${spec.checklist.length} · ${new Date().toLocaleDateString()}`;
  });
  return box;
}
