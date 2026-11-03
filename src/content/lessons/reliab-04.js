// M06 · L04 · Monitoring and alerts
export default {
  steps: [
    { tag: 'example', title: 'The workflow that was “working”', visualFirst: true,
      visual: { type: 'compare', cols: ['Week', 'Leads in', 'Errors'], rows: [
        ['Oct 6', '102', '0'], ['Oct 13', '97', '0'], ['Oct 20', '0', '0'], ['Oct 27', '0', '0'],
      ] },
      body: ['Ironside’s lead workflow showed zero errors for a month. The client only noticed when sales asked where the leads went.'],
      check: {
        type: 'mc', q: 'Why didn’t error alerts catch this?',
        options: ['Nothing failed. The trigger stopped firing (e.g. the ad form’s webhook changed), so there was nothing to error on', 'The alerts were broken', 'Leads stopped coming in naturally', 'Errors are hidden on weekends'], answer: 0,
        why: 'Error alerts catch runs that fail. They can’t catch runs that never happen. Watch for **silence** too.',
      },
      stuck: {
        metaphor: 'A smoke alarm with a dead battery: no alarms doesn’t mean no fire.',
        worked: ['Error count: zero.', 'Lead count: dropped to zero.', 'The workflow wasn’t failing; it wasn’t running.'],
      },
    },
    { tag: 'how', title: 'What to monitor',
      body: [
        '**Failures:** any run that errors (alerts, from lesson 3).',
        '**Silence:** no runs in a period when there should be some (“no leads in 24 hours on a weekday”). A [[heartbeat]] check.',
        '**Volume shifts:** runs or a category spiking or dropping (half the emails suddenly “spam”).',
        '**Connections:** expired logins and revoked keys (401s) before they pile up.',
        '**Cost:** task usage and AI spend against the plan.',
      ] },
    { tag: 'try', title: 'Your turn: set the heartbeat',
      check: {
        type: 'mc', scenario: 'A dental clinic gets 5–15 booking requests every weekday, rarely any on Sundays.',
        q: 'Which silence alert makes sense?', options: ['No requests by 2 pm on a weekday → alert', 'No requests in any 10-minute window → alert', 'No requests on Sunday → alert', 'Never alert on silence'], answer: 0,
        why: 'Base it on normal patterns. A 10-minute rule cries wolf; a Sunday rule always fires.',
      } },
    { tag: 'outside', title: 'Optional: add a failure alert to a real build',
      body: ['Go back to your first real automation (Module 1, lesson 1) or the daily digest (Module 3, lesson 8).'],
      outside: {
        id: 'failure-alert',
        title: 'Make a real workflow tell you when it fails',
        goal: 'Add error handling to an existing automation so a failure sends you an alert with what failed and why, then prove it by breaking it on purpose.',
        steps: [
          'Open an automation you built earlier.',
          'Find your tool’s error handling for the step most likely to fail (often called an error handler, error path, or failure notification).',
          'Make a failure send an email (or chat message) to **you only**, including the workflow name, the step, and the error message.',
          'Break it on purpose: for example, rename a spreadsheet column the workflow writes to, then submit a test entry.',
          'Confirm you got the alert. Then undo the break and confirm a normal run succeeds.',
        ],
        prompt: 'You are grading a beginner’s error handling in a no-code automation. I’ll share screenshots of the error-handling setup, the alert I received when I broke the workflow on purpose, and a successful run after fixing it.',
        checklist: [
          'Error handling is attached to a step that can realistically fail.',
          'The alert goes only to the builder.',
          'The alert names the workflow and the failed step.',
          'The alert includes the actual error message or reason.',
          'There is evidence of a deliberate failure that triggered the alert.',
          'There is evidence of a successful run after the fix.',
        ],
      } },
  ],
  quiz: [
    { type: 'mc', q: 'What does a heartbeat (silence) check catch?', options: ['A workflow that stopped running at all', 'A failed step', 'A slow AI model', 'Spam'], answer: 0, why: 'No runs = no errors = no error alerts. Watch for silence.' },
    { type: 'multi', q: 'What should you monitor on a client system?', options: ['Failures', 'Silence', 'Volume spikes and drops', 'Expiring connections', 'Spend vs plan'], answer: [0, 1, 2, 3, 4], why: 'All five.' },
    { type: 'mc', scenario: 'Overnight, 60% of a plumber’s emails are classified as spam. Usually it’s 10%.', q: 'What does this suggest?', options: ['Something changed (inputs, prompt, or model); investigate before trusting the routing', 'Spam is up; fine', 'The client is unpopular', 'Nothing'], answer: 0, why: 'Volume shifts in a category are an early warning.' },
  ],
  cards: [
    { id: 'five', front: 'Five things to monitor?', back: 'Failures, silence, volume shifts, connections, cost.' },
    { id: 'heartbeat', front: 'Heartbeat check?', back: 'Alert when there are no runs in a period where there normally are.' },
    { id: 'pattern', front: 'How to set silence thresholds?', back: 'From normal patterns (weekday/weekend, hours), so they don’t cry wolf.' },
  ],
};
