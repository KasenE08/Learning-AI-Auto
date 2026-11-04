// M04 · L08 · Documents: generate and store
export default {
  steps: [
    { tag: 'example', title: 'A quote in 10 seconds', visualFirst: true,
      visual: { type: 'compare', cols: ['Template says', 'Generated quote says'], rows: [
        ['Quote for {{customer_name}}', 'Quote for Marcus Webb'],
        ['Job: {{job_description}}', 'Job: Replace tub and vanity'],
        ['Address: {{address}}', 'Address: 88 Oak Ave'],
        ['Total: {{total}}', 'Total: $4,200.00'],
        ['Valid until {{valid_until}}', 'Valid until December 3, 2026'],
      ] },
      body: ['Rivera’s owner used to type every quote. Now one template + the job’s fields = a finished document.'],
      check: {
        type: 'mc', q: 'Where does “$4,200.00” come from?',
        options: ['The job record’s total, merged into the {{total}} placeholder', 'The AI wrote it', 'It’s typed into the template', 'The customer’s email'], answer: 0,
        why: 'A template has [[merge-field|placeholders]]. The workflow fills each one from mapped fields. Prices come from data, never from an AI guess.',
      },
      stuck: {
        metaphor: 'A mail-merge letter: one letter with blanks, printed once per person with their name filled in.',
        worked: ['The template has {{total}}.', 'The workflow maps the job’s total into it.', 'The document shows $4,200.00.'],
      },
    },
    { tag: 'how', title: 'Generate → convert → store → share',
      predict: {"q": "A generated quote goes to a customer. Which format is safest?", "options": ["PDF", "An editable doc", "A spreadsheet", "A screenshot"], "answer": 0, "why": "PDFs can’t be edited by accident, and they look the same everywhere."},
      body: ["**Generate** from a template (format numbers and dates first), then **convert** to PDF for customers.", "**Store** with a clear name and link it back on the record.", "**Share** deliberately: one file, to the right person."] },
    { tag: 'try', title: 'Your turn: AI or merge?',
      check: {
        type: 'multi', q: 'In an automated quote, which parts should come from **merged data**, not AI writing?',
        options: ['Prices and totals', 'Customer name and address', 'A friendly intro paragraph', 'Valid-until date'], answer: [0, 1, 3],
        why: 'Facts and numbers come from data. AI can write the friendly paragraph, ideally with approval (Module 3).',
      } },
    { tag: 'warn', title: 'Sharing is where documents leak',
      predict: {"q": "A folder of invoices is shared “anyone with the link can view”. Who can see them?", "options": ["Anyone who gets the link, all customers’ invoices", "Only the owner", "Nobody", "Only customers"], "answer": 0, "why": "Share single files to specific people."},
      body: [
        '“Anyone with the link can view” on a folder of invoices exposes every customer.',
        'Share single files, to specific people, and keep internal notes out of customer documents.',
      ] },
    { tag: 'outside', title: 'Optional: generate a document for real',
      body: ['Try the merge pattern in a free tool with a document template.'],
      outside: {
        id: 'doc-merge',
        title: 'A quote generated from a template',
        goal: 'When a row is added to a “Quotes” sheet, create a document from a template with that row’s details filled in, saved with a clear name.',
        steps: [
          'Create a document template with placeholders for: customer name, job, address, total, valid-until date.',
          'Create a sheet “Quotes” with matching columns. Add one fake row from the data below.',
          'In your automation tool, trigger on a new row in “Quotes”.',
          'Add a step that creates a copy of the template and replaces every placeholder with that row’s values. Format the total as money.',
          'Name the new file “Quote – [customer name] – [today’s date]” and save it in a “Quotes” folder.',
          'Write the new document’s link back into the row.',
        ],
        data: ['Marcus Webb · Replace tub and vanity · 88 Oak Ave · 4200 · valid 30 days'],
        prompt: 'You are grading a beginner’s document-generation automation. Goal: a new spreadsheet row creates a document from a template with every placeholder filled, named clearly, and linked back to the row. Be strict.',
        checklist: [
          'The trigger is a new row in the Quotes sheet.',
          'The generated document has no leftover placeholders.',
          'Name, job, address and valid-until date match the row exactly.',
          'The total is formatted as money (e.g. $4,200.00).',
          'The file name includes the customer name and the date.',
          'The document’s link was written back into the row.',
        ],
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the document pattern.', items: ['Generate from template', 'Convert to PDF', 'Store with a clear name', 'Share with the right person'], why: 'Make it, lock it, file it, send it.' },
    { type: 'mc', q: 'Where should a quote’s price come from?', options: ['Mapped data from the job record', 'An AI estimate', 'The customer’s email', 'Last month’s quote'], answer: 0, why: 'Numbers from data, never guessed.' },
    { type: 'mc', scenario: 'A client’s invoice folder is shared as “anyone with the link can view”.', q: 'What’s the risk?', options: ['Anyone who gets one link can see every customer’s invoices', 'None', 'The PDFs get bigger', 'Invoices stop generating'], answer: 0, why: 'Share single files to specific people.' },
  ],
  cards: [
    { id: 'merge', front: 'Merge field (placeholder)?', back: 'A slot in a template filled with a mapped value when the document is generated.' },
    { id: 'flow', front: 'Document pattern?', back: 'Generate → convert (PDF) → store (clear name, linked) → share deliberately.' },
    { id: 'facts', front: 'AI or data for prices and names?', back: 'Data. AI only for optional prose, ideally approved.' },
  ],
};
