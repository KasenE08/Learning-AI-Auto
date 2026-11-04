// M03 · L01 · Map before you build
export default {
  steps: [
    { tag: 'example', title: 'What the front desk actually does', visualFirst: true,
      visual: { type: 'flow', nodes: [
        { label: 'Booking form email arrives', kind: 'trigger', sub: 'Front desk checks the inbox ~3× a day' },
        { label: 'Read it, judge urgency', kind: 'logic', sub: 'In their head' },
        { label: 'Copy details into the CRM', kind: 'action', sub: '~3 min, typos happen' },
        { label: 'Urgent? Walk over and tell the dentist', kind: 'action', sub: 'Only if the dentist is free' },
        { label: 'Email the patient back', kind: 'action', sub: 'Sometimes forgotten on busy days' },
      ] },
      body: ['Before building anything for Bright Smile, you watched the front desk handle requests and wrote down each step.'],
      check: {
        type: 'mc', q: 'Which step hides a business **risk**, not just lost time?',
        options: ['Email the patient back: “sometimes forgotten”', 'Copy details into the CRM', 'Booking email arrives', 'All are equal'], answer: 0,
        why: 'A forgotten reply loses a patient. Mapping reveals risks like that, and those are often worth more to the client than the minutes saved.',
      },
      stuck: {
        metaphor: 'A plumber walks the whole pipe run before cutting anything. The leak you’re called for is rarely the only problem.',
        worked: ['Read each step’s note.', '“Sometimes forgotten” means a patient may never hear back.', 'That’s lost revenue and reputation, not just time.'],
      },
    },
    { tag: 'how', title: 'A process map in five columns',
      predict: {"q": "Where in a process do delays and mistakes usually hide?", "options": ["Decisions and hand-offs", "The first step", "Steps done in the CRM", "The last step"], "answer": 0, "why": "Waiting for someone to decide or pass work on is where things stall. Mark those on the map."},
      visual: { type: 'compare', cols: ['Step', 'Who', 'Tool', 'Time', 'Problems'], rows: [
        ['Read new request', 'Front desk', 'Inbox', '1 min', 'Only checked 3× a day'],
        ['Copy to CRM', 'Front desk', 'CRM', '3 min', 'Typos, duplicates'],
        ['Reply to patient', 'Front desk', 'Email', '2 min', 'Forgotten when busy'],
      ] },
      body: [
        'For each step write: what happens, who does it, in which tool, how long it takes, and what goes wrong.',
        'Mark the **decisions** (judging urgency) and the **hand-offs** (desk → dentist). That’s where delays and mistakes live.',
        'Map what really happens, not what the manual says. Watch or ask “walk me through the last one you did”.',
      ] },
    { tag: 'try', title: 'Your turn: map it in order',
      body: ['Rivera Plumbing’s owner described their quote process on a call.'],
      check: {
        type: 'order', q: 'Put the steps of their current process in order.',
        items: ['Customer emails asking for a quote', 'Owner reads it at night', 'Owner drives out to look at the job', 'Owner types a quote in a document', 'Owner emails the quote as a PDF', 'Owner follows up if no reply (when they remember)'],
        why: 'The real order, including the weak spot at the end. “When they remember” is a follow-up sequence waiting to be built.',
      } },
    { tag: 'key', title: 'Design on the map, then build',
      visual: {"type": "sort", "cols": ["Automate", "AI-assist", "Keep human", "Remove"], "items": [{"text": "Copy each request into the CRM", "col": 0}, {"text": "Draft a reply to an unusual complaint", "col": 1}, {"text": "Decide if a patient needs the dentist today", "col": 2}, {"text": "Print every email and file it", "col": 3, "why": "A step that adds nothing can simply go."}, {"text": "Send the appointment reminder", "col": 0}, {"text": "Summarize a long voicemail for the owner", "col": 1}], "prompt": "Label each step of a dental office’s process."},
      body: ["Mark each step: **automate**, **AI-assist**, **keep human**, or **remove**.", "Draw the new flow before opening any builder, including what happens when something fails.", "The map becomes part of your proposal (Module 9) and handover docs (Module 11)."] },
  ],
  quiz: [
    { type: 'multi', q: 'What should a process map record for each step?', options: ['Who does it', 'Which tool', 'How long it takes', 'What goes wrong', 'The employee’s salary'], answer: [0, 1, 2, 3], why: 'Salary comes later in ROI math (Module 7), at the role level, not per step.' },
    { type: 'mc', q: 'Where do delays and mistakes usually hide?', options: ['Decisions and hand-offs', 'The trigger', 'The final step', 'Steps done in the CRM'], answer: 0, why: 'Waiting for someone to decide or pass work on is where things stall.' },
    { type: 'mc', scenario: 'The office manager gives you the official process document from 2021.', q: 'What should you do?', options: ['Watch or ask someone to walk through a recent real case', 'Build from the document', 'Ask the AI to guess the process', 'Skip mapping; you’ve seen it before'], answer: 0,
      why: 'Documents describe the ideal. Map what people actually do today.' },
    { type: 'multi', q: 'Which labels can a mapped step get?', options: ['Automate', 'AI-assist', 'Keep human', 'Remove'], answer: [0, 1, 2, 3], why: 'All four. Removing pointless steps is often the quickest win.' },
  ],
  cards: [
    { id: 'columns', front: 'Five columns of a process map?', back: 'Step, who, tool, time, problems.' },
    { id: 'hide', front: 'Where do delays and errors hide?', back: 'Decisions and hand-offs.' },
    { id: 'real', front: 'Map the official process or the real one?', back: 'The real one. Watch or ask for a walkthrough of a recent case.' },
    { id: 'labels', front: 'Four labels for each step?', back: 'Automate, AI-assist, keep human, remove.' },
  ],
};
