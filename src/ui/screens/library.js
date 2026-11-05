// Library: client-ready templates and the glossary.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead } from '../components/parts.js';
import { glossary } from '../../content/glossary.js';
import { templates } from '../../content/templates.js';
import { getSettings } from '../../core/store.js';

export const tab = 'library';

export function render(view) {
  const saved = getSettings().templates || {};
  view.append(el(html`<div class="screen">
    ${pageHead('Tools you’ll reuse', 'Library', 'Client-ready templates and every term the course uses.')}
    <section class="section">
      <h2 class="h4">Client-ready templates</h2>
      <p class="muted small">Fill in the fields, copy the result into your own docs or email. Your entries stay on this device.</p>
      <div class="list">${templates.map((t) => html`<a class="card row" href="#/template/${t.id}"><span class="row__main"><b>${t.title}</b><span class="muted small">${t.blurb}</span></span><span class="row__side">${saved[t.id] && Object.values(saved[t.id]).some(Boolean) ? html`<span class="score-pill">Started</span>` : ''}${icons.chevron}</span></a>`)}</div>
    </section>
    <a class="card row" href="#/glossary"><span class="row__main"><span class="kicker">Glossary</span><b>${glossary.length} terms, defined plainly</b></span><span class="row__side">${icons.chevron}</span></a>
  </div>`));
}
