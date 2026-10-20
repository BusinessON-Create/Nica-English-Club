/* ==========================================================
   CARRUSEL DE CATEGORÍAS (phrasal verbs)
   Se desliza con el dedo en el celular; en PC con la rueda del mouse,
   arrastrando o con las flechas.
   ========================================================== */

(function () {
    const track = $('phrasalCats');

    window.scrollPhrasalCats = dir => track.scrollBy({ left: dir * Math.max(160, track.clientWidth * 0.7), behavior: 'smooth' });
    window.updatePhrasalArrows = () => {
        const max = track.scrollWidth - track.clientWidth;
        $('phrasalPrev').disabled = track.scrollLeft <= 1;
        $('phrasalNext').disabled = track.scrollLeft >= max - 1;
    };
    window.centerPhrasalChip = () => {
        const chip = track.querySelector('[aria-pressed="true"]');
        if (chip) track.scrollTo({ left: chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' });
    };

    track.addEventListener('scroll', updatePhrasalArrows, { passive: true });
    window.addEventListener('resize', updatePhrasalArrows);

    // Rueda del mouse: mueve la lista de lado (en los extremos deja seguir el scroll de la página)
    track.addEventListener('wheel', e => {
        if (track.scrollWidth <= track.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        const max = track.scrollWidth - track.clientWidth;
        if ((e.deltaY < 0 && track.scrollLeft <= 0) || (e.deltaY > 0 && track.scrollLeft >= max - 1)) return;
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    }, { passive: false });

    // Arrastrar con el mouse
    let down = false, moved = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
        if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => { down = false; track.classList.remove('dragging'); });
    // Si arrastró, no cuenta como clic en una categoría
    track.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
})();
