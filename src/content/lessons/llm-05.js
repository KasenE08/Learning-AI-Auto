// M02 · L05 · Classify and extract
export default {
  steps: [
    { tag: 'example', title: 'One messy email, two jobs', visualFirst: true,
      visual: { type: 'record', title: 'What the AI returned', data: { category: 'emergency', address: '14 Elm St', issue: 'Water heater leaking', phone: '555-310-2210' } },
      body: ['Email: “Hi, my water heater in the garage is leaking all over the floor. I am at 14 Elm St. Call me at 555-310-2210. Thanks, Grace”'],
      check: {
        type: 'mc', q: 'Which field was **decided** (picked from a list) rather than **pulled out** of the text?',
        options: ['category', 'address', 'phone', 'issue'], answer: 0,
        why: 'The email never says “emergency”. The model judged it. Address and phone were copied from the text. Those are the two core AI jobs: **classify** and **extract**.',
      },
      stuck: {
        metaphor: 'A mailroom clerk does two things with each letter: decides which department it goes to (classify) and copies the return address onto a form (extract).',
        worked: ['Search the email for each value.', '“14 Elm St” and the phone are in it word for word.', '“emergency” isn’t; it’s a judgment. That’s classification.'],
      },
    },
    { tag: 'how', title: 'Classify vs extract',
      visual: {"type": "sort", "cols": ["Classify", "Extract"], "items": [{"text": "Is this email spam?", "col": 0}, {"text": "What’s the order number?", "col": 1}, {"text": "Which department should handle it?", "col": 0}, {"text": "What address did they give?", "col": 1}, {"text": "Is the review positive, negative or mixed?", "col": 0}, {"text": "Which date do they want?", "col": 1, "why": "Copying a fact out of the text is extraction."}], "prompt": "Which AI job is each question?"},
      body: [
        '[[classification|Classify]]: pick one label from a fixed list. Urgent/routine, intent, sentiment, language, spam or not.',
        '[[extraction|Extract]]: copy specific facts out of messy text into fields. Address, date, order number, product.',
        'Many workflows do both in one AI step: one structured answer with a category field and the extracted fields.',
      ] },
    { tag: 'warn', title: 'The extraction trap: inventing facts',
      body: [
        'Ask for a phone number from an email that has none, and a model may **invent** a plausible one. That’s a [[hallucination]].',
        'Always add: “If a detail is not in the text, leave it empty.” In the sandbox this is a toggle on the extract step.',
        'Then handle the empties downstream (a branch, or a person).',
      ],
      check: {
        type: 'mc', q: 'The email says “No rush, 88 Oak Ave”. You ask for address and phone, without “leave empty if missing”. What’s the risk?',
        options: ['A made-up phone number that looks real', 'The address is skipped', 'The step refuses to run', 'Nothing; models never guess'], answer: 0,
        why: 'Asked to fill a field, a model may fill it with something plausible. Tell it empty is allowed.',
      } },
    { tag: 'try', title: 'Your turn: label it',
      check: {
        type: 'mc', scenario: 'Categories: emergency (active water damage or no water), service (needs a visit, not urgent), quote (wants a price), billing (about an invoice), spam.',
        q: '“Toilet runs all night, can someone come this week? 5 Pine Ct.”', options: ['service', 'emergency', 'quote', 'billing'], answer: 0,
        why: 'It needs a visit, but nothing is flooding. Clear category definitions make the call easy, for the model and for you.',
        wrong: { 1: 'Annoying, but no active water damage. The definitions decide, not the customer’s mood.' },
      } },
    { tag: 'build', title: 'Build it: triage the plumber’s inbox', build: { challenge: 'triage-inbox' },
      body: ['Classify five emails, extract details without inventing any, and send each to the right place. Seven checks.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Pulling a booking date out of a customer’s message is…', options: ['Extraction', 'Classification', 'Summarization', 'Routing'], answer: 0, why: 'Copying a specific fact out of text into a field.' },
    { type: 'multi', q: 'Which are classification tasks?', options: ['Is this review positive, negative, or mixed?', 'What is the order number?', 'Which department should handle this?', 'What language is this in?'], answer: [0, 2, 3], why: 'Picking from a fixed set. The order number is extracted.' },
    { type: 'mc', q: 'Best instruction to prevent invented details?', options: ['“If a detail isn’t in the text, leave it empty.”', '“Be accurate.”', '“Don’t make mistakes.”', '“Use your best guess.”'], answer: 0, why: 'Give the model a legal way to say “not there”. Vague pleas for accuracy don’t.' },
    { type: 'mc', scenario: 'Your classifier puts 30% of emails in “other”.', q: 'What does that most likely tell you?', options: ['Your categories don’t match what customers actually write about', 'The model is too small', 'Customers are confused', 'Classification doesn’t work'], answer: 0,
      why: 'A big “other” pile means a missing category. Read the pile and add the categories it reveals.' },
  ],
  cards: [
    { id: 'classify', front: 'Classify?', back: 'Pick one label from a fixed list (urgency, intent, sentiment).' },
    { id: 'extract', front: 'Extract?', back: 'Copy specific facts out of messy text into fields (address, date, order number).' },
    { id: 'empty', front: 'Stop extraction from inventing facts?', back: 'Tell it: if a detail isn’t in the text, leave it empty. Then handle empties.' },
    { id: 'defs', front: 'What makes classification reliable?', back: 'One-line definitions for every category, plus examples of borderline cases.' },
  ],
};
