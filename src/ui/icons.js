import { raw } from './dom.js';

const s = (body) => raw(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`);

export const icons = {
  home: s('<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>'),
  path: s('<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8.2 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.8"/>'),
  builder: s('<rect x="3" y="4" width="7" height="5" rx="1"/><rect x="14" y="10" width="7" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/><path d="M10 6.5h2v6h2M17.5 15v3.5H10"/>'),
  review: s('<rect x="6" y="7" width="13" height="13" rx="1.5"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/><path d="M10 13.5l2 2 3.5-4"/>'),
  library: s('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>'),
  progress: s('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  settings: s('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'),
  glossary: s('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>'),
  check: s('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
  chevron: s('<path d="M9 5l7 7-7 7"/>'),
  back: s('<path d="M15 5l-7 7 7 7"/>'),
  down: s('<path d="M5 9l7 7 7-7"/>'),
  up: s('<path d="M5 15l7-7 7 7"/>'),
  plus: s('<path d="M12 5v14M5 12h14"/>'),
  trash: s('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
  play: s('<path d="M7 5l12 7-12 7z"/>'),
  clock: s('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
  copy: s('<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  flame: s('<path d="M12 21c-4 0-7-2.7-7-6.5 0-3 2-5 3.5-6.5.3 2 1.3 3 2.5 3.5C11 8 12 5 14 3c.5 3 5 5.5 5 11.5 0 3.8-3 6.5-7 6.5z"/>'),
  bulb: s('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
  download: s('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  upload: s('<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>'),
  reset: s('<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>'),
  external: s('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  lock: s('<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  bolt: s('<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>'),
  data: s('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>'),
};
