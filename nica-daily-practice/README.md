# Nica English Club — Daily Practice (MVP)

## 1. Where this folder goes

Drop the whole `nica-daily-practice/` folder at the **same level** as your
other module folders (`vocabulario/`, `gramática/`, etc.) — one level below
your repo root, where `seguridad.js` and `index.html` (the main portal)
already live. That's why every page here links `../seguridad.js` and
`../index.html`, exactly like your other folders already do.

```
your-repo/
  index.html            ← main portal (already exists)
  seguridad.js           ← already exists (do not duplicate)
  vocabulario/
  gramática/
  nica-daily-practice/   ← this folder
    index.html            (dashboard)
    day.html              (day flow)
    history.html          (progress history)
    css/styles.css
    js/
    content/week1.js
```

## 2. Before it runs — 2 things to connect

**a) Firebase config** — open `js/firebase-config.js` and paste in the exact
`firebaseConfig` object your main platform already uses (same project, same
Auth). Do not create a second Firebase project — students must be the same
logged-in user everywhere.

**b) Firestore rules** — this app writes to:
- `users/{uid}/progress/{weekId}`
- `users/{uid}/meta/streak`
- Storage: `audio/{uid}/{weekId}/day{N}.webm`

Make sure your security rules allow a signed-in user to read/write their
own `uid` subpaths (mirror whatever pattern your existing rules already use
for other user data).

## 3. Updating content every week (no code changes needed)

1. Duplicate `content/week1.js` → `content/week2.js`.
2. Edit `WEEK_CONTENT.id` (`"week2"`), `.number`, `.theme`, `.description`.
3. Edit each of the 5 `days[]` — title, subtitle, goal, `modules[]`, and
   `speakingMission`.
4. In `index.html`, `day.html` and `history.html`, change the
   `<script src="content/week1.js">` tag to point at `week2.js`.
5. In `js/settings.js`, set `currentWeekId: "week2"`.

That's it — no component, no logic file needs to change. The dashboard,
day flow, activities, recorder and WhatsApp handoff all read from whatever
is inside `WEEK_CONTENT`.

To change the coach's WhatsApp number, edit `coachWhatsApp` in
`js/settings.js` only.

## 4. Activity types available in this MVP (9)

`vocabulary`, `multipleChoice`, `completeSentence`, `sentenceBuilder`,
`listening`, `errorCorrection`, `speakingQuestions`, `makeItPersonal`,
`realLifeConversation`.

Each module in a day's `modules[]` array just needs `{ type, data }` — see
`content/week1.js` for the exact shape each type expects. To add a 10th
type later (e.g. Dictation), add one function to `js/activities.js` and use
that `type` string in a content file — nothing else changes.

## 5. How the audio → WhatsApp handoff actually works

Browsers cannot auto-attach a file to a WhatsApp message. So the flow is:

1. Student records → clicks **Use This Recording**.
2. The app tries to upload the recording to Firebase Storage (for your
   records — this is best-effort and won't block the flow if it fails).
3. The audio file downloads automatically to the student's device.
4. WhatsApp opens (`wa.me` link) with a pre-filled message to the coach's
   number.
5. The student manually attaches the file they just downloaded and hits
   send in WhatsApp — the app cannot do this step for them, and it never
   claims "Audio sent" until the student confirms it themselves via the
   checkbox on screen.
6. Only after that checkbox is checked does **Mark Day as Completed**
   become clickable.

## 6. What's NOT built yet (intentionally, for v2)

- Admin UI (content is edited directly in `content/weekN.js` files, as
  agreed — this was a deliberate simplification, not an oversight).
- Dictation, Shadowing speed variants beyond 0.75x/1x, Random Question
  Bank as a separate module type.
- Notifications, advanced stats, speaking evaluation.

## 7. Testing without a real coach number

`js/settings.js` currently has a placeholder Nicaragua-format number
(`50581481862` — country code 505 + the number from your brief). Confirm
this is correct before launch.
