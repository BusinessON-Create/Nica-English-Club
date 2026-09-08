async function renderHistory() {
  const el = document.getElementById("history-content");
  let weeks = [];
  try {
    weeks = await Progress.loadAllWeeks();
  } catch (e) {
    el.innerHTML = `<div class="empty-state">Sign in to see your practice history.</div>`;
    return;
  }

  if (!weeks.length) {
    el.innerHTML = `<div class="empty-state">No completed practices yet. Start Week 1 today!</div>`;
    return;
  }

  el.innerHTML = weeks.map(w => {
    const completed = Progress.countCompleted(w);
    const total = 5;
    const full = completed === total;
    return `
      <div class="history-item">
        <div>
          <div class="w-num">WEEK ${w.weekNumber}</div>
          <div class="w-theme">${w.theme}</div>
        </div>
        <div class="w-score ${full ? "full" : ""}">${completed}/${total}${full ? " ✓" : ""}</div>
      </div>`;
  }).join("");
}

renderHistory();
