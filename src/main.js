import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './ui/styles/tokens.css';
import './ui/styles/base.css';
import './ui/styles/app.css';
import './ui/styles/lesson.css';
import './ui/styles/visuals.css';
import './ui/styles/builder.css';

import { start } from './router.js';
import { registerServiceWorker } from './core/sw.js';
import { requestPersistence } from './core/db.js';
import * as store from './core/store.js';
import { dueCount } from './core/review.js';
import { streak } from './core/progress.js';
import { mountShell } from './ui/components/shell.js';
import * as home from './ui/screens/home.js';
import * as path from './ui/screens/path.js';
import * as module from './ui/screens/module.js';
import * as lesson from './ui/screens/lesson.js';
import * as builder from './ui/screens/builder.js';
import * as workspace from './ui/screens/workspace.js';
import * as review from './ui/screens/review.js';
import * as library from './ui/screens/library.js';
import * as glossary from './ui/screens/glossary.js';
import * as progress from './ui/screens/progress.js';
import * as settings from './ui/screens/settings.js';

const screens = { home, path, module, lesson, builder, workspace, review, library, glossary, progress, settings };

async function boot() {
  await store.load();
  if (import.meta.env.DEV && new URLSearchParams(location.search).has('demo')) {
    const { demoState } = await import('./dev/demo.js');
    const d = demoState();
    store.useTransient(d.progress, d.cards);
  }
  const shell = mountShell(document.getElementById('app'));
  const badges = () => {
    shell.setBadge('review', dueCount());
    const s = streak(store.getProgress());
    shell.setStreak(s.current, s.todayDone);
  };
  store.subscribe(badges);
  badges();
  start(screens, (screen) => {
    shell.setActive(screen.tab);
    return shell.view;
  });
  registerServiceWorker();
  requestPersistence();
}

boot();
