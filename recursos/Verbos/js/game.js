/* ==========================================================
   TRIVIA
   Selección de verbos, preguntas, temporizador y resultados.
   ========================================================== */

function pickVerbs(pool, n, weighted) {
    const sh = shuffle(pool);
    if (!weighted) return sh.slice(0, n);
    // ~1 de cada 3 preguntas sale de los verbos que más le cuestan (los "Listo" no cuentan)
    const hard = sh.filter(v => misses[vKey(v)] > 0 && !(favs[vKey(v)] && favs[vKey(v)].s === 'done'));
    const want = Math.min(hard.length, Math.round(n / 3));
    const picked = hard.slice(0, want);
    const rest = sh.filter(v => !picked.includes(v));
    return shuffle([...picked, ...rest.slice(0, n - want)]);
}


/* ---------- Trivia ---------- */
let currentMode, selectedVerbs, currentIndex, score, lives, currentTask, streak, maxStreak, total, answered;
let timerInterval, timeLeft;

// Grupos de sinónimos en español: evita que dos respuestas correctas aparezcan a la vez
const SYN = [['empezar', 'comenzar'], ['terminar', 'finalizar', 'acabar'], ['mirar', 'observar'], ['hablar', 'conversar'], ['escoger', 'elegir'], ['arreglar', 'reparar'], ['responder', 'contestar']];
function transKey(t) {
    const k = t.toLowerCase().split(/[ (\/]/)[0];
    const g = SYN.findIndex(grp => grp.includes(k));
    return g >= 0 ? 'syn' + g : k;
}

const LABELS = {
    translation: 'Traducción correcta',
    past: 'Forma en pasado simple',
    participle: 'Forma en participio'
};

const getLength = n => $('lengthSelect').value === 'all' ? n : Math.min(n, parseInt($('lengthSelect').value, 10));
function setupPool() {
    if ($('sourceSelect').value === 'favs') {
        const st = $('favStatusSelect').value || 'all';
        return allItems.filter(v => { const f = favs[vKey(v)]; return f && (st === 'all' || f.s === st); });
    }
    const type = $('typeSelect').value;
    if (type === 'phrasal') return phrasalDatabase;
    return verbsDatabase.filter(v => type === 'all' || (type === 'irregular') === v.irregular);
}
function updateSetup() {
    const practice = $('sourceSelect').value === 'favs';
    $('typeField').classList.toggle('hidden', practice);
    $('favStatusField').classList.toggle('hidden', !practice);

    const sel = $('favStatusSelect'), cur = sel.value || 'all';
    sel.innerHTML = [{ id: 'all', label: 'Todos mis favoritos' }, ...STATUSES].map(st => {
        const n = Object.keys(favs).filter(k => st.id === 'all' || favs[k].s === st.id).length;
        return `<option value="${st.id}">${st.label} (${n})</option>`;
    }).join('');
    sel.value = cur;

    const poolN = setupPool().length;
    const allOpt = $('lengthSelect').querySelector('option[value="all"]');
    if (allOpt) allOpt.textContent = `${$('sourceSelect').value !== 'favs' && $('typeSelect').value === 'phrasal' ? 'Todos los phrasal verbs' : 'Todos los verbos'} (${poolN})`;

    const note = $('setupNote'), btn = $('startBtn');
    btn.disabled = false;
    note.classList.toggle('hidden', !practice);
    if (practice) {
        const n = setupPool().length;
        if (!n) {
            btn.disabled = true;
            note.textContent = favCountTotal()
                ? 'No tienes verbos con ese estado. Elige otro o cambia el estado de tus favoritos.'
                : 'Aún no tienes favoritos. Guarda verbos con el corazón y vuelve a practicar.';
        } else {
            const q = getLength(n);
            note.textContent = `Práctica de ${q} pregunta${q === 1 ? '' : 's'} solo con tus verbos.`;
        }
    }
}

function startGame() {
    currentMode = $('modeSelect').value;

    let pool = setupPool();
    if (!pool.length) return;
    total = getLength(pool.length);
    selectedVerbs = pickVerbs(pool, total, $('sourceSelect').value !== 'favs');
    total = selectedVerbs.length;

    currentIndex = 0; score = 0; lives = 3; streak = 0; maxStreak = 0;
    $('totalNum').textContent = total;
    $('setupZone').classList.add('hidden');
    $('resultsZone').classList.add('hidden');
    $('gameZone').classList.remove('hidden');
    $('streakBadge').classList.add('hidden');
    updateLives();
    showQuestion();
}

function generateOptions(v, task) {
    const correct = v[task];
    const keyOf = task === 'translation' ? transKey : s => s.toLowerCase();
    let pool = (v.phrasal ? phrasalDatabase : verbsDatabase).filter(x => x !== v);
    if (task !== 'translation') {
        // Distractores del mismo grupo (irregular con irregular) para que el reto sea real
        const same = pool.filter(x => x.irregular === v.irregular);
        if (same.length >= 20) pool = same;
    }
    const seen = new Set([keyOf(correct)]);
    const picked = [];
    for (const x of shuffle(pool)) {
        const val = x[task], k = keyOf(val);
        if (seen.has(k)) continue;
        seen.add(k); picked.push(val);
        if (picked.length === 3) break;
    }
    return shuffle([correct, ...picked]);
}

// Listening: formas del mismo verbo; las que suenan igual se unen en un solo botón
const FORMS = [['infinitive', 'Infinitivo'], ['past', 'Pasado'], ['participle', 'Participio'], ['thirdPerson', '3ra persona'], ['gerund', 'Gerundio']];
function listenQuestion(v) {
    const groups = [];
    FORMS.forEach(([key, label]) => {
        const text = v[key]; if (!text) return;
        const g = groups.find(x => x.text.toLowerCase() === text.toLowerCase());
        if (g) g.labels.push(label); else groups.push({ text, labels: [label], keys: [key] });
        if (g) g.keys.push(key);
    });
    const played = groups[Math.floor(Math.random() * groups.length)];
    return { options: shuffle(groups.map(g => ({ text: g.text, sub: g.labels.join(' / ') }))), correct: played.text, sub: played.labels.join(' / ') };
}
let listenText = '', currentCorrect = '', listenSub = '';
function playListen() {
    if (!listenText) return;
    const b = $('listenBtn'); b.classList.remove('playing'); void b.offsetWidth; b.classList.add('playing');
    speak(listenText);
}
$('listenBtn').addEventListener('click', playListen);

let verbSpeakTimer;
const VERB_DELAY = 2000; // el verbo se pronuncia 2 s después de aparecer
const cancelVerbSpeak = () => clearTimeout(verbSpeakTimer);

function showQuestion() {
    answered = false;
    cancelVerbSpeak();
    const v = selectedVerbs[currentIndex];
    currentTask = currentMode === 'mixed'
        ? ['translation', 'past', 'participle', 'listen'][Math.floor(Math.random() * 4)]
        : currentMode;
    const listening = currentTask === 'listen';

    $('currentNum').textContent = currentIndex + 1;
    $('promptVerb').classList.toggle('hidden', listening);
    $('replayBtn').classList.toggle('hidden', listening);
    $('listenBox').classList.toggle('hidden', !listening);
    $('kbdHint').textContent = listening ? 'Atajos: teclas 1–5 para responder · Enter para continuar' : 'Atajos: teclas 1–4 para responder · Enter para continuar';
    let opts;
    if (listening) {
        const q = listenQuestion(v);
        opts = q.options; currentCorrect = q.correct; listenSub = q.sub;
        listenText = q.correct;
        $('promptVerb').textContent = '';
        $('instructionText').textContent = 'Escucha y elige la palabra correcta';
        $('listenHint').innerHTML = `Pista: <b>${esc(v.translation)}</b>`;
    } else {
        $('promptVerb').textContent = v.infinitive;
        $('instructionText').textContent = LABELS[currentTask];
        currentCorrect = v[currentTask];
        opts = generateOptions(v, currentTask);
    }
    syncGameFav();

    const grid = $('optionsGrid');
    grid.innerHTML = '';
    opts.forEach((o, idx) => {
        const opt = typeof o === 'string' ? o : o.text;
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.value = opt;
        const label = document.createElement('span');
        if (typeof o === 'string') label.textContent = opt;
        else {
            label.className = 'opt-main';
            const m = document.createElement('span'); m.textContent = opt;
            const sb = document.createElement('span'); sb.className = 'opt-sub'; sb.textContent = o.sub;
            label.append(m, sb);
        }
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-right';
        const key = document.createElement('kbd');
        key.className = 'key';
        key.textContent = idx + 1;
        btn.append(key, label, icon);
        btn.onclick = () => handleSelection(opt, btn);
        grid.appendChild(btn);
    });

    $('gameExample').classList.add('hidden');
    $('nextBtn').classList.add('hidden');
    if (listening) verbSpeakTimer = setTimeout(() => { if (!answered) playListen(); }, 500);
    else verbSpeakTimer = setTimeout(() => { if (!answered) speak(v.infinitive); }, VERB_DELAY);
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    const ticks = currentTask === 'listen' ? 150 : 100; // x 100 ms = 15 s en listening, 10 s en trivia
    timeLeft = ticks;
    const bar = $('timerBar');
    bar.style.width = '100%';
    bar.classList.remove('low');
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        bar.style.width = (timeLeft / ticks * 100) + '%';
        bar.classList.toggle('low', timeLeft / ticks < 0.3);
        if (timeLeft <= 0) { clearInterval(timerInterval); autoFail(); }
    }, 100);
}

function revealCorrect(correct) {
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.value === correct) {
            b.classList.add('option-correct');
            b.querySelector('i').className = 'fas fa-check';
        }
    });
}

function afterAnswer() {
    const v = selectedVerbs[currentIndex];
    $('exampleBox').dataset.speak = v.example;
    $('exampleBox').innerHTML = `"${esc(v.example)}"<span class="tr">${esc(v.exampleEs)}</span>`;
    $('gameExample').classList.remove('hidden');
    if (currentTask === 'listen') $('instructionText').textContent = `Era: ${currentCorrect} · ${listenSub} · ${v.translation}`;

    if (lives <= 0) {
        setTimeout(showResults, 1800);
    } else {
        $('nextLabel').textContent = currentIndex >= total - 1 ? 'Ver resultados' : 'Siguiente pregunta';
        $('nextBtn').classList.remove('hidden');
    }
}

function handleSelection(selected, btn) {
    if (answered) return;
    answered = true;
    cancelVerbSpeak();
    clearInterval(timerInterval);
    const correct = currentCorrect;

    if (selected === correct) {
        score++; streak++;
        maxStreak = Math.max(maxStreak, streak);
        btn.classList.add('option-correct');
        btn.querySelector('i').className = 'fas fa-check';
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    } else {
        lives--; streak = 0;
        btn.classList.add('option-wrong');
        btn.querySelector('i').className = 'fas fa-xmark';
        revealCorrect(correct);
        updateLives();
        registerMiss(selectedVerbs[currentIndex]);
        const box = $('gameBox');
        box.classList.add('shake');
        setTimeout(() => box.classList.remove('shake'), 350);
    }
    showStreak();
    selected === correct ? playCorrect() : playWrong();
    speakAnswer(correct);
    afterAnswer();
}

function autoFail() {
    if (answered) return;
    answered = true;
    lives--; streak = 0;
    updateLives();
    registerMiss(selectedVerbs[currentIndex]);
    showStreak();
    revealCorrect(currentCorrect);
    playWrong();
    speakAnswer(currentCorrect);
    afterAnswer();
}

// Solo se pronuncia la respuesta si está en inglés (pasado / participio); la traducción no se lee
function speakAnswer(ans) {
    if (currentTask === 'listen') return;
    if (currentTask !== 'translation') setTimeout(() => speak(ans), 450);
}
document.addEventListener('keydown', e => {
    if ($('gameContainer').classList.contains('hidden') || $('gameZone').classList.contains('hidden')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const ae = document.activeElement;
    if (ae && /^(INPUT|SELECT|TEXTAREA)$/.test(ae.tagName)) return;
    if (/^[1-5]$/.test(e.key) && !answered) {
        const b = $('optionsGrid').children[parseInt(e.key, 10) - 1];
        if (b) { e.preventDefault(); b.click(); }
    } else if ((e.key === 'Enter' || e.key === ' ') && !$('nextBtn').classList.contains('hidden')) {
        if (ae && ae.tagName === 'BUTTON' && !ae.disabled) return; // el botón enfocado ya reacciona solo
        e.preventDefault();
        $('nextBtn').click();
    }
});
$('replayBtn').addEventListener('click', () => speak(selectedVerbs[currentIndex].infinitive));

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= total) showResults();
    else showQuestion();
}

function showStreak() {
    const s = $('streakBadge');
    if (streak > 1) { s.textContent = `Racha x${streak}`; s.classList.remove('hidden'); }
    else s.classList.add('hidden');
}

function updateLives() {
    $('livesContainer').innerHTML = [0, 1, 2].map(i => `<i class="fas fa-heart ${i < lives ? '' : 'off'}"></i>`).join('');
}

function showResults() {
    clearInterval(timerInterval);
    cancelVerbSpeak();
    $('gameZone').classList.add('hidden');
    $('resultsZone').classList.remove('hidden');
    $('finalScore').textContent = `${score}/${total}`;

    const best = getBest();
    const isRecord = maxStreak > best;
    if (isRecord) setBest(maxStreak);
    $('resBest').textContent = isRecord && maxStreak > 1
        ? `Nueva mejor racha: ${maxStreak}`
        : `Tu racha en esta ronda: ${maxStreak} · Mejor racha: ${Math.max(best, maxStreak)}`;

    let icon, title;
    if (score === total) { icon = '🏆'; title = '¡Maestro supremo!'; }
    else if (lives <= 0) { icon = '💪'; title = 'Te quedaste sin vidas. Vuelve a entrenar.'; }
    else if (score / total >= 0.7) { icon = '⭐'; title = '¡Excelente puntaje!'; }
    else { icon = '📓'; title = 'A entrenar más.'; }
    $('resultIcon').textContent = icon;
    $('resTitle').textContent = title;
}
