/**
 * app.js — el "motor" del laboratorio.
 * No hace falta tocar este archivo para agregar más vocabulario:
 * eso se hace en data.js. Este archivo solo:
 *  1. Dibuja los anillos y coloca cada ingrediente en su órbita.
 *  2. Permite girar el universo arrastrando (mouse o dedo).
 *  3. Un toque = añade el ingrediente a la oración.
 *     Doble toque = muestra su traducción.
 *  4. Arma la oración final y su traducción aproximada.
 *  5. Maneja pantalla completa (clave para celulares).
 */

// ---------------------------------------------------------------
// 1. Preparar anillos a partir de las categorías en data.js
// ---------------------------------------------------------------
const ringOrderMap = {}; // cat -> índice de anillo (0,1,2,3...)
Object.keys(CATEGORY_META)
  .sort((a, b) => CATEGORY_META[a].ring - CATEGORY_META[b].ring)
  .forEach((cat, i) => { ringOrderMap[cat] = i; });

const RING_COUNT = Object.keys(ringOrderMap).length;
const RING_SPEED = [1, -0.75, 0.55, -0.45, 0.35]; // parallax al girar
const RING_PHASE = [0, 18, 36, 54, 72];           // desfase visual inicial

let ringRotation = new Array(RING_COUNT).fill(0);

// Agrupar ingredientes por categoría (orden estable)
const byCategory = {};
INGREDIENTS.forEach(ing => {
  (byCategory[ing.cat] = byCategory[ing.cat] || []).push(ing);
});

// ---------------------------------------------------------------
// 2. Construir el DOM: anillos + chips
// ---------------------------------------------------------------
const universe = document.getElementById('universe');
const legend = document.getElementById('legend');

const ringEls = [];
const chipEls = new Map(); // ingredient.id -> element

function buildLegend(){
  Object.entries(CATEGORY_META).forEach(([cat, meta]) => {
    const span = document.createElement('span');
    span.innerHTML = `<i class="${cat}"></i>${meta.label}`;
    legend.appendChild(span);
  });
}

function buildRingsAndChips(){
  Object.entries(CATEGORY_META).forEach(([cat, meta]) => {
    const ringIndex = ringOrderMap[cat];
    const ringEl = document.createElement('div');
    ringEl.className = 'ring';
    universe.appendChild(ringEl);
    ringEls[ringIndex] = ringEl;

    byCategory[cat].forEach((ing, i) => {
      const chip = document.createElement('div');
      chip.className = `chip ${cat}`;
      chip.textContent = ing.text;
      chip.dataset.id = ing.id;
      universe.appendChild(chip);
      chipEls.set(ing.id, { el: chip, cat, ring: ringIndex, index: i });
    });
  });
}

buildLegend();
buildRingsAndChips();

// ---------------------------------------------------------------
// 3. Calcular geometría y posicionar (se llama al inicio y en resize)
// ---------------------------------------------------------------
let centerX = 0, centerY = 0;
let radiiX = [];
let radiiY = [];

// El radio de cada anillo se calcula a partir del ANCHO REAL de sus chips
// (medido en el DOM), no de un porcentaje fijo de pantalla. Así, cuando el
// vocabulario crezca de 25 a 300 frases, cada anillo se agranda solo lo
// necesario para que sus palabras no se encimen — sin tocar este código.
function computeGeometry(){
  const isMobile = window.innerWidth < 560;
  const gap = isMobile ? 14 : 20;

  // circunferencia mínima que necesita cada anillo para que sus chips no se toquen
  const neededRadius = [];
  Object.entries(byCategory).forEach(([cat, list]) => {
    const ringIndex = ringOrderMap[cat];
    let totalWidth = 0;
    list.forEach(ing => {
      totalWidth += chipEls.get(ing.id).el.offsetWidth + gap;
    });
    neededRadius[ringIndex] = totalWidth / (2 * Math.PI);
  });

  // se fuerza que cada anillo sea más grande que el anterior + un margen,
  // para que nunca se encimen anillos vecinos
  const ringGap = isMobile ? 44 : 58;
  const radius = [];
  let prev = isMobile ? 58 : 72; // holgura alrededor del núcleo
  for(let i = 0; i < RING_COUNT; i++){
    const r = Math.max(neededRadius[i] || 0, prev + ringGap);
    radius.push(r);
    prev = r;
  }

  // framing: dónde va el centro del universo (deja aire para header y bandeja)
  const topReserve = isMobile ? 78 : 90;
  const bottomReserve = isMobile ? 210 : 180;
  const vHalf = (window.innerHeight - topReserve - bottomReserve) / 2;
  centerY = topReserve + vHalf;
  centerX = window.innerWidth / 2;

  // estiramiento horizontal: en pantallas anchas aprovechamos el ancho extra
  // (esto SOLO agranda el espacio en x, nunca lo reduce, así que jamás genera encimes)
  const aspect = window.innerWidth / window.innerHeight;
  const stretchX = Math.max(1, Math.min(1.6, aspect / 1.15));

  radiiX = radius.map(r => r * stretchX);
  radiiY = radius.slice();
}

function layout(){
  // anillos decorativos (elípticos)
  ringEls.forEach((ringEl, i) => {
    ringEl.style.width = (radiiX[i] * 2) + 'px';
    ringEl.style.height = (radiiY[i] * 2) + 'px';
    ringEl.style.left = centerX + 'px';
    ringEl.style.top = centerY + 'px';
    ringEl.style.transform = `translate(-50%, -50%)`;
  });
  const core = document.getElementById('core');
  core.style.left = centerX + 'px';
  core.style.top = centerY + 'px';
  core.style.transform = 'translate(-50%, -50%)';

  // chips
  Object.entries(byCategory).forEach(([cat, list]) => {
    const ringIndex = ringOrderMap[cat];
    const rx = radiiX[ringIndex];
    const ry = radiiY[ringIndex];
    const count = list.length;
    list.forEach((ing, i) => {
      const angleDeg = (360 / count) * i + RING_PHASE[ringIndex] + ringRotation[ringIndex];
      const rad = angleDeg * Math.PI / 180;
      const x = rx * Math.cos(rad);
      const y = ry * Math.sin(rad);
      const { el } = chipEls.get(ing.id);
      el.style.left = centerX + 'px';
      el.style.top = centerY + 'px';
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  });
}

computeGeometry();
layout();
window.addEventListener('resize', () => { computeGeometry(); layout(); });

// ---------------------------------------------------------------
// 4. Girar el universo (mouse / dedo)
// ---------------------------------------------------------------
const drag = { active: false, isChip: false, moved: false, lastAngle: 0 };

function angleFromCenter(x, y){
  return Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
}

universe.addEventListener('pointerdown', (e) => {
  drag.active = true;
  drag.isChip = !!e.target.closest('.chip');
  drag.moved = false;
  drag.startX = e.clientX; drag.startY = e.clientY;
  drag.lastAngle = angleFromCenter(e.clientX, e.clientY);
  universe.setPointerCapture(e.pointerId);
});

universe.addEventListener('pointermove', (e) => {
  if(!drag.active) return;
  const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
  if(Math.hypot(dx, dy) > 6) drag.moved = true;
  if(!drag.isChip && drag.moved){
    const currentAngle = angleFromCenter(e.clientX, e.clientY);
    let delta = currentAngle - drag.lastAngle;
    if(delta > 180) delta -= 360;
    if(delta < -180) delta += 360;
    for(let i = 0; i < RING_COUNT; i++){
      ringRotation[i] += delta * (RING_SPEED[i] || 0.4);
    }
    drag.lastAngle = currentAngle;
    layout();
  }
});

function endDrag(e){
  if(!drag.active) return;
  drag.active = false;
  if(drag.isChip && !drag.moved){
    const chipEl = e.target.closest('.chip');
    if(chipEl) handleChipTap(chipEl.dataset.id, chipEl);
  }
}
universe.addEventListener('pointerup', endDrag);
universe.addEventListener('pointercancel', endDrag);

// ---------------------------------------------------------------
// 5. Un toque = añadir · doble toque = traducir
// ---------------------------------------------------------------
const tapState = { lastId: null, lastTime: 0, timer: null };
const TAP_WINDOW = 320;

function handleChipTap(id, chipEl){
  const ing = INGREDIENTS.find(i => i.id === id);
  const now = Date.now();
  if(tapState.lastId === id && (now - tapState.lastTime) < TAP_WINDOW){
    clearTimeout(tapState.timer);
    tapState.lastId = null;
    showTranslation(ing, chipEl);
  } else {
    tapState.lastId = id;
    tapState.lastTime = now;
    clearTimeout(tapState.timer);
    tapState.timer = setTimeout(() => {
      addToSentence(ing, chipEl);
      tapState.lastId = null;
    }, TAP_WINDOW);
  }
}

// tarjeta de traducción flotante
const translateCard = document.getElementById('translate-card');
function showTranslation(ing, chipEl){
  const rect = chipEl.getBoundingClientRect();
  translateCard.querySelector('.en').textContent = ing.text;
  translateCard.querySelector('.es').textContent = ing.es;
  let left = rect.left + rect.width/2 - 130;
  left = Math.max(10, Math.min(left, window.innerWidth - 270));
  let top = rect.top - 64;
  if(top < 60) top = rect.bottom + 10;
  translateCard.style.left = left + 'px';
  translateCard.style.top = top + 'px';
  translateCard.classList.add('show');
  clearTimeout(showTranslation._t);
  showTranslation._t = setTimeout(() => translateCard.classList.remove('show'), 2200);

  chipEl.style.filter = 'brightness(1.5)';
  setTimeout(() => chipEl.style.filter = '', 200);
}

// ---------------------------------------------------------------
// 6. Bandeja de oración
// ---------------------------------------------------------------
let sentence = []; // array de ingredientes en orden
const trayEl = document.getElementById('tray');
const sentencePreview = document.getElementById('sentence-preview');
const sentenceTranslation = document.getElementById('sentence-translation');
const hint = document.getElementById('hint');

function addToSentence(ing, chipEl){
  sentence.push(ing);
  if(hint) { hint.style.opacity = '0'; }
  chipEl.style.filter = 'brightness(1.6)';
  setTimeout(() => chipEl.style.filter = '', 250);
  renderTray();
}

function removeFromSentence(index){
  sentence.splice(index, 1);
  renderTray();
}

function renderTray(){
  trayEl.innerHTML = '';
  if(sentence.length === 0){
    const p = document.createElement('div');
    p.className = 'placeholder';
    p.textContent = 'Toca ingredientes en el universo para armar tu oración…';
    trayEl.appendChild(p);
  } else {
    sentence.forEach((ing, i) => {
      const chip = document.createElement('div');
      chip.className = `tchip ${ing.cat}`;
      chip.innerHTML = `<span>${ing.text}</span><span class="x">✕</span>`;
      chip.addEventListener('click', () => removeFromSentence(i));
      trayEl.appendChild(chip);
    });
  }
  updateSentencePreview();
}

function buildSentenceText(){
  if(sentence.length === 0) return '';
  let text = sentence.map(i => i.text).join(' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if(!/[.!?]$/.test(text)) text += '.';
  return text;
}

function buildTranslationText(){
  if(sentence.length === 0) return '';
  let text = sentence.map(i => i.es).join(' ');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if(!/[.!?]$/.test(text)) text += '.';
  return text;
}

function updateSentencePreview(){
  sentencePreview.textContent = buildSentenceText();
  sentenceTranslation.textContent = buildTranslationText() ? '≈ ' + buildTranslationText() : '';
}

renderTray();

// ---------------------------------------------------------------
// 7. Botones: limpiar, traducir, ejemplo al azar
// ---------------------------------------------------------------
document.getElementById('btn-clear').addEventListener('click', () => {
  sentence = [];
  sentenceTranslation.classList.remove('show');
  renderTray();
});

document.getElementById('btn-translate').addEventListener('click', () => {
  sentenceTranslation.classList.toggle('show');
});

document.getElementById('btn-random').addEventListener('click', () => {
  const pick = (cat) => {
    const list = byCategory[cat];
    return list[Math.floor(Math.random() * list.length)];
  };
  sentence = [pick('starter'), pick('body')];
  if(Math.random() > 0.35){
    sentence.push(pick('connector'), pick('body'));
  }
  sentence.push(pick('ender'));
  if(hint) hint.style.opacity = '0';
  renderTray();
});

// ---------------------------------------------------------------
// 8. Pantalla completa (importante para celular)
// ---------------------------------------------------------------
document.getElementById('btn-fullscreen').addEventListener('click', () => {
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
});

// ---------------------------------------------------------------
// 9. Fondo estrellado
// ---------------------------------------------------------------
(function stars(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#05070D';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    for(let i=0;i<count;i++){
      const x = Math.random()*canvas.width;
      const y = Math.random()*canvas.height;
      const r = Math.random()*1.3 + 0.2;
      ctx.globalAlpha = Math.random()*0.7 + 0.15;
      ctx.fillStyle = '#BFE8FF';
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  window.addEventListener('resize', resize);
  resize();
})();

// ---------------------------------------------------------------
// 10. Ocultar el hint inicial tras unos segundos
// ---------------------------------------------------------------
setTimeout(() => { if(hint) hint.style.opacity = '0'; }, 6000);
