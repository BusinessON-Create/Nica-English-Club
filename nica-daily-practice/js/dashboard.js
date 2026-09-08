/* ============================================================
   DASHBOARD
   Pure rendering — all data comes from WEEK_CONTENT (content
   file) and Progress (Firestore). Never hardcode day titles or
   counts here.
   ============================================================ */

function dayLocalStatus(dayNumber) {
  // "in progress" is a lightweight client-side hint (user opened
  // the day but hasn't completed it yet) — not authoritative.
  return localStorage.getItem(`nica_opened_${window.WEEK_CONTENT.id}_day${dayNumber}`) ? "in-progress" : null;
}

function statusFor(dayNumber, weekProgress) {
  const saved = weekProgress.days && weekProgress.days[dayNumber];
  if (saved && saved.status === "completed") return "completed";
  if (dayLocalStatus(dayNumber)) return "in-progress";
  return "not-started";
}

function statusLabel(status) {
  if (status === "completed") return "COMPLETED ✓";
  if (status === "in-progress") return "IN PROGRESS";
  return "NOT STARTED";
}

async function renderDashboard() {
  const container = document.getElementById("dashboard-content");
  const week = window.WEEK_CONTENT;

  let weekProgress = { days: {} };
  let streak = 0;
  try {
    weekProgress = await Progress.loadWeek(week);
    streak = await Progress.getStreak();
  } catch (e) {
    // Not logged in yet or Firestore not reachable — show content anyway,
    // seguridad.js is responsible for redirecting unauthenticated users.
    console.warn("Progress unavailable:", e.message);
  }

  const completedCount = Progress.countCompleted(weekProgress);
  const pct = Math.round((completedCount / week.days.length) * 100);

  const dayCardsHtml = week.days.map(d => {
    const status = statusFor(d.day, weekProgress);
    return `
      <a class="day-card" href="day.html?day=${d.day}">
        <div>
          <div class="day-num">DAY ${d.day}</div>
          <div class="day-title">${d.title}</div>
          <div class="day-sub">${d.subtitle || ""}</div>
        </div>
        <div class="status-pill status-${status}">${statusLabel(status)}</div>
      </a>`;
  }).join("");

  const weekCompletedBanner = completedCount === week.days.length ? `
    <div class="week-completed-banner">
      <h2>WEEK COMPLETED!</h2>
      <p>You completed all ${week.days.length} English practices.<br>
      The goal is not perfection. The goal is consistent practice.</p>
    </div>` : "";

  container.innerHTML = `
    <div class="week-banner">
      <div>
        <div class="week-label">WEEK ${week.number}</div>
        <div class="theme">${week.theme}</div>
      </div>
    </div>

    ${weekCompletedBanner}

    <div class="card progress-card">
      <div class="progress-head">
        <span class="label">YOUR WEEKLY PROGRESS</span>
        <span class="count">${completedCount}/${week.days.length} Days Completed</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="streak-line">
        <span class="flame">●</span>
        <span>${streak}-day practice streak — ${Progress.streakMessage(streak)}</span>
      </div>
    </div>

    <div class="section-title">This Week's Practices</div>
    <div class="day-grid">${dayCardsHtml}</div>
  `;
}

renderDashboard();
