// firebase-config.js
// Configuración de Firebase compartida por index.html y coach/index.html.
// Antes estaba pegada directamente dentro de index.html; se sacó a este
// archivo aparte para no tener que repetirla (y desincronizarla sin querer)
// cada vez que se agrega una página nueva al portal.
export const firebaseConfig = {
  apiKey: "AIzaSyCchgmeTjQdvsBzOJ9MWH6eJryvG83utAA",
  authDomain: "nicaenglishportal.firebaseapp.com",
  projectId: "nicaenglishportal",
  storageBucket: "nicaenglishportal.firebasestorage.app",
  messagingSenderId: "30475218925",
  appId: "1:30475218925:web:bd98007b81d1f3860fdc44"
};
