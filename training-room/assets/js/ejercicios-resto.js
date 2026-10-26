// ejercicios-resto.js — Práctica de Unidades 2-7 convertida a juegos.
// Mismo criterio que ejercicios-u1.js: se completaron las respuestas y
// opciones que el JSON original no traía. Revísalas.

export const PRACTICA_U2 = {
  grammarPractice: [
    { topic: 'Possessive adjectives drill', tipo: 'opcion', preguntas: [
      { pregunta: '(I) ___ book is red.', opciones: ['My', 'Her', 'Their', 'Your'], correcta: 'My' },
      { pregunta: '(she) ___ phone is new.', opciones: ['My', 'Her', 'Their', 'His'], correcta: 'Her' },
      { pregunta: '(they) ___ house is big.', opciones: ['My', 'Her', 'Their', 'Our'], correcta: 'Their' },
    ]},
    { topic: "Possessive 's drill", tipo: 'opcion', preguntas: [
      { pregunta: 'the bag of Maria', opciones: ["Maria's bag", "Maria bag's", "The bag Maria's"], correcta: "Maria's bag" },
      { pregunta: 'the phone of my brother', opciones: ["my brother's phone", "my brother phone's", "the phone my brother's"], correcta: "my brother's phone" },
    ]},
    { topic: 'Articles drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I have ___ umbrella.', opciones: ['a', 'an', 'the'], correcta: 'an' },
      { pregunta: 'She has ___ notebook.', opciones: ['a', 'an', 'the'], correcta: 'a' },
      { pregunta: '___ teacher is nice.', opciones: ['A', 'An', 'The'], correcta: 'The' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Family matching', pares: [
      { a: 'mother', b: 'female parent' }, { a: 'uncle', b: "father's or mother's brother" }, { a: 'cousin', b: "aunt/uncle's child" },
    ]},
    { topic: 'Colors & objects matching', pares: [
      { a: 'sky', b: 'blue' }, { a: 'grass', b: 'green' }, { a: 'banana', b: 'yellow' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: "What is the mother's name?", opciones: ['Rosa', 'Juan', 'Carla'], correcta: 'Rosa' },
      { pregunta: 'How many sisters does the speaker have?', opciones: ['one', 'two', 'three'], correcta: 'two' },
      { pregunta: 'Who lives with the family?', opciones: ['grandmother', 'grandfather', 'uncle'], correcta: 'grandmother' },
    ],
  },
};

export const PRACTICA_U3 = {
  grammarPractice: [
    { topic: 'There is/are drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ a bathroom upstairs.', opciones: ['There is', 'There are'], correcta: 'There is' },
      { pregunta: '___ two windows in my room.', opciones: ['There is', 'There are'], correcta: 'There are' },
      { pregunta: '___ a park near school.', opciones: ['There is', 'There are'], correcta: 'There is' },
    ]},
    { topic: 'Plurals drill', tipo: 'opcion', preguntas: [
      { pregunta: 'house', opciones: ['houses', "house's", 'housees'], correcta: 'houses' },
      { pregunta: 'bus', opciones: ['buses', "bus's", 'busses'], correcta: 'buses' },
      { pregunta: 'chair', opciones: ['chairs', 'chaires', "chair's"], correcta: 'chairs' },
      { pregunta: 'box', opciones: ['boxes', 'boxs', "box's"], correcta: 'boxes' },
    ]},
    { topic: 'Demonstratives drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ (near) is my bed.', opciones: ['This', 'That', 'These', 'Those'], correcta: 'This' },
      { pregunta: '___ (far) are their houses.', opciones: ['This', 'That', 'These', 'Those'], correcta: 'Those' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Rooms matching', pares: [
      { a: 'bedroom', b: 'bed' }, { a: 'kitchen', b: 'fridge' }, { a: 'living room', b: 'sofa' },
    ]},
    { topic: 'Places in town matching', pares: [
      { a: 'hospital', b: 'see a doctor' }, { a: 'supermarket', b: 'buy food' }, { a: 'bank', b: 'save money' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: 'How many bedrooms are there?', opciones: ['one', 'two', 'three'], correcta: 'two' },
      { pregunta: 'What is in the garden?', opciones: ['flowers', 'trees', 'a pool'], correcta: 'flowers' },
      { pregunta: 'What is next to the living room?', opciones: ['the kitchen', 'the bathroom', 'the garage'], correcta: 'the kitchen' },
    ],
  },
};

export const PRACTICA_U4 = {
  grammarPractice: [
    { topic: 'Present simple affirmative drill', tipo: 'opcion', preguntas: [
      { pregunta: 'He ___ (wake up) at 7.', opciones: ['wakes up', 'wake up', 'waking up'], correcta: 'wakes up' },
      { pregunta: 'They ___ (have) dinner at 8.', opciones: ['have', 'has', 'having'], correcta: 'have' },
    ]},
    { topic: 'Negatives & questions drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I work on Sundays. (negative)', opciones: ["I don't work on Sundays.", 'I not work on Sundays.', "I doesn't work on Sundays."], correcta: "I don't work on Sundays." },
      { pregunta: 'She goes to school. (question)', opciones: ['Does she go to school?', 'Do she goes to school?', 'Is she go to school?'], correcta: 'Does she go to school?' },
    ]},
    { topic: 'Adverbs of frequency drill', tipo: 'orden', preguntas: [
      { piezas: ['I', 'always', 'breakfast', 'have'], correcta: 'I always have breakfast' },
      { piezas: ['She', 'never', 'late', 'is'], correcta: 'She is never late' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Routine verbs matching', pares: [
      { a: 'wake up', b: 'stop sleeping' }, { a: 'brush teeth', b: 'clean teeth' }, { a: 'have lunch', b: 'eat at midday' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: 'What time does the speaker wake up?', opciones: ['6:30', '7:00', '8:00'], correcta: '6:30' },
      { pregunta: 'Where does the speaker eat lunch?', opciones: ['Not at home', 'At home', 'At school'], correcta: 'Not at home' },
      { pregunta: 'What time does the speaker come home?', opciones: ['7 pm', '6 pm', '8 pm'], correcta: '7 pm' },
    ],
  },
};

export const PRACTICA_U5 = {
  grammarPractice: [
    { topic: 'Present continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She ___ (read) a book.', opciones: ['is reading', 'are reading', 'reads'], correcta: 'is reading' },
      { pregunta: 'They ___ (dance) now.', opciones: ['are dancing', 'is dancing', 'dances'], correcta: 'are dancing' },
    ]},
    { topic: 'Imperatives drill', tipo: 'opcion', preguntas: [
      { pregunta: '(open) the door', opciones: ['Open the door.', 'Opens the door.', 'Opening the door.'], correcta: 'Open the door.' },
      { pregunta: '(not run) in class', opciones: ["Don't run in class.", 'Not run in class.', "Doesn't run in class."], correcta: "Don't run in class." },
    ]},
    { topic: 'Negation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I like rain.', opciones: ["I don't like rain.", 'I not like rain.', "I doesn't like rain."], correcta: "I don't like rain." },
      { pregunta: 'She eats meat.', opciones: ["She doesn't eat meat.", "She don't eat meat.", 'She not eats meat.'], correcta: "She doesn't eat meat." },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Clothes matching', pares: [
      { a: 'sweater', b: 'cold' }, { a: 'shorts', b: 'hot' }, { a: 'umbrella', b: 'rainy' },
    ]},
    { topic: 'Weather matching', pares: [
      { a: 'sunny', b: 'sun icon' }, { a: 'rainy', b: 'cloud with rain' }, { a: 'snowy', b: 'snowflake' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: "What's the weather like?", opciones: ['sunny', 'rainy', 'cloudy'], correcta: 'sunny' },
      { pregunta: 'What is the mother doing?', opciones: ['cooking lunch', 'reading the newspaper', 'playing outside'], correcta: 'cooking lunch' },
      { pregunta: 'What is the speaker doing?', opciones: ['writing homework', 'cooking lunch', 'reading the newspaper'], correcta: 'writing homework' },
    ],
  },
};

export const PRACTICA_U6 = {
  grammarPractice: [
    { topic: 'WH-questions drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ do you live?', opciones: ['Where', 'What', 'Why', 'When'], correcta: 'Where' },
      { pregunta: '___ is your name?', opciones: ['Where', 'What', 'Why', 'When'], correcta: 'What' },
      { pregunta: '___ do you like reading?', opciones: ['Where', 'What', 'Why', 'When'], correcta: 'Why' },
    ]},
    { topic: 'Yes/no questions drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She plays tennis.', opciones: ['Does she play tennis?', 'Do she play tennis?', 'Is she play tennis?'], correcta: 'Does she play tennis?' },
      { pregunta: 'They like soccer.', opciones: ['Do they like soccer?', 'Does they like soccer?', 'Are they like soccer?'], correcta: 'Do they like soccer?' },
    ]},
    { topic: "Can/can't drill", tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ swim well. (ability)', opciones: ['can', "can't"], correcta: 'can' },
      { pregunta: 'She ___ cook. (no ability)', opciones: ['can', "can't"], correcta: "can't" },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Hobbies matching', pares: [
      { a: 'photography', b: 'camera' }, { a: 'painting', b: 'brush' }, { a: 'gardening', b: 'plants' },
    ]},
    { topic: 'Jobs matching', pares: [
      { a: 'doctor', b: 'hospital' }, { a: 'teacher', b: 'school' }, { a: 'chef', b: 'restaurant' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: "What's the speaker's job?", opciones: ['nurse', 'teacher', 'doctor'], correcta: 'nurse' },
      { pregunta: 'What hobbies does the speaker have?', opciones: ['volleyball and cooking', 'photography and dancing', 'swimming and painting'], correcta: 'volleyball and cooking' },
      { pregunta: 'Can the speaker sing well?', opciones: ['No', 'Yes', 'A little'], correcta: 'No' },
    ],
  },
};

export const PRACTICA_U7 = {
  grammarPractice: [
    { topic: 'Adjectives drill', tipo: 'opcion', preguntas: [
      { pregunta: 'a ___ restaurant', opciones: ['expensive', 'cheap', 'small'], correcta: 'expensive' },
      { pregunta: 'a ___ soup', opciones: ['spicy', 'sweet', 'cold'], correcta: 'spicy' },
    ]},
    { topic: 'Comparatives drill', tipo: 'opcion', preguntas: [
      { pregunta: 'cheap', opciones: ['cheaper', 'cheapper', 'more cheap'], correcta: 'cheaper' },
      { pregunta: 'big', opciones: ['bigger', 'biger', 'more big'], correcta: 'bigger' },
      { pregunta: 'fast', opciones: ['faster', 'fastter', 'more fast'], correcta: 'faster' },
    ]},
    { topic: 'Like+-ing vs would like to drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (like/eating) Italian food in general.', opciones: ['like eating', 'would like to eat', 'liking eat'], correcta: 'like eating' },
      { pregunta: 'I ___ (would like/order) a pizza now.', opciones: ['would like to order', 'like ordering', 'would liking order'], correcta: 'would like to order' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Food matching', pares: [
      { a: 'rice', b: 'carbohydrate' }, { a: 'chicken', b: 'protein' }, { a: 'salad', b: 'vegetables' },
    ]},
    { topic: 'Shopping matching', pares: [
      { a: 'discount', b: 'lower price' }, { a: 'receipt', b: 'proof of purchase' }, { a: 'cash', b: 'paper money' },
    ]},
  ],
  listening: {
    preguntas: [
      { pregunta: 'What does the customer order?', opciones: ['fish with vegetables', 'chicken with rice', 'salad'], correcta: 'fish with vegetables' },
      { pregunta: 'Is the fish cheaper or more expensive than the chicken?', opciones: ['cheaper', 'more expensive', 'the same price'], correcta: 'cheaper' },
    ],
  },
};
