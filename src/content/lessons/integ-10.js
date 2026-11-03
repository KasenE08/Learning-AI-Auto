// M04 · L10 · Team chat alerts
export default {
  steps: [
    { tag: 'example', title: '#general is drowning', visualFirst: true,
      visual: { type: 'compare', cols: ['Message', 'Needs action?'], rows: [
        ['New lead: Alex Moreno (price check)', 'Not now'],
        ['Row added to Leads sheet', 'No'],
        ['New lead: Jordan Bell (wants a trainer by June)', 'Yes, call today'],
        ['Workflow ran successfully', 'No'],
        ['Payment dispute opened: $480', 'Yes, urgent'],
      ] },
      body: ['Ironside’s automations post everything into one channel. Staff have muted it.'],
      check: {
        type: 'mc', q: 'What happened to the dispute alert?',
        options: ['It was buried among messages nobody needs, so nobody saw it', 'It was deleted', 'It went to email', 'It was handled automatically'], answer: 0,
        why: 'That’s [[alert-fatigue]]. When most alerts don’t need action, people stop reading all of them, including the critical ones.',
      },
      stuck: {
        metaphor: 'The car alarm that goes off every night. After a week, nobody looks out the window when it rings.',
        worked: ['Most messages needed nothing.', 'Staff muted the channel.', 'The one urgent alert was missed.'],
      },
    },
    { tag: 'how', title: 'Design alerts that get read',
      body: [
        '**Only actionable:** if nobody needs to do anything, it belongs in a digest or a log, not an alert.',
        '**Right channel:** #sales for leads, #ops-alerts for failures, a direct message for “you, now”.',
        '**Say what to do:** “Call Jordan Bell today: wants a trainer by June. 555-410-1188.”',
        '**Mention the owner** of the next step when it’s urgent.',
      ] },
    { tag: 'try', title: 'Your turn: route the messages',
      check: {
        type: 'multi', q: 'Which should stay as **instant** alerts?',
        options: ['Payment dispute opened', 'Workflow ran successfully', 'Hot lead who wants to start this week', 'Daily count of new newsletter signups', 'A workflow failed and a customer didn’t get their confirmation'], answer: [0, 2, 4],
        why: 'Money at risk, a hot lead, and a broken promise to a customer need action now. Success notices and counts go to a digest.',
      } },
    { tag: 'warn', title: 'Privacy in chat',
      body: [
        'Team chat is read by many people and kept for a long time. Post the minimum: first name and a link to the record, not health details or full card or ID numbers.',
        'Module 6, lesson 7 has a build on exactly this.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is alert fatigue?', options: ['Too many unneeded alerts make people ignore all of them', 'Alerts that send too slowly', 'A chat app limit', 'Tired staff'], answer: 0, why: 'Noise hides signal.' },
    { type: 'mc', q: 'Where does “workflow ran successfully” belong?', options: ['A log or a daily digest', 'An instant alert to everyone', 'The CEO’s direct messages', 'Nowhere, ever'], answer: 0, why: 'Useful as a record, not as an interruption.' },
    { type: 'mc', scenario: 'A clinic wants a chat ping for urgent patient requests.', q: 'What should the ping contain?', options: ['First name, “urgent request”, and a link to the record', 'Full name, phone, and symptoms', 'The whole form', 'Nothing; just “new message”'], answer: 0, why: 'Enough to act, minimum personal data.' },
  ],
  cards: [
    { id: 'fatigue', front: 'Alert fatigue?', back: 'Too many non-actionable alerts → people ignore all of them.' },
    { id: 'rules', front: 'Four rules for alerts?', back: 'Only actionable, right channel, say what to do, mention the owner when urgent.' },
    { id: 'minimum', front: 'Personal data in chat alerts?', back: 'The minimum: first name + link to the record.' },
  ],
};
