// M07 · L03 · Measure the current process
export default {
  steps: [
    { tag: 'example', title: 'What does one hour really cost?', visualFirst: true,
      visual: { type: 'calc', inputs: [
        { key: 'wage', label: 'Hourly wage', min: 12, max: 50, value: 20, prefix: '$' },
        { key: 'load', label: 'Extra cost on top of wage (taxes, benefits) %', min: 0, max: 50, value: 25, unit: '%' },
      ], outputs: [
        { label: 'Loaded cost per hour', f: (v) => v.wage * (1 + v.load / 100), fmt: 'money', big: true },
      ], caption: 'Example numbers. Ask the client for their real figures; the extra-cost share varies by business.' },
      body: ['Smoky Ridge’s office manager earns $20 an hour. That isn’t what an hour of their time costs the business.'],
      check: {
        type: 'num', q: 'At $20/hour with 25% extra costs, what does an hour really cost?', answer: 25, tol: 0.01, prefix: '$',
        hint: '$20 × 1.25', why: '$20 × 1.25 = **$25**. Payroll taxes and benefits mean an hour costs more than the wage. This is the [[loaded-cost|loaded cost]].',
      },
      stuck: {
        metaphor: 'A $20 concert ticket that costs $25 after fees. The business pays the “fees” on every hour worked.',
        worked: ['Wage: $20.', 'Extra: 25% of $20 = $5.', 'Loaded cost: $25 per hour.'],
      },
    },
    { tag: 'how', title: 'Five numbers to collect',
      body: [
        '**Volume:** how many per week (normal and busy).',
        '**Time per item:** minutes of hands-on work.',
        '**Delay:** how long items wait before anyone acts.',
        '**Error or drop rate:** how many get mistyped, lost, or never followed up.',
        '**Value per item:** what one lead, job, or invoice is worth to them (average job value, profit margin if they know it).',
      ] },
    { tag: 'try', title: 'Your turn: estimate honestly',
      body: ['The owner says “we lose a ton of leads”. You need a number.'],
      check: {
        type: 'mc', q: 'Best way to get a defensible number?', options: ['Count: last month’s leads vs how many got a call within a day, from their own records', 'Use the owner’s guess of “a ton”', 'Use an industry statistic from a blog', 'Assume 50%'], answer: 0,
        why: 'Their own records beat guesses and borrowed statistics. If records don’t exist, track for one or two weeks.',
      } },
    { tag: 'warn', title: 'Be conservative',
      body: [
        'Use the lower end of every estimate. A modest number the client believes beats a big one they doubt.',
        'Write down where each number came from (“owner, from last month’s job list”). It protects you later.',
      ] },
  ],
  quiz: [
    { type: 'num', q: 'Wage $18/hour, extra costs 30%. Loaded cost per hour in dollars?', answer: 23.4, tol: 0.01, prefix: '$', why: '$18 × 1.30 = $23.40.' },
    { type: 'multi', q: 'Which numbers should you collect?', options: ['Volume', 'Time per item', 'Delay', 'Error/drop rate', 'Value per item'], answer: [0, 1, 2, 3, 4], why: 'All five feed the ROI math next lesson.' },
    { type: 'mc', q: 'Where should your numbers come from?', options: ['The client’s own records or a short tracking period', 'Industry blogs', 'Your intuition', 'The largest plausible guess'], answer: 0, why: 'Defensible beats impressive.' },
  ],
  cards: [
    { id: 'loaded', front: 'Loaded cost?', back: 'Wage plus taxes and benefits: what an hour really costs the business.' },
    { id: 'five', front: 'Five numbers to measure?', back: 'Volume, time per item, delay, error/drop rate, value per item.' },
    { id: 'conservative', front: 'Estimate rule?', back: 'Use the lower end, and note where each number came from.' },
  ],
};
