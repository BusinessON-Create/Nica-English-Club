// ejercicios-b1.js — Práctica de Nivel B1 (11 unidades) convertida a juegos.
// Mismo criterio que A1/A2: se completaron las preguntas de listening (sin
// respuesta en el JSON original) y se convirtieron los drills con "=" o sin
// flecha en opción múltiple. Revísalas.

export const PRACTICA_B1_U1 = {
  grammarPractice: [
    { topic: 'Present perfect drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (never/try) sushi.', opciones: ['have never tried', 'never tried', "didn't try"], correcta: 'have never tried' },
      { pregunta: 'She ___ (just/finish) her thesis.', opciones: ['has just finished', 'just finished', 'finishes'], correcta: 'has just finished' },
    ]},
    { topic: 'Past simple review drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She ___ (graduate) in 2019.', opciones: ['graduated', 'has graduated', 'graduate'], correcta: 'graduated' },
      { pregunta: 'They ___ (found) the company in 2010.', opciones: ['founded', 'have founded', 'found'], correcta: 'founded' },
    ]},
    { topic: 'Choosing correctly drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (live) in Managua for 5 years.', opciones: ['have lived', 'lived', 'live'], correcta: 'have lived' },
      { pregunta: 'I ___ (live) in León in 2015.', opciones: ['lived', 'have lived', 'live'], correcta: 'lived' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Achievements matching', pares: [
      { a: 'graduate', b: 'finish your studies' }, { a: 'publish', b: 'make a book/article public' }, { a: 'launch', b: 'start a new product/business' },
    ]},
    { topic: 'Higher education matching', pares: [
      { a: 'thesis', b: 'final research paper' }, { a: 'internship', b: 'temporary work experience for training' }, { a: 'tuition', b: 'cost of studying' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When did the speaker graduate?', opciones: ['2015', '2010', '2020'], correcta: '2015' },
    { pregunta: 'What happened last year?', opciones: ['They were promoted to manager', 'They graduated', 'They got their first job'], correcta: 'They were promoted to manager' },
  ]},
};

export const PRACTICA_B1_U2 = {
  grammarPractice: [
    { topic: 'Present perfect continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (study) for two hours.', opciones: ['have been studying', 'studied', 'study'], correcta: 'have been studying' },
      { pregunta: 'She ___ (work) here since 2018.', opciones: ['has been working', 'worked', 'works'], correcta: 'has been working' },
    ]},
    { topic: 'Duration expressions drill', tipo: 'opcion', preguntas: [
      { pregunta: "I've lived here ___ 2015.", opciones: ['since', 'for'], correcta: 'since' },
      { pregunta: "She's been studying ___ three years.", opciones: ['for', 'since'], correcta: 'for' },
    ]},
    { topic: 'Simple vs continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (write) three emails this morning.', opciones: ['have written', 'have been writing'], correcta: 'have written' },
      { pregunta: 'I ___ (write) emails all morning.', opciones: ['have been writing', 'have written'], correcta: 'have been writing' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Health habits matching', pares: [
      { a: 'wellness', b: 'a state of being healthy' }, { a: 'fitness', b: 'physical condition' }, { a: 'balance', b: 'equilibrium in life' },
    ]},
    { topic: 'Skill-building matching', pares: [
      { a: 'master', b: 'become an expert at' }, { a: 'consistency', b: 'doing something regularly' }, { a: 'dedication', b: 'strong commitment' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'How long has the speaker been exercising?', opciones: ['Two months', 'Two years', 'Two weeks'], correcta: 'Two months' },
    { pregunta: 'What has the speaker noticed?', opciones: ['A big improvement in energy', 'Weight loss', 'Better sleep'], correcta: 'A big improvement in energy' },
  ]},
};

export const PRACTICA_B1_U3 = {
  grammarPractice: [
    { topic: 'Past perfect formation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (finish) my homework before dinner.', opciones: ['had finished', 'finished', 'have finished'], correcta: 'had finished' },
      { pregunta: 'She ___ (leave) before I arrived.', opciones: ['had left', 'left', 'has left'], correcta: 'had left' },
    ]},
    { topic: 'Before/after/by the time drill', tipo: 'opcion', preguntas: [
      { pregunta: 'By the time I arrived, the movie ___ (start).', opciones: ['had started', 'started', 'starts'], correcta: 'had started' },
      { pregunta: 'After she ___ (eat), she went to bed.', opciones: ['had eaten', 'ate', 'eats'], correcta: 'had eaten' },
    ]},
    { topic: 'Past perfect vs past simple drill', tipo: 'opcion', preguntas: [
      { pregunta: 'When I ___ (arrive), she ___ (already/leave).', opciones: ['arrived, had already left', 'had arrived, left', 'arrived, left'], correcta: 'arrived, had already left' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Regret vocabulary matching', pares: [
      { a: 'regret', b: 'feel sorry about something' }, { a: 'hindsight', b: 'understanding after the event' }, { a: 'missed opportunity', b: "a chance you didn't take" },
    ]},
    { topic: 'Cause-effect matching', pares: [
      { a: 'because of', b: 'gives a reason' }, { a: 'as a result', b: 'shows a consequence' }, { a: 'therefore', b: 'introduces a conclusion' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What had already happened when the speaker got home?', opciones: ['The family had eaten dinner', 'The family had gone out', 'The family had gone to sleep'], correcta: 'The family had eaten dinner' },
    { pregunta: 'What had the speaker forgotten to do?', opciones: ['Tell them he was coming late', 'Buy groceries', 'Call his family'], correcta: 'Tell them he was coming late' },
  ]},
};

export const PRACTICA_B1_U4 = {
  grammarPractice: [
    { topic: 'Identify stative/dynamic drill', tipo: 'opcion', preguntas: [
      { pregunta: 'know', opciones: ['Stative', 'Dynamic'], correcta: 'Stative' },
      { pregunta: 'run', opciones: ['Stative', 'Dynamic'], correcta: 'Dynamic' },
      { pregunta: 'believe', opciones: ['Stative', 'Dynamic'], correcta: 'Stative' },
      { pregunta: 'cook', opciones: ['Stative', 'Dynamic'], correcta: 'Dynamic' },
    ]},
    { topic: 'Double meaning verbs drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (have) a car.', opciones: ['have', 'am having'], correcta: 'have' },
      { pregunta: 'I ___ (have) lunch right now.', opciones: ['am having', 'have'], correcta: 'am having' },
    ]},
    { topic: 'Error correction drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I am wanting to go.', opciones: ['I want to go.', 'I am wanting to go.', 'I wants to go.'], correcta: 'I want to go.' },
      { pregunta: 'She is understanding the lesson.', opciones: ['She understands the lesson.', 'She is understanding the lesson.', 'She understand the lesson.'], correcta: 'She understands the lesson.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Perception verbs matching', pares: [
      { a: 'see', b: 'eyes' }, { a: 'hear', b: 'ears' }, { a: 'smell', b: 'nose' }, { a: 'taste', b: 'tongue' },
    ]},
    { topic: 'Emotion verbs matching', pares: [
      { a: 'adore', b: 'stronger than like' }, { a: 'dislike', b: 'weaker than hate' }, { a: 'prefer', b: 'comparing two things' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What mistake did the speaker make?', opciones: ["Said 'I am understanding'", 'Used wrong tense', 'Forgot a word'], correcta: "Said 'I am understanding'" },
    { pregunta: 'What did the speaker learn?', opciones: ["Stative verbs don't use the continuous form", 'To speak faster', 'New vocabulary'], correcta: "Stative verbs don't use the continuous form" },
  ]},
};

export const PRACTICA_B1_U5 = {
  grammarPractice: [
    { topic: 'Present/past passive drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The product ___ (make) in Nicaragua.', opciones: ['is made', 'was made', 'makes'], correcta: 'is made' },
      { pregunta: 'The bridge ___ (build) in 1990.', opciones: ['was built', 'is built', 'built'], correcta: 'was built' },
    ]},
    { topic: 'Passive with modals drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This ___ (can/solve) easily.', opciones: ['can be solved', 'can solve', 'is solved'], correcta: 'can be solved' },
      { pregunta: 'The report ___ (must/finish) today.', opciones: ['must be finished', 'must finish', 'is finished'], correcta: 'must be finished' },
    ]},
    { topic: 'Passive across tenses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'They are building the house.', opciones: ['The house is being built.', 'The house was built.', 'The house has been built.'], correcta: 'The house is being built.' },
      { pregunta: 'They have published the results.', opciones: ['The results have been published.', 'The results were published.', 'The results are published.'], correcta: 'The results have been published.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'News & media matching', pares: [
      { a: 'headline', b: 'title of a news article' }, { a: 'broadcast', b: 'transmit on TV/radio' }, { a: 'source', b: 'origin of information' },
    ]},
    { topic: 'Production matching', pares: [
      { a: 'assemble', b: 'put parts together' }, { a: 'distribute', b: 'send to different places' }, { a: 'manufacture', b: 'produce on a large scale' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When was the phone designed?', opciones: ['2021', '2018', '2023'], correcta: '2021' },
    { pregunta: 'What has happened since it was released?', opciones: ['Millions of units have been sold', 'It was redesigned', 'Prices dropped'], correcta: 'Millions of units have been sold' },
  ]},
};

export const PRACTICA_B1_U6 = {
  grammarPractice: [
    { topic: 'Reported statements drill', tipo: 'opcion', preguntas: [
      { pregunta: "'I am tired,' she said.", opciones: ['She said she was tired.', 'She said she is tired.', 'She said she were tired.'], correcta: 'She said she was tired.' },
      { pregunta: "'I like coffee,' he said.", opciones: ['He said he liked coffee.', 'He said he likes coffee.', 'He said he like coffee.'], correcta: 'He said he liked coffee.' },
    ]},
    { topic: 'Reported questions drill', tipo: 'opcion', preguntas: [
      { pregunta: "'Where do you live?'", opciones: ['She asked where I lived.', 'She asked where do I live.', 'She asked where I live.'], correcta: 'She asked where I lived.' },
      { pregunta: "'Do you like it?'", opciones: ['He asked if I liked it.', 'He asked do I like it.', 'He asked if I like it.'], correcta: 'He asked if I liked it.' },
    ]},
    { topic: 'Reported commands drill', tipo: 'opcion', preguntas: [
      { pregunta: "'Close the door,' she said.", opciones: ['She told me to close the door.', 'She said close the door.', 'She told me close the door.'], correcta: 'She told me to close the door.' },
      { pregunta: "'Don't be late,' he said.", opciones: ['He told me not to be late.', 'He told me to not late.', 'He said not be late.'], correcta: 'He told me not to be late.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Reporting verbs matching', pares: [
      { a: 'admit', b: 'agree something is true (often negative)' }, { a: 'deny', b: 'say something is not true' }, { a: 'warn', b: 'tell someone about danger' },
    ]},
    { topic: 'Conflict vocabulary matching', pares: [
      { a: 'compromise', b: 'reach a middle agreement' }, { a: 'dispute', b: 'a disagreement/conflict' }, { a: 'clarify', b: 'make something clearer' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did the manager say about the project?', opciones: ['It was behind schedule', 'It was finished', 'It was cancelled'], correcta: 'It was behind schedule' },
    { pregunta: 'What did she tell the team to do?', opciones: ['Send a report by Friday', 'Work on the weekend', 'Hire more people'], correcta: 'Send a report by Friday' },
  ]},
};

export const PRACTICA_B1_U7 = {
  grammarPractice: [
    { topic: 'Defining relative clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The man ___ called is my uncle.', opciones: ['who', 'which', 'whose'], correcta: 'who' },
      { pregunta: 'The book ___ I bought is great.', opciones: ['that', 'who', 'whose'], correcta: 'that' },
    ]},
    { topic: 'Non-defining relative clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'My brother who lives in Spain called me.', opciones: ['My brother, who lives in Spain, called me.', 'My brother who lives in Spain called me.', 'My brother, that lives in Spain, called me.'], correcta: 'My brother, who lives in Spain, called me.' },
    ]},
    { topic: 'Relative pronouns drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The woman ___ car was stolen is my neighbor.', opciones: ['whose', 'who', 'which'], correcta: 'whose' },
      { pregunta: 'The restaurant ___ we ate was great.', opciones: ['where', 'which', 'whose'], correcta: 'where' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Describing people matching', pares: [
      { a: 'reputation', b: 'what people think of someone' }, { a: 'trait', b: 'a quality of personality' }, { a: 'background', b: "someone's personal history" },
    ]},
    { topic: 'Describing places matching', pares: [
      { a: 'landmark', b: 'a well-known place/object' }, { a: 'atmosphere', b: 'the feeling of a place' }, { a: 'destination', b: 'where you are traveling to' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: "What is the friend's profession?", opciones: ['doctor', 'teacher', 'lawyer'], correcta: 'doctor' },
    { pregunta: 'Where does the friend work?', opciones: ['A hospital that just opened downtown', 'A school downtown', 'A clinic uptown'], correcta: 'A hospital that just opened downtown' },
  ]},
};

export const PRACTICA_B1_U8 = {
  grammarPractice: [
    { topic: 'Obligation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'You ___ smoke here. (prohibited)', opciones: ["mustn't", "don't have to", 'should not'], correcta: "mustn't" },
      { pregunta: "You ___ come if you're busy. (not necessary)", opciones: ["don't have to", "mustn't", 'cannot'], correcta: "don't have to" },
    ]},
    { topic: 'Possibility drill', tipo: 'opcion', preguntas: [
      { pregunta: 'It ___ rain later.', opciones: ['might', 'must', "mustn't"], correcta: 'might' },
      { pregunta: 'She ___ be at home.', opciones: ['could', 'must', "mustn't"], correcta: 'could' },
    ]},
    { topic: 'Deduction drill', tipo: 'opcion', preguntas: [
      { pregunta: 'He ___ be tired; he worked all night.', opciones: ['must', 'might', "can't"], correcta: 'must' },
      { pregunta: "That ___ be true; it's impossible.", opciones: ["can't", 'must', 'might'], correcta: "can't" },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Rules matching', pares: [
      { a: 'prohibit', b: 'forbid' }, { a: 'authorize', b: 'give official permission' }, { a: 'enforce', b: 'make sure a rule is followed' },
    ]},
    { topic: 'Mystery vocabulary matching', pares: [
      { a: 'clue', b: 'a hint to solve a mystery' }, { a: 'evidence', b: 'proof of something' }, { a: 'assumption', b: 'something believed without proof' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What signs suggest someone was there recently?', opciones: ['The door was open and lights were on', 'Footprints outside', 'A broken window'], correcta: 'The door was open and lights were on' },
    { pregunta: 'What are the two possible explanations?', opciones: ['The owner or someone else', 'A thief or the police', 'A neighbor or a friend'], correcta: 'The owner or someone else' },
  ]},
};

export const PRACTICA_B1_U9 = {
  grammarPractice: [
    { topic: 'Used to drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (play) soccer as a child.', opciones: ['used to play', 'play', 'was playing'], correcta: 'used to play' },
      { pregunta: "She ___ (not/like) coffee.", opciones: ["didn't use to like", "doesn't like", "didn't like"], correcta: "didn't use to like" },
    ]},
    { topic: 'Be used to/get used to drill', tipo: 'opcion', preguntas: [
      { pregunta: "I'm ___ (wake up) early now.", opciones: ['used to waking up', 'used to wake up', 'use to waking up'], correcta: 'used to waking up' },
      { pregunta: 'It took time to ___ (live) here.', opciones: ['get used to living', 'get used to live', 'used to living'], correcta: 'get used to living' },
    ]},
    { topic: 'Gerund/infinitive change drill', tipo: 'opcion', preguntas: [
      { pregunta: 'He stopped ___ (smoke/to smoke). (quit the habit)', opciones: ['smoking', 'to smoke'], correcta: 'smoking' },
      { pregunta: 'She remembered ___ (lock/to lock) the door before leaving. (future action)', opciones: ['to lock', 'locking'], correcta: 'to lock' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Habit change matching', pares: [
      { a: 'adapt', b: 'adjust to new conditions' }, { a: 'transition', b: 'a process of change' }, { a: 'shift', b: 'a change in something' },
    ]},
    { topic: 'Stop/start matching', pares: [
      { a: 'quit', b: 'stop a habit completely' }, { a: 'resume', b: 'start again after a pause' }, { a: 'give up', b: 'stop trying/doing something' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'Where did the speaker use to live?', opciones: ['A small town', 'The city', 'Another country'], correcta: 'A small town' },
    { pregunta: 'What did the speaker get used to?', opciones: ['The noise', 'The traffic', 'The weather'], correcta: 'The noise' },
  ]},
};

export const PRACTICA_B1_U10 = {
  grammarPractice: [
    { topic: 'Contrast connectors drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ it was raining, we went out.', opciones: ['Although', 'Despite', 'However'], correcta: 'Although' },
      { pregunta: '___ the rain, we went out.', opciones: ['Despite', 'Although', 'However'], correcta: 'Despite' },
    ]},
    { topic: 'Linking words drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I like the beach. ___, I prefer the mountains.', opciones: ['However', 'Although', 'Despite'], correcta: 'However' },
    ]},
    { topic: 'So vs such drill', tipo: 'opcion', preguntas: [
      { pregunta: 'It was ___ interesting.', opciones: ['so', 'such'], correcta: 'so' },
      { pregunta: 'It was ___ an interesting book.', opciones: ['such', 'so'], correcta: 'such' },
      { pregunta: 'There were ___ many people.', opciones: ['so', 'such'], correcta: 'so' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Environment matching', pares: [
      { a: 'deforestation', b: 'cutting down forests' }, { a: 'sustainability', b: 'meeting needs without harming the future' }, { a: 'emissions', b: 'gases released into the air' },
    ]},
    { topic: 'Society matching', pares: [
      { a: 'inequality', b: 'unfair difference between groups' }, { a: 'diversity', b: 'variety of people/cultures' }, { a: 'norms', b: 'accepted standards of behavior' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What problem is mentioned about recycling?', opciones: ["Many people don't do it", 'It is too expensive', 'It is illegal'], correcta: "Many people don't do it" },
    { pregunta: 'What have some cities done?', opciones: ['Made it mandatory', 'Banned plastic', 'Built new facilities'], correcta: 'Made it mandatory' },
  ]},
};

export const PRACTICA_B1_U11 = {
  grammarPractice: [
    { topic: 'Question tags drill', tipo: 'opcion', preguntas: [
      { pregunta: "It's hot today, ___?", opciones: ["isn't it", 'is it', "doesn't it"], correcta: "isn't it" },
      { pregunta: "You don't like coffee, ___?", opciones: ['do you', "don't you", 'are you'], correcta: 'do you' },
      { pregunta: 'She can swim, ___?', opciones: ["can't she", 'can she', 'does she'], correcta: "can't she" },
    ]},
    { topic: 'Embedded questions drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Where is the station?', opciones: ['Could you tell me where the station is?', 'Could you tell me where is the station?', 'Could you tell where the station is?'], correcta: 'Could you tell me where the station is?' },
      { pregunta: 'Is she coming?', opciones: ["I wonder if she's coming.", 'I wonder is she coming.', "I wonder if she comes."], correcta: "I wonder if she's coming." },
    ]},
    { topic: 'Both/either/neither & each/every drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ candidates gave a speech.', opciones: ['Both', 'Each', 'Every'], correcta: 'Both' },
      { pregunta: '___ citizen has the right to vote.', opciones: ['Each', 'Both', 'Neither'], correcta: 'Each' },
      { pregunta: '___ of them agreed.', opciones: ['Neither', 'Both', 'Each'], correcta: 'Neither' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Culture matching', pares: [
      { a: 'heritage', b: 'cultural inheritance from the past' }, { a: 'ritual', b: 'a ceremony done the same way regularly' }, { a: 'folklore', b: 'traditional stories and beliefs' },
    ]},
    { topic: 'Crime & law matching', pares: [
      { a: 'witness', b: 'someone who saw an event' }, { a: 'evidence', b: 'proof used in an investigation' }, { a: 'trial', b: 'a legal process to decide guilt' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the speaker wonder about the festival?', opciones: ['If it happens every year', 'How much it costs', 'Who organizes it'], correcta: 'If it happens every year' },
    { pregunta: 'What does the speaker want to know about the events?', opciones: ['If both main events are free', 'What time they start', 'Where they are held'], correcta: 'If both main events are free' },
  ]},
};
