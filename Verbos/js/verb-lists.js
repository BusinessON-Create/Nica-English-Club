/* ==========================================================
   LISTAS
   Lista de verbos y lista de favoritos.
   ========================================================== */

function showVerbList() {
    hideAll();
    $('verbListSection').classList.remove('hidden');
    renderVerbs();
    window.scrollTo(0, 0);
}

/* ---------- Lista ---------- */
let listFilter = 'all';
let phrasalCat = 'all';
function setPhrasalCat(c) { phrasalCat = c; renderVerbs(); centerPhrasalChip(); }
function renderPhrasalCats() {
    const box = $('phrasalCats');
    $('phrasalCatsWrap').classList.toggle('hidden', listFilter !== 'phrasal');
    if (listFilter !== 'phrasal') return;
    box.innerHTML = PHRASAL_CATEGORIES.map(c => `<button class="chip" aria-pressed="${phrasalCat === c.id}" onclick="setPhrasalCat('${c.id}')"><i class="fas ${c.icon}"></i>${esc(c.label)}</button>`).join('');
    setTimeout(updatePhrasalArrows, 0);
}
function showPhrasalList() { listFilter = 'phrasal'; showVerbList(); document.querySelectorAll('#verbListSection .chip[data-filter]').forEach(c => c.setAttribute('aria-pressed', c.dataset.filter === 'phrasal')); }
function setListFilter(f) {
    listFilter = f;
    document.querySelectorAll('#verbListSection .chip[data-filter]').forEach(c => c.setAttribute('aria-pressed', c.dataset.filter === f));
    renderVerbs();
}

function renderVerbs() {
    const q = $('verbSearch').value.trim().toLowerCase();
    const inFilter = v => !(listFilter === 'irregular' && !v.irregular) && !(listFilter === 'regular' && v.irregular);
    const isPv = listFilter === 'phrasal';
    renderPhrasalCats();
    const base = isPv ? phrasalDatabase.filter(v => phrasalCat === 'all' || v.category === phrasalCat) : verbsDatabase.filter(inFilter);
    const visible = base.filter(v => !favs[vKey(v)]);          // los favoritos viven solo en "Mis favoritos"
    const hiddenFavs = base.length - visible.length;
    const list = visible.filter(v => !q || v.infinitive.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q) || v.past.toLowerCase().includes(q) || v.participle.toLowerCase().includes(q));
    $('listCount').textContent = `${list.length} de ${visible.length} ${isPv ? 'phrasal verbs' : 'verbos'}. Toca cualquier forma para escucharla.` + (hiddenFavs ? (hiddenFavs === 1 ? ' (1 ya está en tus favoritos)' : ` (${hiddenFavs} ya están en tus favoritos)`) : '');

    const grid = $('verbsGrid');
    if (!list.length) {
        grid.innerHTML = (!q && !visible.length && hiddenFavs)
            ? '<div style="text-align:center;"><p class="empty">¡Ya guardaste todos estos verbos en tus favoritos! 🎉</p><button class="btn btn-accent" onclick="showFavs()"><i class="fas fa-heart"></i> Ver mis favoritos</button></div>'
            : '<p class="empty">No encontramos ' + (isPv ? 'esa expresión' : 'ese verbo') + '. Prueba con otra palabra.</p>';
        return;
    }
    grid.innerHTML = list.map(v => verbCard(v, false)).join('');
}

function verbCard(v, inFavs) {
    const k = vKey(v), f = favs[k];
    return `
        <article class="verb-card">
            <div class="verb-top">
                <h3 class="verb-name" data-speak="${esc(v.infinitive)}">${esc(v.infinitive)}</h3>
                <div class="verb-actions">
                    <span class="badge ${v.irregular || v.phrasal ? 'irr' : ''}">${v.phrasal ? 'Phrasal' : v.irregular ? 'Irregular' : 'Regular'}</span>
                    <button class="icon-btn ${f ? 'on' : ''}" data-fav="${esc(k)}" aria-pressed="${!!f}" aria-label="${f ? 'Quitar de favoritos' : 'Guardar en favoritos'}"><i class="${f ? 'fas' : 'far'} fa-heart"></i></button>
                </div>
            </div>
            <p class="verb-es">${esc(v.translation)}</p>
            ${inFavs && f ? `<div class="status-seg" role="group" aria-label="Estado del verbo">${STATUSES.map(st => `<button data-verb="${esc(k)}" data-status="${st.id}" class="${f.s === st.id ? 'active' : ''}" aria-pressed="${f.s === st.id}">${st.label}</button>`).join('')}</div>` : ''}
            <div class="forms">
                <button class="form-row" data-speak="${esc(v.past)}"><span>Pasado</span><b>${esc(v.past)}</b></button>
                <button class="form-row" data-speak="${esc(v.participle)}"><span>Participio</span><b>${esc(v.participle)}</b></button>
                <button class="form-row" data-speak="${esc(v.thirdPerson)}"><span>3ra persona</span><b>${esc(v.thirdPerson)}</b></button>
                <button class="form-row" data-speak="${esc(v.gerund)}"><span>Gerundio (-ing)</span><b>${esc(v.gerund)}</b></button>
            </div>
            <div class="example-box" data-speak="${esc(v.example)}">"${esc(v.example)}"${v.exampleEs ? `<span class="tr">${esc(v.exampleEs)}</span>` : ''}</div>
            ${v.phrasal ? `<details class="pv-more"><summary><i class="fas fa-eye"></i> Visualízalo</summary><p data-speak="${esc(v.visualization)}">${esc(v.visualization)}</p><span class="pv-meta">${esc((PHRASAL_CATEGORIES.find(c => c.id === v.category) || {}).label || '')} · ${esc(v.difficulty)}</span></details>` : ''}
        </article>`;
}

/* ---------- Mis favoritos ---------- */
let favFilter = 'all';
function setFavFilter(f) { favFilter = f; renderFavs(); }
function showFavs() {
    hideAll();
    $('favSection').classList.remove('hidden');
    $('studentName').value = store.get(NAME_KEY) || '';
    $('storageWarn').classList.toggle('hidden', store.persistent);
    updateStats();
    $('shareMsg').textContent = '';
    $('sharePanel').classList.add('hidden');
    $('shareToggle').setAttribute('aria-expanded', 'false');
    renderFavs();
    window.scrollTo(0, 0);
}
function renderFavs() {
    const all = allItems.filter(v => favs[vKey(v)]);
    $('favEmpty').classList.toggle('hidden', all.length > 0);
    $('favContent').classList.toggle('hidden', all.length === 0);
    $('favTitle').textContent = all.length ? `Mis verbos favoritos (${all.length})` : 'Mis verbos favoritos';
    $('favCount').textContent = all.length ? 'Marca cómo vas con cada uno para mantenerlos ordenados.' : '';
    if (!all.length) return;

    const counts = { all: all.length };
    STATUSES.forEach(st => counts[st.id] = all.filter(v => favs[vKey(v)].s === st.id).length);
    $('favChips').innerHTML = [{ id: 'all', label: 'Todos' }, ...STATUSES].map(st =>
        `<button class="chip" data-filter="${st.id}" aria-pressed="${favFilter === st.id}" onclick="setFavFilter('${st.id}')">${st.label} · ${counts[st.id]}</button>`
    ).join('');

    const grid = $('favGrid');
    if (favFilter === 'all') {
        grid.innerHTML = STATUSES.map(st => {
            const items = all.filter(v => favs[vKey(v)].s === st.id);
            if (!items.length) return '';
            return `<div class="fav-section"><h3 class="section-title"><i class="fas ${st.icon}"></i> ${st.label} <span>${items.length}</span></h3><div class="verbs-grid">${items.map(v => verbCard(v, true)).join('')}</div></div>`;
        }).join('');
    } else {
        const items = all.filter(v => favs[vKey(v)].s === favFilter);
        grid.innerHTML = items.length
            ? `<div class="verbs-grid">${items.map(v => verbCard(v, true)).join('')}</div>`
            : '<p class="empty">No tienes verbos en este estado todavía.</p>';
    }
}
