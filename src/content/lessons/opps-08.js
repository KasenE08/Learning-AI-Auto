// M07 · L08 · Patterns: online, property, professional firms
export default {
  steps: [
    { tag: 'example', title: 'Three businesses, three bottlenecks', visualFirst: true,
      visual: { type: 'compare', cols: ['Business (fake)', 'Bottleneck', 'Workflow'], rows: [
        ['Online candle shop', '“Where’s my order?” emails eat 2 hours a day', 'AI triage + order-status lookup + draft replies'],
        ['Real estate team', 'Showing requests from 4 sites, double bookings', 'Unified lead intake → routing → booking'],
        ['Small accounting firm', 'Chasing clients for tax documents every spring', 'Document checklist + reminder sequence + upload tracking'],
      ] },
      body: ['Beyond local trades, three other common client types.'],
      check: {
        type: 'mc', q: 'What do the accounting firm’s and the candle shop’s workflows have in common?',
        options: ['Both remove repeated back-and-forth by answering or chasing automatically', 'Both need voice agents', 'Both are about payments', 'Nothing'], answer: 0,
        why: '“Where’s my order?” and “please send your W-2” are the same shape: predictable, repeated communication.',
      },
      stuck: {
        metaphor: 'A receptionist who answers the same five questions all day. Automate the five answers; keep the receptionist for the rest.',
        worked: ['Candle shop: repeated status questions.', 'Accountant: repeated document requests.', 'Both: predictable back-and-forth.'],
      },
    },
    { tag: 'see', title: 'Patterns by type',
      visual: { type: 'compare', cols: ['Type', 'Common wins'], rows: [
        ['Online stores', 'Support triage, order-status answers, low-stock alerts, review follow-ups, returns intake'],
        ['Property (sales, rentals)', 'Lead routing, showing scheduling, application intake, maintenance requests, rent reminders'],
        ['Professional firms (accounting, law, agencies)', 'Client intake forms, document collection, status updates, meeting prep summaries, invoice chasing'],
      ] } },
    { tag: 'try', title: 'Your turn: match the pattern',
      check: {
        type: 'mc', scenario: 'A small marketing agency: “Every new client takes a week of emails to collect logins, brand files, and goals.”',
        q: 'Which workflow fits?', options: ['Onboarding intake: one form + checklist + reminder sequence + status tracking', 'A sales chatbot', 'Invoice dunning', 'A voice agent'], answer: 0,
        why: 'Collecting the same items from every new client is document collection, the professional-firm pattern.',
      } },
    { tag: 'warn', title: 'Professional firms have extra duties',
      body: [
        'Law, accounting, and healthcare firms owe clients confidentiality and often have strict data rules. Check what can go into AI tools and where data is stored before proposing anything.',
        'Keep AI out of the advice itself: it drafts, organizes, and reminds; professionals decide.',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Common online-store wins?', options: ['Support triage', 'Order-status answers', 'Low-stock alerts', 'Writing legal contracts'], answer: [0, 1, 2], why: 'Contracts aren’t a store workflow.' },
    { type: 'mc', q: 'A law firm wants AI to answer clients’ legal questions automatically. Your position?', options: ['Assist with intake, drafting and reminders; professionals give the advice', 'Build it; AI is good at law', 'Refuse to work with law firms', 'Use RAG and skip review'], answer: 0, why: 'Professional duties stay with professionals.' },
    { type: 'mc', q: 'Document collection is a pattern for…', options: ['Professional firms gathering items from every client', 'Online stores only', 'Gyms', 'Nobody'], answer: 0, why: 'Accountants, agencies, lawyers, lenders.' },
  ],
  cards: [
    { id: 'store', front: 'Online-store wins?', back: 'Support triage, order status, low-stock alerts, review follow-ups, returns.' },
    { id: 'property', front: 'Property wins?', back: 'Lead routing, showings, applications, maintenance requests, rent reminders.' },
    { id: 'firm', front: 'Professional-firm wins?', back: 'Intake, document collection, status updates, meeting prep, invoice chasing. AI assists; pros decide.' },
  ],
};
