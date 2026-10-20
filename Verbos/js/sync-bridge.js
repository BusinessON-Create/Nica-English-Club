/* ==========================================================
   SINCRONIZACIÓN (puente)
   Lógica de combinar datos; firebase-sync.js solo lee y escribe.
   ========================================================== */

/* ---------- Sincronización (puente con la nube) ----------
   Aquí vive TODA la lógica de combinar datos; el módulo de Firebase (al final del archivo)
   solo lee y escribe. Regla de oro: nunca se reemplaza, siempre se COMBINA, y gana lo más reciente. */
const OWNER_KEY = 'nec_verblab_owner', STASH_PREFIX = 'nec_verblab_stash_';
const stable = o => JSON.stringify(o, (k, v) => v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((a, x) => (a[x] = v[x], a), {}) : v);
function mergeProgress(L, R) {
    L = L || {}; R = R || {};
    const fl = L.favs || {}, fr = R.favs || {}, dl = L.deleted || {}, dr = R.deleted || {};
    const out = { favs: {}, deleted: {}, misses: {}, best: Math.max(Number(L.best) || 0, Number(R.best) || 0), name: String(L.name || R.name || '').slice(0, 40) };
    const ts = e => e && typeof e === 'object' ? (Number(e.u) || Number(e.t) || 1) : 0;
    const fromRemote = new Set(), cutoff = Date.now() - 90 * 864e5;
    new Set([...Object.keys(fl), ...Object.keys(fr), ...Object.keys(dl), ...Object.keys(dr)]).forEach(k => {
        const tl = ts(fl[k]), tr = ts(fr[k]), td = Math.max(Number(dl[k]) || 0, Number(dr[k]) || 0), tf = Math.max(tl, tr);
        const win = tl >= tr ? fl[k] : fr[k];
        if (win && tf >= td) {
            out.favs[k] = { s: STATUSES.some(x => x.id === win.s) ? win.s : 'new', t: Number(win.t) || tf, u: tf };
            if (tr > tl) fromRemote.add(k);
        } else if (td > cutoff) out.deleted[k] = td;
    });
    const ml = L.misses || {}, mr = R.misses || {};
    new Set([...Object.keys(ml), ...Object.keys(mr)]).forEach(k => {
        const n = Math.max(parseInt(ml[k], 10) || 0, parseInt(mr[k], 10) || 0);
        const reset = out.favs[k] && out.favs[k].s === 'done' && fromRemote.has(k); // lo marcó Listo en otro dispositivo: fallos desde cero
        if (n > 0 && !reset) out.misses[k] = n;
    });
    return out;
}
const syncSnapshot = () => ({ favs: { ...orphans, ...favs }, deleted: { ...deleted }, misses: { ...misses }, best: getBest(), name: store.get(NAME_KEY) || '' });
let syncId = null, stash = null;
function refreshAfterSync() {
    updateStats(); updateSetup();
    $('bestStreak').textContent = getBest();
    if (!$('favSection').classList.contains('hidden')) { $('studentName').value = store.get(NAME_KEY) || ''; renderFavs(); }
    if (!$('verbListSection').classList.contains('hidden')) renderVerbs();
    if (!$('gameZone').classList.contains('hidden')) syncGameFav();
}
function applyProgress(m) {
    store.set(FAV_KEY, JSON.stringify({ v: SCHEMA, favs: m.favs }));
    orphans = {}; favs = loadFavs();
    deleted = { ...m.deleted }; saveDeleted();
    misses = { ...m.misses }; store.set(MISS_KEY, JSON.stringify(misses));
    if (m.best !== getBest()) { try { localStorage.setItem(BEST_KEY, String(m.best)); } catch (e) {} }
    if (m.name !== (store.get(NAME_KEY) || '')) store.set(NAME_KEY, m.name);
    refreshAfterSync();
}
window.VerbLabBridge = {
    merge: mergeProgress, stable,
    // Dispositivo compartido: si entra otro alumno, los datos del anterior se guardan aparte y no se mezclan
    begin(id) {
        const o = store.get(OWNER_KEY);
        if (o && o !== id) {
            try { localStorage.setItem(STASH_PREFIX + o, JSON.stringify(syncSnapshot())); } catch (e) {}
            applyProgress({ favs: {}, deleted: {}, misses: {}, best: 0, name: '' });
        }
        store.set(OWNER_KEY, id); syncId = id;
        try { const x = localStorage.getItem(STASH_PREFIX + id); stash = x ? JSON.parse(x) : null; } catch (e) { stash = null; }
    },
    // Combina lo local con lo de la nube, actualiza la pantalla si algo cambió y devuelve el resultado
    reconcile(remote) {
        const cur = syncSnapshot(), merged = mergeProgress(stash ? mergeProgress(cur, stash) : cur, remote);
        if (stable(merged) !== stable(mergeProgress(cur, null))) applyProgress(merged);
        return merged;
    },
    clearStash() { if (stash) { stash = null; try { localStorage.removeItem(STASH_PREFIX + syncId); } catch (e) {} } },
    // Silencioso: solo avisa si la nube falla; el alumno no ve nada mientras todo va bien
    status(kind) {
        const w = $('syncWarn');
        if (kind === 'error') { w.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Sin conexión: tu progreso queda en este dispositivo y se guardará en tu cuenta cuando vuelvas a conectarte.'; w.classList.remove('hidden'); }
        else if (kind === 'ok') w.classList.add('hidden');
    }
};
