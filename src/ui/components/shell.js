// App frame: sidebar rail (laptop), top bar + bottom tab bar (phone), and the view slot.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';

const TABS = [
  ['home', '#/', 'Home'],
  ['path', '#/path', 'Path'],
  ['builder', '#/builder', 'Builder'],
  ['review', '#/review', 'Review'],
  ['library', '#/library', 'Library'],
];
const EXTRA = [
  ['progress', '#/progress', 'Progress'],
  ['settings', '#/settings', 'Settings'],
];

const link = ([id, href, label], cls) => html`<a class="${cls}" data-tab="${id}" href="${href}">${icons[id]}<span>${label}</span><b class="badge" data-badge="${id}" hidden></b></a>`;

export function mountShell(root) {
  const mark = `${import.meta.env.BASE_URL}icon.svg`;
  const shell = el(html`<div class="shell">
    <aside class="rail" aria-label="Main">
      <a class="brand" href="#/"><img class="brand__mark" src="${mark}" alt=""><span class="brand__name">Learning<br>AI Auto</span></a>
      <nav class="rail__nav">${TABS.map((t) => link(t, 'rail__link'))}</nav>
      <nav class="rail__nav rail__nav--extra">${EXTRA.map((t) => link(t, 'rail__link'))}</nav>
      <div class="rail__streak" data-streak></div>
      <p class="rail__foot mono">v${__APP_VERSION__}</p>
    </aside>
    <header class="topbar">
      <a class="brand brand--small" href="#/"><img class="brand__mark" src="${mark}" alt=""><span class="brand__name">Learning AI Auto</span></a>
      <div class="topbar__actions">
        <a class="icon-btn" data-tab="progress" href="#/progress" aria-label="Progress">${icons.progress}</a>
        <a class="icon-btn" data-tab="settings" href="#/settings" aria-label="Settings">${icons.settings}</a>
      </div>
    </header>
    <main class="view" id="view"></main>
    <nav class="tabbar" aria-label="Main">${TABS.map((t) => link(t, 'tabbar__tab'))}</nav>
  </div>`);
  root.replaceChildren(shell);
  return {
    view: shell.querySelector('#view'),
    setActive(tab) {
      shell.querySelectorAll('[data-tab]').forEach((a) => {
        const on = a.dataset.tab === tab;
        a.classList.toggle('is-on', on);
        if (on) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    },
    setBadge(tab, n) {
      shell.querySelectorAll(`[data-badge="${tab}"]`).forEach((b) => { b.hidden = !n; b.textContent = n > 99 ? '99+' : String(n); });
    },
    setStreak(n, todayDone) {
      const box = shell.querySelector('[data-streak]');
      box.innerHTML = String(html`<span class="kicker">Streak</span><span class="rail__streak-n">${icons.flame}<b>${n}</b> day${n === 1 ? '' : 's'}</span><small>${todayDone ? 'Today done' : 'Finish a lesson today'}</small>`);
      box.classList.toggle('is-today', todayDone);
    },
  };
}
