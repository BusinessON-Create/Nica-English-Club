// training-room.js — Fase 0/2
// Pinta las 5 tarjetas de nivel (A1-C1) en el index del Training Room v2,
// según el progreso real del usuario guardado en:
//   /usuarios/{uid}/progreso_v2/{nivelId} -> { desbloqueado: true/false }
//
// Nota de namespace: se usa "progreso_v2" (no "progreso") para no chocar
// con cualquier colección que ya use el Training Room viejo.

import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const NIVELES = [
  { id: "a1", nombre: "A1" },
  { id: "a2", nombre: "A2" },
  { id: "b1", nombre: "B1" },
  { id: "b2", nombre: "B2" },
  { id: "c1", nombre: "C1" },
];

export async function pintarNiveles(user, perfil) {
  const db = window.trv2_db;
  const grid = document.getElementById("tr2-grid-niveles");
  grid.innerHTML = "";

  for (const nivel of NIVELES) {
    let desbloqueado = false;
    try {
      const ref = doc(db, "usuarios", user.uid, "progreso_v2", nivel.id);
      const snap = await getDoc(ref);
      desbloqueado = snap.exists() ? !!snap.data().desbloqueado : false;
    } catch (e) {
      console.error(`No se pudo leer progreso de ${nivel.id}:`, e);
    }

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
