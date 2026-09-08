/* ============================================================
   PROGRESS
   Handles per-student progress in Firestore. Content (weeks/
   days/activities) never lives here — only completion state.

   Firestore shape:
   users/{uid}/progress/{weekId}
     { weekNumber, theme, days: { "1": {status, completedAt,
       audioSent} , ... }, updatedAt }
   users/{uid}/meta/streak
     { count, lastPracticeDate: "YYYY-MM-DD" }
   ============================================================ */

const Progress = {
  _uid() {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user.");
    return user.uid;
  },

  async loadWeek(weekContent) {
    const uid = this._uid();
    const ref = db.collection("users").doc(uid)
      .collection("progress").doc(weekContent.id);
    const snap = await ref.get();
    if (!snap.exists) {
      return { weekNumber: weekContent.number, theme: weekContent.theme, days: {} };
    }
    return snap.data();
  },

  async markDayCompleted(weekContent, dayNumber, { audioSent, audioPath }) {
    const uid = this._uid();
    const ref = db.collection("users").doc(uid)
      .collection("progress").doc(weekContent.id);

    const today = new Date().toISOString().slice(0, 10);

    await ref.set({
      weekNumber: weekContent.number,
      theme: weekContent.theme,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      days: {
        [dayNumber]: {
          status: "completed",
          completedAt: today,
          audioSent: !!audioSent,
          audioPath: audioPath || null
        }
      }
    }, { merge: true });

    await this._bumpStreak(today);
  },

  async _bumpStreak(todayStr) {
    const uid = this._uid();
    const ref = db.collection("users").doc(uid).collection("meta").doc("streak");
    const snap = await ref.get();
    const data = snap.exists ? snap.data() : { count: 0, lastPracticeDate: null };

    if (data.lastPracticeDate === todayStr) {
      // Already practiced today, streak doesn't change.
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const newCount = data.lastPracticeDate === yesterdayStr ? (data.count || 0) + 1 : 1;

    await ref.set({ count: newCount, lastPracticeDate: todayStr }, { merge: true });
  },

  async getStreak() {
    const uid = this._uid();
    const snap = await db.collection("users").doc(uid).collection("meta").doc("streak").get();
    return snap.exists ? snap.data().count || 0 : 0;
  },

  async loadAllWeeks() {
    const uid = this._uid();
    const snap = await db.collection("users").doc(uid).collection("progress")
      .orderBy("weekNumber", "asc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  streakMessage(streak) {
    if (streak <= 0) return "Start your week. Practice today.";
    if (streak <= 2) return "Good start. Keep going.";
    if (streak <= 4) return "You're building consistency.";
    return "Week completed. Excellent consistency.";
  },

  countCompleted(weekProgress) {
    if (!weekProgress || !weekProgress.days) return 0;
    return Object.values(weekProgress.days).filter(d => d.status === "completed").length;
  }
};
