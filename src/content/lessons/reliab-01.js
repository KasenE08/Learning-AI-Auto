// M06 · L01 · Testing with sample data
export default {
  steps: [
    { tag: 'example', title: 'It worked in the demo', visualFirst: true,
      visual: { type: 'compare', cols: ['Test record', 'Demo result', 'Live result'], rows: [
        ['“Test Person, test@test.com”', 'Pass', 'n/a'],
        ['Real patient with an apostrophe: “Dana O’Neil”', 'not tested', 'Name saved as “Dana O”'],
        ['Real patient, no phone', 'not tested', 'Text step failed, run stopped'],
        ['Same patient twice in one day', 'not tested', 'Duplicate contact'],
      ] },
      body: ['A booking workflow passed its demo with one tidy test record. Then real patients arrived.'],
      check: {
        type: 'mc', q: 'What was wrong with the testing?',
        options: ['One tidy record can’t show how real, messy data behaves', 'The demo was too short', 'Tests should be skipped', 'The live data was fake'], answer: 0,
        why: 'Test data must look like real data, including the mess. One perfect record proves almost nothing.',
      },
      stuck: {
        metaphor: 'Testing a car only on an empty, dry road. It looks perfect until the first rainy rush hour.',
        worked: ['The demo used one clean record.', 'Real data had apostrophes, blanks, repeats.', 'None of those were tested.'],
      },
    },
    { tag: 'how', title: 'A good test set',
      body: [
        '[[test-data|Test data]]: 10–30 fake records modeled on the client’s real ones (ask for anonymized samples).',
        'Include: typical cases, every category or path, blanks, odd characters, duplicates, very long text, wrong formats.',
        'Write the expected outcome for each record before running. Then compare.',
        'Test in a safe place: test copies of sheets, a test CRM pipeline, your own email as recipient. Never real customers.',
      ] },
    { tag: 'try', title: 'Your turn: what’s missing?',
      check: {
        type: 'multi', q: 'Your test set for a plumber’s inbox has 5 normal job emails. What should you add?',
        options: ['A spam email', 'An email with no address in it', 'The same customer emailing twice', 'An email in all caps with typos', 'Five more normal job emails'], answer: [0, 1, 2, 3],
        why: 'More of the same tests nothing new. Add the cases that take different paths or break things.',
      } },
    { tag: 'key', title: 'The sandbox is practice for this',
      body: [
        'Every sandbox business in this app has traps built into its test data on purpose: duplicates, a bad email, a missing phone.',
        'In client work, you build that data yourself. It’s part of the job, and part of what you’re paid for.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Why write expected outcomes before running tests?', options: ['So you judge results against a standard, not what you hope to see', 'It’s faster', 'Builders require it', 'To fill the report'], answer: 0, why: 'Otherwise anything that runs looks “fine”.' },
    { type: 'multi', q: 'Which belong in test data?', options: ['Blank fields', 'Duplicates', 'Odd characters (apostrophes, accents)', 'Real customers’ live data in a live workflow'], answer: [0, 1, 2], why: 'Use fake or anonymized data in safe test copies.' },
    { type: 'mc', scenario: 'A client asks you to test the new SMS workflow on their real customer list.', q: 'What do you do?', options: ['Test with fake records sent to your own phone first', 'Send to the real list', 'Send to half the list', 'Skip testing'], answer: 0, why: 'Sends can’t be undone. Test safely first.' },
  ],
  cards: [
    { id: 'set', front: 'A good test set includes?', back: 'Typical cases, every path, blanks, odd characters, duplicates, wrong formats.' },
    { id: 'expected', front: 'Before running tests?', back: 'Write the expected outcome for each record.' },
    { id: 'safe', front: 'Where do tests run?', back: 'Test copies and your own addresses. Never real customers.' },
  ],
};
