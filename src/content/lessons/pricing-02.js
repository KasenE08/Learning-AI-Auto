// M10 · L02 · Setup fees
export default {
  steps: [
    { tag: 'example', title: 'What a setup fee pays for', visualFirst: true,
      visual: { type: 'compare', cols: ['Phase', 'Hours (example)'], rows: [
        ['Discovery and mapping', '3'],
        ['Building and connecting', '8'],
        ['Testing with edge cases', '4'],
        ['Documentation and runbook', '2'],
        ['Launch, training, first-week watch', '3'],
      ] },
      body: ['A lead-response build for a gym (fake numbers).'],
      check: {
        type: 'mc', q: 'Which phases do beginners most often leave out of their price?',
        options: ['Testing, documentation and the first-week watch', 'Building', 'Discovery', 'None'], answer: 0,
        why: 'Building feels like “the work”. But testing, docs and launch support are often close to half the hours, and they’re what makes the system trustworthy.',
      },
      stuck: {
        metaphor: 'Quoting a kitchen remodel and forgetting the cleanup and inspection. The job isn’t done when the cabinets go in.',
        worked: ['Building: 8 of 20 hours.', 'Testing + docs + launch: 9 of 20.', 'Nearly half the job is after “building”.'],
      },
    },
    { tag: 'how', title: 'Setting the setup fee',
      body: [
        'Estimate every phase, not just building. Add a buffer for surprises (access delays, messy data).',
        'Check it against value (lesson 1): the client should still get a clear win.',
        'Collect part up front (often 50%) and the rest at launch.',
        'State what the fee covers and what counts as a change (lesson 7).',
      ] },
    { tag: 'try', title: 'Your turn: price it',
      check: {
        type: 'num', q: '20 estimated hours + 25% buffer, at $90/hour. Setup fee in dollars?', answer: 2250, tol: 0, prefix: '$',
        hint: '20 × 1.25 = hours with buffer.', why: '25 hours × $90 = **$2,250**.',
      } },
    { tag: 'biz', title: 'Running costs are separate',
      body: ['Tool plans, AI usage and phone numbers are ongoing. Keep them out of the setup fee: in the client’s own accounts, or in the retainer (lesson 5).'] },
  ],
  quiz: [
    { type: 'multi', q: 'What should a setup fee cover?', options: ['Discovery and mapping', 'Building', 'Testing', 'Docs and launch support', 'A year of AI usage'], answer: [0, 1, 2, 3], why: 'Ongoing costs go in the retainer or the client’s accounts.' },
    { type: 'mc', q: 'Common payment terms for a setup fee?', options: ['Part up front, the rest at launch', 'All after a year', 'Nothing until they’re happy forever', 'Hourly invoices weekly'], answer: 0, why: 'Shared risk, steady cash flow.' },
    { type: 'num', q: 'Estimate 16 hours, add 25% buffer, $100/hour. Fee?', answer: 2000, tol: 0, prefix: '$', why: '20 hours × $100.' },
  ],
  cards: [
    { id: 'phases', front: 'Phases in a setup fee?', back: 'Discovery, building, testing, docs/runbook, launch and first-week watch.' },
    { id: 'buffer', front: 'Why add a buffer?', back: 'Access delays and messy data always happen.' },
    { id: 'terms', front: 'Setup payment terms?', back: 'Often 50% up front, 50% at launch.' },
  ],
};
