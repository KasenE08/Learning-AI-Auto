// M09 · L03 · Cold outreach principles
export default {
  steps: [
    { tag: 'example', title: 'Which cold email gets a reply?', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Email A', 'Email B'], rows: [
        ['Subject', '“AI Automation Solutions for Your Business!!!”', '“after-hours calls at Whitaker Heating”'],
        ['First line', '“I’m reaching out because I specialize in cutting-edge AI…”', '“Called your line at 7 pm Tuesday and got voicemail, which is normal, but in a heat wave those callers book whoever answers.”'],
        ['Ask', '“Can we schedule a 60-minute demo?”', '“Worth a 10-minute call to see if it’s costing you jobs? If not, no worries.”'],
      ], pick: 1 },
      body: ['Two cold emails to the same (fake) HVAC owner.'],
      check: {
        type: 'mc', q: 'What makes Email B work?',
        options: ['It’s about them, specific, short, with a small ask', 'It’s longer', 'It mentions AI', 'It has a better font'], answer: 0,
        why: 'Specific observation, their problem, their words, and an easy yes. Email A could be sent to anyone, and reads that way.',
      },
      stuck: {
        metaphor: 'A handwritten note that mentions something real about you vs a flyer under the windshield wiper.',
        worked: ['B’s subject mentions their company and a real issue.', 'The first line shows you looked.', 'The ask is small: 10 minutes, easy to decline.'],
      },
    },
    { tag: 'how', title: 'Principles',
      body: [
        '**Target narrowly:** your niche, in a region or group you can describe.',
        '**Personalize the first line:** something true and specific about their business.',
        '**One problem, one small ask:** a short call or a yes/no question.',
        '**Short:** readable on a phone in 20 seconds.',
        '**Follow up** 2–3 times, spaced out, then stop (lesson 12).',
      ] },
    { tag: 'law', title: 'The rules (US)',
      body: [
        '**Cold email:** the federal CAN-SPAM Act covers commercial email, including business-to-business. Use honest sender info and subject lines, include a valid physical postal address, offer a clear way to opt out, and honor opt-outs within 10 business days.',
        '**Cold calls to businesses** are generally allowed; the national Do Not Call list mainly protects consumers’ personal numbers. Many small-business owners use personal cell phones, so be careful and respectful.',
        '**Cold texts:** avoid them. Marketing texts generally need prior consent (Module 4, Module 13).',
        'Plus each platform’s rules (LinkedIn, Facebook groups). Spammy behavior gets accounts restricted.',
      ] },
    { tag: 'try', title: 'Your turn: compliant or not?',
      check: {
        type: 'multi', q: 'Which cold-email practices are fine?',
        options: ['Including your business mailing address', 'A subject line pretending to be a reply (“Re: our call”) when there was no call', 'Honoring “please remove me” right away', 'Hiding who the email is from'], answer: [0, 2],
        why: 'Fake “Re:” subjects and hidden senders are deceptive. Address and fast opt-out handling are required.',
      } },
  ],
  quiz: [
    { type: 'multi', q: 'CAN-SPAM requires…', options: ['Honest sender and subject', 'A valid physical postal address', 'A way to opt out', 'Honoring opt-outs within 10 business days', 'A logo'], answer: [0, 1, 2, 3], why: 'No logo needed.' },
    { type: 'mc', q: 'Best first line in a cold email?', options: ['A true, specific observation about their business', '“I hope this email finds you well.”', '“I’m an AI expert.”', '“Are you the right person?”'], answer: 0, why: 'Specific and about them.' },
    { type: 'mc', q: 'Should you cold-text business owners?', options: ['Avoid it; marketing texts generally need prior consent', 'Yes, texts get read', 'Only on weekends', 'Only with emojis'], answer: 0, why: 'Consent rules make cold texting risky.' },
  ],
  cards: [
    { id: 'principles', front: 'Cold outreach principles?', back: 'Target narrowly, personalize line one, one problem + small ask, short, follow up 2–3 times then stop.' },
    { id: 'canspam', front: 'CAN-SPAM basics?', back: 'Honest sender/subject, physical address, opt-out, honored within 10 business days. Applies to B2B too.' },
    { id: 'texts', front: 'Cold texts?', back: 'Avoid: marketing texts generally need prior consent.' },
  ],
};
