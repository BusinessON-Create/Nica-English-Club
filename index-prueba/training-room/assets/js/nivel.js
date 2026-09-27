// nivel.js — pantalla de alumno para navegar un nivel (versión "veamos")
//
// Lista las unidades de /training_v2_niveles/{nivelId}/unidades (ordenadas)
// y, al elegir una, muestra su página real: Portada -> Tema/Vocabulario/Práctica.
//
// NOTA: esta versión todavía NO aplica el candado de techo grupal (eso es
// la fase del motor de estados) — aquí todo se muestra abierto, solo para
// confirmar visualmente que el contenido cargado por seed-a1.js se ve bien.

import { collection, getDocs, query, orderBy, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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

export function renderPortada(unidad) {
  return `
    <div class="tr2-portada">
      <h1>${unidad.nombre}</h1>
      <p class="tr2-portada-sub">Semana ${unidad.semana} · lo que vas a repasar y practicar hoy.</p>
      <button class="tr2-btn-entrar" id="btn-entrar-clase">Entrar a la clase</button>
    </div>
  `;
}

function bloqueHTML(b) {
  if (b.content) return `<p>${b.content}</p>`;
  if (b.words) return `<ul class="tr2-vocab-list">${b.words.map((w) => `<li><b>${w.en}</b> — ${w.es}</li>`).join('')}</ul>`;
  if (b.explanation) return `<p>${b.explanation}</p><ul>${(b.examples || []).map((e) => `<li>${e}</li>`).join('')}</ul>`;
  if (b.script) return `<div class="tr2-dialogo">${b.script.map((l) => `<p>${l}</p>`).join('')}</div>`;
  if (b.script_with_gaps) return `<div class="tr2-dialogo">${b.script_with_gaps.map((l) => `<p>${l}</p>`).join('')}<p class="tr2-answers">Respuestas: ${(b.answers || []).join(', ')}</p></div>`;
  if (b.items) return `<p>${b.instructions || ''}</p><ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  if (b.audio_script) return `<p><i>Audio (texto):</i></p>${b.audio_script.map((l) => `<p>${l}</p>`).join('')}`;
  if (b.questions) return `<ul>${b.questions.map((q) => `<li>${q}</li>`).join('')}</ul>`;
  if (b.drill_words) return `<p>${(b.focus_sounds || []).join(', ')}</p><ul>${b.drill_words.map((w) => `<li>${w}</li>`).join('')}</ul>`;
  if (b.task) return `<p>${b.task}${b.target_length ? ' (' + b.target_length + ')' : ''}</p>`;
  return `<pre>${JSON.stringify(b, null, 2)}</pre>`;
}

export function renderContenido(pagina) {
  const seccion = (titulo, bloques) => `
    <section class="tr2-seccion">
      <h2>${titulo}</h2>
      ${bloques.map(bloqueHTML).join('')}
    </section>`;
  return `
    <div class="tr2-tabs">
      <button class="tr2-tab active" data-tab="tema">Tema</button>
      <button class="tr2-tab" data-tab="vocabulario">Vocabulario</button>
      <button class="tr2-tab" data-tab="practica">Práctica</button>
    </div>
    <div id="tr2-tab-tema" class="tr2-tab-panel">${seccion('Tema', pagina.tema)}</div>
    <div id="tr2-tab-vocabulario" class="tr2-tab-panel" style="display:none;">${seccion('Vocabulario', pagina.vocabulario)}</div>
    <div id="tr2-tab-practica" class="tr2-tab-panel" style="display:none;">${seccion('Práctica', pagina.practica)}</div>
  `;
}
