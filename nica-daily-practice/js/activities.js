/* ============================================================
   ACTIVITIES
   One render function per module type. Each function receives
   the module's `data` object and the container element, and is
   responsible for its own interactivity. Nothing here reads
   Firestore — activities are stateless practice, only the
   Final Speaking Mission + Mark Completed touch the database.
   ============================================================ */

const MODULE_LABELS = {
  vocabulary: "VOCABULARY",
  multipleChoice: "MULTIPLE CHOICE",
  completeSentence: "COMPLETE THE SENTENCE",
  sentenceBuilder: "SENTENCE BUILDER",
  listening: "LISTENING",
  errorCorrection: "ERROR CORRECTION",
  speakingQuestions: "SPEAKING QUESTIONS",
  makeItPersonal: "MAKE IT PERSONAL",
  realLifeConversation: "REAL LIFE ENGLISH"
};

function normalize(str) {
  return (str || "").toLowerCase().trim()
    .replace(/[.,!?']/g, "")
    .replace(/\s+/g, " ");
}

function answerMatches(input, answers) {
  const n = normalize(input);
  return answers.some(a => normalize(a) === n);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function moduleShell(type) {
  return `<div class="module-kicker">${MODULE_LABELS[type] || type}</div>`;
}

const Activities = {
  render(module, container) {
    const fn = this[module.type];
    if (!fn) {
      container.innerHTML = `<p class="helper-text">Unknown module type: ${module.type}</p>`;
      return;
    }
    fn.call(this, module.data, container);
  },

  vocabulary(data, el) {
    el.innerHTML = moduleShell("vocabulary") + data.words.map(w => `
      <div class="vocab-item">
        <div class="vocab-word">${w.word}</div>
        <div class="vocab-meaning">${w.meaning}</div>
        <div class="vocab-example">"${w.example}"</div>
      </div>`).join("");
  },

  multipleChoice(data, el) {
    el.innerHTML = moduleShell("multipleChoice") + `
      <p style="font-size:16px;">${data.question}</p>
      <div class="option-list">
        ${data.options.map((opt, i) => `<button class="option-btn" data-i="${i}">${opt}</button>`).join("")}
      </div>
      <div class="feedback-line" id="fb"></div>`;

    el.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        el.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
        if (i === data.correctIndex) {
          btn.classList.add("correct");
          el.querySelector("#fb").className = "feedback-line good";
          el.querySelector("#fb").textContent = data.feedback || "Correct!";
        } else {
          btn.classList.add("incorrect");
          el.querySelectorAll(".option-btn")[data.correctIndex].classList.add("correct");
          el.querySelector("#fb").className = "feedback-line bad";
          el.querySelector("#fb").textContent = "Not quite — the correct answer is highlighted.";
        }
      });
    });
  },

  completeSentence(data, el) {
    el.innerHTML = moduleShell("completeSentence") + `
      <p style="font-size:16px;">${data.sentence}</p>
      <input type="text" id="ans" placeholder="Type your answer">
      <button class="btn btn-ghost" id="check" style="margin-top:10px;">Check</button>
      <div class="feedback-line" id="fb"></div>`;

    el.querySelector("#check").addEventListener("click", () => {
      const val = el.querySelector("#ans").value;
      const fb = el.querySelector("#fb");
      if (answerMatches(val, data.answers)) {
        fb.className = "feedback-line good";
        fb.textContent = data.feedback || "Correct!";
      } else {
        fb.className = "feedback-line bad";
        fb.textContent = `Close — try: "${data.answers[0]}"`;
      }
    });
  },

  sentenceBuilder(data, el) {
    const words = shuffle(data.words);
    el.innerHTML = moduleShell("sentenceBuilder") + `
      <p class="helper-text">Tap the words in the right order.</p>
      <div class="builder-answer" id="answerArea"></div>
      <div class="word-chips" id="wordBank">
        ${words.map((w, i) => `<span class="word-chip" data-w="${w}" data-i="${i}">${w}</span>`).join("")}
      </div>
      <button class="btn btn-ghost" id="check">Check</button>
      <div class="feedback-line" id="fb"></div>
      <p class="helper-text" style="margin-top:16px;">${data.personalPrompt || ""}</p>
      <textarea rows="2" placeholder="Write your own sentence..." style="margin-top:8px;"></textarea>`;

    const answerArea = el.querySelector("#answerArea");
    const bank = el.querySelector("#wordBank");
    const built = [];

    bank.querySelectorAll(".word-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        chip.classList.add("used");
        built.push(chip.dataset.w);
        const chosen = document.createElement("span");
        chosen.className = "word-chip";
        chosen.textContent = chip.dataset.w;
        chosen.addEventListener("click", () => {
          const idx = built.indexOf(chip.dataset.w);
          if (idx > -1) built.splice(idx, 1);
          chosen.remove();
          chip.classList.remove("used");
        });
        answerArea.appendChild(chosen);
      });
    });

    el.querySelector("#check").addEventListener("click", () => {
      const fb = el.querySelector("#fb");
      if (normalize(built.join(" ")) === normalize(data.answer)) {
        fb.className = "feedback-line good";
        fb.textContent = "Perfect sentence!";
      } else {
        fb.className = "feedback-line bad";
        fb.textContent = `Try again — the sentence is: "${data.answer}"`;
      }
    });
  },

  errorCorrection(data, el) {
    el.innerHTML = moduleShell("errorCorrection") + `
      <p style="font-size:16px; color:var(--red);">${data.wrong}</p>
      <input type="text" id="ans" placeholder="Write the correct sentence">
      <button class="btn btn-ghost" id="check" style="margin-top:10px;">Check</button>
      <div class="feedback-line" id="fb"></div>`;

    el.querySelector("#check").addEventListener("click", () => {
      const fb = el.querySelector("#fb");
      if (answerMatches(el.querySelector("#ans").value, [data.correct])) {
        fb.className = "feedback-line good";
        fb.textContent = data.feedback || "Correct!";
      } else {
        fb.className = "feedback-line bad";
        fb.textContent = `Correct answer: "${data.correct}"`;
      }
    });
  },

  listening(data, el) {
    const hasAudio = !!data.audioUrl;
    el.innerHTML = moduleShell("listening") + `
      ${hasAudio
        ? `<audio id="player" src="${data.audioUrl}" style="width:100%;"></audio>
           <div class="audio-controls">
             <button class="btn btn-ghost" id="play">▶ Play</button>
             <button class="btn btn-ghost" id="slow">0.75x</button>
             <button class="btn btn-ghost" id="normal">1x</button>
           </div>`
        : `<p class="helper-text">Your coach will add an audio clip here. For now, read the situation below.</p>`}

      <div id="questions"></div>

      <button class="btn btn-ghost" id="toggleTranscript" style="margin-top:14px;">Show transcript</button>
      <div class="transcript-box" id="transcript" style="display:none;">${data.transcript}</div>

      ${data.shadowingSentences && data.shadowingSentences.length ? `
        <div style="margin-top:20px;">
          <div class="module-kicker">SHADOWING PRACTICE</div>
          <p class="helper-text">Listen to each sentence, then repeat it out loud.</p>
          ${data.shadowingSentences.map((s, i) => `
            <div class="audio-controls" style="margin-top:8px;">
              <span style="flex:1;">${s}</span>
              <button class="btn btn-ghost shadow-btn" data-s="${i}">🔊 Listen</button>
            </div>`).join("")}
        </div>` : ""}
    `;

    if (hasAudio) {
      const player = el.querySelector("#player");
      el.querySelector("#play").addEventListener("click", () => player.play());
      el.querySelector("#slow").addEventListener("click", () => { player.playbackRate = 0.75; player.play(); });
      el.querySelector("#normal").addEventListener("click", () => { player.playbackRate = 1; player.play(); });
    }

    el.querySelector("#toggleTranscript").addEventListener("click", (e) => {
      const box = el.querySelector("#transcript");
      const show = box.style.display === "none";
      box.style.display = show ? "block" : "none";
      e.target.textContent = show ? "Hide transcript" : "Show transcript";
    });

    el.querySelectorAll(".shadow-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sentence = data.shadowingSentences[Number(btn.dataset.s)];
        if ("speechSynthesis" in window) {
          const utter = new SpeechSynthesisUtterance(sentence);
          utter.lang = "en-US";
          utter.rate = 0.85;
          window.speechSynthesis.speak(utter);
        }
      });
    });

    const qContainer = el.querySelector("#questions");
    (data.questions || []).forEach((q, i) => {
      const wrap = document.createElement("div");
      wrap.style.marginTop = "16px";
      if (q.type === "multipleChoice") {
        wrap.innerHTML = `<p>${q.question}</p><div class="option-list">
          ${q.options.map((o, oi) => `<button class="option-btn" data-oi="${oi}">${o}</button>`).join("")}
        </div><div class="feedback-line"></div>`;
        qContainer.appendChild(wrap);
        wrap.querySelectorAll(".option-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            wrap.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            const correct = Number(btn.dataset.oi) === q.correctIndex;
            btn.classList.add(correct ? "correct" : "incorrect");
            if (!correct) wrap.querySelectorAll(".option-btn")[q.correctIndex].classList.add("correct");
            const fb = wrap.querySelector(".feedback-line");
            fb.className = "feedback-line " + (correct ? "good" : "bad");
            fb.textContent = correct ? "Correct!" : "Not quite.";
          });
        });
      } else if (q.type === "trueFalse") {
        wrap.innerHTML = `<p>${q.question}</p><div class="option-list">
          <button class="option-btn" data-v="true">True</button>
          <button class="option-btn" data-v="false">False</button>
        </div><div class="feedback-line"></div>`;
        qContainer.appendChild(wrap);
        wrap.querySelectorAll(".option-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            wrap.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            const val = btn.dataset.v === "true";
            const correct = val === q.correctAnswer;
            btn.classList.add(correct ? "correct" : "incorrect");
            const fb = wrap.querySelector(".feedback-line");
            fb.className = "feedback-line " + (correct ? "good" : "bad");
            fb.textContent = correct ? "Correct!" : `Correct answer: ${q.correctAnswer ? "True" : "False"}`;
          });
        });
      } else if (q.type === "completeSentence") {
        wrap.innerHTML = `<p>${q.question}</p>
          <input type="text" placeholder="Type your answer">
          <button class="btn btn-ghost" style="margin-top:8px;">Check</button>
          <div class="feedback-line"></div>`;
        qContainer.appendChild(wrap);
        wrap.querySelector("button").addEventListener("click", () => {
          const fb = wrap.querySelector(".feedback-line");
          const ok = answerMatches(wrap.querySelector("input").value, q.answers);
          fb.className = "feedback-line " + (ok ? "good" : "bad");
          fb.textContent = ok ? "Correct!" : `Correct answer: "${q.answers[0]}"`;
        });
      }
    });
  },

  speakingQuestions(data, el) {
    let idx = 0;
    const renderQ = () => {
      el.innerHTML = moduleShell("speakingQuestions") + `
        <p style="font-size:17px; font-family:'Playfair Display',serif;">${data.questions[idx]}</p>
        <div class="audio-controls">
          <button class="btn btn-ghost" id="prev" ${idx === 0 ? "disabled" : ""}>← Previous</button>
          <button class="btn btn-ghost" id="next" ${idx === data.questions.length - 1 ? "disabled" : ""}>Next →</button>
        </div>
        ${data.ideas && data.ideas.length ? `
          <button class="btn btn-ghost" id="ideas" style="margin-top:10px;">Show ideas</button>
          <div class="hint-chips" id="ideaChips" style="display:none;">
            ${data.ideas.map(w => `<span class="hint-chip">${w}</span>`).join("")}
          </div>` : ""}
        <p class="helper-text" style="margin-top:14px;">Question ${idx + 1} of ${data.questions.length} — answer out loud.</p>
      `;
      el.querySelector("#prev")?.addEventListener("click", () => { idx--; renderQ(); });
      el.querySelector("#next")?.addEventListener("click", () => { idx++; renderQ(); });
      el.querySelector("#ideas")?.addEventListener("click", () => {
        el.querySelector("#ideaChips").style.display = "flex";
      });
    };
    renderQ();
  },

  makeItPersonal(data, el) {
    el.innerHTML = moduleShell("makeItPersonal") + `
      <p style="font-size:17px; font-family:'Playfair Display',serif; color:var(--gold3);">${data.prompt}</p>
      ${data.helper ? `<p class="helper-text">${data.helper}</p>` : ""}
      <textarea rows="3" placeholder="Write your sentence..." style="margin-top:12px;"></textarea>`;
  },

  realLifeConversation(data, el) {
    let idx = 0;
    const render = () => {
      const bubbles = data.exchanges.slice(0, idx + 1).map(ex => `
        <div class="chat-bubble"><div class="who">COACH</div>${ex.coach}</div>
      `).join("");
      el.innerHTML = moduleShell("realLifeConversation") + `
        <p style="font-family:'Playfair Display',serif; font-size:18px; color:var(--gold3); margin-bottom:14px;">
          Situation: ${data.situation}
        </p>
        ${bubbles}
        <textarea rows="2" placeholder="Type or say your response..." style="margin-bottom:10px;"></textarea>
        ${idx < data.exchanges.length - 1
          ? `<button class="btn btn-ghost" id="next">Continue conversation →</button>`
          : `<p class="helper-text">End of conversation. Great practice!</p>`}
      `;
      el.querySelector("#next")?.addEventListener("click", () => { idx++; render(); });
    };
    render();
  }
};
