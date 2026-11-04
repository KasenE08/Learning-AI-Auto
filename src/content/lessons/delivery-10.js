// M11 · L10 · Renewals and offboarding
export default {
  steps: [
    { tag: 'example', title: 'A client decides to leave', visualFirst: true,
      visual: { type: 'compare', cols: ['Offboarding step', 'Why'], rows: [
        ['Confirm the end date and what keeps running', 'No surprises'],
        ['Hand over build notes, runbook, test set', 'They can maintain it or hire someone else'],
        ['Transfer anything in your accounts to theirs', 'Nothing breaks when you leave'],
        ['They remove your access; you confirm in writing', 'Security for both sides'],
        ['Delete their data you hold, per the agreement', 'Privacy (Module 6)'],
        ['Ask for honest feedback', 'Learn why'],
      ] },
      body: ['Ironside Fitness (fake) is moving to an all-in-one gym platform.'],
      check: {
        type: 'mc', q: 'Why make leaving easy?',
        options: ['Clean exits protect your reputation and often bring clients back or send referrals', 'Because you have to', 'To get rid of them faster', 'It doesn’t matter'], answer: 0,
        why: 'A client who leaves on good terms still talks about you. A messy exit gets talked about too, badly.',
      },
      stuck: {
        metaphor: 'Moving out of an apartment: leave the keys, the manuals, and a clean space, and you get a good reference.',
        worked: ['Hand over everything they need.', 'Remove access and data properly.', 'Leave the door open.'],
      },
    },
    { tag: 'how', title: 'Renewals',
      predict: {"q": "What should a renewal review call open with?", "options": ["Results vs the baseline", "The new price", "A feature list", "Small talk only"], "answer": 0, "why": "Show value first. Price changes come with notice after."},
      body: [
        'Renewals are won monthly through reports, not at the end of the term.',
        'Before a term ends: a short review call with results vs baseline and next quarter’s suggestion.',
        'If a price change is coming, give notice in that call (Module 10).',
      ] },
    { tag: 'try', title: 'Your turn: the renewal call',
      check: {
        type: 'mc', q: 'What should a renewal review call open with?', options: ['Results vs the baseline from onboarding', 'The new price', 'A list of features', 'Your other clients'], answer: 0,
        why: 'Show the value first. Everything else follows from it.',
      } },
    { tag: 'key', title: 'The full delivery loop',
      visual: {"type": "sort", "cols": ["First", "Later"], "items": [{"text": "Onboard with a baseline", "col": 0}, {"text": "Deliver in visible weekly pieces", "col": 0}, {"text": "Launch, watched", "col": 0}, {"text": "Report monthly", "col": 1}, {"text": "Expand with one suggestion", "col": 1}, {"text": "Renew or offboard cleanly", "col": 1, "why": "The relationship ends (or continues) on clear terms."}], "prompt": "Early or later in the client lifecycle?"},
      body: ['Onboard with a baseline → deliver in visible weekly pieces → document → launch watched → support on clear terms → report monthly → expand → renew or offboard cleanly.'] },
  ],
  quiz: [
    { type: 'multi', q: 'Offboarding steps?', options: ['Hand over docs and runbook', 'Transfer accounts you hold', 'Client removes your access', 'Delete data per agreement', 'Keep their workflows running in your account secretly'], answer: [0, 1, 2, 3], why: 'Never keep hidden access or systems.' },
    { type: 'mc', q: 'When are renewals really won?', options: ['Every month, through results reports', 'On the last day', 'In the proposal', 'Never'], answer: 0, why: 'Ongoing visible value.' },
    { type: 'order', q: 'Order the delivery loop.', items: ['Onboard with a baseline', 'Deliver in visible pieces', 'Launch, watched', 'Report monthly', 'Renew or offboard cleanly'], why: 'The full client lifecycle.' },
  ],
  cards: [
    { id: 'offboard', front: 'Offboarding steps?', back: 'Hand over docs, transfer accounts, client removes access, delete data, ask for feedback.' },
    { id: 'renew', front: 'Renewals are won when?', back: 'Monthly, through reports.' },
    { id: 'loop', front: 'Delivery loop?', back: 'Onboard → deliver → document → launch → support → report → expand → renew/offboard.' },
  ],
};
