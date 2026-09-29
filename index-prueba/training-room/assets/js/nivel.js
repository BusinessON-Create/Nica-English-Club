// nivel.js — pantalla de alumno para navegar un nivel
//
// Lista las unidades de /training_v2_niveles/{nivelId}/unidades (ordenadas)
// y, al elegir una, muestra su página real: Portada -> Tema/Vocabulario/Práctica,
// con audio 🔊 en todo texto en inglés y apoyo visual (íconos/banderas) donde
// ya está definido en visuales.js (por ahora, Unidad 1 como piloto).
//
// NOTA: todavía NO aplica el candado de techo grupal (eso es la fase del
// motor de estados) — aquí todo se muestra abierto.

import { collection, getDocs, query, orderBy, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { instalarAudio, registrarLista, limpiarParaAudio, ciclarVelocidad, etiquetaVelocidad } from "./audio.js";
import { instalarJuegos, marcador, renderOpcion, renderOrden, renderParejas } from "./juegos.js";
import { ICONO_UNIDAD, PORTADAS, ICONOS_VOCAB, BANDERAS, NUMEROS, COLORES, REGLAS_ICONO, WARMUP, PRONOMBRES, TO_BE, TEMA_VISUAL } from "./visuales.js";
import { PRACTICA_U1 } from "./ejercicios-u1.js";
import { PRACTICA_U2, PRACTICA_U3, PRACTICA_U4, PRACTICA_U5, PRACTICA_U6, PRACTICA_U7 } from "./ejercicios-resto.js";

instalarAudio();
instalarJuegos();

// Ejercicios curados por unidad (respuestas completadas a mano donde el
// JSON original no las traía). Todas las unidades de A1 ya están cubiertas.
const EJERCICIOS = {
  u1: PRACTICA_U1, u2: PRACTICA_U2, u3: PRACTICA_U3, u4: PRACTICA_U4,
  u5: PRACTICA_U5, u6: PRACTICA_U6, u7: PRACTICA_U7,
};

const ICONOS_BLOQUE = {
  warm_up: 'fa-globe', vocabulary: 'fa-book-open', vocabulary_practice: 'fa-puzzle-piece',
  grammar: 'fa-graduation-cap', dialogue: 'fa-comments', grammar_practice: 'fa-pen-to-square',
  listening: 'fa-headphones', pronunciation: 'fa-microphone-lines', speaking: 'fa-microphone',
  writing: 'fa-pen-nib',
};
const NOMBRES_BLOQUE = {
  warm_up: 'Para empezar', vocabulary: 'Vocabulario', vocabulary_practice: 'Repaso de vocabulario',
  grammar: 'Gramática', dialogue: 'Diálogo', grammar_practice: 'Ejercicio', listening: 'Listening',
  pronunciation: 'Pronunciación', speaking: 'Speaking', writing: 'Writing',
};

// ── Datos ──────────────────────────────────────────────────────────────
export async function cargarUnidades(nivelId) {
  const db = window.trv2_db;
  const q = query(collection(db, 'training_v2_niveles', nivelId, 'unidades'), orderBy('orden'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function cargarPagina(nivelId, unidadId) {
  const db = window.trv2_db;
  const snap = await getDoc(doc(db, 'training_v2_niveles', nivelId, 'unidades', unidadId, 'paginas', 'p1'));
  return snap.exists() ? snap.data() : null;
}

// ── Helpers de audio (devuelven el HTML del botón 🔊) ────────────────────
function btnSay(texto, extra = '') {
  const limpio = limpiarParaAudio(texto).replace(/"/g, '&quot;');
  return `<button class="tr2-speak ${extra}" data-say="${limpio}" title="Escuchar"><i class="fa-solid fa-volume-high"></i></button>`;
}
function btnPlayLista(lineas, etiqueta = 'Escuchar todo') {
  const limpias = lineas.map(limpiarParaAudio);
  const id = registrarLista(limpias);
  return `<button class="tr2-play" data-say-list="${id}"><i class="fa-solid fa-play"></i> ${etiqueta}</button>`;
}

// ── Lista de unidades ─────────────────────────────────────────────────
export function renderListaUnidades(unidades) {
  return unidades.map((u) => `
    <div class="tr2-card-unidad" data-unidad="${u.id}">
      <div class="tr2-uni-icono"><i class="fa-solid ${ICONO_UNIDAD[u.id] || 'fa-book'}"></i></div>
      <div class="tr2-uni-txt">
        <div class="tr2-uni-kicker">Unidad ${u.orden} · Semana ${u.semana}</div>
        <div class="tr2-uni-nombre">${u.nombre}</div>
      </div>
      <i class="fa-solid fa-chevron-right tr2-uni-flecha"></i>
    </div>
  `).join('');
}

// ── Portada ────────────────────────────────────────────────────────────
export function renderPortada(unidad, unidadId) {
  const p = PORTADAS[unidadId] || {
    aprenderas: `a usar lo esencial de "${unidad.nombre}" en una conversación real.`,
    vidaReal: 'lo vas a practicar hoy en clase y usarlo esta misma semana.',
  };
  return `
    <button class="tr2-volver" id="btn-volver-lista"><i class="fa-solid fa-arrow-left"></i> Unidades</button>
    <div class="tr2-portada">
      <div class="tr2-portada-icono"><i class="fa-solid ${ICONO_UNIDAD[unidadId] || 'fa-book'}"></i></div>
      <div class="tr2-portada-kicker">Unidad ${unidad.orden} · Semana ${unidad.semana}</div>
      <h1 class="tr2-portada-titulo">${unidad.nombre}</h1>
      <div class="tr2-portada-linea"><i class="fa-solid fa-bullseye"></i><span><b>Vas a aprender</b> ${p.aprenderas}</span></div>
      <div class="tr2-portada-linea"><i class="fa-solid fa-comments"></i><span><b>En la vida real:</b> ${p.vidaReal}</span></div>
      <button class="tr2-btn-entrar" id="btn-entrar-clase">Entrar a la clase</button>
    </div>
  `;
}

// ── Bloques de TEMA ────────────────────────────────────────────────────
function renderWarmup(b, unidadId) {
  const w = WARMUP[unidadId];
  if (!w) return `<p>${b.content}</p>`;
  return `
    <p class="tr2-nota" style="margin-bottom:12px;">${w.titulo}</p>
    <div class="tr2-mundo">
      ${w.items.map((it) => `
        <div class="tr2-mundo-item">
          <img src="https://flagcdn.com/w80/${it.flag}.png" alt="${it.pais}" loading="lazy">
          <div class="tr2-mundo-saludo">${it.texto}${it.audio ? btnSay(it.texto) : ''}</div>
          ${it.romaji ? `<div class="tr2-mundo-romaji">${it.romaji}</div>` : ''}
          <div class="tr2-mundo-pais">${it.pais}</div>
        </div>
      `).join('')}
    </div>`;
}

function renderPronombres() {
  return `<div class="tr2-pgrid">${PRONOMBRES.map((p) => `
    <div class="tr2-pfig">
      <i class="fa-solid ${p.icon}"></i>
      <div class="tr2-pen">${p.en}${btnSay(p.en)}</div>
      <div class="tr2-pes">${p.es}</div>
    </div>`).join('')}</div>`;
}

function renderToBe() {
  return `<div class="tr2-tobe">${TO_BE.map((col) => `
    <div class="tr2-tobe-col">
      <div class="tr2-tobe-verbo">${col.verbo}</div>
      <div class="tr2-tobe-chips">${col.pronombres.map((pr) => {
        const frase = `${pr} ${col.verbo}`;
        return `<span class="tr2-frase">${frase}${btnSay(frase)}</span>`;
      }).join('')}</div>
    </div>`).join('')}</div>`;
}

function renderSVO(topicData) {
  const leyenda = `
    <div class="tr2-svo-leyenda">
      <span class="tr2-parte S">Sujeto</span><span class="tr2-parte V">Verbo</span><span class="tr2-parte O">Complemento</span>
    </div>`;
  const filas = topicData.ejemplos.map((partes) => `
    <div class="tr2-oracion">
      ${partes.map(([txt, tipo]) => `<span class="tr2-parte ${tipo}">${txt}</span>`).join('')}
      ${btnSay(partes.map((p) => p[0]).join(' '))}
    </div>`).join('');
  return leyenda + filas;
}

function renderGrammar(b) {
  const especial = TEMA_VISUAL[(b.topic || '').toLowerCase()];
  const visual =
    especial?.tipo === 'pronombres' ? renderPronombres()
    : especial?.tipo === 'tobe' ? renderToBe()
    : especial?.tipo === 'svo' ? renderSVO(especial)
    : '';
  const ejemplos = !especial ? `<ul class="tr2-ejemplos">${(b.examples || []).map((e) => `<li>${e}${btnSay(e)}</li>`).join('')}</ul>` : '';
  return `<div class="tr2-expl">${b.explanation}</div>${visual}${ejemplos}`;
}

function renderDialogue(b) {
  const lineas = b.script || b.script_with_gaps || [];
  const play = btnPlayLista(lineas, 'Escuchar diálogo');
  const burbujas = lineas.map((linea, i) => {
    const m = linea.match(/^([A-Za-z]+):\s*(.*)$/);
    const quien = m ? m[1] : (i % 2 === 0 ? 'A' : 'B');
    let texto = m ? m[2] : linea;
    texto = texto.replace(/_{2,}/g, '<span class="tr2-hueco"></span>');
    const lado = quien.toUpperCase().startsWith('B') || quien.toLowerCase() === 'customer' ? 'der' : '';
    return `
      <div class="tr2-burbuja ${lado}">
        <div class="tr2-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="tr2-globo"><span class="tr2-quien">${quien}</span><p>${texto}${btnSay(linea)}</p></div>
      </div>`;
  }).join('');
  const resp = b.answers ? `<details class="tr2-resp"><summary>Ver respuestas</summary><p>${b.answers.join(', ')}</p></details>` : '';
  return play + `<div class="tr2-chat">${burbujas}</div>` + resp;
}

// ── Bloques de VOCABULARIO ─────────────────────────────────────────────
function iconoPalabra(topicLower, en) {
  const enLower = en.toLowerCase();
  if (ICONOS_VOCAB[enLower]) return { tipo: 'icono', valor: ICONOS_VOCAB[enLower] };
  if (topicLower.includes('countries') || topicLower.includes('nationalit')) {
    const bandera = BANDERAS[enLower];
    if (bandera) return { tipo: 'bandera', valor: bandera };
  }
  if (topicLower.includes('numbers')) {
    const n = NUMEROS[enLower];
    if (n !== undefined) return { tipo: 'numero', valor: n };
  }
  if (topicLower.includes('colors')) {
    const color = COLORES[enLower];
    if (color) return { tipo: 'color', valor: color };
  }
  for (const [regla, icono] of REGLAS_ICONO) {
    if (regla.test(enLower)) return { tipo: 'icono', valor: icono };
  }
  return { tipo: 'generico' };
}

function renderVocabulary(b) {
  const topicLower = (b.topic || '').toLowerCase();
  return `
    <p class="tr2-nota" style="margin-bottom:12px;">${b.topic}</p>
    <div class="tr2-vgrid">
      ${b.words.map((w) => {
        const ico = iconoPalabra(topicLower, w.en);
        let img = `<div class="tr2-vimg"><i class="fa-solid fa-language"></i></div>`;
        if (ico.tipo === 'icono') img = `<div class="tr2-vimg"><i class="fa-solid ${ico.valor}"></i></div>`;
        if (ico.tipo === 'bandera') img = `<div class="tr2-vimg tr2-vflag"><img src="https://flagcdn.com/w160/${ico.valor}.png" alt="${w.en}" loading="lazy"></div>`;
        if (ico.tipo === 'numero') img = `<div class="tr2-vimg tr2-vnum"><span>${ico.valor}</span><div class="tr2-dots">${'<i></i>'.repeat(Math.min(ico.valor, 10))}</div></div>`;
        if (ico.tipo === 'color') img = `<div class="tr2-vimg"><div class="tr2-swatch" style="background:${ico.valor};"></div></div>`;
        return `
          <div class="tr2-vcard">
            ${img}
            <div class="tr2-vtxt">
              <div class="tr2-ven">${w.en}${btnSay(w.en)}</div>
              <div class="tr2-ves">${w.es}</div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderVocabPractice(b, unidadId) {
  const curado = EJERCICIOS[unidadId]?.vocabularyPractice?.find((v) => v.topic === b.topic);
  if (curado) return renderParejas(curado.pares);
  return `<p class="tr2-instr">${b.instructions}</p><ul class="tr2-items">${b.items.map((i) => `<li class="tr2-par"><i class="fa-solid fa-arrow-right-long"></i> ${i}</li>`).join('')}</ul>`;
}

// ── Bloques de PRÁCTICA ─────────────────────────────────────────────────
function renderGrammarPractice(b, unidadId) {
  const curado = EJERCICIOS[unidadId]?.grammarPractice?.find((g) => g.topic === b.topic);
  if (curado) {
    return curado.preguntas.map((p) =>
      curado.tipo === 'orden' ? renderOrden(p.piezas, p.correcta) : renderOpcion(p.pregunta, p.opciones, p.correcta)
    ).join('');
  }
  return `<p class="tr2-instr">${b.instructions}</p><ul class="tr2-items">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}
function renderListening(b, unidadId) {
  if (b.audio_script) return `<div class="tr2-listen">${btnPlayLista(b.audio_script)}${b.audio_script.map((l) => `<p>${l}</p>`).join('')}</div>`;
  if (b.questions) {
    const curado = EJERCICIOS[unidadId]?.listening;
    if (curado) return curado.preguntas.map((p) => renderOpcion(p.pregunta, p.opciones, p.correcta)).join('');
    return `<ol class="tr2-preguntas">${b.questions.map((q) => `<li>${q}</li>`).join('')}</ol>`;
  }
  return '';
}
function renderPronunciation(b) {
  return `
    <div class="tr2-sonidos">${(b.focus_sounds || []).map((s) => `<span class="tr2-chip-sonido">${s}</span>`).join('')}</div>
    <div class="tr2-drill">${(b.drill_words || []).map((w) => `<span class="tr2-palabra">${w}${btnSay(w)}</span>`).join('')}</div>`;
}
function renderTarea(b, icono, etiqueta) {
  return `
    <div class="tr2-tarea">
      <div class="tr2-tarea-icono"><i class="fa-solid ${icono}"></i></div>
      <div><div class="tr2-tarea-tag">${etiqueta}</div><p>${b.task}${b.target_length ? ` <span class="tr2-nota">(${b.target_length})</span>` : ''}</p></div>
    </div>`;
}

// ── Router de bloque → HTML ──────────────────────────────────────────────
function contenidoBloque(b, unidadId) {
  switch (b.type) {
    case 'warm_up': return renderWarmup(b, unidadId);
    case 'grammar': return renderGrammar(b);
    case 'dialogue': return renderDialogue(b);
    case 'vocabulary': return renderVocabulary(b);
    case 'vocabulary_practice': return renderVocabPractice(b, unidadId);
    case 'grammar_practice': return renderGrammarPractice(b, unidadId);
    case 'listening': return renderListening(b, unidadId);
    case 'pronunciation': return renderPronunciation(b);
    case 'speaking': return renderTarea(b, 'fa-microphone', 'Grábate hablando');
    case 'writing': return renderTarea(b, 'fa-pen-nib', 'Escribe');
    default: return `<pre>${JSON.stringify(b, null, 2)}</pre>`;
  }
}

function tituloBloque(b) {
  if (b.topic) return b.topic;
  if (b.title) return b.title;
  return NOMBRES_BLOQUE[b.type] || b.type;
}

function renderSeccion(bloques, unidadId) {
  return bloques.map((b) => `
    <div class="tr2-bloque">
      <div class="tr2-bloque-titulo"><i class="fa-solid ${ICONOS_BLOQUE[b.type] || 'fa-circle'}"></i> ${tituloBloque(b)}</div>
      ${contenidoBloque(b, unidadId)}
    </div>`).join('');
}

// ── Cabecera de unidad + pestañas + velocidad de audio ───────────────────
export function renderContenido(pagina, unidad, unidadId) {
  return `
    <button class="tr2-volver" id="btn-volver-portada"><i class="fa-solid fa-arrow-left"></i> Portada</button>
    <div class="tr2-unit-head">
      <div class="tr2-uni-kicker">Unidad ${unidad.orden} · Semana ${unidad.semana}</div>
      <h2>${unidad.nombre}</h2>
    </div>
    <div class="tr2-tabs" id="tr2-tabs">
      <button class="tr2-tab active" data-tab="tema"><i class="fa-solid fa-book-open"></i>Tema</button>
      <button class="tr2-tab" data-tab="vocabulario"><i class="fa-solid fa-language"></i>Vocabulario</button>
      <button class="tr2-tab" data-tab="practica"><i class="fa-solid fa-dumbbell"></i>Práctica</button>
      <button class="tr2-tab" id="btn-velocidad" type="button" style="margin-left:6px;" title="Velocidad de audio">
        <i class="fa-solid fa-gauge"></i>${etiquetaVelocidad()}
      </button>
    </div>
    <div id="tr2-tab-tema" class="tr2-tab-panel">${renderSeccion(pagina.tema, unidadId)}</div>
    <div id="tr2-tab-vocabulario" class="tr2-tab-panel" style="display:none;">${renderSeccion(pagina.vocabulario, unidadId)}</div>
    <div id="tr2-tab-practica" class="tr2-tab-panel" style="display:none;">${marcador()}${renderSeccion(pagina.practica, unidadId)}</div>
  `;
}

export function activarVelocidad(vista) {
  const btn = vista.querySelector('#btn-velocidad');
  if (!btn) return;
  btn.onclick = () => {
    ciclarVelocidad();
    btn.innerHTML = `<i class="fa-solid fa-gauge"></i>${etiquetaVelocidad()}`;
  };
}
