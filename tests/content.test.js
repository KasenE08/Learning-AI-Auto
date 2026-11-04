// Checks every lesson file against the format in docs/CONTENT_GUIDE.md.
import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { lessonById } from '../src/core/course.js';
import { glossary } from '../src/content/glossary.js';
import { grade } from '../src/core/quiz.js';
import { challengeById } from '../src/sim/challenges.js';

const TAGS = ['example', 'try', 'how', 'see', 'metaphor', 'key', 'why', 'math', 'biz', 'warn', 'build', 'outside', 'law'];
const VISUALS = ['flow', 'record', 'exchange', 'calc', 'compare', 'roleplay'];
const QTYPES = ['mc', 'multi', 'order', 'num'];
const terms = new Set(glossary.map((g) => g.id));
const files = readdirSync('src/content/lessons').filter((f) => f.endsWith('.js'));

const checkQuestion = (q, where) => {
  expect(QTYPES, where).toContain(q.type);
  expect(q.q, where).toBeTruthy();
  expect(q.why, `${where}: every question explains why`).toBeTruthy();
  if (q.type === 'mc') { expect(q.options.length).toBeGreaterThanOrEqual(2); expect(grade(q, q.answer)).toBe(true); }
  if (q.type === 'multi') { expect(q.answer.length).toBeGreaterThan(0); expect(grade(q, q.answer)).toBe(true); }
  if (q.type === 'order') { expect(q.items.length).toBeGreaterThanOrEqual(3); expect(grade(q, q.items.map((_, i) => i))).toBe(true); }
  if (q.type === 'num') expect(grade(q, q.answer)).toBe(true);
};

const checkVisual = (v, where) => {
  expect(VISUALS, where).toContain(v.type);
  if (v.type === 'flow') expect(v.nodes.length).toBeGreaterThan(0);
  if (v.type === 'compare') for (const r of v.rows) expect([v.cols.length, v.cols.length + 1], `${where}: compare row width`).toContain(r.length);
  if (v.type === 'calc') for (const o of v.outputs) expect(Number.isFinite(o.f(Object.fromEntries(v.inputs.map((i) => [i.key, i.value]))))).toBe(true);
  if (v.type === 'roleplay') {
    expect(v.nodes[v.start], `${where}: roleplay start`).toBeTruthy();
    const seen = new Set();
    const walk = (id, depth) => {
      const n = v.nodes[id];
      expect(n, `${where}: roleplay node ${id}`).toBeTruthy();
      expect(n.say).toBeTruthy();
      expect(depth, `${where}: roleplay too deep / loops`).toBeLessThan(12);
      if (n.end) return;
      expect(n.choices.length).toBeGreaterThanOrEqual(2);
      expect(n.choices.some((c) => c.score === 2), `${where}: node ${id} needs a best (2) choice`).toBe(true);
      for (const c of n.choices) { expect([0, 1, 2]).toContain(c.score); expect(c.why, `${where}: choice needs why`).toBeTruthy(); seen.add(c.next); walk(c.next, depth + 1); }
    };
    walk(v.start, 0);
  }
  if (v.type === 'exchange') for (const m of v.messages) { expect(m.from).toBeLessThan(v.actors.length); expect(m.to).toBeLessThan(v.actors.length); }
};

const texts = (lesson) => [
  ...lesson.steps.flatMap((s) => [s.title, ...(s.body || []), s.note || '', s.check?.q || '', s.check?.why || '', ...(s.check?.options || []), s.stuck?.metaphor || '', ...(s.stuck?.worked || [])]),
  ...lesson.quiz.flatMap((q) => [q.q, q.why, q.scenario || '', ...(q.options || []), ...(q.items || []), ...Object.values(q.wrong || {})]),
  ...lesson.cards.flatMap((c) => [c.front, c.back]),
];

describe.each(files)('lesson %s', async (file) => {
  const id = file.replace('.js', '');
  const lesson = (await import(`../src/content/lessons/${id}.js`)).default;

  it('is in the course map', () => expect(lessonById(id)).toBeTruthy());
  it('has 4–8 steps with known tags; step 1 is an example (example first)', () => {
    expect(lesson.steps.length).toBeGreaterThanOrEqual(4);
    expect(lesson.steps.length).toBeLessThanOrEqual(8);
    expect(lesson.steps[0].tag).toBe('example');
    for (const s of lesson.steps) {
      expect(TAGS, s.title).toContain(s.tag);
      expect(s.title).toBeTruthy();
      if (s.visual) checkVisual(s.visual, s.title);
      if (s.check) checkQuestion(s.check, s.title);
      if (s.stuck) { expect(s.check, `${s.title}: stuck help needs a check`).toBeTruthy(); expect(s.stuck.metaphor).toBeTruthy(); expect(s.stuck.worked.length).toBeGreaterThan(0); if (s.stuck.visual) checkVisual(s.stuck.visual, s.title); }
      if (s.build) expect(challengeById(s.build.challenge), s.build.challenge).toBeTruthy();
      expect(!!s.build, `${s.title}: build steps use tag 'build'`).toBe(s.tag === 'build');
      expect(!!s.outside, `${s.title}: outside builds use tag 'outside'`).toBe(s.tag === 'outside');
      if (s.outside?.roleplay) { const r = s.outside.roleplay; for (const k of ['persona', 'business', 'situation']) expect(r[k], `roleplay.${k}`).toBeTruthy(); expect(r.hidden.length).toBeGreaterThan(0); }
      if (s.outside) { expect(s.outside.id).toBeTruthy(); expect(s.outside.steps.length).toBeGreaterThan(0); expect(s.outside.prompt).toBeTruthy(); expect(s.outside.checklist.length).toBeGreaterThanOrEqual(3); }
    }
  });
  it('lets you try before explaining: the first step has a check', () => expect(lesson.steps[0].check).toBeTruthy());
  it('has a 3–5 question quiz', () => {
    expect(lesson.quiz.length).toBeGreaterThanOrEqual(3);
    expect(lesson.quiz.length).toBeLessThanOrEqual(5);
    lesson.quiz.forEach((q, i) => checkQuestion(q, `quiz ${i + 1}`));
  });
  it('has 3–6 flashcards with unique ids', () => {
    expect(lesson.cards.length).toBeGreaterThanOrEqual(3);
    expect(lesson.cards.length).toBeLessThanOrEqual(6);
    expect(new Set(lesson.cards.map((c) => c.id)).size).toBe(lesson.cards.length);
  });
  it('links only to glossary terms that exist', () => {
    for (const t of texts(lesson)) for (const m of String(t).matchAll(/\[\[([\w-]+)(?:\|[^\]]+)?\]\]/g)) expect(terms, `[[${m[1]}]]`).toContain(m[1]);
  });
});

describe('glossary', () => {
  it('ids are unique and entries complete', () => {
    expect(new Set(glossary.map((g) => g.id)).size).toBe(glossary.length);
    for (const g of glossary) { expect(g.term).toBeTruthy(); expect(g.def).toBeTruthy(); for (const l of g.lessons || []) expect(lessonById(l), `${g.id} → ${l}`).toBeTruthy(); }
  });
});
