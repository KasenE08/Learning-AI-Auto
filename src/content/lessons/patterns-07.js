// M03 · L07 · Sync without duplicates
export default {
  steps: [
    { tag: 'example', title: 'Why the CRM has three Grace Holts', visualFirst: true,
      visual: { type: 'compare', cols: ['Run', 'Email from', 'Action', 'CRM after'], rows: [
        ['1', 'grace.holt@example.com', 'Create contact', '1 Grace'],
        ['2', 'grace.holt@example.com', 'Create contact', '2 Graces'],
        ['3', 'Grace.Holt@Example.com', 'Create contact', '3 Graces'],
      ] },
      body: ['Every email from Grace created a new contact. Her history is now split three ways.'],
      check: {
        type: 'mc', q: 'Which change fixes runs 1 and 2?',
        options: ['Find the contact by email first; update if found, create if not', 'Create the contact twice', 'Delete old contacts every night', 'Ask Grace to stop emailing'], answer: 0,
        why: 'That’s an [[upsert]]: “update or insert”. It needs a reliable field to match on.',
      },
      stuck: {
        metaphor: 'A doctor’s office checks “have you been here before?” before opening a new patient file.',
        worked: ['Runs 1 and 2 used “Create” blindly.', 'Look her up by email first.', 'Found → update; not found → create. That’s an upsert.'],
      },
    },
    { tag: 'how', title: 'Match keys and upserts',
      body: [
        'A [[unique-key|match key]] is the field that identifies the same thing across systems: email for people, order ID for orders, invoice number for invoices.',
        '**Normalize** before matching: lowercase emails, trim spaces, digits-only phones. Run 3 above only fails because of capital letters.',
        'Use upsert (find-or-create) wherever the same thing can arrive more than once.',
        'When syncing two apps, store the other app’s ID on each record. IDs never change; names and emails can.',
      ] },
    { tag: 'try', title: 'Your turn: pick the match key',
      check: {
        type: 'mc', q: 'Syncing paid invoices from the invoicing app into a job sheet. What should you match on?',
        options: ['The invoice ID', 'The customer’s name', 'The amount', 'The date'], answer: 0,
        why: 'Names, amounts and dates repeat. An ID is unique and never changes.',
      } },
    { tag: 'see', title: 'Running twice should be harmless',
      body: [
        'Workflows sometimes run twice on the same event (a retry, a double webhook). Design so a repeat changes nothing: [[idempotency|idempotent]].',
        'Upserts are idempotent. “Create” and “send email” are not: guard them with a check (“already sent for this order?”).',
      ],
      check: {
        type: 'multi', q: 'Which steps are safe to run twice on the same record?', options: ['Find or create contact', 'Set job status to “paid”', 'Send thank-you email', 'Add a new invoice row'], answer: [0, 1],
        why: 'Setting a value to the same thing twice changes nothing. Sending and adding create a second copy.',
      } },
    { tag: 'build', title: 'Build it: sync customers without duplicates', build: { challenge: 'no-duplicates' },
      body: ['Grace is already in Rivera’s CRM. Add everyone else, keep spam out, and don’t create a second Grace.'] },
  ],
  quiz: [
    { type: 'mc', q: 'What is an upsert?', options: ['Update if it exists, create if it doesn’t', 'Delete then create', 'Create twice to be safe', 'A type of webhook'], answer: 0, why: 'Find-or-create, by a match key.' },
    { type: 'mc', q: 'Why lowercase emails before matching?', options: ['So “Grace.Holt@Example.com” matches “grace.holt@example.com”', 'Uppercase emails are invalid', 'It saves tasks', 'CRMs require it'], answer: 0, why: 'Same address, different capitalization. Normalize first.' },
    { type: 'mc', scenario: 'A payment webhook sometimes arrives twice. Each time, the workflow emails a receipt.', q: 'Best fix?', options: ['Check “receipt already sent for this payment ID?” before sending', 'Turn off the webhook', 'Send two receipts on purpose', 'Wait 10 minutes'], answer: 0, why: 'Make the step idempotent with a check on a unique ID.' },
    { type: 'multi', q: 'Good match keys?', options: ['Order ID', 'Customer email (normalized)', 'First name', 'Order total'], answer: [0, 1], why: 'Unique and stable. Names and totals repeat.' },
  ],
  cards: [
    { id: 'upsert', front: 'Upsert?', back: 'Update if found, create if not, using a match key.' },
    { id: 'key', front: 'Match key?', back: 'A unique, stable field (ID, normalized email) that identifies the same thing across systems.' },
    { id: 'normalize', front: 'Normalize before matching?', back: 'Lowercase emails, trim spaces, digits-only phones.' },
    { id: 'idempotent', front: 'Idempotent?', back: 'Running it twice has the same effect as once. Upserts are; sends and creates aren’t.' },
  ],
};
