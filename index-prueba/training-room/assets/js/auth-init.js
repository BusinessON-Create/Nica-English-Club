// auth-init.js — Training Room v2 — Fase 0 (corregido)
//
// Se conecta al MISMO Firebase que ya usa nicaenglishportal y resuelve el
// documento real del usuario en /alumnos/{alumnoId} — NUNCA en
// /usuarios/{uid} (esa colección no existe en la plataforma real).
// El doc de /alumnos NO usa el uid como ID de documento; se busca por el
// campo "uid", exactamente igual que hace coach/index.html real:
//   query(collection(db,'alumnos'), where('uid','==', user.uid), limit(1))

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, query, where, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// training-room/index.html vive en index-prueba/training-room/, así que el
// login principal (index-prueba/index.html) está dos niveles arriba.
const LOGIN_URL = "../../";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.trv2_db = db;
window.trv2_auth = auth;

/**
 * Espera la sesión de Firebase Auth Y resuelve el doc real de /alumnos
 * (buscado por "uid", nunca asumido como ID del documento).
 * Devuelve { user, alumno } o null si no hay sesión / no hay perfil,
 * y en ese caso ya redirige de vuelta al login principal.
 */
export function esperarSesionYAlumno() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = LOGIN_URL;
        resolve(null);
        return;
      }
      try {
        const snap = await getDocs(query(collection(db, 'alumnos'), where('uid', '==', user.uid), limit(1)));
        if (snap.empty) {
          // Cuenta válida en Firebase Auth pero sin doc en /alumnos todavía.
          window.location.href = LOGIN_URL;
          resolve(null);
          return;
        }
        const d = snap.docs[0];
        resolve({ user, alumno: { id: d.id, ...d.data() } });
      } catch (e) {
        console.error('No se pudo resolver el perfil de alumno:', e);
        resolve(null);
      }
    });
  });
}
