# English Lab 🧪 — Laboratorio de ingredientes de inglés

Un "laboratorio" holográfico (estilo Tony Stark / Jarvis) para armar oraciones
naturales de inglés combinando ingredientes de vocabulario, en vez de estudiar
gramática de forma abstracta.

## Cómo funciona

- El "universo" tiene 4 anillos de color, cada uno una categoría:
  - 🔵 **Iniciador** (cian) — abre la oración: *"Honestly,"*, *"The thing is,"*
  - 🟣 **Cuerpo** (violeta) — sujeto + verbo natural: *"I ended up staying home"*
  - 🟡 **Conector** (ámbar) — pega ideas: *"but then again,"*, *"just in case"*
  - 🟢 **Cierre** (verde) — cierra natural: *"if that makes sense"*, *"no big deal"*
- **Un toque** en un ingrediente → se añade a la bandeja de oración (abajo).
- **Doble toque** → muestra su traducción al español en una tarjeta flotante.
- **Arrastra el fondo** → gira el universo para descubrir más ingredientes.
- **🎲 Ejemplo** → arma una oración al azar combinando piezas compatibles.
- **🌐 Ver traducción** → traduce la oración completa (aproximada, por bloques).
- **⛶** → pantalla completa (ideal para celular).

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público).
2. Sube estos 4 archivos (`index.html`, `style.css`, `app.js`, `data.js`) a la raíz.
3. Ve a **Settings → Pages**, en "Source" elige la rama `main` y carpeta `/root`.
4. En un par de minutos tu laboratorio estará en:
   `https://tu-usuario.github.io/tu-repositorio/`

No hay build ni dependencias que instalar — es HTML/CSS/JS puro.

## Cómo agregar más frases (de 25 a 300)

Abre **solo** `data.js`. Copia un objeto de `INGREDIENTS`, cámbiale el `id`
(único), el texto en inglés y la traducción, y guárdalo. No hay que tocar
`app.js` ni `style.css` — la interfaz calcula sola el tamaño de los anillos
según cuánto vocabulario le agregues, así que crece sin romperse.

```js
{ id: "bd11", text: "I might swing by later", es: "Puede que me pase más tarde", cat: "body" },
```

Categorías válidas: `starter`, `body`, `connector`, `ender`.
Si algún día quieres una 5ª categoría (por ejemplo "preguntas" o "reacciones"),
agrégala en `CATEGORY_META` con su color y listo — un anillo nuevo aparece solo.

## Notas de diseño / próximos pasos sugeridos

- El proyecto ya está estructurado para escalar a 300 ingredientes sin tocar
  la lógica (el radio de cada anillo se calcula midiendo el ancho real de
  los chips, no un valor fijo).
- Ideas para siguientes versiones: guardar oraciones favoritas (localStorage
  no funciona en artifacts de Claude, pero sí en GitHub Pages real), un modo
  "quiz" que oculte la traducción y pida adivinar, sonido de voz (Web Speech
  API) al tocar cada chip, y niveles de dificultad (ingredientes más
  avanzados en anillos más externos).
