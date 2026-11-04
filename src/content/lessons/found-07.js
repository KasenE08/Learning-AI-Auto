// M01 · L07 · Webhooks vs polling
export default {
  steps: [
    { tag: 'example', title: 'Two ways to hear about a new lead', visualFirst: true,
      visual: { type: 'exchange', actors: ['Ad signup page', 'Your workflow'], messages: [
        { from: 1, to: 0, label: '9:00 Any new leads? → No', kind: 'request', note: 'Polling: the workflow asks on a timer.' },
        { from: 1, to: 0, label: '9:15 Any new leads? → No', kind: 'request' },
        { from: 0, to: 1, label: '9:21 Lead! Jordan Bell (webhook)', kind: 'event', body: { full_name: 'Jordan Bell', email: 'jordan.bell@example.com' }, note: 'Webhook: the signup page tells the workflow the moment it happens.' },
        { from: 1, to: 0, label: '9:30 Any new leads? → Yes, Jordan', kind: 'request', note: 'With polling alone, Jordan waits until 9:30 to be noticed.' },
      ] },
      body: ['Step through. Two arrows are the workflow **asking**. One is the signup page **telling**.'],
      check: {
        type: 'mc', q: 'With polling every 15 minutes, how long did Jordan wait before the workflow knew?',
        options: ['9 minutes (9:21 → 9:30)', 'No wait', '15 minutes, always', '30 minutes'], answer: 0,
        why: 'Polling only notices at the next check. Up to a full interval of delay. A webhook arrives instantly.',
      },
      stuck: {
        metaphor: 'Polling is a kid in the back seat asking “are we there yet?” every 15 minutes. A webhook is the driver saying “we’re here” the moment you arrive.',
        worked: ['Lead arrived at 9:21.', 'The next poll was at 9:30.', '9:30 − 9:21 = 9 minutes of waiting.'],
      },
    },
    { tag: 'how', title: 'Polling vs webhooks',
      predict: {"q": "A trigger’s description says “checks every 15 minutes”. Which kind is it?", "options": ["Polling", "Webhook", "Manual", "Schedule only"], "answer": 0, "why": "A check interval means polling. Webhook triggers are usually labeled “instant”."},
      body: [
        '[[polling|Polling]]: your workflow asks an app “anything new?” on a timer. Simple, works with almost any app, but slower and uses checks even when nothing’s new.',
        '[[webhook|Webhook]]: the app sends data to your workflow’s unique web address the moment something happens. Fast and efficient, but the app must support it.',
        'In a builder you usually just pick a trigger. Its description often says “instant” (webhook) or names a check interval (polling).',
      ] },
    { tag: 'see', title: 'Side by side',
      predict: {"q": "Which one needs the other app to support it?", "options": ["Webhooks", "Polling", "Both equally", "Neither"], "answer": 0, "why": "The other app has to send the webhook. Polling only needs an API you can ask."},
      visual: { type: 'compare', cols: ['', 'Polling', 'Webhook'], rows: [
        ['Who starts the conversation', 'Your workflow asks', 'The other app tells'],
        ['Speed', 'Up to one interval late', 'About instant'],
        ['Works with', 'Almost anything with an API', 'Apps that offer webhooks'],
        ['Cost', 'Checks run even when nothing’s new', 'Only runs when something happens'],
        ['Fails how', 'Misses or doubles if checks overlap', 'Lost if your workflow is down when it’s sent'],
      ], pick: 1 },
      body: ['Check intervals vary by tool and plan, from about a minute to 15 minutes or more.'] },
    { tag: 'try', title: 'Your turn: does speed matter here?',
      check: {
        type: 'multi', q: 'For which of these would a 15-minute delay **cost the client money**?',
        options: ['Calling back a new web lead', 'A weekly sales report', 'Alerting a plumber to a burst pipe', 'Archiving last month’s invoices', 'Replying to a missed call with a text'], answer: [0, 2, 4],
        why: 'Leads go cold fast, emergencies can’t wait, and missed callers often call the next business. Reports and archiving don’t care about minutes.',
      } },
    { tag: 'warn', title: 'A webhook address is a secret door',
      predict: {"q": "Someone finds your workflow’s webhook address in a public forum post. What can they do?", "options": ["Send fake data into the workflow", "Nothing", "Read your email", "Delete the app"], "answer": 0, "why": "The address is the door. Anyone with it can knock, so keep it private and treat incoming data as untrusted."},
      body: [
        'Anyone who knows the address can send data to it. Don’t paste it in public places, and treat incoming data as untrusted.',
        'If the receiving workflow is off or broken, some senders retry for a while, others give up. Monitoring (Module 6) catches this.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is a webhook?', options: ['An app sending data to your workflow’s address when something happens', 'Your workflow checking an app on a timer', 'A type of database', 'A security key'], answer: 0, why: 'Webhooks push data the moment an event happens. Polling pulls on a timer.' },
    { type: 'mc', scenario: 'A client’s old booking system has an API but no webhooks.', q: 'How can you still trigger on new bookings?',
      options: ['Poll it: check for new bookings every few minutes', 'You can’t automate it at all', 'Ask the client to forward each booking by hand', 'Build a webhook into their system'], answer: 0,
      why: 'Polling works with any API that can list new records. It’s slower, which is fine for many uses.' },
    { type: 'num', q: 'A workflow polls every 15 minutes. What’s the longest a new record can wait before being noticed (in minutes)?', answer: 15, tol: 0, unit: 'min',
      why: 'If it arrives just after a check, it waits a full interval: 15 minutes.' },
    { type: 'mc', q: 'Why keep a webhook address private?', options: ['Anyone with it can send data into the workflow', 'It contains the client’s password', 'It stops working if shared', 'It costs money per view'], answer: 0, why: 'The address is the door. Treat it like a secret and treat what comes in as untrusted.' },
  ],
  cards: [
    { id: 'polling', front: 'Polling?', back: 'Your workflow asks an app “anything new?” on a timer. Simple, slower.' },
    { id: 'webhook', front: 'Webhook?', back: 'The app sends data to your workflow’s unique address the moment something happens. Fast.' },
    { id: 'delay', front: 'Worst-case delay with polling?', back: 'One full interval.' },
    { id: 'secret', front: 'Why is a webhook URL sensitive?', back: 'Anyone with it can send data into the workflow.' },
  ],
};
