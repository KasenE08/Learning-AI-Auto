// M04 · L06 · Spreadsheets as a database
export default {
  steps: [
    { tag: 'example', title: 'The job sheet that broke the workflow', visualFirst: true,
      visual: { type: 'compare', cols: ['What happened', 'Effect on the automation'], rows: [
        ['Owner renamed column “Phone” to “Mobile”', 'Workflow wrote phones into nothing'],
        ['Someone typed “TBD” in the Amount column', 'Monthly total step failed'],
        ['A tech sorted the sheet while a run was writing', 'A row landed next to the wrong job'],
        ['Two rows for job 118', 'Digest counted it twice'],
      ] },
      body: ['Rivera runs everything from one shared spreadsheet. Humans and the workflow both edit it.'],
      check: {
        type: 'mc', q: 'What do all four problems have in common?',
        options: ['Spreadsheets don’t enforce structure: anyone can change columns, types, and rows', 'The workflow was badly built', 'The techs were careless on purpose', 'Spreadsheets can’t be automated'], answer: 0,
        why: 'Sheets are flexible, which is great for people and risky for automations. Nothing stops a rename, a text in a number column, or a duplicate.',
      },
      stuck: {
        metaphor: 'A whiteboard everyone can erase. Perfect for a team huddle; risky as the official record.',
        worked: ['Each problem is a change the sheet allowed.', 'A database would reject or prevent most of them.', 'So the common cause is no enforced structure.'],
      },
    },
    { tag: 'how', title: 'When a sheet is fine, and when it isn’t',
      visual: { type: 'compare', cols: ['', 'Sheet is fine', 'Time to upgrade'], rows: [
        ['Rows', 'Hundreds to low thousands', 'Growing fast, many tabs'],
        ['Who edits', 'One or two people + the workflow', 'Whole team, at the same time'],
        ['Data', 'One simple list', 'Linked things: customers → jobs → invoices'],
        ['Stakes', 'Logs, digests, low risk', 'Money, compliance, customer records'],
      ] },
      body: ['Many small clients start on sheets. That’s fine; design defensively.'] },
    { tag: 'try', title: 'Your turn: defend the sheet',
      check: {
        type: 'multi', q: 'Which protect a workflow that writes to a shared sheet?',
        options: ['A unique ID column the workflow matches on', 'Protecting the header row from edits', 'Data validation on Amount (numbers only)', 'Matching rows by their row number', 'A separate tab the workflow writes to, which humans only read'], answer: [0, 1, 2, 4],
        why: 'Row numbers shift when people sort or insert. IDs, protected headers, validation and a workflow-only tab keep things stable.',
      } },
    { tag: 'key', title: 'Defensive sheet rules',
      body: [
        'Every row gets an ID; never rely on row position.',
        'Lock headers; add validation to typed columns.',
        'Let the workflow own its own tab. People read it or use filtered views.',
        'Plan the move to a real database (next lesson) before it’s urgent.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Why not match rows by row number?', options: ['Sorting or inserting rows changes the numbers', 'Row numbers are secret', 'Sheets don’t have row numbers', 'It uses more tasks'], answer: 0, why: 'Positions move; IDs don’t.' },
    { type: 'mc', scenario: 'A five-person team edits customers, jobs and invoices in one sheet with 9 tabs linked by copy-paste.', q: 'What do you recommend?', options: ['Move to a no-code database with linked records', 'Add a tenth tab', 'Ban editing', 'More colors'], answer: 0, why: 'Linked data, many editors, and real stakes: time to upgrade.' },
    { type: 'mc', q: 'What does data validation on a column do?', options: ['Rejects values of the wrong type or outside the rules', 'Backs up the sheet', 'Hides the column', 'Deletes duplicates'], answer: 0, why: 'E.g. numbers only in Amount.' },
  ],
  cards: [
    { id: 'risk', front: 'Main risk of sheets as databases?', back: 'No enforced structure: renames, wrong types, duplicates, moving rows.' },
    { id: 'ids', front: 'How should a workflow find its row?', back: 'By a unique ID column, never by row position.' },
    { id: 'defend', front: 'Defensive sheet setup?', back: 'IDs, locked headers, validation, and a workflow-owned tab.' },
    { id: 'upgrade', front: 'When to upgrade from a sheet?', back: 'Linked data, many simultaneous editors, or high stakes.' },
  ],
};
