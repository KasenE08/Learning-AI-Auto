// M04 · L03 · Calendars and booking
export default {
  steps: [
    { tag: 'example', title: 'Two patients, one chair, same time', visualFirst: true,
      visual: { type: 'exchange', actors: ['Patient A (website)', 'Workflow', 'Calendar'], messages: [
        { from: 0, to: 1, label: '10:00:01 Book Tue 2:30', kind: 'event' },
        { from: 1, to: 2, label: 'Is Tue 2:30 free? → yes', kind: 'request' },
        { from: 1, to: 2, label: '(Patient B asks the same thing) → yes', kind: 'request', note: 'Both checks happen before either booking is written.' },
        { from: 1, to: 2, label: 'Create A’s event, create B’s event', kind: 'request' },
        { from: 2, to: 1, label: 'Tue 2:30 now has two patients', kind: 'error' },
      ] },
      body: ['Step through it. Both checks said “free”.'],
      check: {
        type: 'mc', q: 'What went wrong?',
        options: ['Check-then-book left a gap where both saw the slot free', 'The calendar is broken', 'Patient B cheated', 'Tuesdays are always double-booked'], answer: 0,
        why: 'Two runs at nearly the same time both checked before either wrote. Use booking tools that hold or lock the slot when booking, or re-check right before confirming.',
      },
      stuck: {
        metaphor: 'Two people see the last seat on a bus is empty and both walk toward it. Whoever sits first gets it; the other was told “free” a moment too early.',
        worked: ['A checks: free.', 'B checks: still free (A hasn’t booked yet).', 'Both book. Double booking.'],
      },
    },
    { tag: 'how', title: 'What booking automations handle',
      predict: {"q": "A booking says “2:30”. What else must be stored with it?", "options": ["The time zone", "The weather", "The patient’s age", "Nothing"], "answer": 0, "why": "“2:30” means nothing without a zone, especially around daylight saving."},
      body: ["Availability: working hours, existing events, **buffers**, and lead time.", "[[time-zone|Time zones]]: always store them with times. Reminders at 24 h and 2 h with reschedule links cut no-shows.", "Scheduling tools handle much of this; automation often connects them to the CRM, reminders and the team."] },
    { tag: 'try', title: 'Your turn: which reminder setup?',
      check: {
        type: 'multi', q: 'A clinic loses money to no-shows. Which automations help?',
        options: ['Reminder 24 h before with a reschedule link', 'Reminder 2 h before', 'Text reminders to patients who opted in', 'Emailing every patient the full week’s schedule'], answer: [0, 1, 2],
        why: 'Timely reminders, an easy way to reschedule, and consent for texts. Sharing everyone’s schedule is a privacy problem.',
      } },
    { tag: 'warn', title: 'Calendar gotchas',
      predict: {"q": "A reminder workflow only needs to know when the dentist is busy. What access should it ask for?", "options": ["Free/busy only", "Read and edit every event", "Full admin", "None"], "answer": 0, "why": "Least access: don’t read every event if free/busy is enough."},
      body: [
        'Daylight-saving changes shift “same time every week” events if the zone isn’t stored.',
        'Free/busy vs details: automations often only need free/busy. Don’t request access to read every event (least access, Module 1).',
        'All-day events and tentative holds can block or not block slots depending on settings. Test with them.',
      ] },
    { tag: 'build', title: 'Build it: pencil in every request', build: { challenge: 'book-and-confirm' },
      body: ['A calendar hold per request at the patient’s preferred time, then a confirmation. One bad email must not stop the hold.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Why store a time zone with every time?', options: ['“2:30” is ambiguous across zones and daylight-saving changes', 'Calendars require it for colors', 'It saves tasks', 'Only for international clients'], answer: 0, why: 'Without the zone, times shift and reminders fire at the wrong hour.' },
    { type: 'mc', q: 'What’s a buffer?', options: ['Required gap between appointments', 'A backup calendar', 'A reminder', 'A deleted event'], answer: 0, why: 'Time to clean up, travel, or catch up.' },
    { type: 'mc', scenario: 'A workflow checks a slot is free, then books it. Occasionally two people get the same slot.', q: 'Best fix?', options: ['Book through a tool that holds the slot at booking time, or re-check just before confirming', 'Check twice as often', 'Remove the check', 'Ask patients to call instead'], answer: 0, why: 'Close the gap between check and write.' },
  ],
  cards: [
    { id: 'avail', front: 'What defines availability?', back: 'Working hours, existing events, buffers, and lead time.' },
    { id: 'tz', front: 'Time zone rule?', back: 'Always store times with their zone.' },
    { id: 'noshow', front: 'Cut no-shows?', back: 'Reminders (24 h, 2 h) with a reschedule link; texts only with consent.' },
    { id: 'double', front: 'Cause of double booking in automations?', back: 'A gap between “check free” and “book”. Hold or re-check at booking.' },
  ],
};
