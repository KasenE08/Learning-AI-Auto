// Export / import of everything stored on the device, as one JSON file.
import { newProgress } from './progress.js';

export const BACKUP_APP = 'learning-ai-auto';
export const BACKUP_VERSION = 1;

const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);

export function makeBackup({ progress, cards, settings }, now = new Date()) {
  return { app: BACKUP_APP, version: BACKUP_VERSION, exportedAt: now.toISOString(), progress, cards: cards ?? {}, settings: settings ?? {} };
}

export const backupFileName = (now = new Date()) => `learning-ai-auto-backup-${now.toISOString().slice(0, 10)}.json`;

/** Parse and validate a backup file's text. Throws an Error with a plain-English message. */
export function parseBackup(text) {
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('That file isn’t a backup (it isn’t valid JSON).'); }
  if (!isObj(data) || data.app !== BACKUP_APP) throw new Error('That file isn’t a Learning AI Auto backup.');
  if (typeof data.version !== 'number' || data.version > BACKUP_VERSION) throw new Error('This backup is from a newer version of the app. Update the app first.');
  const p = data.progress;
  if (!isObj(p) || !isObj(p.lessons)) throw new Error('The backup is damaged (progress is missing).');
  for (const [id, r] of Object.entries(p.lessons)) {
    if (!/^[a-z]+-\d{2}$/.test(id) || !isObj(r)) throw new Error(`The backup is damaged (lesson ${id}).`);
  }
  for (const k of ['builds', 'outside', 'days']) if (p[k] != null && !isObj(p[k])) throw new Error(`The backup is damaged (${k}).`);
  if (data.cards != null && !isObj(data.cards)) throw new Error('The backup is damaged (flashcards).');
  return {
    progress: { ...newProgress(), ...p },
    cards: isObj(data.cards) ? data.cards : {},
    settings: isObj(data.settings) ? data.settings : {},
    exportedAt: data.exportedAt || null,
  };
}

export function describeBackup(b) {
  const done = Object.values(b.progress.lessons).filter((r) => r.done).length;
  const cards = Object.keys(b.cards).length;
  const builds = Object.keys(b.progress.builds || {}).length;
  return `${done} lesson${done === 1 ? '' : 's'} done · ${cards} flashcard${cards === 1 ? '' : 's'} · ${builds} build${builds === 1 ? '' : 's'}`;
}
