/* ============================================================
   DAY FLOW
   Steps = [one step per module in this day] + [1 final step:
   the Speaking Mission + recorder + send + mark complete].
   ============================================================ */

const params = new URLSearchParams(location.search);
const dayNumber = Number(params.get("day") || "1");
const week = window.WEEK_CONTENT;
const dayData = week.days.find(d => d.day === dayNumber);

const root = document.getElementById("day-content");

const state = {
  stepIndex: 0,
  totalSteps: dayData ? dayData.modules.length + 1 : 1, // +1 = speaking mission step
  recordedBlob: null,
  mediaRecorder: null,
  chunks: [],
  recording: false,
  timerInterval: null,
  seconds: 0,
  audioConfirmed: false
};

function markOpened() {
  localStorage.setItem(`nica_opened_${week.id}_day${dayNumber}`, "1");
}

function renderShell() {
  root.innerHTML = `
    <div class="day-header">
      <div class="day-eyebrow">DAY ${dayData.day}</div>
      <h1>${dayData.title}</h1>
      <div class="week-tag">WEEK ${week.number} — ${week.theme.toUpperCase()}</div>
    </div>

    <div class="card goal-card">
      <div class="goal-label">TODAY'S GOAL</div>
      <p>${dayData.goal}</p>
    </div>

    <div class="step-dots" id="stepDots"></div>
    <div id="stepBody"></div>
    <div id="navButtons" style="display:flex; gap:10px; margin-top:10px;"></div>
  `;
}

function renderDots() {
  const dots = document.getElementById("stepDots");
  dots.innerHTML = "";
  for (let i = 0; i < state.totalSteps; i++) {
    const d = document.createElement("div");
    d.className = "dot " + (i < state.stepIndex ? "done" : i === state.stepIndex ? "current" : "");
    dots.appendChild(d);
  }
}

function renderNav() {
  const nav = document.getElementById("navButtons");
  const isLastModuleStep = state.stepIndex === dayData.modules.length - 1;
  const onMissionStep = state.stepIndex === dayData.modules.length;

  let html = "";
  if (state.stepIndex > 0) {
    html += `<button class="btn btn-ghost" id="prevBtn" style="flex:1;">← Back</button>`;
  }
  if (!onMissionStep) {
    html += `<button class="btn btn-gold" id="nextBtn" style="flex:2;">
      ${isLastModuleStep ? "Go to Speaking Mission →" : "Next →"}
    </button>`;
  }
  nav.innerHTML = html;

  document.getElementById("prevBtn")?.addEventListener("click", () => {
    state.stepIndex--;
    renderStep();
  });
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    state.stepIndex++;
    renderStep();
  });
}

function renderStep() {
  renderDots();
  const body = document.getElementById("stepBody");

  if (state.stepIndex < dayData.modules.length) {
    const wrap = document.createElement("div");
    wrap.className = "card module-card";
    body.innerHTML = "";
    body.appendChild(wrap);
    Activities.render(dayData.modules[state.stepIndex], wrap);
  } else {
    body.innerHTML = "";
    body.appendChild(renderMissionStep());
  }
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   FINAL SPEAKING MISSION + RECORDER + SEND
   ============================================================ */

function renderMissionStep() {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="card mission-card">
      <div class="mission-kicker">FINAL SPEAKING MISSION</div>
      <p class="instr">${dayData.speakingMission.instructions}</p>
      <div class="mission-meta">Speak for at least ${dayData.speakingMission.minTime} seconds.</div>
      ${dayData.speakingMission.hints && dayData.speakingMission.hints.length ? `
        <div class="hint-chips">
          ${dayData.speakingMission.hints.map(h => `<span class="hint-chip">${h}</span>`).join("")}
        </div>` : ""}

      <div class="recorder" id="recorderArea"></div>
    </div>
  `;

  renderRecorderIdle(wrap.querySelector("#recorderArea"));
  return wrap;
}

function renderRecorderIdle(el) {
  el.innerHTML = `
    <p class="rec-status">Complete your speaking mission and send your audio to your coach.</p>
    <button class="btn btn-gold" id="startRec">🎙 Start Recording</button>
    <div id="micHelp"></div>
  `;
  el.querySelector("#startRec").addEventListener("click", () => startRecording(el));
}

async function startRecording(el) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.chunks = [];
    state.mediaRecorder = new MediaRecorder(stream);
    state.mediaRecorder.ondataavailable = e => state.chunks.push(e.data);
    state.mediaRecorder.onstop = () => {
      state.recordedBlob = new Blob(state.chunks, { type: state.mediaRecorder.mimeType || "audio/webm" });
      stream.getTracks().forEach(t => t.stop());
      renderRecorderPreview(el);
    };
    state.mediaRecorder.start();
    state.recording = true;
    state.seconds = 0;

    el.innerHTML = `
      <p class="rec-status">Recording…</p>
      <div class="rec-timer" id="timer">00:00</div>
      <button class="btn btn-danger" id="stopRec">⏹ Stop Recording</button>
    `;
    state.timerInterval = setInterval(() => {
      state.seconds++;
      const m = String(Math.floor(state.seconds / 60)).padStart(2, "0");
      const s = String(state.seconds % 60).padStart(2, "0");
      const t = document.getElementById("timer");
      if (t) t.textContent = `${m}:${s}`;
    }, 1000);

    el.querySelector("#stopRec").addEventListener("click", () => {
      clearInterval(state.timerInterval);
      state.mediaRecorder.stop();
      state.recording = false;
    });
  } catch (err) {
    el.innerHTML = `
      <p class="rec-status">Complete your speaking mission and send your audio to your coach.</p>
      <button class="btn btn-gold" id="startRec">🎙 Start Recording</button>
      <div class="mic-permission-help">
        We couldn't access your microphone. To fix this:<br>
        <strong>Phone (Chrome/Safari):</strong> open your browser settings → Site settings → Microphone → allow it for this page.<br>
        <strong>Computer:</strong> click the lock/camera icon in the address bar and allow microphone access, then reload this page.
      </div>
    `;
    el.querySelector("#startRec").addEventListener("click", () => startRecording(el));
  }
}

function renderRecorderPreview(el) {
  const url = URL.createObjectURL(state.recordedBlob);
  const durationLabel = `${String(Math.floor(state.seconds / 60)).padStart(2, "0")}:${String(state.seconds % 60).padStart(2, "0")}`;

  el.innerHTML = `
    <p class="rec-status">Recording ready — ${durationLabel}</p>
    <audio controls src="${url}" style="width:100%; margin-bottom:12px;"></audio>
    <div class="audio-controls">
      <button class="btn btn-ghost" id="recordAgain">↻ Record Again</button>
      <button class="btn btn-gold" id="useRecording" style="flex:1;">Use This Recording</button>
    </div>
  `;

  el.querySelector("#recordAgain").addEventListener("click", () => {
    state.recordedBlob = null;
    renderRecorderIdle(el);
  });
  el.querySelector("#useRecording").addEventListener("click", () => renderSendPanel(el));
}

function buildWhatsAppUrl() {
  const number = window.NICA_SETTINGS.coachWhatsApp;
  const text = encodeURIComponent(
    `Hello Coach! I completed my Day ${dayData.day} Daily Practice. Here is my speaking challenge audio.`
  );
  return `https://wa.me/${number}?text=${text}`;
}

async function tryUploadAudio() {
  try {
    const uid = auth.currentUser.uid;
    const path = `audio/${uid}/${week.id}/day${dayData.day}.webm`;
    const ref = storage.ref().child(path);
    await ref.put(state.recordedBlob);
    return path;
  } catch (e) {
    console.warn("Audio upload failed (non-blocking):", e.message);
    return null;
  }
}

function downloadRecording() {
  const url = URL.createObjectURL(state.recordedBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `NicaEnglishClub_Day${dayData.day}.webm`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function renderSendPanel(el) {
  el.innerHTML = `<p class="rec-status">Preparing your audio…</p>`;

  const uploadedPath = await tryUploadAudio();
  downloadRecording();

  el.innerHTML = `
    <div class="send-panel">
      <div class="status-title">Ready to Send</div>
      <p class="helper-text">
        Your audio file was just downloaded to your device. Now open WhatsApp,
        and attach that audio file to the message we prepared for your coach.
      </p>
      <div class="audio-controls" style="margin-top:14px;">
        <button class="btn btn-gold" id="openWhatsApp" style="flex:1;">Open WhatsApp to Coach</button>
      </div>

      <label class="confirm-row">
        <input type="checkbox" id="sentConfirm">
        <span>I attached and sent my audio to my coach on WhatsApp.</span>
      </label>

      <button class="btn btn-gold" id="markComplete" disabled>Mark Day as Completed</button>
    </div>
  `;

  el.querySelector("#openWhatsApp").addEventListener("click", () => {
    window.open(buildWhatsAppUrl(), "_blank");
  });

  const checkbox = el.querySelector("#sentConfirm");
  const completeBtn = el.querySelector("#markComplete");
  checkbox.addEventListener("change", () => {
    completeBtn.disabled = !checkbox.checked;
  });

  completeBtn.addEventListener("click", async () => {
    completeBtn.disabled = true;
    completeBtn.textContent = "Saving…";
    try {
      await Progress.markDayCompleted(week, dayData.day, {
        audioSent: checkbox.checked,
        audioPath: uploadedPath
      });
      localStorage.removeItem(`nica_opened_${week.id}_day${dayData.day}`);
      renderCompletedPanel();
    } catch (e) {
      completeBtn.disabled = false;
      completeBtn.textContent = "Mark Day as Completed";
      alert("We couldn't save your progress. Please check your connection and try again.");
    }
  });
}

function renderCompletedPanel() {
  root.innerHTML = `
    <div class="card completed-panel">
      <div class="check">✓</div>
      <h2>Activity Completed</h2>
      <p>Great job! You practiced English today.</p>
      <a href="index.html" class="btn btn-gold" style="margin-top:20px; text-decoration:none;">Back to Dashboard</a>
    </div>
  `;
}

/* ============================================================
   INIT
   ============================================================ */
if (!dayData) {
  root.innerHTML = `<div class="empty-state">This day doesn't exist in the current week.</div>`;
} else {
  markOpened();
  renderShell();
  renderStep();
}
