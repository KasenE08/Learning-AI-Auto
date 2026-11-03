// The fixed path through all 15 modules. Every lesson stays open (free exploration).
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead, meter, pct } from '../components/parts.js';
import { getProgress } from '../../core/store.js';
import { unitSummary, nextUp } from '../../core/progress.js';
import { units, tracks, unitCode, isAvailable, unitBuilt } from '../../core/course.js';
import { retentionByLesson } from '../../core/review.js';

export const tab = 'path';

export function render(view) {
  const p = getProgress();
  const ret = retentionByLesson();
  const next = nextUp(p, isAvailable);
  view.append(el(html`<div class="screen">
    ${pageHead('15 modules · self-paced', 'The path', 'Follow it in order, or jump to anything that’s ready. Technical and business tracks go equally deep.')}
    ${tracks.map((t) => html`<section class="section">
      <h2 class="h4">${t.title}</h2>
      <p class="muted small">${t.blurb}</p>
      <ol class="pathlist">${units.filter((u) => u.track === t.id).map((u) => {
        const s = unitSummary(p, u, ret);
        const built = unitBuilt(u);
        return html`<li><a class="card pathunit ${next?.unit === u.id ? 'is-next' : ''} ${built ? '' : 'is-coming'}" href="#/module/${u.id}">
          <span class="pathunit__n mono">${unitCode(u)}</span>
          <span class="pathunit__main"><b>${u.title}</b><span class="muted small">${u.lessons.length} lesson${u.lessons.length === 1 ? '' : 's'}${built ? '' : ` · arrives in stage ${u.stage}`}${s.done ? ` · ${s.done} done · ${pct(s.mastery)} mastery` : ''}</span>${meter(s.done / s.total)}</span>
          ${icons.chevron}
        </a></li>`;
      })}</ol>
    </section>`)}
  </div>`));
}
