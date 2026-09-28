// audio.js — voz en inglés del Training Room v2
//
// Usa la voz del navegador (Web Speech API), la misma tecnología que ya usa
// tu plataforma: gratis, sin API key y sin subir archivos de audio.
// Velocidad por defecto 0.8; el alumno puede ciclar 0.8 → 0.6 → 1.0.

const CLAVE = 'tr2_voz_rate';
const VELOCIDADES = [0.8, 0.6, 1];
const HAY_VOZ = typeof window !== 'undefined' && 'speechSynthesis' in window;

let velocidad = 0.8;
try {
  const guardada = parseFloat(localStorage.getItem(CLAVE));
  if (VELOCIDADES.includes(guardada)) velocidad = guardada;
} catch (e) { /* sin storage: se queda en 0.8 */ }

let voz = null;
function elegirVoz() {
  if (!HAY_VOZ) return;
  const todas = speechSynthesis.getVoices();
  if (!todas.length) return;
  const enUS = todas.filter((v) => /^en[-_]US/i.test(v.lang));
  const preferida = enUS.find((v) => /natural|google|samantha|jenny|aria|ava|allison/i.test(v.name));
  voz = preferida || enUS[0] || todas.find((v) => /^en/i.test(v.lang)) || null;
}
if (HAY_VOZ) {
  elegirVoz();
  speechSynthesis.onvoiceschanged = elegirVoz; // las voces cargan de forma asíncrona
}

export function etiquetaVelocidad() { return velocidad.toFixed(1) + '×'; }
export function ciclarVelocidad() {
  velocidad = VELOCIDADES[(VELOCIDADES.indexOf(velocidad) + 1) % VELOCIDADES.length];
  try { localStorage.setItem(CLAVE, String(velocidad)); } catch (e) { /* ok */ }
  return velocidad;
}

/** Deja solo lo que se debe pronunciar: sin "A:", sin "___", sin (notas), sin flechas. */
export function limpiarParaAudio(t) {
  return String(t ?? '')
    .replace(/^\s*[A-Za-z]+:\s+/, '')
    .replace(/_{2,}/g, ' blank ')
    .replace(/\(.*?\)/g, ' ')
    .replace(/[↗↘]/g, '')
    .replace(/→/g, ', ')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\.{3}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function nuevoUtterance(texto) {
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'en-US';
  u.rate = velocidad;
  if (voz) u.voice = voz;
  return u;
}

export function detener() {
  if (HAY_VOZ) speechSynthesis.cancel();
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.hablando').forEach((el) => el.classList.remove('hablando'));
  }
}

export function hablar(texto, btn) {
  if (!HAY_VOZ || !texto) return;
  detener();
  const u = nuevoUtterance(texto);
  if (btn) {
    btn.classList.add('hablando');
    u.onend = u.onerror = () => btn.classList.remove('hablando');
  }
  speechSynthesis.speak(u);
}

export function hablarLista(lineas, btn) {
  if (!HAY_VOZ) return;
  const utiles = lineas.filter(Boolean);
  if (!utiles.length) return;
  detener();
  if (btn) btn.classList.add('hablando');
  utiles.forEach((t, i) => {
    const u = nuevoUtterance(t);
    if (btn && i === utiles.length - 1) u.onend = u.onerror = () => btn.classList.remove('hablando');
    speechSynthesis.speak(u);
  });
}

// Las listas (diálogos, listening) se registran y el botón solo guarda el id.
const listas = new Map();
let seq = 0;
export function registrarLista(lineas) {
  const id = 'l' + (++seq);
  listas.set(id, lineas);
  return id;
}

let instalado = false;
/** Un solo listener para todos los botones [data-say] y [data-say-list]. */
export function instalarAudio() {
  if (instalado || typeof document === 'undefined') return;
  instalado = true;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say],[data-say-list]');
    if (!b) return;
    if (b.classList.contains('hablando')) { detener(); return; } // 2º clic = parar
    if (b.dataset.sayList) hablarLista(listas.get(b.dataset.sayList) || [], b);
    else hablar(b.dataset.say, b);
  });
}
