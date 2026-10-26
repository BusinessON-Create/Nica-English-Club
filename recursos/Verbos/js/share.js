/* ==========================================================
   COMPARTIR
   Enviar la lista por WhatsApp o copiarla.
   ========================================================== */

/* ---------- Compartir ---------- */
function buildShareText() {
    const name = $('studentName').value.trim();
    const all = allItems.filter(v => favs[vKey(v)]);
    const lines = ['Verb Lab · Nica English Club'];
    if (name) lines.push('Alumno/a: ' + name);
    lines.push(all.some(v => v.phrasal) ? `Mi lista de verbos y phrasal verbs (${all.length})` : `Mi lista de verbos (${all.length})`);
    STATUSES.forEach(st => {
        const items = all.filter(v => favs[vKey(v)].s === st.id).map(v => v.infinitive);
        if (items.length) lines.push('', `${st.label} (${items.length}): ${items.join(', ')}`);
    });
    lines.push('', 'Mejor racha en trivia: ' + getBest());
    return lines.join('\n');
}
$('studentName').addEventListener('input', e => { store.set(NAME_KEY, e.target.value.trim()); notifySync(); });
function toggleSharePanel() {
    const open = $('sharePanel').classList.toggle('hidden') === false;
    $('shareToggle').setAttribute('aria-expanded', open);
    if (open) $('sharePanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
const shareNote = t => { $('shareMsg').classList.remove('warn'); $('shareMsg').textContent = t; };

function requireName() {
    const inp = $('studentName'), name = inp.value.trim();
    if (((name.match(/\p{L}/gu)) || []).length >= 2) { inp.classList.remove('invalid'); return true; }
    inp.classList.remove('invalid'); void inp.offsetWidth; inp.classList.add('invalid');
    $('shareMsg').classList.add('warn');
    $('shareMsg').textContent = 'Escribe tu nombre primero para que tu profe sepa de quién es la lista.';
    inp.focus();
    return false;
}
$('studentName').addEventListener('input', () => { $('studentName').classList.remove('invalid'); if ($('shareMsg').classList.contains('warn')) { $('shareMsg').classList.remove('warn'); $('shareMsg').textContent = ''; } });
function shareWhatsApp() {
    if (!requireName()) return;
    window.open(`https://wa.me/${TEACHER_WA}?text=${encodeURIComponent(buildShareText())}`, '_blank', 'noopener');
}
async function shareList() {
    if (!requireName()) return;
    const text = buildShareText();
    if (navigator.share) {
        try { await navigator.share({ title: 'Mi lista de verbos', text }); return; }
        catch (e) { if (e && e.name === 'AbortError') return; }
    }
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        ta.remove();
    }
    shareNote('Lista copiada. Pégala en el chat para enviarla.');
}
