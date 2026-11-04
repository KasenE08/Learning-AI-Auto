// "Do it for real" practice outside the app. Two kinds:
//   build     a build in a free no-code tool, graded by Claude from screenshots
//   roleplay  a practice conversation where Claude plays a simulated prospect, then grades the transcript
// Both end with a checklist: tick what Claude confirmed; the result is saved to progress.
// spec: { id, title, goal, steps: [..], data?: [..], prompt, checklist: [..],
//         roleplay?: { persona, business, situation, hidden: [..], objections?: [..], opening?, style? } }
import { html, el } from '../dom.js';
import { rich } from '../rich.js';
import { icons } from '../icons.js';
import { copyText } from './copy.js';
import { getProgress, saveProgress } from '../../core/store.js';
import { recordOutside } from '../../core/progress.js';

export const FREE_TOOL_RULE = 'Use the free plan of any no-code automation tool that does not ask for a credit card. If signup asks for a card, stop and pick another tool.';
export const ROLEPLAY_RULE = 'Uses your own Claude chat. Practice only: the prospect is made up and nothing is sent to anyone.';
export const CLAUDE_RULE = 'Uses your own Claude chat. Practice only: nothing is sent to anyone.';

export function roleplayPrompt(rp) {
  return `Let's run a sales practice role-play. You play a prospect; I play a one-person AI automation consultant. This is practice, so make it realistic, not easy.

YOUR CHARACTER
${rp.persona}
Business: ${rp.business}
Situation: ${rp.situation}

THINGS YOU KNOW BUT ONLY REVEAL IF I ASK A GOOD, SPECIFIC QUESTION
${rp.hidden.map((h) => `- ${h}`).join('\n')}
${rp.objections?.length ? `\nOBJECTIONS TO RAISE AT NATURAL MOMENTS\n${rp.objections.map((o) => `- ${o}`).join('\n')}\n` : ''}
RULES
- Stay in character the whole time. Never coach me, never grade me, never step out of the role until I type END.
- Answer like a busy, real owner: short replies, a bit skeptical, some small talk is fine.
- Don't volunteer the hidden facts. If my question is vague, give a vague answer.
- If I push too hard or talk too much about technology, get less interested.
${rp.style ? `- ${rp.style}\n` : ''}- When I type END, reply only with "Role-play ended." and nothing else.

${rp.opening || 'Start by answering the phone as your character.'}`;
}

export function gradingPrompt(spec) {
  const intro = spec.roleplay
    ? 'Below is the full transcript of a practice sales conversation. Another Claude chat played the prospect; I played the consultant.'
    : spec.claudeOnly
      ? 'Below is my work for this exercise.'
      : 'I built this in a no-code automation tool. I’m attaching screenshots or an export of the workflow and of one test run.';
  const evidence = spec.roleplay || spec.claudeOnly ? 'quote the part of my work that shows it' : 'give one sentence of evidence from what I shared';
  return `${spec.prompt.trim()}

${intro}

Grade against this checklist. For each item, answer PASS or FAIL and ${evidence}. Only answer PASS if the evidence is actually there; if you can’t tell, answer FAIL.

${spec.checklist.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Finish with the number of items that passed, then the single most important thing to do better next time.`;
}

export function outsideBuild(spec, lessonId) {
  const key = `${lessonId}:${spec.id}`;
  const saved = getProgress().outside?.[key];
  const checked = new Set(saved?.checked || []);
  const isRp = !!spec.roleplay;
  const inClaude = isRp || spec.claudeOnly;
  const grade = gradingPrompt(spec);
  const rpText = isRp ? roleplayPrompt(spec.roleplay) : '';
  let n = 0;
  const num = () => ++n;
  const box = el(html`<section class="ob">
    <span class="kicker">${isRp ? 'Role-play with Claude · practice' : inClaude ? 'Practice with Claude' : 'Outside the app · free tool, no card'}</span>
    <h3 class="h3">${spec.title}</h3>
    <p>${rich(spec.goal)}</p>
    <p class="ob__rule">${icons.lock}<span>${isRp ? ROLEPLAY_RULE : inClaude ? CLAUDE_RULE : FREE_TOOL_RULE}</span></p>
    <details class="ob__sec" open><summary>${num()} · ${inClaude ? 'What to do' : 'What to build'}</summary><ol class="ob__steps">${spec.steps.map((s) => html`<li>${rich(s)}</li>`)}</ol></details>
    ${spec.data?.length ? html`<details class="ob__sec"><summary>${num()} · ${inClaude ? 'Material to use' : 'Test it with this fake data'}</summary><ul class="ob__data mono">${spec.data.map((d) => html`<li>${d}</li>`)}</ul></details>` : ''}
    ${isRp ? html`<details class="ob__sec"><summary>${num()} · Start the role-play</summary>
      <p class="muted">Open a new Claude chat, paste this, and play the consultant. Type END when you’re done, then copy the whole conversation.</p>
      <pre class="ob__prompt" data-pre="rp" tabindex="0">${rpText}</pre>
      <button type="button" class="btn" data-copy="rp">${icons.copy}<span>Copy role-play prompt</span></button>
    </details>` : ''}
    <details class="ob__sec"><summary>${num()} · Get it graded by Claude</summary>
      <p class="muted">${isRp ? 'In a different new chat, paste this prompt, then paste the full role-play transcript under it.' : inClaude ? 'In a new Claude chat, paste this prompt, then paste your work under it.' : 'Copy this prompt into Claude, attach screenshots of your workflow and one test run, and send.'}</p>
      <pre class="ob__prompt" data-pre="grade" tabindex="0">${grade}</pre>
      <button type="button" class="btn" data-copy="grade">${icons.copy}<span>Copy grading prompt</span></button>
    </details>
    <div class="ob__sec ob__check">
      <b>Tick only what Claude marked PASS</b>
      <ul class="checklist">${spec.checklist.map((c, i) => html`<li><label><input type="checkbox" data-i="${i}" ${checked.has(i) ? 'checked' : ''}><span>${rich(c)}</span></label></li>`)}</ul>
      <div class="btn-row"><button type="button" class="btn btn--primary" data-save>Save result</button><span class="ob__status mono" aria-live="polite">${saved ? `Saved: ${saved.checked.length}/${saved.total} · ${new Date(saved.at).toLocaleDateString()}` : 'Not saved yet'}</span></div>
    </div>
  </section>`);
  box.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const which = b.dataset.copy;
    const ok = await copyText(which === 'rp' ? rpText : grade, box.querySelector(`[data-pre="${which}"]`));
    b.querySelector('span').textContent = ok ? 'Copied' : 'Selected: copy it manually';
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
