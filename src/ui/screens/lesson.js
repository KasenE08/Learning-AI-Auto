// Lesson player: steps (swipe or Next) → quiz → results.
// Steps with a `check` make you try before the explanation; Next unlocks once you've answered
// (or asked for the answer). "I'm stuck" shows a metaphor + picture first, then a worked answer.
// Finishing marks the lesson done, logs today's streak, saves the quiz score and adds flashcards.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { rich, termById } from '../rich.js';
import { trackTag } from '../components/parts.js';
import { openSheet } from '../components/sheet.js';
import { outsideBuild } from '../components/outside.js';
import { renderQuestion } from '../quiz/question.js';
import { mountVisual } from '../visuals/index.js';
import { getProgress, saveProgress, getCards, saveCards } from '../../core/store.js';
import { markDone, isDone, recordQuiz, logLessonFinished } from '../../core/progress.js';
import { addLessonCards } from '../../core/review.js';
import { loadLesson } from '../../core/lessons.js';
import { lessonById, unitById, lessonCode, pathLessons, isAvailable } from '../../core/course.js';
import { challengeById } from '../../sim/challenges.js';
import * as examScreen from './exam.js';

export const tab = 'path';

export const TAGS = {
  example: 'Example first', try: 'Your turn', how: 'How it works', see: 'See it', metaphor: 'Picture it', key: 'Key point',
  why: 'Why it matters', math: 'The math', biz: 'In the business', warn: 'Watch out', build: 'Build it', outside: 'Build it for real', law: 'The law',
};

function placeholder(view, l) {
  const u = unitById(l.unit);
  view.append(el(html`<div class="screen lesson">
    <a class="backlink" href="#/module/${u.id}">${icons.back}${u.title}</a>
    <header class="page-head"><span class="kicker">${lessonCode(l)}</span><h1 class="h1">${l.title}</h1><p class="lesson__meta">${trackTag(l.track)}<span>${l.min} min</span></p></header>
    <div class="card placeholder"><b>Coming soon</b><p class="muted">This lesson arrives in build stage ${l.stage}. Every other finished lesson is open now.</p></div>
  </div>`));
}

export function render(view, { id, quiz }) {
  if (id === 'exam-01') return examScreen.render(view);
  const l = lessonById(id);
  if (!l) {
    view.append(el(html`<div class="screen"><p class="muted">No lesson called “${id}”.</p><a class="btn" href="#/path">Back to the path</a></div>`));
    return;
  }
  let alive = true;
  let cleanup = () => {};
  view.append(el(html`<div class="screen"><span class="kicker">Loading ${lessonCode(l)}…</span></div>`));
  loadLesson(id).then((content) => {
    if (!alive) return;
    view.replaceChildren();
    if (!content) { placeholder(view, l); return; }
    document.body.classList.add('focus-mode');
    cleanup = run(view, l, content, { startQuiz: quiz === '1' });
  });
  return () => { alive = false; cleanup(); document.body.classList.remove('focus-mode'); };
}

function run(view, l, content, { startQuiz }) {
  const steps = content.steps;
  const quiz = content.quiz || [];
  const order = pathLessons().filter(isAvailable);
  const next = order[order.findIndex((x) => x.id === l.id) + 1];
  const seed = Date.now() % 100000;
  const u = unitById(l.unit);

  const S = { phase: 'steps', i: 0, q: 0, answers: [] };
  let dispose = () => {};
  let currentCheck = null;

  const shell = el(html`<div class="lr">
    <header class="lr__top">
      <a class="icon-btn" href="#/module/${u.id}" aria-label="Close lesson">${icons.close}</a>
      <div class="lr__prog" aria-hidden="true">${steps.map(() => html`<i></i>`)}${quiz.length ? html`<i class="is-quiz"></i>` : ''}</div>
      <span class="lr__count mono"></span>
    </header>
    <div class="lr__body"></div>
    <footer class="lr__foot"><button class="btn btn--ghost" data-back>${icons.back}<span>Back</span></button><button class="btn btn--primary" data-next><span>Next</span>${icons.chevron}</button></footer>
  </div>`);
  view.append(shell);
  const body = shell.querySelector('.lr__body');
  const back = shell.querySelector('[data-back]');
  const nextBtn = shell.querySelector('[data-next]');
  const bars = [...shell.querySelectorAll('.lr__prog i')];
  const count = shell.querySelector('.lr__count');

  const setNext = (label, { disabled = false, icon = icons.chevron } = {}) => {
    nextBtn.innerHTML = `<span>${label}</span>${icon || ''}`;
    nextBtn.disabled = disabled;
  };
  const paint = () => bars.forEach((b, k) => {
    const isQuiz = k === steps.length;
    b.classList.toggle('is-done', S.phase !== 'steps' ? !isQuiz || S.phase === 'done' : k < S.i);
    b.classList.toggle('is-now', S.phase === 'steps' ? k === S.i : isQuiz && S.phase === 'quiz');
  });
  const stepLabel = () => (S.i === steps.length - 1 ? (quiz.length ? 'Quiz' : 'Finish') : 'Next');

  function showStep() {
    dispose();
    const st = steps[S.i];
    const gateSort = st.visual?.type === 'sort'; // sort first, then the explanation unlocks
    const pv = st.visual && (st.visualFirst || gateSort); // visual shown before the bullets
    const art = el(html`<article class="step">
      <span class="kicker kicker--accent">${TAGS[st.tag] || st.tag}</span>
      <h2 class="h2">${st.title}</h2>
      ${pv ? html`<div class="step__vis"></div>` : ''}
      ${st.predict ? html`<div class="step__predict"><span class="kicker">Predict first · one tap</span></div>` : ''}
      <div class="step__reveal" ${st.predict || gateSort ? 'hidden' : ''}>
        ${st.body?.length ? html`<ul class="bullets">${st.body.map((b) => html`<li>${rich(b)}</li>`)}</ul>` : ''}
        ${st.visual && !pv ? html`<div class="step__vis"></div>` : ''}
        <div class="step__check"></div>
        ${st.build ? buildLink(st.build) : ''}
        <div class="step__outside"></div>
        ${st.note ? html`<p class="step__note">${rich(st.note)}</p>` : ''}
      </div>
    </article>`);
    body.replaceChildren(art);
    const disposers = [];
    if (st.visual) disposers.push(mountVisual(art.querySelector('.step__vis'), st.visual).destroy);
    if (st.outside) art.querySelector('.step__outside').append(outsideBuild(st.outside, l.id));
    currentCheck = null;
    let predicted = !st.predict;
    let sorted = !gateSort;
    const reveal = () => { if (predicted && sorted) art.querySelector('.step__reveal').hidden = false; };
    const gate = () => {
      if (!predicted) return setNext('Make your guess', { disabled: true, icon: '' });
      if (!sorted) return setNext('Sort them to continue', { disabled: true, icon: '' });
      if (currentCheck && !currentCheck.isDone()) return setNext('Answer to continue', { disabled: true, icon: '' });
      setNext(stepLabel());
    };
    if (st.predict) {
      // A guess, not a test: one try, then the answer and the explanation unlock.
      const p = renderQuestion({ type: 'mc', ...st.predict }, { seed: seed + 50 + S.i, mode: 'quiz', onDone: () => {
        predicted = true;
        reveal();
        gate();
      } });
      art.querySelector('.step__predict').append(p.el);
    }
    if (gateSort) art.addEventListener('vis-done', () => { sorted = true; reveal(); gate(); });
    if (st.check) {
      const box = art.querySelector('.step__check');
      currentCheck = renderQuestion(st.check, { seed: seed + S.i, mode: 'try', onDone: () => { gate(); box.querySelector('.stuck-btn')?.remove(); } });
      box.append(currentCheck.el);
      if (st.stuck) box.append(stuckButton(st.stuck, () => currentCheck.reveal(), disposers));
    }
    dispose = () => disposers.forEach((d) => d());
    count.textContent = `${S.i + 1}/${steps.length}`;
    back.disabled = S.i === 0;
    gate();
    paint();
    window.scrollTo(0, 0);
  }

  function showQuestion() {
    dispose();
    const q = quiz[S.q];
    const wrap = el(html`<article class="step step--quiz"><span class="kicker kicker--accent">Quiz · ${S.q + 1} of ${quiz.length}</span></article>`);
    const r = renderQuestion(q, { seed: seed + 100 + S.q, mode: 'quiz', onDone: ({ ok }) => { S.answers[S.q] = { ok }; setNext(S.q === quiz.length - 1 ? 'Results' : 'Next question'); } });
    wrap.append(r.el);
    body.replaceChildren(wrap);
    dispose = () => {};
    count.textContent = `Q${S.q + 1}/${quiz.length}`;
    back.disabled = true;
    setNext('Answer to continue', { disabled: true, icon: '' });
    paint();
    window.scrollTo(0, 0);
  }

  async function finish() {
    dispose();
    const correct = S.answers.filter((a) => a?.ok).length;
    const score = quiz.length ? correct / quiz.length : 1;
    const before = getProgress();
    const first = !isDone(before, l.id);
    let p = logLessonFinished(markDone(before, l.id));
    if (quiz.length) p = recordQuiz(p, l.id, score);
    const { cards, added } = addLessonCards(getCards(), l.id, content.cards || []);
    await saveProgress(p);
    if (added) await saveCards(cards);
    S.phase = 'done';
    paint();
    count.textContent = 'Done';
    const pct = Math.round(score * 100);
    body.replaceChildren(el(html`<article class="step results">
      <span class="kicker kicker--accent">${first ? 'Lesson complete' : 'Lesson reviewed'} · streak day logged</span>
      <h2 class="h2">${l.title}</h2>
      ${quiz.length ? html`<div class="results__score"><span class="mono results__num ${pct >= 80 ? 'is-good' : pct >= 50 ? '' : 'is-low'}">${correct}/${quiz.length}</span><span class="muted">${pct === 100 ? 'Clean sweep.' : pct >= 80 ? 'Solid.' : pct >= 50 ? 'Getting there. The flashcards will drill the misses.' : 'Worth a retake later.'}</span></div>
      <ul class="results__list">${quiz.map((q, k) => html`<li class="${S.answers[k]?.ok ? 'is-ok' : 'is-bad'}"><span class="tick">${S.answers[k]?.ok ? icons.check : icons.close}</span><span>${rich(q.q)}</span></li>`)}</ul>` : ''}
      <p class="results__cards mono">${added ? `+${added} flashcard${added === 1 ? '' : 's'} added to Review` : 'Flashcards already in your deck'}</p>
      <div class="btn-row">
        ${next ? html`<a class="btn btn--primary" href="#/lesson/${next.id}">Next: ${next.title}${icons.chevron}</a>` : ''}
        ${quiz.length ? html`<button class="btn" data-retake>Retake quiz</button>` : ''}
        <a class="btn btn--ghost" href="#/module/${u.id}">${u.title}</a>
      </div>
    </article>`));
    body.querySelector('[data-retake]')?.addEventListener('click', () => { S.phase = 'quiz'; S.q = 0; S.answers = []; shell.classList.remove('is-done'); showQuestion(); });
    shell.classList.add('is-done');
    window.scrollTo(0, 0);
  }

  function forward() {
    if (nextBtn.disabled) return;
    if (S.phase === 'steps') {
      if (S.i < steps.length - 1) { S.i++; showStep(); }
      else if (quiz.length) { S.phase = 'quiz'; S.q = 0; showQuestion(); }
      else finish();
    } else if (S.phase === 'quiz') {
      if (S.q < quiz.length - 1) { S.q++; showQuestion(); } else finish();
    }
  }
  function backward() { if (S.phase === 'steps' && S.i > 0) { S.i--; showStep(); } }
  nextBtn.addEventListener('click', forward);
  back.addEventListener('click', backward);

  let sx = 0, sy = 0, ok = false;
  body.addEventListener('touchstart', (e) => { ok = S.phase === 'steps' && !e.target.closest('[data-noswipe], input, textarea, details'); sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  body.addEventListener('touchend', (e) => {
    if (!ok) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 50) (dx < 0 ? forward : backward)();
  }, { passive: true });
  const onKey = (e) => {
    if (e.target.closest?.('input, textarea, select')) return;
    if (e.key === 'ArrowRight') forward();
    if (e.key === 'ArrowLeft') backward();
  };
  document.addEventListener('keydown', onKey);

  body.addEventListener('click', (e) => {
    const a = e.target.closest('[data-gloss]');
    if (!a) return;
    e.preventDefault();
    const g = termById(a.dataset.gloss);
    if (g) openSheet(el(html`<div class="dialog"><span class="kicker">Glossary</span><h3 class="h3">${g.term}</h3>${g.aka?.length ? html`<p class="muted small">${g.aka.join(' · ')}</p>` : ''}<p class="dialog__text">${rich(g.def)}</p></div>`));
  });

  if (startQuiz && quiz.length) { S.phase = 'quiz'; showQuestion(); } else showStep();
  return () => { dispose(); document.removeEventListener('keydown', onKey); };
}

/** "I'm stuck": first a metaphor + picture, then a worked answer you can work backward from. */
function stuckButton(stuck, reveal, disposers) {
  const box = el(html`<div class="stuck"><button type="button" class="btn btn--ghost stuck-btn">${icons.bulb}I’m stuck</button><div class="stuck__panel" hidden></div></div>`);
  const panel = box.querySelector('.stuck__panel');
  box.querySelector('.stuck-btn').addEventListener('click', (e) => {
    e.currentTarget.remove();
    panel.hidden = false;
    panel.innerHTML = String(html`<span class="kicker">Picture it</span><p>${rich(stuck.metaphor)}</p><div class="stuck__vis"></div>
      <button type="button" class="btn" data-worked>Still stuck: show the worked answer</button>`);
    if (stuck.visual) disposers.push(mountVisual(panel.querySelector('.stuck__vis'), stuck.visual).destroy);
    panel.querySelector('[data-worked]').addEventListener('click', (ev) => {
      ev.currentTarget.replaceWith(el(html`<div class="worked"><span class="kicker">Worked answer</span><ol>${stuck.worked.map((w) => html`<li>${rich(w)}</li>`)}</ol></div>`));
      reveal();
    });
  });
  return box;
}

function buildLink(b) {
  const c = challengeById(b.challenge);
  if (!c) return '';
  const best = getProgress().builds?.[c.id]?.best;
  return html`<a class="card buildlink" href="#/builder/${c.id}">
    <span class="kicker">Sandbox build · ${c.checks.length} checks</span>
    <b>${c.title}</b>
    <span class="muted">${best != null ? `Best so far: ${Math.round(best * 100)}%` : 'Not tried yet'}</span>
    <span class="btn btn--primary">${icons.builder}Open the builder</span>
  </a>`;
}
