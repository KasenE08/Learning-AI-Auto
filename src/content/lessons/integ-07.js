// M04 · L07 · No-code databases
export default {
  steps: [
    { tag: 'example', title: 'Customers, jobs, invoices: linked', visualFirst: true,
      visual: { type: 'record', title: 'Job 118 in a no-code database', data: {
        job_id: 'J-118', status: 'Done', scheduled: '2026-10-28',
        customer: { linked_record: 'Grace Holt', email: 'grace.holt@example.com' },
        invoices: [{ linked_record: 'INV-2291', amount: 480, paid: true }],
        technician: { linked_record: 'Luis M.' },
      } },
      body: ['Rivera moved from the shared sheet to a no-code database. Look at how the job connects to other things.'],
      check: {
        type: 'mc', q: 'Grace changes her email. How many places need updating?',
        options: ['One: her customer record. Every job links to it', 'Every job she’s ever had', 'Every invoice', 'None; emails never change'], answer: 0,
        why: 'Jobs link to the customer record instead of copying her details. Change it once; every link shows the new value.',
      },
      stuck: {
        metaphor: 'A phone’s contacts app: your messages link to a contact. Rename the contact once and every conversation shows the new name.',
        worked: ['The job doesn’t store Grace’s email itself.', 'It links to her customer record.', 'Update the record once.'],
      },
    },
    { tag: 'how', title: 'What a database adds',
      body: [
        '**Tables** for each kind of thing (customers, jobs, invoices), with **typed fields** (number, date, choice, email) that reject bad values.',
        '[[linked-record|Linked records]] connect tables, so data lives in one place.',
        'Views, filters and permissions: techs see today’s jobs; the owner sees money.',
        'No-code databases look like spreadsheets but behave like databases, and usually have strong automation triggers (“record updated”).',
      ] },
    { tag: 'try', title: 'Your turn: design the tables',
      check: {
        type: 'multi', q: 'A dog groomer: owners, dogs, appointments. Which links make sense?',
        options: ['Each dog links to its owner', 'Each appointment links to a dog', 'Each owner stores every appointment date in a text field', 'An owner can link to several dogs'], answer: [0, 1, 3],
        why: 'Link, don’t copy. Appointment dates belong in the appointments table, reachable through the dog.',
      } },
    { tag: 'biz', title: 'A real offer in itself',
      body: [
        'Moving a small business off a messy sheet onto a clean, linked database, with automations on top, is a common first project.',
        'Plan the migration: clean duplicates first, map columns to typed fields, test with a copy, then switch.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is a linked record?', options: ['A field that points to a record in another table', 'A copied row', 'A deleted record', 'A web link'], answer: 0, why: 'One source of truth, referenced everywhere.' },
    { type: 'mc', q: 'Why do typed fields matter for automations?', options: ['Bad values are rejected at entry, so steps get what they expect', 'They look nicer', 'They save tasks', 'They’re required by law'], answer: 0, why: 'A number field can’t contain “TBD”.' },
    { type: 'order', q: 'Order a sheet-to-database migration.', items: ['Clean duplicates and bad values', 'Design tables and typed fields', 'Import into a test copy and check', 'Switch workflows to the database'], why: 'Clean, design, test, switch.' },
  ],
  cards: [
    { id: 'tables', front: 'What does a no-code database add over a sheet?', back: 'Typed fields, linked tables, views, permissions, record-level triggers.' },
    { id: 'link', front: 'Link or copy?', back: 'Link. Data lives in one place; change it once.' },
    { id: 'migrate', front: 'Migration order?', back: 'Clean → design → test copy → switch.' },
  ],
};
