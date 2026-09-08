/* ============================================================
   SETTINGS
   Change these values only — never touch app logic to update
   the coach's number or which week is currently active.
   ============================================================ */

window.NICA_SETTINGS = {
  // Coach WhatsApp number, WITHOUT +, WITH country code.
  // Nicaragua country code is 505. Update if this is wrong.
  coachWhatsApp: "50581481862",

  // Which content file is the "current" week shown on the dashboard.
  // To launch a new week: add content/week2.js (duplicate week1.js),
  // then change this value to "week2".
  currentWeekId: "week1"
};
