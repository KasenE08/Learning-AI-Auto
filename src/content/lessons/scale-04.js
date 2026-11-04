// M12 · L04 · Your own ops stack
export default {
  steps: [
    { tag: 'example', title: 'What runs your business', visualFirst: true,
      visual: { type: 'compare', cols: ['Job', 'Tool category', 'Automated how'], rows: [
        ['Track prospects and clients', 'CRM (or a no-code database)', 'Every lead and stage change logged automatically'],
        ['Book calls', 'Scheduling link', 'Booked call → CRM + prep notes'],
        ['Proposals and agreements', 'Docs + e-signature', 'Template → signed → invoice sent'],
        ['Invoices and payments', 'Invoicing / payments', 'Retainers billed monthly; failed-payment reminders'],
        ['Client monitoring', 'One alerts inbox or channel', 'All client alerts in one place, by urgency'],
        ['Secrets', 'Password manager', '—'],
      ] },
      body: ['Use the same building blocks you sell. Tool categories, not brands; pick ones with free or low tiers.'],
      check: {
        type: 'mc', q: 'Why route every client’s alerts to one place?',
        options: ['So nothing urgent hides in eight different inboxes', 'To save money', 'Clients require it', 'It looks organized'], answer: 0,
        why: 'With many clients, scattered alerts mean missed failures (Module 6 and 11). One triaged place is your control room.',
      },
      stuck: {
        metaphor: 'A security guard watches one wall of camera screens, not eight separate buildings.',
        worked: ['Each client generates alerts.', 'Scattered alerts get missed.', 'One place, sorted by urgency.'],
      },
    },
    { tag: 'how', title: 'Rules for your stack',
      predict: {"q": "Each extra tool in your stack adds…", "options": ["Another login, bill, and failure point", "Free speed", "Nothing", "More clients"], "answer": 0, "why": "Few tools, well connected. Review costs quarterly."},
      body: ["Few tools, well connected; review costs quarterly.", "Automate your own pipeline first: a live demo of what you sell.", "Client systems in client accounts; your business in yours."] },
    { tag: 'try', title: 'Your turn: automate yourself',
      check: {
        type: 'order', q: 'Order your own client-onboarding automation.', items: ['Proposal accepted (e-signature)', 'Invoice for 50% setup sent', 'Payment received', 'Welcome email + access checklist', 'Kickoff call booked'], why: 'The same pipeline pattern you sell, applied to yourself.',
      } },
    { tag: 'warn', title: 'Back up your own business',
      predict: {"q": "Your CRM provider shuts down tomorrow. What saves you?", "options": ["Regular exports and your build notes", "Hope", "Their support team", "Nothing could"], "answer": 0, "why": "Scheduled exports are a digest workflow you already know how to build."},
      body: [
        'Export your CRM, template library and client config sheets on a schedule (a monthly digest-style workflow can do it).',
        'Keep your password manager’s recovery details somewhere safe and offline.',
        'If one tool shut down tomorrow, could you rebuild? Your exports and build notes are the answer.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Why automate your own pipeline first?', options: ['It saves time and doubles as a live demo', 'Clients require it', 'It’s free', 'It isn’t useful'], answer: 0, why: 'Practice what you sell.' },
    { type: 'mc', q: 'Where should client automations live?', options: ['Client accounts', 'Your personal account', 'A shared login', 'Anywhere'], answer: 0, why: 'Clean ownership and handover.' },
    { type: 'mc', q: 'Many tools or few?', options: ['Few, well connected', 'As many as possible', 'One per client', 'None'], answer: 0, why: 'Less to break and pay for.' },
  ],
  cards: [
    { id: 'stack', front: 'Your ops stack categories?', back: 'CRM, scheduling, docs + e-signature, invoicing, one alerts inbox, password manager.' },
    { id: 'alerts', front: 'Client alerts?', back: 'All in one place, sorted by urgency.' },
    { id: 'few', front: 'Stack rule?', back: 'Few tools, well connected; review costs quarterly.' },
  ],
};
