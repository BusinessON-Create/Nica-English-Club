// ejercicios-b2.js — Práctica de Nivel B2 (13 unidades) convertida a juegos.
// Mismo criterio que niveles anteriores: se completaron las preguntas de
// listening y se convirtieron drills de doble espacio / transformación en
// opción múltiple de frase completa. Revísalas.

export const PRACTICA_B2_U1 = {
  grammarPractice: [
    { topic: 'Mixed tense review drill', tipo: 'opcion', preguntas: [
      { pregunta: 'By the time I arrived, the meeting ___ (already/start).', opciones: ['had already started', 'has already started', 'already started'], correcta: 'had already started' },
      { pregunta: 'I ___ (work) here for ten years now.', opciones: ['have worked', 'had worked', 'was working'], correcta: 'have worked' },
    ]},
    { topic: 'Past perfect continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (study) for hours when the power went out.', opciones: ['had been studying', 'have been studying', 'was studying'], correcta: 'had been studying' },
      { pregunta: 'She ___ (work) there for years before she retired.', opciones: ['had been working', 'has been working', 'worked'], correcta: 'had been working' },
    ]},
    { topic: 'Past perfect simple vs continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (read) three books by then.', opciones: ['had read', 'had been reading'], correcta: 'had read' },
      { pregunta: 'I ___ (read) for an hour straight.', opciones: ['had been reading', 'had read'], correcta: 'had been reading' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Life stages matching', pares: [
      { a: 'milestone', b: 'an important event in life' }, { a: 'legacy', b: 'what someone leaves behind' }, { a: 'turning point', b: 'a moment that changes everything' },
    ]},
    { topic: 'Cause-effect matching', pares: [
      { a: 'trigger', b: 'cause something to start suddenly' }, { a: 'culminate in', b: 'end with (as a final result)' }, { a: 'pave the way for', b: 'make something possible later' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What had the speaker done by age 30?', opciones: ['Changed careers twice', 'Started a business', 'Retired early'], correcta: 'Changed careers twice' },
    { pregunta: 'How long had the speaker worked in finance?', opciones: ['Five years', 'Ten years', 'Two years'], correcta: 'Five years' },
  ]},
};

export const PRACTICA_B2_U2 = {
  grammarPractice: [
    { topic: 'Future perfect drill', tipo: 'opcion', preguntas: [
      { pregunta: 'By 2030, I ___ (finish) my degree.', opciones: ['will have finished', 'will finish', 'have finished'], correcta: 'will have finished' },
      { pregunta: 'She ___ (work) here for ten years by June.', opciones: ['will have worked', 'will work', 'has worked'], correcta: 'will have worked' },
    ]},
    { topic: 'Future perfect continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'By next year, I ___ (work) here for a decade.', opciones: ['will have been working', 'will have worked', 'will be working'], correcta: 'will have been working' },
    ]},
    { topic: 'Future continuous drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This time next week, I ___ (travel) to Spain.', opciones: ['will be traveling', 'will travel', 'will have traveled'], correcta: 'will be traveling' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Projects & goals matching', pares: [
      { a: 'deliverable', b: 'a result you must produce' }, { a: 'benchmark', b: 'a standard to measure progress' }, { a: 'timeline', b: 'a schedule of events' },
    ]},
    { topic: 'Career trajectory matching', pares: [
      { a: 'tenure', b: 'length of time in a position' }, { a: 'track record', b: 'history of achievements' }, { a: 'upward mobility', b: 'ability to advance in a career' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What will the speaker have finished by age 30?', opciones: ['Their MBA', 'A new business', 'A book'], correcta: 'Their MBA' },
    { pregunta: 'What is the speaker confident about?', opciones: ['Having their own business eventually', 'Getting promoted', 'Moving abroad'], correcta: 'Having their own business eventually' },
  ]},
};

export const PRACTICA_B2_U3 = {
  grammarPractice: [
    { topic: 'Third conditional formation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If I ___ (know), I ___ (tell) you.', opciones: ['had known, would have told', 'knew, would tell', 'had known, would tell'], correcta: 'had known, would have told' },
      { pregunta: "She ___ (not/miss) the flight if she ___ (leave) earlier.", opciones: ["wouldn't have missed, had left", "wouldn't miss, left", "didn't miss, had left"], correcta: "wouldn't have missed, had left" },
    ]},
    { topic: 'Third conditional usage drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If I ___ (study) harder, I ___ (pass) the exam.', opciones: ['had studied, would have passed', 'studied, would pass', 'had studied, would pass'], correcta: 'had studied, would have passed' },
    ]},
    { topic: 'Had it not been for / but for drill', tipo: 'opcion', preguntas: [
      { pregunta: "If you hadn't helped me, I wouldn't have finished.", opciones: ["Had it not been for you, I wouldn't have finished.", "If it hadn't been for you, I wouldn't finish.", "Hadn't it been for you, I wouldn't have finished."], correcta: "Had it not been for you, I wouldn't have finished." },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Regret vocabulary matching', pares: [
      { a: 'hindsight', b: 'understanding gained after the event' }, { a: 'counterfactual', b: 'something contrary to what happened' }, { a: 'missed chance', b: 'an opportunity not taken' },
    ]},
    { topic: 'Consequence matching', pares: [
      { a: 'ramification', b: 'a consequence of an action' }, { a: 'aftermath', b: 'the period after a bad event' }, { a: 'knock-on effect', b: 'a secondary consequence' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: "What would not have happened if the speaker hadn't taken the job?", opciones: ['Moving to the city and meeting her husband', 'Getting a promotion', 'Starting a business'], correcta: 'Moving to the city and meeting her husband' },
    { pregunta: 'How does the speaker feel about the decision now?', opciones: ['It was the best decision she ever made', 'She regrets it', 'She is unsure'], correcta: 'It was the best decision she ever made' },
  ]},
};

export const PRACTICA_B2_U4 = {
  grammarPractice: [
    { topic: 'Past condition, present result drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If I ___ (study) medicine, I ___ (be) a doctor now.', opciones: ['had studied, would be', 'studied, would be', 'had studied, would have been'], correcta: 'had studied, would be' },
    ]},
    { topic: 'Present condition, past result drill', tipo: 'opcion', preguntas: [
      { pregunta: "If she ___ (be) more careful, she ___ (not/make) that mistake.", opciones: ["were, wouldn't have made", "was, wouldn't make", "had been, wouldn't have made"], correcta: "were, wouldn't have made" },
    ]},
    { topic: 'Mixed vs third conditional drill', tipo: 'opcion', preguntas: [
      { pregunta: "If I had left earlier, I wouldn't be late now.", opciones: ['Mixed conditional', 'Third conditional'], correcta: 'Mixed conditional' },
      { pregunta: "If I had left earlier, I wouldn't have been late.", opciones: ['Mixed conditional', 'Third conditional'], correcta: 'Third conditional' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Identity vocabulary matching', pares: [
      { a: 'resilience', b: 'ability to recover from difficulty' }, { a: 'authenticity', b: 'being true to yourself' }, { a: 'self-awareness', b: 'understanding your own feelings' },
    ]},
    { topic: 'Transformation matching', pares: [
      { a: 'reinvent', b: 'create a new version of yourself' }, { a: 'bounce back', b: 'recover after a setback' }, { a: 'overcome', b: 'successfully deal with a difficulty' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: "What shaped the speaker's character?", opciones: ['The challenges they faced growing up', 'Their education', 'Their travels'], correcta: 'The challenges they faced growing up' },
    { pregunta: "What would be different if the challenges hadn't happened?", opciones: ["They wouldn't be as resilient", 'They would be richer', 'They would be happier'], correcta: "They wouldn't be as resilient" },
  ]},
};

export const PRACTICA_B2_U5 = {
  grammarPractice: [
    { topic: 'Wishes about present drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ (have) more time.', opciones: ['wish I had', 'wish I have', 'wished I had'], correcta: 'wish I had' },
      { pregunta: 'She ___ (live) closer to her family.', opciones: ['wishes she lived', 'wishes she lives', 'wished she lived'], correcta: 'wishes she lived' },
    ]},
    { topic: 'Wishes about the past drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I wish I ___ (study) harder.', opciones: ['had studied', 'studied', 'have studied'], correcta: 'had studied' },
      { pregunta: 'If only I ___ (not/say) that.', opciones: ["hadn't said", "didn't say", "haven't said"], correcta: "hadn't said" },
    ]},
    { topic: 'Would rather/prefer/had better drill', tipo: 'opcion', preguntas: [
      { pregunta: "I'd ___ (rather/stay) home tonight.", opciones: ['rather stay', 'prefer stay', 'better stay'], correcta: 'rather stay' },
      { pregunta: "You'd ___ (better/hurry).", opciones: ['better hurry', 'rather hurry', 'prefer hurry'], correcta: 'better hurry' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Desire vocabulary matching', pares: [
      { a: 'yearn for', b: 'to want something very much' }, { a: 'unfulfilled', b: 'not satisfied or completed' }, { a: 'aspiration', b: 'a strong desire to achieve something' },
    ]},
    { topic: 'Negotiation matching', pares: [
      { a: 'concede', b: 'agree to give up a point' }, { a: 'counteroffer', b: 'a different offer in response' }, { a: 'mutual', b: 'shared by both sides' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did each person prefer?', opciones: ['Mountains and beach', 'Beach and city', 'Mountains and city'], correcta: 'Mountains and beach' },
    { pregunta: 'What did they finally decide?', opciones: ['A weekend at a lake', 'The mountains', 'The beach'], correcta: 'A weekend at a lake' },
  ]},
};

export const PRACTICA_B2_U6 = {
  grammarPractice: [
    { topic: 'Passive across tenses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The report ___ (publish) every year.', opciones: ['is published', 'was published', 'has published'], correcta: 'is published' },
      { pregunta: 'The decision ___ (make) already.', opciones: ['has already been made', 'was already made', 'is already made'], correcta: 'has already been made' },
    ]},
    { topic: 'Passive reporting (It + be + verb + that) drill', tipo: 'opcion', preguntas: [
      { pregunta: 'People believe the economy will improve.', opciones: ['It is believed that the economy will improve.', 'It believes the economy will improve.', 'It is believe that economy will improve.'], correcta: 'It is believed that the economy will improve.' },
    ]},
    { topic: 'Passive reporting (subject + be + verb + to-infinitive) drill', tipo: 'opcion', preguntas: [
      { pregunta: 'It is believed he left the country.', opciones: ['He is believed to have left the country.', 'He believed to have left the country.', 'He is believed to leave the country.'], correcta: 'He is believed to have left the country.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Journalism matching', pares: [
      { a: 'allegation', b: 'a claim not yet proven' }, { a: 'credible source', b: 'a trustworthy origin of information' }, { a: 'exclusive', b: 'a story only one outlet has' },
    ]},
    { topic: 'Statistics matching', pares: [
      { a: 'findings', b: 'results of research' }, { a: 'correlation', b: 'a relationship between two things' }, { a: 'margin of error', b: 'the range of possible inaccuracy' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When will the policy be implemented?', opciones: ['Next month', 'Next week', 'Next year'], correcta: 'Next month' },
    { pregunta: 'Has the estimate been confirmed?', opciones: ['No', 'Yes', 'Partially'], correcta: 'No' },
  ]},
};

export const PRACTICA_B2_U7 = {
  grammarPractice: [
    { topic: 'Have something done drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ my car ___ (repair) yesterday.', opciones: ['had, repaired', 'got, repaired', 'have, repaired'], correcta: 'had, repaired' },
      { pregunta: 'She ___ her nails ___ (do).', opciones: ['had, done', 'got, done', 'has, done'], correcta: 'had, done' },
    ]},
    { topic: 'Get something done drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ my hair ___ (cut).', opciones: ['got, cut', 'had, cut', 'have, cut'], correcta: 'got, cut' },
      { pregunta: 'We ___ the house ___ (paint).', opciones: ['got, painted', 'had, painted', 'have, painted'], correcta: 'got, painted' },
    ]},
    { topic: 'Have someone do vs get someone to do drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I ___ my assistant send the email. (direct)', opciones: ['had', 'got'], correcta: 'had' },
      { pregunta: 'I ___ my assistant to send the email. (persuading)', opciones: ['got', 'had'], correcta: 'got' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Professional services matching', pares: [
      { a: 'contractor', b: 'someone hired for construction work' }, { a: 'outsource', b: 'hire an outside company for a task' }, { a: 'vendor', b: 'a company that sells/supplies goods' },
    ]},
    { topic: 'Delegation matching', pares: [
      { a: 'entrust', b: 'give someone responsibility for something' }, { a: 'hand over', b: 'transfer control of something' }, { a: 'deputize', b: 'give someone else your authority' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did the speaker have renovated?', opciones: ['Bathroom', 'Kitchen', 'Garage'], correcta: 'Bathroom' },
    { pregunta: 'How long did it take?', opciones: ['Two weeks', 'One week', 'A month'], correcta: 'Two weeks' },
  ]},
};

export const PRACTICA_B2_U8 = {
  grammarPractice: [
    { topic: 'Reporting verb patterns drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She insisted ___ (that he apologize).', opciones: ['that he apologize', 'to apologize', 'him apologizing'], correcta: 'that he apologize' },
      { pregunta: 'He urged us ___ (reconsider).', opciones: ['to reconsider', 'reconsider', 'reconsidering'], correcta: 'to reconsider' },
    ]},
    { topic: 'Modal shift drill', tipo: 'opcion', preguntas: [
      { pregunta: "'I will help,' she said.", opciones: ['She said she would help.', 'She said she will help.', 'She said she helps.'], correcta: 'She said she would help.' },
      { pregunta: "'I can come,' he said.", opciones: ['He said he could come.', 'He said he can come.', 'He said he comes.'], correcta: 'He said he could come.' },
    ]},
    { topic: 'Combined reported speech drill', tipo: 'opcion', preguntas: [
      { pregunta: "'I'll come. Can you confirm the time? Bring the documents.'", opciones: ['He said he would come, asked if I could confirm the time, and told me to bring the documents.', 'He said he will come, asked if I can confirm the time, and told bring the documents.', 'He said he would come and asked to confirm the time and bring the documents.'], correcta: 'He said he would come, asked if I could confirm the time, and told me to bring the documents.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Diplomatic language matching', pares: [
      { a: 'evasive', b: 'avoiding giving a direct answer' }, { a: 'candid', b: 'honest and direct' }, { a: 'discreet', b: 'careful not to reveal private information' },
    ]},
    { topic: 'Formal meetings matching', pares: [
      { a: 'consensus', b: 'general agreement' }, { a: 'motion', b: 'a formal proposal in a meeting' }, { a: 'adjourn', b: 'to end a meeting temporarily or formally' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did the spokesperson point out?', opciones: ['Sales had improved', 'Sales had dropped', 'Prices increased'], correcta: 'Sales had improved' },
    { pregunta: 'What did she stress?', opciones: ['More details would be released next quarter', 'The company was closing', 'Profits would double'], correcta: 'More details would be released next quarter' },
  ]},
};

export const PRACTICA_B2_U9 = {
  grammarPractice: [
    { topic: 'Reducing relative clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The man who is standing there is my boss.', opciones: ['The man standing there is my boss.', 'The man stands there is my boss.', 'The man who standing there is my boss.'], correcta: 'The man standing there is my boss.' },
      { pregunta: 'The car that was damaged in the accident is mine.', opciones: ['The car damaged in the accident is mine.', 'The car damaging in the accident is mine.', 'The car that damaged in the accident is mine.'], correcta: 'The car damaged in the accident is mine.' },
    ]},
    { topic: 'Participle clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ (work) quickly, she finished early.', opciones: ['Working', 'Worked', 'To work'], correcta: 'Working' },
      { pregunta: '___ (write) in 1990, the book is still popular.', opciones: ['Written', 'Writing', 'Wrote'], correcta: 'Written' },
    ]},
    { topic: 'Combining participle clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She finished the report. She went home.', opciones: ['Having finished the report, she went home.', 'Finishing the report, she went home.', 'Having finish the report, she went home.'], correcta: 'Having finished the report, she went home.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Academic description matching', pares: [
      { a: 'comprising', b: 'made up of' }, { a: 'derived from', b: 'coming from (an origin)' }, { a: 'characterized by', b: 'having a particular quality' },
    ]},
    { topic: 'Technical vocabulary matching', pares: [
      { a: 'mechanism', b: 'a system of parts working together' }, { a: 'methodology', b: 'a system of methods used' }, { a: 'component', b: 'a part of a larger whole' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the system comprise?', opciones: ['Several interconnected components', 'One single unit', 'Two separate systems'], correcta: 'Several interconnected components' },
    { pregunta: 'What is it designed to do?', opciones: ['Process large amounts of data', 'Store energy', 'Connect devices'], correcta: 'Process large amounts of data' },
  ]},
};

export const PRACTICA_B2_U10 = {
  grammarPractice: [
    { topic: 'Should have/shouldn\'t have drill', tipo: 'opcion', preguntas: [
      { pregunta: 'We ___ (plan) better.', opciones: ['should have planned', 'should plan', 'must have planned'], correcta: 'should have planned' },
      { pregunta: 'You ___ (rush) the deadline.', opciones: ["shouldn't have rushed", "shouldn't rush", "mustn't have rushed"], correcta: "shouldn't have rushed" },
    ]},
    { topic: 'Could have/might have drill', tipo: 'opcion', preguntas: [
      { pregunta: 'We ___ (avoid) the problem.', opciones: ['could have avoided', 'could avoid', 'should have avoided'], correcta: 'could have avoided' },
      { pregunta: 'It ___ (be) a misunderstanding.', opciones: ['might have been', 'might be', 'could be'], correcta: 'might have been' },
    ]},
    { topic: "Must have/can't have/needn't have drill", tipo: 'opcion', preguntas: [
      { pregunta: 'We ___ (underestimate) the risks.', opciones: ['must have underestimated', 'must underestimate', 'should have underestimated'], correcta: 'must have underestimated' },
      { pregunta: 'You ___ (worry); it was fine.', opciones: ["needn't have worried", "mustn't have worried", "shouldn't have worried"], correcta: "needn't have worried" },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Critique vocabulary matching', pares: [
      { a: 'scrutinize', b: 'examine very closely' }, { a: 'commend', b: 'praise someone officially' }, { a: 'highlight shortcomings', b: 'point out weaknesses' },
    ]},
    { topic: 'Responsibility matching', pares: [
      { a: 'negligent', b: 'careless in a way that causes harm' }, { a: 'oversight', b: 'an unintentional mistake' }, { a: 'accountable', b: "required to explain one's actions" },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What should they have done?', opciones: ['Tested the product more thoroughly', 'Hired more staff', 'Waited longer'], correcta: 'Tested the product more thoroughly' },
    { pregunta: 'What does the speaker think they must have missed?', opciones: ['An important detail', 'A deadline', 'A budget issue'], correcta: 'An important detail' },
  ]},
};

export const PRACTICA_B2_U11 = {
  grammarPractice: [
    { topic: 'Inversion drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I have never seen such dedication.', opciones: ['Never have I seen such dedication.', 'Never I have seen such dedication.', 'Never did I see such dedication.'], correcta: 'Never have I seen such dedication.' },
      { pregunta: 'She rarely complains.', opciones: ['Rarely does she complain.', 'Rarely she complains.', 'Rarely complains she.'], correcta: 'Rarely does she complain.' },
    ]},
    { topic: 'Cleft sentences drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Her confidence impressed me.', opciones: ['It was her confidence that impressed me.', 'It was her confidence impressed me.', 'Her confidence was that impressed me.'], correcta: 'It was her confidence that impressed me.' },
    ]},
    { topic: 'Emphasis structures drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I believe this is right.', opciones: ['I do believe this is right.', 'I am believe this is right.', 'I believe do this is right.'], correcta: 'I do believe this is right.' },
      { pregunta: 'She finished the project.', opciones: ['She did finish the project.', 'She finished did the project.', 'She does finished the project.'], correcta: 'She did finish the project.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Persuasive language matching', pares: [
      { a: 'compelling', b: 'very convincing' }, { a: 'unequivocal', b: 'completely clear, no doubt' }, { a: 'resounding', b: 'very strong/emphatic' },
    ]},
    { topic: 'Rhetorical devices matching', pares: [
      { a: 'hyperbole', b: 'exaggeration for effect' }, { a: 'parallelism', b: 'repeating a grammatical structure' }, { a: 'call to action', b: 'urging the audience to act' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What inversion structure is used at the beginning?', opciones: ["'Never before have we...'", 'Rarely do we', 'Not only did we'], correcta: "'Never before have we...'" },
    { pregunta: 'What is the speaker urging the audience to do?', opciones: ['Act now', 'Vote', 'Donate'], correcta: 'Act now' },
  ]},
};

export const PRACTICA_B2_U12 = {
  grammarPractice: [
    { topic: 'Sequencing drill', tipo: 'opcion', preguntas: [
      { pregunta: '___, we need more data. ___, we need more time.', opciones: ['Firstly, Furthermore', 'First, Also', 'Firstly, However'], correcta: 'Firstly, Furthermore' },
    ]},
    { topic: 'Contrast/concession drill', tipo: 'opcion', preguntas: [
      { pregunta: "The plan has risks. ___, it's worth trying.", opciones: ['Nevertheless', 'Moreover', 'Therefore'], correcta: 'Nevertheless' },
    ]},
    { topic: 'Cause/conclusion drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Sales dropped; ___, we changed strategy.', opciones: ['consequently', 'however', 'firstly'], correcta: 'consequently' },
      { pregunta: '___, the plan is solid.', opciones: ['To sum up', 'For example', 'In addition'], correcta: 'To sum up' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Connectors matching (by category)', pares: [
      { a: 'moreover', b: 'addition' }, { a: 'nevertheless', b: 'contrast' }, { a: 'consequently', b: 'cause-result' }, { a: 'to sum up', b: 'conclusion' },
    ]},
    { topic: 'Formal connector synonyms matching', pares: [
      { a: 'hence', b: 'so' }, { a: 'notwithstanding', b: 'despite' }, { a: 'admittedly', b: 'I admit that' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What two positive points are mentioned?', opciones: ['Growth and improved satisfaction', 'Lower costs and growth', 'Satisfaction and lower costs'], correcta: 'Growth and improved satisfaction' },
    { pregunta: 'What concession is made?', opciones: ['Costs have increased too', 'Growth has slowed', 'Satisfaction dropped'], correcta: 'Costs have increased too' },
  ]},
};

export const PRACTICA_B2_U13 = {
  grammarPractice: [
    { topic: 'Register conversion drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I found out a lot of stuff.', opciones: ['I discovered numerous details.', 'I found out numerous details.', 'I discovered a lot of stuff.'], correcta: 'I discovered numerous details.' },
      { pregunta: 'The kids got some big news.', opciones: ['The children received substantial news.', 'The kids received substantial news.', 'The children got substantial news.'], correcta: 'The children received substantial news.' },
    ]},
    { topic: 'Collocations drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The researchers ___ a study on climate change.', opciones: ['carried out', 'made', 'did'], correcta: 'carried out' },
      { pregunta: 'The committee needs to ___ a consensus.', opciones: ['reach', 'make', 'do'], correcta: 'reach' },
    ]},
    { topic: 'Word families drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She made a ___ (decide) quickly.', opciones: ['decision', 'decisive', 'decide'], correcta: 'decision' },
      { pregunta: 'His approach is very ___ (analysis).', opciones: ['analytical', 'analysis', 'analyze'], correcta: 'analytical' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Formal/informal matching', pares: [
      { a: 'get', b: 'obtain' }, { a: 'buy', b: 'purchase' }, { a: 'start', b: 'commence' },
    ]},
    { topic: 'Essay structure matching', pares: [
      { a: 'thesis statement', b: 'the main argument of the essay' }, { a: 'topic sentence', b: 'the main idea of a paragraph' }, { a: 'counterargument', b: 'an opposing point addressed in the essay' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What was the purpose of the study?', opciones: ['Address a significant issue in the community', 'Test a new product', 'Train new staff'], correcta: 'Address a significant issue in the community' },
    { pregunta: 'What does the speaker recommend?', opciones: ['Further research', 'Immediate action', 'No further study'], correcta: 'Further research' },
  ]},
};
