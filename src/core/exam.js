// Final exam + launch readiness. Pure logic (no DOM).
//   draw(bank, seed)       → question ids for one attempt (25 tech, 25 biz, 10 legal, spread across modules)
//   scoreAttempt(...)      → overall, per-track, modules to redo
//   readiness(progress)    → the launch-readiness verdict
import { shuffle } from './quiz.js';
import { unitById } from './course.js';

export const EXAM_MIX = { tech: 25, biz: 25, legal: 10 };
export const BAR = { overall: 0.8, track: 0.7 };
export const CAPSTONE = { unit: 'capstone', build: 'capstone-build', real: 'capstone-06:cap-real', realMin: 6 };

export const trackOf = (q) => unitById(q.mod).track;

/** Round-robin across modules so every module is represented. */
export function draw(bank, seed = Date.now()) {
  const ids = [];
  for (const [track, n] of Object.entries(EXAM_MIX)) {
    const byUnit = {};
    for (const q of shuffle(bank.filter((x) => trackOf(x) === track), seed)) (byUnit[q.mod] ||= []).push(q.id);
    const units = shuffle(Object.keys(byUnit), seed + 1);
    const picked = [];
    while (picked.length < n && units.some((u) => byUnit[u].length)) {
      for (const u of units) { if (picked.length < n && byUnit[u].length) picked.push(byUnit[u].shift()); }
    }
    ids.push(...picked);
  }
  return shuffle(ids, seed + 2);
}

/** answers: { [qid]: { ok, given } } */
export function scoreAttempt(bank, ids, answers) {
  const byId = new Map(bank.map((q) => [q.id, q]));
  const tracks = { tech: [0, 0], biz: [0, 0], legal: [0, 0] };
  const missed = {};
  let right = 0;
  for (const id of ids) {
    const q = byId.get(id);
    const t = trackOf(q);
    tracks[t][1]++;
    if (answers[id]?.ok) { tracks[t][0]++; right++; } else missed[q.mod] = (missed[q.mod] || 0) + 1;
  }
  const byTrack = Object.fromEntries(Object.entries(tracks).map(([t, [r, n]]) => [t, n ? r / n : 0]));
  const overall = ids.length ? right / ids.length : 0;
  const examPassed = overall >= BAR.overall && Object.values(byTrack).every((x) => x >= BAR.track);
  const redo = Object.entries(missed).sort((a, b) => b[1] - a[1]).map(([mod, n]) => ({ mod, missed: n }));
  return { overall, byTrack, right, total: ids.length, examPassed, redo };
}

export function capstoneStatus(p) {
  const u = unitById(CAPSTONE.unit);
  const lessonsDone = u.lessons.filter((l) => p.lessons[l.id]?.done).length;
  const build = p.builds?.[CAPSTONE.build]?.best ?? 0;
  const real = p.outside?.[CAPSTONE.real]?.checked?.length ?? 0;
  return {
    lessonsDone, lessonsTotal: u.lessons.length, build, real, realTotal: 8,
    complete: lessonsDone === u.lessons.length && build === 1 && real >= CAPSTONE.realMin,
  };
}

/** Best attempt by overall score, then the verdict. */
export function readiness(p) {
  const attempts = p.exam?.attempts || [];
  const best = attempts.reduce((a, b) => (!a || b.overall > a.overall || (b.examPassed && !a.examPassed) ? b : a), null);
  const passedAttempt = attempts.find((a) => a.examPassed) || null;
  const cap = capstoneStatus(p);
  const exam = passedAttempt || best;
  return { attempts: attempts.length, best: exam, examPassed: !!passedAttempt, capstone: cap, ready: !!passedAttempt && cap.complete };
}

export function recordAttempt(p, result, now = Date.now()) {
  const attempts = [...(p.exam?.attempts || []), { at: now, overall: result.overall, byTrack: result.byTrack, examPassed: result.examPassed, redo: result.redo }];
  return { ...p, exam: { ...(p.exam || {}), attempts, draft: null } };
}

export function saveDraft(p, draft) {
  return { ...p, exam: { ...(p.exam || {}), draft } };
}
