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
  'b2-u1': 'fa-map', 'b2-u2': 'fa-rocket', 'b2-u3': 'fa-road-circle-xmark',
  'b2-u4': 'fa-layer-group', 'b2-u5': 'fa-star-half-stroke', 'b2-u6': 'fa-newspaper',
  'b2-u7': 'fa-screwdriver-wrench', 'b2-u8': 'fa-bullhorn', 'b2-u9': 'fa-compress',
  'b2-u10': 'fa-magnifying-glass-chart', 'b2-u11': 'fa-bolt', 'b2-u12': 'fa-link',
  'b2-u13': 'fa-pen-fancy',
  'c1-u1': 'fa-gem', 'c1-u2': 'fa-hourglass-end', 'c1-u3': 'fa-building-columns',
  'c1-u4': 'fa-feather', 'c1-u5': 'fa-minimize', 'c1-u6': 'fa-diagram-project',
  'c1-u7': 'fa-arrows-up-down', 'c1-u8': 'fa-bullseye', 'c1-u9': 'fa-link',
  'c1-u10': 'fa-quote-left', 'c1-u11': 'fa-spell-check', 'c1-u12': 'fa-scale-balanced',
  'c1-u13': 'fa-book-open-reader', 'c1-u14': 'fa-headset', 'c1-u15': 'fa-keyboard',
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
  'b2-u1': {
    aprenderas: 'a combinar varios tiempos pasados con precisión.',
    vidaReal: 'lo usas al contar tu historia de vida de forma fluida y conectada.',
  },
  'b2-u2': {
    aprenderas: 'a proyectarte hacia el futuro con distintos niveles de certeza.',
    vidaReal: 'lo usas para hablar de metas y dónde estarás en X años.',
  },
  'b2-u3': {
    aprenderas: 'a imaginar cómo habría sido el pasado si algo hubiera sido diferente.',
    vidaReal: 'lo usas para reflexionar sobre decisiones pasadas y sus consecuencias.',
  },
  'b2-u4': {
    aprenderas: 'a mezclar condicionales de distintos tiempos en una sola idea.',
    vidaReal: 'lo usas para conectar una causa pasada con un resultado presente.',
  },
  'b2-u5': {
    aprenderas: 'a expresar deseos y preferencias con matices.',
    vidaReal: 'lo usas para negociar, elegir entre opciones o lamentar algo.',
  },
  'b2-u6': {
    aprenderas: 'voz pasiva avanzada, como se usa en noticias y reportes.',
    vidaReal: 'lo usas para sonar objetivo, como en un artículo o informe.',
  },
  'b2-u7': {
    aprenderas: 'a decir que alguien más hizo algo por ti (mandar a hacer).',
    vidaReal: 'lo usas cuando pagas a alguien para que haga un trabajo por ti.',
  },
  'b2-u8': {
    aprenderas: 'a reportar lo que alguien dijo con más matices y precisión.',
    vidaReal: 'lo usas en reuniones formales o al transmitir mensajes complejos.',
  },
  'b2-u9': {
    aprenderas: 'a comprimir información compleja en frases más cortas y elegantes.',
    vidaReal: 'lo usas al escribir de forma más académica o profesional.',
  },
  'b2-u10': {
    aprenderas: 'a especular y hacer deducciones sobre el pasado.',
    vidaReal: 'lo usas para criticar constructivamente o analizar qué salió mal.',
  },
  'b2-u11': {
    aprenderas: 'a dar énfasis especial reordenando la oración.',
    vidaReal: 'lo usas para sonar más persuasivo o enfático al hablar.',
  },
  'b2-u12': {
    aprenderas: 'a conectar ideas de forma fluida en textos y discursos largos.',
    vidaReal: 'lo usas al escribir ensayos o dar presentaciones formales.',
  },
  'b2-u13': {
    aprenderas: 'a elegir la palabra exacta según el contexto formal o informal.',
    vidaReal: 'lo usas para adaptar tu inglés según con quién hablas.',
  },
  'c1-u1': {
    aprenderas: 'a dominar los tiempos verbales y los condicionales con matices finos.',
    vidaReal: 'lo usas para hablar y escribir con la precisión de un hablante muy avanzado.',
  },
  'c1-u2': {
    aprenderas: 'a expresar expectativas, críticas y obligaciones del pasado con exactitud.',
    vidaReal: 'lo usas en evaluaciones de proyectos: "debió hacerse", "no hacía falta".',
  },
  'c1-u3': {
    aprenderas: 'a usar pasiva y causativa con fluidez en contextos formales.',
    vidaReal: 'lo usas en informes, auditorías y comunicación institucional.',
  },
  'c1-u4': {
    aprenderas: 'a suavizar y matizar afirmaciones (hedging) como en textos académicos.',
    vidaReal: 'lo usas para opinar con cautela y sonar profesional.',
  },
  'c1-u5': {
    aprenderas: 'a comprimir ideas con cláusulas reducidas y participios.',
    vidaReal: 'lo usas en redacción académica y profesional más concisa.',
  },
  'c1-u6': {
    aprenderas: 'a construir frases complejas con nominalización y subordinación.',
    vidaReal: 'lo usas en ensayos y documentos formales.',
  },
  'c1-u7': {
    aprenderas: 'a romper el orden normal de la oración con inversión y anteposición.',
    vidaReal: 'lo usas en discursos y escritura de alto impacto.',
  },
  'c1-u8': {
    aprenderas: 'a enfatizar información con oraciones hendidas, elipsis y sustitución.',
    vidaReal: 'lo usas para destacar lo importante sin repetir palabras.',
  },
  'c1-u9': {
    aprenderas: 'a conectar ideas con marcadores de discurso de nivel profesional.',
    vidaReal: 'lo usas para que un texto largo fluya y se entienda con claridad.',
  },
  'c1-u10': {
    aprenderas: 'a puntuar bien para evitar comma splices y oraciones sin cortar.',
    vidaReal: 'lo usas para que tus correos y ensayos se vean profesionales.',
  },
  'c1-u11': {
    aprenderas: 'a elegir palabras con precisión según significado, connotación y registro.',
    vidaReal: 'lo usas para dar feedback o negociar sin sonar mal.',
  },
  'c1-u12': {
    aprenderas: 'a argumentar y discrepar sin romper el diálogo.',
    vidaReal: 'lo usas en debates, reuniones y la sección de ensayo del examen.',
  },
  'c1-u13': {
    aprenderas: 'estrategias para el Reading del TOEFL: ideas principales, vocabulario en contexto e inferencia.',
    vidaReal: 'lo usas para rendir bien en la sección de lectura del examen.',
  },
  'c1-u14': {
    aprenderas: 'estrategias para Listening y Speaking del TOEFL.',
    vidaReal: 'lo usas para entender clases/conversaciones y responder con claridad bajo tiempo.',
  },
  'c1-u15': {
    aprenderas: 'estrategias para las tareas de Writing del TOEFL.',
    vidaReal: 'lo usas para organizar, escribir y revisar ensayos en tiempo limitado.',
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
