import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead, meter, trackTag } from '../components/parts.js';
import { getProgress } from '../../core/store.js';
import { nextUp, streak, week, unitSummary, isDone } from '../../core/progress.js';
import { units, unitById, lessonCode, unitCode, isAvailable, tracks } from '../../core/course.js';
import { dueCount, retentionByLesson } from '../../core/review.js';

export const tab = 'home';

export function render(view) {
  const p = getProgress();
  const next = nextUp(p, isAvailable);
  const st = streak(p);
  const days = week(p);
  const due = dueCount();
  const ret = retentionByLesson();
  const started = units.find((u) => u.lessons.some((l) => isDone(p, l.id)) && u.lessons.some((l) => !isDone(p, l.id)));

  view.append(el(html`<div class="screen home">
    ${pageHead('', 'Learning AI Auto', 'Start, run, and scale a one-person AI automation business. One short lesson a day.')}

    <div class="home__grid">
      <section class="card streak">
        <div><span class="kicker">Streak</span><span class="streak__n">${st.current}<small>day${st.current === 1 ? '' : 's'}</small></span>
          <span class="muted small">${st.todayDone ? 'Today is done.' : 'Finish one lesson today to keep it.'}${st.best > st.current ? ` Best: ${st.best}.` : ''}</span></div>
        <div class="week" aria-label="Last 7 days">${days.map((d) => html`<i class="${d.done ? 'on' : ''} ${d.today ? 'today' : ''}" title="${d.key}">${d.label}</i>`)}</div>
      </section>

      ${next ? html`<a class="card upnext" href="#/lesson/${next.id}">
        <span class="kicker">Up next · ${lessonCode(next)} · ${unitById(next.unit).title}</span>
        <span class="h2">${next.title}</span>
        <span class="upnext__meta"><span class="muted small">${icons.clock}${next.min} min · try it first</span><span class="btn btn--primary">${icons.play}Start</span></span>
      </a>` : html`<div class="card upnext"><span class="kicker">All available lessons done</span><span class="h2">Nice work.</span><span class="muted">Reviews keep it fresh. New lessons arrive in later build stages.</span></div>`}

      <a class="card due" href="#/review">
        <span><span class="kicker">Review</span><b>${due ? `${due} card${due === 1 ? '' : 's'} due` : 'Nothing due'}</b><span class="muted small">Spaced repetition: old material keeps coming back.</span></span>
        <span class="btn ${due ? 'btn--primary' : 'btn--ghost'}">Review</span>
      </a>
    </div>

    ${started && started.id !== next?.unit ? html`<p class="muted small">You also have <a href="#/module/${started.id}">${started.title}</a> in progress.</p>` : ''}

    ${tracks.filter((t) => units.some((u) => u.track === t.id)).map((t) => html`<section class="section">
      <h2 class="h4">${t.title}</h2>
      <div class="mods">${units.filter((u) => u.track === t.id).map((u) => {
        const s = unitSummary(p, u, ret);
        return html`<a class="mod" href="#/module/${u.id}"><span class="mod__n mono">${unitCode(u)}</span><span class="mod__t">${u.title}</span><span class="mod__c mono">${s.done}/${s.total}</span>${meter(s.done / s.total)}</a>`;
      })}</div>
    </section>`)}
  </div>`));
}
