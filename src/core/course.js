// Read-only views over the course map: ids, lookups, the recommended path.
import { tracks, units as rawUnits, path } from '../content/course.js';
import { hasContent } from './lessons.js';

export const pad2 = (n) => String(n).padStart(2, '0');
export const lessonId = (unitId, n) => `${unitId}-${pad2(n)}`;

export const units = rawUnits.map((u, ui) => ({
  ...u,
  trackCode: tracks.find((t) => t.id === u.track).code,
  lessons: u.lessons.map((l, i) => ({ ...l, id: lessonId(u.id, i + 1), n: i + 1, unit: u.id, track: u.track, stage: l.stage ?? u.stage })),
  order: ui,
}));

export { tracks, path };

const unitMap = new Map(units.map((u) => [u.id, u]));
const lessonMap = new Map(units.flatMap((u) => u.lessons.map((l) => [l.id, l])));

export const unitById = (id) => unitMap.get(id) || null;
export const lessonById = (id) => lessonMap.get(id) || null;
export const trackById = (id) => tracks.find((t) => t.id === id) || null;
export const allLessons = () => [...lessonMap.values()];
export const unitsOfTrack = (trackId) => units.filter((u) => u.track === trackId);

/** Every lesson in recommended order. */
export const pathLessons = () => path.flatMap((id) => unitMap.get(id).lessons);

/** Short code shown on lesson cards, e.g. "M01 · L03". */
export const lessonCode = (l) => `M${pad2(unitById(l.unit).n)} · L${pad2(l.n)}`;
export const unitCode = (u) => `M${pad2(u.n)}`;

/** A lesson is available once its content file exists. */
export const isAvailable = (l) => hasContent(l.id);
export const unitBuilt = (u) => u.lessons.some(isAvailable);
