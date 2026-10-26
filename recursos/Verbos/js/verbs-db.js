/* ==========================================================
   BASE DE DATOS DE VERBOS (armado)
   Reglas de conjugación y arreglo verbsDatabase a partir de verbs-data.js.
   ========================================================== */

/* ---------- Reglas de conjugación ---------- */
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const capSlash = s => s.split('/').map(cap).join('/');
const third = v => /(s|x|z|ch|sh|o)$/.test(v) ? v + 'es' : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + 'ies' : v + 's';
const gerundOf = (v, dbl) => /ie$/.test(v) ? v.slice(0, -2) + 'ying' : dbl ? v + v.slice(-1) + 'ing' : /[^eyo]e$/.test(v) ? v.slice(0, -1) + 'ing' : v + 'ing';
const pastOf = (v, dbl) => dbl ? v + v.slice(-1) + 'ed' : /e$/.test(v) ? v + 'd' : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + 'ied' : v + 'ed';
const parseLines = txt => txt.split('\n').map(l => l.trim()).filter(Boolean).map(l => l.split('|'));

const verbsDatabase = [
    ...parseLines(IRREGULAR).map(f => {
        const dbl = f[0].endsWith('+');
        const inf = dbl ? f[0].slice(0, -1) : f[0];
        return {
            infinitive: cap(inf),
            thirdPerson: f[7] || cap(third(inf)),
            past: capSlash(f[1]),
            participle: capSlash(f[2]),
            gerund: cap(f[6] || gerundOf(inf, dbl)),
            translation: f[3], example: f[4], exampleEs: f[5],
            irregular: true
        };
    }),
    ...parseLines(REGULAR).map(f => {
        const dbl = f[0].endsWith('+');
        const inf = dbl ? f[0].slice(0, -1) : f[0];
        const past = cap(pastOf(inf, dbl));
        return {
            infinitive: cap(inf),
            thirdPerson: cap(third(inf)),
            past, participle: past,
            gerund: cap(gerundOf(inf, dbl)),
            translation: f[1], example: f[2], exampleEs: f[3],
            irregular: false
        };
    })
].sort((a, b) => a.infinitive.localeCompare(b.infinitive));
