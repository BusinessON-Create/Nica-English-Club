// juegos.js — mini-juegos de autoevaluación para la sección Práctica
//
// Autoevaluación = NO se guarda como nota oficial ni llega al coach (así se
// definió). Un solo listener delegado maneja todos los juegos de la página
// (igual patrón que audio.js), así funciona aunque el HTML se re-inserte al
// cambiar de pestaña.
//
// 3 tipos de juego:
//   - opción múltiple  (data-juego="opcion")
//   - ordenar palabras  (data-juego="orden")
//   - emparejar         (data-juego="pareja", con selección izquierda→derecha)

let score = 0;
let racha = 0;
function actualizarMarcador() {
  const el = document.getElementById('tr2-marcador');
  if (el) el.innerHTML = `<i class="fa-solid fa-star"></i> ${score} pts &nbsp;·&nbsp; <i class="fa-solid fa-fire"></i> racha ${racha}`;
}

function normaliza(t) {
  return String(t).toLowerCase().replace(/[.!?]/g, '').replace(/\s+/g, ' ').trim();
}

// ── HTML de cada ejercicio ────────────────────────────────────────────
export function marcador() {
  return `<div id="tr2-marcador" class="tr2-marcador"><i class="fa-solid fa-star"></i> 0 pts &nbsp;·&nbsp; <i class="fa-solid fa-fire"></i> racha 0</div>`;
}

export function renderOpcion(pregunta, opciones, correcta) {
  const shuf = [...opciones].sort(() => Math.random() - 0.5);
  return `
    <div class="tr2-juego" data-juego="opcion">
      <p class="tr2-juego-pregunta">${pregunta}</p>
      <div class="tr2-opciones">
        ${shuf.map((o) => `<button class="tr2-opcion" data-es-correcta="${normaliza(o) === normaliza(correcta)}">${o}</button>`).join('')}
      </div>
    </div>`;
}

export function renderOrden(piezas, correcta) {
  const shuf = [...piezas].sort(() => Math.random() - 0.5);
  return `
    <div class="tr2-juego" data-juego="orden" data-correcta="${normaliza(correcta).replace(/"/g, '&quot;')}">
      <p class="tr2-juego-pregunta">Ordena las palabras:</p>
      <div class="tr2-orden-armada"></div>
      <div class="tr2-orden-banco">
        ${shuf.map((p) => `<button class="tr2-pieza">${p}</button>`).join('')}
      </div>
    </div>`;
}

export function renderParejas(pares) {
  const izq = pares.map((p, i) => ({ ...p, i, lado: 'izq' }));
  const der = [...pares.map((p, i) => ({ ...p, i, lado: 'der' }))].sort(() => Math.random() - 0.5);
  const col = (arr) => arr.map((x) => `<button class="tr2-pareja-item" data-grupo="${x.i}" data-lado="${x.lado}">${x.lado === 'izq' ? x.a : x.b}</button>`).join('');
  return `
    <div class="tr2-juego" data-juego="pareja">
      <div class="tr2-parejas-grid">
        <div class="tr2-parejas-col">${col(izq)}</div>
        <div class="tr2-parejas-col">${col(der)}</div>
      </div>
    </div>`;
}

// ── Interacción (un solo listener delegado) ────────────────────────────
function marcarAcierto(contenedor) {
  score += 10; racha += 1;
  actualizarMarcador();
  contenedor.classList.add('tr2-juego-ok');
}
function marcarError(contenedor) {
  racha = 0;
  actualizarMarcador();
  contenedor.classList.add('tr2-juego-mal');
}

let seleccionPareja = null; // { grupo, lado, el }

let instalado = false;
export function instalarJuegos() {
  if (instalado || typeof document === 'undefined') return;
  instalado = true;

  document.addEventListener('click', (e) => {
    // Opción múltiple
    const opBtn = e.target.closest('.tr2-opciones .tr2-opcion');
    if (opBtn) {
      const cont = opBtn.closest('.tr2-juego');
      if (cont.dataset.respondido) return;
      cont.dataset.respondido = '1';
      const ok = opBtn.dataset.esCorrecta === 'true';
      cont.querySelectorAll('.tr2-opcion').forEach((b) => {
        if (b.dataset.esCorrecta === 'true') b.classList.add('tr2-ok');
      });
      if (!ok) opBtn.classList.add('tr2-mal');
      ok ? marcarAcierto(cont) : marcarError(cont);
      return;
    }

    // Ordenar: clic en una pieza del banco
    const pieza = e.target.closest('.tr2-orden-banco .tr2-pieza');
    if (pieza) {
      const cont = pieza.closest('.tr2-juego');
      if (cont.dataset.respondido) return;
      const armada = cont.querySelector('.tr2-orden-armada');
      const clon = document.createElement('button');
      clon.className = 'tr2-pieza tr2-pieza-armada';
      clon.textContent = pieza.textContent;
      armada.appendChild(clon);
      pieza.remove();
      if (!cont.querySelector('.tr2-orden-banco').children.length) {
        cont.dataset.respondido = '1';
        const armadaTxt = normaliza([...armada.children].map((c) => c.textContent).join(' '));
        const ok = armadaTxt === cont.dataset.correcta;
        armada.classList.add(ok ? 'tr2-ok' : 'tr2-mal');
        if (!ok) {
          const correcta = document.createElement('p');
          correcta.className = 'tr2-feedback';
          correcta.textContent = 'Correcto: ' + cont.dataset.correcta;
          cont.appendChild(correcta);
        }
        ok ? marcarAcierto(cont) : marcarError(cont);
      }
      return;
    }

    // Emparejar
    const pItem = e.target.closest('.tr2-pareja-item');
    if (pItem) {
      const cont = pItem.closest('.tr2-juego');
      if (pItem.classList.contains('tr2-ok')) return;
      if (!seleccionPareja) {
        seleccionPareja = { grupo: pItem.dataset.grupo, lado: pItem.dataset.lado, el: pItem };
        pItem.classList.add('tr2-seleccionada');
        return;
      }
      if (seleccionPareja.lado === pItem.dataset.lado) {
        // mismo lado: cambia la selección
        seleccionPareja.el.classList.remove('tr2-seleccionada');
        seleccionPareja = { grupo: pItem.dataset.grupo, lado: pItem.dataset.lado, el: pItem };
        pItem.classList.add('tr2-seleccionada');
        return;
      }
      const acierto = seleccionPareja.grupo === pItem.dataset.grupo;
      seleccionPareja.el.classList.remove('tr2-seleccionada');
      if (acierto) {
        seleccionPareja.el.classList.add('tr2-ok');
        pItem.classList.add('tr2-ok');
        marcarAcierto(cont);
      } else {
        [seleccionPareja.el, pItem].forEach((el) => {
          el.classList.add('tr2-mal');
          setTimeout(() => el.classList.remove('tr2-mal'), 500);
        });
        marcarError(cont);
      }
      seleccionPareja = null;
    }
  });
}
