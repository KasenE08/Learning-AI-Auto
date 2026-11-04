// M03 · L06 · Delays and follow-up sequences
export default {
  steps: [
    { tag: 'example', title: 'The follow-up nobody remembers', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Quote sent', kind: 'trigger', data: { customer: 'Marcus Webb', quote: '$4,200 bathroom remodel' } },
        { label: 'Wait 3 days', kind: 'logic', data: { waited: '3 days' } },
        { label: 'Check: has Marcus replied or accepted?', kind: 'logic', data: { replied: 'no' } },
        { label: 'Email: “Any questions about the quote?”', kind: 'action' },
        { label: 'Wait 4 days, check again', kind: 'logic', data: { replied: 'yes → stop' } },
      ] },
      body: ['Rivera’s owner sends quotes, then forgets to follow up. Run the sequence.'],
      check: {
        type: 'mc', q: 'Why check “has he replied?” before each follow-up?',
        options: ['So nobody who already answered gets chased', 'Emails need a check to send', 'To count tasks', 'It slows the sequence down'], answer: 0,
        why: 'A [[stop-condition]] ends the sequence when the goal is reached. Chasing someone who already said yes looks careless.',
      },
      stuck: {
        metaphor: 'A reminder on your phone that you dismiss once the task is done. Without that, it would keep ringing after you’d finished.',
        worked: ['The goal is a reply or acceptance.', 'Before each follow-up, check if the goal happened.', 'If yes, stop; if not, send and wait again.'],
      },
    },
    { tag: 'how', title: 'Sequences: wait, check, act',
      predict: {"q": "A lead booked yesterday. Today the sequence is about to send “Ready to book?”. What should happen?", "options": ["A check sees they booked and stops the sequence", "Send it anyway", "Send it twice", "Wait a week"], "answer": 0, "why": "Every wait is followed by a check against the goal. Stop as soon as it’s met."},
      body: ["A [[sequence]]: act → wait → check the goal → act again if needed.", "Stop as soon as the goal is met, and set a clear end after 2–3 touches.", "Long waits are automation’s strength: no human has to remember."] },
    { tag: 'try', title: 'Your turn: order the sequence',
      check: {
        type: 'order', q: 'A gym lead sequence. Put it in order.',
        items: ['New lead arrives', 'Send welcome email now', 'Wait 1 day', 'Check: booked a free session?', 'If not, send a reminder email', 'Wait 3 days, check again, then stop'],
        why: 'Immediate touch, wait, check the goal, act only if needed, and a clear end.',
      } },
    { tag: 'warn', title: 'Timing details that matter',
      predict: {"q": "A lead replies “STOP” to a text. What happens to their other sequences?", "options": ["All of them end for that person", "Only the text one ends", "Nothing", "They restart next week"], "answer": 0, "why": "Opt-outs end every sequence for that person, immediately."},
      body: [
        'Send in the customer’s daytime. A 3:00 am reminder feels robotic.',
        'If the lead’s info changes mid-sequence (they booked by phone), the check must look at **current** data, not what was true when it started.',
        'Respect opt-outs instantly. “Stop” or “unsubscribe” ends every sequence for that person (Module 13 covers the rules).',
      ] },
    { tag: 'build', title: 'Build it: welcome, wait, follow up', build: { challenge: 'followup-sequence' },
      body: ['Two emails, a one-day wait, and a reminder that uses the first name only.'] },
  ],
  quiz: [
    { type: 'mc', q: 'What is a stop condition?', options: ['A check that ends the sequence when the goal is met', 'An error', 'The last email', 'A filter on spam'], answer: 0, why: 'Replied, booked, paid: stop chasing.' },
    { type: 'mc', scenario: 'A customer booked by phone yesterday, but today’s reminder still asks them to book.', q: 'What’s missing?', options: ['A check of current data (are they booked?) before the reminder', 'A longer wait', 'A better subject line', 'A bigger AI model'], answer: 0, why: 'Check live data right before acting.' },
    { type: 'multi', q: 'Good sequence habits?', options: ['A clear end after a few touches', 'Send during the recipient’s daytime', 'Honor opt-outs instantly', 'Keep sending until they reply'], answer: [0, 1, 2], why: 'Endless chasing hurts the client’s reputation.' },
  ],
  cards: [
    { id: 'sequence', front: 'Sequence pattern?', back: 'Act → wait → check the goal → act again if needed → clear end.' },
    { id: 'stop', front: 'Stop condition?', back: 'The goal (replied, booked, paid) that ends the sequence.' },
    { id: 'live', front: 'What must the check before each touch use?', back: 'Current data, not what was true when the sequence started.' },
    { id: 'optout', front: 'Opt-outs?', back: 'End every sequence for that person immediately.' },
  ],
};
