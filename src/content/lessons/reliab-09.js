// M06 · L09 · Runbooks for client systems
export default {
  steps: [
    { tag: 'example', title: 'The 2 am alert', visualFirst: true,
      visual: { type: 'compare', cols: ['Runbook section', 'Booking workflow · Bright Smile'], rows: [
        ['What it does', 'Form → classify urgency → text front desk or waitlist'],
        ['If “no requests by 2 pm”', 'Submit a test booking. No run? Check the form’s connection; reconnect if expired'],
        ['If texts fail (401)', 'SMS connection expired. Reconnect under the clinic’s account. Re-run failed records'],
        ['If AI labels look wrong', 'Switch to the saved “manual review” version; investigate with the test set'],
        ['Who to tell', 'Office manager: Maria (fake). Text first, then email'],
      ] },
      body: ['An alert fires while you’re asleep. The clinic’s office manager opens the runbook you left.'],
      check: {
        type: 'mc', q: 'What makes this runbook useful to someone who isn’t you?',
        options: ['Each problem has a symptom, a check, and exact steps to fix or contain it', 'It’s long', 'It explains how APIs work', 'It has your phone number only'], answer: 0,
        why: 'A [[runbook]] turns “something’s wrong” into steps anyone trained can follow, without you on the phone.',
      },
      stuck: {
        metaphor: 'The laminated card next to a machine: “If the red light blinks, do this. If it beeps twice, do that.”',
        worked: ['Each row starts with a symptom someone can see.', 'Then what to check.', 'Then what to do, and who to tell.'],
      },
    },
    { tag: 'how', title: 'What goes in a runbook',
      body: [
        '**Overview:** what each workflow does, in one line, and where it lives.',
        '**Accounts and owners:** which systems, whose accounts, who to call.',
        '**Common problems:** symptom → check → fix or contain → who to tell.',
        '**Safe mode:** how to pause or switch to a manual fallback without breaking anything.',
        '**Change log** and the test set location.',
      ] },
    { tag: 'try', title: 'Your turn: write the row',
      check: {
        type: 'mc', q: 'Which runbook row is best for “confirmation emails stopped”?',
        options: ['“Symptom: no confirmations. Check: run history for email step errors. 401 → reconnect email account. 400 → check the To field mapping. Tell: office manager.”', '“Emails may stop sometimes. Call me.”', '“Check the API.”', '“Restart everything.”'], answer: 0,
        why: 'Symptom, check, fix per error type, and who to tell.',
      } },
    { tag: 'biz', title: 'Runbooks make you more valuable, not less',
      body: [
        'A client who can handle the small stuff calls you less at 2 am and trusts you more.',
        'Runbooks are part of delivery and handover (Module 11), and they make retainers easier to justify: you maintain the system and the runbook.',
      ] },
  ],
  quiz: [
    { type: 'order', q: 'Order a runbook problem entry.', items: ['Symptom', 'What to check', 'Fix or contain', 'Who to tell'], why: 'From what someone sees to what they do.' },
    { type: 'multi', q: 'What belongs in a runbook?', options: ['What each workflow does', 'Accounts and owners', 'Common problems with fixes', 'How to pause safely', 'All the client’s passwords'], answer: [0, 1, 2, 3], why: 'Passwords live in a password manager, never in the runbook.' },
    { type: 'mc', q: 'What is “safe mode” in a runbook?', options: ['How to pause or switch to a manual fallback without breaking anything', 'A setting in the AI', 'Deleting the workflow', 'Turning off the computer'], answer: 0, why: 'Contain first, fix second.' },
  ],
  cards: [
    { id: 'runbook', front: 'Runbook?', back: 'A guide that turns symptoms into checks, fixes and contacts, usable without you.' },
    { id: 'entry', front: 'Runbook problem entry?', back: 'Symptom → check → fix or contain → who to tell.' },
    { id: 'safe', front: 'Safe mode?', back: 'How to pause or fall back to manual without breaking anything.' },
  ],
};
