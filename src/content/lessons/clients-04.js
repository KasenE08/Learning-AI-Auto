// M09 · L04 · Writing the first message
export default {
  steps: [
    { tag: 'example', title: 'Build a message line by line', visualFirst: true,
      visual: { type: 'compare', cols: ['Line', 'Purpose', 'Example (to a fake gym owner)'], rows: [
        ['1. Observation', 'Proves you looked', '“Saw your ad for the 6-week challenge. Nice offer.”'],
        ['2. Problem', 'Names a likely pain', '“Ads like that bring leads at night and on weekends, and most gyms reply the next day.”'],
        ['3. Outcome', 'What changes', '“I set up systems that text every lead back within a minute and book them a trial.”'],
        ['4. Ask', 'Small, easy yes', '“Worth a quick call to see if it fits Ironside?”'],
        ['5. Sign-off', 'Real person', '“– Kasen”'],
      ] },
      body: ['A first message in five short lines.'],
      check: {
        type: 'mc', q: 'Which line would you cut if the message felt long?',
        options: ['None of them, but shorten each; every line has a job', 'The observation', 'The ask', 'The problem'], answer: 0,
        why: 'Each line earns its place. Trim words, not jobs. Without the observation it’s generic; without the ask, nothing happens.',
      },
      stuck: {
        metaphor: 'A short elevator conversation: “Hey, noticed X. Usually that causes Y. I fix Y. Want to talk?”',
        worked: ['Observation: personal.', 'Problem: relevant.', 'Outcome: interesting.', 'Ask: easy. All needed.'],
      },
    },
    { tag: 'try', title: 'Your turn: pick the best ask',
      check: {
        type: 'mc', q: 'Which ask gets the most replies from busy owners?', options: ['“Worth a quick call to see if it fits?”', '“Please book a 60-minute strategy session at this link.”', '“Let me know your thoughts on AI.”', '“When can we meet in person next week?”'], answer: 0,
        why: 'Small, specific, easy to say yes or no to.',
      } },
    { tag: 'see', title: 'Personalize at scale, honestly',
      body: [
        'You can use automation and AI for your own outreach: research a business’s site, draft a first line, then **you** check and edit every message.',
        'Never send AI first lines unchecked. One wrong fact (“loved your Nashville location” when they’re in Memphis) ends the conversation.',
      ] },
    { tag: 'outside', title: 'Write three first messages (practice)',
      body: ['Write messages to fake businesses, then have Claude grade them like a busy owner would.'],
      outside: {
        id: 'first-messages',
        claudeOnly: true,
        title: 'Three cold first messages',
        goal: 'Write a five-line first message to each of the three fake businesses below, for your test niche’s offer.',
        steps: [
          'Read each fake business note below.',
          'Write one message for each: observation, problem, outcome, ask, sign-off. Under 90 words each.',
          'Paste all three under the grading prompt in a new Claude chat.',
        ],
        data: [
          'Whitaker Heating & Cooling, Maryville TN: website says “24/7 service”, but the contact form says replies are “within 1 business day”.',
          'Volunteer Dental, Knoxville TN: Google profile has several recent reviews mentioning “hard to get through on the phone”.',
          'Ironside Fitness, Chattanooga TN: running a “6-week challenge” ad with an online signup form.',
        ],
        prompt: 'You are a busy small-business owner and an experienced sales coach at the same time. Grade three cold first messages a beginner automation consultant wrote to three different (fake) businesses.',
        checklist: [
          'Each message opens with a specific, true observation from that business’s note.',
          'Each names one likely problem in plain words (no AI/LLM/API jargon).',
          'Each states one outcome the owner can picture.',
          'Each ends with one small, easy ask.',
          'Each is under 90 words.',
          'None makes claims or promises the consultant can’t back up.',
        ],
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order the five lines.', items: ['Observation', 'Problem', 'Outcome', 'Ask', 'Sign-off'], why: 'Looked → likely pain → what changes → easy yes → real person.' },
    { type: 'mc', q: 'Using AI to draft first lines is fine if…', options: ['You check and edit every message before sending', 'It sounds confident', 'You send 1,000 at once', 'Never'], answer: 0, why: 'Wrong facts kill replies.' },
    { type: 'mc', q: 'Ideal length for a first message?', options: ['Readable on a phone in about 20 seconds', 'A full page', 'One word', 'As long as needed to explain everything'], answer: 0, why: 'Short earns a reply; detail comes on the call.' },
  ],
  cards: [
    { id: 'five', front: 'Five lines of a first message?', back: 'Observation, problem, outcome, ask, sign-off.' },
    { id: 'ask', front: 'Best ask?', back: 'Small and easy: “worth a quick call to see if it fits?”' },
    { id: 'ai', front: 'AI in your own outreach?', back: 'Draft with it, but check and edit every message.' },
  ],
};
