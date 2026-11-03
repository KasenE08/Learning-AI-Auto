import { html, el } from '../dom.js';
import { pageHead, meter, pct } from '../components/parts.js';
import { getProgress, getCards } from '../../core/store.js';
import { overallSummary, unitSummary, streak } from '../../core/progress.js';
import { units, unitCode, lessonById, lessonCode } from '../../core/course.js';
import { retentionByLesson } from '../../core/review.js';
import { challenges } from '../../sim/challenges.js';

export const tab = 'progress';

export function render(view) {
  const p = getProgress();
  const ret = retentionByLesson();
  const all = overallSummary(p, ret);
  const st = streak(p);
  const outside = Object.entries(p.outside || {});
  view.append(el(html`<div class="screen">
    ${pageHead('No deadline', 'Progress', 'Mastery = lessons finished, best quiz scores, and how well you still remember the flashcards.')}
    <div class="stats">
      <div class="card stat"><span class="kicker">Lessons</span><b class="mono">${all.done}<small>/${all.total}</small></b></div>
      <div class="card stat"><span class="kicker">Mastery</span><b class="mono">${pct(all.mastery)}</b></div>
      <div class="card stat"><span class="kicker">Streak</span><b class="mono">${st.current}<small> best ${st.best}</small></b></div>
      <div class="card stat"><span class="kicker">Flashcards</span><b class="mono">${Object.keys(getCards()).length}</b></div>
    </div>
    <section class="section"><h2 class="h4">By module</h2>
      <div class="mods">${units.map((u) => { const s = unitSummary(p, u, ret); return html`<a class="mod" href="#/module/${u.id}"><span class="mod__n mono">${unitCode(u)}</span><span class="mod__t">${u.title}</span><span class="mod__c mono">${pct(s.mastery)}</span>${meter(s.mastery)}</a>`; })}</div>
    </section>
    <section class="section"><h2 class="h4">Sandbox builds</h2>
      <div class="mods">${challenges.map((c) => html`<a class="mod" href="#/builder/${c.id}"><span class="mod__n mono">${p.builds?.[c.id]?.best != null ? pct(p.builds[c.id].best) : '—'}</span><span class="mod__t">${c.title}</span><span class="mod__c"></span>${meter(p.builds?.[c.id]?.best || 0)}</a>`)}</div>
    </section>
    <section class="section"><h2 class="h4">Outside-app builds</h2>
      ${outside.length ? html`<div class="mods">${outside.map(([k, r]) => { const l = lessonById(k.split(':')[0]); return html`<a class="mod" href="#/lesson/${l?.id}"><span class="mod__n mono">${r.checked.length}/${r.total}</span><span class="mod__t">${l ? `${lessonCode(l)} · ${l.title}` : k}</span><span class="mod__c mono">${new Date(r.at).toLocaleDateString()}</span>${meter(r.checked.length / r.total)}</a>`; })}</div>`
        : html`<p class="muted small">None yet. Lessons with a “Build it for real” step save their checklist results here.</p>`}
    </section>
  </div>`));
}
