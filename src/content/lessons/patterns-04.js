// M03 · L04 · Lists, loops, and fan-out
export default {
  steps: [
    { tag: 'example', title: 'One order, three items', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'New order A-1042', kind: 'trigger', data: { items: ['2 × Sourdough', '1 × Birthday cake', '6 × Croissant'] } },
        { label: 'Loop: for each item', kind: 'logic', data: { current: '1 × Birthday cake (2 of 3)' } },
        { label: 'Add a row to the bake list', kind: 'action', data: { row: 'Birthday cake · qty 1 · for A-1042' } },
        { label: 'After the loop: email order confirmation', kind: 'action', data: { sent: 'once, listing all 3 items' } },
      ] },
      body: ['A bakery order has a list of items. The bake list needs one row per item. The customer needs one email.'],
      check: {
        type: 'mc', q: 'How many rows and how many emails does this order produce?',
        options: ['3 rows, 1 email', '1 row, 1 email', '3 rows, 3 emails', '1 row, 3 emails'], answer: 0,
        why: 'Steps **inside** the loop run once per item. Steps **after** it run once per order.',
        wrong: { 2: 'That happens if the email step is put inside the loop by mistake: the customer gets three emails.' },
      },
      stuck: {
        metaphor: 'Unpacking groceries: each item goes on a shelf (once per item). You fold the bag once, at the end.',
        worked: ['The loop runs the row step for each of 3 items: 3 rows.', 'The email sits after the loop: it runs once.', '3 rows, 1 email.'],
      },
    },
    { tag: 'how', title: 'Loops and aggregators',
      predict: {"q": "A loop runs over 50 items with 3 counted steps inside. How many counted steps?", "options": ["150", "3", "50", "53"], "answer": 0, "why": "50 × 3 = 150. Loops multiply task counts."},
      body: [
        'A [[loop]] (also “iterator” or “for each”) takes a list and runs the next steps once per item.',
        'An [[aggregator]] does the opposite: gathers many items back into one (a list, a total, a text block) for one step.',
        'Watch tasks: a loop over 50 items with 3 steps inside is 150 counted steps (Module 1, lesson 10).',
      ] },
    { tag: 'see', title: 'Fan-out: one event, many recipients',
      body: [
        '[[fan-out|Fan-out]]: one trigger sends work to many places, e.g. a schedule change notifies 12 staff, one message each.',
        'Use a loop over the recipient list. Personalize inside the loop; send summaries after it.',
        'Mind rate limits: 500 texts in one second can hit 429. Many tools let you pace a loop.',
      ],
      check: {
        type: 'mc', q: 'You loop over 200 customers sending an email to each. What should you check first?',
        options: ['The email app’s sending limits and your task count', 'The font', 'Whether the loop has a name', 'Nothing; loops are free'], answer: 0,
        why: 'Volume hits rate limits and quotas. And mass sends are the hardest mistakes to undo.',
      } },
    { tag: 'try', title: 'Your turn: inside or after?',
      check: {
        type: 'multi', q: 'An invoice has 5 line items. Which steps belong **inside** the loop?',
        options: ['Check each item is in stock', 'Email the customer their invoice', 'Reduce stock for each item', 'Post one “invoice sent” message to #ops'], answer: [0, 2],
        why: 'Per-item work goes inside. Per-invoice work (email, one post) goes after.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'What does a loop do?', options: ['Runs the next steps once per item in a list', 'Runs the workflow forever', 'Repeats on a schedule', 'Retries failed steps'], answer: 0, why: '“For each item, do this.”' },
    { type: 'mc', q: 'What does an aggregator do?', options: ['Combines many items into one', 'Splits one item into many', 'Deletes duplicates', 'Counts tasks'], answer: 0, why: 'E.g. join all line items into one text block for an email.' },
    { type: 'num', q: 'A loop runs over 40 items with 3 counted steps inside. How many counted steps does the loop use?', answer: 120, tol: 0, why: '40 × 3 = 120.' },
    { type: 'mc', scenario: 'Customers complain about getting one confirmation email per item they ordered.', q: 'What’s wrong?', options: ['The email step is inside the loop', 'The loop is missing', 'The email app is broken', 'Customers ordered too much'], answer: 0, why: 'Move the email after the loop (with an aggregator if it should list the items).' },
  ],
  cards: [
    { id: 'loop', front: 'Loop (iterator)?', back: 'Runs the following steps once per item in a list.' },
    { id: 'aggregator', front: 'Aggregator?', back: 'Combines many items back into one (a list, total, or text block).' },
    { id: 'inside', front: 'Inside the loop or after?', back: 'Per-item work inside. Per-record work (one email, one post) after.' },
    { id: 'fanout', front: 'Fan-out?', back: 'One event sends work to many recipients, usually with a loop.' },
  ],
};
