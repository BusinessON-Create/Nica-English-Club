/* =========================================================
   SEGURIDAD.JS — Control de acceso para páginas internas
   Nica English Club
   ---------------------------------------------------------
   Colócalo en la RAÍZ del repositorio (junto al index.html
   del login) y cárgalo como PRIMER script del <head> de cada
   página interna:

       <script src="../seguridad.js"></script>

   (la ruta relativa cambia según la profundidad de la carpeta).
   El login y el logo se buscan solos junto a este archivo:
   <raiz>/index.html y <raiz>/logo.png, sin importar la
   profundidad de la página que lo cargue.

   IMPORTANTE: este archivo NUNCA debe usar localStorage.clear().
   Las páginas guardan datos de los alumnos (favoritos, progreso)
   en el mismo localStorage y se perderían.

   Nota: es un control del lado del navegador. Frena a quien llega
   sin iniciar sesión, pero no sustituye una verificación en servidor.
   ========================================================= */

(function () {
  // ---------- Ajustes ----------
  var SEGUNDOS = 6; // tiempo antes de mandar al login automáticamente

  // ---------- ¿Hay sesión? ----------
  var activa = false;
  try { activa = localStorage.getItem('nica_sesion_activa') === 'true'; } catch (e) { activa = false; }
  if (activa) return;

  // ---------- Sin sesión: se bloquea la página y se muestra la pantalla de acceso ----------
  window.NEC_BLOQUEADO = true; // las páginas lo leen para no hacer nada en segundo plano

  // Carpeta donde vive este archivo (la raíz): de ahí salen el login y el logo
  var base = '../';
  try {
    var src = document.currentScript && document.currentScript.src;
    if (src) base = src.replace(/[^\/]*$/, '');
  } catch (e) {}
  var LOGIN = base + 'index.html';
  var LOGO = base + 'logo.png';

  var root = document.documentElement;

  // Oculta el contenido real de la página
  var hide = document.createElement('style');
  hide.textContent = 'html{background:#0a0908!important}body{display:none!important}';
  root.appendChild(hide);

  // Tipografía de la marca (si no carga, usa la del sistema)
  try {
    var font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap';
    (document.head || root).appendChild(font);
  } catch (e) {}

  var css =
    '#nec-acceso{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:20px;' +
    'background:#0a0908 radial-gradient(50rem 26rem at 50% -8%,rgba(250,204,21,.09),transparent 65%) no-repeat;' +
    'font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;color:#f5f2ee;line-height:1.5;-webkit-text-size-adjust:100%}' +
    '#nec-acceso *{box-sizing:border-box;margin:0;padding:0}' +
    '#nec-acceso .card{width:100%;max-width:420px;text-align:center;background:#14110f;border:1px solid #2d2825;' +
    'border-radius:28px;padding:34px 26px 26px;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:nec-in .4s ease-out}' +
    '@keyframes nec-in{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}' +
    '#nec-acceso .logo{height:52px;max-width:180px;object-fit:contain;border-radius:10px;margin:0 auto 18px;display:block}' +
    '#nec-acceso .mark{width:52px;height:52px;border-radius:14px;background:#FACC15;color:#0a0908;display:grid;place-items:center;margin:0 auto 18px}' +
    '#nec-acceso .pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;border:1px solid #2d2825;' +
    'background:#1d1916;font-size:.78rem;font-weight:600;color:#a69e96;margin-bottom:18px}' +
    '#nec-acceso .pill svg{color:#FACC15}' +
    '#nec-acceso h1{font-size:1.65rem;font-weight:800;letter-spacing:-.04em;line-height:1.12;margin-bottom:10px}' +
    '#nec-acceso h1 span{color:#FACC15;display:block}' +
    '#nec-acceso p{color:#a69e96;font-size:.95rem;margin-bottom:22px}' +
    '#nec-acceso a.btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px 22px;border-radius:14px;' +
    'background:#FACC15;color:#0a0908;font-weight:800;font-size:.95rem;text-decoration:none;transition:background .2s,transform .12s}' +
    '#nec-acceso a.btn:hover{background:#fde047}#nec-acceso a.btn:active{transform:scale(.98)}' +
    '#nec-acceso a.btn:focus-visible{outline:2px solid #fff;outline-offset:3px}' +
    '#nec-acceso .count{font-size:.78rem;color:#a69e96;margin:16px 0 8px}' +
    '#nec-acceso .bar{height:4px;background:#1d1916;border-radius:10px;overflow:hidden}' +
    '#nec-acceso .bar i{display:block;height:100%;width:100%;background:#FACC15;border-radius:10px;transform-origin:left;animation:nec-bar ' + SEGUNDOS + 's linear forwards}' +
    '@keyframes nec-bar{from{transform:scaleX(1)}to{transform:scaleX(0)}}' +
    '@media (prefers-reduced-motion:reduce){#nec-acceso .card,#nec-acceso .bar i{animation:none}}';

  var lock = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var bolt = '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>';
  var arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var box = document.createElement('div');
  box.id = 'nec-acceso';
  box.setAttribute('role', 'alert');
  box.innerHTML =
    '<style>' + css + '</style>' +
    '<div class="card">' +
      '<img class="logo" src="' + LOGO + '" alt="Nica English Club">' +
      '<div class="pill">' + lock + ' Área para alumnos</div>' +
      '<h1>Esta zona es solo<span>para alumnos.</span></h1>' +
      '<p>Inicia sesión para entrenar y usar todo el contenido de Nica English Club.</p>' +
      '<a class="btn" href="' + LOGIN + '">Iniciar sesión ' + arrow + '</a>' +
      '<div class="count">Te llevamos al inicio de sesión en <b id="nec-seg">' + SEGUNDOS + '</b> s</div>' +
      '<div class="bar"><i></i></div>' +
    '</div>';

  // Si el logo no carga, se muestra el rayito de la marca
  var img = box.querySelector('img.logo');
  img.onerror = function () {
    var m = document.createElement('div');
    m.className = 'mark';
    m.innerHTML = bolt;
    img.parentNode.replaceChild(m, img);
  };

  root.appendChild(box);

  // Cuenta regresiva y redirección
  var left = SEGUNDOS;
  var timer = setInterval(function () {
    left--;
    var el = document.getElementById('nec-seg');
    if (el) el.textContent = Math.max(left, 0);
    if (left <= 0) { clearInterval(timer); window.location.replace(LOGIN); }
  }, 1000);
})();
