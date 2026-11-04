// M13 · L05 · Recording and consent laws
export default {
  steps: [
    { tag: 'example', title: 'Recording a voice agent’s calls', visualFirst: true,
      visual: { type: 'compare', cols: ['Caller is in…', 'Tennessee rule', 'Safe practice'], rows: [
        ['Tennessee', 'One-party consent: a party to the call may record', 'Announce recording anyway'],
        ['A state that requires all parties to consent (e.g. California)', 'Tennessee’s rule may not be enough', 'Announce recording at the start'],
        ['Unknown', '—', 'Announce recording at the start'],
      ] },
      body: ['A Knoxville clinic’s AI phone agent records calls for quality and training (fake). Concepts, not legal advice.'],
      check: {
        type: 'mc', q: 'What single practice handles all three rows?',
        options: ['Announce at the start that the call may be recorded', 'Never record anything', 'Only record Tennessee callers', 'Record secretly'], answer: 0,
        why: 'Tennessee is a one-party consent state, but callers can be anywhere, and some states require everyone’s consent. An upfront announcement covers the common cases.',
      },
      stuck: {
        metaphor: '“This call may be recorded for quality purposes”: the line you’ve heard a thousand times exists for exactly this reason.',
        worked: ['Tennessee: one party is enough.', 'Other states: maybe all parties.', 'Announcing it gets consent from everyone.'],
      },
    },
    { tag: 'law', title: 'Consent rules to keep straight (concepts)',
      body: [
        '**Call recording:** federal law and Tennessee generally allow a party to a call to record it (one-party consent). Some states require all parties’ consent. Announce recording.',
        '**Texting:** marketing texts generally need prior written consent under the TCPA; honor STOP right away; register business texting (Module 4).',
        '**Email:** CAN-SPAM for commercial email: honest headers, a postal address, opt-out within 10 business days (Module 9).',
        '**Calls with AI voices:** consent rules for artificial voices apply (lesson 4).',
      ] },
    { tag: 'try', title: 'Your turn: the call script',
      check: {
        type: 'mc', q: 'Best opening for a recorded AI phone agent?', options: ['“Hi, you’ve reached Bright Smile’s virtual assistant. This call may be recorded for quality. How can I help?”', '“Hello?”', '“Hi, this is Sarah.”', '“Press 1 to agree to everything.”'], answer: 0,
        why: 'Discloses AI and recording in one breath, then gets to helping.',
      } },
    { tag: 'key', title: 'Your compliance checklist for client systems',
      body: [
        'AI disclosed? Recording announced? Text consent stored and checked? STOP and unsubscribe honored automatically? Email sender, address, and opt-out in place? Regulated data with suitable vendors?',
        'For anything unclear, the client’s lawyer decides. Your job is to build systems that make compliance the default.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'Tennessee’s call-recording rule?', options: ['One-party consent: a party to the call may record', 'All parties must consent', 'Recording is banned', 'Only businesses may record'], answer: 0, why: 'Tennessee is a one-party consent state.' },
    { type: 'mc', q: 'Why announce recording even in Tennessee?', options: ['Callers may be in all-party-consent states', 'It’s rude not to', 'It improves audio', 'No reason'], answer: 0, why: 'Covers callers anywhere.' },
    { type: 'multi', q: 'Items on a compliance checklist for client systems?', options: ['AI disclosed', 'Recording announced', 'Text consent checked', 'Unsubscribe/STOP honored', 'Fastest possible sending with no limits'], answer: [0, 1, 2, 3], why: 'Speed isn’t a compliance item.' },
  ],
  cards: [
    { id: 'tn', front: 'Tennessee recording rule?', back: 'One-party consent. Still announce recording, since callers may be in all-party states.' },
    { id: 'checklist', front: 'Compliance defaults to build in?', back: 'AI disclosed, recording announced, text consent checked, STOP/unsubscribe honored, email rules met, suitable vendors for regulated data.' },
    { id: 'role', front: 'Your compliance role?', back: 'Build systems where compliance is the default; the client’s lawyer decides unclear cases.' },
  ],
};
