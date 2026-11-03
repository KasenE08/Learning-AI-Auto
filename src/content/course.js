// The whole course map. Lesson ids are `${unitId}-${nn}` (e.g. "found-03").
// `stage` is the build stage that delivers a unit's lessons; until a lesson file exists it shows as "coming".
// `path` is the recommended order. Every lesson stays open anytime (free exploration).

export const tracks = [
  { id: 'tech', code: 'TECH', title: 'Technical (no-code)', blurb: 'How automations and AI agents work, and how to build them reliably without writing code.' },
  { id: 'biz', code: 'BIZ', title: 'Business', blurb: 'Find the problem, design the offer, land clients, price, deliver, and scale solo.' },
  { id: 'legal', code: 'LAW', title: 'Legal & ethics', blurb: 'Contracts, liability, privacy, AI disclosure, and consent. Concepts, not legal advice.' },
  { id: 'cap', code: 'CAP', title: 'Capstone', blurb: 'One simulated client from first contact to retainer, end to end.' },
  { id: 'exam', code: 'EXAM', title: 'Launch readiness', blurb: 'A final exam across every track that tells you if you are ready to launch.' },
];

const L = (title, min = 5) => ({ title, min });

export const units = [
  // ---------------- Technical ----------------
  { id: 'found', n: 1, track: 'tech', title: 'Automation foundations', stage: 'b', lessons: [
    L('What an automation is', 5), L('Triggers: what starts a workflow'), L('Actions and steps', 4), L('Data flow between steps', 6),
    L('Data shapes: records, fields, lists', 6), L('APIs: apps asking apps', 6), L('Webhooks vs polling'), L('Logins, keys, and permissions'),
    L('Filters and branches'), L('Task limits and quotas', 4),
  ] },
  { id: 'llm', n: 2, track: 'tech', title: 'LLM fundamentals', stage: 'b', lessons: [
    L('What an LLM actually does'), L('Prompt anatomy', 6), L('Examples in prompts'), L('Structured output', 6),
    L('Classify and extract'), L('Tool use', 6), L('Agents: loops that act', 6), L('RAG: answers from their documents', 7),
    L('Failure modes', 6), L('Cost, speed, and model size'),
  ] },
  { id: 'patterns', n: 3, track: 'tech', title: 'Workflow design patterns', stage: 'b', lessons: [
    L('Map before you build'), L('The linear pipeline', 4), L('Routers: branch by category'), L('Lists, loops, and fan-out'),
    L('Human approval steps'), L('Delays and follow-up sequences'), L('Sync without duplicates', 6), L('Scheduled digests', 4),
    L('Reusable sub-workflows'),
  ] },
  { id: 'integ', n: 4, track: 'tech', title: 'Integrations', stage: 'b', lessons: [
    L('CRMs: contacts, deals, pipelines', 6), L('Email: send, parse, deliver', 6), L('Calendars and booking'), L('SMS and messaging'),
    L('Forms: the front door', 4), L('Spreadsheets as a database'), L('No-code databases'), L('Documents: generate and store'),
    L('Payments as triggers'), L('Team chat alerts', 4),
  ] },
  { id: 'agents', n: 5, track: 'tech', title: 'AI agents: chat, voice, multi-agent', stage: 'b', lessons: [
    L('Chat agents: scope and guardrails', 6), L('What an agent can know'), L('Handoff to a human'), L('How voice agents work', 6),
    L('Designing for voice', 6), L('Booking and qualifying by voice'), L('Multi-agent systems', 6), L('Orchestrator and workers', 6),
    L('Testing agents with scripted conversations', 6),
  ] },
  { id: 'reliab', n: 6, track: 'tech', title: 'Reliability, security, privacy', stage: 'b', lessons: [
    L('Testing with sample data'), L('Edge cases'), L('Errors, retries, fallbacks', 6), L('Monitoring and alerts'),
    L('Logs that answer questions', 4), L('Security: secrets and access', 6), L('Data privacy in practice', 6), L('Safe changes and versions'),
    L('Runbooks for client systems'),
  ] },
  // ---------------- Business ----------------
  { id: 'opps', n: 7, track: 'biz', title: 'Finding automation opportunities', stage: 'c', lessons: [
    L('Where time leaks'), L('Process mapping', 6), L('Measure the current process'), L('ROI math', 6),
    L('Beyond hours saved'), L('Score and rank opportunities'), L('Patterns: local service businesses', 6), L('Patterns: online, property, professional firms', 6),
    L('When not to automate', 4),
  ] },
  { id: 'offer', n: 8, track: 'biz', title: 'Offer design & niche', stage: 'c', lessons: [
    L('Generalist vs niche'), L('Picking a niche: a scoring method', 6), L('Problem-first offers'), L('Packaging a flagship offer', 6),
    L('Guarantees and risk reversal'), L('Proof before clients'), L('Your positioning statement', 4), L('Pressure-test the offer'),
  ] },
  { id: 'clients', n: 9, track: 'biz', title: 'Getting clients', stage: 'c', lessons: [
    L('The pipeline: stranger to client'), L('Warm outreach'), L('Cold outreach principles', 6), L('Writing the first message', 6),
    L('Content and inbound'), L('Referrals and partners'), L('Discovery call structure', 6), L('Questions that find pain', 6),
    L('Proposals that close', 6), L('Handling objections', 6), L('Closing'), L('Follow-up', 4),
  ] },
  { id: 'pricing', n: 10, track: 'biz', title: 'Pricing', stage: 'c', lessons: [
    L('Cost, value, and the gap'), L('Setup fees'), L('Retainers', 6), L('Value-based pricing', 6),
    L('Usage-based pricing and pass-through costs', 6), L('Tiers and packages'), L('Scope creep and raising prices'), L('Pricing drills', 6),
  ] },
  { id: 'delivery', n: 11, track: 'biz', title: 'Delivery & retention', stage: 'c', lessons: [
    L('Onboarding', 6), L('Scope and change requests'), L('Build cycles and check-ins'), L('Documentation clients use'),
    L('Launch and training'), L('Support and response times'), L('Reporting results'), L('Upsells and expansion'),
    L('Case studies and testimonials'), L('Renewals and offboarding', 4),
  ] },
  { id: 'scale', n: 12, track: 'biz', title: 'Scaling solo', stage: 'c', lessons: [
    L('From custom to productized', 6), L('SOPs'), L('Reusable builds'), L('Your own ops stack'),
    L('AI agents instead of hires', 6), L('Coordinating agents with checkpoints', 6), L('Where agent ops breaks'), L('Capacity: how many clients'),
    L('Finances: cash, taxes, tools', 6), L('Profit and saying no'),
  ] },
  // ---------------- Legal / ethics ----------------
  { id: 'legal', n: 13, track: 'legal', title: 'Contracts, liability, privacy, consent', stage: 'c', lessons: [
    L('Contract clauses that matter', 6), L('Liability and limits'), L('Privacy laws as concepts', 6), L('AI disclosure', 4),
    L('Recording and consent laws'),
  ] },
  // ---------------- Capstone ----------------
  { id: 'capstone', n: 14, track: 'cap', title: 'Capstone: one client, end to end', stage: 'd', lessons: [
    L('Meet the client', 5), L('Diagnose their process', 7), L('Find and price the opportunity', 6), L('Write the proposal', 7),
    L('Build it in the sandbox', 7), L('Build it for real (free tool)', 7), L('Deliver and hand over', 6), L('Retain and expand', 6),
  ] },
  // ---------------- Exam ----------------
  { id: 'exam', n: 15, track: 'exam', title: 'Launch-readiness exam', stage: 'd', lessons: [L('Final exam', 7)] },
];

export const path = units.map((u) => u.id);
