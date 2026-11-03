import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { rich } from '../rich.js';
import { pageHead } from '../components/parts.js';
import { glossary } from '../../content/glossary.js';
import { lessonById, lessonCode } from '../../core/course.js';

export const tab = 'library';

export function render(view, { term }) {
  const screen = el(html`<div class="screen">
    <a class="backlink" href="#/library">${icons.back}Library</a>
    ${pageHead('Every term, defined', 'Glossary', `${glossary.length} terms. Lessons link here whenever jargon shows up.`)}
    <label class="search">${icons.glossary}<input type="search" placeholder="Search terms" aria-label="Search terms" data-q></label>
    <dl class="gloss">${glossary.map((g) => html`<div class="gloss__item" id="g-${g.id}" data-t="${(g.term + ' ' + (g.aka || []).join(' ')).toLowerCase()}">
      <dt>${g.term}${g.aka?.length ? html` <span class="muted small">(${g.aka.join(', ')})</span>` : ''}</dt>
      <dd>${rich(g.def)}${g.lessons?.length ? html`<span class="gloss__from">${g.lessons.map((id) => lessonById(id)).filter(Boolean).map((l) => html`<a href="#/lesson/${l.id}">${lessonCode(l)}</a>`)}</span>` : ''}</dd>
    </div>`)}</dl>
  </div>`);
  screen.querySelector('[data-q]').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    screen.querySelectorAll('.gloss__item').forEach((x) => { x.hidden = q && !x.dataset.t.includes(q); });
  });
  view.append(screen);
  if (term) requestAnimationFrame(() => { const t = screen.querySelector(`#g-${term}`); t?.scrollIntoView({ block: 'center' }); t?.classList.add('is-hl'); });
}
