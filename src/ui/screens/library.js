// Library: the client-ready templates (arrive in stage d) and the glossary.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { pageHead } from '../components/parts.js';
import { glossary } from '../../content/glossary.js';

export const tab = 'library';

const TEMPLATES = [
  ['Proposal', 'Problem, solution, scope, price, timeline, next step.'],
  ['Discovery-call script', 'Questions that find the pain and the budget.'],
  ['ROI calculator', 'Hours, dollars, and payback for a client’s process.'],
  ['Pricing sheet', 'Setup fee, retainer, and usage tiers.'],
  ['Onboarding checklist', 'Access, kickoff, and expectations for a new client.'],
  ['Contract outline', 'The clauses to cover (not legal advice).'],
];

export function render(view) {
  view.append(el(html`<div class="screen">
    ${pageHead('Tools you’ll reuse', 'Library', 'Client-ready templates and every term the course uses.')}
    <a class="card row" href="#/glossary"><span class="row__main"><span class="kicker">Glossary</span><b>${glossary.length} terms, defined plainly</b></span><span class="row__side">${icons.chevron}</span></a>
    <section class="section">
      <h2 class="h4">Client-ready templates</h2>
      <p class="muted small">Fill-in templates you can copy into your own docs. They arrive in build stage d, alongside the capstone.</p>
      <div class="list">${TEMPLATES.map(([t, d]) => html`<div class="card row is-coming"><span class="row__main"><b>${t}</b><span class="muted small">${d}</span></span><span class="row__side muted small">Coming</span></div>`)}</div>
    </section>
  </div>`));
}
