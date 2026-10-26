// ejercicios-u1.js — Práctica de Unidad 1 convertida a juegos
//
// El JSON original de algunos ejercicios no traía la respuesta correcta
// (ej. "I ___ from Nicaragua." sin decir si es am/is/are) ni las preguntas
// de listening tenían su respuesta. Se completaron aquí a mano — revísalas.

export const PRACTICA_U1 = {
  grammarPractice: [
    {
      topic: 'Subject pronouns drill',
      tipo: 'opcion',
      preguntas: [
        { pregunta: '___ (Carlos) is a doctor.', opciones: ['He', 'She', 'They', 'We'], correcta: 'He' },
        { pregunta: '___ (my friends) are students.', opciones: ['He', 'They', 'It', 'I'], correcta: 'They' },
        { pregunta: '___ (you and me) are here.', opciones: ['We', 'They', 'You', 'It'], correcta: 'We' },
        { pregunta: '___ (the book) is on the table.', opciones: ['It', 'He', 'They', 'She'], correcta: 'It' },
      ],
    },
    {
      topic: 'Verb to be drill',
      tipo: 'opcion',
      preguntas: [
        { pregunta: 'I ___ from Nicaragua.', opciones: ['am', 'is', 'are'], correcta: 'am' },
        { pregunta: 'She ___ a nurse.', opciones: ['am', 'is', 'are'], correcta: 'is' },
        { pregunta: 'They ___ from Brazil.', opciones: ['am', 'is', 'are'], correcta: 'are' },
        { pregunta: 'We ___ friends.', opciones: ['am', 'is', 'are'], correcta: 'are' },
      ],
    },
    {
      topic: 'Word order practice',
      tipo: 'orden',
      preguntas: [
        { piezas: ['name', 'is', 'my', 'Ana'], correcta: 'my name is Ana' },
        { piezas: ['from', 'I', 'am', 'Managua'], correcta: 'I am from Managua' },
        { piezas: ['student', 'she', 'a', 'is'], correcta: 'she is a student' },
      ],
    },
  ],
  vocabularyPractice: [
    {
      topic: 'Numbers matching',
      pares: [
        { a: '7', b: 'seven' }, { a: '14', b: 'fourteen' }, { a: '20', b: 'twenty' },
        { a: '3', b: 'three' }, { a: '18', b: 'eighteen' },
      ],
    },
    {
      topic: 'Countries & nationalities matching',
      pares: [
        { a: 'Mexico', b: 'Mexican' }, { a: 'France', b: 'French' }, { a: 'Japan', b: 'Japanese' },
        { a: 'Brazil', b: 'Brazilian' }, { a: 'Italy', b: 'Italian' },
      ],
    },
  ],
  listening: {
    audioScript: [
      "Hi, I'm Laura. I'm from Spain. I'm 25 years old.",
      "Hello, my name is Kenji. I'm Japanese. I'm a student.",
      "Hi there, I'm Marco. I'm from Italy. I'm an engineer.",
    ],
    preguntas: [
      { pregunta: 'Where is Laura from?', opciones: ['Spain', 'Japan', 'Italy'], correcta: 'Spain' },
      { pregunta: "What is Kenji's nationality?", opciones: ['Japanese', 'Spanish', 'Italian'], correcta: 'Japanese' },
      { pregunta: "What is Marco's job?", opciones: ['engineer', 'student', 'doctor'], correcta: 'engineer' },
    ],
  },
};
