// Dev only (?demo): sample progress for screenshots. Never saved.
import { newProgress, markDone, recordQuiz, dayKey } from '../core/progress.js';
import { addLessonCards } from '../core/review.js';

export function demoState(now = Date.now()) {
  let p = newProgress(now - 9 * 864e5);
  p = recordQuiz(markDone(p, 'found-01', now - 864e5), 'found-01', 0.75);
  const days = {};
  for (let i = 1; i <= 5; i++) days[dayKey(now - i * 864e5)] = 1;
  p = { ...p, days };
  const { cards } = addLessonCards({}, 'found-01', [{ id: 'trigger' }, { id: 'action' }, { id: 'run' }], now - 2 * 864e5);
  return { progress: p, cards };
}
