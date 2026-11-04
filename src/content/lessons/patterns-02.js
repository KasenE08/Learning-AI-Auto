// M03 · L02 · The linear pipeline
export default {
  steps: [
    { tag: 'example', title: 'Collect, clean, act, report', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'New invoice paid', kind: 'trigger', app: 'Payments', data: { customer: 'GRACE HOLT ', amount: '480.00', job: 'Water heater' } },
        { label: 'Clean: tidy the name, make amount a number', kind: 'logic', data: { customer: 'Grace Holt', amount: 480 } },
        { label: 'Act: mark job paid in the job sheet', kind: 'action', data: { row: 'Job 118 → Paid' } },
        { label: 'Act: email a thank-you receipt', kind: 'action', data: { to: 'grace.holt@example.com' } },
        { label: 'Report: post in #ops', kind: 'action', data: { message: 'Paid: Grace Holt, $480, water heater' } },
      ] },
      body: ['The most common shape in client work: one straight line. Run it.'],
      check: {
        type: 'mc', q: 'Why does the “Clean” step come before the actions?',
        options: ['So every later step gets tidy, consistent data', 'Cleaning is required by law', 'Actions can’t read numbers', 'It doesn’t matter where it goes'], answer: 0,
        why: 'Fix the data once, early. Otherwise every later step inherits “GRACE HOLT ” and text amounts.',
      },
      stuck: {
        metaphor: 'Wash vegetables before chopping them, not after. Every later step benefits.',
        worked: ['The trigger data was messy (caps, trailing space, text amount).', 'Clean fixed it once.', 'All three actions then used the clean values.'],
      },
    },
    { tag: 'how', title: 'The pipeline pattern',
      predict: {"q": "Where should a pipeline clean and check the data?", "options": ["Right after the trigger", "At the end", "Inside every step", "Nowhere"], "answer": 0, "why": "Validate early, once, so bad records stop before they touch other systems."},
      body: [
        'A [[pipeline]]: trigger → **validate/clean** → **enrich** (look up extra data) → **act** → **record/report**. No branches.',
        'Validate early: stop or flag bad records before they touch other systems.',
        'Most client wins are a short pipeline. Start here; add branches only when cases really differ.',
      ] },
    { tag: 'try', title: 'Your turn: build the pipeline in order',
      check: {
        type: 'order', q: 'A gym signs up a new member online. Order the pipeline.',
        items: ['New signup received', 'Check the email is valid; format the name', 'Look up their referral source in the CRM', 'Create the member in the billing app', 'Send the welcome email', 'Log the signup in the weekly sheet'],
        why: 'Trigger, validate/clean, enrich, act (billing before the welcome), then record.',
      } },
    { tag: 'warn', title: 'Keep steps small and named',
      predict: {"q": "Which step name will help most when reading logs in six months?", "options": ["Format name to first name", "Formatter 3", "Step", "Do stuff"], "answer": 0, "why": "Clear names make logs readable. One job per step makes them testable."},
      body: [
        'Give each step a clear name (“Format name”, not “Formatter 3”). Future you, and the client, will read the logs.',
        'One job per step. A step that does three things is hard to test and hard to fix.',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Order the pipeline stages.', items: ['Trigger', 'Validate / clean', 'Enrich', 'Act', 'Record / report'], why: 'Clean data early, look things up, do the work, then log it.' },
    { type: 'mc', q: 'Why validate right after the trigger?', options: ['Bad records stop before they touch other systems', 'Validation is free', 'The trigger requires it', 'It makes the workflow longer'], answer: 0, why: 'Catch problems before they spread.' },
    { type: 'mc', q: 'What does “enrich” mean?', options: ['Look up extra data to add to the record', 'Make the email prettier', 'Charge the customer', 'Delete duplicates'], answer: 0, why: 'E.g. fetch the customer’s history from the CRM.' },
  ],
  cards: [
    { id: 'pipeline', front: 'The pipeline pattern?', back: 'Trigger → validate/clean → enrich → act → record/report, in one straight line.' },
    { id: 'early', front: 'Where does cleaning go?', back: 'Early, once, so every later step gets tidy data.' },
    { id: 'enrich', front: 'Enrich?', back: 'Look up extra data (e.g. CRM history) and add it to the record.' },
    { id: 'small', front: 'Step design rule?', back: 'One job per step, clearly named.' },
  ],
};
