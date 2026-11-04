// M09 · L06 · Referrals and partners
export default {
  steps: [
    { tag: 'example', title: 'Who already serves your niche?', visualFirst: true,
      visual: { type: 'compare', cols: ['Partner', 'Serves', 'Why they’d refer you'], rows: [
        ['A web designer', 'Contractors who need websites', 'Clients ask them “can the form do more?”'],
        ['A bookkeeper', 'Small firms and trades', 'Clients complain about invoicing chaos'],
        ['A marketing agency', 'Gyms and clinics running ads', 'Their ads make leads; slow follow-up wastes them'],
        ['A software reseller', 'Dental offices', 'Clients want the systems connected'],
      ] },
      body: ['These businesses already have your ideal clients’ trust.'],
      check: {
        type: 'mc', q: 'Why would a marketing agency refer you?',
        options: ['Your work makes their ads look better (leads get answered and booked)', 'They don’t want clients', 'They’re required to', 'To compete with you'], answer: 0,
        why: 'Good partners win when you win: their results improve, their clients stay happier.',
      },
      stuck: {
        metaphor: 'A wedding photographer refers a florist they trust: the whole wedding goes better, and the couple remembers both.',
        worked: ['The agency’s ads generate leads.', 'Slow follow-up wastes those leads.', 'Your system makes their ads work better.'],
      },
    },
    { tag: 'how', title: 'Client referrals',
      body: [
        'Ask when the client is happiest: right after a measurable win (“that’s 6 after-hours jobs booked this month”).',
        'Make it specific: “Who else do you know who runs a shop like yours?”',
        'Make it easy: a 2-line intro text they can forward.',
        'Thank every referral, win or not.',
      ] },
    { tag: 'try', title: 'Your turn: timing',
      check: {
        type: 'mc', q: 'Best moment to ask a client for a referral?', options: ['Right after you report a clear win', 'In the first week, before launch', 'When sending an invoice', 'When something broke'], answer: 0,
        why: 'Ask when they’ve just felt the value.',
      } },
    { tag: 'biz', title: 'Partner terms',
      body: [
        'Some partners want a referral fee; others just want their clients served well. Agree terms in writing.',
        'Tell clients about any referral payment if it could affect their trust. Transparency keeps partnerships clean.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Good referral partners?', options: ['Web designers for your niche', 'Bookkeepers', 'Marketing agencies', 'Your direct competitors'], answer: [0, 1, 2], why: 'Partners serve the same clients with different work.' },
    { type: 'mc', q: 'Make a referral ask easy by…', options: ['Giving a short intro message they can forward', 'Asking for 20 names', 'Waiting for them to think of it', 'Offering them a discount on the spot'], answer: 0, why: 'Remove effort.' },
    { type: 'mc', q: 'Referral fee with a partner?', options: ['Agree it in writing, be transparent with clients where relevant', 'Keep it secret', 'Never allowed', 'Only cash'], answer: 0, why: 'Clear and honest.' },
  ],
  cards: [
    { id: 'partners', front: 'Who makes good partners?', back: 'Businesses serving your niche with different work: designers, bookkeepers, agencies, resellers.' },
    { id: 'when', front: 'When to ask a client for referrals?', back: 'Right after a clear, measured win.' },
    { id: 'easy', front: 'Make referrals easy?', back: 'Specific ask + a forwardable 2-line intro.' },
  ],
};
