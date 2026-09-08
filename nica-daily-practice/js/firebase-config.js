/* ============================================================
   FIREBASE CONFIG
   ------------------------------------------------------------
   IMPORTANT: Nica English Club already has Firebase Auth wired
   up (that's what seguridad.js checks). Do NOT create a second
   Firebase app with different config — copy the EXACT same
   firebaseConfig object your main platform already uses, so the
   logged-in user here is the same user as everywhere else.

   If your main platform already calls firebase.initializeApp()
   in a shared file before this one loads, DELETE the
   initializeApp call below and just keep the two `const db` /
   `const storage` lines.
   ============================================================ */

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_REAL_CONFIG",
  authDomain: "REPLACE_WITH_YOUR_REAL_CONFIG",
  projectId: "REPLACE_WITH_YOUR_REAL_CONFIG",
  storageBucket: "REPLACE_WITH_YOUR_REAL_CONFIG",
  messagingSenderId: "REPLACE_WITH_YOUR_REAL_CONFIG",
  appId: "REPLACE_WITH_YOUR_REAL_CONFIG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
