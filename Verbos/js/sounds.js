/* ==========================================================
   SONIDOS
   Efectos generados en el navegador.
   ========================================================== */

/* ---------- Sonidos (sin archivos: se generan en el navegador) ---------- */
let audioCtx;
function tone(freq, start, dur, type, vol) {
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const t0 = audioCtx.currentTime + start;
        const osc = audioCtx.createOscillator(), g = audioCtx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(g); g.connect(audioCtx.destination);
        osc.start(t0); osc.stop(t0 + dur + 0.05);
    } catch (e) {}
}
const playCorrect = () => { tone(988, 0, 0.18, 'sine', 0.22); tone(1319, 0.1, 0.5, 'sine', 0.22); };   // ¡ding!
const playLearning = () => { tone(523, 0, 0.16, 'sine', 0.2); tone(659, 0.12, 0.35, 'sine', 0.2); };
const playDone = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, i === 3 ? 0.6 : 0.2, 'sine', 0.22));
const playWrong = () => { tone(196, 0, 0.2, 'triangle', 0.25); tone(147, 0.16, 0.35, 'triangle', 0.25); }; // buzz suave
