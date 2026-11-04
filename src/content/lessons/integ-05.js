// M04 · L05 · Forms: the front door
export default {
  steps: [
    { tag: 'example', title: 'Same form, two designs', visualFirst: true,
      visual: { type: 'compare', cols: ['Field', 'Before', 'After'], rows: [
        ['Service', 'Free text: “need someone for the toilet thing”', 'Dropdown: Repair / Install / Quote / Emergency'],
        ['Phone', 'Optional, any text', 'Required, phone format'],
        ['When', '“asap pls”', 'Dropdown: Today / This week / Flexible'],
        ['Source', '—', 'Hidden: filled from the ad link'],
      ], pick: 1 },
      body: ['Rivera Plumbing’s website form, before and after you redesigned it.'],
      check: {
        type: 'mc', q: 'What does the redesign do for the automation behind it?',
        options: ['Clean, predictable fields: less AI guessing, fewer errors', 'Nothing; automations read anything', 'Makes the form longer for no reason', 'Removes the need for a CRM'], answer: 0,
        why: 'Structure at the source is the cheapest data cleaning there is. A dropdown can route without any AI.',
      },
      stuck: {
        metaphor: 'Sorting mail is easier when the envelopes have printed boxes for each part of the address instead of a blank space.',
        worked: ['Before: free text needs interpreting.', 'After: dropdowns give fixed values.', 'Fixed values route directly and reliably.'],
      },
    },
    { tag: 'how', title: 'Design forms for the workflow',
      predict: {"q": "A later step routes on “service type”. What should that form field be?", "options": ["A dropdown of fixed choices", "A free-text box", "A hidden field", "Optional"], "answer": 0, "why": "Fixed choices route reliably without any AI."},
      body: ["Use choices wherever a later step branches on the answer; validate formats at entry.", "[[hidden-field|Hidden fields]] capture context like the ad source.", "Ask only what you’ll use. Every extra field loses some people."] },
    { tag: 'try', title: 'Your turn: choice or free text?',
      check: {
        type: 'multi', q: 'For a gym trial-booking form, which should be fixed choices?',
        options: ['Which location', 'Preferred time of day', '“Anything we should know?”', 'Main goal (lose weight / build strength / other)'], answer: [0, 1, 3],
        why: 'Anything you route or count on should be a choice. Keep one free-text box for the rest.',
      } },
    { tag: 'warn', title: 'Forms attract junk',
      predict: {"q": "Bots fill a client’s form 50 times a day. Where should junk be stopped?", "options": ["Spam protection on the form + a filter before the CRM", "In the CRM, by hand", "Nowhere", "In the monthly report"], "answer": 0, "why": "Stop junk at the door and before it reaches other systems."},
      body: [
        'Bots fill forms. Use the form tool’s spam protection, and filter obvious junk before it reaches the CRM.',
        'Don’t ask for sensitive data (full medical history, card numbers) in a general form. Fewer sensitive fields = less risk (Module 6).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Why use a dropdown for “service type”?', options: ['A later step can route on exact values without AI', 'Dropdowns look nicer', 'Free text is not allowed', 'It hides the field'], answer: 0, why: 'Fixed values = reliable branching.' },
    { type: 'mc', q: 'What’s a hidden field good for?', options: ['Capturing context like the ad source automatically', 'Hiding mistakes', 'Storing passwords', 'Making the form shorter on phones'], answer: 0, why: 'Context the person doesn’t need to type.' },
    { type: 'mc', scenario: 'A client’s form asks 18 questions and conversions are low.', q: 'Best first move?', options: ['Cut to what the workflow and sales actually use', 'Add more questions', 'Make every field required', 'Add an AI step'], answer: 0, why: 'Each extra field loses people. Ask only what you use.' },
  ],
  cards: [
    { id: 'choices', front: 'Form rule for fields you’ll route on?', back: 'Make them fixed choices (dropdowns, buttons).' },
    { id: 'validate', front: 'Validate at entry?', back: 'Required fields, email/phone formats, sensible dates.' },
    { id: 'hidden', front: 'Hidden field?', back: 'Captures context like the ad source without the person typing it.' },
    { id: 'fewer', front: 'How many questions?', back: 'Only what a later step or person actually uses.' },
  ],
};
