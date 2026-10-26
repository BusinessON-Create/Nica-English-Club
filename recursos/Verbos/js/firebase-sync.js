/* Sincronización con tu Firebase (proyecto nicaenglishportal). Si algo falla aquí, la app sigue funcionando
   igual con los datos locales. Guarda en la colección nueva "verblab", un documento por alumno. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

(function () {
    const B = window.VerbLabBridge;
    if (!B || window.NEC_BLOQUEADO || !/^https?:$/.test(location.protocol)) return;
    const app = initializeApp({
        apiKey: "AIzaSyCchgmeTjQdvsBzOJ9MWH6eJryvG83utAA",
        authDomain: "nicaenglishportal.firebaseapp.com",
        projectId: "nicaenglishportal",
        storageBucket: "nicaenglishportal.firebasestorage.app",
        messagingSenderId: "30475218925",
        appId: "1:30475218925:web:bd98007b81d1f3860fdc44"
    });
    const auth = getAuth(app), db = getFirestore(app);
    const ADMIN = '95gusmg@gmail.com';
    let ref = null, busy = false, again = false, timer = null, last = 0;

    async function syncNow() {
        if (!ref) return;
        if (busy) { again = true; return; }
        busy = true; B.status('syncing');
        try {
            const snap = await getDoc(ref);
            const remote = snap.exists() ? snap.data() : null;
            const merged = B.reconcile(remote);
            const vacio = !Object.keys(merged.favs).length && !Object.keys(merged.misses).length && !merged.best && !merged.name;
            if (remote ? B.stable(B.merge({}, remote)) !== B.stable(merged) : !vacio) await setDoc(ref, { ...merged, v: 1, updatedAt: Date.now() });
            B.clearStash(); last = Date.now(); B.status('ok', last);
        } catch (e) { console.warn('Verb Lab: no se pudo sincronizar', e); B.status('error'); }
        finally { busy = false; if (again) { again = false; schedule(2000); } }
    }
    const schedule = ms => { clearTimeout(timer); timer = setTimeout(syncNow, ms); };
    window.VerbLabSyncNow = () => syncNow();

    let started = false;
    onAuthStateChanged(auth, user => {
        if (started) return;
        let id = null; try { id = localStorage.getItem('nica_alumno_id'); } catch (e) {}
        if (!user || user.isAnonymous || !id || (user.email || '').toLowerCase() === ADMIN) return;
        started = true;
        ref = doc(db, 'verblab', id);
        B.begin(id);
        syncNow();
        document.addEventListener('verblab-changed', () => schedule(8000));            // sube 8 s después del último cambio
        window.addEventListener('online', () => syncNow());
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') { clearTimeout(timer); syncNow(); }
            else if (Date.now() - last > 60000) syncNow();
        });
    });
})();
