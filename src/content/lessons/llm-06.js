// M02 · L06 · Tool use
export default {
  steps: [
    { tag: 'example', title: '“Do you have anything Thursday afternoon?”', visualFirst: true,
      visual: { type: 'exchange', actors: ['Patient', 'AI model', 'Calendar tool'], messages: [
        { from: 0, to: 1, label: 'Anything Thursday afternoon?', kind: 'request' },
        { from: 1, to: 2, label: 'Use tool: find_open_slots(day = Thu, after = 12:00)', kind: 'request', body: { tool: 'find_open_slots', day: 'Thursday', after: '12:00' }, note: 'The model doesn’t know the calendar. It asks for a tool to be run.' },
        { from: 2, to: 1, label: 'Result: 2:30 pm, 4:00 pm', kind: 'response', body: { slots: ['2:30 pm', '4:00 pm'] } },
        { from: 1, to: 0, label: 'We have 2:30 or 4:00. Which works?', kind: 'response' },
      ] },
      body: ['A booking assistant on a dental website. Step through it.'],
      check: {
        type: 'mc', q: 'Who actually looked at the calendar?',
        options: ['The calendar tool, run by the app when the model asked', 'The model, from memory', 'The patient', 'Nobody; the times were guessed'], answer: 0,
        why: 'The model only **asked** for a tool to be run, with specific inputs. The app ran it and handed the real result back.',
      },
      stuck: {
        metaphor: 'A receptionist on the phone says “one moment, let me check the schedule”, looks it up, then answers. The model is the voice; the tool is the schedule book.',
        worked: ['Message 2: the model requests find_open_slots.', 'Message 3: the tool returns real slots.', 'Message 4: the model answers using those slots.'],
      },
    },
    { tag: 'how', title: 'How tool use works',
      body: [
        'You give the model a list of [[tool-use|tools]]: each has a name, a one-line description, and the inputs it takes.',
        'When a tool would help, the model replies with a **tool request** (name + inputs) instead of an answer.',
        'Your app or builder runs the tool (searches the CRM, checks the calendar), then sends the result back. The model continues.',
        'The model never touches the systems directly. Everything goes through tools you chose to give it.',
      ] },
    { tag: 'try', title: 'Your turn: which tool?',
      body: ['Tools available: **lookup_order(order_id)**, **create_ticket(summary, priority)**, **send_refund(order_id, amount)**.'],
      check: {
        type: 'mc', q: 'Customer: “Where’s my order A-1042?” Which tool should the model call first?',
        options: ['lookup_order(order_id = A-1042)', 'send_refund(order_id = A-1042, amount = 86.50)', 'create_ticket(…)', 'None; answer from memory'], answer: 0,
        why: 'The question is about status. Look it up first. Refunds were never asked for.',
        wrong: { 1: 'Nobody asked for a refund. This is why risky tools need guardrails (next).' },
      } },
    { tag: 'warn', title: 'Tools are power: give the least you need',
      body: [
        'A model with a “send_refund” tool can send refunds, including ones it was talked into (lesson 9).',
        'Prefer **read** tools. For **write** tools that cost money or can’t be undone, require a person to approve (Module 3, human approval).',
        'Put limits inside the tool, not just in the prompt: “refunds over $50 need approval” enforced by the workflow.',
      ] },
    { tag: 'key', title: 'In no-code terms',
      body: [
        'Many builders let an AI step use other workflows or actions as tools. You set a name, a description, and which fields the model fills in.',
        'Write tool descriptions like instructions to a new hire: when to use it and when not to.',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'In tool use, what does the model produce when it wants data?', options: ['A tool request: the tool’s name and its inputs', 'The data itself, from memory', 'A direct database query it runs itself', 'An email to the admin'], answer: 0, why: 'It asks; your app runs the tool and returns the result.' },
    { type: 'order', q: 'Put one tool call in order.', items: ['User asks a question', 'Model requests a tool with inputs', 'App runs the tool', 'App sends the result back to the model', 'Model answers the user'], why: 'Ask → request → run → return → answer.' },
    { type: 'mc', scenario: 'A chatbot has a tool that issues refunds of any size, with only a prompt rule “refund at most $50”.', q: 'What’s the safer design?', options: ['Enforce the $50 cap inside the workflow, and route bigger refunds to a person', 'Make the prompt rule bold', 'Remove the prompt rule', 'Give it a bigger model'], answer: 0,
      why: 'Prompts can be ignored or manipulated. Hard limits belong in the tool or workflow.' },
    { type: 'multi', q: 'Which are “read” tools?', options: ['lookup_order', 'check_open_slots', 'cancel_subscription', 'search_help_articles'], answer: [0, 1, 3], why: 'Cancelling changes something; the rest only read.' },
  ],
  cards: [
    { id: 'tooluse', front: 'Tool use?', back: 'The model asks for a named tool with inputs; your app runs it and returns the result.' },
    { id: 'direct', front: 'Does the model touch your systems directly?', back: 'No. Only through the tools you give it.' },
    { id: 'limits', front: 'Where do hard limits on risky tools belong?', back: 'In the tool or workflow (and human approval), not only in the prompt.' },
    { id: 'desc', front: 'What makes a good tool description?', back: 'When to use it, when not to, and what each input means.' },
  ],
};
