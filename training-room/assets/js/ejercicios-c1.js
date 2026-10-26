// ejercicios-c1.js — Práctica de Nivel C1, unidades 1-12, convertida a juegos.
// Las unidades 13-15 (TOEFL) no tienen drills de este tipo: son instrucciones
// de práctica, así que se muestran como tarjetas (ver nivel.js).
//
// Mismo criterio que niveles anteriores: se completaron las preguntas de
// listening y los drills sin respuesta. Revísalas.
//
// OJO (Unidad 2, listening): la pregunta original decía "shouldn't have done",
// pero el audio dice "should have allocated more resources" y "needn't have
// rushed". La reformulé como "needn't have done" para que tenga una sola
// respuesta correcta.

export const PRACTICA_C1_U1 = {
  grammarPractice: [
    { topic: 'Mixed tense drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She ___ (strive) for excellence for years.', opciones: ['has been striving', 'has striven', 'strives'], correcta: 'has been striving' },
      { pregunta: 'By the time he succeeded, he ___ (face) countless setbacks.', opciones: ['had faced', 'has faced', 'faced'], correcta: 'had faced' },
    ]},
    { topic: 'Advanced conditionals drill', tipo: 'opcion', preguntas: [
      { pregunta: 'If perseverance ___ (not/matter), few people would succeed.', opciones: ["didn't matter", "doesn't matter", "wouldn't matter"], correcta: "didn't matter" },
      { pregunta: "Had I ___ (give up), I wouldn't be here.", opciones: ['given up', 'gave up', 'give up'], correcta: 'given up' },
    ]},
    { topic: 'Precision drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Talent matters.', opciones: ['Arguably, talent matters to some extent.', 'Talent definitely matters in every case.', 'Talent matters, as everyone knows.'], correcta: 'Arguably, talent matters to some extent.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Sophisticated adjectives matching', pares: [
      { a: 'multifaceted', b: 'having many aspects' }, { a: 'pervasive', b: 'present everywhere' }, { a: 'ubiquitous', b: 'found everywhere' },
    ]},
    { topic: 'Academic verbs matching', pares: [
      { a: 'substantiate', b: 'provide evidence for' }, { a: 'elucidate', b: 'make something clear' }, { a: 'scrutinize', b: 'examine closely' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the speaker argue plays a bigger role in success?', opciones: ['Perseverance and determination', 'Talent', 'Luck'], correcta: 'Perseverance and determination' },
    { pregunta: 'What qualification phrase does the speaker use?', opciones: ['To some extent', 'In no way', 'Without a doubt'], correcta: 'To some extent' },
  ]},
};

export const PRACTICA_C1_U2 = {
  grammarPractice: [
    { topic: 'Should have vs was supposed to drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The train ___ arrive at 8.', opciones: ['was supposed to', 'should have'], correcta: 'was supposed to' },
      { pregunta: 'You ___ told me earlier.', opciones: ['should have', 'was supposed to'], correcta: 'should have' },
    ]},
    { topic: "Needn't have vs didn't need to drill", tipo: 'opcion', preguntas: [
      { pregunta: "You ___ brought that; it was already here.", opciones: ["needn't have", "didn't need to"], correcta: "needn't have" },
      { pregunta: 'I ___ bring my ID; nobody checked.', opciones: ["didn't need to", "needn't have"], correcta: "didn't need to" },
    ]},
    { topic: 'Combined precision drill', tipo: 'opcion', preguntas: [
      { pregunta: 'He ___ (call) earlier, but he was busy. (criticism)', opciones: ['should have called', 'was supposed to call', "needn't have called"], correcta: 'should have called' },
      { pregunta: 'The project ___ (finish) by March. (plan)', opciones: ['was supposed to finish', 'should have finished', "needn't have finished"], correcta: 'was supposed to finish' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Expectation vocabulary matching', pares: [
      { a: 'anticipated', b: 'expected in advance' }, { a: 'foreseen', b: 'predicted before it happened' }, { a: 'designated', b: 'officially assigned' },
    ]},
    { topic: 'Outcome vocabulary matching', pares: [
      { a: 'discrepancy', b: 'a difference between things that should match' }, { a: 'shortfall', b: 'an amount less than expected' }, { a: 'anomaly', b: 'something that deviates from the norm' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When was the project supposed to finish?', opciones: ['March', 'June', 'December'], correcta: 'March' },
    { pregunta: "What does the speaker say they needn't have done?", opciones: ['Rushed the final stage', 'Allocated more resources', 'Delayed the project'], correcta: 'Rushed the final stage' },
  ]},
};

export const PRACTICA_C1_U3 = {
  grammarPractice: [
    { topic: 'Advanced passive drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The policy ___ (institute) in 2020.', opciones: ['was instituted', 'is instituted', 'instituted'], correcta: 'was instituted' },
      { pregunta: 'Compliance ___ (oversee) by an external body.', opciones: ['is overseen', 'was overseen', 'oversees'], correcta: 'is overseen' },
    ]},
    { topic: 'Causative fluency drill', tipo: 'opcion', preguntas: [
      { pregunta: 'We ___ the audit ___ (conduct) by an independent firm.', opciones: ['had, conducted', 'got, conduct', 'had, conduct'], correcta: 'had, conducted' },
      { pregunta: 'The company ___ the process ___ (expedite).', opciones: ['got, expedited', 'got, expedite', 'made, expedited'], correcta: 'got, expedited' },
    ]},
    { topic: 'Combined drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The protocol was instituted. The company had the system audited.', opciones: ['The protocol was instituted after the company had the system audited.', 'The protocol was instituted before the company had the system audited.', 'The protocol was instituted after the company has the system audited.'], correcta: 'The protocol was instituted after the company had the system audited.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Institutional processes matching', pares: [
      { a: 'due diligence', b: 'careful investigation before a decision' }, { a: 'accreditation', b: 'official recognition of a standard' }, { a: 'governance', b: 'the system of managing an organization' },
    ]},
    { topic: 'Formal verbs matching', pares: [
      { a: 'ratified', b: 'formally approved' }, { a: 'enacted', b: 'made into law/policy' }, { a: 'commissioned', b: 'officially requested/ordered' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'When was the certification process instituted?', opciones: ['Last year', 'Two years ago', 'Next year'], correcta: 'Last year' },
    { pregunta: 'How often are audits conducted?', opciones: ['Quarterly', 'Monthly', 'Yearly'], correcta: 'Quarterly' },
  ]},
};

export const PRACTICA_C1_U4 = {
  grammarPractice: [
    { topic: 'Advanced reported speech drill', tipo: 'opcion', preguntas: [
      { pregunta: "'The policy is flawed,' she said.", opciones: ['She maintained that the policy was flawed.', 'She maintained that the policy is flawed.', 'She maintained the policy was being flawed.'], correcta: 'She maintained that the policy was flawed.' },
      { pregunta: "'Results might differ,' he said.", opciones: ['He hypothesized that the results would differ.', 'He hypothesized that the results will differ.', 'He hypothesized the results differing.'], correcta: 'He hypothesized that the results would differ.' },
    ]},
    { topic: 'Hedging drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This is a trend.', opciones: ['This may indicate a broader trend.', 'This definitely is a broader trend.', 'This indicates for sure a trend.'], correcta: 'This may indicate a broader trend.' },
      { pregunta: 'The theory is true.', opciones: ['It would seem that the theory holds true.', 'It is certain that the theory holds true.', 'The theory is absolutely true.'], correcta: 'It would seem that the theory holds true.' },
    ]},
    { topic: 'Qualifying drill', tipo: 'opcion', preguntas: [
      { pregunta: 'This approach works.', opciones: ['Generally speaking, this approach works, with some exceptions.', 'This approach works in all cases.', 'Generally speaking, this approach never works.'], correcta: 'Generally speaking, this approach works, with some exceptions.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Hedging phrases matching', pares: [
      { a: 'it is conceivable that', b: 'introduces a possibility' }, { a: 'there is reason to believe', b: 'introduces a supported claim' }, { a: 'it is plausible that', b: 'introduces a reasonable possibility' },
    ]},
    { topic: 'Academic opinion verbs matching', pares: [
      { a: 'contend', b: 'argue strongly for a position' }, { a: 'posit', b: 'put forward an idea as a basis for argument' }, { a: 'hypothesize', b: 'propose an explanation to be tested' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What correlation does the speaker mention?', opciones: ['Social media usage and lower attention spans', 'Sleep and productivity', 'Screen time and eyesight'], correcta: 'Social media usage and lower attention spans' },
    { pregunta: 'What qualification does the speaker add?', opciones: ['More research is needed to confirm causation', 'The results are final', 'The sample was too large'], correcta: 'More research is needed to confirm causation' },
  ]},
};

export const PRACTICA_C1_U5 = {
  grammarPractice: [
    { topic: 'Reduced relative clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The data that was collected reveals a trend.', opciones: ['The data collected reveals a trend.', 'The data collecting reveals a trend.', 'The data that collected reveals a trend.'], correcta: 'The data collected reveals a trend.' },
      { pregunta: 'Researchers who study the phenomenon agree.', opciones: ['Researchers studying the phenomenon agree.', 'Researchers studied the phenomenon agree.', 'Researchers who studying the phenomenon agree.'], correcta: 'Researchers studying the phenomenon agree.' },
    ]},
    { topic: 'Perfect participle drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ (analyze) the data, they drew conclusions.', opciones: ['Having analyzed', 'Analyzed', 'Having analyze'], correcta: 'Having analyzed' },
      { pregunta: '___ (consider) the evidence, the jury decided.', opciones: ['Having considered', 'Considered', 'Having consider'], correcta: 'Having considered' },
    ]},
    { topic: 'Absolute clauses drill', tipo: 'opcion', preguntas: [
      { pregunta: '___, the experiment will proceed outdoors.', opciones: ['Weather permitting', 'Weather permits', 'Permitting the weather'], correcta: 'Weather permitting' },
      { pregunta: '___, the results should be similar.', opciones: ['All things being equal', 'All things equal being', 'All things are equaling'], correcta: 'All things being equal' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Scientific vocabulary matching', pares: [
      { a: 'empirical', b: 'based on observation/experience' }, { a: 'hypothesis', b: 'a proposed explanation to be tested' }, { a: 'coefficient', b: 'a numerical measure of a property' },
    ]},
    { topic: 'Process connectors matching', pares: [
      { a: 'whereby', b: 'by which (a process)' }, { a: 'concurrently', b: 'happening at the same time' }, { a: 'henceforth', b: 'from this point onward' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What did the researchers find?', opciones: ['A clear correlation', 'No relationship', 'A random pattern'], correcta: 'A clear correlation' },
    { pregunta: 'What phenomenon is described?', opciones: ['Engagement increases with feedback', 'Feedback reduces motivation', 'Engagement stays constant'], correcta: 'Engagement increases with feedback' },
  ]},
};

export const PRACTICA_C1_U6 = {
  grammarPractice: [
    { topic: 'Complex noun phrases drill', tipo: 'opcion', preguntas: [
      { pregunta: 'A policy. It is new. It is controversial. It is about privacy.', opciones: ['The new, controversial policy on privacy.', 'The policy new controversial about privacy.', 'A privacy on policy new, controversial.'], correcta: 'The new, controversial policy on privacy.' },
    ]},
    { topic: 'Nominalisation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'They decided to implement the policy.', opciones: ['The decision to implement the policy was made.', 'The deciding to implement the policy was made.', 'They decision implement the policy.'], correcta: 'The decision to implement the policy was made.' },
      { pregunta: 'The team analyzed the results.', opciones: ['The analysis of the results was conducted.', 'The analyzing of results conducted.', 'The analyze of the results was conducted.'], correcta: 'The analysis of the results was conducted.' },
    ]},
    { topic: 'Subordination vs coordination drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The plan was risky. It succeeded.', opciones: ['Although the plan was risky, it succeeded.', 'The plan was risky, although it succeeded it.', 'Although the plan was risky, but it succeeded.'], correcta: 'Although the plan was risky, it succeeded.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Nominalization matching', pares: [
      { a: 'recommend', b: 'recommendation' }, { a: 'establish', b: 'establishment' }, { a: 'evaluate', b: 'evaluation' },
    ]},
    { topic: 'Abstract nouns matching', pares: [
      { a: 'ramification', b: 'a consequence of a decision' }, { a: 'dichotomy', b: 'a division between two opposite things' }, { a: 'ambiguity', b: 'lack of clarity in meaning' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What was the decision based on?', opciones: ['A thorough analysis of the data and employee feedback', 'A vote by employees', 'Market competition'], correcta: 'A thorough analysis of the data and employee feedback' },
    { pregunta: 'Why did the board approve it?', opciones: ['The results were positive', 'It was the cheapest option', 'The employees demanded it'], correcta: 'The results were positive' },
  ]},
};

export const PRACTICA_C1_U7 = {
  grammarPractice: [
    { topic: 'Inversion drill', tipo: 'opcion', preguntas: [
      { pregunta: "She didn't doubt her decision at any time.", opciones: ['At no time did she doubt her decision.', 'At no time she doubted her decision.', 'At no time did she doubted her decision.'], correcta: 'At no time did she doubt her decision.' },
    ]},
    { topic: 'Negative inversion drill', tipo: 'opcion', preguntas: [
      { pregunta: '___ should this information be shared.', opciones: ['On no account', 'On any account', 'Not on account'], correcta: 'On no account' },
      { pregunta: 'This is most evident in the results.', opciones: ['Nowhere is this more evident than in the results.', 'Nowhere this is more evident than in the results.', 'Nowhere is this most evident in the results.'], correcta: 'Nowhere is this more evident than in the results.' },
    ]},
    { topic: 'Fronting drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The impact was so great that the industry changed.', opciones: ['Such was the impact that the industry changed.', 'Such the impact was that the industry changed.', 'So was the impact that the industry changed.'], correcta: 'Such was the impact that the industry changed.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Formal adjectives matching', pares: [
      { a: 'unprecedented', b: 'never having happened before' }, { a: 'indomitable', b: 'impossible to defeat' }, { a: 'unparalleled', b: 'unmatched/unique' },
    ]},
    { topic: 'Rhetorical verbs matching', pares: [
      { a: 'epitomize', b: 'be a perfect example of' }, { a: 'encapsulate', b: 'express the essential meaning concisely' }, { a: 'evoke', b: 'bring a feeling or memory to mind' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What inversion structure opens the account?', opciones: ["'Never before had...'", "'Rarely did...'", "'Only when...'"], correcta: "'Never before had...'" },
    { pregunta: 'What was the outcome of the crisis?', opciones: ['The leadership team was restructured', 'The company closed', 'Sales doubled'], correcta: 'The leadership team was restructured' },
  ]},
};

export const PRACTICA_C1_U8 = {
  grammarPractice: [
    { topic: 'Cleft sentences drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The policy changed in 2020.', opciones: ['It was in 2020 that the policy changed.', 'It was 2020 that the policy changed in.', 'It was in 2020 the policy that changed.'], correcta: 'It was in 2020 that the policy changed.' },
    ]},
    { topic: 'Ellipsis drill', tipo: 'opcion', preguntas: [
      { pregunta: "She wanted to go, but I didn't want to go.", opciones: ["She wanted to go, but I didn't.", "She wanted to go, but I didn't want.", "She wanted to go, but didn't I."], correcta: "She wanted to go, but I didn't." },
    ]},
    { topic: 'Substitution drill', tipo: 'opcion', preguntas: [
      { pregunta: 'He finished the report, and she finished the report too.', opciones: ['He finished the report; she did so too.', 'He finished the report; she did too so.', 'He finished the report; she done so too.'], correcta: 'He finished the report; she did so too.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Focus adverbs matching', pares: [
      { a: 'crucially', b: 'in a way that is essential' }, { a: 'strikingly', b: 'in a very noticeable way' }, { a: 'fundamentally', b: 'at the most basic level' },
    ]},
    { topic: 'Substitution words matching', pares: [
      { a: 'the former', b: 'refers to the first of two items' }, { a: 'the latter', b: 'refers to the second of two items' }, { a: 'likewise', b: 'in the same way' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the speaker say really matters?', opciones: ['The process, not the outcome', 'The outcome, not the process', 'Speed and efficiency'], correcta: 'The process, not the outcome' },
    { pregunta: "What's the difference between the former and latter approach?", opciones: ['The former was rigid; the latter far more flexible', 'The former was flexible; the latter rigid', 'They were identical'], correcta: 'The former was rigid; the latter far more flexible' },
  ]},
};

export const PRACTICA_C1_U9 = {
  grammarPractice: [
    { topic: 'Discourse markers drill', tipo: 'opcion', preguntas: [
      { pregunta: '___, the second study confirms this. (by the same token)', opciones: ['By the same token', 'Conversely', 'Nevertheless'], correcta: 'By the same token' },
      { pregunta: '___, the opposite was found in Europe. (conversely)', opciones: ['Conversely', 'By the same token', 'Likewise'], correcta: 'Conversely' },
    ]},
    { topic: 'Cohesive devices drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The first study showed strong results; the second, ___.', opciones: ['less so', 'too', 'is so'], correcta: 'less so' },
    ]},
    { topic: 'Parallel structures drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The policy aims to reduce costs, increasing efficiency, and to improve morale.', opciones: ['The policy aims to reduce costs, increase efficiency, and improve morale.', 'The policy aims to reduce costs, to increasing efficiency, and improve morale.', 'The policy aims to reduce costs, increasing efficiency, and improving morale.'], correcta: 'The policy aims to reduce costs, increase efficiency, and improve morale.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Transition markers matching', pares: [
      { a: 'by contrast', b: 'shows a difference' }, { a: 'in a similar vein', b: 'shows similarity' }, { a: 'correspondingly', b: 'shows a matching result' },
    ]},
    { topic: 'Cohesive reference matching', pares: [
      { a: 'the aforementioned', b: 'refers back to something already mentioned' }, { a: 'as will be shown', b: 'points forward to upcoming content' }, { a: 'this raises the question of', b: 'introduces a new point for discussion' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What does the section examine?', opciones: ['The main findings', 'The research methods', 'The limitations'], correcta: 'The main findings' },
    { pregunta: 'What question does the speaker raise?', opciones: ['Long-term sustainability', 'Short-term costs', 'Public opinion'], correcta: 'Long-term sustainability' },
  ]},
};

export const PRACTICA_C1_U10 = {
  grammarPractice: [
    { topic: 'Semicolon/colon drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The results were clear ___ the team was satisfied.', opciones: ['; (semicolon)', ': (colon)', ', (comma)'], correcta: '; (semicolon)' },
      { pregunta: 'The report covered three areas ___ budget, timeline, and risk.', opciones: [': (colon)', '; (semicolon)', ', (comma)'], correcta: ': (colon)' },
    ]},
    { topic: 'Dashes/parentheses drill', tipo: 'opcion', preguntas: [
      { pregunta: 'The results ___ surprising to everyone ___ changed the strategy.', opciones: ['two dashes (— —)', 'two semicolons (; ;)', 'two colons (: :)'], correcta: 'two dashes (— —)' },
    ]},
    { topic: 'Comma splice/run-on correction drill', tipo: 'opcion', preguntas: [
      { pregunta: 'I finished the report, I sent it.', opciones: ['I finished the report, and I sent it.', 'I finished the report, I sent it quickly.', 'I finished the report I sent it.'], correcta: 'I finished the report, and I sent it.' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Punctuation terminology matching', pares: [
      { a: 'comma splice', b: 'joining two independent clauses with only a comma' }, { a: 'run-on sentence', b: 'two or more clauses with no proper punctuation' }, { a: 'appositive', b: 'a noun phrase that renames another noun' },
    ]},
    { topic: 'Writing errors matching', pares: [
      { a: 'dangling participle', b: 'a participle with no clear subject' }, { a: 'sentence fragment', b: 'an incomplete sentence' }, { a: 'faulty parallelism', b: 'inconsistent grammatical forms in a list' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What common mistake does the tutor mention?', opciones: ['The comma splice', 'The run-on fragment', 'Missing apostrophes'], correcta: 'The comma splice' },
    { pregunta: 'What three solutions does the tutor suggest?', opciones: ['A semicolon, a period, or a conjunction', 'A dash, a colon, or a comma', 'A comma, a hyphen, or a bracket'], correcta: 'A semicolon, a period, or a conjunction' },
  ]},
};

export const PRACTICA_C1_U11 = {
  grammarPractice: [
    { topic: 'Polysemy drill', tipo: 'opcion', preguntas: [
      { pregunta: "In 'She runs the company', what does 'run' mean?", opciones: ['manage', 'tear', 'flow'], correcta: 'manage' },
      { pregunta: "In 'There's a run in my stocking', what does 'run' mean?", opciones: ['tear', 'manage', 'sprint'], correcta: 'tear' },
    ]},
    { topic: 'Connotation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'She is very ___ (positive: determined) about her goals.', opciones: ['persistent', 'stubborn', 'pushy'], correcta: 'persistent' },
      { pregunta: 'He was ___ (negative) when I asked a simple question.', opciones: ['stubborn', 'persistent', 'determined'], correcta: 'stubborn' },
    ]},
    { topic: 'Word formation drill', tipo: 'opcion', preguntas: [
      { pregunta: 'complex + -ity', opciones: ['complexity', 'complexness', 'complexation'], correcta: 'complexity' },
      { pregunta: 'implement + -ation', opciones: ['implementation', 'implementment', 'implementity'], correcta: 'implementation' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Polysemy matching', pares: [
      { a: 'address (verb)', b: 'to deal with a problem' }, { a: 'charge (noun)', b: 'an amount of money to pay' }, { a: 'match (noun)', b: 'a sports competition' },
    ]},
    { topic: 'Connotation matching', pares: [
      { a: 'slim / skinny', b: 'positive / negative' }, { a: 'confident / arrogant', b: 'positive / negative' }, { a: 'curious / nosy', b: 'positive / negative' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What example does the speaker give?', opciones: ['Persistent vs stubborn', 'Slim vs skinny', 'Confident vs arrogant'], correcta: 'Persistent vs stubborn' },
    { pregunta: 'Why does word choice matter in feedback?', opciones: ['It can make the same behavior sound positive or critical', 'It makes feedback shorter', 'It avoids grammar mistakes'], correcta: 'It can make the same behavior sound positive or critical' },
  ]},
};

export const PRACTICA_C1_U12 = {
  grammarPractice: [
    { topic: 'Counterargument-concession-rebuttal drill', tipo: 'opcion', preguntas: [
      { pregunta: 'Some may argue that X. ___, this is sometimes true.', opciones: ['Admittedly', 'Conversely', 'Therefore'], correcta: 'Admittedly' },
    ]},
    { topic: 'Hedged disagreement drill', tipo: 'opcion', preguntas: [
      { pregunta: "That's wrong.", opciones: ['I would argue, however, that the evidence suggests otherwise.', 'That is wrong, and the evidence proves it.', 'I would argue, however, that you are wrong.'], correcta: 'I would argue, however, that the evidence suggests otherwise.' },
    ]},
    { topic: 'Balanced argument drill', tipo: 'orden', preguntas: [
      { piezas: ['Rebuttal', 'Claim', 'Counterclaim', 'Conclusion'], correcta: 'Claim Counterclaim Rebuttal Conclusion' },
    ]},
  ],
  vocabularyPractice: [
    { topic: 'Counterargument phrases matching', pares: [
      { a: 'critics contend that', b: 'introduces an opposing view' }, { a: 'it could be objected that', b: 'introduces a possible objection' }, { a: 'this view is not without its critics', b: 'acknowledges opposition exists' },
    ]},
    { topic: 'Conceding points matching', pares: [
      { a: 'admittedly', b: 'acknowledges a valid point' }, { a: 'there is some merit to', b: 'partially agrees with an idea' }, { a: 'to be fair', b: 'introduces a balanced acknowledgment' },
    ]},
  ],
  listening: { preguntas: [
    { pregunta: 'What counterargument is presented?', opciones: ['Social media harms mental health', 'Social media improves grades', 'Social media is free'], correcta: 'Social media harms mental health' },
    { pregunta: 'What concession is made before the rebuttal?', opciones: ['There is evidence supporting this', 'The studies are all flawed', 'Nobody agrees'], correcta: 'There is evidence supporting this' },
  ]},
};
