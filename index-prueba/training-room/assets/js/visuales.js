// visuales.js — apoyo visual del Training Room v2 (una sola identidad)
//
// Los íconos son de Font Awesome (el mismo set que ya usa tu plataforma), en
// dorado sobre tarjeta oscura. Las banderas vienen de flagcdn.com (imágenes
// reales). Todo está por unidad: por ahora SOLO la Unidad 1 tiene visuales
// (piloto); las demás muestran el contenido sin imagen hasta que las sumemos.

export const ICONO_UNIDAD = {
  u1: 'fa-handshake', u2: 'fa-heart', u3: 'fa-house', u4: 'fa-clock',
  u5: 'fa-person-running', u6: 'fa-circle-question', u7: 'fa-utensils',
};

// Textos de portada (Aprenderás / En la vida real). Por ahora solo Unidad 1.
export const PORTADAS = {
  u1: {
    aprenderas: 'a presentarte, saludar y decir de dónde eres.',
    vidaReal: 'lo usas cada vez que conoces a alguien: de viaje, en el trabajo o por internet.',
  },
};

// Vocabulario → ícono (clave = palabra en inglés, minúsculas)
export const ICONOS_VOCAB = {
  'hello': 'fa-hand',
  'hi': 'fa-comment-dots',
  'goodbye': 'fa-door-open',
  'nice to meet you': 'fa-handshake',
  'good morning': 'fa-cloud-sun',
  'good afternoon': 'fa-sun',
  'good evening': 'fa-cloud-moon',
  'how are you?': 'fa-circle-question',
  "i'm fine, thanks": 'fa-thumbs-up',
  'see you later': 'fa-clock',
};

// País / nacionalidad → código de bandera
export const BANDERAS = {
  'nicaragua / nicaraguan': 'ni',
  'the united states / american': 'us',
  'spain / spanish': 'es',
  'mexico / mexican': 'mx',
  'france / french': 'fr',
  'japan / japanese': 'jp',
  'brazil / brazilian': 'br',
  'canada / canadian': 'ca',
  'italy / italian': 'it',
  'germany / german': 'de',
};

export const NUMEROS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20,
};

// Warm-up visual por unidad (reemplaza la instrucción para el coach)
export const WARMUP = {
  u1: {
    titulo: '¿Cómo se dice "hola" en el mundo?',
    items: [
      { flag: 'ni', pais: 'Nicaragua', texto: 'Hola' },
      { flag: 'us', pais: 'Estados Unidos', texto: 'Hello', audio: true },
      { flag: 'fr', pais: 'Francia', texto: 'Bonjour' },
      { flag: 'jp', pais: 'Japón', texto: 'こんにちは', romaji: 'Konnichiwa' },
      { flag: 'de', pais: 'Alemania', texto: 'Hallo' },
      { flag: 'it', pais: 'Italia', texto: 'Ciao' },
    ],
  },
};

export const PRONOMBRES = [
  { en: 'I', es: 'yo', icon: 'fa-user' },
  { en: 'you', es: 'tú / ustedes', icon: 'fa-hand-point-right' },
  { en: 'he', es: 'él', icon: 'fa-person' },
  { en: 'she', es: 'ella', icon: 'fa-person-dress' },
  { en: 'it', es: 'ello (cosa o animal)', icon: 'fa-cube' },
  { en: 'we', es: 'nosotros', icon: 'fa-user-group' },
  { en: 'they', es: 'ellos / ellas', icon: 'fa-users' },
];

export const TO_BE = [
  { verbo: 'am', pronombres: ['I'] },
  { verbo: 'is', pronombres: ['he', 'she', 'it'] },
  { verbo: 'are', pronombres: ['you', 'we', 'they'] },
];

// Visual de un tema de gramática (clave = topic en minúsculas)
export const TEMA_VISUAL = {
  'subject pronouns': { tipo: 'pronombres' },
  'verb to be (am/is/are)': { tipo: 'tobe' },
  'word order (svo)': {
    tipo: 'svo',
    ejemplos: [
      [['My name', 'S'], ['is', 'V'], ['Ana', 'O']],
      [['I', 'S'], ['live', 'V'], ['in Managua', 'O']],
      [['She', 'S'], ['speaks', 'V'], ['English', 'O']],
    ],
  },
};
