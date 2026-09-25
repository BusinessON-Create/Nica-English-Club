// training-room.js — Fase 0/2 (CORREGIDO)
// Pinta las 5 tarjetas de nivel (A1-C1), según:
//   /alumnos/{alumnoId}/progreso_v2/{nivelId} -> { desbloqueado: true/false }
// alumnoId = el ID del documento en /alumnos (obtenido por correo en auth-init.js)

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const NIVELES = [
  { id: "a1", nombre: "A1" },
  { id: "a2", nombre: "A2" },
  { id: "b1", nombre: "B1" },
  { id: "b2", nombre: "B2" },
  { id: "c1", nombre: "C1" },
];

export async function pintarNiveles(alumnoId, perfil) {
  const db = window.trv2_db;
  const grid = document.getElementById("tr2-grid-niveles");
  grid.innerHTML = "";

  for (const nivel of NIVELES) {
    let desbloqueado = false;
    try {
      const ref = doc(db, "alumnos", alumnoId, "progreso_v2", nivel.id);
      const snap = await getDoc(ref);
      desbloqueado = snap.exists() ? !!snap.data().desbloqueado : false;
    } catch (e) {
      console.error(`No se pudo leer progreso de ${nivel.id}:`, e);
    }

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
