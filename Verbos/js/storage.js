/* ==========================================================
   ALMACENAMIENTO Y PROGRESO
   localStorage, favoritos, eliminados, fallos, racha máxima.
   ========================================================== */

/* ---------- Almacenamiento local (funciona con o sin datos guardados) ---------- */
const store = (() => {
    const mem = {};
    let ok = true;
    try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { ok = false; }
    return {
        get persistent() { return ok; },
        get(k) { try { return ok ? localStorage.getItem(k) : (k in mem ? mem[k] : null); } catch (e) { return null; } },
        set(k, v) { if (ok) { try { localStorage.setItem(k, v); return; } catch (e) { ok = false; } } mem[k] = v; }
    };
})();

const FAV_KEY = 'nec_verblab_favs';
const NAME_KEY = 'nec_verblab_name';
const TEACHER_WA = '50583267703'; // WhatsApp que recibe las listas
const STATUSES = [
    { id: 'new', label: 'Nuevo', icon: 'fa-seedling' },
    { id: 'learning', label: 'Aprendiendo', icon: 'fa-dumbbell' },
    { id: 'done', label: 'Listo', icon: 'fa-circle-check' }
];
const vKey = v => (v.phrasal ? 'pv:' : '') + v.infinitive.toLowerCase();   // los phrasal llevan prefijo: no chocan con los verbos

// Versión del formato de los datos guardados. Si algún día cambias la estructura,
// sube este número y agrega un paso en migrateData() para convertir lo viejo.
const SCHEMA = 1;
function migrateData(data) {
    // if (data.v < 2) { ...convertir a formato 2...; data.v = 2; }
    return data;
}

let orphans = {}; // favoritos de verbos que hoy no están en la base: se conservan por si vuelven
function loadFavs() {
    try {
        const raw = store.get(FAV_KEY);
        if (!raw) return {};                                   // primera vez: sin datos
        const data = migrateData(JSON.parse(raw));
        const src = data && typeof data.favs === 'object' && data.favs ? data.favs : {};
        const valid = new Set(allItems.map(vKey));
        const out = {};
        Object.keys(src).forEach(k => {
            const e = src[k];
            if (!e || typeof e !== 'object') return;
            if (valid.has(k)) out[k] = { s: STATUSES.some(st => st.id === e.s) ? e.s : 'new', t: Number(e.t) || 0, u: Number(e.u) || 0 };
            else orphans[k] = e;
        });
        return out;
    } catch (e) { return {}; }
}
let favs = loadFavs();
// Aviso interno: cada vez que algo cambia, la sincronización con la nube (si existe) se entera
const notifySync = () => { try { document.dispatchEvent(new Event('verblab-changed')); } catch (e) {} };
const saveFavs = () => { store.set(FAV_KEY, JSON.stringify({ v: SCHEMA, favs: { ...orphans, ...favs } })); notifySync(); };
// Verbos que el alumno quitó de favoritos (para que no reaparezcan al sincronizar con otro dispositivo)
const DEL_KEY = 'nec_verblab_deleted';
function loadDeleted() {
    try { const o = JSON.parse(store.get(DEL_KEY) || '{}'), out = {}; Object.keys(o).forEach(k => { const n = Number(o[k]); if (n > 0) out[k] = n; }); return out; }
    catch (e) { return {}; }
}
let deleted = loadDeleted();
const saveDeleted = () => store.set(DEL_KEY, JSON.stringify(deleted));
const favCountTotal = () => Object.keys(favs).length;
const doneTotal = () => Object.keys(favs).filter(k => favs[k].s === 'done').length;
function updateStats() {
    $('favBadge').textContent = favCountTotal() || '';
    $('listFavBadge').textContent = favCountTotal() ? ' · ' + favCountTotal() : '';
    $('doneCount').textContent = doneTotal();
    renderProgress();
}

function progressHTML() {
    const n = favCountTotal(), d = doneTotal(), pct = n ? Math.round(d / n * 100) : 0;
    return `<div class="progress-label"><span><strong>${d}</strong> de <strong>${n}</strong> favoritos listos</span><span>${pct}%</span></div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="progress-fill" style="width:${pct}%"></div></div>`;
}
function renderProgress() {
    const has = favCountTotal() > 0;
    $('favProgress').innerHTML = has ? progressHTML() : '';
    $('homeProgress').innerHTML = has
        ? progressHTML()
        : '<button class="progress-invite" onclick="showVerbList()"><i class="far fa-heart"></i> Guarda tu primer verbo con el corazón</button>';
}

/* ---------- Verbos que cuestan: 2 fallos del mismo verbo → pasa solo a Aprendiendo ---------- */
const MISS_KEY = 'nec_verblab_misses';
function loadMisses() {
    try {
        const o = JSON.parse(store.get(MISS_KEY) || '{}'), out = {};
        Object.keys(o).forEach(k => { const n = parseInt(o[k], 10); if (n > 0) out[k] = n; });
        return out;
    } catch (e) { return {}; }
}
let misses = loadMisses();
function registerMiss(v) {
    const k = vKey(v);
    misses[k] = (misses[k] || 0) + 1;
    store.set(MISS_KEY, JSON.stringify(misses)); notifySync();
    if (misses[k] % 2 !== 0) return;              // cada 2do fallo
    const f = favs[k];
    if (!f || f.s === 'learning') return;          // solo aplica a favoritos; si ya está en Aprendiendo no hace nada
    f.s = 'learning'; f.u = Date.now();
    saveFavs();
    refreshFavUI(k);
    setTimeout(() => celebrate(v.infinitive, 'learning', true), 900); // después del sonido de error
}

const BEST_KEY = 'nec_verblab_best_streak';
const getBest = () => { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } };
const setBest = n => { try { localStorage.setItem(BEST_KEY, String(n)); } catch (e) {} notifySync(); };
