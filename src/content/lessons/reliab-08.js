// M06 · L08 · Safe changes and versions
export default {
  steps: [
    { tag: 'example', title: 'A “small” edit on a Friday', visualFirst: true,
      visual: { type: 'compare', cols: ['Time', 'What happened'], rows: [
        ['Fri 4:50 pm', 'You edit the live workflow: tweak the AI categories'],
        ['Fri 5:10 pm', 'Router conditions still say “urgent”; AI now returns “high priority”'],
        ['Sat–Sun', 'Every urgent request lands in Otherwise; alert goes to a muted channel'],
        ['Mon 8:00 am', 'Clinic calls: angry patients'],
      ] },
      body: ['You changed one AI step on the live workflow, right before the weekend.'],
      check: {
        type: 'multi', q: 'What would have prevented this?',
        options: ['Make the change on a copy and run the test set first', 'Keep the old version so you can roll back in a minute', 'Don’t change live systems right before nobody’s watching', 'Edit faster'], answer: [0, 1, 2],
        why: 'Test on a copy, keep a [[rollback]], and change when someone can watch the results.',
      },
      stuck: {
        metaphor: 'Rewiring a light switch: you turn off the breaker, test, and keep the old switch handy. You don’t do it live at midnight.',
        worked: ['The edit went straight to live.', 'No test run showed the label mismatch.', 'No quick way back; nobody watching.'],
      },
    },
    { tag: 'how', title: 'The safe-change routine',
      body: [
        '**Copy** the workflow (or use the tool’s version history). Work on the copy.',
        '**Test** with the test set; compare to expected outcomes.',
        '**Switch** at a quiet, watched time. Keep the old version off but saved.',
        '**Watch** the first real runs. Roll back fast if anything looks wrong.',
        '**Write it down:** a change log line: date, what, why, who approved.',
      ] },
    { tag: 'try', title: 'Your turn: order the routine',
      check: {
        type: 'order', q: 'Order a safe change.',
        items: ['Copy the live workflow', 'Make the change on the copy', 'Run the test set', 'Switch over at a watched time', 'Watch the first live runs', 'Log the change'],
        why: 'Never edit live first; always keep a way back.',
      } },
    { tag: 'warn', title: 'Changes you don’t make still happen',
      body: [
        'Apps update their APIs, AI providers update models, clients rename fields. Your workflow changes without you touching it.',
        'That’s why monitoring (lesson 4) and re-running test sets (Module 2) matter even when “nothing changed”.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Where should edits happen?', options: ['On a copy, tested before switching', 'Directly on the live workflow', 'In the client’s email', 'Nowhere'], answer: 0, why: 'Test before customers see it.' },
    { type: 'mc', q: 'What is a rollback?', options: ['Switching back to the last working version', 'Deleting the workflow', 'A retry', 'A discount'], answer: 0, why: 'Your fast way out.' },
    { type: 'multi', q: 'What belongs in a change log line?', options: ['Date', 'What changed', 'Why', 'Who approved', 'Your mood'], answer: [0, 1, 2, 3], why: 'Enough to explain it months later.' },
  ],
  cards: [
    { id: 'routine', front: 'Safe-change routine?', back: 'Copy → change → test → switch at a watched time → watch → log.' },
    { id: 'rollback', front: 'Rollback?', back: 'Switching back to the last working version.' },
    { id: 'drift', front: 'Changes you don’t make?', back: 'API updates, model updates, renamed fields. Monitor and re-test anyway.' },
  ],
};
