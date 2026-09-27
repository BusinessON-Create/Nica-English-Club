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

const NIVELES = [
  { id: "a1", nombre: "A1" },
  { id: "a2", nombre: "A2" },
  { id: "b1", nombre: "B1" },
  { id: "b2", nombre: "B2" },
  { id: "c1", nombre: "C1" },
];

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

  for (const nivel of NIVELES) {
    let desbloqueado = alumno.esCoach ||
      !!(progreso.niveles && progreso.niveles[nivel.id] && progreso.niveles[nivel.id].desbloqueado);

    // A1 se desbloquea por defecto para cualquier alumno nuevo sin progreso aún.
    if (nivel.id === "a1" && !desbloqueado) desbloqueado = true;

    const card = document.createElement("div");
    card.className = `tr2-card-nivel ${desbloqueado ? "" : "locked"}`;
    card.innerHTML = `
      <div class="tr2-nivel-nombre">${nivel.nombre}</div>
      <div class="tr2-nivel-estado ${desbloqueado ? "unlocked" : ""}">
        ${desbloqueado ? "Disponible" : "Tu coach lo desbloqueará pronto"}
      </div>
    `;
    if (desbloqueado) {
      card.onclick = () => {
        window.location.href = `./niveles/nivel.html?nivel=${nivel.id}`;
      };
    }
    grid.appendChild(card);
  }
}
