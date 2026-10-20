/* ==========================================================
   PHRASAL VERBS (armado)
   Convierte phrasal-data.js al mismo formato que los verbos, para que favoritos,
   estados, trivia, compartir y sincronización funcionen igual. Se distinguen por
   phrasal: true y su clave de favorito lleva el prefijo "pv:" (ver vKey en storage.js).
   ========================================================== */

const phrasalDatabase = PHRASAL_RAW.map(e => ({
    phrasal: true,
    infinitive: cap(e.expression),
    past: cap(e.forms.past),
    participle: cap(e.forms.pastParticiple),
    thirdPerson: cap(e.forms.third),
    gerund: cap(e.forms.ing),
    translation: e.interpretation.replace(/[.\s]+$/, ''),
    example: e.example,
    exampleEs: '',
    visualization: e.visualization,
    category: e.category,
    difficulty: e.difficulty
})).sort((a, b) => a.infinitive.localeCompare(b.infinitive));

// Todo lo que se puede guardar en favoritos: verbos + phrasal verbs
const allItems = [...verbsDatabase, ...phrasalDatabase];
