/* =========================================================
   SEGURIDAD.JS — Control de acceso para páginas internas
   NicaEnglish Club
   ---------------------------------------------------------
   Este archivo debe colocarse en la RAÍZ del repositorio
   y ser incluido (con <script src="../seguridad.js"></script>
   o la ruta relativa correspondiente) en cada página que
   requiera que el usuario haya iniciado sesión previamente
   en index.html.
   ========================================================= */

(function () {
  const sesionActiva = localStorage.getItem('nica_sesion_activa');

  if (sesionActiva !== 'true') {
    alert('Acceso no autorizado. Por favor inicia sesión.');
    window.location.replace('../index.html');
  }
})();
