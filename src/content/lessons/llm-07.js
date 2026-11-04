// M02 · L07 · Agents: loops that act
export default {
  steps: [
    { tag: 'example', title: 'One request, several moves', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Goal: “Reschedule my Thursday cleaning to next week”', kind: 'trigger', app: 'Chat', data: { from: 'Omar Khan' } },
        { label: 'Think: find his appointment', kind: 'ai', data: { next: 'find_appointment(patient = Omar Khan)' } },
        { label: 'Tool: find_appointment', kind: 'action', data: { found: 'Thu 4:30 pm, cleaning' } },
        { label: 'Think: look for slots next week', kind: 'ai', data: { next: 'find_open_slots(week = next)' } },
        { label: 'Tool: find_open_slots', kind: 'action', data: { slots: ['Tue 4:30 pm', 'Wed 5:00 pm'] } },
        { label: 'Think: ask which one', kind: 'ai', data: { reply: 'I can move you to Tue 4:30 or Wed 5:00. Which works?' } },
      ] },
      body: ['Run it. Nobody wrote these exact steps in advance.'],
      check: {
        type: 'mc', q: 'What makes this an **agent** rather than a fixed workflow?',
        options: ['The model decides the next step each time, based on what it just learned', 'It uses a calendar', 'It replies in chat', 'It has more than three steps'], answer: 0,
        why: 'A workflow follows steps you drew. An [[agent]] loops: think, pick a tool, look at the result, decide again, until the goal is met.',
      },
      stuck: {
        metaphor: 'A recipe vs a cook. A recipe (workflow) lists every step. A cook (agent) is told “make dinner”, checks the fridge, and decides what to do next based on what’s there.',
        worked: ['Each “Think” step chose what to do next.', 'That choice depended on the previous tool’s result.', 'No fixed path was drawn ahead of time, so it’s an agent.'],
      },
    },
    { tag: 'how', title: 'The agent loop',
      predict: {"q": "What stops an agent that’s confused and keeps trying?", "options": ["A limit you set: max steps, time, or cost", "Nothing", "The customer", "It always stops itself"], "answer": 0, "why": "Agents loop until the goal, a hand-off, or a limit. Always set the limit."},
      body: [
        'An agent = a model + tools + a goal + a loop. Each turn: decide, call a tool, read the result, repeat.',
        'It stops when it meets the goal, needs a human, or hits a limit you set (max steps, max time, max cost).',
        'Agents shine when the path varies a lot from case to case. When the path is the same every time, a plain workflow is cheaper, faster and easier to test.',
      ] },
    { tag: 'see', title: 'Workflow or agent?',
      visual: {"type": "sort", "cols": ["Workflow", "Agent"], "items": [{"text": "Every new invoice → add a row → email the accountant", "col": 0}, {"text": "A website chat that answers questions and books calls", "col": 1}, {"text": "Monday: email last week’s sales total", "col": 0}, {"text": "Research a lead across several sources and summarize", "col": 1}, {"text": "New order → copy to the shipping app", "col": 0, "why": "Same path every time: a workflow is cheaper and easier to test."}], "prompt": "Sort each job."},
      
      body: ["Same path every time → workflow. Path varies a lot → agent.", "Most paying client work is workflows with a few AI steps inside."] },
    { tag: 'try', title: 'Your turn: pick the design',
      check: {
        type: 'multi', q: 'Which jobs need an **agent** rather than a workflow?',
        options: ['Every new invoice → add a row → email the accountant', 'A website chat that answers questions, checks orders, and books calls depending on what’s asked', 'Monday: email last week’s sales total', 'Research a lead’s company across several sources and write a summary'], answer: [1, 3],
        why: 'Chat and open-ended research vary every time. Invoices and the Monday report follow the same path every time.',
      } },
    { tag: 'warn', title: 'Guardrails every agent needs',
      predict: {"q": "An agent has a refund tool, a CRM tool, and an email tool, but its job is only answering FAQs. What’s wrong?", "options": ["It has tools its job doesn’t need", "Nothing", "It needs more tools", "It should be a chatbot instead"], "answer": 0, "why": "Narrow tools are a guardrail: only what this agent’s job requires."},
      body: ["**Limits** (max steps and spend) and **narrow tools** (only what the job needs).", "**Hand-off:** a clear point where it stops and passes to a person.", "**Logs:** every tool call recorded, so you can see what it did."] },
  ],
  quiz: [
    { type: 'mc', q: 'What defines an agent?', options: ['A model in a loop that picks its own next step using tools', 'Any workflow with an AI step', 'A chatbot with a name', 'A workflow with many steps'], answer: 0, why: 'The loop and run-time decisions make it an agent.' },
    { type: 'mc', scenario: 'A client wants every new order copied to their shipping app. The path never changes.', q: 'What do you build?', options: ['A plain workflow', 'An agent that decides how to copy each order', 'A multi-agent team', 'A chatbot'], answer: 0,
      why: 'Same path every time = workflow. Cheaper, faster, easier to test.' },
    { type: 'multi', q: 'Which are agent guardrails?', options: ['Max steps per run', 'Only the tools the job needs', 'A hand-off to a person', 'Bigger model, no limits'], answer: [0, 1, 2], why: 'Limits, narrow tools and hand-offs keep agents safe. No limits is the opposite.' },
    { type: 'order', q: 'Order one turn of the agent loop.', items: ['Decide what to do next', 'Call a tool', 'Read the result', 'Check: goal met?'], why: 'Decide, act, observe, check, and repeat if not done.' },
  ],
  cards: [
    { id: 'agent', front: 'Agent?', back: 'A model with tools and a goal, looping: decide → act → observe → repeat.' },
    { id: 'when', front: 'Agent or workflow?', back: 'Same path every time → workflow. Path varies a lot → agent.' },
    { id: 'guard', front: 'Four agent guardrails?', back: 'Limits (steps/spend), narrow tools, a human hand-off, logs.' },
    { id: 'default', front: 'What do most paying jobs look like?', back: 'Workflows with a few AI steps inside, not free-roaming agents.' },
  ],
};
