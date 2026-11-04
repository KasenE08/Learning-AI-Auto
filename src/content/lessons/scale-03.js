// M12 · L03 · Reusable builds
export default {
  steps: [
    { tag: 'example', title: 'A template and a config sheet', visualFirst: true,
      visual: { type: 'record', title: 'Config for client #8 (fake)', data: {
        business_name: 'Smoky Ridge Heating & Air', owner_phone: '555-0100 (fake)', service_area: ['Knoxville', 'Maryville', 'Oak Ridge'],
        hours: 'Mon–Fri 8–5', instant_reply: 'Thanks for reaching out to Smoky Ridge! We’ll call you within the hour during business hours.',
        emergency_rule: 'no heat or no AC with a vulnerable person in the home', follow_up_days: [1, 3], report_day: '1st of the month',
      } },
      body: ['The template workflow reads everything client-specific from one config record.'],
      check: {
        type: 'mc', q: 'A new HVAC client signs. What do you change?',
        options: ['Fill in a new config record; the template stays the same', 'Rebuild every step', 'Copy the old client’s workflow and edit 30 steps by hand', 'Nothing'], answer: 0,
        why: 'Separating **logic** (template) from **details** (config) is what makes builds reusable and safe to update.',
      },
      stuck: {
        metaphor: 'A form letter with blanks: you fill in the blanks for each person instead of rewriting the letter.',
        worked: ['The workflow logic is shared.', 'Names, numbers, wording live in config.', 'New client = new config.'],
      },
    },
    { tag: 'how', title: 'Making builds reusable',
      body: [
        '**Template workflows** per package, kept in your own library.',
        '**Config per client:** a sheet or table the workflow reads (no hard-coded names or numbers).',
        '**Shared sub-workflows** for common pieces: alerts, logging, formatting (Module 3).',
        '**A standard test set** per template, plus each client’s own edge cases.',
        '**Naming conventions:** `[Client] – [Package] – [Workflow] – v3`.',
      ] },
    { tag: 'try', title: 'Your turn: fix the template',
      check: {
        type: 'mc', q: 'You find a bug in the shared alert sub-workflow. What now?', options: ['Fix it once, re-run test sets for every client using it, roll out with the safe-change routine', 'Fix it only for the client who noticed', 'Leave it', 'Rebuild all clients from scratch'], answer: 0,
        why: 'Shared pieces mean shared fixes, and shared risk. Test everywhere it’s used (Module 6).',
      } },
    { tag: 'warn', title: 'Who owns the template?',
      body: ['Your agreement should say the client owns their configured system, while you keep the right to reuse your general templates and know-how with other clients (Module 13).'] },
  ],
  quiz: [
    { type: 'mc', q: 'Template vs config?', options: ['Template = shared logic; config = client details', 'They’re the same', 'Config = logic', 'Template = client data'], answer: 0, why: 'Separate what changes from what doesn’t.' },
    { type: 'mc', q: 'Why avoid hard-coding a client’s phone number in steps?', options: ['Reuse and updates break; config keeps it in one place', 'Numbers are secret', 'It’s slower', 'It doesn’t matter'], answer: 0, why: 'One source of truth.' },
    { type: 'mc', q: 'After fixing a shared sub-workflow…', options: ['Re-run test sets for every client using it', 'Test one client', 'Skip tests', 'Email all clients'], answer: 0, why: 'Shared risk.' },
  ],
  cards: [
    { id: 'split', front: 'Reusable build rule?', back: 'Template (shared logic) + config (client details).' },
    { id: 'library', front: 'Your build library has?', back: 'Template workflows, shared sub-workflows, test sets, naming conventions.' },
    { id: 'ip', front: 'Template ownership?', back: 'Client owns their configured system; you keep reusable templates and know-how (in the agreement).' },
  ],
};
