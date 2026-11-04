// M13 · L04 · AI disclosure
export default {
  steps: [
    { tag: 'example', title: 'Three openings', visualFirst: true,
      visual: { type: 'compare', cols: ['Opening line', 'OK?'], rows: [
        ['“Hi, this is Bright Smile’s virtual assistant. I can help with appointments.”', 'Clear: says it’s an assistant'],
        ['“Hi, this is Sarah from Bright Smile!” (an AI pretending to be a person)', 'Deceptive'],
        ['An AI voice calls people from a purchased list with a promo, no prior consent', 'Likely unlawful in the US (see below)'],
      ] },
      body: ['A clinic’s AI phone agent (fake). Concepts, not legal advice.'],
      check: {
        type: 'mc', q: 'What’s wrong with “this is Sarah” from an AI?',
        options: ['It misleads people into thinking they’re talking to a human', 'Nothing', 'The name is too common', 'It’s too short'], answer: 0,
        why: 'Pretending to be human erodes trust and can be deceptive under consumer-protection law. Some states have specific disclosure rules for bots.',
      },
      stuck: {
        metaphor: 'A recorded message that pretends to be a live person. People feel tricked when they realize.',
        worked: ['The AI claims a human name.', 'Callers assume a person.', 'That’s misleading.'],
      },
    },
    { tag: 'law', title: 'What to know (US concepts)',
      body: [
        '**Disclose AI** in chat and voice: “virtual assistant”, “AI assistant”. It’s the safe default everywhere, and some states require disclosure in certain situations.',
        '**AI voices on outbound calls:** in February 2024 the FCC ruled that AI-generated voices count as “artificial” voices under the TCPA. Outbound calls using them need the same prior consent as other prerecorded or artificial-voice calls.',
        '**Don’t overclaim:** marketing your AI services with false or exaggerated capability claims can be deceptive under federal consumer-protection law (the FTC has acted on deceptive AI claims).',
      ] },
    { tag: 'try', title: 'Your turn: safe design',
      check: {
        type: 'multi', q: 'Which practices are safe defaults?', options: ['Opening with “I’m an AI assistant for…”', 'Offering a human at any point', 'AI voice cold calls to bought lists', 'Saying the assistant is a staff member'], answer: [0, 1],
        why: 'Disclose and offer a human. AI cold calls without consent and impersonation are off-limits.',
      } },
    { tag: 'biz', title: 'Disclosure doesn’t hurt results',
      body: ['People mostly care whether they got helped quickly. A clear, capable assistant that hands off well (Module 5) beats a fake human every time.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Safe default for AI chat and voice agents?', options: ['Disclose that it’s an AI assistant', 'Use a human name and say nothing', 'Only disclose if asked twice', 'Never mention it'], answer: 0, why: 'Clear and trustworthy.' },
    { type: 'mc', q: 'The FCC’s February 2024 ruling said…', options: ['AI-generated voices are “artificial” voices under the TCPA, so consent rules apply to such calls', 'AI calls are banned entirely', 'AI calls need no consent', 'Only text messages are covered'], answer: 0, why: 'Same rules as other artificial or prerecorded voice calls.' },
    { type: 'mc', q: 'Advertising “our AI never makes mistakes” is…', options: ['A risky, likely deceptive claim', 'Fine', 'Required', 'Best practice'], answer: 0, why: 'Don’t overclaim.' },
  ],
  cards: [
    { id: 'disclose', front: 'AI disclosure default?', back: 'Say it’s an AI assistant and offer a human.' },
    { id: 'fcc', front: 'FCC Feb 2024 ruling?', back: 'AI voices = “artificial” voices under the TCPA; outbound calls need the same prior consent.' },
    { id: 'claims', front: 'Marketing AI services?', back: 'No exaggerated capability claims; they can be deceptive.' },
  ],
};
