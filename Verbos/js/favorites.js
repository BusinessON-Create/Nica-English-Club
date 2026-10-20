/* ==========================================================
   FAVORITOS
   Corazón, estados, avisos, guía y deshacer.
   ========================================================== */

let toastTimer;
function celebrate(name, st, auto) {
    const t = $('toast'), done = st === 'done';
    clearTimeout(toastTimer);
    t.classList.remove('show');
    t.className = 'toast ' + st;
    t.innerHTML = `<span class="ti"><i class="fas ${done ? 'fa-circle-check' : 'fa-dumbbell'}"></i></span>
        <span class="tx"><strong>${done ? '¡' + esc(name) + ' está listo!' : esc(name) + ' pasó a Aprendiendo'}</strong>
        <span>${done ? 'Lo moviste a tu lista de Listo' : auto ? 'Lo fallaste dos veces: lo regresamos a Aprendiendo' : 'Sigue practicándolo, vas bien'}</span></span>`;
    if (done) {
        const colors = ['#22c55e', '#FACC15', '#60a5fa', '#f472b6', '#f5f2ee'];
        for (let i = 0; i < 16; i++) {
            const c = document.createElement('i');
            c.className = 'confetti';
            c.style.background = colors[i % colors.length];
            c.style.setProperty('--dx', (Math.random() * 200 - 60) + 'px');
            c.style.setProperty('--dy', (-30 - Math.random() * 90) + 'px');
            c.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
            t.appendChild(c);
        }
    }
    void t.offsetWidth; // reinicia la animación
    t.classList.add('show');
    done ? playDone() : playLearning();
    if (navigator.vibrate) { try { navigator.vibrate(done ? [30, 40, 60] : 30); } catch (e) {} }
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function setHeart(btn, on) {
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on);
    btn.setAttribute('aria-label', on ? 'Quitar de favoritos' : 'Guardar en favoritos');
    const i = btn.querySelector('i');
    if (i) i.className = (on ? 'fas' : 'far') + ' fa-heart';
}
function syncGameFav() {
    const v = selectedVerbs && selectedVerbs[currentIndex];
    if (!v) return;
    $('gameFav').dataset.fav = vKey(v);
    setHeart($('gameFav'), !!favs[vKey(v)]);
}
function refreshFavUI(k) {
    updateStats();
    if (!$('favSection').classList.contains('hidden')) renderFavs();
    document.querySelectorAll('#verbsGrid [data-fav]').forEach(b => { if (b.dataset.fav === k) setHeart(b, !!favs[k]); });
    syncGameFav();
    if (!$('setupZone').classList.contains('hidden')) updateSetup();
}
function toggleFav(k) {
    const now = Date.now();
    if (favs[k]) { delete favs[k]; deleted[k] = now; }
    else { favs[k] = { s: 'new', t: now, u: now }; delete deleted[k]; }
    saveDeleted();
    saveFavs();
    refreshFavUI(k);
}
/* ---------- Guía de uso ---------- */
let guideReturnFocus = null;
function openGuide() {
    guideReturnFocus = document.activeElement;
    $('guideOverlay').classList.remove('hidden');
    document.body.classList.add('guide-open');
    $('guideClose').focus();
}
function closeGuide() {
    $('guideOverlay').classList.add('hidden');
    document.body.classList.remove('guide-open');
    if (guideReturnFocus && guideReturnFocus.focus) guideReturnFocus.focus();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('guideOverlay').classList.contains('hidden')) closeGuide(); });

function favUndoToast(k) {
    const v = allItems.find(x => vKey(x) === k); if (!v) return;
    const t = $('toast');
    clearTimeout(toastTimer);
    t.className = 'toast has-undo';
    t.innerHTML = `<span class="ti"><i class="fas fa-heart"></i></span>
        <span class="tx"><strong>${esc(v.infinitive)}</strong><span>Guardado en Mis favoritos</span></span>
        <button class="undo-btn" type="button">Deshacer</button>`;
    t.querySelector('.undo-btn').onclick = () => {
        if (favs[k]) toggleFav(k);
        if (!$('verbListSection').classList.contains('hidden')) renderVerbs();
        t.classList.remove('show');
    };
    void t.offsetWidth;
    t.classList.add('show');
    toastTimer = setTimeout(() => t.classList.remove('show'), 4500);
}
function setStatus(k, st) {
    if (!favs[k] || !STATUSES.some(x => x.id === st)) return;
    const changed = favs[k].s !== st;
    favs[k].s = st; favs[k].u = Date.now();
    if (changed && st === 'done' && misses[k]) { delete misses[k]; store.set(MISS_KEY, JSON.stringify(misses)); } // conteo de fallos desde cero
    saveFavs();
    refreshFavUI(k);
    if (changed && st !== 'new') celebrate(allItems.find(v => vKey(v) === k).infinitive, st);
}
document.addEventListener('click', e => {
    const f = e.target.closest('[data-fav]');
    if (f && f.dataset.fav) {
        const k = f.dataset.fav, card = f.closest('#verbsGrid .verb-card');
        if (card && !favs[k]) {                                   // se guarda desde la Base: desaparece de la lista
            toggleFav(k);
            card.classList.add('fading');
            setTimeout(renderVerbs, 280);
            favUndoToast(k);
            return;
        }
        toggleFav(k); return;
    }
    const st = e.target.closest('[data-status]');
    if (st) setStatus(st.dataset.verb, st.dataset.status);
});
