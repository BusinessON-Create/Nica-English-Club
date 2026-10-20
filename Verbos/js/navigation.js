/* ==========================================================
   NAVEGACIÓN
   Cambio entre pantallas.
   ========================================================== */

/* ---------- Navegación ---------- */
function hideAll() {
    ['welcomeScreen', 'verbListSection', 'favSection', 'gameContainer'].forEach(id => $(id).classList.add('hidden'));
}
function backToMain() {
    clearInterval(timerInterval);
    cancelVerbSpeak();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    hideAll();
    $('welcomeScreen').classList.remove('hidden');
    $('bestStreak').textContent = getBest();
    updateStats();
    window.scrollTo(0, 0);
    applyUpdate();
}
function showSetup() {
    hideAll();
    $('gameContainer').classList.remove('hidden');
    resetToSetup();
}
function resetToSetup() {
    clearInterval(timerInterval);
    cancelVerbSpeak();
    $('setupZone').classList.remove('hidden');
    $('gameZone').classList.add('hidden');
    $('resultsZone').classList.add('hidden');
    updateSetup();
    window.scrollTo(0, 0);
}
