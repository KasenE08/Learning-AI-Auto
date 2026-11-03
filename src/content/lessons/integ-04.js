// M04 · L04 · SMS and messaging
export default {
  steps: [
    { tag: 'example', title: 'Two patients, two answers to “OK to text?”', visualFirst: true,
      visual: { type: 'compare', cols: ['Patient', 'OK to text?', 'Confirmation by'], rows: [
        ['Dana Reyes', 'yes', 'Text'],
        ['Lee Park', 'no', 'Email'],
      ] },
      body: ['Bright Smile’s booking form has a checkbox: “OK to text me about my appointment.”'],
      check: {
        type: 'mc', q: 'Lee has a phone number in the CRM from an old visit. Should the workflow text Lee?',
        options: ['No. Lee said no to texts on this form', 'Yes, the number is in the CRM', 'Yes, but only once', 'Only if it’s urgent'], answer: 0,
        why: 'Having a number isn’t permission. Texting rules hinge on [[sms-consent|consent]], and the business must honor what the person chose.',
      },
      stuck: {
        metaphor: 'Having someone’s home address doesn’t mean they want you to drop by. They tell you how they want to be contacted.',
        worked: ['The form asked about texting.', 'Lee answered no.', 'So email Lee instead.'],
      },
    },
    { tag: 'how', title: 'Texting is more regulated than email',
      body: [
        'In the US, marketing texts generally need the person’s prior written consent, and every texting program must honor opt-out words like **STOP**. Module 13 covers the legal side; treat this as a design rule now.',
        'US carriers also require businesses texting from regular 10-digit numbers through software to register first ([[a2p-10dlc|A2P 10DLC]]). Unregistered texts can be filtered or blocked.',
        'Store consent as data: what they agreed to, when, and how. Automations check it every time.',
      ] },
    { tag: 'try', title: 'Your turn: send or not?',
      check: {
        type: 'multi', q: 'Which texts are fine to automate (with the right setup)?',
        options: ['Appointment reminder to a patient who ticked “OK to text”', 'Promo blast to every phone number in the CRM', 'Reply to someone who just texted the business a question', 'Text to a patient who replied STOP last month'], answer: [0, 2],
        why: 'Consent given, or a reply to their own message. A blast to everyone and anyone who said STOP are off-limits.',
      } },
    { tag: 'see', title: 'Good SMS habits',
      body: [
        'Short, says who it’s from (“Bright Smile: …”), and one clear action.',
        'Daytime only, in the recipient’s time zone.',
        'Two-way: replies should reach a person or the CRM, not vanish.',
        'Other channels (WhatsApp, social messaging) have their own rules and approved-template systems. Check before promising them.',
      ] },
    { tag: 'build', title: 'Build it: text only with consent', build: { challenge: 'sms-consent' },
      body: ['Split on consent, text or email, and alert the team when a confirmation can’t go out.'] },
  ],
  quiz: [
    { type: 'mc', q: 'A number in the CRM means you may text it?', options: ['No; consent decides, not having the number', 'Yes, always', 'Yes, for reminders only', 'Only on weekdays'], answer: 0, why: 'Permission is separate from contact data.' },
    { type: 'mc', q: 'What must every texting program honor?', options: ['Opt-out words like STOP', 'Emoji reactions', 'Read receipts', 'Group chats'], answer: 0, why: 'Opt-outs end texting to that person.' },
    { type: 'mc', q: 'What is A2P 10DLC (US)?', options: ['Registration for businesses texting from 10-digit numbers through software', 'A texting app', 'A type of SMS emoji', 'A data privacy law'], answer: 0, why: 'Carriers can filter or block unregistered business texting.' },
    { type: 'multi', q: 'What should be stored about consent?', options: ['What they agreed to', 'When', 'How (which form/checkbox)', 'Their favorite color'], answer: [0, 1, 2], why: 'Proof you can show if asked.' },
  ],
  cards: [
    { id: 'consent', front: 'Rule before any automated text?', back: 'Check stored consent every time. A phone number isn’t permission.' },
    { id: 'stop', front: 'What do opt-out words like STOP do?', back: 'End texting to that person; must be honored.' },
    { id: '10dlc', front: 'A2P 10DLC?', back: 'US carrier registration for business texting from 10-digit numbers via software.' },
    { id: 'store', front: 'Store what about consent?', back: 'What they agreed to, when, and how.' },
  ],
};
