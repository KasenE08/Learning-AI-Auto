// M02 · L03 · Examples in prompts
export default {
  steps: [
    { tag: 'example', title: 'Rules alone vs rules + examples', visualFirst: true,
      visual: { type: 'compare', cols: ['', 'Rules only', 'Rules + 3 examples'], rows: [
        ['Prompt', '“Label each review positive, negative, or mixed.”', 'Same rule, plus: “Great cake, late delivery → mixed”, “Loved it → positive”, “Never again → negative”'],
        ['“Tasty but arrived crushed”', 'positive', 'mixed'],
        ['“ok I guess”', 'positive', 'mixed'],
      ], pick: 1 },
      body: ['A bakery labels customer reviews. Compare the two prompts on tricky reviews.'],
      check: {
        type: 'mc', q: 'Why did the examples fix “Tasty but arrived crushed”?',
        options: ['An example showed that praise + a complaint counts as mixed', 'Examples make the model smarter in general', 'The rule was deleted', 'Luck'], answer: 0,
        why: 'The word “mixed” is vague. The example “Great cake, late delivery → mixed” showed exactly where the line is.',
      },
      stuck: {
        metaphor: 'Training a new hire to sort mail: a list of rules helps, but showing them three sorted envelopes, including a tricky one, helps more.',
        worked: ['The rule didn’t define “mixed”.', 'An example showed a review with praise and a complaint labeled mixed.', 'The model copied that pattern.'],
      },
    },
    { tag: 'how', title: 'Few-shot prompting',
      body: [
        'Putting worked examples in the prompt is called [[few-shot|few-shot]] prompting. Zero examples is “zero-shot”.',
        'Examples teach **format** and **judgment** at the same time: what the answer looks like and where the edges are.',
        'Pick examples that cover the edges: one clear case per label, plus the borderline cases you’ve seen go wrong.',
      ] },
    { tag: 'try', title: 'Your turn: pick the most useful example',
      body: ['A dental clinic’s classifier keeps marking “my filling fell out but it doesn’t hurt” as **urgent**. The clinic says that’s routine.'],
      check: {
        type: 'mc', q: 'Which example should you add to the prompt?',
        options: ['“Filling fell out, no pain → routine”', '“Severe pain and swelling → urgent”', '“Cleaning please → routine”', '“Hi → routine”'], answer: 0,
        why: 'Add an example of the exact case that’s failing. The others are easy cases the model already gets right.',
      } },
    { tag: 'warn', title: 'Examples can backfire',
      body: [
        'Models copy examples closely. If all three examples are about cakes, a review of bread may get confused.',
        'If every example is short, answers get short. Vary length and topic on purpose.',
        'Never put real customer data in examples you share or store in templates. Write fake ones.',
      ] },
    { tag: 'biz', title: 'Your edge as a consultant',
      body: [
        'Collecting 20–50 real past examples from the client (anonymized) and testing against them is what makes your AI steps reliable.',
        'Keep them as a **test set**. When the model or prompt changes, re-run the set and compare (Module 6).',
      ] },
  ],
  quiz: [
    { type: 'mc', q: 'What is few-shot prompting?', options: ['Including worked examples in the prompt', 'Calling the model a few times', 'Using a smaller model', 'Short prompts only'], answer: 0, why: 'A few examples (“shots”) of input → correct output.' },
    { type: 'mc', q: 'Which examples help most?', options: ['The borderline cases that were going wrong', 'The most obvious cases', 'Any random emails', 'Examples about other businesses'], answer: 0, why: 'Examples should show where the line is, especially where the model was guessing wrong.' },
    { type: 'mc', scenario: 'All four examples in a reply prompt are one sentence long. Customers start getting very short replies.', q: 'Why?', options: ['The model copies the examples’ length', 'The model is out of tokens', 'Customers asked for short replies', 'The system prompt was deleted'], answer: 0,
      why: 'Examples teach format as well as judgment. Vary them, or state the length rule.' },
  ],
  cards: [
    { id: 'fewshot', front: 'Few-shot prompting?', back: 'Putting a few worked examples (input → correct output) in the prompt.' },
    { id: 'edges', front: 'Which examples to include?', back: 'One clear case per label plus the borderline cases that go wrong.' },
    { id: 'copy', front: 'Risk of examples?', back: 'The model copies them closely (length, topic). Vary them on purpose.' },
    { id: 'testset', front: 'What is a test set?', back: 'Saved real-looking examples with correct answers, re-run whenever the prompt or model changes.' },
  ],
};
