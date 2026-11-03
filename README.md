# Learning AI Auto

A personal PWA that teaches everything needed to start, run, and scale a **one-person AI automation
business**, from triggers and webhooks to landing the first client and running ops with AI agents.
100% no-code. Vanilla JS + Vite, installable on iPhone and laptop. No backend, no accounts, no paid APIs.

Live: https://kasene08.github.io/Learning-AI-Auto/

## Use it
- **Install (iPhone):** open the link in Safari → Share → *Add to Home Screen*.
- **Path:** 15 modules in a recommended order (technical, business, legal/ethics, capstone, final exam). Every finished lesson is open anytime.
- **Lessons:** 3–7 minutes. An example comes first and you try before the explanation. Wrong answers are corrected instantly; *I’m stuck* shows a metaphor + picture, then a worked answer. Each lesson ends with a quiz and adds flashcards.
- **Builder:** a visual workflow builder that runs on fake businesses. Graded challenges (rule-based checks) and free sandboxes.
- **Build it for real:** some lessons give an exact build for a free no-code tool (no credit card), a grading prompt to paste into Claude with your build, and a matching checklist to tick. Results are saved.
- **Review:** spaced-repetition flashcards (FSRS). Cards never retire.
- **Progress:** per-module mastery, retake any quiz, reset any module. Daily streak (one finished lesson = one day). No XP, no levels.
- **Backup:** *Settings → Export backup* saves everything to a JSON file; *Import backup* restores it.

## Develop
```
npm install
npm run dev      # http://localhost:5173/Learning-AI-Auto/  (add ?demo for sample progress)
npm test         # unit tests (engine, challenges, progress, lesson format)
npm run build    # production build in dist/
npm run shots    # iPhone + laptop screenshots in screenshots/ (dev server must be running)
npm run icons    # re-render app icons
```
Pushing runs tests, builds, and deploys to GitHub Pages (Settings → Pages → Source: **GitHub Actions**).

## Layout
```
src/
  main.js, router.js          boot + hash router (#/path, #/lesson/found-01, #/builder/first-flow …)
  content/course.js           the course map: tracks, modules, lesson titles, build stage
  content/lessons/<id>.js     lesson content: steps, quiz, flashcards
  content/glossary/*.js       glossary terms per module (merged in content/glossary.js)
  core/                       db (IndexedDB), store, progress + streak + mastery, FSRS review, backup, service worker
  sim/                        sandbox: fake businesses (data.js), blocks, run engine, graded challenges
  ui/screens/                 home, path, module, lesson, builder, workspace, review, library, glossary, progress, settings
  ui/builder/                 builder flow canvas + step settings
  ui/visuals/                 interactive lesson diagrams: flow, record, exchange, calc, compare
  ui/quiz/question.js         questions with instant correction (mc, multi, order, num)
  ui/components/              shell, sheet, outside-app build card
  ui/styles/                  tokens.css (Blueprint design system) and the rest
docs/CONTENT_GUIDE.md         how lessons, visuals, builds and challenges are written
tests/                        vitest
```

## Build stages
- ✅ **Stage 1 (design):** five theme concepts; Blueprint picked.
- ✅ **Stage a (app):** shell, path, lesson player, quizzes, flashcards, streak, progress + module reset, backup, workflow builder sandbox with 2 challenges, outside-app builds, 1 sample lesson.
- **Stage b:** Modules 1–6 (technical).
- **Stage c:** Modules 7–13 (business, legal/ethics).
- **Stage d:** Capstone, launch-readiness exam, template library.
