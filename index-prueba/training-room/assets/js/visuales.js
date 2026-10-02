// visuales.js — apoyo visual del Training Room v2 (una sola identidad)
//
// Los íconos son de Font Awesome (el mismo set que ya usa tu plataforma), en
// dorado sobre tarjeta oscura. Las banderas vienen de flagcdn.com (imágenes
// reales). Todo está por unidad: por ahora SOLO la Unidad 1 tiene visuales
// (piloto); las demás muestran el contenido sin imagen hasta que las sumemos.

export const ICONO_UNIDAD = {
  'a1-u1': 'fa-handshake', 'a1-u2': 'fa-heart', 'a1-u3': 'fa-house', 'a1-u4': 'fa-clock',
  'a1-u5': 'fa-person-running', 'a1-u6': 'fa-circle-question', 'a1-u7': 'fa-utensils',
  'a2-u1': 'fa-clock-rotate-left', 'a2-u2': 'fa-shuffle', 'a2-u3': 'fa-compass',
  'a2-u4': 'fa-code-branch', 'a2-u5': 'fa-list-check', 'a2-u6': 'fa-scale-balanced',
  'a2-u7': 'fa-cart-shopping', 'a2-u8': 'fa-circle-question', 'a2-u9': 'fa-thumbs-up',
  'b1-u1': 'fa-clock-rotate-left', 'b1-u2': 'fa-hourglass-half', 'b1-u3': 'fa-backward-step',
  'b1-u4': 'fa-circle-half-stroke', 'b1-u5': 'fa-industry', 'b1-u6': 'fa-quote-right',
  'b1-u7': 'fa-crosshairs', 'b1-u8': 'fa-magnifying-glass', 'b1-u9': 'fa-arrows-rotate',
  'b1-u10': 'fa-comments', 'b1-u11': 'fa-microphone-lines',
};

// Textos de portada (Aprenderás / En la vida real). Clave = "{nivelId}-{unidadId}"
// (los IDs de unidad se repiten entre niveles: u1 de A1 y u1 de A2 son cosas
// distintas, así que hay que diferenciarlos o se mezclan los textos).
export const PORTADAS = {
  'a1-u1': {
    aprenderas: 'a presentarte, saludar y decir de dónde eres.',
    vidaReal: 'lo usas cada vez que conoces a alguien: de viaje, en el trabajo o por internet.',
  },
  'a1-u2': {
    aprenderas: 'a hablar de tu familia y decir qué cosas tienes.',
    vidaReal: 'lo usas cuando le muestras fotos de tu familia a alguien o hablas de lo que es tuyo.',
  },
  'a1-u3': {
    aprenderas: 'a describir tu casa, tu barrio y dar direcciones simples.',
    vidaReal: 'lo usas cuando alguien te pregunta cómo es tu casa o cómo llegar a un lugar.',
  },
  'a1-u4': {
    aprenderas: 'a hablar de tu rutina diaria y decir la hora.',
    vidaReal: 'lo usas todos los días: contar qué haces y cuándo, o coordinar una hora con alguien.',
  },
  'a1-u5': {
    aprenderas: 'a describir qué está pasando en este momento y dar instrucciones.',
    vidaReal: 'lo usas cuando cuentas lo que está pasando ahora mismo, o das una orden simple.',
  },
  'a1-u6': {
    aprenderas: 'a hablar de tus hobbies, tu trabajo y lo que sabes hacer.',
    vidaReal: 'lo usas en una entrevista, conociendo gente nueva o hablando de tus habilidades.',
  },
  'a1-u7': {
    aprenderas: 'a comparar cosas y pedir algo de forma educada.',
    vidaReal: 'lo usas en un restaurante o una tienda, para ordenar o comprar algo.',
  },
  'a2-u1': {
    aprenderas: 'a contar cosas que pasaron en el pasado.',
    vidaReal: 'lo usas para contar tu fin de semana, un viaje o cualquier historia pasada.',
  },
  'a2-u2': {
    aprenderas: 'a contar dos cosas que pasaron al mismo tiempo en el pasado.',
    vidaReal: 'lo usas cuando dices "estaba haciendo X cuando pasó Y".',
  },
  'a2-u3': {
    aprenderas: 'a hablar de planes y del futuro.',
    vidaReal: 'lo usas para decir qué vas a hacer el fin de semana o tus planes de vida.',
  },
  'a2-u4': {
    aprenderas: 'a hablar de condiciones: "si pasa esto, entonces...".',
    vidaReal: 'lo usas para tomar decisiones y hablar de consecuencias.',
  },
  'a2-u5': {
    aprenderas: 'a hablar de obligaciones y posibilidades.',
    vidaReal: 'lo usas para decir qué debes hacer o qué podrías hacer.',
  },
  'a2-u6': {
    aprenderas: 'a comparar con más precisión.',
    vidaReal: 'lo usas para decir que algo es "el mejor" o "tan bueno como" otra cosa.',
  },
  'a2-u7': {
    aprenderas: 'a preguntar y hablar de cantidades.',
    vidaReal: 'lo usas en el supermercado, cocinando o hablando de dinero.',
  },
  'a2-u8': {
    aprenderas: 'a hablar sin especificar exactamente de qué o quién hablas.',
    vidaReal: 'lo usas en conversación natural, sin dar todos los detalles.',
  },
  'a2-u9': {
    aprenderas: 'a hablar de experiencias de vida y mostrar acuerdo o desacuerdo.',
    vidaReal: 'lo usas para contar "ya hice esto" o para opinar en una conversación.',
  },
  'b1-u1': {
    aprenderas: 'a distinguir cuándo algo es una experiencia general y cuándo un momento específico del pasado.',
    vidaReal: 'lo usas en una entrevista de trabajo o contando tu historia profesional.',
  },
  'b1-u2': {
    aprenderas: 'a hablar de acciones que empezaron en el pasado y siguen ahora.',
    vidaReal: 'lo usas para contar hace cuánto haces algo que sigues haciendo.',
  },
  'b1-u3': {
    aprenderas: 'a contar qué había pasado antes de otro momento en el pasado.',
    vidaReal: 'lo usas al contar una historia con varios eventos en orden.',
  },
  'b1-u4': {
    aprenderas: 'a distinguir verbos de estado (saber, creer) de verbos de acción (correr, cocinar).',
    vidaReal: 'lo usas para no cometer errores comunes como "estoy sabiendo" en vez de "sé".',
  },
  'b1-u5': {
    aprenderas: 'a hablar de algo sin decir quién lo hizo.',
    vidaReal: 'lo usas en noticias, procesos o reglas: "se fabrica", "fue construido".',
  },
  'b1-u6': {
    aprenderas: 'a contar lo que otra persona dijo, sin citarla palabra por palabra.',
    vidaReal: 'lo usas al contarle a alguien lo que un tercero te dijo.',
  },
  'b1-u7': {
    aprenderas: 'a dar información extra o esencial sobre personas y lugares con precisión.',
    vidaReal: 'lo usas para describir con detalle a alguien o algún lugar.',
  },
  'b1-u8': {
    aprenderas: 'a expresar obligación, posibilidad y hacer deducciones lógicas.',
    vidaReal: 'lo usas para decir qué es obligatorio, posible, o para adivinar qué pasó.',
  },
  'b1-u9': {
    aprenderas: 'a hablar de hábitos pasados y verbos que cambian de significado.',
    vidaReal: 'lo usas para contar lo que solías hacer y lo que ya es costumbre ahora.',
  },
  'b1-u10': {
    aprenderas: 'a conectar ideas contrastantes y dar matices al argumentar.',
    vidaReal: 'lo usas para debatir o dar tu opinión de forma más sofisticada.',
  },
  'b1-u11': {
    aprenderas: 'a sonar más natural en conversación: question tags, preguntas indirectas.',
    vidaReal: 'lo usas en conversación cotidiana para sonar más fluido y educado.',
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

// Warm-up visual por unidad (reemplaza la instrucción para el coach). Clave = "{nivelId}-{unidadId}".
export const WARMUP = {
  'a1-u1': {
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
