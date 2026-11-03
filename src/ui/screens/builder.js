// Builder hub: graded build challenges + free sandboxes, one per fake business.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead, pct } from '../components/parts.js';
import { getProgress } from '../../core/store.js';
import { challenges } from '../../sim/challenges.js';
import { datasetList, datasetById } from '../../sim/data.js';
import { lessonById, lessonCode } from '../../core/course.js';

export const tab = 'builder';

export function render(view) {
  const b = getProgress().builds || {};
  view.append(el(html`<div class="screen">
    ${pageHead('Sandbox · fake data only', 'Builder', 'A visual workflow builder that runs on made-up businesses. Build, run the test records, see exactly what happened.')}
    <section class="section">
      <h2 class="h4">Build challenges</h2>
      <p class="muted small">Each one is scored by fixed rules. Your best score is saved.</p>
      <div class="list">${challenges.map((c) => {
        const r = b[c.id];
        const l = lessonById(c.lesson);
        return html`<a class="card row" href="#/builder/${c.id}">
          <span class="row__main"><span class="kicker">${datasetById(c.dataset).name}${l ? ` · ${lessonCode(l)}` : ''}</span><b>${c.title}</b><span class="muted small">${c.checks.length} checks</span></span>
          <span class="row__side">${r?.best != null ? html`<span class="score-pill ${r.best === 1 ? 'is-full' : ''}">${pct(r.best)}</span>` : html`<span class="muted small">Not tried</span>`}${icons.chevron}</span>
        </a>`;
      })}</div>
      <p class="muted small">More challenges arrive with each module.</p>
    </section>
    <section class="section">
      <h2 class="h4">Free sandbox</h2>
      <p class="muted small">No checks. Try anything on one business’s test data.</p>
      <div class="list">${datasetList().map((d) => html`<a class="card row" href="#/builder/free-${d.id}">
        <span class="row__main"><span class="kicker">${d.industry}</span><b>${d.name}</b><span class="muted small">${d.events.length} test records from “${d.source}”</span></span>
        <span class="row__side">${icons.chevron}</span>
      </a>`)}</div>
    </section>
  </div>`));
}
