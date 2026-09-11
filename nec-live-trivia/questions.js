/* =========================================================
   QUESTIONS.JS — Banco de preguntas
   NicaEnglish Club · Trivia de expresiones en inglés
   ---------------------------------------------------------
   Este es un SET DE EJEMPLO con 40 verbos/expresiones
   comunes del inglés americano, en el formato que usa el
   juego: "¿En qué situación usarías 'X'?" con 4 opciones,
   donde "correcta" es el índice (0-3) de la opción correcta.

   Puedes reemplazar, editar o agregar preguntas libremente.
   El juego elige preguntas al azar de esta lista cada vez
   que se crea una sala nueva, así que entre más preguntas
   agregues, menos se repiten las partidas.

   Modo rápido  = 15 preguntas
   Modo medio   = 25 preguntas
   Modo completo = 40 preguntas
   (si en el futuro tienes menos de 40, el modo completo
   simplemente usará todas las que existan)
   ========================================================= */

export const QUESTIONS = [
  {
    expresion: "give up",
    pregunta: "¿En qué situación usarías la expresión 'give up'?",
    opciones: [
      "Cuando decides dejar de intentar algo",
      "Cuando le regalas algo a alguien",
      "Cuando subes el volumen de la música",
      "Cuando llegas temprano a una cita"
    ],
    correcta: 0
  },
  {
    expresion: "break down",
    pregunta: "¿Cuándo dirías que algo 'broke down'?",
    opciones: [
      "Cuando ganas una competencia",
      "Cuando un carro o una máquina deja de funcionar",
      "Cuando terminas una tarea a tiempo",
      "Cuando aprendes una palabra nueva"
    ],
    correcta: 1
  },
  {
    expresion: "get over",
    pregunta: "¿Cuándo usarías 'get over' (algo)?",
    opciones: [
      "Cuando te superas o recuperas de una situación difícil",
      "Cuando cruzas la calle",
      "Cuando compras algo caro",
      "Cuando llegas tarde al trabajo"
    ],
    correcta: 0
  },
  {
    expresion: "hang out",
    pregunta: "¿En qué contexto usarías 'hang out'?",
    opciones: [
      "Cuando cuelgas ropa a secar",
      "Cuando pasas el rato con amigos sin un plan formal",
      "Cuando cuelgas una llamada",
      "Cuando te despides de alguien"
    ],
    correcta: 1
  },
  {
    expresion: "kick off",
    pregunta: "¿Cuándo dirías que algo 'kicks off'?",
    opciones: [
      "Cuando algo termina abruptamente",
      "Cuando pateas una pelota",
      "Cuando un evento o actividad comienza",
      "Cuando alguien se enoja"
    ],
    correcta: 2
  },
  {
    expresion: "hold on",
    pregunta: "¿Cuándo usarías 'hold on'?",
    opciones: [
      "Para pedirle a alguien que espere un momento",
      "Para decir que sostienes algo pesado",
      "Para despedirte de alguien",
      "Para decir que algo es tuyo"
    ],
    correcta: 0
  },
  {
    expresion: "figure out",
    pregunta: "¿En qué situación dirías 'figure out'?",
    opciones: [
      "Cuando dibujas una figura",
      "Cuando calculas tu peso",
      "Cuando finalmente entiendes o resuelves algo",
      "Cuando te pierdes en una ciudad"
    ],
    correcta: 2
  },
  {
    expresion: "run into",
    pregunta: "¿Cuándo usarías 'run into' (a alguien)?",
    opciones: [
      "Cuando te encuentras con alguien por casualidad",
      "Cuando corres una maratón",
      "Cuando entras corriendo a un edificio",
      "Cuando chocas tu carro"
    ],
    correcta: 0
  },
  {
    expresion: "check in",
    pregunta: "¿En qué situación usarías 'check in'?",
    opciones: [
      "Cuando revisas tu correo",
      "Cuando registras tu llegada a un hotel o vuelo",
      "Cuando revisas un examen",
      "Cuando confirmas un precio"
    ],
    correcta: 1
  },
  {
    expresion: "show up",
    pregunta: "¿Cuándo dirías que alguien 'showed up'?",
    opciones: [
      "Cuando alguien se viste elegante",
      "Cuando alguien presume algo",
      "Cuando alguien llega o se presenta a un lugar",
      "Cuando alguien gana un premio"
    ],
    correcta: 2
  },
  {
    expresion: "look forward to",
    pregunta: "¿Cuándo usarías 'look forward to'?",
    opciones: [
      "Cuando miras hacia adelante al caminar",
      "Cuando esperas algo con ilusión o emoción",
      "Cuando revisas tu horario",
      "Cuando te arrepientes de algo"
    ],
    correcta: 1
  },
  {
    expresion: "catch up",
    pregunta: "¿En qué contexto usarías 'catch up' (con alguien)?",
    opciones: [
      "Cuando atrapas una pelota",
      "Cuando te pones al día con alguien o algo",
      "Cuando agarras un resfriado",
      "Cuando llegas tarde a propósito"
    ],
    correcta: 1
  },
  {
    expresion: "back up",
    pregunta: "¿Cuándo dirías 'back up' en una conversación técnica?",
    opciones: [
      "Cuando respaldas información o datos",
      "Cuando caminas hacia atrás",
      "Cuando apoyas una idea sin evidencia",
      "Cuando cancelas un plan"
    ],
    correcta: 0
  },
  {
    expresion: "call off",
    pregunta: "¿Cuándo usarías 'call off' (algo)?",
    opciones: [
      "Cuando llamas a alguien por teléfono",
      "Cuando cancelas un evento o plan",
      "Cuando gritas el nombre de alguien",
      "Cuando confirmas una cita"
    ],
    correcta: 1
  },
  {
    expresion: "come across",
    pregunta: "¿Cuándo usarías 'come across' (algo)?",
    opciones: [
      "Cuando cruzas una calle",
      "Cuando encuentras algo por casualidad",
      "Cuando te presentas ante un grupo",
      "Cuando pierdes algo importante"
    ],
    correcta: 1
  },
  {
    expresion: "cut it out",
    pregunta: "¿En qué situación dirías 'cut it out'?",
    opciones: [
      "Cuando cortas papel con tijeras",
      "Cuando le pides a alguien que deje de hacer algo molesto",
      "Cuando terminas una tarea",
      "Cuando recortas gastos"
    ],
    correcta: 1
  },
  {
    expresion: "drop by",
    pregunta: "¿Cuándo usarías 'drop by'?",
    opciones: [
      "Cuando dejas caer algo al piso",
      "Cuando visitas a alguien brevemente sin avisar mucho antes",
      "Cuando terminas un turno de trabajo",
      "Cuando bajas el volumen de algo"
    ],
    correcta: 1
  },
  {
    expresion: "fill in",
    pregunta: "¿Cuándo usarías 'fill in'?",
    opciones: [
      "Cuando llenas un formulario o información faltante",
      "Cuando llenas un vaso de agua",
      "Cuando te sientes lleno después de comer",
      "Cuando terminas de leer un libro"
    ],
    correcta: 0
  },
  {
    expresion: "get along",
    pregunta: "¿Cuándo dirías que dos personas 'get along'?",
    opciones: [
      "Cuando compiten entre ellas",
      "Cuando se llevan bien",
      "Cuando se conocen por primera vez",
      "Cuando discuten frecuentemente"
    ],
    correcta: 1
  },
  {
    expresion: "look after",
    pregunta: "¿Cuándo usarías 'look after' (alguien)?",
    opciones: [
      "Cuando cuidas de alguien",
      "Cuando buscas a alguien perdido",
      "Cuando sigues a alguien de cerca",
      "Cuando admiras a alguien"
    ],
    correcta: 0
  },
  {
    expresion: "make up",
    pregunta: "¿En qué situación usarías 'make up' (después de una pelea)?",
    opciones: [
      "Cuando te maquillas",
      "Cuando inventas una excusa",
      "Cuando reconcilias con alguien tras una discusión",
      "Cuando compensas tiempo perdido en el trabajo"
    ],
    correcta: 2
  },
  {
    expresion: "pass out",
    pregunta: "¿Cuándo dirías que alguien 'passed out'?",
    opciones: [
      "Cuando alguien aprueba un examen",
      "Cuando alguien se desmaya",
      "Cuando alguien entrega un examen",
      "Cuando alguien se despide"
    ],
    correcta: 1
  },
  {
    expresion: "pick up",
    pregunta: "¿En qué situación usarías 'pick up' (a alguien)?",
    opciones: [
      "Cuando recoges a alguien en tu carro",
      "Cuando eliges entre opciones",
      "Cuando levantas pesas",
      "Cuando terminas una relación"
    ],
    correcta: 0
  },
  {
    expresion: "put off",
    pregunta: "¿Cuándo usarías 'put off' (algo)?",
    opciones: [
      "Cuando apagas una luz",
      "Cuando pospones algo para después",
      "Cuando te quitas la ropa",
      "Cuando terminas algo antes de tiempo"
    ],
    correcta: 1
  },
  {
    expresion: "settle down",
    pregunta: "¿Cuándo dirías que alguien 'settles down'?",
    opciones: [
      "Cuando alguien se muda de país constantemente",
      "Cuando alguien se calma o se establece en una vida más estable",
      "Cuando alguien empieza un nuevo trabajo",
      "Cuando alguien viaja de vacaciones"
    ],
    correcta: 1
  },
  {
    expresion: "take off",
    pregunta: "¿En qué contexto usarías 'take off' (hablando de un avión)?",
    opciones: [
      "Cuando el avión aterriza",
      "Cuando el avión despega",
      "Cuando el avión se retrasa",
      "Cuando compras un boleto de avión"
    ],
    correcta: 1
  },
  {
    expresion: "turn down",
    pregunta: "¿Cuándo usarías 'turn down' (una oferta)?",
    opciones: [
      "Cuando aceptas algo con gusto",
      "Cuando rechazas una propuesta u oferta",
      "Cuando subes el volumen",
      "Cuando das vuelta en una esquina"
    ],
    correcta: 1
  },
  {
    expresion: "work out",
    pregunta: "¿Cuándo usarías 'work out' además de 'hacer ejercicio'?",
    opciones: [
      "Cuando algo resulta bien o se resuelve al final",
      "Cuando renuncias a un trabajo",
      "Cuando pides un aumento de sueldo",
      "Cuando organizas una fiesta"
    ],
    correcta: 0
  },
  {
    expresion: "bring up",
    pregunta: "¿Cuándo usarías 'bring up' (un tema)?",
    opciones: [
      "Cuando subes escaleras",
      "Cuando mencionas o introduces un tema en una conversación",
      "Cuando criticas a alguien en público",
      "Cuando terminas una conversación"
    ],
    correcta: 1
  },
  {
    expresion: "carry on",
    pregunta: "¿Cuándo usarías 'carry on'?",
    opciones: [
      "Cuando cargas una maleta pesada",
      "Cuando continúas haciendo algo a pesar de dificultades",
      "Cuando dejas de hacer algo por completo",
      "Cuando ayudas a alguien a cargar cosas"
    ],
    correcta: 1
  },
  {
    expresion: "deal with",
    pregunta: "¿Cuándo usarías 'deal with' (algo)?",
    opciones: [
      "Cuando haces un trato de negocios",
      "Cuando te encargas o lidias con una situación",
      "Cuando repartes cartas en un juego",
      "Cuando evitas un problema por completo"
    ],
    correcta: 1
  },
  {
    expresion: "end up",
    pregunta: "¿Cuándo usarías 'end up' (haciendo algo)?",
    opciones: [
      "Cuando planeas algo con mucha anticipación",
      "Cuando terminas en una situación no planeada originalmente",
      "Cuando terminas un libro",
      "Cuando das por terminada una relación"
    ],
    correcta: 1
  },
  {
    expresion: "face up to",
    pregunta: "¿Cuándo usarías 'face up to' (algo)?",
    opciones: [
      "Cuando evitas un problema",
      "Cuando te maquillas la cara",
      "Cuando finalmente enfrentas una realidad difícil",
      "Cuando conoces a alguien nuevo"
    ],
    correcta: 2
  },
  {
    expresion: "get away with",
    pregunta: "¿Cuándo usarías 'get away with' (algo)?",
    opciones: [
      "Cuando te vas de vacaciones",
      "Cuando escapas de un lugar peligroso",
      "Cuando logras hacer algo indebido sin consecuencias",
      "Cuando regalas algo a alguien"
    ],
    correcta: 2
  },
  {
    expresion: "keep up with",
    pregunta: "¿Cuándo usarías 'keep up with' (alguien o algo)?",
    opciones: [
      "Cuando mantienes el ritmo o te mantienes al día con algo",
      "Cuando guardas un secreto",
      "Cuando dejas de seguir una tendencia",
      "Cuando pierdes contacto con alguien"
    ],
    correcta: 0
  },
  {
    expresion: "let down",
    pregunta: "¿Cuándo dirías que alguien te 'let down'?",
    opciones: [
      "Cuando alguien te ayuda a bajar algo pesado",
      "Cuando alguien te decepciona o falla",
      "Cuando alguien te felicita",
      "Cuando alguien te presta dinero"
    ],
    correcta: 1
  },
  {
    expresion: "point out",
    pregunta: "¿Cuándo usarías 'point out' (algo)?",
    opciones: [
      "Cuando señalas o haces notar algo",
      "Cuando apuntas con un arma",
      "Cuando eliges una opción al azar",
      "Cuando ignoras un comentario"
    ],
    correcta: 0
  },
  {
    expresion: "set up",
    pregunta: "¿Cuándo usarías 'set up' (algo)?",
    opciones: [
      "Cuando desarmas algo",
      "Cuando organizas o preparas algo con anticipación",
      "Cuando te levantas de la cama",
      "Cuando terminas una reunión"
    ],
    correcta: 1
  },
  {
    expresion: "stand out",
    pregunta: "¿Cuándo dirías que algo o alguien 'stands out'?",
    opciones: [
      "Cuando se queda quieto sin hacer nada",
      "Cuando destaca o llama la atención por encima de los demás",
      "Cuando se esconde de la gente",
      "Cuando se rinde ante un reto"
    ],
    correcta: 1
  },
  {
    expresion: "wear out",
    pregunta: "¿Cuándo usarías 'wear out' (algo o a alguien)?",
    opciones: [
      "Cuando estrenas ropa nueva",
      "Cuando algo se desgasta o alguien se agota",
      "Cuando te vistes elegante para un evento",
      "Cuando compras zapatos nuevos"
    ],
    correcta: 1
  }
];
