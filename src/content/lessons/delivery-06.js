// M11 · L06 · Support and response times
export default {
  steps: [
    { tag: 'example', title: 'Saturday, 8 pm: “It’s broken!!”', visualFirst: true,
      visual: { type: 'compare', cols: ['Issue type (example terms)', 'You respond within', 'Examples'], rows: [
        ['Urgent', '2 hours, 7 days', 'Leads or calls not being handled at all'],
        ['Normal', '1 business day', 'One step failing with a workaround, a wrong report number'],
        ['Request', '3 business days', 'Wording change, a new field'],
      ] },
      body: ['Your support terms with Smoky Ridge (fake). A text arrives: “The texts aren’t going out!!”'],
      check: {
        type: 'mc', q: 'Texts to new leads aren’t going out at all. Which category?',
        options: ['Urgent: the core promise is broken', 'Normal', 'Request', 'Not your problem on weekends'], answer: 0,
        why: 'Defined categories turn panic into a plan. A broken core flow is urgent, so you respond within 2 hours, even on Saturday, because that’s what you agreed.',
      },
      stuck: {
        metaphor: 'An emergency room triages: chest pain now, a sprained ankle soon, a prescription refill tomorrow.',
        worked: ['Is the core promise (leads answered) broken? Yes.', 'That’s the urgent category.', 'Respond within the agreed time.'],
      },
    },
    { tag: 'how', title: 'Support terms',
      predict: {"q": "Ideally, who notices a broken workflow first?", "options": ["Your monitoring", "The client", "The client’s customers", "Nobody"], "answer": 0, "why": "Monitoring should usually tell you before the client does."},
      body: ["Define categories with examples and response times (response ≠ fix).", "One support channel, so nothing gets lost in texts and DMs.", "Price weekend coverage into the retainer or exclude it. Don’t promise what you can’t staff."] },
    { tag: 'try', title: 'Your turn: the first reply',
      check: {
        type: 'mc', q: 'Best first reply to an urgent issue?', options: ['“Got it. I’m on it now. First update by 8:45 pm. Leads in the meantime are saved; nothing is lost.”', '“Will look Monday.”', '“It works on my end.”', '“This is probably your fault.”'], answer: 0,
        why: 'Acknowledge fast, say when they’ll hear next, and reassure with facts.',
      } },
    { tag: 'outside', title: 'Role-play: an upset client after a failure',
      body: ['Claude plays a frustrated owner after the system failed over a weekend. Practice calm, honest support.'],
      outside: {
        id: 'support-roleplay',
        title: 'Support call: weekend failure',
        goal: 'Calm the situation, explain honestly what happened, say what you’re doing so it doesn’t happen again, and keep the relationship.',
        steps: [
          'Read your notes below. Open a new Claude chat, paste the role-play prompt, and play the consultant.',
          'Listen first. Don’t blame the client or the tools.',
          'Explain in plain words, give a fix and a prevention step, and offer something fair if you broke a promise.',
          'Type END, copy the transcript, and grade it in a separate chat.',
        ],
        data: [
          'What happened (your notes): the texting connection expired Friday night; 9 weekend leads got no instant text.',
          'Your monitoring alert went to an email you didn’t check until Monday. All 9 leads were saved in the CRM.',
          'Your agreement says urgent issues get a response within 2 hours, 7 days a week.',
        ],
        roleplay: {
          persona: 'Dale Whitaker, owner of Whitaker Heating & Cooling (fake), Maryville, Tennessee. Normally friendly; today annoyed.',
          business: 'Residential HVAC; your lead-response system has been live for 6 weeks and was working well.',
          situation: 'It’s Monday morning. Brenda told Dale that weekend leads didn’t get the usual instant text. Dale called you.',
          hidden: [
            'Two of the weekend leads called a competitor; Dale knows because one is a neighbor.',
            'Dale mostly wants to know it won’t happen again and that someone is actually watching.',
            'He would accept a credit on this month’s retainer as fair; he doesn’t want to cancel if he trusts the fix.',
            'He wasn’t aware his texting provider’s login needed re-approval every few months.',
          ],
          objections: ['“What am I paying you every month for if nobody’s watching?”', '“How do I know this won’t happen again?”'],
          style: 'Start irritated. Calm down if the consultant takes responsibility and is specific. Get more annoyed at excuses or jargon.',
          opening: 'Start with: “Yeah, it’s Dale. So I hear the texts didn’t go out all weekend?”',
        },
        prompt: 'You are an experienced account manager grading a beginner consultant’s support call with an upset client after a service failure. Be fair but strict.',
        checklist: [
          'The consultant listened and acknowledged the impact before explaining.',
          'They took responsibility for the missed alert instead of blaming the client or the tools.',
          'They explained what happened in plain words, without jargon.',
          'They confirmed the leads were saved and offered to help follow up with them now.',
          'They described a specific prevention step (for example alerts to their phone, connection-expiry checks).',
          'They offered something fair for the missed response-time promise (for example a credit).',
          'They agreed a follow-up to confirm the fix.',
          'They stayed calm and professional throughout.',
        ],
      } },
  ],
  quiz: [
    { type: 'multi', q: 'Good support terms include…', options: ['Categories with examples', 'Response times per category', 'One support channel', 'Unlimited 24/7 promises you can’t staff'], answer: [0, 1, 2], why: 'Only promise what you can deliver.' },
    { type: 'mc', q: 'Response time vs fix time?', options: ['Different: respond fast, fix as quickly as possible, keep updating', 'The same thing', 'Only fix time matters', 'Only response time matters'], answer: 0, why: 'Acknowledge and update while you fix.' },
    { type: 'mc', q: 'Ideally, who finds problems first?', options: ['Your monitoring, before the client notices', 'The client', 'The client’s customers', 'Nobody'], answer: 0, why: 'Module 6 monitoring.' },
  ],
  cards: [
    { id: 'tiers', front: 'Support categories?', back: 'Urgent (core broken), normal (workaround exists), request (changes), each with response times.' },
    { id: 'reply', front: 'First reply to an urgent issue?', back: 'Acknowledge, say when the next update comes, reassure with facts.' },
    { id: 'staff', front: 'Weekend coverage?', back: 'Price it into the retainer or exclude it clearly.' },
  ],
};
