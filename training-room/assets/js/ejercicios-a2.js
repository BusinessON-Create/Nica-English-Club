// ejercicios-a2.js — Práctica de Nivel A2 (9 unidades) convertida a juegos.
// Mismo criterio que A1: se completaron las respuestas que el JSON original
// no traía (sobre todo las preguntas de listening). Revísalas.

export const PRACTICA_A2_U1 = {
  grammarPractice: [
    { topic: 'Regular past drill', tipo: 'opcion', preguntas: [
      { pregunta: 'walk', opciones: ['walked', 'walkked', 'walk'], correcta: 'walked' },
      { pregunta: 'visit', opciones: ['visited', 'visitted', 'visit'], correcta: 'visited' },
      { pregunta: 'play', opciones: ['played', 'plaied', 'play'], correcta: 'played' },
      { pregunta: 'watch', opciones: ['watched', 'watchd', 'watch'], correcta: 'watched' },
    ]},
    { topic: 'Irregular past drill', tipo: 'opcion', preguntas: [
      { pregunta: 'go', opciones: ['went', 'goed', 'gone'], correcta: 'went' },
      { pregunta: 'see', opciones: ['saw', 'seed', 'seen'], correcta: 'saw' },
      { pregunta: 'eat', opciones: ['ate', 'eated', 'eaten'], correcta: 'ate' },
      { pregunta: 'buy', opciones: ['bought', 'buyed', 'buied'], correcta: 'bought' },
    ]},
    { topic: 'Was/were drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ at home.', opciones: ['was', 'were'], correcta: 'was' },
      { pregunta: 'They ___ happy.', opciones: ['was', 'were'], correcta: 'were' },
      { pregunta: '___ you at the party?', opciones: ['Was', 'Were'], correcta: 'Were' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Travel matching', pares: [
      { a: 'airport', b: 'where you catch a flight' }, { a: 'passport', b: 'travel document' }, { a: 'luggage', b: 'your bags' },
    ]},
    { topic: 'Irregular verbs matching', pares: [
      { a: 'go', b: 'went' }, { a: 'buy', b: 'bought' }, { a: 'take', b: 'took' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'Where did the speaker go last summer?', opciones: ['Granada', 'Managua', 'León'], correcta: 'Granada' },
    { pregunta: 'Who did the speaker travel with?', opciones: ['their family', 'their friends', 'alone'], correcta: 'their family' },
    { pregunta: 'What did they buy?', opciones: ['souvenirs', 'food', 'clothes'], correcta: 'souvenirs' },
  ]},
};

export const PRACTICA_A2_U2 = {
  grammarPractice: [
    { topic: 'Past continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I (cook) dinner.', opciones: ['was cooking', 'cooked', 'cooking'], correcta: 'was cooking' },
      { pregunta: 'They (play) soccer.', opciones: ['were playing', 'played', 'playing'], correcta: 'were playing' },
    ]},
    { topic: 'Time clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I was sleeping ___ the alarm rang.', opciones: ['when', 'while', 'during'], correcta: 'when' },
      { pregunta: '___ I was studying, my sister was watching TV.', opciones: ['While', 'When', 'During'], correcta: 'While' },
    ]},
    { topic: 'Past continuous vs past simple drill', tipo: 'opcion', preguntas: [
      { pregunta: 'While I (walk), I (see) an accident.', opciones: ['was walking, saw', 'walked, was seeing', 'was walking, was seeing'], correcta: 'was walking, saw' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Emotions matching', pares: [
      { a: 'surprised', b: 'unexpected reaction' }, { a: 'embarrassed', b: 'feeling shy after a mistake' }, { a: 'relieved', b: 'feeling better after worry' },
    ]},
    { topic: 'Time connectors matching', pares: [
      { a: 'suddenly', b: 'without warning' }, { a: 'meanwhile', b: 'at the same time' }, { a: 'later', b: 'after some time' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What was the speaker doing?', opciones: ['watching TV', 'cooking dinner', 'sleeping'], correcta: 'watching TV' },
    { pregunta: 'What happened suddenly?', opciones: ['The lights went out', 'It started raining', 'The phone rang'], correcta: 'The lights went out' },
    { pregunta: 'How did the speaker feel?', opciones: ['scared', 'happy', 'bored'], correcta: 'scared' },
  ]},
};

export const PRACTICA_A2_U3 = {
  grammarPractice: [
    { topic: 'Will drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I think it ___ (rain) tomorrow.', opciones: ['will rain', 'rains', 'is raining'], correcta: 'will rain' },
      { pregunta: 'She ___ (help) you.', opciones: ['will help', 'helps', 'is helping'], correcta: 'will help' },
    ]},
    { topic: 'Be going to drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She ___ (study) medicine.', opciones: ['is going to study', 'will study', 'studies'], correcta: 'is going to study' },
      { pregunta: 'We ___ (travel) next year.', opciones: ['are going to travel', 'will travel', 'travel'], correcta: 'are going to travel' },
    ]},
    { topic: 'Present continuous for future drill', tipo: 'opcion', preguntas: [
      { pregunta: 'We ___ (meet) at 5pm tomorrow.', opciones: ['are meeting', 'will meet', 'meet'], correcta: 'are meeting' },
      { pregunta: 'I ___ (fly) to Managua on Friday.', opciones: ['am flying', 'will fly', 'fly'], correcta: 'am flying' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Work vocabulary matching', pares: [
      { a: 'boss', b: 'person in charge' }, { a: 'colleague', b: 'someone you work with' }, { a: 'deadline', b: 'due date' },
    ]},
    { topic: 'Future expressions matching', pares: [
      { a: 'someday', b: 'at an unspecified future time' }, { a: 'soon', b: 'in the near future' }, { a: 'eventually', b: 'finally after a while' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When is the speaker graduating?', opciones: ['next year', 'this year', 'in two years'], correcta: 'next year' },
    { pregunta: 'What job does the speaker want?', opciones: ['a job in a hospital', 'a job in a school', 'a job in a bank'], correcta: 'a job in a hospital' },
    { pregunta: 'What does the speaker hope to become?', opciones: ['a nurse', 'a doctor', 'a teacher'], correcta: 'a nurse' },
  ]},
};

export const PRACTICA_A2_U4 = {
  grammarPractice: [
    { topic: 'Zero conditional drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If you heat water, it ___ (boil).', opciones: ['boils', 'boil', 'boiled'], correcta: 'boils' },
      { pregunta: 'If it ___ (rain), the ground gets wet.', opciones: ['rains', 'rain', 'rained'], correcta: 'rains' },
    ]},
    { topic: 'First conditional drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If it rains, I ___ (stay) home.', opciones: ['will stay', 'stay', 'stayed'], correcta: 'will stay' },
      { pregunta: 'If you study, you ___ (pass).', opciones: ['will pass', 'pass', 'passed'], correcta: 'will pass' },
    ]},
    { topic: 'Zero vs First comparison drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If ice ___ (get) warm, it melts.', opciones: ['gets', 'get', 'will get'], correcta: 'gets' },
      { pregunta: "If I ___ (feel) sick tomorrow, I'll stay home.", opciones: ['feel', 'feels', 'will feel'], correcta: 'feel' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Weather matching', pares: [
      { a: 'drought', b: 'lack of rain' }, { a: 'flood', b: 'too much water' }, { a: 'heatwave', b: 'period of extreme heat' },
    ]},
    { topic: 'Health matching', pares: [
      { a: 'fever', b: 'high body temperature' }, { a: 'cough', b: 'reflex to clear the throat' }, { a: 'symptoms', b: 'signs of illness' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: "What's the weather forecast for tomorrow?", opciones: ['Hot with a thunderstorm', 'Cold and rainy', 'Sunny all day'], correcta: 'Hot with a thunderstorm' },
    { pregunta: 'What advice is given?', opciones: ['Bring water and stay hydrated', 'Wear a jacket', 'Stay indoors'], correcta: 'Bring water and stay hydrated' },
  ]},
};

export const PRACTICA_A2_U5 = {
  grammarPractice: [
    { topic: 'Ability/possibility drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She ___ speak French.', opciones: ['can', 'must', 'should'], correcta: 'can' },
      { pregunta: 'It ___ rain tomorrow.', opciones: ['might', 'must', 'can'], correcta: 'might' },
    ]},
    { topic: 'Obligation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'You ___ wear a helmet. (obligatory)', opciones: ['must', 'might', 'could'], correcta: 'must' },
      { pregunta: 'You ___ come. (not necessary)', opciones: ["don't have to", 'must not', 'should not'], correcta: "don't have to" },
    ]},
    { topic: 'Advice drill', tipo: 'opcion', preguntas: [
      { pregunta: 'You ___ drink more water.', opciones: ['should', 'must', 'can'], correcta: 'should' },
      { pregunta: 'You ___ skip meals.', opciones: ["shouldn't", "don't have to", "can't"], correcta: "shouldn't" },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Rules matching', pares: [
      { a: 'forbidden', b: 'not allowed' }, { a: 'mandatory', b: 'required' }, { a: 'optional', b: 'not required' },
    ]},
    { topic: 'Health advice matching', pares: [
      { a: 'headache', b: 'get some rest' }, { a: 'stress', b: 'avoid stress, exercise' }, { a: 'cold', b: 'drink water, take medicine' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the doctor recommend?', opciones: ['Rest and drink water', 'Take antibiotics', 'Go to the hospital'], correcta: 'Rest and drink water' },
    { pregunta: 'Does the patient have to take antibiotics?', opciones: ['No', 'Yes', 'Maybe'], correcta: 'No' },
    { pregunta: 'What must the patient avoid?', opciones: ['Cold drinks', 'Exercise', 'Sleeping'], correcta: 'Cold drinks' },
  ]},
};

export const PRACTICA_A2_U6 = {
  grammarPractice: [
    { topic: 'Irregular comparatives drill', tipo: 'opcion', preguntas: [
      { pregunta: "What's the comparative of 'good'?", opciones: ['better', 'gooder', 'more good'], correcta: 'better' },
      { pregunta: "What's the comparative of 'bad'?", opciones: ['worse', 'badder', 'more bad'], correcta: 'worse' },
    ]},
    { topic: 'Superlatives drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This is ___ (fast) phone.', opciones: ['the fastest', 'the most fast', 'fastest'], correcta: 'the fastest' },
      { pregunta: "It's ___ (expensive) ticket.", opciones: ['the most expensive', 'the expensivest', 'most expensive'], correcta: 'the most expensive' },
    ]},
    { topic: 'Too/enough drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This is ___ expensive for me.', opciones: ['too', 'enough', 'very'], correcta: 'too' },
      { pregunta: "It's fast ___ for daily use.", opciones: ['enough', 'too', 'very'], correcta: 'enough' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Entertainment matching', pares: [
      { a: 'performance', b: 'a live show' }, { a: 'ticket', b: 'entry pass' }, { a: 'festival', b: 'celebration event' },
    ]},
    { topic: 'Sports matching', pares: [
      { a: 'coach', b: 'person who trains a team' }, { a: 'score', b: 'the points in a game' }, { a: 'championship', b: 'final competition' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'Which team has the best players?', opciones: ['This team', 'The other team', 'Both teams'], correcta: 'This team' },
    { pregunta: 'What is the other team better at?', opciones: ['Being faster', 'Having better players', 'Scoring more'], correcta: 'Being faster' },
  ]},
};

export const PRACTICA_A2_U7 = {
  grammarPractice: [
    { topic: 'Countable/uncountable drill', tipo: 'opcion', preguntas: [
      { pregunta: 'rice', opciones: ['Countable', 'Uncountable'], correcta: 'Uncountable' },
      { pregunta: 'apple', opciones: ['Countable', 'Uncountable'], correcta: 'Countable' },
      { pregunta: 'water', opciones: ['Countable', 'Uncountable'], correcta: 'Uncountable' },
      { pregunta: 'egg', opciones: ['Countable', 'Uncountable'], correcta: 'Countable' },
    ]},
    { topic: 'Some/any drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I have ___ bread.', opciones: ['some', 'any'], correcta: 'some' },
      { pregunta: "I don't have ___ milk.", opciones: ['some', 'any'], correcta: 'any' },
      { pregunta: 'Do you have ___ sugar?', opciones: ['some', 'any'], correcta: 'any' },
    ]},
    { topic: 'Much/many drill', tipo: 'opcion', preguntas: [
      { pregunta: 'How ___ money do you have?', opciones: ['much', 'many'], correcta: 'much' },
      { pregunta: 'How ___ apples are there?', opciones: ['much', 'many'], correcta: 'many' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Quantities matching', pares: [
      { a: 'a bag of', b: 'rice' }, { a: 'a bottle of', b: 'water' }, { a: 'a carton of', b: 'milk' },
    ]},
    { topic: 'Shopping matching', pares: [
      { a: 'discount', b: 'lower price' }, { a: 'receipt', b: 'proof of purchase' }, { a: 'cash', b: 'paper money' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did the speaker buy?', opciones: ['Rice, water and apples', 'Bread and milk', 'Meat and vegetables'], correcta: 'Rice, water and apples' },
    { pregunta: 'How did the speaker pay?', opciones: ['Credit card', 'Cash', 'Check'], correcta: 'Credit card' },
  ]},
};

export const PRACTICA_A2_U8 = {
  grammarPractice: [
    { topic: 'Indefinite pronouns drill', tipo: 'opcion', preguntas: [
      { pregunta: "There's ___ at the door. (someone/anyone)", opciones: ['someone', 'anyone', 'everyone'], correcta: 'someone' },
      { pregunta: "I don't have ___ to say.", opciones: ['anything', 'something', 'nothing'], correcta: 'anything' },
    ]},
    { topic: 'Adverbs of manner drill', tipo: 'opcion', preguntas: [
      { pregunta: 'quiet', opciones: ['quietly', 'quietley', 'quiet'], correcta: 'quietly' },
      { pregunta: 'careful', opciones: ['carefully', 'carefuly', 'careful'], correcta: 'carefully' },
      { pregunta: 'easy', opciones: ['easily', 'easyly', 'easy'], correcta: 'easily' },
    ]},
    { topic: 'Prepositions of movement drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Walk ___ the park.', opciones: ['through', 'across', 'into'], correcta: 'through' },
      { pregunta: 'Go ___ the bridge.', opciones: ['across', 'through', 'into'], correcta: 'across' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Transportation matching', pares: [
      { a: 'fare', b: 'the cost of a ride' }, { a: 'route', b: 'the path you take' }, { a: 'station', b: 'where you catch transportation' },
    ]},
    { topic: 'Indefinite pronouns matching', pares: [
      { a: 'everyone', b: 'all people' }, { a: 'nothing', b: 'not a single thing' }, { a: 'somewhere', b: 'an unspecified place' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What places did the speaker walk through?', opciones: ['The park and the bridge', 'The street and the station', 'The mall and the park'], correcta: 'The park and the bridge' },
    { pregunta: 'Why did the speaker walk quickly?', opciones: ['The train was leaving soon', 'It was raining', 'It was getting dark'], correcta: 'The train was leaving soon' },
  ]},
};

export const PRACTICA_A2_U9 = {
  grammarPractice: [
    { topic: 'Present perfect drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (visit) Mexico.', opciones: ['have visited', 'visited', 'visit'], correcta: 'have visited' },
      { pregunta: 'She ___ (never/try) sushi.', opciones: ['has never tried', 'never tried', "doesn't try"], correcta: 'has never tried' },
    ]},
    { topic: 'Relative clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The woman ___ called is my mother.', opciones: ['who', 'which', 'whose'], correcta: 'who' },
      { pregunta: 'The car ___ I bought is red.', opciones: ['that', 'who', 'whose'], correcta: 'that' },
    ]},
    { topic: 'Passive voice drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Someone repaired the car.', opciones: ['The car was repaired.', 'The car repaired.', 'The car is repaired.'], correcta: 'The car was repaired.' },
      { pregunta: 'They use this app a lot.', opciones: ['This app is used a lot.', 'This app uses a lot.', 'This app was used a lot.'], correcta: 'This app is used a lot.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Life experiences matching', pares: [
      { a: 'travel abroad', b: 'Where did you go?' }, { a: 'win a prize', b: 'What did you win?' },
    ]},
    { topic: 'Services matching', pares: [
      { a: 'repair a car', b: 'mechanic' }, { a: 'fix a leak', b: 'plumber' }, { a: 'cut hair', b: 'hairdresser' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'How many countries has the speaker traveled to?', opciones: ['three', 'two', 'five'], correcta: 'three' },
    { pregunta: 'Has the speaker been to Europe?', opciones: ['No', 'Yes', 'Not sure'], correcta: 'No' },
  ]},
};
