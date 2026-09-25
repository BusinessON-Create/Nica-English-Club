// auth-init.js — Training Room v2 — Fase 0 (CORREGIDO)
//
// Se conecta al mismo Firebase que nicaenglishportal y confirma sesión
// activa. El perfil se busca en /alumnos/{alumnoId} por CORREO (igual
// que hace toda tu plataforma actual), no en /usuarios/{uid}.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const LOGIN_URL = "../index.html";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.trv2_db = db;
window.trv2_auth = auth;

export function esperarSesion() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = LOGIN_URL;
        resolve(null);
        return;
      }
      resolve(user);
    });
  });
}

/**
 * Busca el documento del alumno en /alumnos por su correo (mismo patrón
 * que ya usa toda tu plataforma). Devuelve { id, ...datos } o null.
 * El "id" retornado (alumnoId) es el que se usa en TODAS las rutas de
 * Firestore del Training Room v2: /alumnos/{alumnoId}/progreso_v2/...
 */
export async function obtenerPerfilUsuario(user) {
  if (!user.email) return null;
  const q = query(collection(db, "alumnos"), where("email", "==", user.email.toLowerCase()));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}
