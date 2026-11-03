// M01 · L02 · Triggers: what starts a workflow
export default {
  steps: [
    { tag: 'example', title: 'Three workflows, three different starts', visualFirst: true,
      visual: { type: 'compare', cols: ['What happens', 'When it starts'], rows: [
        ['Text the owner about each new job email', 'The moment an email lands'],
        ['Send the team a Monday summary of open jobs', 'Every Monday at 8:00 am'],
        ['Re-send a quote the owner picks from a list', 'When the owner clicks a button'],
      ] },
      body: ['Same plumbing business, three automations. Look at what starts each one.'],
      check: {
        type: 'mc', q: 'Which one starts because something **happened**, not because of a clock or a person?',
        options: ['Text the owner about each new job email', 'The Monday summary', 'Re-sending a quote'], answer: 0,
        why: 'A new email arriving is an event. The Monday summary waits for the clock; the quote waits for a person to click.',
        wrong: { 1: 'That one waits for a time on the clock. Nothing has to happen first.', 2: 'That one waits for a person to press a button.' },
      },
      stuck: {
        metaphor: 'A smoke alarm goes off because something happened (smoke). An alarm clock goes off because of the time. A light switch goes on because you flipped it.',
        worked: ['Ask of each one: is it waiting for an event, a time, or a person?', 'Email arriving = event. Monday 8:00 = time. Button = person.', 'So the job-email text is the event one.'],
      },
    },
    { tag: 'how', title: 'Three kinds of trigger',
      body: [
        '**Event trigger:** something happened in an app. A form was submitted, an email arrived, a payment went through, a row was added.',
        '**Schedule trigger:** the clock says so. Every hour, every weekday at 8:00, the 1st of the month. It starts with no record of its own.',
        '**Manual trigger:** a person starts it on purpose, with a button, a chat command, or a link.',
        'Most client work starts with event triggers, because businesses want things handled **as they happen**.',
      ] },
    { tag: 'try', title: 'Your turn: name the trigger',
      body: ['Rivera Plumbing wants a message to every customer the day after their job is marked “done”.'],
      check: {
        type: 'mc', q: 'What is the most natural trigger?',
        options: ['A job’s status changes to “done”', 'Every day at 9:00 am', 'The owner presses a button for each customer', 'A new email arrives'], answer: 0,
        why: 'The thing that matters is the job being finished. Trigger on that event, then add a one-day **wait** before the message (Module 3 covers waits).',
        wrong: { 1: 'That can work (check yesterday’s finished jobs every morning), but it’s a workaround. The event itself is cleaner.', 2: 'That works, but it isn’t an automation: a person still has to remember.' },
      },
      stuck: {
        metaphor: 'Ask: “What moment, in real life, should start this?” Not when someone remembers, and not a time picked at random.',
        worked: ['The message is about a finished job.', 'So the moment that matters is “job marked done”.', 'Trigger on that event; delay the message by a day inside the workflow.'],
      },
    },
    { tag: 'see', title: 'What a trigger hands over',
      visual: { type: 'compare', cols: ['Trigger', 'Gives the workflow…'], rows: [
        ['New form entry', 'One record: every answer on the form'],
        ['New email', 'Sender, subject, body, attachments'],
        ['Payment received', 'Customer, amount, what they bought'],
        ['Every Monday 8:00', 'Just the time. Steps must go **fetch** the data they need'],
      ] },
      body: [
        'Event triggers bring a [[record]] with them. That record is the raw material for every later step.',
        'Schedule triggers bring nothing but the time, so the next step is usually “get the rows / emails / jobs from the last week”.',
      ] },
    { tag: 'warn', title: 'Pick the trigger closest to the real event',
      body: [
        'If a client says “when a customer books”, find where the booking actually happens (the booking tool), not a later echo of it (the confirmation email in someone’s inbox).',
        'Triggering on an echo adds delay and breaks when the echo’s wording changes.',
        'One workflow, one trigger. If two different events should do the same thing, that’s two workflows (or one workflow called by both, Module 3).',
      ] },
  ],
  quiz: [
    { type: 'multi', q: 'Which of these are **event** triggers?', options: ['A new row is added to a sheet', 'Every Friday at 5:00 pm', 'A payment fails', 'Someone clicks “Run now”', 'A calendar event is cancelled'], answer: [0, 2, 4],
      why: 'Rows, failed payments and cancellations are things that happen in an app. Friday 5:00 is a schedule; “Run now” is manual.' },
    { type: 'mc', scenario: 'A bakery wants a summary of yesterday’s online orders emailed to the owner each morning.', q: 'Which trigger fits?',
      options: ['Schedule: every day at 6:00 am', 'Event: new order', 'Manual: owner clicks a button', 'Event: owner opens their email'], answer: 0,
      why: 'A daily summary is about a period of time, not one order. A schedule trigger, followed by “get yesterday’s orders”.',
      wrong: { 1: 'That runs once per order. You’d get 40 emails instead of one summary.' } },
    { type: 'mc', q: 'A schedule trigger fires. What data does the workflow have?', options: ['Only the time; later steps must fetch data', 'The newest record in every connected app', 'Whatever the last run had', 'The client’s whole database'], answer: 0,
      why: 'A schedule has no record attached. The first action is usually a search or a “get rows” step.' },
    { type: 'mc', q: 'A client says “when a new patient books”. Booking happens in their online scheduler, which then emails the front desk. Where should you trigger?',
      options: ['On the new booking in the scheduler', 'On the email arriving in the front-desk inbox', 'Every 5 minutes, check the inbox', 'Ask the front desk to forward each email'], answer: 0,
      why: 'Trigger on the real event, not its echo. The email is slower, and it breaks if its wording or format changes.' },
  ],
  cards: [
    { id: 'kinds', front: 'The three kinds of trigger?', back: 'Event (something happened), schedule (a time), manual (a person starts it).' },
    { id: 'schedule-data', front: 'What data does a schedule trigger bring?', back: 'Just the time. The next step must fetch the records it needs.' },
    { id: 'echo', front: 'Rule of thumb for choosing a trigger?', back: 'Trigger on the real event, not a later echo of it (like a notification email).' },
    { id: 'one', front: 'Two different events should do the same thing. One workflow or two?', back: 'Two workflows (one trigger each), or both calling one shared sub-workflow.' },
  ],
};
