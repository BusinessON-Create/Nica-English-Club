# Everyday English — Nica English Club

**100 Everyday English Verbs & Expressions**
🧠 *Aprendiendo a pensar en inglés*

A fully client-side learning app: no backend, no database, no build step. Runs entirely on **HTML5 + CSS3 + vanilla JavaScript**, with progress saved in the browser via `localStorage`.

## Files

```
/index.html   → app structure & all views
/style.css    → design system (Nica English Club black/yellow identity)
/app.js       → all app logic (navigation, trivia engine, XP, streak, spaced repetition...)
/data.js      → the 100 expressions with verb forms, examples, categories
```

## Features included

- Home dashboard with progress, XP, streak, accuracy
- Learn library: search + 7 category filters, 100 expression cards
- Expression detail: visualize → verb forms → interpretation → real example → 🔊 listen
- Trivia: 5 question types (visualization, real-life, verb forms, complete-the-sentence, what-would-you-say), Quick/Normal/Deep sessions
- Think in English: Level 1 (guided), Level 2 (discover it), Level 3 (advanced production), plus Random Challenge — with local (no-backend) answer evaluation
- Review: simple spaced-repetition queue prioritizing mistakes and unpracticed expressions
- Favorites, XP system with anti-abuse daily cap, daily streak, 5 levels, 9 achievements
- No Translation Mode toggle
- Fully responsive (mobile bottom nav / desktop top nav)
- Works even if Web Speech API isn't available — nothing breaks

## Deploy to GitHub Pages

1. Create a new repository (e.g. `everyday-english`) on GitHub.
2. Upload these 4 files (`index.html`, `style.css`, `app.js`, `data.js`) to the repository root.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save. GitHub will give you a URL like `https://yourusername.github.io/everyday-english/`.
6. Share that link with your students — no installation needed.

## Notes

- All progress is stored locally in each student's browser (`localStorage`). Clearing browser data will reset it. There is a "Reset progress" button (with confirmation) inside Progress → Settings.
- Audio pronunciation uses the browser's built-in `SpeechSynthesis` API (no external service, no API key). Quality varies slightly by browser/OS but always defaults to an `en-US` voice when available.
- To edit or add expressions, edit `data.js` — each entry must keep the same schema (`forms`, `visualization`, `interpretation`, `example`, `category`, `difficulty`).
