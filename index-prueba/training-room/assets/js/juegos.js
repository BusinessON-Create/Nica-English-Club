// juegos.js — mini-juegos de autoevaluación para la sección Práctica
//
// Autoevaluación = NO se guarda como nota oficial ni llega al coach (así se
// definió). Un solo listener delegado maneja todos los juegos de la página
// (igual patrón que audio.js), así funciona aunque el HTML se re-inserte al
// cambiar de pestaña.
//
// 3 tipos de juego:
//   - opción múltiple  (data-juego="opcion")
//   - ordenar palabras  (data-juego="orden")  → ahora con botón "Comprobar"
//   - emparejar         (data-juego="pareja", con selección izquierda→derecha)
//
// Cambios de esta versión:
//   - Ordenar: las palabras armadas se pueden devolver al banco, y se califica
//     solo al tocar "Comprobar". Si falla puede corregir y volver a probar.
//   - Emparejar: la selección es por juego (no global), se puede des-seleccionar,
//     y el juego solo se marca completo cuando están todos los pares.
//   - Marcador: al volver a dibujarse muestra los puntos y la racha reales.
//   - Mezcla pareja (Fisher-Yates) y las piezas nunca salen ya ordenadas.

let score = 0;
let racha = 0;

function textoMarcador() {
  return `<i class="fa-solid fa-star"></i> ${score} pts &nbsp;·&nbsp; <i class="fa-solid fa-fire"></i> racha ${racha}`;
}
function actualizarMarcador() {
  const el = document.getElementById('tr2-marcador');
  if (el) el.innerHTML = textoMarcador();
}

function normaliza(t) {
  return String(t)
    .toLowerCase()
    .replace(/[.!?]/g, '')
    .replace(/\s+([,;:])/g, '$1') // "hello , i'm" -> "hello, i'm"
    .replace(/\s+/g, ' ')
    .trim();
}

// Mezcla pareja (Fisher-Yates). Devuelve una copia, no toca el original.
function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── HTML de cada ejercicio ────────────────────────────────────────────
// El marcador de puntos y racha está apagado (no se guardaba al recargar, así que no servía).
// nivel.js lo sigue llamando, por eso la función existe pero no dibuja nada.
// Para volver a mostrarlo: cambia el return por la línea que está comentada abajo.
export function marcador() {
  return '';
  // return `<div id="tr2-marcador" class="tr2-marcador">${textoMarcador()}</div>`;
}

export function renderOpcion(pregunta, opciones, correcta) {
  const shuf = mezclar(opciones);
  return `
    <div class="tr2-juego" data-juego="opcion">
      <p class="tr2-juego-pregunta">${pregunta}</p>
      <div class="tr2-opciones">
        ${shuf.map((o) => `<button type="button" class="tr2-opcion" data-es-correcta="${normaliza(o) === normaliza(correcta)}">${o}</button>`).join('')}
      </div>
    </div>`;
}

export function renderOrden(piezas, correcta) {
  const objetivo = normaliza(correcta);
  let shuf = mezclar(piezas);
  // que no salga ya en el orden correcto (si hay más de una pieza)
  for (let n = 0; n < 10 && piezas.length > 1 && normaliza(shuf.join(' ')) === objetivo; n++) {
    shuf = mezclar(piezas);
  }
  return `
    <div class="tr2-juego" data-juego="orden" data-correcta="${objetivo.replace(/"/g, '&quot;')}">
      <p class="tr2-juego-pregunta">Ordena las palabras:</p>
      <div class="tr2-orden-armada"></div>
      <div class="tr2-orden-banco">
        ${shuf.map((p) => `<button type="button" class="tr2-pieza">${p}</button>`).join('')}
      </div>
      <button type="button" class="tr2-pieza tr2-comprobar" disabled>Comprobar</button>
    </div>`;
}

export function renderParejas(pares) {
  const izq = pares.map((p, i) => ({ ...p, i, lado: 'izq' }));
  const der = mezclar(pares.map((p, i) => ({ ...p, i, lado: 'der' })));
  const col = (arr) => arr.map((x) => `<button type="button" class="tr2-pareja-item" data-grupo="${x.i}" data-lado="${x.lado}">${x.lado === 'izq' ? x.a : x.b}</button>`).join('');
  return `
    <div class="tr2-juego" data-juego="pareja">
      <div class="tr2-parejas-grid">
        <div class="tr2-parejas-col">${col(izq)}</div>
        <div class="tr2-parejas-col">${col(der)}</div>
      </div>
    </div>`;
}

// ── Puntos ─────────────────────────────────────────────────────────────
function sumarAcierto(puntos) {
  score += puntos;
  racha += 1;
  actualizarMarcador();
}
function registrarError() {
  racha = 0;
  actualizarMarcador();
}

// Mensajes amables
const FELICITA = ['¡Muy bien!', '¡Correcto!', '¡Excelente!', '¡Eso es!'];
const felicita = () => FELICITA[Math.floor(Math.random() * FELICITA.length)];

// ── Avisos dentro de un juego ──────────────────────────────────────────
function mostrarAviso(cont, texto, tipo) {
  quitarAviso(cont);
  const p = document.createElement('p');
  p.className = 'tr2-feedback tr2-feedback-' + tipo;
  p.textContent = texto;
  cont.appendChild(p);
}
function quitarAviso(cont) {
  cont.querySelectorAll('.tr2-feedback').forEach((n) => n.remove());
}

// ── Estilos mínimos de lo nuevo (usa las variables de base.css) ────────
function inyectarEstilos() {
  if (document.getElementById('tr2-juegos-extra')) return;
  const st = document.createElement('style');
  st.id = 'tr2-juegos-extra';
  st.textContent = `
.tr2-orden-armada .tr2-pieza { cursor:pointer; }
.tr2-orden-armada .tr2-pieza:hover { border-color:var(--gold2); }
.tr2-juego[data-respondido] .tr2-orden-armada .tr2-pieza { cursor:default; }
.tr2-comprobar { margin-top:12px; }
.tr2-comprobar:disabled { opacity:.45; cursor:not-allowed; }
.tr2-feedback { margin-top:10px; font-size:13.5px; color:var(--text); }
.tr2-feedback-ok { color:var(--green); }
.tr2-feedback-mal { color:var(--red); }
`;
  document.head.appendChild(st);
}

// Selección de "emparejar": una por juego (no global)
const seleccionPareja = new WeakMap(); // contenedor -> botón seleccionado

let instalado = false;
export function instalarJuegos() {
  if (instalado || typeof document === 'undefined') return;
  instalado = true;
  inyectarEstilos();

  document.addEventListener('click', (e) => {
    // ── Opción múltiple ──
    const opBtn = e.target.closest('.tr2-opciones .tr2-opcion');
    if (opBtn) {
      const cont = opBtn.closest('.tr2-juego');
      if (cont.dataset.respondido) return;
      cont.dataset.respondido = '1';
      const ok = opBtn.dataset.esCorrecta === 'true';
      cont.querySelectorAll('.tr2-opcion').forEach((b) => {
        if (b.dataset.esCorrecta === 'true') b.classList.add('tr2-ok');
      });
      if (ok) {
        sumarAcierto(10);
        cont.classList.add('tr2-juego-ok');
        mostrarAviso(cont, felicita(), 'ok');
      } else {
        opBtn.classList.add('tr2-mal');
        registrarError();
        cont.classList.add('tr2-juego-mal');
        mostrarAviso(cont, '¡Casi! La respuesta correcta quedó en verde.', 'mal');
      }
      return;
    }

    // ── Ordenar: tocar una palabra la mueve entre el banco y la línea armada ──
    const pieza = e.target.closest('.tr2-orden-banco .tr2-pieza, .tr2-orden-armada .tr2-pieza');
    if (pieza) {
      const cont = pieza.closest('.tr2-juego');
      if (cont.dataset.respondido) return;
      const armada = cont.querySelector('.tr2-orden-armada');
      const banco = cont.querySelector('.tr2-orden-banco');
      if (pieza.parentElement === armada) {
        pieza.classList.remove('tr2-pieza-armada');
        banco.appendChild(pieza); // devolver
      } else {
        pieza.classList.add('tr2-pieza-armada');
        armada.appendChild(pieza); // subir
      }
      // al mover algo, se borra el resultado del intento anterior
      armada.classList.remove('tr2-ok', 'tr2-mal');
      cont.classList.remove('tr2-juego-mal');
      quitarAviso(cont);
      cont.querySelector('.tr2-comprobar').disabled = banco.children.length > 0;
      return;
    }

    // ── Ordenar: botón Comprobar ──
    const btnComp = e.target.closest('.tr2-comprobar');
    if (btnComp) {
      const cont = btnComp.closest('.tr2-juego');
      if (cont.dataset.respondido || btnComp.disabled) return;
      const armada = cont.querySelector('.tr2-orden-armada');
      const armadaTxt = normaliza([...armada.children].map((c) => c.textContent).join(' '));
      if (armadaTxt === cont.dataset.correcta) {
        cont.dataset.respondido = '1';
        btnComp.disabled = true;
        armada.classList.add('tr2-ok');
        cont.classList.add('tr2-juego-ok');
        // 10 pts si acertó a la primera, 5 si necesitó corregir
        sumarAcierto(cont.dataset.fallos ? 5 : 10);
        mostrarAviso(cont, felicita(), 'ok');
      } else {
        cont.dataset.fallos = String(Number(cont.dataset.fallos || 0) + 1);
        armada.classList.add('tr2-mal');
        registrarError();
        mostrarAviso(cont, 'Casi. Toca una palabra de arriba para devolverla y prueba de nuevo.', 'mal');
      }
      return;
    }

    // ── Emparejar ──
    const pItem = e.target.closest('.tr2-pareja-item');
    if (pItem) {
      const cont = pItem.closest('.tr2-juego');
      if (pItem.classList.contains('tr2-ok')) return;
      const sel = seleccionPareja.get(cont);

      // tocar de nuevo la seleccionada = quitar la selección
      if (sel === pItem) {
        pItem.classList.remove('tr2-seleccionada');
        seleccionPareja.delete(cont);
        return;
      }
      if (!sel) {
        pItem.classList.add('tr2-seleccionada');
        seleccionPareja.set(cont, pItem);
        return;
      }
      // mismo lado: cambia la selección
      if (sel.dataset.lado === pItem.dataset.lado) {
        sel.classList.remove('tr2-seleccionada');
        pItem.classList.add('tr2-seleccionada');
        seleccionPareja.set(cont, pItem);
        return;
      }
      // lados distintos: comparar
      sel.classList.remove('tr2-seleccionada');
      seleccionPareja.delete(cont);
      if (sel.dataset.grupo === pItem.dataset.grupo) {
        sel.classList.add('tr2-ok');
        pItem.classList.add('tr2-ok');
        sumarAcierto(10);
        if (!cont.querySelector('.tr2-pareja-item:not(.tr2-ok)')) {
          cont.dataset.respondido = '1';
          cont.classList.add('tr2-juego-ok');
          mostrarAviso(cont, '¡Lo lograste! Todas las parejas están bien.', 'ok');
        }
      } else {
        [sel, pItem].forEach((el) => {
          el.classList.add('tr2-mal');
          setTimeout(() => el.classList.remove('tr2-mal'), 500);
        });
        registrarError();
      }
    }
  });
}
