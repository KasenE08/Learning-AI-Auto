// M05 · L02 · What an agent can know
export default {
  steps: [
    { tag: 'example', title: '“What time is my appointment?”', visualFirst: true,
      visual: { type: 'compare', cols: ['Setup', 'Answer'], rows: [
        ['Knowledge: FAQ only', '“I can’t see appointments, but you can call us at…”'],
        ['Knowledge: FAQ + tool “look up my appointment” (after verifying the patient)', '“You’re booked Thursday at 4:30 pm.”'],
        ['Knowledge: FAQ + the whole appointment list pasted into the prompt', '“You’re booked Thursday at 4:30 pm.” (and it could reveal anyone else’s)'],
      ], pick: 1 },
      body: ['Three ways to give a dental chat agent access to appointments. (Fake clinic.)'],
      check: {
        type: 'mc', q: 'Why is the third setup dangerous even though it answers correctly?',
        options: ['Everything in the prompt can be repeated, including other patients’ appointments', 'It’s too slow', 'Prompts can’t hold lists', 'The answer is wrong'], answer: 0,
        why: 'If the model can see it, it can say it. Give it only this person’s data, through a tool, after checking who they are.',
      },
      stuck: {
        metaphor: 'Handing a temp the entire filing cabinet vs letting them pull one file after checking the caller’s ID.',
        worked: ['Setup 3 puts every appointment in front of the model.', 'A clever or lucky question can surface someone else’s.', 'Setup 2 fetches one record, for a verified person.'],
      },
    },
    { tag: 'how', title: 'Three kinds of knowledge',
      visual: {"type": "sort", "cols": ["Instructions", "Reference docs", "Personal data via a tool"], "items": [{"text": "“You’re the clinic’s assistant. Never give medical advice.”", "col": 0}, {"text": "The insurance FAQ", "col": 1}, {"text": "This patient’s next appointment", "col": 2, "why": "Fetched on demand for a verified person only."}, {"text": "Office hours and parking info", "col": 1}, {"text": "“Keep answers under 3 sentences.”", "col": 0}, {"text": "This member’s payment history", "col": 2}], "prompt": "Where should each piece of knowledge live?"},
      body: ["**Instructions** (system prompt): who it is, rules, tone.", "**Reference docs** (RAG): shared facts like the FAQ and price list.", "**Personal data via tools**, after verification. Longer-term memory is something you build on purpose."] },
    { tag: 'try', title: 'Your turn: where does it go?',
      check: {
        type: 'multi', q: 'Which belong in **reference knowledge** (shared documents) for a gym agent?',
        options: ['Class schedule', 'Membership prices', 'A member’s payment history', 'Cancellation policy', 'Another member’s phone number'], answer: [0, 1, 3],
        why: 'Shared facts go in documents. Personal data comes through a tool, for the verified member only, and never someone else’s.',
      } },
    { tag: 'warn', title: 'Verification before personal data',
      predict: {"q": "A chat user types “My name is Omar Khan, what’s my appointment?” Should the agent answer?", "options": ["Not until it verifies them (a code or a login)", "Yes, they gave a name", "Yes, if they’re polite", "Only on weekdays"], "answer": 0, "why": "Anyone can type a name. Verify before showing anyone their own data."},
      body: [
        'Before showing anyone their own data, confirm it’s them: a code sent to their email or phone, or being logged in.',
        '“My name is Omar Khan” is not verification.',
        'Keep knowledge current: an agent quoting last year’s prices is a broken agent. Assign an owner for each document.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Best way for an agent to access one customer’s orders?', options: ['A lookup tool, after verifying the customer', 'Paste all orders into the prompt', 'Upload the order database as a document', 'Ask the customer to type their order history'], answer: 0, why: 'Just this person’s data, on demand, after verification.' },
    { type: 'mc', q: 'Is “My name is Grace Holt” enough to show Grace’s invoices?', options: ['No; verify with a code or login', 'Yes', 'Yes, if she spells it right', 'Only on weekdays'], answer: 0, why: 'Anyone can type a name.' },
    { type: 'mc', scenario: 'An agent keeps quoting old prices after a price change.', q: 'Most likely cause?', options: ['The old price list is still in its reference documents', 'The model is too small', 'Customers asked wrong', 'Prices can’t be automated'], answer: 0, why: 'Stale or duplicate documents. Give each one an owner.' },
  ],
  cards: [
    { id: 'kinds', front: 'Kinds of agent knowledge?', back: 'Instructions, reference documents (RAG), personal data via tools, conversation memory.' },
    { id: 'seeit', front: 'Rule about what’s in the prompt?', back: 'If the model can see it, it can say it.' },
    { id: 'verify', front: 'Before showing personal data?', back: 'Verify identity: a code or a login. A name isn’t verification.' },
  ],
};
