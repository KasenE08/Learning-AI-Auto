// Renders one question with instant correction.
//   mode 'try'  (inside a lesson step): wrong answers are flagged on the spot and you try again.
//   mode 'quiz' (end of lesson): your first answer is scored, then the right answer is shown.
// Order questions are corrected on every tap: a wrong next item bounces back right away.
// onDone({ ok }) fires once, when the question is finished. `ok` = right on the first try.
import { html, el } from '../dom.js';
import { rich } from '../rich.js';
import { shuffledOrder, parseNumber, grade, numTolerance } from '../../core/quiz.js';

const L = 'ABCDEFGH';

export function renderQuestion(q, { seed = 1, mode = 'quiz', onDone = () => {} } = {}) {
  const root = el(html`<div class="q q--${q.type}" data-noswipe>
    ${q.scenario ? html`<div class="q__scenario"><span class="kicker">Scenario</span><p>${rich(q.scenario)}</p></div>` : ''}
    <p class="q__text">${rich(q.q)}</p>
    ${q.type === 'multi' ? html`<p class="q__hint">Select all that apply.</p>` : ''}
    <div class="q__body"></div>
    <div class="q__fb" aria-live="polite"></div>
  </div>`);
  const body = root.querySelector('.q__body');
  const fbBox = root.querySelector('.q__fb');
  let finished = false;
  let firstTry = true;
  const exam = mode === 'exam'; // exam: answers are saved silently; feedback comes at the end
  const finishExam = (ok, given) => {
    if (finished) return;
    finished = true;
    root.classList.add('is-done', 'is-exam');
    fbBox.innerHTML = '<p class="muted small">Answer saved.</p>';
    onDone({ ok, given });
  };

  const feedback = (kind, head, text) => {
    fbBox.innerHTML = String(html`<div class="fb fb--${kind}"><b>${head}</b> ${text ? rich(text) : ''}</div>`);
  };
  const finish = (ok, revealed = false) => {
    if (finished) return;
    finished = true;
    root.classList.add('is-done');
    const extra = !ok && mode === 'quiz' ? html`<p class="fb__ans"><span class="muted">Answer:</span> <b>${rich(answerText())}</b></p>` : '';
    fbBox.innerHTML = String(html`<div class="fb ${ok ? 'fb--ok' : revealed ? 'fb--info' : 'fb--bad'}"><b>${ok ? (firstTry ? 'Correct.' : 'Got it.') : revealed ? 'Here’s the answer.' : 'Not quite.'}</b> ${rich(q.why || '')}${extra}</div>`);
    onDone({ ok: ok && firstTry });
  };
  let answerText = () => '';
  let reveal = () => {};

  if (q.type === 'mc') {
    const order = shuffledOrder(q.options.length, seed);
    body.innerHTML = String(html`<div class="opts">${order.map((i, k) => html`<button type="button" class="opt" data-i="${i}"><span class="opt__k">${L[k]}</span><span>${rich(q.options[i])}</span></button>`)}</div>`);
    const mark = () => body.querySelectorAll('.opt').forEach((b) => { if (Number(b.dataset.i) === q.answer) b.classList.add('is-right'); b.disabled = true; });
    body.addEventListener('click', (e) => {
      const b = e.target.closest('.opt');
      if (!b || finished || b.disabled) return;
      const i = Number(b.dataset.i);
      if (exam) { b.classList.add('is-sel'); body.querySelectorAll('.opt').forEach((x) => { x.disabled = true; }); return finishExam(i === q.answer, q.options[i]); }
      if (i === q.answer) { mark(); return finish(true); }
      b.classList.add('is-wrong');
      b.disabled = true;
      if (mode === 'quiz') { firstTry = false; mark(); return finish(false); }
      firstTry = false;
      feedback('bad', 'Not quite.', q.wrong?.[i] || 'Try another one.');
    });
    answerText = () => q.options[q.answer];
    reveal = () => { mark(); firstTry = false; finish(false, true); };
  }

  if (q.type === 'multi') {
    const order = shuffledOrder(q.options.length, seed);
    const sel = new Set();
    body.innerHTML = String(html`<div class="opts">${order.map((i, k) => html`<button type="button" class="opt opt--multi" data-i="${i}" aria-pressed="false"><span class="opt__k">${L[k]}</span><span>${rich(q.options[i])}</span></button>`)}</div>
      <button type="button" class="btn btn--primary q__check" disabled>Check</button>`);
    const check = body.querySelector('.q__check');
    const mark = () => body.querySelectorAll('.opt').forEach((b) => {
      const i = Number(b.dataset.i);
      b.classList.toggle('is-right', q.answer.includes(i));
      b.classList.toggle('is-wrong', sel.has(i) && !q.answer.includes(i));
      b.disabled = true;
    });
    body.addEventListener('click', (e) => {
      if (finished) return;
      const b = e.target.closest('.opt');
      if (b) {
        const i = Number(b.dataset.i);
        if (sel.has(i)) sel.delete(i); else sel.add(i);
        b.classList.toggle('is-sel', sel.has(i));
        b.setAttribute('aria-pressed', String(sel.has(i)));
        b.classList.remove('is-wrong');
        check.disabled = !sel.size;
        return;
      }
      if (e.target.closest('.q__check')) {
        const ok = grade(q, [...sel]);
        if (exam) { body.querySelectorAll('.opt').forEach((x) => { x.disabled = true; }); check.hidden = true; return finishExam(ok, [...sel].map((i) => q.options[i]).join(' · ') || '(nothing)'); }
        if (ok) { mark(); check.hidden = true; return finish(true); }
        firstTry = false;
        if (mode === 'quiz') { mark(); check.hidden = true; return finish(false); }
        const extra = [...sel].filter((i) => !q.answer.includes(i));
        const missing = q.answer.filter((i) => !sel.has(i)).length;
        extra.forEach((i) => body.querySelector(`.opt[data-i="${i}"]`).classList.add('is-wrong'));
        feedback('bad', 'Not quite.', `${extra.length ? `${extra.length} of your picks ${extra.length === 1 ? 'is' : 'are'} wrong (marked). ` : ''}${missing ? `${missing} correct answer${missing === 1 ? ' is' : 's are'} still missing.` : ''}`);
      }
    });
    answerText = () => q.answer.map((i) => q.options[i]).join(' · ');
    reveal = () => { q.answer.forEach((i) => sel.add(i)); mark(); check.hidden = true; firstTry = false; finish(false, true); };
  }

  if (q.type === 'order' && exam) {
    const pool = shuffledOrder(q.items.length, seed);
    const seq = [];
    const draw = () => {
      body.innerHTML = String(html`
        <ol class="seq">${q.items.map((_, k) => html`<li class="seq__slot ${k < seq.length ? 'is-filled is-neutral' : ''}"><span class="seq__n">${k + 1}</span>${k < seq.length ? html`<span>${rich(q.items[seq[k]])}</span>` : html`<span class="muted">${k === seq.length ? 'Tap what comes next' : ''}</span>`}</li>`)}</ol>
        <div class="pool">${pool.filter((i) => !seq.includes(i)).map((i) => html`<button type="button" class="pool__item" data-i="${i}">${rich(q.items[i])}</button>`)}</div>
        ${seq.length && !finished ? html`<button type="button" class="btn btn--ghost btn--sm" data-undo>Undo last</button>` : ''}`);
    };
    draw();
    body.addEventListener('click', (e) => {
      if (finished) return;
      if (e.target.closest('[data-undo]')) { seq.pop(); return draw(); }
      const b = e.target.closest('.pool__item');
      if (!b) return;
      seq.push(Number(b.dataset.i));
      draw();
      if (seq.length === q.items.length) finishExam(seq.every((v, k) => v === k), seq.map((i) => q.items[i]).join(' → '));
    });
    answerText = () => q.items.join(' → ');
  }

  if (q.type === 'order' && !exam) {
    const pool = shuffledOrder(q.items.length, seed);
    let placed = 0;
    const draw = () => {
      body.innerHTML = String(html`
        <ol class="seq">${q.items.map((it, k) => html`<li class="seq__slot ${k < placed ? 'is-filled' : ''}"><span class="seq__n">${k + 1}</span>${k < placed ? html`<span>${rich(it)}</span>` : html`<span class="muted">${k === placed ? 'Tap what comes next' : ''}</span>`}</li>`)}</ol>
        <div class="pool">${pool.filter((i) => i >= placed).map((i) => html`<button type="button" class="pool__item" data-i="${i}">${rich(q.items[i])}</button>`)}</div>`);
    };
    draw();
    body.addEventListener('click', (e) => {
      const b = e.target.closest('.pool__item');
      if (!b || finished) return;
      const i = Number(b.dataset.i);
      if (i === placed) {
        placed++;
        draw();
        fbBox.innerHTML = '';
        if (placed === q.items.length) finish(true);
        return;
      }
      firstTry = false;
      b.classList.remove('is-shake');
      void b.offsetWidth;
      b.classList.add('is-shake', 'is-wrong');
      feedback('bad', 'Not next.', q.wrongStep || 'Something else has to happen before that. Try again.');
    });
    answerText = () => q.items.join(' → ');
    reveal = () => { placed = q.items.length; draw(); firstTry = false; finish(false, true); };
  }

  if (q.type === 'num') {
    body.innerHTML = String(html`<div class="numrow"><label class="numin">${q.prefix ? html`<span class="numin__fix">${q.prefix}</span>` : ''}<input type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer" aria-label="Answer">${q.unit ? html`<span class="numin__fix">${q.unit}</span>` : ''}</label><button type="button" class="btn btn--primary q__check" disabled>Check</button></div>
      ${q.hint ? html`<p class="q__hint" hidden>${rich(q.hint)}</p>` : ''}`);
    const input = body.querySelector('input');
    const check = body.querySelector('.q__check');
    const fmt = (n) => `${q.prefix || ''}${n.toLocaleString('en-US')}${q.unit ? ` ${q.unit}` : ''}`;
    const submit = () => {
      if (finished || !Number.isFinite(parseNumber(input.value))) return;
      const ok = grade(q, input.value);
      if (exam) { input.disabled = true; check.disabled = true; return finishExam(ok, fmt(parseNumber(input.value))); }
      if (ok) { input.disabled = true; check.disabled = true; body.querySelector('.numin').classList.add('is-right'); return finish(true); }
      firstTry = false;
      if (mode === 'quiz') { input.disabled = true; check.disabled = true; body.querySelector('.numin').classList.add('is-wrong'); return finish(false); }
      const n = parseNumber(input.value);
      body.querySelector('.numin').classList.add('is-wrong');
      const hint = body.querySelector('.q__hint');
      if (hint) hint.hidden = false;
      feedback('bad', 'Not quite.', `${fmt(n)} is too ${n > q.answer ? 'high' : 'low'}.${hint ? ' Hint below.' : ''}`);
    };
    input.addEventListener('input', () => { check.disabled = !Number.isFinite(parseNumber(input.value)); body.querySelector('.numin').classList.remove('is-wrong'); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    check.addEventListener('click', submit);
    answerText = () => fmt(q.answer) + (numTolerance(q) >= 1 ? ` (± ${numTolerance(q).toLocaleString('en-US')})` : '');
    reveal = () => { input.value = String(q.answer); input.disabled = true; check.disabled = true; firstTry = false; finish(false, true); };
  }

  return { el: root, isDone: () => finished, reveal: () => reveal() };
}
