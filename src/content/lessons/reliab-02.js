// M06 · L02 · Edge cases
export default {
  steps: [
    { tag: 'example', title: 'Spot what will break', visualFirst: true,
      visual: { type: 'record', title: 'One incoming lead (fake)', data: { full_name: '  KIM nguyen  ', email: 'Kim.N@Example.COM', phone: '', goal: 'Get back into lifting after a knee injury 💪🏽', source: '', submitted: '2026-11-01T23:59:58-07:00' } },
      body: ['This lead is valid, but almost every field has something odd about it.'],
      check: {
        type: 'multi', q: 'Which fields need handling before they’re used?',
        options: ['full_name: extra spaces and odd capitals', 'email: mixed case', 'phone: empty', 'source: empty', 'submitted: just before midnight in another time zone'], answer: [0, 1, 2, 3, 4],
        why: 'All of them. Trim and capitalize the name, lowercase the email, branch on empty phone, default the source, and convert the time to the client’s zone before counting it as “today”.',
      },
      stuck: {
        metaphor: 'A suitcase that looks fine from outside: open it and every item needs folding.',
        worked: ['Name: spaces + caps → trim and title-case.', 'Email: lowercase for matching.', 'Phone and source empty → branch or default.', 'Time: different zone, near midnight → convert.'],
      },
    },
    { tag: 'see', title: 'The usual suspects',
      visual: { type: 'compare', cols: ['Edge case', 'Handle it by'], rows: [
        ['Empty or missing field', 'Branch, default value, or ask a person'],
        ['Extra spaces, odd capitals', 'Format step early (trim, case)'],
        ['Duplicates / repeats', 'Upsert by a match key; idempotent steps'],
        ['Wrong format (text in a number field)', 'Validate; route bad records to review'],
        ['Very long text', 'Truncate for chat/SMS; summarize'],
        ['Time zones and midnight', 'Store zones; convert before date logic'],
        ['Empty lists (an order with no items)', 'Check list length before looping'],
      ] } },
    { tag: 'try', title: 'Your turn: pick the handling',
      check: {
        type: 'mc', scenario: 'A form’s “Company” field is optional. A later step sends “Thanks for reaching out from [Company]!”',
        q: 'Best handling?', options: ['Branch: include the company sentence only if it isn’t empty', 'Make Company required', 'Leave it; blanks are fine', 'Ask the AI to guess the company'], answer: 0,
        why: '“from !” looks broken. Branch on empty, or write the sentence so a blank reads naturally. Making it required costs signups.',
      } },
    { tag: 'key', title: 'Handle it once, early',
      body: ['Put cleaning and validation right after the trigger (Module 3, pipeline). Every later step then gets predictable data.'] },
  ],
  quiz: [
    { type: 'mc', q: 'Where should cleaning and validation go?', options: ['Right after the trigger', 'At the end', 'In each step separately', 'Nowhere'], answer: 0, why: 'Once, early, for everything downstream.' },
    { type: 'mc', q: 'A loop gets an order with zero items. What should happen?', options: ['Check the list length first and handle the empty case', 'The loop crashes; fine', 'Send an empty receipt', 'Retry forever'], answer: 0, why: 'Empty lists are an edge case too.' },
    { type: 'multi', q: 'Which are edge cases worth testing?', options: ['Apostrophes in names', 'Emoji in text', 'A submission at 11:59 pm', 'A perfectly typical record'], answer: [0, 1, 2], why: 'Typical records are the main case, not the edge.' },
  ],
  cards: [
    { id: 'suspects', front: 'Common edge cases?', back: 'Empties, messy text, duplicates, wrong formats, long text, time zones, empty lists.' },
    { id: 'once', front: 'Where to handle edge cases?', back: 'Once, early, right after the trigger.' },
    { id: 'optional', front: 'Optional field in a message?', back: 'Branch on empty or write it so a blank reads naturally.' },
  ],
};
