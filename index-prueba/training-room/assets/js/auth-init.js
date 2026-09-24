// auth-init.js — Training Room v2 — Fase 0
//
// Este módulo hace UNA sola cosa: conectarse al mismo Firebase que ya usa
// nicaenglishportal y confirmar si hay una sesión activa. No crea usuarios
// nuevos, no tiene su propio login — usa exactamente la misma cuenta que
// el alumno/coach ya usa en la plataforma actual.
//
// Si no hay sesión activa, redirige de vuelta al login de la plataforma
// principal (ajustar LOGIN_URL a la ruta real de tu index.html).

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// TODO: ajustar a la ruta real donde vive tu index.html principal
const LOGIN_URL = "../index.html";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Se exponen para que el resto de módulos del Training Room v2 (nivel.js,
// pagina-didactica.js, panel-control/*.js) los reutilicen sin volver a
// inicializar Firebase cada vez.
window.trv2_db = db;
window.trv2_auth = auth;

/**
 * Espera a que Firebase confirme el estado de sesión y resuelve con el
 * usuario actual (o null si no hay sesión). Cualquier pantalla del
 * Training Room v2 debe esperar esta promesa antes de pintar contenido.
 */
export function esperarSesion() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // No hay sesión: de vuelta al login de la plataforma principal.
        window.location.href = LOGIN_URL;
        resolve(null);
        return;
      }
      resolve(user);
    });
  });
}

/**
 * Lee el documento del usuario en /usuarios/{uid} para saber su rol
 * (alumno o coach/admin) y demás datos de perfil ya existentes en tu
 * plataforma. Ajustar el nombre de colección/campo si en tu esquema
 * actual se llama distinto.
 */
export async function obtenerPerfilUsuario(uid) {
  const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
  const snap = await getDoc(doc(db, "usuarios", uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
