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

// Textos de portada (Aprenderás / En la vida real), las 7 unidades.
export const PORTADAS = {
  u1: {
    aprenderas: 'a presentarte, saludar y decir de dónde eres.',
    vidaReal: 'lo usas cada vez que conoces a alguien: de viaje, en el trabajo o por internet.',
  },
  u2: {
    aprenderas: 'a hablar de tu familia y decir qué cosas tienes.',
    vidaReal: 'lo usas cuando le muestras fotos de tu familia a alguien o hablas de lo que es tuyo.',
  },
  u3: {
    aprenderas: 'a describir tu casa, tu barrio y dar direcciones simples.',
    vidaReal: 'lo usas cuando alguien te pregunta cómo es tu casa o cómo llegar a un lugar.',
  },
  u4: {
    aprenderas: 'a hablar de tu rutina diaria y decir la hora.',
    vidaReal: 'lo usas todos los días: contar qué haces y cuándo, o coordinar una hora con alguien.',
  },
  u5: {
    aprenderas: 'a describir qué está pasando en este momento y dar instrucciones.',
    vidaReal: 'lo usas cuando cuentas lo que está pasando ahora mismo, o das una orden simple.',
  },
  u6: {
    aprenderas: 'a hablar de tus hobbies, tu trabajo y lo que sabes hacer.',
    vidaReal: 'lo usas en una entrevista, conociendo gente nueva o hablando de tus habilidades.',
  },
  u7: {
    aprenderas: 'a comparar cosas y pedir algo de forma educada.',
    vidaReal: 'lo usas en un restaurante o una tienda, para ordenar o comprar algo.',
  },
};

// Colores → valor CSS real (se pinta como muestra de color, no ícono)
export const COLORES = {
  red: '#e5484d', blue: '#3b82f6', green: '#22c55e', yellow: '#f2c94c',
  black: '#1a1a1a', white: '#f5f5f5', orange: '#f5863a', purple: '#9b5de5',
  pink: '#f472b6', brown: '#8b5e3c',
};

// Reglas por palabra clave (fallback cuando la palabra no está en ICONOS_VOCAB).
// Se prueban en orden contra el inglés en minúsculas; la primera que calza gana.
export const REGLAS_ICONO = [
  [/mother|wife|aunt|grandmother|niece|daughter|sister/, 'fa-person-dress'],
  [/father|husband|uncle|grandfather|nephew|brother|son\b/, 'fa-person'],
  [/parents|grandparents/, 'fa-people-roof'],
  [/cousin|friend|twins/, 'fa-user-group'],
  [/baby/, 'fa-baby'],
  [/book|notebook/, 'fa-book'],
  [/phone/, 'fa-mobile-screen'],
  [/bag|wallet/, 'fa-briefcase'],
  [/\bpen\b/, 'fa-pen'],
  [/\bkey\b/, 'fa-key'],
  [/glasses/, 'fa-glasses'],
  [/watch/, 'fa-clock'],
  [/umbrella/, 'fa-umbrella'],
  [/kitchen|cook\b|chef/, 'fa-kitchen-set'],
  [/bedroom|\bbed\b|sleep/, 'fa-bed'],
  [/bathroom|sink|shower/, 'fa-bath'],
  [/living room|sofa/, 'fa-couch'],
  [/dining room|\btable\b|restaurant|order\b|waiter/, 'fa-utensils'],
  [/garden/, 'fa-seedling'],
  [/garage/, 'fa-warehouse'],
  [/stairs/, 'fa-stairs'],
  [/\bdoor\b/, 'fa-door-closed'],
  [/window/, 'fa-window-maximize'],
  [/\bchair\b/, 'fa-chair'],
  [/fridge/, 'fa-snowflake'],
  [/lamp/, 'fa-lightbulb'],
  [/shelf|closet/, 'fa-box-archive'],
  [/school/, 'fa-school'],
  [/hospital/, 'fa-hospital'],
  [/supermarket|market/, 'fa-cart-shopping'],
  [/\bbank\b/, 'fa-building-columns'],
  [/\bpark\b/, 'fa-tree'],
  [/church/, 'fa-place-of-worship'],
  [/pharmacy/, 'fa-briefcase-medical'],
  [/bus/, 'fa-bus'],
  [/wake up|get up/, 'fa-sun'],
  [/breakfast/, 'fa-mug-hot'],
  [/lunch|dinner|\beat\b/, 'fa-utensils'],
  [/come home/, 'fa-house'],
  [/brush teeth/, 'fa-tooth'],
  [/monday|tuesday|wednesday|thursday|friday|saturday|sunday/, 'fa-calendar-day'],
  [/today|tomorrow|weekend|january|february|march|april|may|june|july|august|september|october|november|december/, 'fa-calendar'],
  [/o'clock|half past|quarter|noon|midnight/, 'fa-clock'],
  [/first|second|third|fourth/, 'fa-list-ol'],
  [/\brun\b/, 'fa-person-running'],
  [/\bwalk\b/, 'fa-person-walking'],
  [/\bdrink\b/, 'fa-mug-saucer'],
  [/\bread\b|reading/, 'fa-book-open'],
  [/\bwrite\b/, 'fa-pen'],
  [/\bdance\b|dancing/, 'fa-music'],
  [/\bsing\b/, 'fa-microphone'],
  [/shirt|dress|jacket|sweater|skirt|shorts|pants|socks|clothes/, 'fa-shirt'],
  [/shoes/, 'fa-shoe-prints'],
  [/sunny/, 'fa-sun'],
  [/rainy/, 'fa-cloud-rain'],
  [/cloudy/, 'fa-cloud'],
  [/windy/, 'fa-wind'],
  [/snowy/, 'fa-snowflake'],
  [/\bhot\b/, 'fa-temperature-high'],
  [/\bcold\b/, 'fa-temperature-low'],
  [/warm|cool/, 'fa-temperature-half'],
  [/stormy/, 'fa-cloud-bolt'],
  [/stand up|sit down|raise your hand/, 'fa-hand'],
  [/open your book/, 'fa-book-open'],
  [/close the door/, 'fa-door-closed'],
  [/listen/, 'fa-ear-listen'],
  [/\blook\b/, 'fa-eye'],
  [/repeat/, 'fa-rotate'],
  [/be quiet/, 'fa-volume-xmark'],
  [/swimming/, 'fa-person-swimming'],
  [/painting/, 'fa-palette'],
  [/guitar/, 'fa-guitar'],
  [/photography/, 'fa-camera'],
  [/gardening/, 'fa-seedling'],
  [/traveling/, 'fa-plane'],
  [/gaming/, 'fa-gamepad'],
  [/soccer/, 'fa-futbol'],
  [/basketball/, 'fa-basketball'],
  [/volleyball/, 'fa-volleyball'],
  [/baseball/, 'fa-baseball'],
  [/running/, 'fa-person-running'],
  [/boxing/, 'fa-hand-fist'],
  [/cycling/, 'fa-person-biking'],
  [/yoga/, 'fa-spa'],
  [/teacher/, 'fa-chalkboard-user'],
  [/doctor|nurse/, 'fa-user-doctor'],
  [/engineer/, 'fa-gears'],
  [/lawyer/, 'fa-scale-balanced'],
  [/driver/, 'fa-car'],
  [/police officer/, 'fa-shield-halved'],
  [/farmer/, 'fa-tractor'],
  [/artist/, 'fa-palette'],
  [/rice|bread|fruit|vegetables|beans|cheese/, 'fa-bowl-food'],
  [/chicken/, 'fa-drumstick-bite'],
  [/\bfish\b/, 'fa-fish'],
  [/salad/, 'fa-carrot'],
  [/soup/, 'fa-bowl-food'],
  [/menu/, 'fa-book-open'],
  [/\bbill\b|receipt|price|discount|cash|credit card/, 'fa-money-bill'],
  [/expensive|cheap|size|try on/, 'fa-tag'],
];

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
