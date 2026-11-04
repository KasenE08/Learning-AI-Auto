// Final exam: 60 questions (25 technical, 25 business, 10 legal), answers saved silently,
// full review at the end, and the launch-readiness verdict. Progress is saved after every answer.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { rich } from '../rich.js';
import { pageHead, meter, pct } from '../components/parts.js';
import { renderQuestion } from '../quiz/question.js';
import { getProgress, saveProgress } from '../../core/store.js';
import { markDone, logLessonFinished } from '../../core/progress.js';
import { draw, scoreAttempt, readiness, recordAttempt, saveDraft, trackOf, BAR, EXAM_MIX } from '../../core/exam.js';
import { unitById, unitCode, trackById } from '../../core/course.js';
import { examBank } from '../../content/exam.js';

export const tab = 'path';
const byId = new Map(examBank.map((q) => [q.id, q]));
const TRACK = { tech: 'Technical', biz: 'Business', legal: 'Legal' };

const answerText = (q) => q.type === 'mc' ? q.options[q.answer] : q.type === 'multi' ? q.answer.map((i) => q.options[i]).join(' · ')
  : q.type === 'order' ? q.items.join(' → ') : `${q.prefix || ''}${q.answer.toLocaleString('en-US')}${q.unit ? ` ${q.unit}` : ''}`;

export function readinessCard(p = getProgress()) {
  const r = readiness(p);
  const c = r.capstone;
  const b = r.best;
  const light = (ok, label, detail) => html`<li class="${ok ? 'is-ok' : ''}"><span class="rd__dot"></span><span><b>${label}</b><small>${detail}</small></span></li>`;
  return html`<a class="card readiness ${r.ready ? 'is-ready' : ''}" href="#/lesson/exam-01">
    <span class="kicker">Launch readiness</span>
    <span class="h3">${r.ready ? 'Ready to launch' : 'Not ready yet'}</span>
    <ul class="rd">
      ${light(b && b.overall >= BAR.overall, `Exam ≥ ${pct(BAR.overall)} overall`, b ? `Best: ${pct(b.overall)}` : 'Not taken yet')}
      ${light(b && Object.values(b.byTrack).every((x) => x >= BAR.track), `Every track ≥ ${pct(BAR.track)}`, b ? Object.entries(b.byTrack).map(([t, x]) => `${TRACK[t]} ${pct(x)}`).join(' · ') : '—')}
      ${light(c.complete, 'Capstone complete', `${c.lessonsDone}/${c.lessonsTotal} lessons · build ${pct(c.build)} · real build ${c.real}/${c.realTotal}`)}
    </ul>
  </a>`;
}

export function render(view) {
  let S = null; // { ids, answers, i, seed }
  const screen = el(html`<div class="screen exam"></div>`);
  view.append(screen);

  const persist = () => saveProgress(saveDraft(getProgress(), S));

  const focus = (on) => document.body.classList.toggle('focus-mode', on);

  function intro() {
    focus(false);
    const p = getProgress();
    const draft = p.exam?.draft;
    const attempts = p.exam?.attempts || [];
    screen.innerHTML = String(html`
      <a class="backlink" href="#/module/exam">${icons.back}Launch readiness</a>
      ${pageHead('Final exam · about 45 minutes', 'Launch-readiness exam', `${EXAM_MIX.tech + EXAM_MIX.biz + EXAM_MIX.legal} questions across every module. No feedback until the end, then a full review.`)}
      ${readinessCard(p)}
      <section class="card exam__rules">
        <b>How it works</b>
        <ul class="bullets">
          <li>${EXAM_MIX.tech} technical, ${EXAM_MIX.biz} business, ${EXAM_MIX.legal} legal questions, drawn fresh each attempt.</li>
          <li>Pass: at least ${pct(BAR.overall)} overall and ${pct(BAR.track)} in every track. Ready to launch = a passed exam + a complete capstone.</li>
          <li>Your answers save as you go. Leave anytime and resume.</li>
        </ul>
        <div class="btn-row">
          ${draft ? html`<button class="btn btn--primary" data-resume>${icons.play}Resume (${Object.keys(draft.answers).length}/${draft.ids.length})</button><button class="btn btn--ghost" data-new>Start over</button>`
            : html`<button class="btn btn--primary" data-new>${icons.play}Start the exam</button>`}
        </div>
      </section>
      ${attempts.length ? html`<section class="section"><h2 class="h4">Past attempts</h2><div class="mods">${attempts.slice().reverse().map((a) => html`<div class="mod"><span class="mod__n mono">${pct(a.overall)}</span><span class="mod__t">${new Date(a.at).toLocaleDateString()} · ${a.examPassed ? 'Passed' : 'Not passed'}</span><span class="mod__c mono">${Object.entries(a.byTrack).map(([t, x]) => `${t[0].toUpperCase()} ${pct(x)}`).join(' ')}</span>${meter(a.overall)}</div>`)}</div></section>` : ''}`);
    screen.querySelector('[data-resume]')?.addEventListener('click', () => { S = { ...draft }; question(); });
    screen.querySelector('[data-new]').addEventListener('click', () => { const seed = Date.now() % 1e9; S = { ids: draw(examBank, seed), answers: {}, i: 0, seed }; persist(); question(); });
  }

  function question() {
    focus(true);
    const id = S.ids[S.i];
    const q = byId.get(id);
    const t = trackOf(q);
    screen.innerHTML = String(html`
      <div class="lr__top exam__top"><button class="icon-btn" data-exit aria-label="Save and exit">${icons.close}</button>
        <div class="lr__prog exam__prog"><i class="is-done" style="flex:${S.i}"></i><i style="flex:${S.ids.length - S.i}"></i></div>
        <span class="lr__count mono">${S.i + 1}/${S.ids.length}</span></div>
      <article class="step step--quiz"><span class="kicker kicker--accent">${TRACK[t]} · ${unitById(q.mod).title}</span><div data-q></div></article>
      <div class="lr__foot"><button class="btn btn--ghost" data-exit>Save & exit</button><button class="btn btn--primary" data-next disabled>Answer to continue</button></div>`);
    const next = screen.querySelector('[data-next]');
    const r = renderQuestion(q, { seed: S.seed + S.i, mode: 'exam', onDone: ({ ok, given }) => {
      S.answers[id] = { ok, given };
      persist();
      next.disabled = false;
      next.textContent = S.i === S.ids.length - 1 ? 'See results' : 'Next';
    } });
    screen.querySelector('[data-q]').append(r.el);
    if (S.answers[id]) { // resumed on an answered question
      next.disabled = false;
      next.textContent = S.i === S.ids.length - 1 ? 'See results' : 'Next';
      r.el.insertAdjacentHTML('beforeend', '<p class="muted small">Already answered. Answer again to change it, or continue.</p>');
    }
    next.addEventListener('click', () => { if (S.i < S.ids.length - 1) { S.i++; persist(); question(); } else finish(); });
    screen.querySelectorAll('[data-exit]').forEach((b) => b.addEventListener('click', () => { persist(); intro(); }));
    window.scrollTo(0, 0);
  }

  async function finish() {
    focus(false);
    const result = scoreAttempt(examBank, S.ids, S.answers);
    let p = recordAttempt(getProgress(), result);
    p = logLessonFinished(markDone(p, 'exam-01'));
    await saveProgress(p);
    const r = readiness(p);
    screen.innerHTML = String(html`
      <a class="backlink" href="#/module/exam">${icons.back}Launch readiness</a>
      <header class="page-head"><span class="kicker">Exam result</span><h1 class="h1">${r.ready ? 'Ready to launch' : result.examPassed ? 'Exam passed' : 'Not yet'}</h1>
        <p class="page-head__sub">${r.ready ? 'You passed the exam and completed the capstone. You know what to do to land your first paying client.' : result.examPassed ? 'Exam passed. Finish the capstone to be launch-ready.' : 'Work through the modules below, then try again. A fresh set of questions is drawn each time.'}</p></header>
      <div class="stats exam__score">
        <div class="card stat"><span class="kicker">Overall</span><b class="mono ${result.overall >= BAR.overall ? 'is-good' : 'is-low'}">${pct(result.overall)}</b><small>${result.right}/${result.total} · need ${pct(BAR.overall)}</small></div>
        ${Object.entries(result.byTrack).map(([t, x]) => html`<div class="card stat"><span class="kicker">${TRACK[t]}</span><b class="mono ${x >= BAR.track ? 'is-good' : 'is-low'}">${pct(x)}</b><small>need ${pct(BAR.track)}</small></div>`)}
      </div>
      ${readinessCard(p)}
      ${result.redo.length ? html`<section class="section"><h2 class="h4">Modules to redo</h2><div class="mods">${result.redo.map((x) => { const u = unitById(x.mod || x.unit); return html`<a class="mod" href="#/module/${u.id}"><span class="mod__n mono">${unitCode(u)}</span><span class="mod__t">${u.title}</span><span class="mod__c mono">${x.missed} missed</span>${meter(0)}</a>`; })}</div></section>` : ''}
      <section class="section"><h2 class="h4">Review every question</h2><ol class="review">${S.ids.map((id) => {
        const q = byId.get(id);
        const a = S.answers[id];
        return html`<li class="${a?.ok ? 'is-ok' : 'is-bad'}"><span class="tick">${a?.ok ? icons.check : icons.close}</span><div>
          ${q.scenario ? html`<p class="muted small">${rich(q.scenario)}</p>` : ''}<p><b>${rich(q.q)}</b></p>
          ${a?.ok ? '' : html`<p class="small"><span class="muted">You:</span> ${rich(a?.given || '(no answer)')}<br><span class="muted">Answer:</span> <b>${rich(answerText(q))}</b></p>`}
          <p class="small muted">${rich(q.why)}</p></div></li>`;
      })}</ol></section>
      <div class="btn-row"><button class="btn btn--primary" data-again>Take it again</button><a class="btn btn--ghost" href="#/progress">Progress</a></div>`);
    screen.querySelector('[data-again]').addEventListener('click', () => { const seed = Date.now() % 1e9; S = { ids: draw(examBank, seed), answers: {}, i: 0, seed }; persist(); question(); });
    window.scrollTo(0, 0);
  }

  intro();
  return () => focus(false);
}
