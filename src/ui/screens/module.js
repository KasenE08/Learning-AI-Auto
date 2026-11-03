// One module: its lessons, builds, and the retake / reset controls.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead, meter, pct } from '../components/parts.js';
import { confirmSheet } from '../components/sheet.js';
import { getProgress, saveProgress, getCards, saveCards } from '../../core/store.js';
import { unitSummary, isDone, resetUnit } from '../../core/progress.js';
import { unitById, unitCode, isAvailable, lessonCode, trackById } from '../../core/course.js';
import { retentionByLesson, removeLessonCards } from '../../core/review.js';
import { challenges, challengeUnit } from '../../sim/challenges.js';

export const tab = 'path';

export function render(view, { id }) {
  const u = unitById(id);
  if (!u) { view.append(el(html`<div class="screen"><p class="muted">No module “${id}”.</p><a class="btn" href="#/path">The path</a></div>`)); return; }
  const draw = () => {
    const p = getProgress();
    const s = unitSummary(p, u, retentionByLesson());
    const builds = challenges.filter((c) => c.unit === u.id);
    const screen = el(html`<div class="screen">
      <a class="backlink" href="#/path">${icons.back}The path</a>
      ${pageHead(`${unitCode(u)} · ${trackById(u.track).title}`, u.title, '')}
      <div class="card modstat"><span><b class="mono">${s.done}/${s.total}</b> lessons</span><span><b class="mono">${pct(s.mastery)}</b> mastery</span>${meter(s.done / s.total)}</div>
      <ol class="lessons">${u.lessons.map((l) => {
        const r = p.lessons[l.id];
        const ok = isAvailable(l);
        return html`<li class="lesson-row ${ok ? '' : 'is-coming'}">
          <a href="#/lesson/${l.id}" class="lesson-row__main">
            <span class="lesson-row__st ${r?.done ? 'is-done' : ''}">${r?.done ? icons.check : html`<span class="mono">${l.n}</span>`}</span>
            <span><b>${l.title}</b><span class="muted small">${lessonCode(l)} · ${l.min} min${ok ? '' : ' · coming soon'}${r?.quiz ? ` · quiz best ${pct(r.quiz.best)}` : ''}</span></span>
          </a>
          ${r?.done && ok ? html`<a class="btn btn--ghost btn--sm" href="#/lesson/${l.id}?quiz=1">Retake quiz</a>` : ''}
        </li>`;
      })}</ol>
      ${builds.length ? html`<section class="section"><h2 class="h4">Sandbox builds</h2><div class="list">${builds.map((c) => html`<a class="card row" href="#/builder/${c.id}"><span class="row__main"><b>${c.title}</b><span class="muted small">${c.checks.length} checks</span></span><span class="row__side">${p.builds?.[c.id]?.best != null ? html`<span class="score-pill">${pct(p.builds[c.id].best)}</span>` : ''}${icons.chevron}</span></a>`)}</div></section>` : ''}
      <section class="section">
        <h2 class="h4">Reset this module</h2>
        <p class="muted small">Clears this module’s lessons, quiz scores, builds, and flashcards so you can redo it from scratch. Your streak history stays.</p>
        <button type="button" class="btn btn--danger" data-reset>${icons.reset}Reset ${u.title}</button>
      </section>
    </div>`);
    screen.querySelector('[data-reset]').addEventListener('click', async () => {
      const ok = await confirmSheet({ title: `Reset ${u.title}?`, text: 'Its lessons, quiz scores, sandbox builds, outside builds and flashcards are erased. This can’t be undone (unless you have a backup).', yes: 'Reset module', danger: true });
      if (!ok) return;
      await saveProgress(resetUnit(getProgress(), u.id, challengeUnit));
      await saveCards(removeLessonCards(getCards(), u.lessons.map((l) => l.id)));
      view.replaceChildren();
      draw();
    });
    view.append(screen);
  };
  draw();
}
