// M07 · L09 · When not to automate
export default {
  steps: [
    { tag: 'example', title: 'Three requests you should push back on', visualFirst: true,
      visual: { type: 'compare', cols: ['Request', 'Why to push back'], rows: [
        ['“Automate our process.” (It changes every week.)', 'Nothing stable to automate yet'],
        ['“Have AI decide which patients get seen first.”', 'High-stakes judgment; errors hurt people'],
        ['“Automate the 2 invoices we send a month.”', 'Build + upkeep costs more than it saves'],
      ] },
      body: ['Not every request is a good project.'],
      check: {
        type: 'mc', q: 'For the 2-invoices-a-month request, what’s the honest answer?',
        options: ['It would cost more to build and maintain than it saves; suggest a template instead', 'Build it anyway; it’s money', 'Use a voice agent', 'Charge extra'], answer: 0,
        why: 'Low volume rarely pays back. Saying so builds trust, and trusted advisors get the projects that do pay.',
      },
      stuck: {
        metaphor: 'Buying a dishwasher for a household that eats out every night.',
        worked: ['2 invoices × a few minutes = tiny saving.', 'Build and upkeep cost more.', 'Recommend a simple template.'],
      },
    },
    { tag: 'how', title: 'Red flags',
      visual: {"type": "sort", "cols": ["Go", "Red flag"], "items": [{"text": "40 identical reminders a day", "col": 0}, {"text": "“We’re still figuring out our process.”", "col": 1, "why": "Automating chaos makes faster chaos."}, {"text": "60 web leads a day copied into the CRM", "col": 0}, {"text": "AI deciding who gets a loan", "col": 1}, {"text": "Automating 2 invoices a month", "col": 1}, {"text": "Daily digest of yesterday’s orders", "col": 0}], "prompt": "Go, or red flag?"},
      body: ["Red flags: an unstable process, low volume, high-stakes judgment.", "No data or no API, or a real problem elsewhere (staffing, pricing).", "Green flags: stable, frequent, low-stakes, well-connected work."] },
    { tag: 'try', title: 'Your turn: go or no-go?',
      check: {
        type: 'multi', q: 'Which are reasonable to automate?',
        options: ['Sending 40 appointment reminders a day', 'AI automatically denying insurance claims', 'Copying 60 daily web leads into a CRM', 'A process the owner says “we’re still figuring out”'], answer: [0, 2],
        why: 'High-volume, stable, low-stakes tasks: yes. Automated denials and unsettled processes: no.',
      } },
    { tag: 'biz', title: 'Saying no is a sales skill',
      predict: {"q": "A prospect asks for a build that won’t pay back. Best reply?", "options": ["“I could build it, but it won’t pay back. Here’s what would.”", "Build it anyway", "Ignore them", "Charge double"], "answer": 0, "why": "Redirecting shows you’re on their side, and trusted advisors get the projects that pay."},
      body: ['“I could build that, but it won’t pay back for you. Here’s what would.” turns a bad project into a better one, and shows you’re on their side.'] },
  ],
  quiz: [
    { type: 'multi', q: 'Red flags for an automation project?', options: ['Unstable process', 'Very low volume', 'High-stakes judgment calls', 'High volume of identical tasks'], answer: [0, 1, 2], why: 'High volume of identical tasks is the green flag.' },
    { type: 'mc', scenario: 'A client’s team argues every week about how leads should be handled.', q: 'What do you do?', options: ['Help them agree the process first, then automate', 'Automate the current week’s version', 'Automate all versions', 'Walk away immediately'], answer: 0, why: 'Stabilize, then automate.' },
    { type: 'mc', q: 'For high-stakes decisions, AI should…', options: ['Assist people (summaries, drafts, flags), not decide', 'Decide, to save time', 'Be avoided entirely, even for drafts', 'Decide with no logs'], answer: 0, why: 'Keep judgment with accountable people.' },
  ],
  cards: [
    { id: 'flags', front: 'Five red flags?', back: 'Unstable process, low volume, high-stakes judgment, no data/API, real problem elsewhere.' },
    { id: 'chaos', front: 'Automating an unstable process?', back: 'Makes faster chaos. Agree the process first.' },
    { id: 'no', front: 'Why say no?', back: 'Trust. Redirect to a project that pays back.' },
  ],
};
