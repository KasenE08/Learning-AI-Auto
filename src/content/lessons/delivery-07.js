// M11 · L07 · Reporting results
export default {
  steps: [
    { tag: 'example', title: 'October report (fake)', visualFirst: true,
      visual: { type: 'compare', cols: ['Measure', 'Before (baseline)', 'October'], rows: [
        ['Median time to first reply to a lead', '14 hours', '1 minute'],
        ['After-hours leads', '—', '41, all answered'],
        ['Leads that booked a visit', '22%', '31%'],
        ['Issues', '—', '1 (texting connection expired; fixed same day)'],
        ['Next month', '—', 'Add review requests after completed jobs?'],
      ] },
      body: ['Smoky Ridge’s one-page monthly report.'],
      check: {
        type: 'mc', q: 'Why does the report mention the issue that happened?',
        options: ['Honesty builds trust; hiding problems destroys it when they’re discovered', 'To fill space', 'It’s required by law', 'To make you look bad'], answer: 0,
        why: 'Clients trust reports that show the bad with the good, especially with “fixed same day”.',
      },
      stuck: {
        metaphor: 'A mechanic who says “brakes are fine; your tire has a slow leak, I patched it” earns more trust than one who only says “all good!”',
        worked: ['Good numbers and an honest issue.', 'The fix is shown too.', 'Trust grows.'],
      },
    },
    { tag: 'how', title: 'A one-page monthly report',
      visual: {"type": "sort", "cols": ["Include", "Leave out"], "items": [{"text": "Median reply time vs the baseline", "col": 0}, {"text": "Number of API calls", "col": 1, "why": "Means nothing to the client."}, {"text": "One issue and how you fixed it", "col": 0}, {"text": "Your full build notes", "col": 1}, {"text": "One suggestion for next month", "col": 0}, {"text": "Every log line from the month", "col": 1}], "prompt": "What goes in a monthly report?"},
      body: ["**2–4 measures** vs the baseline, **issues** and fixes, and **one suggestion**.", "Automate the numbers; write the 3-line summary yourself.", "Same day every month."] },
    { tag: 'try', title: 'Your turn: pick the measures',
      check: {
        type: 'multi', q: 'You sold “cut no-shows” to a dental clinic. Which measures belong in the report?',
        options: ['No-shows this month vs baseline', 'Reminders sent and delivered', 'Patients who rescheduled via the link', 'Number of API calls'], answer: [0, 1, 2],
        why: 'Measures tied to the promised outcome. API calls mean nothing to the clinic.',
      } },
    { tag: 'biz', title: 'Reports drive renewals',
      predict: {"q": "Everything works, but the client hears nothing for months. Renewal risk?", "options": ["High: they wonder what they’re paying for", "None", "Low", "It doesn’t matter"], "answer": 0, "why": "Visible value every month is what renews."},
      body: ['A client who sees “1 minute vs 14 hours” every month renews. A client who hears nothing wonders what they’re paying for, even if everything works.'] },
  ],
  quiz: [
    { type: 'multi', q: 'Monthly report sections?', options: ['Key measures vs baseline', 'Issues and fixes', 'One suggestion', 'Your full build notes'], answer: [0, 1, 2], why: 'Keep it to one page.' },
    { type: 'mc', q: 'Why include problems in a report?', options: ['Honesty builds trust', 'It’s required', 'To lower the price', 'It doesn’t help'], answer: 0, why: 'Hidden problems destroy trust when found.' },
    { type: 'mc', q: 'How many measures?', options: ['2–4 tied to the outcome sold', 'As many as possible', 'One random number', 'None'], answer: 0, why: 'Focused and meaningful.' },
  ],
  cards: [
    { id: 'report', front: 'Monthly report?', back: 'One page: 2–4 measures vs baseline, issues + fixes, one suggestion.' },
    { id: 'honest', front: 'Problems in reports?', back: 'Include them, with what you did.' },
    { id: 'renew', front: 'Why report monthly?', back: 'Visible value drives renewals.' },
  ],
};
