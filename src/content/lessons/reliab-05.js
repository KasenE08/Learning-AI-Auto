// M06 · L05 · Logs that answer questions
export default {
  steps: [
    { tag: 'example', title: '“Did Omar ever get his confirmation?”', visualFirst: true,
      visual: { type: 'compare', cols: ['Time', 'Run', 'Step', 'Result'], rows: [
        ['Mon 9:02', 'R-1841 · Omar Khan', 'Find or create contact', 'Updated c12'],
        ['Mon 9:02', 'R-1841 · Omar Khan', 'Send email', 'Sent to omar.k@example.com'],
        ['Mon 9:03', 'R-1842 · Sam Ortiz', 'Send email', 'Failed: invalid address · alert posted'],
      ] },
      body: ['The clinic manager asks you a question on Friday. You open the run history.'],
      check: {
        type: 'mc', q: 'Can you answer the manager?',
        options: ['Yes: sent Monday 9:02 to omar.k@example.com', 'No, logs don’t show emails', 'Only by asking Omar', 'Only if the CRM has it'], answer: 0,
        why: 'Good [[run-log|logs]] answer “what happened to this person, when, and why” in seconds.',
      },
      stuck: {
        metaphor: 'A delivery tracking page: every scan, time, and location, so you can answer “where’s my package?” without guessing.',
        worked: ['Find runs for Omar Khan.', 'R-1841 has a “Send email” step: sent.', 'Time Monday 9:02, to his address.'],
      },
    },
    { tag: 'how', title: 'What a useful log has',
      body: [
        'Every run: when, which record (a human-readable name or ID), each step’s result, and the error if any.',
        'Builders keep run history, often only for a limited time on free plans. For important workflows, also write key events to a log sheet or table you control.',
        'Log enough to answer questions; avoid logging sensitive details you don’t need (lesson 7).',
      ] },
    { tag: 'try', title: 'Your turn: which log line helps?',
      check: {
        type: 'mc', q: 'Which log line is most useful for answering a client’s question later?',
        options: ['“2026-11-02 14:10 · Run R-1903 · Grace Holt · Create invoice · Failed: 400 amount must be a number”', '“Error”', '“Step 4 failed”', '“Something went wrong, retrying”'], answer: 0,
        why: 'When, which record, which step, and why. The others make you dig.',
      } },
    { tag: 'warn', title: 'Logs hold personal data too',
      body: [
        'Run history often stores every field each step saw: names, emails, sometimes health or payment details.',
        'Know who can open the logs, how long they’re kept, and trim what’s logged to what you need (lesson 7).',
        'When a client leaves, their logs leave too: export what they want, delete the rest.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'What should every run log include?', options: ['Time', 'Which record', 'Each step’s result', 'Error reason', 'The full content of every customer message'], answer: [0, 1, 2, 3], why: 'Log what you need, not every sensitive detail.' },
    { type: 'mc', scenario: 'A client’s builder keeps run history for 7 days on their plan. They often ask about things from last month.', q: 'What do you add?', options: ['Write key events to a log sheet or table the client owns', 'Upgrade nothing; tell them to ask sooner', 'Screenshot every run', 'Nothing'], answer: 0, why: 'Keep your own durable log for important events.' },
    { type: 'mc', q: 'Why use a human-readable record name in logs?', options: ['So you can find “Omar Khan” without decoding IDs', 'It looks nicer', 'IDs are secret', 'Builders require it'], answer: 0, why: 'Questions come in as names.' },
  ],
  cards: [
    { id: 'log', front: 'A useful log line?', back: 'When, which record, which step, result, and the error reason.' },
    { id: 'retention', front: 'Builder history too short?', back: 'Write key events to a log sheet/table you control.' },
    { id: 'sensitive', front: 'Log everything?', back: 'No. Log what answers questions; skip sensitive details you don’t need.' },
  ],
};
