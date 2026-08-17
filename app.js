/* ==========================================================================
   NICA ENGLISH CLUB — EVERYDAY ENGLISH
   app.js — application logic
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     STORAGE LAYER
     --------------------------------------------------------------------- */
  const STORAGE_KEY = "nec_everyday_english_v1";

  const DEFAULT_STATE = {
    xp: 0,
    streak: { count: 0, lastDate: null },
    favorites: [],
    noTranslation: false,
    sentencesCreated: 0,
    lastXpAward: {}, // expressionId -> { firstMasterDate } to prevent duplicate mastery bonus
    expr: {}, // id -> { status, attempts, correct, incorrect, lastSeen, lastResult }
    achievements: {}, // key -> unlocked boolean
    sessionsCompleted: 0,
    consecutiveCorrect: 0,
    xpAwardsToday: { date: null, count: 0 } // simple anti-abuse counter
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredCloneState(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return Object.assign(structuredCloneState(DEFAULT_STATE), parsed);
    } catch (e) {
      console.warn("Storage read failed, using defaults", e);
      return structuredCloneState(DEFAULT_STATE);
    }
  }

  function structuredCloneState(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  /* ---------------------------------------------------------------------
     XP + STREAK (with basic anti-abuse: cap XP-granting events per day)
     --------------------------------------------------------------------- */
  const DAILY_XP_EVENT_CAP = 400; // generous cap on number of XP-granting actions/day

  function canAwardXp() {
    const t = todayStr();
    if (state.xpAwardsToday.date !== t) {
      state.xpAwardsToday = { date: t, count: 0 };
    }
    return state.xpAwardsToday.count < DAILY_XP_EVENT_CAP;
  }

  function awardXp(amount, reason) {
    if (!canAwardXp()) return 0;
    state.xp += amount;
    state.xpAwardsToday.count += 1;
    saveState();
    return amount;
  }

  function touchStreak() {
    const t = todayStr();
    if (state.streak.lastDate === t) return; // already counted today
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.streak.lastDate === yesterday) {
      state.streak.count += 1;
    } else {
      state.streak.count = 1;
    }
    state.streak.lastDate = t;
    saveState();
  }

  /* ---------------------------------------------------------------------
     EXPRESSION PROGRESS STATE
     status: new | learning | practicing | mastered
     --------------------------------------------------------------------- */
  function getExprState(id) {
    if (!state.expr[id]) {
      state.expr[id] = { status: "new", attempts: 0, correct: 0, incorrect: 0, lastSeen: null, lastResult: null };
    }
    return state.expr[id];
  }

  function recordAttempt(id, wasCorrect) {
    const es = getExprState(id);
    es.attempts += 1;
    es.lastSeen = Date.now();
    es.lastResult = wasCorrect ? "correct" : "incorrect";
    if (wasCorrect) {
      es.correct += 1;
      state.consecutiveCorrect = (state.consecutiveCorrect || 0) + 1;
    } else {
      es.incorrect += 1;
      state.consecutiveCorrect = 0;
    }

    // status progression
    if (es.status === "new") es.status = "learning";
    else if (es.status === "learning" && es.attempts >= 2) es.status = "practicing";

    const wasAlreadyMastered = es.status === "mastered";
    if (!wasAlreadyMastered && es.attempts >= 4 && es.correct / es.attempts >= 0.8) {
      es.status = "mastered";
      if (!state.lastXpAward[id]) {
        state.lastXpAward[id] = { firstMasterDate: todayStr() };
        awardXp(50, "mastered:" + id);
        showToast("🏆 Expression mastered! +50 XP");
      }
    }

    if (wasCorrect) awardXp(10, "correct:" + id);
    if (state.consecutiveCorrect > 0 && state.consecutiveCorrect % 10 === 0) {
      awardXp(50, "streak-bonus");
      showToast("🔥 10 in a row! +50 XP bonus");
    }

    saveState();
    checkAchievements();
  }

  /* ---------------------------------------------------------------------
     LEVELS
     --------------------------------------------------------------------- */
  const LEVELS = [
    { min: 0, name: "English Starter" },
    { min: 300, name: "Everyday Learner" },
    { min: 900, name: "English Builder" },
    { min: 1800, name: "Everyday Speaker" },
    { min: 3200, name: "English Thinker" }
  ];

  function getLevel() {
    let idx = 0;
    LEVELS.forEach((l, i) => { if (state.xp >= l.min) idx = i; });
    const current = LEVELS[idx];
    const next = LEVELS[idx + 1];
    return {
      num: idx + 1,
      name: current.name,
      next: next ? next.name : null,
      progressToNext: next ? (state.xp - current.min) / (next.min - current.min) : 1,
      xpToNext: next ? next.min - state.xp : 0
    };
  }

  /* ---------------------------------------------------------------------
     ACHIEVEMENTS
     --------------------------------------------------------------------- */
  const ACHIEVEMENTS = [
    { key: "first_practice", icon: "🏆", title: "First Practice", desc: "Complete your first session",
      check: () => state.sessionsCompleted >= 1 },
    { key: "expr_10", icon: "🏆", title: "10 Expressions", desc: "Practice 10 expressions",
      check: () => practicedCount() >= 10 },
    { key: "expr_25", icon: "🏆", title: "25 Expressions", desc: "Practice 25 expressions",
      check: () => practicedCount() >= 25 },
    { key: "expr_50", icon: "🏆", title: "50 Expressions", desc: "Practice 50 expressions",
      check: () => practicedCount() >= 50 },
    { key: "expr_100", icon: "🏆", title: "100 Expressions", desc: "See all expressions",
      check: () => practicedCount() >= 100 },
    { key: "streak_7", icon: "🔥", title: "7 Day Streak", desc: "Practice 7 days in a row",
      check: () => state.streak.count >= 7 },
    { key: "accuracy_90", icon: "🎯", title: "90% Accuracy", desc: "Reach 90% overall accuracy",
      check: () => overallAccuracy() >= 90 && totalAttempts() >= 20 },
    { key: "think_10", icon: "🧠", title: "Think in English", desc: "Create 10 of your own sentences",
      check: () => state.sentencesCreated >= 10 },
    { key: "mastered_25", icon: "⭐", title: "Mastered", desc: "Master 25 expressions",
      check: () => masteredCount() >= 25 }
  ];

  function practicedCount() { return Object.values(state.expr).filter(e => e.attempts > 0).length; }
  function masteredCount() { return Object.values(state.expr).filter(e => e.status === "mastered").length; }
  function totalAttempts() { return Object.values(state.expr).reduce((s, e) => s + e.attempts, 0); }
  function totalCorrect() { return Object.values(state.expr).reduce((s, e) => s + e.correct, 0); }
  function overallAccuracy() {
    const t = totalAttempts();
    return t === 0 ? 0 : Math.round((totalCorrect() / t) * 100);
  }

  function checkAchievements() {
    let newlyUnlocked = null;
    ACHIEVEMENTS.forEach(a => {
      const already = !!state.achievements[a.key];
      if (!already && a.check()) {
        state.achievements[a.key] = true;
        newlyUnlocked = a;
      }
    });
    if (newlyUnlocked) {
      saveState();
      showToast(newlyUnlocked.icon + " Achievement: " + newlyUnlocked.title);
    }
  }

  /* ---------------------------------------------------------------------
     SPACED REPETITION PRIORITY (simple weighted scheme)
     --------------------------------------------------------------------- */
  function reviewWeight(expr) {
    const es = getExprState(expr.id);
    if (es.attempts === 0) return 100; // never practiced -> high priority
    const daysSince = es.lastSeen ? (Date.now() - es.lastSeen) / 86400000 : 30;
    const accuracy = es.correct / es.attempts;
    let weight = (1 - accuracy) * 60; // more wrong answers -> higher weight
    weight += Math.min(daysSince, 14) * 3; // longer since practiced -> higher weight
    if (es.lastResult === "incorrect") weight += 20;
    if (es.status === "mastered") weight *= 0.15; // mastered items rarely need review
    return weight;
  }

  function getReviewQueue(limit) {
    const scored = EXPRESSIONS.map(e => ({ e, w: reviewWeight(e) }));
    scored.sort((a, b) => b.w - a.w);
    return scored.slice(0, limit).map(s => s.e);
  }

  /* ---------------------------------------------------------------------
     SPEECH SYNTHESIS
     --------------------------------------------------------------------- */
  function speak(text) {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = 0.92;
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(v => v.lang === "en-US") || voices.find(v => v.lang && v.lang.startsWith("en"));
      if (usVoice) utter.voice = usVoice;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* fail silently, app keeps working */ }
  }
  if (window.speechSynthesis) {
    try { window.speechSynthesis.onvoiceschanged = () => {}; } catch (e) { /* ignore */ }
  }

  /* ---------------------------------------------------------------------
     TOAST
     --------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------------------------------------------------------------------
     UTIL
     --------------------------------------------------------------------- */
  function byId(id) { return EXPRESSIONS.find(e => e.id === id); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pickRandom(arr, n) { return shuffle(arr).slice(0, n); }
  function randomOf(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* =======================================================================
     NAVIGATION
     ======================================================================= */
  const VIEWS = ["home", "learn", "trivia", "think", "review", "favorites", "progress"];

  function goTo(view, opts) {
    VIEWS.forEach(v => {
      document.getElementById("view-" + v).classList.toggle("active", v === view);
    });
    document.querySelectorAll(".nav-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.view === view);
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (view === "home") renderHome();
    if (view === "learn") renderLearn();
    if (view === "trivia") renderTriviaHome();
    if (view === "think") renderThinkHome();
    if (view === "review") renderReviewHome();
    if (view === "favorites") renderFavorites();
    if (view === "progress") renderProgress();
  }

  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => goTo(tab.dataset.view));
  });

  /* =======================================================================
     HOME
     ======================================================================= */
  function renderHome() {
    const practiced = practicedCount();
    const mastered = masteredCount();
    const acc = overallAccuracy();
    const lvl = getLevel();

    document.getElementById("home-progress-fill").style.width = practiced + "%";
    document.getElementById("home-progress-label").textContent = practiced + " / 100";

    document.getElementById("home-stats").innerHTML = `
      <div class="stat-card"><span class="icon">⭐</span><div class="num">${state.xp}</div><div class="lbl">XP</div></div>
      <div class="stat-card"><span class="icon">🔥</span><div class="num">${state.streak.count}</div><div class="lbl">Day streak</div></div>
      <div class="stat-card"><span class="icon">🎯</span><div class="num">${acc}%</div><div class="lbl">Accuracy</div></div>
      <div class="stat-card"><span class="icon">🧠</span><div class="num">${practiced}</div><div class="lbl">Learned</div></div>
      <div class="stat-card"><span class="icon">🏆</span><div class="num">${mastered}</div><div class="lbl">Mastered</div></div>
    `;

    updateTopbar();
  }

  function updateTopbar() {
    document.getElementById("topbar-xp").textContent = state.xp;
    document.getElementById("topbar-streak").textContent = state.streak.count;
  }

  document.getElementById("qc-learn").addEventListener("click", () => goTo("learn"));
  document.getElementById("qc-trivia").addEventListener("click", () => goTo("trivia"));
  document.getElementById("qc-think").addEventListener("click", () => goTo("think"));
  document.getElementById("qc-review").addEventListener("click", () => goTo("review"));
  document.getElementById("qc-5min").addEventListener("click", () => startSession({ mode: "mixed", count: 15, timeBased: true }));

  /* =======================================================================
     LEARN — library, search, category filter, expression cards
     ======================================================================= */
  let learnFilter = "all";
  let learnQuery = "";

  function renderCategoryChips(containerId, onSelect, activeVal) {
    const el = document.getElementById(containerId);
    el.innerHTML = CATEGORIES.map(c =>
      `<button class="chip ${c.id === activeVal ? "active" : ""}" data-cat="${c.id}">${c.icon} ${c.label}</button>`
    ).join("");
    el.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => onSelect(chip.dataset.cat));
    });
  }

  function renderLearn() {
    renderCategoryChips("learn-chips", (cat) => { learnFilter = cat; renderLearn(); }, learnFilter);
    const list = EXPRESSIONS.filter(e => {
      const matchesCat = learnFilter === "all" || e.category === learnFilter;
      const q = learnQuery.trim().toLowerCase();
      const matchesQuery = !q || e.expression.includes(q) || e.interpretation.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
    renderExprGrid("learn-grid", list);
  }

  document.getElementById("learn-search").addEventListener("input", (e) => {
    learnQuery = e.target.value;
    renderLearn();
  });

  function renderExprGrid(containerId, list) {
    const el = document.getElementById(containerId);
    if (list.length === 0) {
      el.innerHTML = `<div class="empty-state"><span class="ei">🔍</span><div class="et">No expressions found</div>Try a different search or category.</div>`;
      return;
    }
    el.innerHTML = list.map(exprCardHtml).join("");
    el.querySelectorAll(".expr-card").forEach(card => {
      card.addEventListener("click", () => openExpressionModal(parseInt(card.dataset.id, 10)));
    });
  }

  function exprCardHtml(e) {
    const es = getExprState(e.id);
    const isFav = state.favorites.includes(e.id);
    return `
      <button class="expr-card" data-id="${e.id}">
        <span class="status-dot ${es.status !== "new" ? es.status : ""}"></span>
        <div class="expr-title">${escapeHtml(e.expression)}</div>
        <div class="expr-vis">${escapeHtml(e.visualization)}</div>
        <div class="expr-meta">
          <span class="diff-badge ${e.difficulty}">${e.difficulty}</span>
          <span class="fav-toggle ${isFav ? "is-fav" : ""}">${isFav ? "★" : "☆"}</span>
        </div>
      </button>
    `;
  }

  /* ---------------- Expression detail modal ---------------- */
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");

  function openExpressionModal(id) {
    const e = byId(id);
    if (!e) return;
    const isFav = state.favorites.includes(id);
    const cat = CATEGORIES.find(c => c.id === e.category);

    modalBody.innerHTML = `
      <button class="modal-close" id="modal-close-btn">✕</button>
      <div class="modal-eyebrow">${cat ? cat.icon + " " + cat.label : ""}</div>
      <div class="modal-title">${escapeHtml(e.expression)}</div>

      <div class="detail-block">
        <div class="detail-label">🧠 Visualize it</div>
        <div class="detail-text">${escapeHtml(e.visualization)}</div>
      </div>

      <div class="detail-block" id="forms-block" style="display:none;">
        <div class="detail-label">Verb forms</div>
        <div class="forms-grid">
          <div class="form-item"><div class="fl">Present</div><div class="fv">${escapeHtml(e.forms.present)}</div></div>
          <div class="form-item"><div class="fl">3rd person</div><div class="fv">${escapeHtml(e.forms.third)}</div></div>
          <div class="form-item"><div class="fl">Past</div><div class="fv">${escapeHtml(e.forms.past)}</div></div>
          <div class="form-item"><div class="fl">Past participle</div><div class="fv">${escapeHtml(e.forms.pastParticiple)}</div></div>
          <div class="form-item"><div class="fl">-ing</div><div class="fv">${escapeHtml(e.forms.ing)}</div></div>
        </div>
      </div>

      <div class="detail-block" id="interp-block" style="${state.noTranslation ? "display:none;" : ""}">
        <div class="detail-label">💡 Interpretation</div>
        <div class="detail-text spanish">${escapeHtml(e.interpretation)}</div>
      </div>

      <div class="detail-block">
        <div class="detail-label">🗣️ Real-life example</div>
        <div class="detail-text example">${escapeHtml(e.example)}</div>
      </div>

      <div class="modal-actions">
        <button class="btn" id="modal-listen">🔊 Listen</button>
        <button class="btn" id="modal-forms">Show forms</button>
        <button class="btn" id="modal-fav">${isFav ? "★ Favorited" : "☆ Favorite"}</button>
        <button class="btn btn-primary btn-block" id="modal-practice">Practice this expression</button>
      </div>
    `;

    document.getElementById("modal-close-btn").addEventListener("click", closeModal);
    document.getElementById("modal-listen").addEventListener("click", () => speak(e.example));
    document.getElementById("modal-forms").addEventListener("click", (ev) => {
      document.getElementById("forms-block").style.display = "block";
      ev.target.disabled = true;
      ev.target.textContent = "Forms shown";
    });
    document.getElementById("modal-fav").addEventListener("click", (ev) => {
      toggleFavorite(id);
      const nowFav = state.favorites.includes(id);
      ev.target.textContent = nowFav ? "★ Favorited" : "☆ Favorite";
      renderLearn();
    });
    document.getElementById("modal-practice").addEventListener("click", () => {
      closeModal();
      startSession({ mode: "mixed", count: 5, focusIds: [id] });
    });

    modalOverlay.classList.add("open");
  }

  function closeModal() { modalOverlay.classList.remove("open"); }
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });

  function toggleFavorite(id) {
    const idx = state.favorites.indexOf(id);
    if (idx === -1) state.favorites.push(id); else state.favorites.splice(idx, 1);
    saveState();
  }

  /* =======================================================================
     FAVORITES VIEW
     ======================================================================= */
  function renderFavorites() {
    const list = EXPRESSIONS.filter(e => state.favorites.includes(e.id));
    const el = document.getElementById("favorites-grid");
    if (list.length === 0) {
      el.innerHTML = `<div class="empty-state"><span class="ei">⭐</span><div class="et">No favorites yet</div>Tap the star on any expression to save it here.</div>`;
      return;
    }
    renderExprGrid("favorites-grid", list);
  }

  /* =======================================================================
     PROGRESS VIEW
     ======================================================================= */
  function renderProgress() {
    const lvl = getLevel();
    document.getElementById("progress-level").innerHTML = `
      <div>
        <div class="lvl-num">Level ${lvl.num}</div>
        <div class="lvl-name">${lvl.name}</div>
      </div>
      <div class="lvl-xp">${state.xp} XP${lvl.next ? `<br>${lvl.xpToNext} XP to ${lvl.next}` : "<br>Max level"}</div>
    `;

    const practiced = practicedCount();
    const mastered = masteredCount();
    const acc = overallAccuracy();

    document.getElementById("progress-stats").innerHTML = `
      <div class="stat-card"><span class="icon">📘</span><div class="num">${practiced}/100</div><div class="lbl">Practiced</div></div>
      <div class="stat-card"><span class="icon">🏆</span><div class="num">${mastered}/100</div><div class="lbl">Mastered</div></div>
      <div class="stat-card"><span class="icon">🎯</span><div class="num">${acc}%</div><div class="lbl">Accuracy</div></div>
      <div class="stat-card"><span class="icon">🔥</span><div class="num">${state.streak.count}</div><div class="lbl">Streak</div></div>
      <div class="stat-card"><span class="icon">⭐</span><div class="num">${state.xp}</div><div class="lbl">Total XP</div></div>
    `;

    const catEl = document.getElementById("progress-categories");
    catEl.innerHTML = CATEGORIES.filter(c => c.id !== "all").map(c => {
      const items = EXPRESSIONS.filter(e => e.category === c.id);
      const done = items.filter(e => getExprState(e.id).attempts > 0).length;
      const pct = Math.round((done / items.length) * 100);
      return `
        <div class="category-bar-row">
          <div class="cb-top"><span class="cb-name">${c.icon} ${c.label}</span><span class="cb-pct">${pct}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
      `;
    }).join("");

    const achvEl = document.getElementById("progress-achievements");
    achvEl.innerHTML = ACHIEVEMENTS.map(a => {
      const unlocked = !!state.achievements[a.key];
      return `
        <div class="achv-card ${unlocked ? "unlocked" : ""}">
          <div class="ai">${a.icon}</div>
          <div class="at">${a.title}</div>
          <div class="ad">${a.desc}</div>
        </div>
      `;
    }).join("");

    updateTopbar();
  }

  document.getElementById("reset-progress-btn").addEventListener("click", () => {
    document.getElementById("reset-confirm").style.display = "block";
  });
  document.getElementById("reset-cancel-btn").addEventListener("click", () => {
    document.getElementById("reset-confirm").style.display = "none";
  });
  document.getElementById("reset-confirm-btn").addEventListener("click", () => {
    state = structuredCloneState(DEFAULT_STATE);
    saveState();
    document.getElementById("reset-confirm").style.display = "none";
    showToast("Progress reset");
    goTo("home");
  });

  /* =======================================================================
     TRIVIA / PRACTICE SESSION ENGINE
     Question types: visualization, real-life, verb-forms, complete-sentence,
     what-would-you-say (same generator family, different framing)
     ======================================================================= */

  function renderTriviaHome() {
    // static content already in HTML; just wire buttons (done once via delegation below)
  }

  document.querySelectorAll("[data-session]").forEach(btn => {
    btn.addEventListener("click", () => {
      const count = parseInt(btn.dataset.session, 10);
      startSession({ mode: "mixed", count });
    });
  });

  const FORM_LABELS = { present: "Present", third: "3rd person singular", past: "Past", pastParticiple: "Past participle", ing: "-ING form" };

  function buildQuestion(expr, excludePool) {
    const types = ["visualization", "reallife", "verbforms", "complete", "wouldyousay"];
    const type = randomOf(types);
    const distractorPool = excludePool.filter(e => e.id !== expr.id);

    if (type === "visualization" || type === "reallife" || type === "wouldyousay") {
      const wrong = pickRandom(distractorPool, 3).map(e => e.expression);
      const options = shuffle([expr.expression, ...wrong]);
      let situation, prompt;
      if (type === "visualization") {
        situation = expr.visualization;
        prompt = "What expression is this?";
      } else if (type === "reallife") {
        situation = expr.example.replace(new RegExp(expr.expression, "i"), "___");
        prompt = "What would complete this real-life sentence?";
      } else {
        situation = expr.visualization;
        prompt = "What would you say in this situation?";
      }
      return {
        type: "choice", qtype: type, exprId: expr.id, situation, prompt,
        options, correctAnswer: expr.expression,
        explanation: capitalize(expr.expression) + " — " + expr.interpretation
      };
    }

    if (type === "verbforms") {
      const formKeys = ["present", "third", "past", "pastParticiple", "ing"];
      const fk = randomOf(formKeys);
      const correct = expr.forms[fk];
      const wrongForms = new Set();
      // wrong options: other forms of same expr + forms from distractors
      Object.values(expr.forms).forEach(f => { if (f !== correct) wrongForms.add(f); });
      pickRandom(distractorPool, 4).forEach(d => wrongForms.add(d.forms[fk]));
      const wrong = shuffle(Array.from(wrongForms)).slice(0, 3);
      const options = shuffle([correct, ...wrong]);
      return {
        type: "choice", qtype: "verbforms", exprId: expr.id,
        situation: capitalize(expr.expression).toUpperCase(),
        prompt: "What is the " + FORM_LABELS[fk] + " form?",
        options, correctAnswer: correct,
        explanation: capitalize(expr.expression) + " → " + FORM_LABELS[fk] + ": " + correct
      };
    }

    // complete-the-sentence
    const blankExample = expr.example.replace(new RegExp(expr.forms.present.split(" ")[0], "i"), "____")
      || expr.example;
    const formsArr = [expr.forms.present.split(" ")[0], expr.forms.third.split(" ")[0], expr.forms.past.split(" ")[0], expr.forms.ing.split(" ")[0]];
    const uniqueForms = Array.from(new Set(formsArr));
    const correctWord = expr.forms.present.split(" ")[0];
    const options = shuffle(uniqueForms.length >= 2 ? uniqueForms : [correctWord, expr.forms.past.split(" ")[0]]);
    return {
      type: "choice", qtype: "complete", exprId: expr.id,
      situation: null,
      prompt: blankExample,
      options, correctAnswer: correctWord,
      explanation: "Correct sentence: " + expr.example
    };
  }

  let session = null; // { queue, index, correct, xpEarned, exprTouched:Set, timeBased, startTime }

  function startSession(opts) {
    let pool;
    if (opts.focusIds) {
      pool = opts.focusIds.map(byId);
      // pad with random others so distractors exist
      const filler = pickRandom(EXPRESSIONS.filter(e => !opts.focusIds.includes(e.id)), Math.max(0, opts.count - pool.length));
      pool = shuffle([...pool, ...filler]).slice(0, Math.max(opts.count, pool.length));
    } else if (opts.reviewIds) {
      pool = opts.reviewIds;
    } else {
      pool = pickRandom(EXPRESSIONS, opts.count);
    }

    session = {
      queue: pool.slice(0, opts.count).map(e => buildQuestion(e, EXPRESSIONS)),
      index: 0,
      correct: 0,
      xpEarned: 0,
      exprTouched: new Set(),
      timeBased: !!opts.timeBased,
      startTime: Date.now(),
      sourceView: opts.sourceView || "trivia"
    };

    document.getElementById("trivia-setup").style.display = "none";
    document.getElementById("trivia-summary").style.display = "none";
    document.getElementById("trivia-session").style.display = "block";
    renderQuestion();
  }

  function renderQuestion() {
    const q = session.queue[session.index];
    const total = session.queue.length;
    document.getElementById("session-count").textContent = `Question ${session.index + 1} / ${total}`;
    document.getElementById("session-progress-fill").style.width = ((session.index) / total * 100) + "%";

    const html = `
      <span class="q-type-tag">${questionTypeLabel(q.qtype)}</span>
      ${q.situation ? `<div class="q-situation">${escapeHtml(q.situation)}</div>` : ""}
      <div class="q-prompt">${escapeHtml(q.prompt)}</div>
      <div class="q-options" id="q-options">
        ${q.options.map((opt, i) => `
          <button class="q-option" data-opt="${escapeHtml(opt)}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}
          </button>
        `).join("")}
      </div>
      <div id="q-feedback"></div>
      <div class="mt-16" id="q-next-wrap" style="display:none;">
        <button class="btn btn-primary btn-block" id="q-next-btn">Continue</button>
      </div>
    `;
    document.getElementById("q-card").innerHTML = html;

    document.querySelectorAll("#q-options .q-option").forEach(btn => {
      btn.addEventListener("click", () => handleAnswer(btn, q));
    });
  }

  function questionTypeLabel(t) {
    return { visualization: "Visualize it", reallife: "Real life", verbforms: "Verb forms", complete: "Complete the sentence", wouldyousay: "What would you say?" }[t] || "Practice";
  }

  function handleAnswer(btn, q) {
    const chosen = btn.dataset.opt;
    const isCorrect = chosen === q.correctAnswer;

    document.querySelectorAll("#q-options .q-option").forEach(b => {
      b.disabled = true;
      if (b.dataset.opt === q.correctAnswer) b.classList.add("correct");
      else if (b === btn) b.classList.add("incorrect");
      else b.classList.add("dim");
    });

    recordAttempt(q.exprId, isCorrect);
    session.exprTouched.add(q.exprId);
    if (isCorrect) { session.correct += 1; session.xpEarned += 10; }

    const fbEl = document.getElementById("q-feedback");
    const expr = byId(q.exprId);
    fbEl.innerHTML = `
      <div class="q-feedback ${isCorrect ? "correct" : "incorrect"}">
        <div class="qf-title">${isCorrect ? "✅ Great job!" : "❌ Not quite"}</div>
        <div class="qf-body">${escapeHtml(q.explanation)}</div>
        <div class="qf-vis">🧠 Remember the situation: ${escapeHtml(expr.visualization)}</div>
      </div>
    `;
    document.getElementById("q-next-wrap").style.display = "block";
    document.getElementById("q-next-btn").addEventListener("click", nextQuestion);
    updateTopbar();
  }

  function nextQuestion() {
    session.index += 1;
    if (session.index >= session.queue.length) {
      finishSession();
    } else {
      renderQuestion();
    }
  }

  function finishSession() {
    touchStreak();
    state.sessionsCompleted += 1;
    const sessionXp = session.xpEarned + 25; // completion bonus
    awardXp(25, "session-complete");
    saveState();
    checkAchievements();

    document.getElementById("trivia-session").style.display = "none";
    document.getElementById("trivia-summary").style.display = "block";

    const total = session.queue.length;
    const acc = Math.round((session.correct / total) * 100);

    document.getElementById("trivia-summary").innerHTML = `
      <div class="summary-hero">
        <div class="emoji">${acc >= 80 ? "🎉" : "💪"}</div>
        <h2>Session complete!</h2>
        <p>Every practice session helps you think faster in English.</p>
      </div>
      <div class="summary-grid">
        <div class="stat-card"><div class="num">${total}</div><div class="lbl">Questions</div></div>
        <div class="stat-card"><div class="num">${session.correct}</div><div class="lbl">Correct</div></div>
        <div class="stat-card"><div class="num">${acc}%</div><div class="lbl">Accuracy</div></div>
        <div class="stat-card"><div class="num">+${sessionXp}</div><div class="lbl">XP earned</div></div>
      </div>
      <div class="mode-grid">
        <button class="btn btn-primary" id="summary-again">🔁 Practice again</button>
        <button class="btn" id="summary-mistakes">🔄 Review mistakes</button>
        <button class="btn btn-ghost" id="summary-home">🏠 Back to home</button>
      </div>
    `;

    document.getElementById("summary-again").addEventListener("click", () => startSession({ mode: "mixed", count: total }));
    document.getElementById("summary-mistakes").addEventListener("click", () => {
      const mistakeIds = Array.from(session.exprTouched).filter(id => getExprState(id).lastResult === "incorrect");
      if (mistakeIds.length === 0) { showToast("No mistakes to review — nice!"); return; }
      startSession({ mode: "mixed", reviewIds: mistakeIds.map(byId), count: mistakeIds.length });
    });
    document.getElementById("summary-home").addEventListener("click", () => goTo("home"));

    updateTopbar();
  }

  /* =======================================================================
     THINK IN ENGLISH
     Level 1: expression shown + free writing, local evaluation
     Level 2: situation only, must recall expression
     Level 3: advanced — situation only, no options, open production
     Also powers RANDOM CHALLENGE
     ======================================================================= */

  let thinkCurrent = null; // { expr, level }

  function renderThinkHome() {
    document.getElementById("think-content").innerHTML = "";
    newThinkPrompt(1);
  }

  document.querySelectorAll("[data-think-level]").forEach(btn => {
    btn.addEventListener("click", () => newThinkPrompt(parseInt(btn.dataset.thinkLevel, 10)));
  });
  document.getElementById("random-challenge-btn").addEventListener("click", () => newThinkPrompt("challenge"));

  function newThinkPrompt(level) {
    const expr = randomOf(EXPRESSIONS);
    thinkCurrent = { expr, level };
    const personal = PERSONAL_PROMPTS[expr.id];

    let html = "";
    if (level === 1) {
      html = `
        <div class="modal-eyebrow">🧠 Level 1 — See it, use it</div>
        <div class="modal-title" style="font-size:24px;">${escapeHtml(expr.expression)}</div>
        <div class="detail-block">
          <div class="detail-label">Real-life situation</div>
          <div class="detail-text">${escapeHtml(expr.visualization)}</div>
        </div>
        <div class="detail-label">Your turn</div>
        <p class="muted mb-16">${personal ? escapeHtml(personal) : "How would you say it in real life?"}</p>
        <textarea class="write-area" id="think-input" placeholder="Write your own sentence using '${escapeHtml(expr.expression)}'..."></textarea>
        <div class="modal-actions">
          <button class="btn btn-primary" id="think-check">Check my answer</button>
          <button class="btn" id="think-listen">🔊 Listen to example</button>
        </div>
        <div id="think-result"></div>
      `;
    } else if (level === "challenge") {
      html = `
        <div class="modal-eyebrow">🎲 Today's challenge</div>
        <div class="modal-title" style="font-size:24px;">${escapeHtml(expr.expression)}</div>
        <div class="detail-block">
          <div class="detail-label">Imagine this</div>
          <div class="detail-text">${escapeHtml(expr.visualization)}</div>
        </div>
        <div class="detail-label">Your challenge</div>
        <p class="muted mb-16">Write one sentence using <strong style="color:var(--yellow)">${escapeHtml(expr.expression)}</strong> about your real life.</p>
        <textarea class="write-area" id="think-input" placeholder="Type your sentence here..."></textarea>
        <div class="modal-actions">
          <button class="btn btn-primary" id="think-check">Check my answer</button>
        </div>
        <div id="think-result"></div>
      `;
    } else {
      // level 2 & 3: situation only, no expression revealed
      const eyebrow = level === 2 ? "🧠 Level 2 — Discover it" : "🔥 Level 3 — Advanced production";
      html = `
        <div class="modal-eyebrow">${eyebrow}</div>
        <div class="detail-block">
          <div class="detail-label">Situation</div>
          <div class="detail-text" style="font-size:17px;">${escapeHtml(expr.visualization)}</div>
        </div>
        <div class="detail-label">What would you say?</div>
        <textarea class="write-area" id="think-input" placeholder="Type your response in English..."></textarea>
        <div class="modal-actions">
          <button class="btn btn-primary" id="think-check">Check my answer</button>
        </div>
        <div id="think-result"></div>
      `;
    }

    document.getElementById("think-content").innerHTML = html;
    document.getElementById("think-check").addEventListener("click", () => evaluateThink(level, expr));
    const listenBtn = document.getElementById("think-listen");
    if (listenBtn) listenBtn.addEventListener("click", () => speak(expr.example));
  }

  function evaluateThink(level, expr) {
    const input = document.getElementById("think-input").value.trim();
    const resultEl = document.getElementById("think-result");
    if (!input) {
      resultEl.innerHTML = `<div class="eval-result needs-work"><strong>Write something first</strong> — even one short sentence helps you practice.</div>`;
      return;
    }

    const targetWords = expr.expression.toLowerCase().split(" ").filter(w => w.length > 2);
    const lower = input.toLowerCase();
    const containsTarget = targetWords.every(w => lower.includes(w)) || lower.includes(expr.expression.toLowerCase());
    const hasReasonableLength = input.split(" ").length >= 3;

    state.sentencesCreated += 1;
    awardXp(15, "think-in-english");
    saveState();
    checkAchievements();

    if (level === 1 || level === "challenge") {
      if (containsTarget && hasReasonableLength) {
        resultEl.innerHTML = `
          <div class="eval-result">
            <strong>✅ Good job! You used the target expression.</strong>
            <div class="detail-block" style="border:none; padding-top:12px;">
              <div class="detail-label">Your sentence</div>
              <div class="detail-text">${escapeHtml(input)}</div>
            </div>
            <div class="detail-block" style="border:none; padding-top:0;">
              <div class="detail-label">Natural example</div>
              <div class="detail-text example">${escapeHtml(expr.example)}</div>
            </div>
            <div class="detail-label">Think about it</div>
            <div class="detail-text spanish">Does this sentence describe your real life?</div>
          </div>
        `;
      } else {
        resultEl.innerHTML = `
          <div class="eval-result needs-work">
            <strong>Almost — try using "${escapeHtml(expr.expression)}" directly in your sentence.</strong>
            <div class="detail-block" style="border:none; padding-top:12px;">
              <div class="detail-label">Natural example</div>
              <div class="detail-text example">${escapeHtml(expr.example)}</div>
            </div>
          </div>
        `;
      }
    } else {
      // level 2/3: reveal the expression regardless, since goal is spontaneous production
      resultEl.innerHTML = `
        <div class="eval-result ${containsTarget ? "" : "needs-work"}">
          <strong>${containsTarget ? "✅ Nice — that's the idea!" : "Here's the expression for this situation"}</strong>
          <div class="detail-block" style="border:none; padding-top:12px;">
            <div class="detail-label">Possible answer</div>
            <div class="detail-text example">${escapeHtml(expr.example)}</div>
          </div>
          <div class="detail-label">Expression</div>
          <div class="detail-text" style="text-transform:uppercase; font-weight:700; color:var(--yellow);">${escapeHtml(expr.expression)}</div>
        </div>
      `;
    }
  }

  /* =======================================================================
     REVIEW — spaced repetition driven
     ======================================================================= */
  function renderReviewHome() {
    const queue = getReviewQueue(20);
    const weak = queue.filter(e => getExprState(e.id).attempts > 0 && getExprState(e.id).status !== "mastered");
    const neverPracticed = queue.filter(e => getExprState(e.id).attempts === 0);

    document.getElementById("review-stats").innerHTML = `
      <div class="stat-card"><span class="icon">⚠️</span><div class="num">${weak.length}</div><div class="lbl">Needs practice</div></div>
      <div class="stat-card"><span class="icon">🆕</span><div class="num">${neverPracticed.length}</div><div class="lbl">Not started</div></div>
      <div class="stat-card"><span class="icon">🏆</span><div class="num">${masteredCount()}</div><div class="lbl">Mastered</div></div>
    `;

    const el = document.getElementById("review-queue");
    if (queue.length === 0) {
      el.innerHTML = `<div class="empty-state"><span class="ei">🎉</span><div class="et">Nothing to review right now</div>Come back after your next practice session.</div>`;
    } else {
      renderExprGrid("review-queue", queue.slice(0, 12));
    }
  }

  document.getElementById("review-start-btn").addEventListener("click", () => {
    const queue = getReviewQueue(10);
    if (queue.length === 0) { showToast("Nothing to review yet — go practice!"); return; }
    goTo("trivia");
    startSession({ mode: "mixed", reviewIds: queue, count: queue.length, sourceView: "review" });
  });

  /* =======================================================================
     NO TRANSLATION MODE toggle
     ======================================================================= */
  const ntSwitch = document.getElementById("no-translation-switch");
  function renderNTSwitch() {
    ntSwitch.classList.toggle("on", state.noTranslation);
  }
  ntSwitch.addEventListener("click", () => {
    state.noTranslation = !state.noTranslation;
    saveState();
    renderNTSwitch();
    showToast(state.noTranslation ? "🚫 No Translation Mode ON" : "Support mode ON — interpretations visible");
  });

  /* =======================================================================
     INIT
     ======================================================================= */
  function init() {
    renderNTSwitch();
    updateTopbar();
    goTo("home");
  }

  init();
})();
