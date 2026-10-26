/* ==========================================================
   INICIO
   Arranque: contadores iniciales. Debe cargarse al final.
   ========================================================== */

/* ---------- Inicio ---------- */
$('verbCount').textContent = verbsDatabase.length;
$('irrCount').textContent = verbsDatabase.filter(v => v.irregular).length;
$('bestStreak').textContent = getBest();
updateStats();
$('year').textContent = new Date().getFullYear();
$('appVer').textContent = 'v' + APP_VERSION;
checkForUpdate();
