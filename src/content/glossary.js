// Glossary, merged from src/content/glossary/*.js. Lessons link terms with [[term-id]].
// Each entry: { id, term, aka?: [], def, lessons?: [lessonIds] }
const mods = import.meta.glob('./glossary/*.js', { eager: true });
export const glossary = Object.values(mods).flatMap((m) => m.default).sort((a, b) => a.term.localeCompare(b.term));
