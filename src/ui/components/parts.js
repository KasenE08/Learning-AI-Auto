import { html, raw } from '../dom.js';

export const pageHead = (kicker, title, sub) => html`<header class="page-head">
  ${kicker ? html`<span class="kicker">${kicker}</span>` : ''}
  <h1 class="h1">${title}</h1>
  ${sub ? html`<p class="page-head__sub">${sub}</p>` : ''}
</header>`;

export const pct = (x) => `${Math.round((x || 0) * 100)}%`;

/** Thin progress bar. `value` 0..1. */
export const meter = (value, label = '') => html`<span class="meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round((value || 0) * 100)}" ${raw(label ? `aria-label="${label}"` : '')}><b style="width:${Math.round((value || 0) * 100)}%"></b></span>`;

export const trackTag = (track) => html`<span class="ttag ttag--${track}">${{ tech: 'Technical', biz: 'Business', legal: 'Legal', cap: 'Capstone', exam: 'Exam' }[track]}</span>`;
