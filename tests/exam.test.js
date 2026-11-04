import { describe, it, expect } from 'vitest';
import { examBank } from '../src/content/exam.js';
import { draw, scoreAttempt, readiness, recordAttempt, EXAM_MIX, trackOf, capstoneStatus } from '../src/core/exam.js';
import { grade } from '../src/core/quiz.js';
import { unitById } from '../src/core/course.js';
import { newProgress, markDone, recordBuild, recordOutside } from '../src/core/progress.js';

describe('exam bank', () => {
  it('ids unique, units valid, answers correct', () => {
    expect(new Set(examBank.map((q) => q.id)).size).toBe(examBank.length);
    for (const q of examBank) {
      expect(unitById(q.mod), q.id).toBeTruthy();
      expect(q.why, q.id).toBeTruthy();
      const right = q.type === 'order' ? q.items.map((_, i) => i) : q.answer;
      expect(grade(q, right), q.id).toBe(true);
    }
  });
  it('has enough questions per track', () => {
    for (const [t, n] of Object.entries(EXAM_MIX)) expect(examBank.filter((q) => trackOf(q) === t).length).toBeGreaterThanOrEqual(n);
  });
  it('draw gives 60 unique questions with the right mix, covering every module', () => {
    const ids = draw(examBank, 42);
    expect(ids).toHaveLength(60);
    expect(new Set(ids).size).toBe(60);
    const qs = ids.map((id) => examBank.find((q) => q.id === id));
    for (const [t, n] of Object.entries(EXAM_MIX)) expect(qs.filter((q) => trackOf(q) === t)).toHaveLength(n);
    expect(new Set(qs.map((q) => q.mod)).size).toBe(13);
  });
});

describe('scoring and readiness', () => {
  const ids = draw(examBank, 7);
  const all = (fn) => Object.fromEntries(ids.map((id, i) => [id, { ok: fn(id, i) }]));
  it('passes at 100%', () => expect(scoreAttempt(examBank, ids, all(() => true)).examPassed).toBe(true));
  it('fails a track under 70% even if overall is high', () => {
    const legal = new Set(ids.filter((id) => trackOf(examBank.find((q) => q.id === id)) === 'legal'));
    const r = scoreAttempt(examBank, ids, all((id) => !legal.has(id) || [...legal].indexOf(id) < 6));
    expect(r.byTrack.legal).toBeCloseTo(0.6);
    expect(r.overall).toBeGreaterThan(0.8);
    expect(r.examPassed).toBe(false);
    expect(r.redo[0].mod).toBe('legal');
  });
  it('ready needs a passed exam AND the capstone', () => {
    let p = recordAttempt(newProgress(), scoreAttempt(examBank, ids, all(() => true)));
    expect(readiness(p)).toMatchObject({ examPassed: true, ready: false });
    for (let n = 1; n <= 8; n++) p = markDone(p, `capstone-0${n}`);
    p = recordBuild(p, 'capstone-build', { score: 1, passed: [], wf: {} });
    p = recordOutside(p, 'capstone-06:cap-real', [0, 1, 2, 3, 4, 5], 8);
    expect(capstoneStatus(p).complete).toBe(true);
    expect(readiness(p).ready).toBe(true);
  });
});
