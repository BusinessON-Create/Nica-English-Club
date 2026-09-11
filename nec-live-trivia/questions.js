/* =========================================================
   QUESTIONS.JS — Banco de preguntas
   NicaEnglish Club · Trivia de expresiones en inglés
   ---------------------------------------------------------
   Set de ejemplo con 40 verbos/expresiones comunes del
   inglés americano. Cada pregunta ahora incluye "ejemplo":
   una oración en inglés usando la expresión, que se muestra
   en la Guía de Estudio antes de jugar.

   Puedes reemplazar, editar o agregar preguntas libremente.
   El juego elige preguntas al azar de esta lista cada vez
   que se crea una sala o se juega en modo solo.

   Modo rápido   = 15 preguntas
   Modo medio    = 25 preguntas
   Modo completo = 40 preguntas
   ========================================================= */

export const QUESTIONS = [
  {
    expresion: "give up",
    pregunta: "¿En qué situación usarías la expresión 'give up'?",
    ejemplo: "I won't give up until I finish this course.",
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
    ejemplo: "My car broke down on the way to work.",
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
    ejemplo: "It took her weeks to get over the flu.",
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
    ejemplo: "We usually hang out at the park on Sundays.",
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
    ejemplo: "The meeting kicks off at 9 AM sharp.",
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
    ejemplo: "Hold on a second, I need to grab my keys.",
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
    ejemplo: "I finally figured out how to solve the puzzle.",
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
    ejemplo: "I ran into my old teacher at the mall.",
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
    ejemplo: "Please check in two hours before your flight.",
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
    ejemplo: "He showed up late to the interview.",
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
    ejemplo: "I'm looking forward to the weekend.",
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
    ejemplo: "Let's catch up over coffee sometime this week.",
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
    ejemplo: "Always back up your files before updating your computer.",
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
    ejemplo: "They called off the picnic because of the rain.",
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
    ejemplo: "I came across an old photo while cleaning my room.",
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
    ejemplo: "Cut it out, you two! Stop arguing.",
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
    ejemplo: "Feel free to drop by whenever you're in the neighborhood.",
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
    ejemplo: "Please fill in your name and address on this form.",
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
    ejemplo: "My sister and I get along really well.",
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
    ejemplo: "Can you look after my dog this weekend?",
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
    ejemplo: "They had a fight, but they made up the next day.",
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
    ejemplo: "It was so hot that one student passed out during class.",
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
    ejemplo: "I'll pick you up from school at 3 PM.",
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
    ejemplo: "Don't put off your homework until the last minute.",
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
    ejemplo: "After years of traveling, they decided to settle down in Texas.",
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
    ejemplo: "The plane took off right on schedule.",
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
    ejemplo: "She turned down the job offer because of the low salary.",
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
    ejemplo: "I hope everything works out for you.",
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
    ejemplo: "He brought up an interesting point during the meeting.",
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
    ejemplo: "Despite the rain, the team carried on with the game.",
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
    ejemplo: "I have a lot of paperwork to deal with today.",
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
    ejemplo: "We ended up watching movies all night instead of studying.",
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
    ejemplo: "You need to face up to your mistakes.",
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
    ejemplo: "He thinks he can get away with cheating on the test.",
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
    ejemplo: "It's hard to keep up with all the new technology.",
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
    ejemplo: "I promise I won't let you down.",
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
    ejemplo: "The teacher pointed out a mistake in my essay.",
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
    ejemplo: "We need to set up the projector before the presentation.",
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
    ejemplo: "Her bright red dress made her stand out in the crowd.",
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
    ejemplo: "These shoes wore out after just one summer.",
    opciones: [
      "Cuando estrenas ropa nueva",
      "Cuando algo se desgasta o alguien se agota",
      "Cuando te vistes elegante para un evento",
      "Cuando compras zapatos nuevos"
    ],
    correcta: 1
  }
];
