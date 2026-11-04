// M07 · L07 · Patterns: local service businesses
export default {
  steps: [
    { tag: 'example', title: 'The same leaks, different trades', visualFirst: true,
      visual: { type: 'compare', cols: ['Leak', 'Plumber', 'Dentist', 'Gym'], rows: [
        ['Slow reply to new inquiries', 'Quote requests', 'New-patient forms', 'Ad leads'],
        ['Missed calls', 'On a job site', 'Front desk busy', 'Staff on the floor'],
        ['No-shows', 'Customer not home', 'Empty chair', 'Missed trial'],
        ['Forgotten follow-ups', 'Unsent quotes', 'Recall cleanings', 'Lapsed members'],
        ['Unpaid invoices', 'Net-30 chasing', 'Patient balances', 'Failed card payments'],
      ] },
      body: ['Local service businesses look different but leak in the same places.'],
      check: {
        type: 'mc', q: 'What does this table suggest for your business?',
        options: ['A small set of proven workflows can be reused across many trades', 'Each trade needs completely different skills', 'Only one trade is worth serving', 'Service businesses can’t be automated'], answer: 0,
        why: 'Lead response, missed-call recovery, reminders, follow-ups, and payment chasing repeat everywhere. That’s the basis for productized offers (Module 12).',
      },
      stuck: {
        metaphor: 'Different houses, same plumbing problems: leaks happen at joints, not in the middle of pipes.',
        worked: ['Read across each row.', 'Every trade has every leak.', 'So the same workflows apply with small changes.'],
      },
    },
    { tag: 'see', title: 'The local-service starter kit',
      visual: {"type": "sort", "cols": ["Speed-to-lead", "Missed calls", "Reminders", "Reviews", "Invoices"], "items": [{"text": "Instant reply + follow-up for new web leads", "col": 0}, {"text": "Text-back when a call goes unanswered", "col": 1}, {"text": "Text 24 h before an appointment", "col": 2}, {"text": "Ask happy customers for a review after the job", "col": 3}, {"text": "Nudge for unpaid invoices", "col": 4}, {"text": "After-hours voice agent", "col": 1, "why": "It answers calls that would otherwise be missed."}], "prompt": "Which kit item is each workflow?"},
      body: ["Speed-to-lead and missed-call recovery.", "Booking + reminders, and review requests (unhappy customers go to the owner first).", "Invoice reminders and dunning."] },
    { tag: 'try', title: 'Your turn: pick for this owner',
      check: {
        type: 'mc', scenario: 'A Memphis lawn-care owner: “We have more leads than we can handle. What kills us is customers who don’t pay on time.”',
        q: 'Which workflow should you lead with?', options: ['Invoice reminders and failed-payment follow-up', 'Speed-to-lead', 'Missed-call text-back', 'Review requests'], answer: 0,
        why: 'Listen to the pain they named. More leads won’t help a business that can’t collect.',
      } },
    { tag: 'warn', title: 'Kit, not cookie-cutter',
      predict: {"q": "A new plumber client fits your kit perfectly. Do you still map their process?", "options": ["Yes: who answers, which tools and which rules always differ", "No, use the kit as-is", "Only if they pay extra", "Only after launch"], "answer": 0, "why": "The kit tells you what to look for; the map gives the details."},
      body: [
        'Use the kit to know what to look for, but map each client’s process anyway. The details (who answers, which tools, which rules) always differ.',
        'Regulated trades (healthcare, finance) need extra care with data and messaging (Module 13).',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Which are common leaks in local service businesses?', options: ['Slow lead response', 'Missed calls', 'No-shows', 'Unpaid invoices'], answer: [0, 1, 2, 3], why: 'All five rows of the table apply almost everywhere.' },
    { type: 'mc', q: 'An owner says their biggest problem is late payments. What do you propose first?', options: ['Payment reminders and dunning', 'A chatbot', 'More lead generation', 'A CRM migration'], answer: 0, why: 'Start where they hurt.' },
    { type: 'mc', q: 'Review-request workflows should…', options: ['Ask happy customers publicly and route unhappy ones to the owner first', 'Ask everyone to post publicly', 'Write fake reviews', 'Skip unhappy customers silently'], answer: 0, why: 'Fix problems privately; never fake reviews.' },
  ],
  cards: [
    { id: 'kit', front: 'Local-service starter kit?', back: 'Speed-to-lead, missed-call recovery, booking + reminders, review requests, invoice reminders.' },
    { id: 'pain', front: 'Which workflow first?', back: 'The one matching the pain the owner names.' },
    { id: 'map', front: 'Kit or map?', back: 'Both: the kit tells you what to look for; the map gives the details.' },
  ],
};
