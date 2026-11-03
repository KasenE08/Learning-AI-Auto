// M05 · L04 · How voice agents work
export default {
  steps: [
    { tag: 'example', title: 'A phone call, step by step', visualFirst: true,
      visual: { type: 'flow', play: true, nodes: [
        { label: 'Caller speaks', kind: 'trigger', app: 'Phone line', data: { audio: '“Hi, I need to book a cleaning next week”' } },
        { label: 'Speech-to-text', kind: 'ai', data: { text: 'Hi, I need to book a cleaning next week' } },
        { label: 'Language model decides the reply (may use tools)', kind: 'ai', data: { tool: 'find_open_slots(next week)', reply: 'Sure! I have Tuesday at 4:30 or Wednesday at 5. Which is better?' } },
        { label: 'Text-to-speech', kind: 'ai', data: { audio: 'spoken reply' } },
        { label: 'Caller hears the reply', kind: 'action' },
      ] },
      body: ['A dental clinic’s after-hours phone agent. Run it.'],
      check: {
        type: 'mc', q: 'If each stage takes a moment, what does the caller experience?',
        options: ['A pause before every reply, made of all the stages added up', 'Nothing; it’s instant', 'Only the language model causes delay', 'The call drops'], answer: 0,
        why: 'Delay stacks: hearing, thinking, speaking, plus the phone network. Keeping that total short is the core voice challenge ([[latency]]).',
      },
      stuck: {
        metaphor: 'Talking through an interpreter: they listen, think, then speak. Each step adds a beat before you hear an answer.',
        worked: ['Speech becomes text.', 'The model thinks (and maybe checks the calendar).', 'Text becomes speech. Every stage adds time.'],
      },
    },
    { tag: 'how', title: 'The voice stack',
      body: [
        '[[stt|Speech-to-text]] turns audio into words. [[tts|Text-to-speech]] turns the reply into a voice.',
        'In between, a language model with tools, same as chat agents.',
        'Some systems use speech-to-speech models that skip the text steps, often to cut delay.',
        'A phone connection (a number, call routing) links it to the real phone network. Voice platforms bundle these pieces; you configure, not code.',
      ] },
    { tag: 'see', title: 'What’s harder on voice than chat',
      visual: { type: 'compare', cols: ['', 'Chat', 'Voice'], rows: [
        ['Delay tolerance', 'Seconds are fine', 'Long pauses feel broken; aim for about a second or less'],
        ['Mishearing', 'Rare (they type)', 'Names, emails, numbers get misheard'],
        ['Interruptions', 'Not a thing', 'Callers talk over the agent'],
        ['Showing options', 'Buttons, lists', 'Must speak them; keep lists to 2–3'],
        ['Rules', 'AI disclosure', 'AI disclosure + call-recording consent rules (Module 13)'],
      ] } },
    { tag: 'try', title: 'Your turn: where does it break?',
      check: {
        type: 'mc', q: 'A caller says their email: “dana dot reyes at example dot com”. The agent books under “danareyes@example.calm”. Which stage failed?',
        options: ['Speech-to-text', 'Text-to-speech', 'The calendar tool', 'The phone line'], answer: 0,
        why: 'The words were misheard. Fix with design: spell it back and confirm (next lesson), or send a text link to type it.',
      } },
  ],
  quiz: [
    { type: 'order', q: 'Order one turn of a voice agent.', items: ['Caller speaks', 'Speech-to-text', 'Model decides (and uses tools)', 'Text-to-speech', 'Caller hears the reply'], why: 'Listen, transcribe, think, speak.' },
    { type: 'mc', q: 'Why does latency matter more on voice than chat?', options: ['Silence on a call feels broken; people talk over it or hang up', 'Voice is more expensive', 'Chat has no latency', 'It doesn’t'], answer: 0, why: 'Conversation has rhythm; chat doesn’t.' },
    { type: 'multi', q: 'Which are voice-specific problems?', options: ['Misheard names and numbers', 'Callers interrupting', 'Reading out long option lists', 'Needing a system prompt'], answer: [0, 1, 2], why: 'Every agent needs a prompt.' },
  ],
  cards: [
    { id: 'stack', front: 'Voice agent stack?', back: 'Phone line → speech-to-text → model with tools → text-to-speech (or speech-to-speech).' },
    { id: 'latency', front: 'Voice latency?', back: 'All stages add up. Long pauses feel broken; aim for about a second or less.' },
    { id: 'mishear', front: 'Biggest voice accuracy risk?', back: 'Misheard names, emails, and numbers. Confirm them.' },
  ],
};
