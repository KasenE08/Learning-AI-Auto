// M06 · L03 · Errors, retries, fallbacks
export default {
  steps: [
    { tag: 'example', title: 'Three failures, three right responses', visualFirst: true,
      visual: { type: 'compare', cols: ['Failure', 'Right response'], rows: [
        ['CRM returns 503 (temporarily down)', 'Retry in a minute, then again a bit later'],
        ['Email address is invalid', 'Don’t retry. Alert a person with the patient’s name'],
        ['AI step returns an unexpected label', 'Fallback path: send to human review'],
      ] },
      body: ['Bright Smile’s booking flow hits three different problems in one week.'],
      check: {
        type: 'mc', q: 'Why retry the CRM but not the invalid email?',
        options: ['The CRM problem is temporary; the bad email will fail the same way every time', 'Emails can’t be retried', 'CRMs are more important', 'Retries are free'], answer: 0,
        why: 'Retry **temporary** errors (429, 5xx, timeouts). **Permanent** ones (400, invalid data) need a person or a different path.',
      },
      stuck: {
        metaphor: 'A busy phone line: call back in a minute. A wrong number: calling back won’t help; look up the right number.',
        worked: ['503 = the other app is temporarily unavailable.', 'An invalid email is invalid forever.', 'So retry the first, alert about the second.'],
      },
    },
    { tag: 'how', title: 'Three tools for failure',
      body: [
        '[[retry|Retry]] temporary errors, waiting longer each time (1 min, 5 min, 30 min). Stop after a few tries.',
        '[[fallback|Fallback]]: a plan B path. Primary tool down? Queue it. AI unsure? Human review.',
        '**Alert** a person when it can’t be fixed automatically: who, what failed, why, and what to do.',
        'Never let a run **fail silently**. A silent failure is a promise to a customer broken with nobody aware.',
      ] },
    { tag: 'try', title: 'Your turn: classify the error',
      check: {
        type: 'multi', q: 'Which errors are worth an automatic retry?',
        options: ['429 Too many requests', 'Timeout: no answer from the server', '400: “date” must be a date', '500 Internal server error', '401: connection expired'], answer: [0, 1, 3],
        why: 'Rate limits, timeouts and server errors are usually temporary. A bad field and an expired login need a fix, not a retry.',
      } },
    { tag: 'build', title: 'Build it: no silent failures', build: { challenge: 'error-alerts' },
      body: ['Rebuild Bright Smile’s booking flow so every failure alerts #ops-alerts by name, and the other requests still go through.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Temporary vs permanent error: which do you retry?', options: ['Temporary (429, 5xx, timeouts)', 'Permanent (400, invalid data)', 'Both, forever', 'Neither'], answer: 0, why: 'Retrying a permanent error just repeats it.' },
    { type: 'mc', q: 'Why wait longer between each retry?', options: ['Give the other system time to recover without hammering it', 'To save money', 'Builders require it', 'It doesn’t matter'], answer: 0, why: 'Increasing waits (backoff) help a struggling service recover.' },
    { type: 'multi', q: 'What should a failure alert include?', options: ['Which customer/record', 'Which step failed', 'Why (the error)', 'What a person should do next'], answer: [0, 1, 2, 3], why: 'Enough to act without opening five apps.' },
    { type: 'mc', scenario: 'A workflow’s default is “stop on error”, with no alert.', q: 'What’s the risk?', options: ['Runs fail silently and nobody knows a customer was missed', 'None', 'Too many alerts', 'The workflow deletes itself'], answer: 0, why: 'Silent failures are the worst kind.' },
  ],
  cards: [
    { id: 'retry', front: 'Which errors get retries?', back: 'Temporary ones: 429, 5xx, timeouts. With growing waits, and a limit.' },
    { id: 'fallback', front: 'Fallback?', back: 'A plan B path when the main path can’t work (queue it, human review).' },
    { id: 'silent', front: 'Worst failure?', back: 'A silent one: a broken promise nobody knows about.' },
    { id: 'alert', front: 'Failure alert contents?', back: 'Which record, which step, why, and what to do next.' },
  ],
};
