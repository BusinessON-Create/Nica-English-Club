// training-room.js — Fase 0 (corregido)
// Pinta las 5 tarjetas de nivel (A1-C1) según el progreso real del alumno,
// guardado en /training_v2_progreso/{alumnoId} — alumnoId es el ID real
// del doc en /alumnos (el mismo que usa coach_notas.coachId, actividades.
// creadoPor, etc.), NUNCA el uid de Firebase Auth.
//
// Namespace "training_v2_progreso" (no "entrenamiento_progreso") para no
// chocar con el Training Room viejo (training-journey.js), que sigue vivo
// en producción mientras se prueba este módulo nuevo.
//
// NOTA para la fase de "motor de estados" (la próxima, no esta): el
// desbloqueo real de UNIDADES/páginas tiene techo grupal — lo abre el
// coach para todo su horario/grupo, no alumno por alumno. Este archivo,
// en Fase 0, solo resuelve el desbloqueo de NIVEL (A1→C1), que sí es
// individual. La lógica de techo grupal por unidad se construye en la
// siguiente fase, sobre esta misma base.

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { mostrarAviso, NIVEL_INFO } from "./ui.js";

const NIVELES = [
  { id: "a1", nombre: "A1" },
  { id: "a2", nombre: "A2" },
  { id: "b1", nombre: "B1" },
  { id: "b2", nombre: "B2" },
  { id: "c1", nombre: "C1" },
];

// Mismo slug que usa el servidor para armar el ID del grupo.
function slugGrupo(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Unidades que el coach abrió para este alumno (por grupo o solo para él), como claves "a2-u1".
// Si el coach abrió una unidad de un nivel, ese nivel queda disponible: no hace falta
// marcarlo aparte en training_v2_progreso.
async function clavesAbiertas(db, alumno) {
  const claves = new Set();
  const leer = async (col, id) => {
    try {
      const snap = await getDoc(doc(db, col, id));
      if (snap.exists() && Array.isArray(snap.data().unidades)) snap.data().unidades.forEach((k) => claves.add(k));
      // Nivel abierto completo por el coach (interruptor "Nivel abierto"): se marca como "a2-nivel".
      if (snap.exists() && Array.isArray(snap.data().niveles)) snap.data().niveles.forEach((n) => claves.add(n + '-nivel'));
    } catch (e) {
      console.error('No se pudo leer ' + col + ':', e);
    }
  };
  const h = alumno.horario || {};
  const d = slugGrupo(h.dias), f = slugGrupo(h.franja);
  if (d && f) await leer('training_v2_apertura_grupo', `${d}__${f}`);
  if (alumno.id) await leer('training_v2_apertura_alumno', alumno.id);
  return claves;
}

export async function pintarNiveles(alumno) {
  const db = window.trv2_db;
  const grid = document.getElementById("tr2-grid-niveles");
  grid.innerHTML = "";

  // El coach tiene acceso de solo lectura a TODO el contenido (para
  // preparar clases), así que para un coach todos los niveles se muestran
  // desbloqueados sin tocar/depender de su propio progreso como alumno.
  let progreso = { niveles: {} };
  if (!alumno.esCoach) {
    try {
      const snap = await getDoc(doc(db, 'training_v2_progreso', alumno.id));
      if (snap.exists()) progreso = snap.data();
    } catch (e) {
      console.error('No se pudo leer el progreso de Training Room v2:', e);
    }
  }

  const abiertas = alumno.esCoach ? new Set() : await clavesAbiertas(db, alumno);

  for (const nivel of NIVELES) {
    let desbloqueado = alumno.esCoach ||
      !!(progreso.niveles && progreso.niveles[nivel.id] && progreso.niveles[nivel.id].desbloqueado) ||
      [...abiertas].some((k) => k.startsWith(nivel.id + '-'));

    // A1 se desbloquea por defecto para cualquier alumno nuevo sin progreso aún.
    if (nivel.id === "a1" && !desbloqueado) desbloqueado = true;

    const card = document.createElement("div");
    card.className = `tr2-card-nivel ${desbloqueado ? "" : "locked"}`;
    card.dataset.nivel = nivel.id;
    card.setAttribute("role", "button");
    if (!desbloqueado) card.setAttribute("aria-disabled", "true");
    const info = NIVEL_INFO[nivel.id] || {};
    const pos = NIVELES.indexOf(nivel);
    // "Tu camino": 5 rayitas, encendidas hasta la posición de este nivel (A1 = 1 ... C1 = 5)
    const camino = NIVELES.map((_, i) => `<i class="${i <= pos ? "on" : ""}"></i>`).join("");
    const unidadesTxt = info.unidades ? `${info.unidades} ${info.unidades === 1 ? "unidad" : "unidades"}` : "";
    card.innerHTML = `
      <div class="tr2-nivel-badge">${nivel.nombre}</div>
      <div class="tr2-nivel-info">
        <div class="tr2-nivel-nombre">${info.nombre || nivel.nombre}</div>
        ${info.frase ? `<div class="tr2-nivel-frase">${info.frase}</div>` : ""}
        <div class="tr2-nivel-meta">
          <span class="tr2-nivel-estado ${desbloqueado ? "unlocked" : ""}">
            ${desbloqueado ? "Disponible" : "Tu coach lo desbloqueará pronto"}
          </span>
          ${unidadesTxt ? `<span class="tr2-nivel-unidades">${unidadesTxt}</span>` : ""}
        </div>
        <div class="tr2-nivel-camino" aria-hidden="true">${camino}</div>
      </div>
      <i class="fa-solid ${desbloqueado ? "fa-chevron-right" : "fa-lock"} tr2-nivel-flecha"></i>
    `;
    if (desbloqueado) {
      card.onclick = () => {
        window.location.href = `./niveles/nivel.html?nivel=${nivel.id}`;
      };
    } else {
      card.onclick = () => mostrarAviso(`Tu coach desbloqueará el nivel ${nivel.nombre} cuando estés listo.`);
    }
    grid.appendChild(card);
  }
}
