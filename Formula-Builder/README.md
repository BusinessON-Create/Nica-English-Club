# Nica English Club — Módulo 1: Ensamblador Visual de Estructuras

Componente autocontenido (HTML + Tailwind CDN + JS vanilla) para practicar
moldes gramaticales fijos con vocabulario dinámico.

## Archivos

- `index.html` — componente completo, listo para abrir en el navegador o publicar en GitHub Pages.
- `assets/` — coloca aquí tu logo como `assets/logo.png` (o `.svg`). Si el archivo no existe, se muestra un placeholder "TU LOGO" automáticamente.

## Poner tu logo

1. Copia tu imagen a `assets/logo.png`.
2. Ábrelo en el navegador: el placeholder desaparece y se muestra tu logo.
3. Si tu archivo tiene otro nombre/formato, cambia el `src="assets/logo.png"` del `<img id="logo-img">` en `index.html`.

## Agregar más moldes (estructuras)

Edita el array `MOLDES` dentro del `<script>` de `index.html`:

```js
{
  id: 'un_id_unico',
  title: 'texto corto para el selector (ej: "used to")',
  subject: 'I',              // sujeto de la fórmula
  fixed: "'m used to",       // la estructura fija (no cambia)
  context: 'Uso: explica cuándo se usa este molde.',
  verbs: [
    { id: 'v1', en: 'waking up', es: 'despertarme' },
    // agrega tantos como quieras
  ],
  complements: [
    { id: 'c1', en: 'early on Mondays', es: 'temprano los lunes' },
    // agrega tantos como quieras
  ],
}
```

No hay límite de moldes, verbos ni complementos — la interfaz, el contador de
combinaciones y la bitácora se adaptan automáticamente.

## Integración en una web app existente

**Opción A — Página independiente:** sube `index.html` (y `assets/`) tal cual
a GitHub Pages, Netlify o Vercel. Funciona sin backend ni build step.

**Opción B — Como módulo dentro de otra app:**
1. Copia el bloque `<div class="max-w-2xl mx-auto ...">...</div>` (todo el `<body>`) dentro del contenedor donde quieras montar el módulo.
2. Copia el `<script>` de configuración de Tailwind y el `<script>` de lógica al final de tu página (o a un archivo `modulo1.js` e impórtalo con `<script src="modulo1.js"></script>`).
3. Si tu app ya usa Tailwind vía build (PostCSS/Vite), reemplaza el CDN por tu propio `tailwind.config.js` y agrega los mismos `theme.extend` (colores `nec*`, `fontFamily`, `keyframes`, `animation`) para no perder el look & feel.
4. El componente usa `localStorage` para el progreso (combinaciones descubiertas) y la bitácora. Si tu app tiene backend/usuarios, puedes reemplazar las funciones `getSeenCombos`, `saveSeenCombos`, `getBitacora` y `setBitacora` por llamadas a tu API — son las únicas 4 funciones que tocan almacenamiento.
5. El audio usa la Web Speech API del navegador (gratis, sin API key). Si más adelante quieres voces más naturales, reemplaza la función `speak()` por una llamada a un servicio de TTS (ej. ElevenLabs, Google TTS) que devuelva un audio y reprodúzcalo con `new Audio(url).play()`.

## Notas técnicas

- Mobile-first, responsivo, con soporte de Dark Mode (toggle con persistencia en `localStorage`).
- Sin dependencias externas de build: Tailwind vía CDN + JS vanilla en un solo archivo.
- Accesible: foco visible (`focus-ring`), botones semánticos, contraste AA en ambos temas.
- Colores y tipografías centralizados en `tailwind.config` dentro de `index.html` (paleta `nec*`, fuentes `display` = Space Grotesk, `body` = Inter, `mold` = JetBrains Mono).
