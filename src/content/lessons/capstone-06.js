// CAP · L06 · Build it for real (free tool)
export default {
  steps: [
    { tag: 'example', title: 'Same design, free-tool edition', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Form: owner, email, pet, reason, “Is this an emergency?” (yes/no), OK to text?', kind: 'trigger' },
        { label: 'Log a row in “Requests” sheet', kind: 'action' },
        { label: 'Split on “Is this an emergency?”', kind: 'logic', branches: [
          { label: 'Yes', nodes: [{ label: 'Email YOU as the “on-call vet”', kind: 'action' }] },
          { label: 'No', nodes: [{ label: 'Create a calendar hold', kind: 'action' }] },
        ] },
        { label: 'Confirmation email to the requester (your own test addresses)', kind: 'action' },
      ] },
      body: ['The real build swaps the paid parts for free ones: a dropdown instead of an AI step, emails instead of texts.'],
      check: {
        type: 'mc', q: 'Why use a form dropdown instead of an AI classifier in the real build?',
        options: ['It keeps the build free (no paid AI key) and still teaches routing', 'Dropdowns are smarter', 'AI is banned', 'It’s faster to type'], answer: 0,
        why: 'Your rule: no paid APIs. The pattern (classify → route) is the same; the classifier is a form field.',
      },
      stuck: {
        metaphor: 'Practicing a recipe with store-bought dough: the technique is the same; one ingredient is simplified.',
        worked: ['AI steps often need a paid key.', 'A dropdown gives a fixed category for free.', 'Routing works exactly the same.'],
      },
    },
    { tag: 'how', title: 'Check it before you build',
      predict: { q: 'Your free tool’s routes don’t merge back. Where does the confirmation email go?', options: ['Inside each route (or in a shared sub-workflow)', 'After the routes', 'Before the form', 'Nowhere'], answer: 0, why: 'Same lesson as the sandbox: each path finishes its own work.' },
      body: ['Map the five steps on paper first, matching each to your tool’s blocks.', 'Add an error alert to the confirmation email (Module 6).', 'Test with your own email addresses only.'] },
    { tag: 'outside', title: 'Build it for real',
      body: ['This counts toward your capstone: save at least 6 of 8 checklist items.'],
      outside: {
        id: 'cap-real',
        title: 'Riverbend request system (free-tool edition)',
        goal: 'Build the core of Riverbend’s system in a free no-code tool and prove it works on fake requests.',
        steps: [
          'Create a form: owner name, email, pet name, reason, “Is this an emergency?” (Yes / No), “OK to text?” (Yes / No).',
          'Create a sheet “Requests” with matching columns plus Received at.',
          'Workflow trigger: new form response. First action: add a row to “Requests”.',
          'Split on “Is this an emergency?”: Yes → email yourself “URGENT: [pet] — [reason]”. No → create a calendar event titled “Hold: [pet]”.',
          'In each path, send a confirmation email to the requester’s email (use your own addresses for testing).',
          'Add an error alert so a failed confirmation emails you with the requester’s name.',
          'Submit the four fake requests below, including the broken email.',
        ],
        data: [
          'Maria · your-address+maria · Biscuit · ate chocolate, shaking · Emergency: Yes',
          'Tom · your-address+tom · Luna · annual vaccines · Emergency: No',
          'Greg · greg.ward@example (broken on purpose) · Max · nail trim · Emergency: No',
          'Jen · your-address+jen · Mochi · not eating since morning · Emergency: Yes',
        ],
        prompt: 'You are grading a beginner’s capstone build in a free no-code automation tool for a fake veterinary clinic. I will share screenshots of the workflow, the sheet, the calendar, received emails and the run history. Be strict.',
        checklist: [
          'The trigger is a new form response.',
          'Every submission adds a row to the Requests sheet with the received time.',
          'The workflow splits on the emergency field.',
          'Emergency requests send the URGENT email with the pet name and reason.',
          'Non-emergency requests create a calendar hold titled with the pet’s name.',
          'Each valid request gets a confirmation email in its own path.',
          'The broken email triggers an error alert naming the requester.',
          'Only the builder’s own addresses received emails.',
        ],
      } },
    { tag: 'try', title: 'Your turn: read the run history',
      check: {
        type: 'mc', q: 'Greg’s run shows an error at the confirmation step, and you got an alert. Is that a failure of your build?',
        options: ['No: that’s the build working (bad data caught and reported)', 'Yes, rebuild everything', 'Yes, delete Greg', 'Only if it happens twice'], answer: 0,
        why: 'Errors on bad data are expected. Silent errors are failures; alerted ones are good design.',
      } },
  ],
  quiz: [
    { type: 'mc', q: 'What replaced the paid parts in the real build?', options: ['A dropdown (for AI) and emails (for texts)', 'Nothing', 'A paid API key', 'A voice agent'], answer: 0, why: 'Same patterns, free parts.' },
    { type: 'mc', q: 'Who should receive emails during testing?', options: ['Only you', 'Real pet owners', 'The real clinic', 'Random addresses'], answer: 0, why: 'Never real people in tests.' },
    { type: 'mc', q: 'How many checklist items must you save for the capstone to count?', options: ['At least 6 of 8', 'All 8', '1', 'None'], answer: 0, why: 'Six or more shows the core works.' },
  ],
  cards: [
    { id: 'free', front: 'Keeping the real build free?', back: 'Dropdown instead of AI, email instead of SMS, your own test addresses.' },
    { id: 'alerted', front: 'An alerted error on bad data?', back: 'Good design, not a failure. Silent errors are failures.' },
    { id: 'count', front: 'Real build requirement?', back: 'At least 6 of 8 checklist items confirmed by Claude.' },
  ],
};
