// M04 · L01 · CRMs: contacts, deals, pipelines
export default {
  steps: [
    { tag: 'example', title: 'A gym’s sales board', visualFirst: true,
      visual: { type: 'compare', cols: ['Stage', 'Deals', 'Example'], rows: [
        ['New lead', '14', 'Kim Nguyen: knee rehab'],
        ['Contacted', '9', 'Alex Moreno: price shopping'],
        ['Trial booked', '5', 'Jordan Bell: Tue 6 pm'],
        ['Joined (won)', '3', 'Chris Patel + partner'],
        ['Lost', '6', 'Moved away'],
      ] },
      body: ['Ironside Fitness tracks every potential member as a card moving left to right through stages.'],
      check: {
        type: 'mc', q: 'Jordan just showed up for the trial and signed up. What should change in the CRM?',
        options: ['Jordan’s deal moves to “Joined (won)”', 'A new contact is created for Jordan', 'Jordan’s contact is deleted', 'Nothing; the CRM updates itself'], answer: 0,
        why: 'The person (contact) stays; the [[deal]] moves stages. Automations often do this move: “payment received → deal won”.',
      },
      stuck: {
        metaphor: 'A whiteboard of sticky notes in columns. You don’t write a new note when someone progresses; you move their note one column right.',
        worked: ['Jordan already exists as a contact with a deal.', 'Signing up is the “won” stage.', 'Move the deal; don’t create anything new.'],
      },
    },
    { tag: 'how', title: 'Three building blocks of almost every CRM',
      visual: {"type": "sort", "cols": ["Contact", "Deal", "Activity"], "items": [{"text": "Grace Holt, grace.holt@example.com", "col": 0}, {"text": "Bathroom remodel, $4,200, “Proposal sent”", "col": 1}, {"text": "Call logged: “left voicemail”", "col": 2}, {"text": "Jordan Bell, lead source: Instagram", "col": 0}, {"text": "Annual membership, stage “Trial booked”", "col": 1}, {"text": "Email sent: welcome", "col": 2, "why": "History of what happened is an activity."}], "prompt": "Sort each CRM item."},
      body: ["**Contacts** (who), matched by email.", "**Deals:** possible sales with a value, moving through a [[deal-pipeline|pipeline]].", "**Activities:** notes, emails, calls, tasks. Plus custom fields and tags the business adds."] },
    { tag: 'try', title: 'Your turn: which object?',
      check: {
        type: 'multi', q: 'A new plumbing quote request comes in from a known customer. What should the workflow create or update?',
        options: ['Find the existing contact', 'Create a new deal for this quote in “Quote requested”', 'Log the email as an activity on the contact', 'Create a second contact for the same person'], answer: [0, 1, 2],
        why: 'Same person, new possible sale, plus a record of the email. Never a duplicate contact.',
      } },
    { tag: 'biz', title: 'CRM automations clients pay for',
      predict: {"q": "Deals sit in “Proposal sent” for weeks. Which automation fits?", "options": ["No activity for 7 days → task for the owner", "Delete old deals", "Move them to Won", "Email every contact weekly"], "answer": 0, "why": "Flag stale deals. Moving them to Won would misreport the pipeline."},
      body: ["Every lead lands in the CRM within seconds, with its source.", "Stage changes trigger work: “Trial booked → send directions”.", "Stale deals get flagged, and a weekly digest shows what moved and what’s stuck."] },
    { tag: 'warn', title: 'Agree on the stages first',
      predict: {"q": "Two staff members use “Contacted” to mean different things. What happens to stage-based automations?", "options": ["They fire at the wrong times", "Nothing", "They fix the meaning", "The CRM decides"], "answer": 0, "why": "Write one sentence per stage with the client before building."},
      body: [
        'Automations depend on stages meaning the same thing to everyone. Write one sentence per stage with the client before building.',
        'Required fields (email, source) at entry keep the data clean for everything downstream.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Contact vs deal?', options: ['Contact = a person; deal = a possible sale linked to them', 'They’re the same thing', 'Deal = a person; contact = a sale', 'Deals are only for big companies'], answer: 0, why: 'One contact can have many deals over time.' },
    { type: 'order', q: 'Order a typical sales pipeline.', items: ['New lead', 'Contacted', 'Proposal sent', 'Won'], why: 'Left to right: first touch to signed.' },
    { type: 'mc', scenario: 'Deals sit in “Proposal sent” for weeks because nobody follows up.', q: 'Which automation fits?', options: ['If no activity for 7 days in that stage, create a follow-up task or send a reminder', 'Delete old deals', 'Move them to Won automatically', 'Email all contacts weekly'], answer: 0, why: 'Flag stale deals. Moving them to Won would be lying to the client.' },
  ],
  cards: [
    { id: 'objects', front: 'Three CRM building blocks?', back: 'Contacts (who), deals (possible sales in stages), activities (history).' },
    { id: 'move', front: 'A lead progresses. New record or move?', back: 'Move the deal to the next stage; the contact stays.' },
    { id: 'stages', front: 'Before automating a pipeline?', back: 'Agree one sentence per stage with the client.' },
    { id: 'stale', front: 'Stale-deal automation?', back: 'No activity for N days in a stage → task or reminder for the owner.' },
  ],
};
