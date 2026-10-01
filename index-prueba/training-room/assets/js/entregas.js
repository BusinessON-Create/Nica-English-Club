// entregas.js — Speaking y Writing llegan al coach (colección training_v2_entregas)
//
// Doc ID determinístico: {alumnoId}__{nivelId}-{unidadId}__{tipo}
// Así reentregar sobreescribe la entrega anterior (no acumula basura) y
// alcanza con un solo getDoc para saber si ya hay algo entregado.
//
// Grabación de audio: usa MediaRecorder del navegador y se guarda como
// base64 directo en el documento (sin Firebase Storage, para no requerir
// reglas nuevas de Storage). Bueno para clips cortos de Speaking; si algún
// alumno graba muy largo, se avisa antes de entregar.

import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const LIMITE_BYTES = 700 * 1024; // ~700KB de margen bajo el límite de 1MB de un doc de Firestore

function idEntrega(alumnoId, nivelId, unidadId, tipo) {
  return `${alumnoId}__${nivelId}-${unidadId}__${tipo}`;
}

export async function cargarEntrega(alumnoId, nivelId, unidadId, tipo) {
  const db = window.trv2_db;
  const snap = await getDoc(doc(db, 'training_v2_entregas', idEntrega(alumnoId, nivelId, unidadId, tipo)));
  return snap.exists() ? snap.data() : null;
}

async function guardarEntrega(ctx, tipo, datos) {
  const db = window.trv2_db;
  const id = idEntrega(ctx.alumnoId, ctx.nivelId, ctx.unidadId, tipo);
  await setDoc(doc(db, 'training_v2_entregas', id), {
    alumnoId: ctx.alumnoId,
    alumnoNombre: ctx.alumnoNombre || '',
    alumnoEmail: ctx.alumnoEmail || '',
    nivelId: ctx.nivelId,
    unidadId: ctx.unidadId,
    unidadNombre: ctx.unidadNombre || '',
    tipo,
    ...datos,
    fecha: serverTimestamp(),
    estado: 'pendiente',
    feedbackCoach: null,
    calificadoPor: null,
    calificadoEn: null,
  }, { merge: true });
}

export async function entregarTexto(ctx, texto) {
  await guardarEntrega(ctx, 'writing', { texto, audioBase64: null });
}

export async function entregarAudio(ctx, audioBase64) {
  if (audioBase64.length > LIMITE_BYTES) {
    throw new Error('La grabación es muy larga. Grábala de nuevo, más corta.');
  }
  await guardarEntrega(ctx, 'speaking', { audioBase64, texto: null });
}

// ── Estado visual (pendiente/aprobada/refuerzo) ───────────────────────
const ETIQUETA = { pendiente: 'Entregada, esperando revisión', aprobada: 'Aprobada por tu coach', refuerzo: 'Necesita refuerzo' };
const CLASE = { pendiente: 'entregada', aprobada: 'aprobada', refuerzo: 'refuerzo' };

export function pintarEstado(el, entrega) {
  if (!entrega) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <span class="tr2-badge-estado ${CLASE[entrega.estado]}">${ETIQUETA[entrega.estado]}</span>
    ${entrega.feedbackCoach ? `<p class="tr2-feedback-coach">${entrega.feedbackCoach}</p>` : ''}
  `;
}

// ── Grabación (MediaRecorder) ─────────────────────────────────────────
let grabador = null;
let trozos = [];

export async function iniciarGrabacion() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  trozos = [];
  grabador = new MediaRecorder(stream);
  grabador.ondataavailable = (e) => trozos.push(e.data);
  grabador.start();
}

export function detenerGrabacion() {
  return new Promise((resolve) => {
    if (!grabador) return resolve(null);
    grabador.onstop = () => {
      grabador.stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(trozos, { type: 'audio/webm' });
      const lector = new FileReader();
      lector.onloadend = () => resolve(lector.result); // data:audio/webm;base64,...
      lector.readAsDataURL(blob);
    };
    grabador.stop();
  });
}

// ── Delegación de eventos (botones de grabar/entregar) ─────────────────
let instalado = false;
export function instalarEntregas() {
  if (instalado || typeof document === 'undefined') return;
  instalado = true;

  document.addEventListener('input', (e) => {
    const ta = e.target.closest('.tr2-textarea');
    if (!ta) return;
    const cont = ta.closest('.tr2-entrega');
    const palabras = ta.value.trim().split(/\s+/).filter(Boolean).length;
    cont.querySelector('.tr2-contador').textContent = `${palabras} palabra${palabras === 1 ? '' : 's'}`;
  });

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-accion]');
    if (!btn) return;
    const cont = btn.closest('.tr2-entrega');
    const ctx = JSON.parse(cont.dataset.ctx);

    if (btn.dataset.accion === 'entregar-texto') {
      const texto = cont.querySelector('.tr2-textarea').value.trim();
      if (!texto) return;
      btn.disabled = true; btn.textContent = 'Enviando…';
      await entregarTexto(ctx, texto);
      const entrega = await cargarEntrega(ctx.alumnoId, ctx.nivelId, ctx.unidadId, 'writing');
      pintarEstado(cont.querySelector('.tr2-entrega-estado'), entrega);
      btn.disabled = false; btn.textContent = 'Volver a entregar';
      return;
    }

    if (btn.dataset.accion === 'grabar') {
      try {
        await iniciarGrabacion();
        btn.dataset.accion = 'detener';
        btn.innerHTML = '<i class="fa-solid fa-stop"></i> Detener';
        btn.classList.add('tr2-grabando');
      } catch (err) {
        alert('No se pudo acceder al micrófono. Revisa los permisos del navegador.');
      }
      return;
    }

    if (btn.dataset.accion === 'detener') {
      btn.disabled = true;
      const audioBase64 = await detenerGrabacion();
      btn.disabled = false;
      btn.dataset.accion = 'grabar';
      btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Grabar de nuevo';
      btn.classList.remove('tr2-grabando');
      const audio = cont.querySelector('.tr2-audio-preview');
      audio.src = audioBase64;
      audio.style.display = 'block';
      cont.dataset.audio = audioBase64;
      cont.querySelector('.tr2-btn-entregar-audio').style.display = 'inline-flex';
      return;
    }

    if (btn.dataset.accion === 'entregar-audio') {
      const audioBase64 = cont.dataset.audio;
      if (!audioBase64) return;
      btn.disabled = true; btn.textContent = 'Enviando…';
      try {
        await entregarAudio(ctx, audioBase64);
        const entrega = await cargarEntrega(ctx.alumnoId, ctx.nivelId, ctx.unidadId, 'speaking');
        pintarEstado(cont.querySelector('.tr2-entrega-estado'), entrega);
        btn.textContent = 'Entregado ✓';
      } catch (err) {
        alert(err.message);
        btn.disabled = false; btn.textContent = 'Entregar';
      }
      return;
    }
  });
}
