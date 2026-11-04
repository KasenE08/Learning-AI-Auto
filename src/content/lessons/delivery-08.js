// M11 · L08 · Upsells and expansion
export default {
  steps: [
    { tag: 'example', title: 'The natural next step', visualFirst: true,
      visual: { type: 'compare', cols: ['Month', 'What happened', 'Natural expansion'], rows: [
        ['3', 'Leads answered in 1 minute; bookings up', 'Review requests after completed jobs'],
        ['5', 'Owner mentions unpaid invoices', 'Invoice reminders / dunning'],
        ['8', 'Second location opening', 'Same system for location two'],
      ] },
      body: ['Smoky Ridge over a year (fake).'],
      check: {
        type: 'mc', q: 'What makes these good upsells?',
        options: ['Each one follows a result or a problem the client brought up', 'They’re the most expensive options', 'You pushed them in month one', 'They’re random'], answer: 0,
        why: '[[upsell|Expansion]] works when it solves the next problem, after the first one is visibly solved.',
      },
      stuck: {
        metaphor: 'A dentist suggests whitening after your cleanings go well, not on your first visit with a toothache.',
        worked: ['Month 3: results visible, so suggest a related win.', 'Month 5: the client raised a pain.', 'Month 8: the business grew.'],
      },
    },
    { tag: 'how', title: 'When and how to expand',
      body: [
        'Earn it first: the original promise delivered and reported.',
        'Listen for new pains in check-ins and reports. Write them down.',
        'Suggest one thing at a time, with its own small ROI estimate.',
        'Tiers make it easy: “move to Standard” (Module 10).',
      ] },
    { tag: 'try', title: 'Your turn: timing',
      check: {
        type: 'mc', q: 'When should you first suggest an add-on?', options: ['After the first result is visible in a report', 'During the first week', 'In the first proposal, as a must-have', 'Never'], answer: 0,
        why: 'Trust and evidence first. The report’s “one suggestion” line is the natural place.',
      } },
    { tag: 'biz', title: 'Expansion is cheaper than new clients',
      body: ['No outreach, no discovery from scratch, an existing relationship. Many solo businesses grow more from expanding current clients than from new ones.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Best source of upsell ideas?', options: ['Pains the client mentions in check-ins and reports', 'Your price list', 'Competitors’ websites', 'Random guesses'], answer: 0, why: 'Listen.' },
    { type: 'mc', q: 'How many add-ons should you suggest at once?', options: ['One, with its own small ROI', 'All of them', 'Five', 'None ever'], answer: 0, why: 'Easy to decide.' },
    { type: 'mc', q: 'Why is expansion valuable?', options: ['Cheaper and faster than winning new clients', 'It isn’t', 'It’s required', 'It lowers prices'], answer: 0, why: 'Existing trust.' },
  ],
  cards: [
    { id: 'earn', front: 'Before suggesting an upsell?', back: 'Deliver and report the original promise.' },
    { id: 'one', front: 'Upsell how?', back: 'One suggestion at a time, tied to a pain they raised, with a small ROI.' },
    { id: 'cheaper', front: 'Why expand current clients?', back: 'Cheaper and faster than finding new ones.' },
  ],
};
