/* ==========================================================
   UTILIDADES
   $, esc, shuffle y voz (speak).
   ========================================================== */

/* ---------- Utilidades ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shuffle = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

function speak(t) {
    if (!t || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(t.replace('/', ' or '));
    msg.lang = 'en-US';
    msg.rate = 1.0;
    window.speechSynthesis.speak(msg);
}
// Un solo listener para todo el audio (evita romper el HTML con apóstrofes)
document.addEventListener('click', e => {
    const el = e.target.closest('[data-speak]');
    if (el) speak(el.dataset.speak);
});
