// The visual workflow builder (sandbox). Runs on fake business data only.
// Laptop: flow on the left, a panel on the right (Step · Test data · Results · Checks).
// Phone: one tab at a time, Flow first.
import { html, el } from '../dom.js';
import { icons } from '../icons.js';
import { rich } from '../rich.js';
import { openSheet, confirmSheet } from '../components/sheet.js';
import { mountVisual } from '../visuals/index.js';
import { meter } from '../components/parts.js';
import { kvTable } from '../visuals/kv.js';
import { drawFlow } from '../builder/flow.js';
import { stepConfig, triggerPicker, blockPicker } from '../builder/config.js';
import { getProgress, saveProgress } from '../../core/store.js';
import { recordBuild, saveDraft } from '../../core/progress.js';
import { challengeById, starterWorkflow, grade } from '../../sim/challenges.js';
import { datasetById } from '../../sim/data.js';
import { runWorkflow, newWorkflow, makeStep, getList, findStep, summarizeRuns, runSummary, STATUS_LABEL } from '../../sim/engine.js';

export const tab = 'builder';

const clone = (x) => JSON.parse(JSON.stringify(x));

export function render(view, { id }) {
  const challenge = challengeById(id);
  const freeDs = id.startsWith('free-') ? datasetById(id.slice(5)) : null;
  if (!challenge && !freeDs) {
    view.append(el(html`<div class="screen"><p class="muted">No build called “${id}”.</p><a class="btn" href="#/builder">All builds</a></div>`));
    return;
  }
  const ds = datasetById(challenge ? challenge.dataset : freeDs.id);
  const saved = getProgress().builds?.[id];
  const S = {
    wf: saved?.wf ? clone(saved.wf) : challenge ? starterWorkflow(challenge) : newWorkflow(ds.id),
    sel: null,
    tab: 'flow',
    result: null,
    graded: null,
    run: 0,
  };

  const root = el(html`<div class="bw">
    <header class="bw__head">
      <a class="icon-btn" href="#/builder" aria-label="All builds">${icons.back}</a>
      <div class="bw__title"><span class="kicker">${challenge ? 'Build challenge' : 'Free sandbox'} · fake data: ${ds.name}</span><b>${challenge ? challenge.title : `Sandbox: ${ds.name}`}</b></div>
      <div class="bw__actions">
        <button type="button" class="btn btn--ghost" data-run>${icons.play}<span>Run test</span></button>
        ${challenge ? html`<button type="button" class="btn btn--primary" data-grade>${icons.check}<span>Check build</span></button>` : ''}
      </div>
    </header>
    <nav class="seg bw__tabs" role="tablist"></nav>
    <div class="bw__cols">
      <section class="bw__flow"></section>
      <aside class="bw__panel"></aside>
    </div>
  </div>`);
  view.append(root);
  document.body.classList.add('wide-mode');
  const flowBox = root.querySelector('.bw__flow');
  const panel = root.querySelector('.bw__panel');
  const tabsBox = root.querySelector('.bw__tabs');
  const wide = matchMedia('(min-width: 900px)');

  let saveTimer = null;
  const persist = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveProgress(saveDraft(getProgress(), id, S.wf)), 400);
  };
  let liveGoals = null;
  const stale = () => { S.result = null; S.graded = null; liveGoals = null; };
  const goalsNow = () => (liveGoals ||= grade(challenge, S.wf));

  // The challenge's goals, ticked live as the learner builds. Unmet goals stay neutral; only the next one shows its hint.
  const goalsCard = (compact = false) => {
    const g = goalsNow();
    const next = g.results.find((r) => !r.pass);
    const items = html`<ul class="checks goals__list">${g.results.map((r) => html`<li class="${r.pass ? 'is-pass' : r === next ? 'is-next' : ''}"><span class="checks__i">${r.pass ? icons.check : ''}</span><span><b>${r.label}</b>${r === next ? html`<small><span class="goals__tag">Next</span> ${r.hint}</small>` : ''}</span></li>`)}</ul>`;
    const head = html`<span class="kicker">Goals · ${g.passed.length} of ${g.results.length} met</span>`;
    if (compact) return html`<details class="cfg goals" ${g.score === 1 ? '' : 'open'}><summary>${head}${g.score === 1 ? html` <span class="goals__done">All met</span>` : ''}</summary>${items}</details>`;
    return html`<div class="card goals">${head}${meter(g.score, 'Goals met')}${items}
      <p class="muted small">${g.score === 1 ? html`Every goal is met. Press <b>Check build</b> to save your score.` : html`These tick as you build. <b>Run test</b> sends the fake records through so you can see what happened to each one.`}</p></div>`;
  };

  const TABS = [['flow', 'Flow'], ['step', 'Step'], ['data', 'Test data'], ['results', 'Results'], ...(challenge ? [['checks', 'Checks']] : [])];
  const drawTabs = () => {
    const cur = wide.matches && S.tab === 'flow' ? 'step' : S.tab;
    tabsBox.innerHTML = String(html`${TABS.map(([k, label]) => html`<button type="button" role="tab" class="seg__b ${cur === k ? 'is-on' : ''} ${k === 'flow' ? 'only-phone' : ''}" data-tab="${k}">${label}${k === 'results' && S.result?.fired ? html` <span class="seg__n">${S.result.runs.length}</span>` : ''}${k === 'checks' && S.graded ? html` <span class="seg__n">${S.graded.passed.length}/${challenge.checks.length}</span>` : ''}</button>`)}`);
    root.dataset.tab = cur;
  };

  const drawFlowBox = () => {
    const trace = S.result?.runs?.[S.run]?.trace;
    flowBox.innerHTML = String(html`
      ${challenge ? html`<details class="card brief" ${S.wf.trigger ? '' : 'open'}><summary><span class="kicker">The client’s request</span></summary>${challenge.brief.map((p) => html`<p>${rich(p)}</p>`)}</details>`
        : html`<div class="card brief"><span class="kicker">${ds.industry}</span><p>${ds.blurb}</p></div>`}
      ${challenge ? goalsCard() : ''}
      ${drawFlow(S.wf, { sel: S.sel, trace })}
      ${trace ? html`<p class="bf__legend muted small">Dots show test run ${S.run + 1}: ${S.result.runs[S.run].title}. Grey = did not run.</p>` : ''}`);
  };

  const drawPanel = () => {
    const cur = wide.matches && S.tab === 'flow' ? 'step' : S.tab;
    panel.replaceChildren();
    if (cur === 'flow') return;
    if (cur === 'step') {
      if (S.sel === 'trigger') panel.append(triggerPicker(S.wf));
      else if (S.sel) panel.append(stepConfig(S.wf, S.sel, stepApi()));
      else panel.append(el(html`<div class="cfg"><span class="kicker">Step settings</span><p class="muted">Tap a block in the flow to set it up, or tap <b>+</b> to add a step.</p><p class="muted">Blocks only ever touch ${ds.name}’s fake data. Nothing is sent anywhere.</p></div>`));
    }
    if (cur === 'data') drawData();
    if (cur === 'results') drawResults();
    if (cur === 'checks') drawChecks();
  };

  const stepApi = () => ({
    change(full) { stale(); persist(); drawFlowBox(); drawTabs(); if (full) drawPanel(); },
    remove() {
      const f = findStep(S.wf, S.sel);
      if (!f) return;
      f.list.splice(f.index, 1);
      S.sel = null; stale(); persist(); redraw();
    },
    move(d) {
      const f = findStep(S.wf, S.sel);
      const j = f.index + d;
      if (j < 0 || j >= f.list.length) return;
      [f.list[f.index], f.list[j]] = [f.list[j], f.list[f.index]];
      stale(); persist(); redraw();
    },
  });

  function drawData() {
    panel.append(el(html`<div class="cfg"><span class="kicker">Test data · ${ds.events.length} records from “${ds.source}”</span>
      <p class="muted">These fake records are what the trigger hands your workflow, one run per record. Look for the messy ones.</p></div>`));
    ds.events.forEach((e, i) => mountVisual(panel, { type: 'record', title: `Record ${i + 1}`, data: e.data }));
    panel.append(el(html`<div class="cfg"><span class="kicker">Already in the apps before you run</span>${kvTable({ 'CRM contacts': ds.apps.crm.map((c) => c.name).join(', ') || '(none)', Sheets: Object.keys(ds.apps.sheets).join(', ') })}</div>`));
  }

  function drawResults() {
    if (!S.result) {
      panel.append(el(html`<div class="cfg"><span class="kicker">Results</span><p class="muted">Press <b>Run test</b> to send all ${ds.events.length} test records through your workflow.</p></div>`));
      return;
    }
    if (!S.result.fired) {
      panel.append(el(html`<div class="cfg"><span class="kicker">Nothing ran</span><p class="fb fb--bad">${S.result.reason}</p></div>`));
      return;
    }
    const c = summarizeRuns(S.result);
    const st = S.result.state;
    const run = S.result.runs[S.run];
    const sum = runSummary(run);
    if (challenge) panel.append(el(goalsCard(true)));
    const box = el(html`<div class="cfg">
      <span class="kicker">Results · ${S.result.runs.length} test runs</span>
      <div class="chips">${Object.entries(c).filter(([, n]) => n).map(([k, n]) => html`<span class="chip chip--${k}">${n} ${STATUS_LABEL[k].toLowerCase()}</span>`)}</div>
      <p class="muted small">Each fake record went through your workflow once. Tap a name to see what happened to it.</p>
      <div class="runs">${S.result.runs.map((r, i) => {
        const warn = r.status === 'ok' && runSummary(r).tone === 'warn';
        return html`<button type="button" class="run ${i === S.run ? 'is-on' : ''}" data-run-i="${i}"><span class="bf__dot is-${warn ? 'filtered' : r.status === 'ok' ? 'ok' : r.status === 'filtered' ? 'filtered' : 'error'}"></span><span>${i + 1}. ${r.title}</span><small>${warn ? 'Finished, with a problem' : STATUS_LABEL[r.status]}</small></button>`;
      })}</div>
      <h4 class="h4">Run ${S.run + 1}: ${run.title}</h4>
      <p class="fb fb--${sum.tone === 'ok' ? 'ok' : sum.tone === 'info' ? 'info' : 'bad'} run__sum ${sum.tone === 'warn' ? 'is-warn' : ''}"><b>${sum.tone === 'ok' ? 'All good.' : sum.tone === 'warn' ? 'Finished, with a problem.' : sum.tone === 'info' ? 'Stopped by your filter.' : 'Did not finish.'}</b> ${sum.text}</p>
      <p class="muted small">Step by step:</p>
      <ol class="trace">${run.trace.length ? run.trace.map((t) => html`<li class="trace__s is-${t.status} ${t.invented?.length ? 'is-warn' : ''}">
        <b>${t.name}</b><span class="trace__msg">${t.message || t.effect || (t.invented?.length ? 'Ran, but made something up (see below)' : 'Done')}</span>
        ${t.notes?.length ? html`<div class="trace__notes">${t.notes.map((n) => html`<p>${n}</p>`)}</div>` : ''}
        ${t.output && Object.keys(t.output).length ? html`<details><summary>Data out</summary>${kvTable(t.output, { hl: t.invented || [] })}</details>` : ''}
        ${t.input ? html`<details><summary>What it was given</summary>${kvTable(Object.fromEntries(Object.entries(t.input).map(([k, v]) => [k, Array.isArray(v) ? v.map((x) => `${x.name}: ${x.value}`) : v])))}</details>` : ''}
      </li>`) : html`<li class="muted">No steps ran.</li>`}</ol>
      <h4 class="h4">What changed in the apps (all runs)</h4>
      <div class="effects">
        <details><summary>CRM: ${st.crm.length} contact${st.crm.length === 1 ? '' : 's'}${st.crm.length - S.result.startCrm ? ` (+${st.crm.length - S.result.startCrm})` : ''}</summary>${st.crm.length ? html`<ul>${st.crm.map((x) => html`<li>${x.name || '(no name)'} · ${x.email}</li>`)}</ul>` : ''}</details>
        ${Object.entries(st.sheets).map(([n, rows]) => html`<details><summary>Sheet “${n}”: ${rows.length} row${rows.length === 1 ? '' : 's'}</summary>${rows.length ? html`<ul>${rows.map((r) => html`<li>${Object.entries(r).map(([k, v]) => `${k}: ${v || '(empty)'}`).join(' · ')}</li>`)}</ul>` : ''}</details>`)}
        <details><summary>Emails sent: ${st.emails.length}</summary>${st.emails.length ? html`<ul>${st.emails.map((m) => html`<li><b>${m.to}</b> · ${m.subject || '(no subject)'}<br><span class="muted">${m.body}</span></li>`)}</ul>` : ''}</details>
        <details><summary>Texts sent: ${st.sms.length}</summary>${st.sms.length ? html`<ul>${st.sms.map((m) => html`<li><b>${m.to}</b> · ${m.body}</li>`)}</ul>` : ''}</details>
        <details><summary>Calendar events: ${st.calendar.length}</summary>${st.calendar.length ? html`<ul>${st.calendar.map((m) => html`<li>${m.title} · ${m.when}</li>`)}</ul>` : ''}</details>
        <details><summary>Team chat posts: ${st.chat.length}</summary>${st.chat.length ? html`<ul>${st.chat.map((m) => html`<li><b>${m.channel}</b> · ${m.message}</li>`)}</ul>` : ''}</details>
      </div>
    </div>`);
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-run-i]');
      if (b) { S.run = Number(b.dataset.runI); drawFlowBox(); drawPanel(); }
    });
    panel.append(box);
  }

  function drawChecks() {
    const best = getProgress().builds?.[id]?.best;
    const g = S.graded;
    panel.append(el(html`<div class="cfg">
      <span class="kicker">Checks · scored by rules, not opinion</span>
      ${g ? html`<p class="score"><b class="mono">${g.passed.length}/${challenge.checks.length}</b> <span class="muted">${g.score === 1 ? 'All checks pass. Saved to your progress.' : 'Saved. Fix the open checks and check again.'}</span></p>`
        : html`<p class="muted">Press <b>Check build</b> to run the test data and score your workflow.${best != null ? ` Best so far: ${Math.round(best * 100)}%.` : ''}</p>`}
      <ul class="checks">${challenge.checks.map((k) => {
        const r = g?.results.find((x) => x.id === k.id);
        return html`<li class="${r ? (r.pass ? 'is-pass' : 'is-fail') : ''}"><span class="checks__i">${r ? (r.pass ? icons.check : icons.close) : ''}</span><span><b>${k.label}</b>${r && !r.pass ? html`<small>${k.hint}</small>` : ''}</span></li>`;
      })}</ul>
      <details><summary>Start over</summary><p class="muted">Clears this workflow. Your best score stays.</p><button type="button" class="btn btn--danger btn--sm" data-clear>Clear the workflow</button></details>
    </div>`));
  }

  const redraw = () => { drawTabs(); drawFlowBox(); drawPanel(); };

  root.addEventListener('click', async (e) => {
    const t = e.target.closest('button, [data-sel]');
    if (!t || !root.contains(t)) return;
    if (t.dataset.tab) { S.tab = t.dataset.tab; return redraw(); }
    if (t.dataset.sel) {
      S.sel = t.dataset.sel;
      if (!wide.matches || S.tab === 'flow' || !['step'].includes(S.tab)) S.tab = 'step';
      return redraw();
    }
    if (t.dataset.trig) {
      S.wf.trigger = { type: t.dataset.trig };
      stale(); persist();
      if (!wide.matches) S.tab = 'flow';
      return redraw();
    }
    if (t.dataset.add != null) {
      const listId = t.dataset.add;
      const at = Number(t.dataset.at);
      const close = openSheet(blockPicker((type) => {
        close();
        const step = makeStep(S.wf, type);
        getList(S.wf, listId).splice(at, 0, step);
        S.sel = step.id;
        S.tab = 'step';
        stale(); persist(); redraw();
      }));
      return;
    }
    if (t.matches('[data-run]')) {
      S.result = runWorkflow(S.wf, ds);
      S.run = 0;
      S.tab = 'results';
      return redraw();
    }
    if (t.matches('[data-grade]')) {
      S.graded = grade(challenge, S.wf);
      S.result = S.graded.result;
      S.run = Math.max(0, S.result.runs.findIndex((r) => r.status !== 'ok'));
      await saveProgress(recordBuild(getProgress(), id, { score: S.graded.score, passed: S.graded.passed, wf: clone(S.wf) }));
      S.tab = 'checks';
      return redraw();
    }
    if (t.matches('[data-clear]')) {
      const ok = await confirmSheet({ title: 'Clear this workflow?', text: 'Every step is removed. Your best score stays saved.', yes: 'Clear', danger: true });
      if (!ok) return;
      S.wf = challenge ? starterWorkflow(challenge) : newWorkflow(ds.id);
      S.sel = null; stale(); persist(); S.tab = 'flow';
      return redraw();
    }
  });
  const onResize = () => redraw();
  wide.addEventListener('change', onResize);
  redraw();
  return () => {
    clearTimeout(saveTimer);
    saveProgress(saveDraft(getProgress(), id, S.wf));
    wide.removeEventListener('change', onResize);
    document.body.classList.remove('wide-mode');
  };
}
