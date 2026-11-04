// Pure progress logic. No DOM, no storage.
// progress = {
//   version, createdAt,
//   lessons: { [lessonId]: { done, completedAt, quiz: { best, last, attempts } } },
//   builds:  { [challengeId]: { best, passed: [checkId], at, wf } }     sandbox builds
//   outside: { [lessonId:buildId]: { checked: [itemIndex], total, at } } builds done in a free tool, graded by Claude
//   days:    { 'YYYY-MM-DD': lessonsFinishedThatDay }                   streak
// }
import { pathLessons, units, tracks, unitsOfTrack, unitById } from './course.js';

export const PROGRESS_VERSION = 1;

export function newProgress(now = Date.now()) {
  return { version: PROGRESS_VERSION, lessons: {}, builds: {}, outside: {}, days: {}, exam: {}, createdAt: now };
}

export const isDone = (p, id) => !!p.lessons[id]?.done;

/** Local calendar day, so a streak follows your own midnight. */
export function dayKey(t = Date.now()) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const shiftDay = (key, delta) => {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + delta, 12).getTime());
};

/** Finishing a lesson (first time or a retake) counts toward today's streak. */
export function logLessonFinished(p, now = Date.now()) {
  const k = dayKey(now);
  return { ...p, days: { ...p.days, [k]: (p.days?.[k] || 0) + 1 } };
}

/**
 * Daily streak: consecutive days with at least one finished lesson.
 * Today not done yet doesn't break it until the day is over.
 */
export function streak(p, now = Date.now()) {
  const days = p.days || {};
  const today = dayKey(now);
  const todayDone = !!days[today];
  let cur = 0;
  let k = todayDone ? today : shiftDay(today, -1);
  while (days[k]) { cur++; k = shiftDay(k, -1); }
  // best run ever
  let best = 0;
  for (const key of Object.keys(days).sort()) {
    if (!days[key]) continue;
    let n = 0, j = key;
    if (days[shiftDay(key, -1)]) continue; // not the start of a run
    while (days[j]) { n++; j = shiftDay(j, 1); }
    best = Math.max(best, n);
  }
  return { current: cur, best: Math.max(best, cur), todayDone };
}

/** The last 7 days (oldest first) for the week strip on Home. */
export function week(p, now = Date.now()) {
  const today = dayKey(now);
  return Array.from({ length: 7 }, (_, i) => {
    const k = shiftDay(today, i - 6);
    const [y, m, d] = k.split('-').map(Number);
    return { key: k, done: !!p.days?.[k], today: k === today, label: 'SMTWTFS'[new Date(y, m - 1, d).getDay()] };
  });
}

export function markDone(p, id, now = Date.now()) {
  const prev = p.lessons[id] || {};
  return { ...p, lessons: { ...p.lessons, [id]: { ...prev, done: true, completedAt: prev.completedAt ?? now } } };
}

export function recordQuiz(p, id, score) {
  const r = p.lessons[id] || {};
  const prev = r.quiz;
  return { ...p, lessons: { ...p.lessons, [id]: { ...r, quiz: { best: Math.max(prev?.best ?? 0, score), last: score, attempts: (prev?.attempts || 0) + 1 } } } };
}

/** Sandbox build result. Keeps the best score and the latest workflow. */
export function recordBuild(p, challengeId, { score, passed, wf }, now = Date.now()) {
  const prev = p.builds?.[challengeId];
  const better = !prev || score >= prev.best;
  return { ...p, builds: { ...p.builds, [challengeId]: { best: Math.max(prev?.best ?? 0, score), passed: better ? passed : prev.passed, at: now, wf } } };
}

/** Saves a draft workflow without grading it. */
export function saveDraft(p, challengeId, wf) {
  const prev = p.builds?.[challengeId] || { best: 0, passed: [] };
  return { ...p, builds: { ...p.builds, [challengeId]: { ...prev, wf } } };
}

export function recordOutside(p, key, checked, total, now = Date.now()) {
  return { ...p, outside: { ...p.outside, [key]: { checked, total, at: now } } };
}

/** Wipes one module: its lessons, quiz scores, sandbox builds and outside builds. Streak days stay. */
export function resetUnit(p, unitId, challengeUnit = () => null) {
  const ids = new Set(unitById(unitId).lessons.map((l) => l.id));
  const keep = (obj, test) => Object.fromEntries(Object.entries(obj || {}).filter(([k]) => !test(k)));
  return {
    ...p,
    lessons: keep(p.lessons, (k) => ids.has(k)),
    outside: keep(p.outside, (k) => ids.has(k.split(':')[0])),
    builds: keep(p.builds, (k) => challengeUnit(k) === unitId),
    exam: unitId === 'exam' ? {} : p.exam,
  };
}

/** First not-done lesson in the recommended order that has content, or null. */
export function nextUp(p, available = () => true) {
  return pathLessons().find((l) => !isDone(p, l.id) && available(l)) || null;
}

/**
 * Mastery of one lesson, 0..1. Finishing is half; the rest is the best quiz score
 * and how well its flashcards are retained (`retention`: lessonId → 0..1).
 */
export function lessonMastery(p, l, retention = {}) {
  const r = p.lessons[l.id];
  if (!r?.done) return 0;
  const parts = [r.quiz?.best ?? null, retention[l.id] ?? null].filter((x) => x != null);
  const extra = parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 1;
  return 0.5 + 0.5 * extra;
}

const summarize = (p, lessons, retention) => {
  const done = lessons.filter((l) => isDone(p, l.id)).length;
  const mastery = lessons.length ? lessons.reduce((a, l) => a + lessonMastery(p, l, retention), 0) / lessons.length : 0;
  return { done, total: lessons.length, mastery };
};

export const unitSummary = (p, u, retention) => summarize(p, u.lessons, retention);
export const trackSummary = (p, trackId, retention) => summarize(p, unitsOfTrack(trackId).flatMap((u) => u.lessons), retention);

export function overallSummary(p, retention) {
  return {
    ...summarize(p, units.flatMap((u) => u.lessons), retention),
    tracks: tracks.map((t) => ({ track: t, ...trackSummary(p, t.id, retention) })),
  };
}

/** Drops lesson ids that no longer exist (course edits) and bad records; fills missing sections. */
export function cleanProgress(p, knownIds) {
  const lessons = {};
  for (const [id, r] of Object.entries(p?.lessons || {})) {
    if (knownIds.has(id) && r && typeof r === 'object') lessons[id] = r;
  }
  const obj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
  return { ...newProgress(p?.createdAt), ...p, lessons, builds: obj(p?.builds), outside: obj(p?.outside), days: obj(p?.days), exam: obj(p?.exam) };
}
