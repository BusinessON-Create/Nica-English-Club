# Generador de Facturas — Nica English Club

Webapp de una sola página (HTML/CSS/JS, sin backend) para generar los avisos de pago de Nica English Club y descargarlos como imagen JPG lista para enviar por WhatsApp o correo.

## Uso
Simplemente abre `index.html` en cualquier navegador (Chrome recomendado). No requiere instalación, servidor ni build.

### Publicarlo con GitHub Pages (opcional, para tener un link)
1. Sube este repo a GitHub.
2. Ve a **Settings → Pages**.
3. En "Branch" selecciona `main` y carpeta `/root`, guarda.
4. GitHub te da una URL tipo `https://tuusuario.github.io/turepo/` para abrir la app desde cualquier dispositivo.

## Guardado de datos
La app guarda el catálogo de planes/precios, la numeración de facturas y el historial de facturas generadas usando `localStorage` del navegador. Esto significa que los datos quedan **guardados en ese navegador/dispositivo específico** — si abres la app desde otro navegador o computadora, no vas a ver el mismo historial (no hay una base de datos central).

## Editar el diseño
Todo el diseño (colores, textos, layout) vive en el mismo `index.html`. Las imágenes fijas (logo, QR, logos de bancos) están incrustadas como base64 dentro del archivo, así que sigue siendo un solo archivo portátil sin carpetas de assets.
