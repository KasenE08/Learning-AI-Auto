import { describe, it, expect } from 'vitest';
import { grade, parseNumber, shuffledOrder } from '../src/core/quiz.js';
import { makeBackup, parseBackup } from '../src/core/backup.js';
import { newProgress, markDone } from '../src/core/progress.js';
import { parse } from '../src/router.js';
import { units } from '../src/core/course.js';

describe('quiz', () => {
  it('grades every type', () => {
    expect(grade({ type: 'mc', answer: 2 }, 2)).toBe(true);
    expect(grade({ type: 'multi', answer: [0, 2] }, [2, 0])).toBe(true);
    expect(grade({ type: 'multi', answer: [0, 2] }, [0])).toBe(false);
    expect(grade({ type: 'order', items: ['a', 'b', 'c'] }, [0, 1, 2])).toBe(true);
    expect(grade({ type: 'num', answer: 1200 }, '$1,200')).toBe(true);
    expect(grade({ type: 'num', answer: 2, tol: 0.01 }, '2.5')).toBe(false);
  });
  it('parses money and percent', () => { expect(parseNumber('$1,500')).toBe(1500); expect(parseNumber('12%')).toBe(12); expect(parseNumber('abc')).toBeNaN(); });
  it('never leaves order questions solved', () => { for (let s = 1; s < 50; s++) expect(shuffledOrder(4, s)).not.toEqual([0, 1, 2, 3]); });
});

describe('backup', () => {
  it('round-trips', () => {
    const progress = markDone(newProgress(), 'found-01');
    const b = parseBackup(JSON.stringify(makeBackup({ progress, cards: {}, settings: {} })));
    expect(b.progress.lessons['found-01'].done).toBe(true);
  });
  it('rejects other files', () => {
    expect(() => parseBackup('{"app":"learning-cars","version":1}')).toThrow(/Learning AI Auto/);
    expect(() => parseBackup('nope')).toThrow(/JSON/);
  });
});

describe('router', () => {
  it('parses routes and query params', () => {
    expect(parse('#/lesson/found-01?quiz=1')).toEqual({ name: 'lesson', params: { id: 'found-01', quiz: '1' } });
    expect(parse('#/builder/free-dental')).toEqual({ name: 'workspace', params: { id: 'free-dental' } });
    expect(parse('#/module/found')).toEqual({ name: 'module', params: { id: 'found' } });
    expect(parse('#/nope')).toEqual({ name: 'home', params: {} });
  });
});

describe('course map', () => {
  it('has 15 modules with unique ids, numbered 1–15', () => {
    expect(units.map((u) => u.n)).toEqual([...Array(15).keys()].map((i) => i + 1));
    expect(new Set(units.map((u) => u.id)).size).toBe(15);
  });
});

describe('shuffle fairness', () => {
  it('puts the correct option (index 0) in every position about equally, even for neighboring seeds', () => {
    for (const base of [5, 12345, 500000000]) {
      const pos = [0, 0, 0, 0];
      for (let k = 0; k < 4000; k++) pos[shuffledOrder(4, base + k).indexOf(0)]++;
      for (const c of pos) expect(c / 4000).toBeGreaterThan(0.18);
    }
  });
});

import { templates, roiNumbers } from '../src/content/templates.js';
describe('templates', () => {
  it('six templates render with empty and example values', () => {
    expect(templates).toHaveLength(6);
    for (const t of templates) {
      expect(t.out({})).toBeTruthy();
      const ex = Object.fromEntries(t.fields.map((f) => [f.key, f.placeholder || '']));
      expect(t.out(ex)).not.toMatch(/undefined|NaN/);
    }
  });
  it('ROI math matches Module 7', () => {
    const r = roiNumbers({ tasks: 120, minutes: 3, rate: 22, wins: 1, profit: 600, running: 350, setup: 2000 });
    expect(Math.round(r.net)).toBe(822);
    expect(r.payback).toBeCloseTo(2.43, 1);
  });
  it('router knows templates', () => expect(parse('#/template/roi')).toEqual({ name: 'template', params: { id: 'roi' } }));
});
