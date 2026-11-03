import { describe, it, expect } from 'vitest';
import { newProgress, markDone, recordQuiz, logLessonFinished, streak, week, dayKey, resetUnit, recordBuild, recordOutside, cleanProgress, nextUp, isDone, unitSummary } from '../src/core/progress.js';
import { unitById, allLessons, pathLessons } from '../src/core/course.js';
import { addLessonCards, removeLessonCards } from '../src/core/review.js';

const DAY = 864e5;
const noon = new Date(2026, 10, 3, 12).getTime();

describe('streak', () => {
  it('counts consecutive days with a finished lesson', () => {
    let p = newProgress();
    for (const d of [3, 2, 1, 0]) p = logLessonFinished(p, noon - d * DAY);
    expect(streak(p, noon)).toMatchObject({ current: 4, best: 4, todayDone: true });
  });
  it('today not done yet keeps yesterday’s streak alive', () => {
    let p = newProgress();
    for (const d of [2, 1]) p = logLessonFinished(p, noon - d * DAY);
    expect(streak(p, noon)).toMatchObject({ current: 2, todayDone: false });
  });
  it('a missed day resets it but best remembers', () => {
    let p = newProgress();
    for (const d of [10, 9, 8, 2]) p = logLessonFinished(p, noon - d * DAY);
    expect(streak(p, noon)).toMatchObject({ current: 0, best: 3 });
  });
  it('week strip has 7 days ending today', () => {
    const w = week(newProgress(), noon);
    expect(w).toHaveLength(7);
    expect(w[6]).toMatchObject({ today: true, key: dayKey(noon) });
  });
});

describe('progress', () => {
  it('records quiz best score', () => {
    let p = recordQuiz(markDone(newProgress(), 'found-01'), 'found-01', 0.5);
    p = recordQuiz(p, 'found-01', 0.25);
    expect(p.lessons['found-01'].quiz).toMatchObject({ best: 0.5, last: 0.25, attempts: 2 });
  });
  it('keeps the best build score', () => {
    let p = recordBuild(newProgress(), 'first-flow', { score: 0.8, passed: ['a'], wf: {} });
    p = recordBuild(p, 'first-flow', { score: 0.4, passed: [], wf: { x: 1 } });
    expect(p.builds['first-flow']).toMatchObject({ best: 0.8, passed: ['a'], wf: { x: 1 } });
  });
  it('resets one module only, keeping streak days', () => {
    let p = logLessonFinished(markDone(markDone(newProgress(), 'found-01'), 'llm-01'), noon);
    p = recordOutside(p, 'found-01:x', [0], 3);
    p = recordBuild(p, 'first-flow', { score: 1, passed: [], wf: {} });
    const r = resetUnit(p, 'found', (id) => (id === 'first-flow' ? 'found' : null));
    expect(isDone(r, 'found-01')).toBe(false);
    expect(isDone(r, 'llm-01')).toBe(true);
    expect(r.outside).toEqual({});
    expect(r.builds).toEqual({});
    expect(Object.keys(r.days)).toHaveLength(1);
  });
  it('removes a module’s flashcards', () => {
    let { cards } = addLessonCards({}, 'found-01', [{ id: 'a' }, { id: 'b' }]);
    ({ cards } = addLessonCards(cards, 'llm-01', [{ id: 'a' }]));
    const left = removeLessonCards(cards, unitById('found').lessons.map((l) => l.id));
    expect(Object.keys(left)).toEqual(['llm-01:a']);
  });
  it('cleans unknown lessons and fills missing sections', () => {
    const known = new Set(allLessons().map((l) => l.id));
    const p = cleanProgress({ lessons: { 'found-01': { done: true }, 'zzz-01': { done: true } } }, known);
    expect(Object.keys(p.lessons)).toEqual(['found-01']);
    expect(p.builds).toEqual({});
    expect(p.days).toEqual({});
  });
  it('next up follows the path and skips lessons without content', () => {
    expect(nextUp(newProgress())).toEqual(pathLessons()[0]);
    expect(nextUp(newProgress(), (l) => l.id === 'found-03').id).toBe('found-03');
  });
  it('module summary', () => {
    const s = unitSummary(markDone(newProgress(), 'found-01'), unitById('found'), {});
    expect(s.done).toBe(1);
    expect(s.total).toBe(unitById('found').lessons.length);
  });
});
