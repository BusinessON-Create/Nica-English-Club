// ===== training-journey.js =====
// Todo el motor de Training Room / English Journey: progreso diario, circuito de
// ejercicios, medallas, traductor y voz. Se carga con import() dinámico, solo cuando
// un alumno inicia sesión (en segundo plano) — antes vivía dentro de index.html.
//
// Este archivo es un módulo aparte, así que NO comparte automáticamente las variables
// del script principal. Todo lo que necesita de ahí (la base de datos, la sesión activa,
// y un puñado de funciones) se pide a través de "window.algo" — ese puente se define en
// index.html, justo donde antes vivía cada una de esas piezas.

import { collection, doc, getDoc, getDocs, onSnapshot, query, where, setDoc, updateDoc, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/* ===== TRAINING ROOM — programa de 5 días/semana, progreso individual, "programación mental" ===== */
/*
  ===== PLAN MAESTRO DEL PROGRAMA (12 meses ≈ 52 semanas, 4 etapas × 13 semanas) =====
  Léeme antes de cargar o modificar semanas. Este bloque es la fuente de verdad del plan;
  cuando se publique una semana nueva desde el panel Admin, actualiza el estado (✅/⏳) aquí.
  Progresión pensada como "programación" gradual: cada etapa sube un nivel CEFR y reutiliza
  el vocabulario/gramática de la etapa anterior en situaciones más exigentes.

  ETAPA 1 — FOUNDATIONS (nivel A1) — 13 semanas — ESTADO: ✅ ya cargada en Firestore
    Lo básico para sobrevivir en inglés: alfabeto, saludos, presente simple, verbo to be,
    números, familia, rutina mínima. (Si hace falta revisar/actualizar el contenido real de
    estas 13 semanas, decírselo a Claude en una próxima sesión — el contenido vive en Firestore,
    no en este archivo, así que hay que repasarlo desde el panel.)

  ETAPA 2 — EVERYDAY ENGLISH (nivel A2) — 13 semanas — ESTADO: ⏳ en construcción
    Vida diaria real: rutinas, familia, casa, comida, compras, transporte, clima, salud,
    trabajo, tiempo libre, planes, teléfono/tecnología, viajes. Aquí el alumno empieza a
    describir su día a día con naturalidad, no solo frases sueltas.
      Semana 1  — Daily Routines (rutinas diarias)                         ✅ contenido listo, pendiente de cargar en panel
      Semana 2  — Family & Relationships (familia y relaciones)            ✅ contenido listo, pendiente de cargar en panel
      Semana 3  — Home & Household (la casa)                               ✅ contenido listo, pendiente de cargar en panel
      Semana 4  — Food & Restaurants (comida y restaurantes)               ✅ contenido listo, pendiente de cargar en panel
      Semana 5  — Shopping & Money (compras y dinero)                      ✅ contenido listo, pendiente de cargar en panel
      Semana 6  — Directions & Transportation (direcciones y transporte)   ✅ contenido listo, pendiente de cargar en panel
      Semana 7  — Weather & Seasons (clima y estaciones)                   ⏳ en espera, sin contenido definido aún
      Semana 8  — Health & Body (salud y cuerpo)                           ⏳ en espera, sin contenido definido aún
      Semana 9  — Work & Jobs (trabajo)                                    ⏳ en espera, sin contenido definido aún
      Semana 10 — Hobbies & Free Time (pasatiempos)                        ⏳ en espera, sin contenido definido aún
      Semana 11 — Making Plans & Invitations (planes e invitaciones)       ⏳ en espera, sin contenido definido aún
      Semana 12 — Phone Calls & Technology (llamadas y tecnología)         ⏳ en espera, sin contenido definido aún
      Semana 13 — Travel & Vacations (viajes — cierra la etapa, repaso)    ⏳ en espera, sin contenido definido aún

  ETAPA 3 — CONFIDENCE (nivel B1) — 13 semanas — ESTADO: ⏳ sin planear todavía
    Objetivo: opiniones, pasado/futuro con más matices, manejar conversaciones imprevistas,
    resolver problemas en inglés (reclamos, citas médicas, entrevistas). Se planea cuando
    Everyday English esté avanzado.

  ETAPA 4 — FLUENCY MODE (nivel B2) — 13 semanas — ESTADO: ⏳ sin planear todavía
    Objetivo: debates, expresiones idiomáticas, fluidez natural en temas sociales/profesionales.
    Cierre del programa de 12 meses. Se planea cuando Confidence esté avanzado.

  Cada semana en el editor de Admin lleva 5 días: prime (frase + traducción + contenido de
  lectura), pares correcto/incorrecto (This-or-That, listening, armar oración), vocabulario
  es-en (match), y el día 5 agrega el reto de voz por WhatsApp. Publicar las semanas de forma
  gradual (no todas de golpe) para ir probando que cada una funcione bien en el Training Room.
*/
const TR_ETAPAS = ['foundations','everyday','confidence','fluency'];
const TR_ETAPA_LABEL = { foundations:'Foundations', everyday:'Everyday English', confidence:'Confidence', fluency:'Fluency Mode' };
// Total real de semanas planeadas por etapa. Mientras una etapa no tenga número aquí (o el
// alumno no haya llegado a ese orden), el sistema NUNCA la marca como "completada" solo porque
// no encontró la siguiente semana en la biblioteca — eso solo significa "aún no la hemos publicado".
// Plan actual: 4 etapas × 13 semanas ≈ 52 semanas ≈ 12 meses. Ajustar aquí si el plan cambia.
const TR_ETAPA_TOTAL_SEMANAS = { foundations: 13, everyday: 13, confidence: 13, fluency: 13 };
const WA_TRAINING = '50581481862';
let trYaEscuchado = false;
let trProgresoActual = null;
let trSemanaActual = null;
let trSemanaUnsub = null;
// ===== Motor de circuito de juegos (Train) — reemplaza el viejo juego único de pares =====
let trCircuito = [];          // cola de ejercicios del día actual (se re-encola al final si falla uno)
let trCircuitoIndex = 0;
let trCircuitoKey = null;     // identifica semana+día para saber cuándo reconstruir el circuito
let trCircuitoFinalizando = false; // evita que un re-render (disparado por el propio guardado) complete el mismo día dos veces
let trCircuitoExitosos = 0;   // cuenta ejercicios superados (para sumar a "frases practicadas")
let trOrdenarRespuesta = [];  // estado del ejercicio de "armar oración" en curso
let trReconocedorVoz = null;  // instancia de SpeechRecognition en uso
let trSpeakingExitosos = 0;   // cuenta ejercicios de "speaking" superados (para la medalla Speaking Master)
let trModoPractica = null;    // { dia:1-5, paso:'prime'|'absorb'|'train'|'done' } — repaso libre, NO escribe en Firestore
// Pantalla de "Day Completed" / "Level Up": se calcula y se guarda ANTES de escribir en
// Firestore, así el listener (que puede disparar casi instantáneo por la caché local) ya
// encuentra esta bandera activa y muestra la celebración en vez del contenido del día nuevo.
// El alumno decide cuándo avanzar (Salir / Continuar), nunca pasa "de un solo".
let trPendingCelebration = null;

/* ===== TRAINING ROOM — Modo práctica (repasar días ya completados sin afectar el progreso real) ===== */
function trDiaEfectivo() { return trModoPractica ? trModoPractica.dia : (trProgresoActual ? trProgresoActual.diaActual : 1); }
function trPasoEfectivo() { return trModoPractica ? trModoPractica.paso : (trProgresoActual ? trProgresoActual.pasoActual : 'prime'); }
function trSemanaEfectiva() { return (trModoPractica && trModoPractica.semana) ? trModoPractica.semana : trSemanaActual; }
window.trAvanzarPaso = function(paso, btn) {
  if (trModoPractica) { trModoPractica.paso = paso; renderTrainingRoom(); return; }
  avanzarPasoTraining(paso, btn);
}
function renderPracticeRow() {
  // Los días anteriores ahora se repasan tocando directamente los puntitos (tr-daydots) del
  // día de la semana. Este bloque solo muestra el banner de "estás en modo práctica" para
  // que quede claro que tu progreso real no se está moviendo.
  const cont = document.getElementById('tr-practice-row');
  if (!cont || !trProgresoActual) return;
  if (trModoPractica) {
    cont.innerHTML = `<div class="tr-practice-banner"><span><i class="fa-solid fa-flask"></i> Practice mode — Day ${trModoPractica.dia} (this does not change your real progress)</span><button class="tr-mini-btn" onclick="trSalirPractica()" title="Exit practice"><i class="fa-solid fa-xmark"></i></button></div>`;
  } else {
    cont.innerHTML = '';
  }
}
window.trAbrirPracticaDia = (diaNum, semanaObj) => {
  // Si ya estábamos repasando una semana pasada (modo práctica) y el alumno toca otro día
  // desde los puntitos DENTRO de esa misma pantalla, no nos llega "semanaObj" (los puntitos
  // solo mandan el número de día) — antes esto caía de vuelta a trSemanaActual (la semana
  // real/actual), sacando al alumno de la semana que estaba repasando. Ahora, si no viene
  // semanaObj explícito, seguimos con la semana que ya se estaba repasando en modo práctica.
  const semanaDestino = semanaObj || (trModoPractica && trModoPractica.semana) || trSemanaActual;
  trModoPractica = { dia: diaNum, paso: 'prime', semana: semanaDestino };
  trCircuitoKey = null; // fuerza a reconstruir el circuito para el día que se va a repasar
  renderTrainingRoom();
};
window.trRepetirPracticaActual = () => {
  if (!trModoPractica) return;
  trAbrirPracticaDia(trModoPractica.dia, trModoPractica.semana);
};
window.trSalirPractica = () => {
  trModoPractica = null;
  trCircuitoKey = null;
  renderTrainingRoom();
};

/* ===== TRAINING ROOM — Medallas (mismo sistema de logros que ya existe, ampliado) ===== */
const TR_MEDALLAS = [
  { id:'racha3',      nombre:'3-Week Streak',      icono:'fa-fire',              check: p => (p.rachaSemanas||0) >= 3 },
  { id:'racha8',      nombre:'8-Week Streak',      icono:'fa-fire',              check: p => (p.rachaSemanas||0) >= 8 },
  { id:'semanas5',    nombre:'5 Weeks Completed',  icono:'fa-trophy',            check: p => (p.semanasCompletadas||0) >= 5 },
  { id:'semanas10',   nombre:'10 Weeks Completed', icono:'fa-trophy',            check: p => (p.semanasCompletadas||0) >= 10 },
  { id:'frases100',   nombre:'100 Phrases',        icono:'fa-graduation-cap',    check: p => (p.palabrasPracticadas||0) >= 100 },
  { id:'frases500',   nombre:'500 Phrases',        icono:'fa-graduation-cap',    check: p => (p.palabrasPracticadas||0) >= 500 },
  { id:'speaking20',  nombre:'Speaking Master',    icono:'fa-microphone-lines',  check: p => (p.speakingExitosos||0) >= 20 },
];
async function trVerificarMedallas() {
  if (!trProgresoActual || !window.getSessionActiva()) return;
  const actuales = trProgresoActual.medallas || [];
  const nuevas = TR_MEDALLAS.filter(m => !actuales.includes(m.id) && m.check(trProgresoActual));
  if (!nuevas.length) return;
  try {
    await updateDoc(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), { medallas: arrayUnion(...nuevas.map(m => m.id)) });
    nuevas.forEach(m => window.showModal('New badge! 🏅', `You just earned "${m.nombre}". Keep going!`));
  } catch (e) {
    console.error('No se pudieron guardar las nuevas medallas:', e);
  }
}

function extraerYoutubeId(url) {
  const m = String(url||'').match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}
async function obtenerPrimeraSemanaDisponible(etapa, ordenMayorQue) {
  try {
    const snap = await getDocs(query(collection(window.db,'entrenamiento_semanas'), where('etapa','==',etapa), where('activa','==',true)));
    const candidatas = snap.docs.map(d => ({ id:d.id, ...d.data() })).filter(s => (s.orden||0) > ordenMayorQue).sort((a,b) => (a.orden||0)-(b.orden||0));
    return candidatas.length ? candidatas[0] : null;
  } catch (e) { console.error('No se pudo buscar semana disponible:', e); return null; }
}
async function inicializarProgresoTraining() {
  const primera = await obtenerPrimeraSemanaDisponible('foundations', 0);
  await setDoc(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), {
    etapaActual: 'foundations', semanaIdActual: primera ? primera.id : null,
    diaActual: 1, pasoActual: 'prime',
    semanasCompletadas: 0, rachaSemanas: 0, ultimaSemanaCompletadaFecha: 0,
    retosEnviados: 0, palabrasPracticadas: 0, etapasCompletadas: [], historialSemanas: [],
    ultimoOrdenCompletado: 0
  });
}
let trReparacionEnCurso = false;
let trLibreriaEsperaUnsub = null;
// FIX: mientras el alumno está en "Looking for your next session..." (sin semana asignada),
// nos quedamos escuchando EN VIVO la biblioteca de esa etapa. En el momento en que el admin
// guarda y activa la semana que sigue, este listener la detecta y se la asigna al alumno
// automáticamente — sin que nadie tenga que refrescar la página ni reasignar nada a mano.
function trEscucharLibreriaEnEspera(etapa, ordenMayorQue) {
  if (trLibreriaEsperaUnsub) { trLibreriaEsperaUnsub(); trLibreriaEsperaUnsub = null; }
  if (!etapa) return;
  trLibreriaEsperaUnsub = onSnapshot(
    query(collection(window.db,'entrenamiento_semanas'), where('etapa','==',etapa), where('activa','==',true)),
    async snap => {
      if (!window.getSessionActiva() || !trProgresoActual || trProgresoActual.semanaIdActual) return; // ya se resolvió, no hacer nada
      const candidatas = snap.docs.map(d => ({ id:d.id, ...d.data() }))
        .filter(s => (s.orden||0) > ordenMayorQue).sort((a,b) => (a.orden||0)-(b.orden||0));
      const disponible = candidatas[0];
      if (!disponible) return;
      try {
        await updateDoc(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), {
          semanaIdActual: disponible.id, diaActual: trProgresoActual.diaActual || 1, pasoActual: trProgresoActual.pasoActual || 'prime'
        });
      } catch (e) { console.error('No se pudo auto-asignar la nueva semana publicada:', e); }
    },
    e => console.error('Error escuchando biblioteca en espera de Training Room:', e)
  );
}
async function intentarRepararSemanaFaltante(progreso) {
  if (trReparacionEnCurso || !window.getSessionActiva()) return;
  const completo = (progreso.etapasCompletadas || []).length >= 4;
  if (progreso.semanaIdActual || completo) return;
  trReparacionEnCurso = true;
  try {
    const disponible = await obtenerPrimeraSemanaDisponible(progreso.etapaActual, progreso.ultimoOrdenCompletado || 0);
    if (disponible) {
      await updateDoc(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), {
        semanaIdActual: disponible.id,
        diaActual: progreso.diaActual || 1,
        pasoActual: progreso.pasoActual || 'prime'
      });
    }
  } catch (e) {
    console.error('No se pudo reparar el progreso de Training Room:', e);
  } finally {
    trReparacionEnCurso = false;
  }
}
function escucharTraining() {
  if (trYaEscuchado || !window.getSessionActiva()) return;
  trYaEscuchado = true;
  onSnapshot(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), async snap => {
    if (!snap.exists()) { await inicializarProgresoTraining(); return; }
    const nuevo = snap.data();
    const semanaCambio = !trProgresoActual || trProgresoActual.semanaIdActual !== nuevo.semanaIdActual;
    trProgresoActual = nuevo;
    if (!nuevo.semanaIdActual) {
      intentarRepararSemanaFaltante(nuevo); // intento inmediato (por si ya hay contenido esperando)
      trEscucharLibreriaEnEspera(nuevo.etapaActual, nuevo.ultimoOrdenCompletado || 0); // se queda escuchando en vivo
    } else if (trLibreriaEsperaUnsub) {
      trLibreriaEsperaUnsub(); trLibreriaEsperaUnsub = null; // ya tiene semana, dejamos de escuchar la biblioteca
    }
    if (semanaCambio) {
      if (trSemanaUnsub) { trSemanaUnsub(); trSemanaUnsub = null; }
      trSemanaActual = null;
      if (nuevo.semanaIdActual) {
        trSemanaUnsub = onSnapshot(doc(window.db,'entrenamiento_semanas', nuevo.semanaIdActual), sd => {
          trSemanaActual = sd.exists() ? { id:sd.id, ...sd.data() } : null;
          renderTrainingRoom();
        });
      } else {
        renderTrainingRoom();
      }
    } else {
      renderTrainingRoom();
    }
  }, e => {
    console.error('Error escuchando el progreso de Training Room:', e);
  });
}

function renderTrainingRoom() {
  if (!document.getElementById('tr-content') || !trProgresoActual) return;
  renderStagePathTraining();
  renderMetricsTraining();
  renderBadgesTraining();
  renderPracticeRow();
  const cont = document.getElementById('tr-content');
  if (trPendingCelebration) { cont.innerHTML = renderCelebracionTraining(trPendingCelebration); return; }
  if (!trProgresoActual.semanaIdActual || !trSemanaActual) {
    const todoListo = trProgresoActual.etapasCompletadas && trProgresoActual.etapasCompletadas.length >= 4;
    cont.innerHTML = `<div class="tr-week-card" style="text-align:center;"><i class="fa-solid ${todoListo?'fa-trophy tr-icon-bounce':'fa-hourglass-half tr-icon-spin-slow'}" style="font-size:34px; color:var(--gold2); margin-bottom:10px;"></i><h3>${todoListo ? 'You completed the whole program!' : "Looking for your next session..."}</h3><p class="form-hint" style="margin-top:8px;">${todoListo ? 'All 4 stages finished. Amazing work reprogramming your English.' : 'We\'re checking for new content for you. If this takes more than a few seconds, come back a bit later — your progress is saved exactly where you left it.'}</p></div>`;
    return;
  }
  if (trModoPractica && trModoPractica.paso === 'done') {
    cont.innerHTML = `<div class="tr-step-card"><i class="fa-solid fa-face-smile" style="font-size:34px; color:var(--gold2); margin-bottom:8px;"></i><h3>Nice practice!</h3><p class="form-hint" style="margin-top:8px;">This was just for practice — your real progress (Day ${trProgresoActual.diaActual}) didn't move.</p><button class="btn-login" style="margin-top:14px;" onclick="trRepetirPracticaActual()">Practice this day again</button><button class="btn-login btn-outline-gold" style="margin-top:8px;" onclick="trSalirPractica()">Back to my real progress</button></div>`;
    return;
  }
  const diaEfectivo = trDiaEfectivo();
  const semanaEfectiva = trSemanaEfectiva();
  const dia = semanaEfectiva && semanaEfectiva.dias && semanaEfectiva.dias[diaEfectivo - 1];
  if (!dia) { cont.innerHTML = `<div class="tr-week-card"><p class="tr-lock-msg">This week's content is being updated. Check back soon!</p></div>`; return; }
  const pasoEfectivo = trPasoEfectivo();
  let pasoHtml = '';
  if (pasoEfectivo === 'prime') pasoHtml = renderPasoPrime(dia);
  else if (pasoEfectivo === 'absorb') pasoHtml = renderPasoAbsorb(dia);
  else if (pasoEfectivo === 'train') pasoHtml = renderPasoTrain(dia);
  else pasoHtml = renderPasoProduce(dia);

  const diaRealActual = trProgresoActual.diaActual;
  const dots = [1,2,3,4,5].map(d => {
    const esPasado = d < diaRealActual;               // ya completado → se puede repasar
    const esActual = d === diaRealActual && !trModoPractica;
    const esActualEnPractica = trModoPractica && d === trModoPractica.dia;
    const esFuturo = d > diaRealActual;
    const clases = ['tr-daylabel'];
    if (esPasado) clases.push('done', 'clickable');
    if (esActual || esActualEnPractica) clases.push('current');
    if (esFuturo) clases.push('locked');
    const click = esPasado ? ` onclick="trAbrirPracticaDia(${d})"` : '';
    const title = esPasado ? ` title="Repasar Day ${d}"` : '';
    const etiqueta = esPasado ? `<i class="fa-solid fa-check"></i>Day ${d}` : `Day ${d}`;
    return `<button type="button" class="${clases.join(' ')}"${click}${title}>${etiqueta}</button>`;
  }).join('');
  const hayDiasParaRepasar = !trModoPractica && (diaRealActual - 1) >= 1;
  const esDia5 = !trModoPractica && trProgresoActual.diaActual === 5;
  const pasos = esDia5 ? ['prime','absorb','train','produce'] : ['prime','absorb','train'];
  const nombresPaso = { prime:'Mindset', absorb:'Absorb', train:'Practice', produce:'Send to coach' };
  const idxActual = pasos.indexOf(pasoEfectivo);
  const chips = pasos.map((p,i) => `<div class="tr-step-chip ${i<idxActual?'done':i===idxActual?'active':''}">${nombresPaso[p]}</div>`).join('');

  cont.innerHTML = `<div class="tr-week-card">
    <span class="tr-etapa-tag">${TR_ETAPA_LABEL[trProgresoActual.etapaActual]}</span>
    <h3>${window.escNeclub(semanaEfectiva.titulo || 'Untitled week')}</h3>
    <div class="tr-daydots">${dots}</div>
    ${hayDiasParaRepasar ? `<p class="tr-daynav-hint"><i class="fa-solid fa-arrows-rotate"></i>Toca un día anterior para repasarlo</p>` : ''}
  </div>
  <div class="tr-steps">${chips}</div>
  ${pasoHtml}`;
}
function renderCelebracionTraining(info) {
  if (info.tipo === 'day') {
    return `<div class="tr-week-card tr-daycomplete">
      <div class="tr-dc-icon"><i class="fa-solid fa-check"></i></div>
      <h3>Day ${info.diaCompletado} Completed!</h3>
      <p class="tr-dc-sub">Nice work. Ready for Day ${info.diaCompletado + 1}, or take a break — your progress is saved either way.</p>
      <div class="tr-dc-btnrow">
        <button class="tr-dc-btn-continue" onclick="trCerrarCelebracion()">Continue → Day ${info.diaCompletado + 1} <i class="fa-solid fa-arrow-right"></i></button>
        <button class="tr-dc-btn-exit" onclick="trSalirDesdeCelebracion()">Exit</button>
      </div>
    </div>`;
  }
  // tipo === 'week' — celebración grande de "subir de nivel"
  const confetti = Array.from({length:10}).map(() => `<div class="tr-confetti-dot"></div>`).join('');
  const stageJumpHtml = info.subioDeEtapa
    ? `<div class="tr-lu-stage-jump"><b>${window.escNeclub(TR_ETAPA_LABEL[info.etapaAnterior]||'')}</b><i class="fa-solid fa-arrow-right-long"></i><b>${window.escNeclub(TR_ETAPA_LABEL[info.etapaNueva]||'')}</b></div>`
    : '';
  const nextHtml = info.siguienteTitulo
    ? `<p class="tr-lu-next"><i class="fa-solid fa-flag-checkered"></i> Next up: ${window.escNeclub(info.siguienteTitulo)}</p>`
    : `<p class="tr-lu-next"><i class="fa-solid fa-hourglass-half"></i> We're preparing your next week — check back soon</p>`;
  return `<div class="tr-week-card tr-levelup">
    <div class="tr-confetti-wrap">${confetti}</div>
    <span class="tr-lu-badge"><i class="fa-solid fa-fire"></i> ${info.rachaSemanas}-week streak</span>
    <div class="tr-lu-trophy"><i class="fa-solid fa-trophy"></i></div>
    <h2>Week Completed! 🎉</h2>
    <p class="tr-lu-sub">"${window.escNeclub(info.semanaCompletadaTitulo||'')}" is done. You just leveled up.</p>
    ${stageJumpHtml}
    ${nextHtml}
    <div class="tr-dc-btnrow">
      <button class="tr-dc-btn-continue" onclick="trCerrarCelebracion()">${info.siguienteTitulo ? 'Start next week' : 'Continue'} <i class="fa-solid fa-arrow-right"></i></button>
      <button class="tr-dc-btn-exit" onclick="trSalirDesdeCelebracion()">Exit</button>
    </div>
  </div>`;
}
window.trCerrarCelebracion = () => { trPendingCelebration = null; renderTrainingRoom(); };
window.trSalirDesdeCelebracion = () => { trPendingCelebration = null; window.showScreen('s-student'); };
function renderStagePathTraining() {
  const cont = document.getElementById('tr-stagepath');
  if (!cont) return;
  const completadas = trProgresoActual.etapasCompletadas || [];
  cont.innerHTML = TR_ETAPAS.map(e => `<div class="tr-stage-node ${completadas.includes(e)?'done':e===trProgresoActual.etapaActual?'current':''}"><div class="dot">${completadas.includes(e) ? '<i class="fa-solid fa-check"></i>' : TR_ETAPAS.indexOf(e)+1}</div><span>${TR_ETAPA_LABEL[e]}</span></div>`).join('');
}
function renderMetricsTraining() {
  const cont = document.getElementById('tr-metric-grid');
  if (!cont) return;
  const p = trProgresoActual;
  cont.innerHTML = `
    <div class="tr-metric-box"><div class="num">${p.semanasCompletadas||0}</div><div class="lbl">Weeks done</div></div>
    <div class="tr-metric-box"><div class="num">${p.rachaSemanas||0}</div><div class="lbl">Week streak <i class="fa-solid fa-fire tr-icon-fire"></i></div></div>
    <div class="tr-metric-box"><div class="num">${p.retosEnviados||0}</div><div class="lbl">Voice challenges</div></div>
    <div class="tr-metric-box"><div class="num">${p.palabrasPracticadas||0}</div><div class="lbl">Phrases practiced</div></div>`;
}
function renderBadgesTraining() {
  const cont = document.getElementById('tr-badges-row');
  if (!cont) return;
  const completadas = trProgresoActual.etapasCompletadas || [];
  const etapaChips = completadas.map(e => `<span class="tr-badge-chip"><i class="fa-solid fa-trophy tr-icon-bounce"></i> ${TR_ETAPA_LABEL[e]} completed</span>`);
  const medallasGanadas = trProgresoActual.medallas || [];
  const medallaChips = TR_MEDALLAS.filter(m => medallasGanadas.includes(m.id)).map(m => `<span class="tr-badge-chip"><i class="fa-solid ${m.icono}"></i> ${m.nombre}</span>`);
  cont.innerHTML = etapaChips.concat(medallaChips).join('');
}

function renderPasoPrime(dia) {
  return `<div class="tr-step-card">
    <span class="tr-etapa-tag">Day ${trDiaEfectivo()} · Mindset</span>
    <p class="tr-prime-phrase">"${window.escNeclub(dia.prime||'')}" ${trBotonSonido(dia.prime||'', 'en-US', 'tr-inline-speak')}</p>
    <p class="tr-prime-trans">${window.escNeclub(dia.primeTraduccion||'')}</p>
    <button class="btn-login" onclick="trAvanzarPaso('absorb', this)">I'm ready <i class="fa-solid fa-arrow-right"></i></button>
  </div>`;
}
function renderPasoAbsorb(dia) {
  let media = '';
  let botonSonidoAbsorb = '';
  if (dia.absorbTipo === 'video') {
    const yid = extraerYoutubeId(dia.absorbContenido);
    media = yid ? `<iframe src="https://www.youtube.com/embed/${yid}" frameborder="0" allowfullscreen></iframe>` : `<p>${window.escNeclub(dia.absorbContenido||'')}</p>`;
  } else if (dia.absorbTipo === 'audio') {
    media = `<audio src="${dia.absorbContenido||''}" controls style="width:100%;"></audio>`;
  } else {
    media = `${window.escNeclub(dia.absorbContenido||'')}`;
    botonSonidoAbsorb = trBotonSonido(dia.absorbContenido||'', 'en-US');
  }
  return `<div class="tr-step-card">
    <span class="tr-etapa-tag">Day ${trDiaEfectivo()} · Absorb</span>
    <div class="tr-absorb-content">${media}</div>
    ${botonSonidoAbsorb ? `<div style="margin:-8px 0 14px;">${botonSonidoAbsorb}</div>` : ''}
    <button class="btn-login" onclick="trAvanzarPaso('train', this)">Continue <i class="fa-solid fa-arrow-right"></i></button>
  </div>`;
}
/* ===== TRAINING ROOM — Circuito de juegos "Train" (estilo Duolingo) =====
   Cada día genera automáticamente una mezcla de ejercicios a partir de lo que
   el admin ya llena en el panel (prime + pares). No requiere campos nuevos.
   El tipo de ejercicios disponibles crece con el día de la semana, para que
   se sienta como una progresión de "programación mental":
     Día 1-2: Reconocer  (pares + listening)
     Día 3:   + Construir (armar oración)
     Día 4-5: + Producir  (speaking con el micrófono)
   Si el navegador no soporta reconocimiento de voz (ej. Safari/iPhone),
   "speaking" se omite automáticamente y no bloquea a nadie. */

function trSpeechSoportado() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
function trTiposDisponiblesPorDia(diaNum) {
  let tipos;
  if (diaNum <= 2) tipos = ['pares', 'listening', 'match'];
  else if (diaNum === 3) tipos = ['pares', 'listening', 'match', 'ordenar'];
  else tipos = ['pares', 'listening', 'match', 'ordenar', 'speaking'];
  if (tipos.includes('speaking') && !trSpeechSoportado()) tipos = tipos.filter(t => t !== 'speaking');
  return tipos;
}
function trBarajar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function trCantidadesCircuito(total) {
  // Más pares cargados por el admin = sesión más larga. Con 6 pares (Semana 1) se mantiene igual que siempre.
  if (total >= 10) return { pares: 6, listening: 5 };
  if (total >= 8) return { pares: 5, listening: 4 };
  return { pares: 3, listening: 2 };
}
const TR_MATCH_MIN = 4;   // mínimo de pares de vocabulario para armar una ronda de Match
const TR_MATCH_MAX = 10;  // máximo de tarjetas por ronda — el grid es una lista vertical con scroll, no una cuadrícula fija, así que soporta las 10 sin apretar la pantalla
function trConstruirCircuito(dia, diaNum) {
  const tipos = trTiposDisponiblesPorDia(diaNum);
  const paresValidos = (dia.pares || []).filter(p => p && p.correcta && p.incorrecta);
  const cant = trCantidadesCircuito(paresValidos.length);
  const ejercicios = [];
  if (tipos.includes('pares')) {
    trBarajar(paresValidos).slice(0, cant.pares).forEach(p => ejercicios.push({ tipo: 'pares', par: p }));
  }
  if (tipos.includes('listening') && paresValidos.length) {
    trBarajar(paresValidos).slice(0, cant.listening).forEach(p => ejercicios.push({ tipo: 'listening', par: p }));
  }
  if (tipos.includes('match')) {
    const vocabValido = (dia.vocabulario || []).filter(v => v && v.es && v.en);
    // Solo armamos la ronda si hay suficientes pares como para que valga la pena emparejar
    // (con 1-3 sería demasiado obvio/corto). Si el día no tiene vocabulario cargado, simplemente
    // no aparece "Match" ese día — igual que "ordenar" se omite si la frase es muy corta.
    if (vocabValido.length >= TR_MATCH_MIN) {
      ejercicios.push({ tipo: 'match', pares: trBarajar(vocabValido).slice(0, TR_MATCH_MAX) });
    }
  }
  if (tipos.includes('ordenar')) {
    const frase = (dia.prime || '').trim();
    if (frase.split(/\s+/).length >= 3) ejercicios.push({ tipo: 'ordenar', frase, traduccion: (dia.primeTraduccion || '').trim() });
  }
  if (tipos.includes('speaking')) {
    const frase = (dia.prime || (paresValidos[0] && paresValidos[0].correcta) || '').trim();
    if (frase) ejercicios.push({ tipo: 'speaking', frase });
  }
  return trBarajar(ejercicios);
}
function renderPasoTrain(dia) {
  const diaEfectivo = trDiaEfectivo();
  const semanaEfectiva = trSemanaEfectiva();
  const key = (semanaEfectiva ? semanaEfectiva.id : '') + '-' + diaEfectivo + (trModoPractica ? '-practice' : '');
  if (trCircuitoKey !== key) {
    trCircuito = trConstruirCircuito(dia, diaEfectivo);
    trCircuitoIndex = 0;
    trCircuitoExitosos = 0;
    trSpeakingExitosos = 0;
    trCircuitoKey = key;
    trCircuitoFinalizando = false; // día/circuito nuevo: se habilita de nuevo el cierre
  }
  if (!trCircuito.length) {
    // FIX: guardar el día dispara un re-render (por el listener de Firestore) ANTES de que
    // diaActual/pasoActual cambien localmente. Sin este seguro, ese re-render vuelve a ver el
    // circuito vacío y llama trCircuitoCompletado() otra vez — y otra, y otra — sumando frases
    // de más y saltando varios días de golpe. Con la bandera, solo la primera llamada se ejecuta;
    // se vuelve a habilitar arriba, en cuanto arranca un circuito nuevo de verdad.
    if (!trCircuitoFinalizando) { trCircuitoFinalizando = true; setTimeout(() => trCircuitoCompletado(), 0); }
    return `<div class="tr-step-card"><p class="tr-lock-msg">Loading...</p></div>`;
  }
  const ej = trCircuito[trCircuitoIndex];
  const progreso = `Exercise ${trCircuitoIndex + 1} / ${trCircuito.length}`;
  if (ej.tipo === 'pares') return trRenderPares(ej, progreso);
  if (ej.tipo === 'listening') return trRenderListening(ej, progreso);
  if (ej.tipo === 'match') return trRenderMatch(ej, progreso);
  if (ej.tipo === 'ordenar') return trRenderOrdenar(ej, progreso);
  if (ej.tipo === 'speaking') return trRenderSpeaking(ej, progreso);
  return `<div class="tr-step-card"><p class="tr-lock-msg">Loading...</p></div>`;
}

/* --- Ejercicio: Pares (elegir la frase correcta) --- */
function trRenderPares(ej, progreso) {
  const izqEsCorrecta = Math.random() < 0.5;
  const opA = izqEsCorrecta ? ej.par.correcta : ej.par.incorrecta;
  const opB = izqEsCorrecta ? ej.par.incorrecta : ej.par.correcta;
  return `<div class="tr-step-card">
    <span class="tr-circuit-tag"><i class="fa-solid fa-check-double"></i> Recognize</span>
    <p class="tr-tot-progress">Pick the correct one — ${progreso}</p>
    <div class="tr-tot-pair" id="tr-tot-pair">
      <button class="tr-tot-opt" data-correcta="${izqEsCorrecta ? '1' : '0'}" onclick="trResponderOpcion(this)">${window.escNeclub(opA)}</button>
      <button class="tr-tot-opt" data-correcta="${izqEsCorrecta ? '0' : '1'}" onclick="trResponderOpcion(this)">${window.escNeclub(opB)}</button>
    </div>
  </div>`;
}
/* --- Ejercicio: Listening (escuchar y elegir lo que se dijo) --- */
function trRenderListening(ej, progreso) {
  const izqEsCorrecta = Math.random() < 0.5;
  const opA = izqEsCorrecta ? ej.par.correcta : ej.par.incorrecta;
  const opB = izqEsCorrecta ? ej.par.incorrecta : ej.par.correcta;
  return `<div class="tr-step-card">
    <span class="tr-circuit-tag"><i class="fa-solid fa-ear-listen"></i> Listening</span>
    <p class="tr-tot-progress">Listen and choose what you heard — ${progreso}</p>
    <button type="button" class="tr-listen-btn" id="tr-listen-btn" data-texto="${window.escNeclub(ej.par.correcta)}" onclick="trReproducirListening(this,this.dataset.texto)"><i class="fa-solid fa-volume-high"></i></button>
    <div class="tr-tot-pair" id="tr-tot-pair">
      <button class="tr-tot-opt" data-correcta="${izqEsCorrecta ? '1' : '0'}" onclick="trResponderOpcion(this)">${window.escNeclub(opA)}</button>
      <button class="tr-tot-opt" data-correcta="${izqEsCorrecta ? '0' : '1'}" onclick="trResponderOpcion(this)">${window.escNeclub(opB)}</button>
    </div>
  </div>`;
}
window.trReproducirListening = (btn, texto) => {
  btn.classList.add('playing');
  try {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'en-US';
    u.onend = () => btn.classList.remove('playing');
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) { btn.classList.remove('playing'); }
};

/* --- Ejercicio: Match (vocabulario español-inglés, varias tarjetas en la misma pantalla) ---
   Distinto del "This or That" (pares correcta/incorrecta, ambas en inglés): aquí sí hay
   palabras/frases en ESPAÑOL a un lado y su traducción en INGLÉS al otro, revueltas cada una
   por su cuenta, y el alumno las va tocando de a dos hasta emparejarlas todas. */
let trMatchSeleccion = null; // { gid, side, el }
let trMatchEmparejados = 0;
let trMatchTotal = 0;
let trMatchBloqueado = false;
function trRenderMatch(ej, progreso) {
  trMatchSeleccion = null;
  trMatchEmparejados = 0;
  trMatchTotal = ej.pares.length;
  trMatchBloqueado = false;
  const izquierda = trBarajar(ej.pares.map((p, i) => ({ ...p, gid: i })));
  const derecha = trBarajar(ej.pares.map((p, i) => ({ ...p, gid: i })));
  const ficha = (item, side) => `<button type="button" class="tr-match-tile" data-gid="${item.gid}" data-side="${side}" onclick="trTocarFichaMatch(this)">${window.escNeclub(side === 'es' ? item.es : item.en)}</button>`;
  return `<div class="tr-step-card">
    <span class="tr-circuit-tag"><i class="fa-solid fa-shuffle"></i> Match</span>
    <p class="tr-tot-progress">Tap the matching pairs (Spanish ↔ English) — ${progreso}</p>
    <div class="tr-match-grid" id="tr-match-grid">
      <div class="tr-match-col">${izquierda.map(i => ficha(i, 'es')).join('')}</div>
      <div class="tr-match-col">${derecha.map(i => ficha(i, 'en')).join('')}</div>
    </div>
    <p class="tr-match-progress" id="tr-match-progress">0 / ${trMatchTotal} matched</p>
  </div>`;
}
window.trTocarFichaMatch = (el) => {
  if (trMatchBloqueado || el.disabled || el.classList.contains('matched')) return;
  const gid = el.dataset.gid, side = el.dataset.side;
  if (!trMatchSeleccion) { el.classList.add('selected'); trMatchSeleccion = { gid, side, el }; return; }
  if (trMatchSeleccion.el === el) return; // tocó la misma ficha dos veces
  if (trMatchSeleccion.side === side) {
    // tocó otra ficha del mismo lado: cambia la selección, no cuenta como intento
    trMatchSeleccion.el.classList.remove('selected');
    el.classList.add('selected');
    trMatchSeleccion = { gid, side, el };
    return;
  }
  const previa = trMatchSeleccion.el;
  if (trMatchSeleccion.gid === gid) {
    // ¡Pareja correcta!
    previa.classList.remove('selected'); previa.classList.add('matched'); previa.disabled = true;
    el.classList.add('matched'); el.disabled = true;
    trMatchEmparejados++;
    trMatchSeleccion = null;
    const prog = document.getElementById('tr-match-progress');
    if (prog) prog.textContent = `${trMatchEmparejados} / ${trMatchTotal} matched`;
    if (trMatchEmparejados >= trMatchTotal) setTimeout(() => trResolverEjercicio(true), 500);
  } else {
    // No coinciden: las dos tiemblan en rojo un instante y quedan libres de nuevo
    trMatchBloqueado = true;
    previa.classList.remove('selected'); previa.classList.add('incorrect');
    el.classList.add('incorrect');
    trMatchSeleccion = null;
    setTimeout(() => { previa.classList.remove('incorrect'); el.classList.remove('incorrect'); trMatchBloqueado = false; }, 550);
  }
};
window.trResponderOpcion = (btn) => {
  const wrap = document.getElementById('tr-tot-pair');
  if (!wrap || wrap.dataset.bloqueado) return;
  wrap.dataset.bloqueado = '1';
  wrap.querySelectorAll('.tr-tot-opt').forEach(b => {
    b.disabled = true;
    if (b.dataset.correcta === '1') b.classList.add('correct');
  });
  const exito = btn.dataset.correcta === '1';
  if (!exito) btn.classList.add('incorrect');
  setTimeout(() => trResolverEjercicio(exito), 700);
};

/* --- Ejercicio: Armar oración (sentence builder) --- */
function trRenderOrdenar(ej, progreso) {
  const palabras = ej.frase.split(/\s+/);
  const barajadas = trBarajar(palabras.map((p, i) => ({ texto: p, id: i })));
  trOrdenarRespuesta = [];
  return `<div class="tr-step-card">
    <span class="tr-circuit-tag"><i class="fa-solid fa-puzzle-piece"></i> Build</span>
    <p class="tr-tot-progress">Tap the words in the right order — ${progreso}</p>
    ${ej.traduccion ? `<p class="tr-prime-trans" style="margin-bottom:14px;"><i class="fa-solid fa-language"></i> ${window.escNeclub(ej.traduccion)}</p>` : ''}
    <div class="tr-ord-answer" id="tr-ord-answer"></div>
    <div class="tr-ord-bank" id="tr-ord-bank">
      ${barajadas.map(w => `<button type="button" class="tr-ord-chip" id="tr-ord-w${w.id}" data-texto="${window.escNeclub(w.texto)}" onclick="trTocarPalabraOrdenar(${w.id}, this)">${window.escNeclub(w.texto)}</button>`).join('')}
    </div>
    <button class="btn-login btn-outline-gold" type="button" onclick="trReiniciarOrdenar()" style="margin-top:4px;">Reset</button>
  </div>`;
}
window.trTocarPalabraOrdenar = (id, chipEl) => {
  const chip = chipEl || document.getElementById('tr-ord-w' + id);
  if (!chip || chip.classList.contains('used')) return;
  const texto = chip.dataset.texto;
  chip.classList.add('used');
  trOrdenarRespuesta.push({ id, texto });
  const ans = document.getElementById('tr-ord-answer');
  const span = document.createElement('button');
  span.type = 'button';
  span.className = 'tr-ord-chip';
  span.textContent = texto;
  span.onclick = () => trQuitarPalabraOrdenar(id, span);
  ans.appendChild(span);
  const totalPalabras = document.querySelectorAll('#tr-ord-bank .tr-ord-chip').length;
  if (trOrdenarRespuesta.length === totalPalabras) trVerificarOrdenar();
};
window.trQuitarPalabraOrdenar = (id, span) => {
  span.remove();
  trOrdenarRespuesta = trOrdenarRespuesta.filter(w => w.id !== id);
  const chip = document.getElementById('tr-ord-w' + id);
  if (chip) chip.classList.remove('used');
};
window.trReiniciarOrdenar = () => {
  renderTrainingRoom(); // re-dibuja el mismo ejercicio (misma trCircuitoIndex) con palabras barajadas de nuevo
};
function trVerificarOrdenar() {
  const ej = trCircuito[trCircuitoIndex];
  const objetivo = ej.frase.split(/\s+/).map(w => w.toLowerCase().replace(/[.,!?]/g, ''));
  const dado = trOrdenarRespuesta.map(w => w.texto.toLowerCase().replace(/[.,!?]/g, ''));
  const exito = objetivo.length === dado.length && objetivo.every((w, i) => w === dado[i]);
  document.querySelectorAll('#tr-ord-answer .tr-ord-chip').forEach(c => { if (!exito) c.classList.add('wrong-flash'); });
  setTimeout(() => trResolverEjercicio(exito), 700);
}

/* --- Ejercicio: Speaking (repetir en voz alta, con reconocimiento de voz) --- */
function trSimilitudTexto(esperado, obtenido) {
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/g, '').trim().split(/\s+/).filter(Boolean);
  const a = norm(esperado), b = norm(obtenido);
  if (!a.length) return 0;
  const bCopy = b.slice();
  let coincididas = 0;
  a.forEach(palabra => { const idx = bCopy.indexOf(palabra); if (idx !== -1) { coincididas++; bCopy.splice(idx, 1); } });
  return Math.round((coincididas / a.length) * 100);
}
function trRenderSpeaking(ej, progreso) {
  return `<div class="tr-step-card">
    <span class="tr-circuit-tag"><i class="fa-solid fa-microphone-lines"></i> Speak</span>
    <p class="tr-tot-progress">Say this out loud — ${progreso}</p>
    <p class="tr-prime-phrase" style="font-size:18px;">"${window.escNeclub(ej.frase)}" ${trBotonSonido(ej.frase, 'en-US')}</p>
    <button type="button" class="tr-mic-btn" id="tr-mic-btn" onclick="trEscucharSpeaking()"><i class="fa-solid fa-microphone"></i></button>
    <p class="tr-mic-status" id="tr-mic-status">Tap the mic and repeat the sentence</p>
  </div>`;
}
window.trEscucharSpeaking = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const btn = document.getElementById('tr-mic-btn');
  const status = document.getElementById('tr-mic-status');
  if (!SR) { status.textContent = "Your browser doesn't support voice recognition."; return; }
  if (btn.classList.contains('recording')) return;
  const ej = trCircuito[trCircuitoIndex];
  btn.classList.add('recording');
  status.innerHTML = '<i class="fa-solid fa-ear-listen"></i> Listening...';
  trReconocedorVoz = new SR();
  trReconocedorVoz.lang = 'en-US';
  trReconocedorVoz.interimResults = false;
  trReconocedorVoz.maxAlternatives = 1;
  trReconocedorVoz.onresult = (e) => {
    const dicho = e.results[0][0].transcript;
    const pct = trSimilitudTexto(ej.frase, dicho);
    const exito = pct >= 80;
    status.innerHTML = `You said: "${window.escNeclub(dicho)}" — <span class="tr-mic-feedback ${exito ? 'ok' : 'retry'}">${pct}% match</span>`;
    setTimeout(() => trResolverEjercicio(exito), 1300);
  };
  trReconocedorVoz.onerror = () => {
    btn.classList.remove('recording');
    status.textContent = "Couldn't hear you clearly. Tap the mic to try again.";
  };
  trReconocedorVoz.onend = () => { btn.classList.remove('recording'); };
  try { trReconocedorVoz.start(); } catch (e) { btn.classList.remove('recording'); }
};

/* --- Resolver ejercicio y avanzar el circuito --- */
async function trResolverEjercicio(exito) {
  const ej = trCircuito[trCircuitoIndex];
  if (exito) {
    trCircuitoExitosos++;
    if (ej.tipo === 'speaking') trSpeakingExitosos++;
    trCircuito.splice(trCircuitoIndex, 1); // se quita de la cola
  } else {
    trCircuito.splice(trCircuitoIndex, 1);
    trCircuito.push(ej); // se re-encola al final para repetirlo luego, como Duolingo
  }
  if (trCircuitoIndex >= trCircuito.length) trCircuitoIndex = 0;
  if (!trCircuito.length) { trCircuitoFinalizando = true; await trCircuitoCompletado(); return; }
  renderTrainingRoom();
}
async function trCircuitoCompletado() {
  if (trModoPractica) {
    // Modo práctica: no se escribe nada en Firestore (ni frases practicadas, ni racha, ni día).
    // Es solo repaso libre para que el alumno (o tú probando) pueda repetir un día ya visto.
    trModoPractica.paso = 'done';
    renderTrainingRoom();
    return;
  }
  try {
    const cambios = {};
    if (trCircuitoExitosos > 0) cambios.palabrasPracticadas = increment(trCircuitoExitosos);
    if (trSpeakingExitosos > 0) cambios.speakingExitosos = increment(trSpeakingExitosos);
    if (Object.keys(cambios).length) await updateDoc(doc(window.db, 'entrenamiento_progreso', window.getSessionActiva().id), cambios);
    await trVerificarMedallas();
  } catch (e) {
    console.error('No se pudo guardar tu práctica en Training Room:', e);
    window.showModal('No se pudo guardar tu avance', 'Revisa tu conexión a internet e intenta de nuevo. Tus respuestas de este ejercicio no se perdieron, solo necesitamos reintentar guardarlas.');
    return;
  }
  if (trProgresoActual.diaActual === 5) {
    avanzarPasoTraining('produce'); // día 5: se mantiene el envío de audio al coach por WhatsApp
  } else {
    completarDiaTraining(); // días 1-4: el circuito de juegos ES la práctica del día, no hay WhatsApp
  }
}
function renderPasoProduce(dia) {
  return `<div class="tr-step-card">
    <span class="tr-etapa-tag">Day ${trProgresoActual.diaActual} · Weekly check-in with your coach</span>
    <p class="form-hint" style="margin:4px 0 12px;">This is the only voice note of the week — your coach listens to it to check how you're doing.</p>
    <div class="tr-reto-box"><p>${window.escNeclub(dia.retoPregunta||'')}</p></div>
    <button class="tr-wa-btn" onclick="enviarRetoTrainingWA()"><i class="fa-brands fa-whatsapp"></i> Record & Send</button>
    <button class="tr-confirm-btn" id="tr-confirm-btn" onclick="completarDiaTraining()"><i class="fa-solid fa-circle-check"></i> I already sent it</button>
  </div>`;
}
window.enviarRetoTrainingWA = () => {
  const dia = trSemanaActual && trSemanaActual.dias ? trSemanaActual.dias[trProgresoActual.diaActual - 1] : null;
  const pregunta = dia ? (dia.retoPregunta || '') : '';
  const nombre = window.getSessionActiva() ? window.getSessionActiva().nombre : '';
  const mensaje = `Hi! I'm ${nombre}. This is my Training Room voice challenge (Day ${trProgresoActual.diaActual}):\n"${pregunta}"\n(sending my voice note now)`;
  window.open(`https://wa.me/${WA_TRAINING}?text=${encodeURIComponent(mensaje)}`, '_blank');
  const btn = document.getElementById('tr-confirm-btn');
  if (btn) btn.classList.add('ready');
};
window.avanzarPasoTraining = (paso, btn) => {
  if (btn) { btn.disabled = true; btn.dataset.textoOriginal = btn.innerHTML; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...'; }
  updateDoc(doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id), { pasoActual: paso }).catch(e => {
    console.error('No se pudo avanzar de paso en Training Room:', e);
    window.showModal('No se pudo guardar tu avance', 'Revisa tu conexión a internet e intenta de nuevo.');
    if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.textoOriginal; }
  });
};
window.completarDiaTraining = async () => {
  if (!trProgresoActual || !window.getSessionActiva()) return;
  const btn = document.getElementById('tr-confirm-btn');
  if (btn) { btn.disabled = true; btn.dataset.textoOriginal = btn.innerHTML; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...'; }
  const ref = doc(window.db,'entrenamiento_progreso', window.getSessionActiva().id);
  try {
    if (trProgresoActual.diaActual < 5) {
      // Días 1-4: el circuito de juegos YA fue la práctica del día, no hay envío de audio por WhatsApp.
      // Activamos la bandera de celebración ANTES del updateDoc para que el listener de Firestore
      // (que puede disparar casi instantáneo desde la caché local) ya la encuentre activa y
      // muestre "Day Completed" en vez de saltar directo al contenido del día siguiente.
      trPendingCelebration = { tipo: 'day', diaCompletado: trProgresoActual.diaActual };
      await updateDoc(ref, { diaActual: increment(1), pasoActual: 'prime' });
      return;
    }
    // día 5: se completó la semana entera
    const ahora = Date.now();
    const ultima = trProgresoActual.ultimaSemanaCompletadaFecha || 0;
    const nuevaRacha = (!ultima || (ahora - ultima) <= 9*24*60*60*1000) ? (trProgresoActual.rachaSemanas||0) + 1 : 1;
    const ordenActual = trSemanaActual ? (trSemanaActual.orden||0) : 0;
    let siguiente = await obtenerPrimeraSemanaDisponible(trProgresoActual.etapaActual, ordenActual);
    let nuevaEtapa = trProgresoActual.etapaActual;
    let nuevasEtapasCompletadas = trProgresoActual.etapasCompletadas || [];
    // Solo consideramos la etapa "realmente terminada" si ya sabemos cuántas semanas tiene en
    // total esa etapa (TR_ETAPA_TOTAL_SEMANAS) Y el alumno llegó a esa última semana. Si la
    // biblioteca simplemente no tiene la siguiente semana publicada todavía, NO avanzamos de
    // etapa ni otorgamos el badge — el alumno se queda esperando contenido nuevo, sin perder
    // su lugar ni recibir un logro que no ganó.
    const totalEtapa = TR_ETAPA_TOTAL_SEMANAS[nuevaEtapa];
    const etapaRealmenteTerminada = !siguiente && !!totalEtapa && ordenActual >= totalEtapa;
    if (!siguiente && etapaRealmenteTerminada) {
      if (!nuevasEtapasCompletadas.includes(nuevaEtapa)) nuevasEtapasCompletadas = [...nuevasEtapasCompletadas, nuevaEtapa];
      const idx = TR_ETAPAS.indexOf(nuevaEtapa);
      if (idx < TR_ETAPAS.length - 1) {
        nuevaEtapa = TR_ETAPAS[idx+1];
        siguiente = await obtenerPrimeraSemanaDisponible(nuevaEtapa, 0);
      }
    }
    // Igual que en el caso de día 1-4: activamos la celebración ANTES del updateDoc para que
    // nunca se vea "de un solo" el salto a la semana/etapa siguiente.
    trPendingCelebration = {
      tipo: 'week',
      semanaCompletadaTitulo: trSemanaActual ? trSemanaActual.titulo : '',
      siguienteTitulo: siguiente ? siguiente.titulo : null,
      rachaSemanas: nuevaRacha,
      subioDeEtapa: nuevaEtapa !== trProgresoActual.etapaActual,
      etapaNueva: nuevaEtapa,
      etapaAnterior: trProgresoActual.etapaActual
    };
    await updateDoc(ref, {
      semanasCompletadas: increment(1),
      rachaSemanas: nuevaRacha,
      ultimaSemanaCompletadaFecha: ahora,
      retosEnviados: increment(1),
      etapaActual: nuevaEtapa,
      etapasCompletadas: nuevasEtapasCompletadas,
      semanaIdActual: siguiente ? siguiente.id : null,
      // Si nos quedamos en la misma etapa (con o sin siguiente semana lista), recordamos hasta
      // dónde llegó el alumno para no hacerlo repetir semanas ya hechas cuando se autorepare.
      ultimoOrdenCompletado: nuevaEtapa === trProgresoActual.etapaActual ? ordenActual : 0,
      diaActual: 1,
      pasoActual: 'prime',
      // Guardamos la semana recién terminada en el historial para que el alumno
      // pueda repasarla después desde English Journey (Mindset/Absorb + audio).
      ...(trSemanaActual ? { historialSemanas: arrayUnion(trSemanaActual.id) } : {})
    });
    setTimeout(() => trVerificarMedallas(), 800); // deja que el listener sincronice el nuevo progreso antes de chequear
  } catch (e) {
    console.error('No se pudo completar el día de Training Room:', e);
    trPendingCelebration = null; // el guardado falló: no mostramos celebración de algo que no se guardó
    window.showModal('No se pudo guardar tu progreso', 'Revisa tu conexión a internet e intenta de nuevo. Tu reto de voz ya fue enviado, solo falta guardar el avance del día.');
    if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.textoOriginal; }
  }
};

/* ===== TRAINING ROOM — Pronunciación (texto a voz) ===== */
// Se usa en Mindset, Absorb, el traductor y English Journey. Un solo botón reutilizable.
function trBotonSonido(texto, lang, claseExtra) {
  const limpio = String(texto || '').trim();
  if (!limpio) return '';
  return `<button type="button" class="tr-speak-btn ${claseExtra||''}" data-speak="${window.escNeclub(limpio)}" data-lang="${lang||'en-US'}" onclick="trHablar(this)" title="Escuchar pronunciación"><i class="fa-solid fa-volume-high"></i></button>`;
}
let trUtteranceActual = null;
let trVocesDisponibles = [];
let trVocesListas = false;
function trCargarVoces() {
  if (!('speechSynthesis' in window)) return;
  trVocesDisponibles = window.speechSynthesis.getVoices() || [];
  if (trVocesDisponibles.length) trVocesListas = true;
}
if ('speechSynthesis' in window) {
  trCargarVoces();
  // En Chrome/Android las voces se cargan de forma asíncrona; si tocamos el botón de sonido
  // antes de que 'voiceschanged' dispare, el navegador a veces se queda mudo sin avisar.
  window.speechSynthesis.onvoiceschanged = trCargarVoces;
}
function trMejorVozPara(lang) {
  if (!trVocesDisponibles.length) return null;
  const base = String(lang||'en-US').toLowerCase();
  const corto = base.split('-')[0];
  return trVocesDisponibles.find(v => v.lang && v.lang.toLowerCase() === base)
      || trVocesDisponibles.find(v => v.lang && v.lang.toLowerCase().startsWith(corto))
      || null;
}
function trAvisoSinAudio(btn) {
  // Aviso corto y no intrusivo (evita el "silencio total" sin explicación) cuando de verdad
  // no hay ninguna voz disponible en el idioma pedido en este dispositivo.
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    btn.title = 'Sin voz de audio en este dispositivo';
    setTimeout(() => { btn.innerHTML = original; }, 1800);
  }
}
function trEjecutarHabla(texto, lang, btn) {
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = lang;
  const voz = trMejorVozPara(lang);
  if (voz) u.voice = voz;
  u.rate = 0.92;
  if (btn) {
    btn.classList.add('playing');
    u.onend = () => btn.classList.remove('playing');
    u.onerror = () => { btn.classList.remove('playing'); trAvisoSinAudio(btn); };
  }
  trUtteranceActual = u;
  window.speechSynthesis.speak(u);
}
window.trHablar = (origen) => {
  if (!('speechSynthesis' in window)) {
    window.showModal('Audio no disponible', 'Tu navegador no soporta la pronunciación por voz. Prueba con Chrome o Safari actualizados.');
    return;
  }
  // 'origen' puede ser el botón (lee data-speak/data-lang) o directamente un texto plano.
  let texto, lang, btn;
  if (typeof origen === 'string') { texto = origen; lang = 'en-US'; }
  else { btn = origen; texto = btn.dataset.speak; lang = btn.dataset.lang || 'en-US'; }
  document.querySelectorAll('.tr-speak-btn.playing').forEach(b => b.classList.remove('playing'));
  if (!texto) return;
  window.speechSynthesis.cancel();
  // FIX del bug intermitente: llamar cancel() y speak() en el mismo tick hace que varios
  // navegadores (sobre todo Chrome en Android) descarten también la nueva frase, quedándose
  // en silencio sin ningún error. Con un pequeño respiro después del cancel(), esto casi
  // siempre desaparece.
  setTimeout(() => {
    if (!trVocesListas) trCargarVoces(); // último intento por si 'voiceschanged' nunca disparó
    trEjecutarHabla(texto, lang, btn);
  }, 70);
};

/* ===== TRAINING ROOM — Traductor (solo dentro del Training Room) ===== */
const TR_TRANSLATE_API_KEY = 'AIzaSyC3dxkhRo1OWA7RpFRpqmmJseo9KtV1HA8';
let trTraduccionEnCurso = false;
async function trLlamarGoogleTranslate(texto, target, source) {
  const params = new URLSearchParams({ key: TR_TRANSLATE_API_KEY, q: texto, target, format: 'text' });
  if (source) params.append('source', source);
  const resp = await fetch(`https://translation.googleapis.com/language/translate/v2?${params.toString()}`, { method: 'POST' });
  const data = await resp.json();
  if (!resp.ok || !data || !data.data) {
    const msg = (data && data.error && data.error.message) ? data.error.message : 'Error desconocido';
    throw new Error(msg);
  }
  return data.data.translations[0];
}
window.trToggleNavSearch = function () {
  const wrap = document.getElementById('tr-nav-search-wrap');
  const journeyBtn = document.getElementById('tr-nav-journey-btn');
  const icon = document.getElementById('tr-nav-toggle-search-icon');
  const input = document.getElementById('tr-search-input');
  const cont = document.getElementById('tr-translate-result');
  const abrir = !wrap.classList.contains('open');
  wrap.classList.toggle('open', abrir);
  if (journeyBtn) journeyBtn.style.display = abrir ? 'none' : 'flex';
  icon.className = abrir ? 'fa-solid fa-xmark' : 'fa-solid fa-magnifying-glass';
  if (abrir) {
    input.focus();
  } else {
    input.value = '';
    if (cont) cont.innerHTML = '';
  }
};
window.trBuscarTraduccion = async () => {
  if (trTraduccionEnCurso) return;
  const input = document.getElementById('tr-search-input');
  const cont = document.getElementById('tr-translate-result');
  const btn = document.getElementById('tr-search-btn');
  const texto = (input.value || '').trim();
  if (!texto) return;
  trTraduccionEnCurso = true;
  btn.disabled = true;
  const iconoOriginal = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  cont.innerHTML = `<div class="tr-translate-card"><p class="tr-translate-note"><i class="fa-solid fa-spinner fa-spin"></i> Translating...</p></div>`;
  try {
    // 1) Primero probamos traducir hacia inglés (nos dice el idioma detectado).
    const primero = await trLlamarGoogleTranslate(texto, 'en');
    const idiomaDetectado = (primero.detectedSourceLanguage || '').toLowerCase();
    let filaOriginal, filaTraduccion;
    if (idiomaDetectado === 'en') {
      // El alumno escribió en inglés → mostramos también la traducción al español.
      const segundo = await trLlamarGoogleTranslate(texto, 'es', 'en');
      filaOriginal = { texto, lang: 'en-US', etiqueta: 'English' };
      filaTraduccion = { texto: segundo.translatedText, lang: 'es-ES', etiqueta: 'Español' };
    } else {
      // El alumno escribió en español (u otro idioma) → ya tenemos el inglés.
      filaOriginal = { texto, lang: 'es-ES', etiqueta: idiomaDetectado === 'es' ? 'Español' : idiomaDetectado.toUpperCase() };
      filaTraduccion = { texto: primero.translatedText, lang: 'en-US', etiqueta: 'English' };
    }
    cont.innerHTML = `<div class="tr-translate-card">
      <div class="tr-translate-row">
        <div class="tr-translate-text"><span class="tr-translate-lang">${window.escNeclub(filaOriginal.etiqueta)}</span><span class="tr-translate-word">${window.escNeclub(filaOriginal.texto)}</span></div>
        ${trBotonSonido(filaOriginal.texto, filaOriginal.lang)}
      </div>
      <div class="tr-translate-row">
        <div class="tr-translate-text"><span class="tr-translate-lang">${window.escNeclub(filaTraduccion.etiqueta)}</span><span class="tr-translate-word">${window.escNeclub(filaTraduccion.texto)}</span></div>
        ${trBotonSonido(filaTraduccion.texto, filaTraduccion.lang)}
      </div>
    </div>`;
  } catch (e) {
    console.error('Error al traducir:', e);
    cont.innerHTML = `<div class="tr-translate-card"><p class="tr-translate-note" style="color:var(--red);">No se pudo traducir. Revisa tu conexión e intenta de nuevo.</p></div>`;
  } finally {
    trTraduccionEnCurso = false;
    btn.disabled = false;
    btn.innerHTML = iconoOriginal;
  }
};

/* ===== ENGLISH JOURNEY — camino de progreso + historial de repaso ===== */
let trHistorialSemanasCache = {}; // semanaId -> datos de la semana
async function trObtenerSemanaPorId(id) {
  if (!id) return null;
  if (trHistorialSemanasCache[id]) return trHistorialSemanasCache[id];
  try {
    const snap = await getDoc(doc(window.db, 'entrenamiento_semanas', id));
    if (!snap.exists()) return null;
    const data = { id: snap.id, ...snap.data() };
    trHistorialSemanasCache[id] = data;
    return data;
  } catch (e) {
    console.error('No se pudo cargar una semana del historial:', e);
    return null;
  }
}
window.abrirEnglishJourney = async () => {
  window.showScreen('s-tr-journey');
  await renderEnglishJourney();
};
function trMedalSVG(weekEstado, doneDays) {
  const R = 27, C = 2 * Math.PI * R;
  const fraction = doneDays / 5;
  let ticks = '';
  for (let i = 0; i < 5; i++) {
    const ang = (-90 + i * 72) * Math.PI / 180;
    const tx = (37 + R * Math.cos(ang)).toFixed(2), ty = (37 + R * Math.sin(ang)).toFixed(2);
    let cls = 'tr-journey-tick';
    if (i < doneDays) cls += ' done';
    else if (weekEstado === 'current' && i === doneDays) cls += ' active';
    ticks += `<circle class="${cls}" cx="${tx}" cy="${ty}" r="2.5"/>`;
  }
  const bezel = weekEstado === 'done' ? 'url(#trBezelGold)' : 'url(#trBezelSteel)';
  return `<svg viewBox="0 0 74 74">
    <circle cx="37" cy="37" r="33" fill="none" stroke="${bezel}" stroke-width="3"/>
    <circle class="tr-journey-inner-ring ${weekEstado === 'locked' ? 'locked' : ''}" cx="37" cy="37" r="${R}" fill="none" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${(C * (1 - fraction)).toFixed(2)}" transform="rotate(-90 37 37)"/>
    ${ticks}
    ${weekEstado === 'current' ? `<circle class="tr-journey-sheen" cx="37" cy="37" r="32" fill="url(#trSheenGrad)"/>` : ''}
  </svg>`;
}
function trRenderMedallonSemana(sem, weekEstado, doneDays, diaActualNum, bloqueada, idxDia1) {
  const centro = weekEstado === 'done'
    ? `<div class="center"><span class="num">${sem.orden || ''}</span><span class="lbl">complete</span></div>`
    : weekEstado === 'current'
      ? `<div class="center"><span class="num">${sem.orden || ''}</span><span class="datewin">Day ${diaActualNum}/5</span></div>`
      : `<div class="center"><span class="num">${sem.orden || ''}</span><span class="lbl">locked</span></div>`;
  return `<div class="tr-journey-cell ${bloqueada ? 'locked-cell' : ''}">
    <div class="tr-journey-medal ${weekEstado}" data-week-estado="${weekEstado}" data-idx-dia="${idxDia1 != null ? idxDia1 : ''}">
      ${trMedalSVG(weekEstado, doneDays)}
      ${centro}
      <div class="tr-journey-flash"></div>
    </div>
    <span class="wname ${weekEstado === 'current' ? 'current' : ''}">${window.escNeclub(sem.titulo || 'Week')}</span>
  </div>`;
}
window.trOnTapMedallonSemana = (el) => {
  const estado = el.dataset.weekEstado;
  if (estado === 'locked') {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
    window.showModal('Locked', 'This unlocks once you complete what comes before it.');
    return;
  }
  el.classList.add('clicked');
  const flash = el.querySelector('.tr-journey-flash');
  flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
  setTimeout(() => el.classList.remove('clicked'), 200);
  if (estado === 'current') { window.showScreen('s-training'); return; }
  const idx = el.dataset.idxDia;
  if (idx !== '') abrirRepasoDia(parseInt(idx, 10));
};
async function renderEnglishJourney() {
  const cont = document.getElementById('tr-journey-shell');
  if (!cont || !trProgresoActual) return;
  cont.innerHTML = `<p class="tr-lock-msg"><i class="fa-solid fa-spinner fa-spin"></i> Loading your journey...</p>`;

  // Traemos TODAS las semanas activas de la biblioteca (de las 4 etapas), no solo la etapa actual,
  // para poder pintar las 4 filas del camino (una por etapa). Sigue siendo una lectura de la
  // biblioteca pública igual que antes — no toca ni cambia el progreso de nadie.
  let todasSemanas = [];
  try {
    const snap = await getDocs(query(collection(window.db,'entrenamiento_semanas'), where('activa','==',true)));
    todasSemanas = snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch (e) { console.error('No se pudo cargar la biblioteca para English Journey:', e); }

  if (!todasSemanas.length) {
    cont.innerHTML = `<div class="tr-week-card" style="text-align:center;"><p class="tr-lock-msg">Tu camino aparecerá aquí en cuanto empieces tu primera semana.</p></div>`;
    return;
  }

  const idsHistorial = trProgresoActual.historialSemanas || [];
  const etapasCompletadas = trProgresoActual.etapasCompletadas || [];
  const ordenActual = trSemanaActual ? (trSemanaActual.orden || 0) : Infinity;
  // Modo QA: activado por ti desde el panel Admin por perfil (checkbox "Todos los niveles
  // desbloqueados"). Con esto en true, cualquier semana que normalmente estaría "locked" se
  // vuelve tocable en modo repaso/práctica (trModoPractica) — igual que repasar un día ya hecho:
  // se puede jugar el circuito completo (armar oración, match, listening, pares) para probar,
  // pero NO escribe nada en el progreso real del perfil ni marca etapas como completadas.
  const qaAcceso = !!trProgresoActual.qaAccesoTotal;

  let nodos = []; // índice plano de días — misma estructura de siempre, la usan abrirRepasoDia()/trIniciarPracticaDesdeJourney() sin cambios.

  const filasHtml = TR_ETAPAS.map((etapa, idx) => {
    const semanasEtapa = todasSemanas.filter(s => s.etapa === etapa).sort((a,b) => (a.orden||0)-(b.orden||0));
    const esActiva = etapa === trProgresoActual.etapaActual;
    const esCompletada = etapasCompletadas.includes(etapa);
    const estadoFila = esActiva ? 'active' : esCompletada ? 'done' : 'locked';
    const tagFila = estadoFila === 'active' ? 'Current stage'
      : estadoFila === 'done' ? '<i class="fa-solid fa-check" style="font-size:8px;"></i> Completed'
      : (qaAcceso ? '<i class="fa-solid fa-flask" style="font-size:8px;"></i> QA test access' : '<i class="fa-solid fa-lock" style="font-size:8px;"></i> Locked');
    const cabecera = `<div class="tr-journey-stage-head"><span class="ic">${String(idx+1).padStart(2,'0')}</span><span class="titulo">${TR_ETAPA_LABEL[etapa]||etapa}</span><span class="tag">${tagFila}</span></div>`;

    if (!semanasEtapa.length) {
      return `<div class="tr-journey-stage ${estadoFila}">${cabecera}<p class="tr-journey-empty-row">Content for this stage isn't published yet.</p></div>`;
    }

    const cellsHtml = semanasEtapa.map(sem => {
      let weekEstado, doneDays, diaActualNum = null, idxDia1 = null;
      if (esActiva && trSemanaActual && sem.id === trSemanaActual.id) {
        weekEstado = 'current';
        diaActualNum = trProgresoActual.diaActual || 1;
        doneDays = diaActualNum - 1;
      } else if (esActiva && (idsHistorial.includes(sem.id) || (sem.orden||0) < ordenActual)) {
        weekEstado = 'done'; doneDays = 5;
      } else if (esActiva) {
        weekEstado = qaAcceso ? 'qa' : 'locked'; doneDays = qaAcceso ? 5 : 0;
      } else if (estadoFila === 'done') {
        weekEstado = 'done'; doneDays = 5;
      } else {
        weekEstado = qaAcceso ? 'qa' : 'locked'; doneDays = qaAcceso ? 5 : 0;
      }

      // Registramos los días de esta semana en el mismo índice plano de siempre, para cualquier
      // semana ya jugada (actual o completada) — así "abrirRepasoDia" sigue funcionando igual.
      // 'qa' cuenta igual que 'done' para poder repasar/jugar cualquier día de la semana.
      if (weekEstado === 'current' || weekEstado === 'done' || weekEstado === 'qa') {
        (sem.dias || []).forEach((dia, i) => {
          const numDia = i + 1;
          const estadoDia = (weekEstado === 'done' || weekEstado === 'qa') ? 'done' : (numDia < diaActualNum ? 'done' : numDia === diaActualNum ? 'current' : 'locked');
          if (i === 0) idxDia1 = nodos.length;
          nodos.push({ estado: estadoDia, semana: sem, dia, numDia });
        });
      }

      return trRenderMedallonSemana(sem, weekEstado, doneDays, diaActualNum, weekEstado === 'locked', idxDia1);
    }).join('');

    return `<div class="tr-journey-stage ${estadoFila}">
      ${cabecera}
      <div class="tr-journey-rail-wrap"><div class="tr-journey-chain"></div><div class="tr-journey-rail" data-rail="${etapa}">${cellsHtml}</div></div>
      <div class="tr-journey-hint" data-hint="${etapa}"><span>swipe to see more</span><i class="fa-solid fa-chevron-right" style="font-size:9px;"></i></div>
    </div>`;
  }).join('');

  window.trJourneyNodosCache = nodos;
  cont.innerHTML = `${filasHtml}<p class="tr-translate-note" style="margin:22px 18px 0;"><i class="fa-solid fa-circle-info"></i> Tap a week to jump into it. Locked stages unlock as you keep going.</p>`;

  cont.querySelectorAll('.tr-journey-rail').forEach(rail => {
    rail.addEventListener('scroll', () => {
      const hint = cont.querySelector(`[data-hint="${rail.dataset.rail}"]`);
      if (hint) hint.classList.add('hidden');
    }, { passive:true });
  });
  cont.querySelectorAll('.tr-journey-medal').forEach(m => m.addEventListener('click', () => trOnTapMedallonSemana(m)));
}
window.abrirRepasoDia = (idx) => {
  const nodos = window.trJourneyNodosCache || [];
  const n = nodos[idx];
  if (!n) return;
  const dia = n.dia || {};
  const titulo = document.getElementById('tr-review-titulo');
  const body = document.getElementById('tr-review-body');
  titulo.textContent = `${n.semana.titulo || 'Week'} · Day ${n.numDia}`;
  let absorbHtml = '';
  if (dia.absorbTipo === 'video') {
    const yid = extraerYoutubeId(dia.absorbContenido);
    absorbHtml = yid ? `<iframe src="https://www.youtube.com/embed/${yid}" frameborder="0" allowfullscreen style="width:100%; aspect-ratio:16/9; border-radius:12px; margin-top:8px;"></iframe>` : '';
  } else if (dia.absorbTipo === 'audio') {
    absorbHtml = `<audio src="${dia.absorbContenido||''}" controls style="width:100%; margin-top:8px;"></audio>`;
  } else if (dia.absorbContenido) {
    absorbHtml = `<div class="tr-review-box"><span class="tr-review-label">Absorb</span><p style="color:var(--text); font-size:13.5px; line-height:1.6; white-space:pre-wrap;">${window.escNeclub(dia.absorbContenido)}</p>${trBotonSonido(dia.absorbContenido, 'en-US')}</div>`;
  }
  body.innerHTML = `
    <div class="tr-review-box">
      <div class="tr-review-head-row">
        <div>
          <span class="tr-review-label">Mindset</span>
          <p class="tr-review-phrase">"${window.escNeclub(dia.prime||'')}"</p>
          <p class="tr-review-trans">${window.escNeclub(dia.primeTraduccion||'')}</p>
        </div>
        ${trBotonSonido(dia.prime||'', 'en-US')}
      </div>
    </div>
    ${absorbHtml}
    <p class="tr-translate-note"><i class="fa-solid fa-eye"></i> Review mode — just read &amp; listen below, or play the exercises again.</p>
    <button class="btn-login" style="margin-top:10px;" onclick="trIniciarPracticaDesdeJourney(${idx})"><i class="fa-solid fa-gamepad"></i> Practice this day again</button>`;
  document.getElementById('modal-tr-review-bg').classList.add('open');
};
window.trIniciarPracticaDesdeJourney = (idx) => {
  const nodos = window.trJourneyNodosCache || [];
  const n = nodos[idx];
  if (!n) return;
  cerrarModalRepaso();
  trAbrirPracticaDia(n.numDia, n.semana);
  window.showScreen('s-training');
};
window.cerrarModalRepaso = () => {
  window.speechSynthesis && window.speechSynthesis.cancel();
  document.getElementById('modal-tr-review-bg').classList.remove('open');
};



export { escucharTraining };
