/**
 * data.js — LOS INGREDIENTES DEL LABORATORIO
 * ============================================
 * Aquí, y SOLO aquí, se agregan más palabras/frases para crecer de 25 a 300.
 * No hace falta tocar app.js ni style.css para agregar contenido nuevo.
 *
 * Cada ingrediente es un objeto:
 *   {
 *     id:  identificador único (string, sin espacios),
 *     text: el texto en inglés tal como se usa en la oración,
 *     es:  la traducción / interpretación al español,
 *     cat: la categoría -> "starter" | "body" | "connector" | "ender"
 *   }
 *
 * CATEGORÍAS (así se decide el color y el anillo donde aparece):
 *   starter    -> abre la oración                  (ej: "Honestly,")
 *   body       -> el núcleo, sujeto + verbo natural (ej: "I ended up staying home")
 *   connector  -> conecta o pega dos ideas          (ej: "but then again,")
 *   ender      -> cierra la oración de forma natural(ej: "if that makes sense")
 *
 * TIP para agregar más adelante: copia un objeto, cambia el id (único),
 * el texto en inglés, la traducción, y listo. La interfaz lo detecta solo.
 */

const INGREDIENTS = [
  // ---------- STARTERS (abren la oración) ----------
  { id: "st1",  text: "Honestly,",                 es: "Honestamente,",                  cat: "starter" },
  { id: "st2",  text: "To be fair,",                es: "Para ser justos,",               cat: "starter" },
  { id: "st3",  text: "I was wondering if",         es: "Me preguntaba si",               cat: "starter" },
  { id: "st4",  text: "The thing is,",              es: "La cosa es que,",                cat: "starter" },
  { id: "st5",  text: "Not gonna lie,",             es: "No voy a mentir,",               cat: "starter" },
  { id: "st6",  text: "By the way,",                es: "Por cierto,",                    cat: "starter" },
  { id: "st7",  text: "At the end of the day,",     es: "Al final del día,",              cat: "starter" },
  { id: "st8",  text: "I've been meaning to say",   es: "He querido decir",               cat: "starter" },

  // ---------- BODY (sujeto + verbo, natural) ----------
  { id: "bd1",  text: "I ended up staying home",         es: "Terminé quedándome en casa",             cat: "body" },
  { id: "bd2",  text: "we should grab coffee sometime",  es: "deberíamos tomar un café algún día",     cat: "body" },
  { id: "bd3",  text: "she totally forgot about it",     es: "ella se olvidó por completo",            cat: "body" },
  { id: "bd4",  text: "it doesn't really matter",        es: "en realidad no importa",                 cat: "body" },
  { id: "bd5",  text: "things got a little complicated", es: "las cosas se complicaron un poco",       cat: "body" },
  { id: "bd6",  text: "I've been super busy lately",     es: "he estado muy ocupado últimamente",      cat: "body" },
  { id: "bd7",  text: "he's been acting kind of weird",  es: "él ha estado actuando un poco raro",     cat: "body" },
  { id: "bd8",  text: "we're thinking about moving",     es: "estamos pensando en mudarnos",           cat: "body" },
  { id: "bd9",  text: "I can't stop thinking about it",  es: "no puedo dejar de pensar en eso",        cat: "body" },
  { id: "bd10", text: "they're probably running late",   es: "probablemente van tarde",                cat: "body" },

  // ---------- CONNECTORS (pegan ideas) ----------
  { id: "cn1", text: "but then again,",  es: "pero pensándolo bien,", cat: "connector" },
  { id: "cn2", text: "which is why",     es: "por eso",               cat: "connector" },
  { id: "cn3", text: "so I figured",     es: "así que pensé",         cat: "connector" },
  { id: "cn4", text: "even though",      es: "aunque",                cat: "connector" },
  { id: "cn5", text: "just in case",     es: "por si acaso",          cat: "connector" },
  { id: "cn6", text: "no matter what",   es: "pase lo que pase",      cat: "connector" },
  { id: "cn7", text: "on top of that,",  es: "encima de eso,",        cat: "connector" },

  // ---------- ENDERS (cierran natural) ----------
  { id: "en1", text: "if that makes sense",      es: "si eso tiene sentido",         cat: "ender" },
  { id: "en2", text: "or something like that",   es: "o algo así",                   cat: "ender" },
  { id: "en3", text: "you know what I mean",     es: "sabes a lo que me refiero",    cat: "ender" },
  { id: "en4", text: "so we'll see how it goes", es: "así que veremos cómo va",      cat: "ender" },
  { id: "en5", text: "no big deal",              es: "no es gran cosa",              cat: "ender" },
  { id: "en6", text: "just saying",              es: "solo digo",                    cat: "ender" },
];

// Metadatos de cada categoría: color, etiqueta en español, y el anillo (1=más
// interno). Los anillos con MÁS ingredientes deben ir más afuera (número más
// alto) porque un radio mayor tiene más espacio para acomodar más chips.
const CATEGORY_META = {
  ender:     { label: "Cierre",    color: "#4ADE80", ring: 1 },
  connector: { label: "Conector",  color: "#FFC145", ring: 2 },
  starter:   { label: "Iniciador", color: "#5CE1E6", ring: 3 },
  body:      { label: "Cuerpo",    color: "#C77DFF", ring: 4 },
};
