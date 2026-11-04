// M03 · L08 · Scheduled digests
export default {
  steps: [
    { tag: 'example', title: 'One message instead of forty', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Every day at 7:30 am', kind: 'trigger', app: 'Schedule', data: { time: '07:30' } },
        { label: 'Get yesterday’s orders', kind: 'action', app: 'Sheet', data: { rows: 38 } },
        { label: 'Summarize: count, total, top items, problems', kind: 'logic', data: { orders: 38, revenue: '$2,940', top: 'Sourdough (51)', flagged: '2 late deliveries' } },
        { label: 'Email the owner one digest', kind: 'action', data: { subject: 'Yesterday: 38 orders, $2,940, 2 late' } },
      ] },
      body: ['The bakery owner was getting a notification per order. Now they get one morning email.'],
      check: {
        type: 'mc', q: 'Why does this workflow need a “Get yesterday’s orders” step?',
        options: ['A schedule trigger brings no records; you have to fetch them', 'To double-check the trigger', 'Orders are hidden', 'It doesn’t need it'], answer: 0,
        why: 'Schedule triggers only bring the time (Module 1, lesson 2). Fetch, then summarize.',
      },
      stuck: {
        metaphor: 'A morning newspaper: someone gathers yesterday’s stories, then prints one paper, instead of shouting each story as it happens.',
        worked: ['The trigger is the clock: no data.', 'So step 1 fetches the orders.', 'Then summarize and send once.'],
      },
    },
    { tag: 'how', title: 'The digest pattern',
      predict: {"q": "A digest fetches “the last 24 hours” but sometimes runs at 7:04 instead of 7:00. What goes wrong?", "options": ["Some orders are counted twice or missed", "Nothing", "The email bounces", "It stops running"], "answer": 0, "why": "Use fixed windows (“yesterday 00:00–23:59”) so nothing overlaps or falls in a gap."},
      body: ["[[digest|Digest]]: schedule → fetch a fixed time window → summarize → one message.", "Lead with what needs action, then the numbers.", "Compute numbers with ordinary steps; an AI step can write the words around them."] },
    { tag: 'try', title: 'Your turn: digest or instant?',
      check: {
        type: 'multi', q: 'Which belong in a daily digest rather than an instant alert?',
        options: ['Yesterday’s sales total', 'A burst pipe emergency', 'New 5-star reviews', 'A failed payment for a big order', 'Count of new newsletter signups'], answer: [0, 2, 4],
        why: 'Instant alerts are for things that need action now. Everything else is calmer as a digest.',
      } },
    { tag: 'outside', title: 'Optional: build a daily digest for real',
      body: ['A small, useful build on a free plan.'],
      outside: {
        id: 'daily-digest',
        title: 'A daily digest from a spreadsheet',
        goal: 'Every morning, email yourself a summary of yesterday’s rows in a spreadsheet: how many, and a short list.',
        steps: [
          'Create a spreadsheet “Orders” with columns Date, Customer, Item, Amount. Add the fake rows below, dating three of them yesterday and two the day before.',
          'In your automation tool, create a workflow with a schedule trigger: every day at a set morning time.',
          'Add a step that gets rows from the sheet where Date is yesterday.',
          'Combine them (aggregate) into one block of text: one line per order.',
          'Email **yourself only**: subject “Yesterday: [count] orders”, body with the lines and the total amount.',
          'Run it once manually to test, and save a screenshot of the run and the email.',
        ],
        data: ['Grace Holt · Sourdough · 18', 'Marcus Webb · Birthday cake · 68.50', 'Tina Cho · Croissants (6) · 21', 'Omar Khan · Sourdough · 9', 'Priya Shah · Baguette · 6'],
        prompt: 'You are grading a beginner’s scheduled digest automation. Goal: each morning, email the builder one summary of the previous day’s spreadsheet rows. Be strict.',
        checklist: [
          'The trigger is a schedule (a set time each day), not a new-row trigger.',
          'Only yesterday’s rows are included; the two older rows are left out.',
          'All of yesterday’s rows appear in one email, not one email per row.',
          'The subject or body shows the correct count of orders.',
          'The total amount is correct for yesterday’s rows.',
          'The email went only to the builder’s own address.',
        ],
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the digest pattern.', items: ['Schedule fires', 'Fetch records in the time window', 'Aggregate / summarize', 'Send one message'], why: 'Clock, fetch, combine, deliver.' },
    { type: 'mc', scenario: 'A daily digest runs at 7:00 am and fetches “the last 24 hours”. On some days it runs at 7:04.', q: 'What can go wrong?', options: ['Overlaps or gaps: some orders counted twice or missed', 'Nothing', 'The email bounces', 'The schedule stops'], answer: 0,
      why: 'Use fixed windows (“yesterday 00:00–23:59”), not “last 24 hours from now”.' },
    { type: 'mc', q: 'Who should calculate the totals in an AI-written digest?', options: ['Ordinary steps; pass the numbers to the AI', 'The AI, from the raw rows', 'The client, by hand', 'Nobody; skip totals'], answer: 0, why: 'Exact math belongs to ordinary steps.' },
  ],
  cards: [
    { id: 'digest', front: 'Digest pattern?', back: 'Schedule → fetch a time window → summarize → one message.' },
    { id: 'window', front: 'How to define a digest’s window?', back: 'Fixed boundaries in the client’s time zone (e.g. yesterday 00:00–23:59).' },
    { id: 'alertvs', front: 'Instant alert or digest?', back: 'Instant if it needs action now; digest for everything else.' },
  ],
};
