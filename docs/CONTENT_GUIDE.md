# Lesson content guide

Reader: Kasen. Wants to start a one-person AI automation business selling to any industry; no niche
chosen yet. Has Claude Pro and Grok premium only. Learns from examples and metaphors. Self-paced, no deadline.
Finish line: knows exactly how to land a first paying client and grow it into a long-term solo business.

## Hard rules
- **No code, ever.** APIs, webhooks, JSON, auth, etc. are concepts the reader configures visually. Show JSON
  only to *read* (the `record` visual); never ask the reader to write it.
- **Evergreen.** Teach principles and patterns, not a specific tool's buttons or menus. Don't name a tool's
  UI paths. Naming a category ("a CRM", "a no-code automation tool") is fine.
- **Learning only.** No real outreach, networking or client work happens in the app. Sales lessons are
  concepts plus simulated scenarios.
- **Free only.** Outside-app builds use free tiers that need **no credit card**. Never require a paid API key.
- **Accuracy first.** Verify any specific number, law, price or claim with a web search. If sources
  disagree or you can't confirm, say so or leave it out. Legal lessons are concepts, never legal advice.
- **Fake data is labeled fake.** example.com emails, 555 phone numbers, made-up businesses.
- **Short.** No walls of text. Bullets of one or two sentences. US English. Define every piece of jargon
  the first time with a `[[glossary-id]]` link (add the term to the module's glossary file).
- **Example first, then explanation.** Step 1 has tag `example` and a `check`: the reader tries before
  anything is explained.
- **Active learning only.** Every step must give the reader something to do: a `predict` (one-tap guess before the bullets), a `check`, a `sort` exercise, an interactive diagram (flow, record, exchange, calc, roleplay), a sandbox `build`, or an `outside` task. A plain comparison table alone doesn’t count. **Max 3 bullets per step.** Tests enforce both.
- Lessons take **3–7 minutes** (match `min` in src/content/course.js): **4–8 steps**, 1–4 bullets each.
  Builds (`build`, `outside`) don't count toward the minutes.

## File format
One file per lesson: `src/content/lessons/<unitId>-<nn>.js`. Reference: `found-01.js`.

```js
export default {
  steps: [
    { tag: 'example', title: '…', visual: {…}, visualFirst: true, body: ['…'],
      check: { type: 'mc', q: '…', options: [...], answer: 0, why: '…', wrong: { 2: '…' } },
      stuck: { metaphor: '…', visual?: {…}, worked: ['step', 'step'] } },
    { tag: 'how', title: '…', body: ['…'] },
    { tag: 'build', title: '…', build: { challenge: 'challenge-id' }, body: ['…'] },
    { tag: 'outside', title: '…', outside: { … }, body: ['…'] },
  ],
  quiz: [ /* 3–5 questions */ ],
  cards: [ { id: 'short-id', front: 'Question?', back: 'Answer.' } /* 3–6 */ ],
};
```
Step tags: `example`, `try`, `how`, `see`, `metaphor`, `key`, `why`, `math`, `biz`, `warn`, `law`, `build`, `outside`.
Optional step fields: `visual`, `visualFirst`, `predict`, `check`, `stuck` (needs a `check`), `note`.

### `predict` (one-tap guess before the explanation)
`predict: { q, options, answer, why, wrong? }` is shown under the title; the bullets and any non-`visualFirst` visual stay hidden
until the reader guesses. It’s one try, not scored: the answer and `why` are shown either way. Use it to make the reader commit
to an idea before reading about it. Sort steps behave the same way: sort first, then the bullets unlock.

### Inline markup
`**bold**` · `` `mono` `` · `[[glossary-id]]` or `[[glossary-id|shown text]]` · `~~muted aside~~` · `[label](#/builder/first-flow)`

### Checks and quiz questions (instant correction)
- `mc` `{ q, options, answer: index, why, wrong?: { index: 'why that pick is wrong' }, scenario? }`
  A **scenario judgment** is an `mc` with a `scenario` set-up.
- `multi` `{ q, options, answer: [indexes], why }` (select all that apply)
- `order` `{ q, items: [...in correct order], why, wrongStep? }` (each wrong tap bounces back instantly)
- `num` `{ q, answer, tol?, unit?, prefix?, hint?, why }` (tol is absolute; default 1%)

In a step `check`, the reader retries until right (or uses *I’m stuck*). In the quiz, the first answer is
scored. `why` is always shown. Use `wrong` for common traps. Mix types across a module.

### `stuck`
Metaphor and picture first, then a worked answer to work backward from:
`{ metaphor: 'one or two sentences', visual?: {…}, worked: ['step 1', 'step 2', …] }`

## Visuals
- `flow` `{ nodes: [{ label, kind: 'trigger'|'action'|'ai'|'logic', app?, sub?, data?: {…}, branches?: [{ label, nodes }] }], play?, branch? }`
  Workflow diagram. Tap a node to see its `data`; `play` adds “Run it”.
- `record` `{ title?, data: {…}, hl?: [keys], start?: 'fields'|'json' }` Same data as fields and as JSON.
- `exchange` `{ actors: [a, b, c?], messages: [{ from, to, label, kind?: 'request'|'response'|'event'|'error', body?, note? }] }`
  Step-through of apps talking (API calls, webhooks, auth).
- `calc` `{ inputs: [{ key, label, min, max, step?, value, prefix?, unit? }], outputs: [{ label, f: (v) => n, fmt: 'money'|'hours'|'months'|'pct'|'num', big? }] }`
- `compare` `{ cols: [label?, a, b], rows: [[label, a, b]], pick? }` (stacks into cards on phones)
- `sort` `{ prompt?, cols: [..], items: [{ text, col, why? }] }` Tap each item into a column; wrong picks bounce back with `why`.
  Every column needs at least one item. Next stays locked until everything is sorted.
- `roleplay` `{ title?, persona: { name, role }, start, nodes: { id: { say, choices: [{ text, score: 0|1|2, why, next }] } | { say, end: true } } }`
  A branching practice conversation with a simulated prospect. Every choice is scored instantly with a reason.
  Each decision node needs at least one score-2 choice; every path must reach an `end` node.
Every visual can take `caption`.

## Sandbox builds (`build`)
Challenges live in `src/sim/challenges.js`: `{ id, unit, lesson, title, dataset, brief: [...], checks: [{ id, label, hint, test }] }`.
Checks are objective rules over the workflow and its run results. Every challenge needs a test in
`tests/sim.test.js` proving a reference solution scores 100% and an empty workflow scores 0.
Fake businesses live in `src/sim/data.js`; blocks in `src/sim/blocks.js`.

## Outside-app builds (`outside`)
`{ id, title, goal, steps: [...exact build steps...], data?: [...fake test data lines], prompt: 'context for Claude', checklist: [...] }`
The app adds the free-tool rule, wraps `prompt` with the checklist so Claude answers PASS/FAIL per item,
and saves which items the reader ticked. Write checklist items Claude can verify from screenshots.

### Claude role-plays (`outside` with `roleplay`)
Add `roleplay: { persona, business, situation, hidden: [facts revealed only to good questions], objections?: [..], opening?, style? }`
to an outside spec. The app builds a prompt where Claude plays the prospect (stays in character, never coaches),
then a grading prompt for the transcript using the spec’s `prompt` + `checklist`. Steps explain how to run it; `data`
holds the learner’s notes going in. Checklist items must be checkable from a transcript.

## Location
Legal, tax and compliance examples assume the **United States, Tennessee** (the reader’s state), with federal rules
noted. Verify specifics with a web search; where sources disagree, say so and point to a CPA or lawyer. Never give
legal or tax advice; teach the concepts and the questions to ask.

## Check your work
`npm test` must pass (it checks tags, step counts, example-first, visuals, quiz answers, glossary links,
challenge ids, outside-build fields and card ids).
