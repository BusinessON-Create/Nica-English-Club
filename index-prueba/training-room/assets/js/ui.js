// ui.js — piezas visuales compartidas del Class Room (avisos suaves y nombres de nivel).

// Nombre amable de cada nivel (el estándar CEFR). Se puede editar aquí sin tocar nada más.
export const NIVEL_INFO = {
  a1: { nombre: 'Primeros pasos' },
  a2: { nombre: 'Básico' },
  b1: { nombre: 'Intermedio' },
  b2: { nombre: 'Intermedio alto' },
  c1: { nombre: 'Avanzado' },
};

// Aviso flotante que se oculta solo. Reemplaza al alert() del navegador, que es brusco y tapa todo.
// El texto se pone como texto (nunca como HTML).
let _t = null;
export function mostrarAviso(texto) {
  let el = document.getElementById('tr2-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'tr2-toast';
    el.className = 'tr2-toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = String(texto == null ? '' : texto);
  el.classList.add('show');
  clearTimeout(_t);
  _t = setTimeout(() => el.classList.remove('show'), 3800);
}
