// barra-red.js — Training Room v2: la MISMA barra de botones redondos del portal y NECLUB
// (atrás · inicio · NECLUB · notificaciones · mensajes · tu foto de perfil), para que el
// Training Room se sienta parte de una sola red. Los botones llevan al portal con un
// enlace directo (?ir=...) que el portal abre al entrar.

// Igual que en el portal: convierte un enlace de Google Drive en una URL de imagen directa.
export function resolverUrlDrive(url) {
  if (!url) return url;
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)/);
    const id = m ? (m[1] || m[2]) : null;
    if (id) return `https://lh3.googleusercontent.com/d/${id}`;
  }
  return url;
}

// portal: ruta relativa al portal (index-prueba/) desde la página actual.
// volver: { href, title } o null (en la pantalla de niveles el atrás sería igual a Inicio).
export function montarBarra({ portal, volver = null, titulo = 'Training Room', icono = 'fa-brain' }) {
  const nav = document.getElementById('tr2-nav');
  if (!nav) return;
  const circ = (href, ic, etiqueta) =>
    `<a class="tr2-circ" href="${href}" title="${etiqueta}" aria-label="${etiqueta}"><i class="fa-solid ${ic}"></i></a>`;
  nav.innerHTML = `
    <span class="tr2-title"><i class="fa-solid ${icono}"></i><span class="tr2-title-txt">${titulo}</span></span>
    <div class="tr2-acciones">
      ${volver ? circ(volver.href, 'fa-arrow-left', volver.title) : ''}
      ${circ(portal, 'fa-house', 'Inicio')}
      ${circ(portal + '?ir=neclub', 'fa-users', 'NECLUB')}
      ${circ(portal + '?ir=notif', 'fa-bell', 'Notificaciones')}
      ${circ(portal + '?ir=chat', 'fa-comments', 'Mensajes')}
      <a class="tr2-avatar-chip" id="tr2-avatar" href="${portal}?ir=perfil" title="Mi perfil" aria-label="Mi perfil"><i class="fa-solid fa-user"></i></a>
    </div>`;
}

// Pone la foto de perfil del alumno (la misma de sus cuentas); si no hay foto o no carga,
// muestra su inicial, igual que el portal.
export function pintarAvatar(alumno) {
  const chip = document.getElementById('tr2-avatar');
  if (!chip || !alumno) return;
  const inicial = (String(alumno.nombre || alumno.email || '?').trim().charAt(0) || '?').toUpperCase();
  const ponerInicial = () => { chip.classList.remove('con-foto'); chip.textContent = inicial; };
  const url = resolverUrlDrive(alumno.foto || '');
  if (url && /^https?:\/\//i.test(url)) {
    const img = new Image();
    img.alt = '';
    img.onerror = ponerInicial;
    img.src = url;
    chip.textContent = '';
    chip.classList.add('con-foto');
    chip.appendChild(img);
  } else {
    ponerInicial();
  }
}
