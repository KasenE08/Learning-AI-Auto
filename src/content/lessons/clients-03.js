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
      visual: {"type": "sort", "cols": ["Do", "Don’t"], "items": [{"text": "Open with a true, specific observation about their business", "col": 0}, {"text": "“I hope this email finds you well.”", "col": 1}, {"text": "Ask for a quick call", "col": 0}, {"text": "Ask for a 60-minute demo", "col": 1}, {"text": "Follow up twice, then stop", "col": 0}, {"text": "Send 400 words explaining AI", "col": 1, "why": "Readable on a phone in 20 seconds, or it gets skipped."}], "prompt": "Sort each cold-outreach habit."},
      body: ["**Target narrowly** and **personalize the first line** with something true.", "**One problem, one small ask**, short enough to read in 20 seconds.", "**Follow up** 2–3 times, spaced out, then stop."] },
    { tag: 'law', title: 'The rules (US)',
      predict: {"q": "You cold-email a business owner. Which is required under CAN-SPAM?", "options": ["A valid physical postal address and an opt-out", "A logo", "A phone number", "Nothing; B2B is exempt"], "answer": 0, "why": "CAN-SPAM covers B2B commercial email too: honest sender and subject, an address, an opt-out honored within 10 business days."},
      body: ["**Cold email:** CAN-SPAM applies (honest headers and subject, postal address, opt-out within 10 business days).", "**Cold calls** to businesses are generally allowed (Do Not Call mainly protects consumers); be respectful of personal cells.", "**Cold texts:** avoid (consent rules). And follow each platform’s rules."] },
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
