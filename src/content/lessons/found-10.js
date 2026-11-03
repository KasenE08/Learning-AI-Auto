// M01 · L10 · Task limits and quotas
export default {
  steps: [
    { tag: 'example', title: 'How much does this workflow “cost” to run?', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'runs', label: 'Runs per month (new leads)', min: 50, max: 3000, step: 50, value: 400 },
        { key: 'steps', label: 'Counted steps per run', min: 1, max: 12, value: 4 },
        { key: 'limit', label: 'Plan limit (tasks per month)', min: 100, max: 10000, step: 100, value: 750 },
      ], outputs: [
        { label: 'Tasks used per month', f: (v) => v.runs * v.steps, fmt: 'num', big: true },
        { label: 'Share of the plan used', f: (v) => (v.runs * v.steps) / v.limit, fmt: 'pct' },
      ], caption: 'Example numbers. Tools count “tasks” differently; see the next step.' },
      body: ['A gym gets about 400 leads a month. Each run has 4 counted steps. Drag the sliders.'],
      check: {
        type: 'num', q: 'At 400 runs and 4 counted steps per run, how many tasks a month?', answer: 1600, tol: 0,
        hint: 'Runs × counted steps.', why: '400 × 4 = **1,600**, more than double a 750-task plan.',
      },
      stuck: {
        metaphor: 'A phone plan with a monthly data limit: every app you open uses a bit. Usage = how often × how much each time.',
        worked: ['Each run uses 4 tasks.', '400 runs × 4 = 1,600 tasks.', 'Compare that to the plan limit.'],
      },
    },
    { tag: 'how', title: 'What counts, and why it matters',
      body: [
        'Automation tools put a [[quota]] on how much you run. They count it differently: some count each action step, some count every step including the trigger, some count whole runs.',
        'Read the pricing page of the tool you use, and count **one real run** in its log.',
        'Free plans have low quotas and other limits (fewer steps per workflow, slower polling, fewer active workflows). Fine for learning; usually too small for a client’s live system.',
      ] },
    { tag: 'see', title: 'Rate limits are a different limit',
      body: [
        'A [[rate-limit]] caps how fast you can ask an app for things, like 100 requests a minute. Go over it and you get **429** (lesson 6).',
        'Quota = how much per month (your automation tool). Rate limit = how fast (each app’s API).',
        'Bulk jobs (importing 5,000 contacts) hit rate limits. Slow the loop down or batch it.',
      ],
      check: {
        type: 'mc', q: 'A run fails with 429 while importing 5,000 contacts in one go. Which limit did you hit?', options: ['The CRM’s rate limit', 'The automation tool’s monthly quota', 'The webhook’s address limit', 'The free plan’s step limit'], answer: 0,
        why: '429 = too many requests too fast, from the app’s API. Quotas show up as a plan warning or paused workflows, not 429s.',
      } },
    { tag: 'biz', title: 'Task counts are part of your pricing',
      body: [
        'More steps × more runs = a bigger plan. Someone pays for it: the client directly, or you, built into your price.',
        'Design lean: filter out junk **early** so spam doesn’t burn 6 tasks per run.',
        'Estimate before you quote: runs per month × counted steps, plus headroom for growth and retries. Module 10 turns this into pricing.',
      ] },
  ],
  quiz: [
    { type: 'num', q: 'A workflow runs 250 times a month with 6 counted steps per run. Tasks per month?', answer: 1500, tol: 0, why: '250 × 6 = 1,500.' },
    { type: 'mc', q: 'Why put a spam filter as the **first** step after the trigger?', options: ['Spam stops before it uses up the counted steps after it', 'Filters are free in every tool', 'It makes the workflow faster to build', 'Triggers can’t see spam'], answer: 0,
      why: 'Every step after the filter is skipped for spam, so junk costs one check instead of a whole run.' },
    { type: 'mc', q: 'Quota vs rate limit?', options: ['Quota: how much per month. Rate limit: how fast', 'They’re the same thing', 'Quota: how fast. Rate limit: how much', 'Quota is for AI only'], answer: 0, why: 'Monthly volume vs speed of requests.' },
    { type: 'mc', scenario: 'A client’s workflow fits the free plan today. They expect leads to triple next quarter.', q: 'What should your proposal say?',
      options: ['The paid plan they’ll need at triple volume, and who pays for it', 'Nothing; the free plan is fine', 'That you’ll pay for any plan forever', 'That free plans have no limits'], answer: 0,
      why: 'Running costs grow with volume. Put them in writing up front so they’re no surprise.' },
  ],
  cards: [
    { id: 'tasks', front: 'Monthly task estimate?', back: 'Runs per month × counted steps per run, plus headroom.' },
    { id: 'counting', front: 'Do all tools count tasks the same way?', back: 'No. Some count actions, some every step, some whole runs. Check the pricing page and one real run.' },
    { id: 'quota-rate', front: 'Quota vs rate limit?', back: 'Quota = how much per month. Rate limit = how fast (429 when exceeded).' },
    { id: 'early-filter', front: 'Where do junk filters go?', back: 'Early, right after the trigger, so junk doesn’t use up counted steps.' },
  ],
};
