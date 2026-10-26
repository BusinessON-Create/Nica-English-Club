/* ==========================================================
   AUTO-ACTUALIZACIÓN
   Compara APP_VERSION (definida en index.html) con la del servidor.
   ========================================================== */

/* ---------- Auto-actualización ----------
   Pide el index.html "fresco" al servidor (ignorando la caché) y compara APP_VERSION.
   Si hay una versión nueva: recarga sola (o espera a que termine la partida).
   Los favoritos NO se tocan: viven en localStorage, no en el archivo. */
let navigate = u => location.replace(u);
let pendingUpdate = null, lastCheck = 0;
const gameRunning = () => !$('gameContainer').classList.contains('hidden') && !$('gameZone').classList.contains('hidden');

function applyUpdate() {
    if (!pendingUpdate || gameRunning()) return;
    const v = pendingUpdate; pendingUpdate = null;
    navigate(location.pathname + '?v=' + encodeURIComponent(v)); // URL distinta = salta la caché
}
async function checkForUpdate() {
    if (window.NEC_BLOQUEADO) return;                      // seguridad.js bloqueó la página: no hacer nada
    if (!/^https?:$/.test(location.protocol) || Date.now() - lastCheck < 60000) return;
    lastCheck = Date.now();
    try {
        const r = await fetch(location.pathname + '?_=' + Date.now(), { cache: 'no-store' });
        if (!r.ok) return;
        const m = (await r.text()).match(/const APP_VERSION = '([^']+)'/);
        if (!m || m[1] === APP_VERSION) return;
        let tried = null;
        try { tried = sessionStorage.getItem('nec_upd_tried'); } catch (e) {}
        if (tried === m[1]) return;                            // evita recargas en bucle
        try { sessionStorage.setItem('nec_upd_tried', m[1]); } catch (e) {}
        pendingUpdate = m[1];
        applyUpdate();
    } catch (e) { /* sin conexión: se sigue con la versión actual */ }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) checkForUpdate(); });
