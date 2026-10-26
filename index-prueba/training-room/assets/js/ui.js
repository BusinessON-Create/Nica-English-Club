// ui.js — piezas visuales compartidas del Class Room (avisos suaves y nombres de nivel).

// Nombre amable de cada nivel (el estándar CEFR), una frase corta de lo que se logra
// y cuántas unidades tiene. Todo se puede editar aquí sin tocar nada más.
// Si agregas o quitas unidades en un nivel, cambia también su número en "unidades".
export const NIVEL_INFO = {
  a1: { nombre: 'Primeros pasos',   frase: 'Aprende a presentarte y a hablar de ti',          unidades: 7 },
  a2: { nombre: 'Básico',           frase: 'Cuenta tu día a día y lo que ya pasó',            unidades: 9 },
  b1: { nombre: 'Intermedio',       frase: 'Habla de experiencias, planes y opiniones',       unidades: 11 },
  b2: { nombre: 'Intermedio alto',  frase: 'Conversa con fluidez sobre temas variados',       unidades: 13 },
  c1: { nombre: 'Avanzado',         frase: 'Expresa ideas complejas con precisión',           unidades: 12 },
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
