// M05 · L05 · Designing for voice
export default {
  steps: [
    { tag: 'example', title: 'Written for eyes vs written for ears', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Reads fine', 'Sounds right'], rows: [
        ['Options', '“Available: Tue 4:30, Wed 5:00, Thu 9:15, Thu 2:00, Fri 11:30.”', '“I have Tuesday afternoon or Thursday morning. Which suits you?”'],
        ['Confirming', '“Booked: 10/28 16:30 CLN Reyes, D.”', '“So that’s Tuesday at 4:30 for a cleaning, under Dana Reyes. Is that right?”'],
        ['Email', '“Your email is dana.reyes@example.com.”', '“Let me spell that back: d-a-n-a dot r-e-y-e-s at example dot com?”'],
      ], pick: 1 },
      body: ['Same booking agent, two script styles.'],
      check: {
        type: 'mc', q: 'Why offer two choices instead of five?',
        options: ['Callers can’t scan a spoken list; they forget the first options by the end', 'Five is rude', 'Text-to-speech can’t say five', 'Fewer slots means more bookings'], answer: 0,
        why: 'Listeners hold only a couple of items in mind. Narrow first, then offer more if needed.',
      },
      stuck: {
        metaphor: 'A waiter reciting twelve specials vs asking “meat or fish?” first.',
        worked: ['On a screen, you scan a list.', 'On a call, you have to remember it.', 'So give two or three options at a time.'],
      },
    },
    { tag: 'how', title: 'Voice design rules',
      body: [
        '**Short turns:** one idea per reply, one question at a time.',
        '**Confirm what matters:** read back names, dates, numbers. Spell emails; offer to text a link instead.',
        '**Handle interruptions** ([[barge-in]]): when the caller talks, stop speaking and listen.',
        '**Handle silence:** a gentle prompt after a few seconds, then a polite exit or transfer.',
        '**Always offer a way out:** “or I can connect you to the team” and voicemail after hours.',
      ] },
    { tag: 'try', title: 'Your turn: fix the line',
      check: {
        type: 'mc', q: 'Which is the best opening line for an after-hours clinic phone agent?',
        options: ['“Hi, this is Bright Smile’s virtual assistant. I can book or change appointments. How can I help?”', '“Welcome to Bright Smile Dental, founded in 1998, where our mission is…”', '“State your request.”', '“Press 1 for appointments, 2 for billing, 3…”'], answer: 0,
        why: 'Says it’s an assistant, what it can do, and invites the caller in. Short and clear.',
      } },
    { tag: 'warn', title: 'Test with real voices',
      body: [
        'Test with accents, background noise, speakerphone, fast talkers, and people who say “um, actually, wait”.',
        'Listen to recordings of test calls (with consent) and fix the script where people stumble.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'How many options should a voice agent offer at once?', options: ['Two or three', 'As many as are available', 'One, always', 'Ten'], answer: 0, why: 'Spoken lists must fit in memory.' },
    { type: 'mc', q: 'What is barge-in?', options: ['The caller talking over the agent, which should make it stop and listen', 'A billing feature', 'Transferring a call', 'A silent pause'], answer: 0, why: 'Handle interruptions like a person would.' },
    { type: 'multi', q: 'Which details should a voice agent read back?', options: ['Appointment date and time', 'Caller’s name', 'Email address', 'The weather'], answer: [0, 1, 2], why: 'Confirm what can be misheard and matters.' },
    { type: 'mc', scenario: 'Callers keep hanging up during the agent’s 25-second welcome message.', q: 'Fix?', options: ['Cut it to one short line and ask how to help', 'Make it louder', 'Add music', 'Repeat it twice'], answer: 0, why: 'Short turns.' },
  ],
  cards: [
    { id: 'rules', front: 'Five voice design rules?', back: 'Short turns, confirm key details, handle interruptions, handle silence, always offer a way out.' },
    { id: 'options', front: 'Spoken options?', back: 'Two or three at a time.' },
    { id: 'email', front: 'Collecting an email by voice?', back: 'Spell it back, or text a link so they can type it.' },
  ],
};
