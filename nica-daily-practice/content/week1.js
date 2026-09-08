/* ============================================================
   WEEK CONTENT FILE
   ------------------------------------------------------------
   To create a new week:
   1. Copy this file to week2.js (etc).
   2. Change WEEK_CONTENT.id, .number, .theme, .description.
   3. Edit each day's title, goal, modules and speakingMission.
   4. Update index.html to load the new file (see the <script>
      tag near the bottom of index.html / day.html) and set it
      as CURRENT_WEEK_FILE in js/settings.js.

   Nothing here needs to match code elsewhere — the app reads
   whatever is inside WEEK_CONTENT and renders it automatically.
   ============================================================ */

window.WEEK_CONTENT = {
  id: "week1",
  number: 1,
  theme: "My Daily Life",
  description: "Talk about your everyday routine in English.",

  days: [
    // ---------------------------------------------------- DAY 1
    {
      day: 1,
      title: "Vocabulary in Action",
      subtitle: "Learn words for your daily routine",
      goal: "Learn and use new English vocabulary in sentences about your real life.",
      modules: [
        {
          type: "vocabulary",
          data: {
            words: [
              { word: "wake up", meaning: "to stop sleeping", example: "I wake up at 6:00 AM." },
              { word: "commute", meaning: "to travel to work or school", example: "I commute by bus." },
              { word: "routine", meaning: "the things you do regularly", example: "My morning routine is short." }
            ]
          }
        },
        {
          type: "multipleChoice",
          data: {
            question: "What do you usually do after work?",
            options: ["I cooking dinner.", "I cook dinner.", "I cooks dinner.", "I am cook dinner."],
            correctIndex: 1,
            feedback: "Good job — remember: I / you / we / they + base verb."
          }
        },
        {
          type: "completeSentence",
          data: {
            sentence: "I usually ______ at 6:00 AM.",
            answers: ["wake up", "wake"],
            feedback: "Nice! 'Wake up' is the phrase we use for this."
          }
        },
        {
          type: "sentenceBuilder",
          data: {
            words: ["usually", "I", "at 6:00", "wake up"],
            answer: "I usually wake up at 6:00.",
            personalPrompt: "Now write your own sentence using the same structure."
          }
        },
        {
          type: "makeItPersonal",
          data: {
            prompt: "I usually ______ before work.",
            helper: "Think about one real thing you do every morning."
          }
        }
      ],
      speakingMission: {
        instructions: "Tell your coach about your morning.",
        minTime: 30,
        hints: ["wake up", "usually", "before work", "routine"]
      }
    },

    // ---------------------------------------------------- DAY 2
    {
      day: 2,
      title: "Build Sentences",
      subtitle: "Put your daily routine into full sentences",
      goal: "Practice building complete sentences about daily habits and routines.",
      modules: [
        {
          type: "sentenceBuilder",
          data: {
            words: ["every day", "coffee", "I", "drink"],
            answer: "I drink coffee every day.",
            personalPrompt: "Write your own sentence with 'every day'."
          }
        },
        {
          type: "errorCorrection",
          data: {
            wrong: "He go to work every day.",
            correct: "He goes to work every day.",
            feedback: "Remember: he / she / it needs an -s on the verb."
          }
        },
        {
          type: "completeSentence",
          data: {
            sentence: "She ______ (work) from home on Fridays.",
            answers: ["works"],
            feedback: "Correct — third person singular takes -s."
          }
        },
        {
          type: "makeItPersonal",
          data: {
            prompt: "Right now, I am ______.",
            helper: "Describe what you are doing at this exact moment."
          }
        }
      ],
      speakingMission: {
        instructions: "Talk about your life using the structures you practiced today.",
        minTime: 45,
        hints: ["every day", "usually", "on Fridays"]
      }
    },

    // ---------------------------------------------------- DAY 3
    {
      day: 3,
      title: "Listening",
      subtitle: "Understand real spoken English",
      goal: "Listen for the main idea and specific details in a short recording.",
      modules: [
        {
          type: "listening",
          data: {
            audioUrl: "",
            transcript: "Hi, I'm Ana. Every morning I wake up at six, I make coffee, and I take the bus to work. After work, I usually cook dinner and relax for a while before I go to sleep.",
            questions: [
              {
                type: "multipleChoice",
                question: "How does Ana get to work?",
                options: ["She walks.", "She takes the bus.", "She drives."],
                correctIndex: 1
              },
              {
                type: "trueFalse",
                question: "Ana cooks dinner before work.",
                correctAnswer: false
              },
              {
                type: "completeSentence",
                question: "Ana wakes up at ______.",
                answers: ["six", "6", "6:00"]
              }
            ],
            shadowingSentences: [
              "Every morning I wake up at six.",
              "I usually cook dinner and relax."
            ]
          }
        }
      ],
      speakingMission: {
        instructions: "Explain what you understood from today's listening.",
        minTime: 40,
        hints: ["Ana", "wake up", "bus", "cook dinner"]
      }
    },

    // ---------------------------------------------------- DAY 4
    {
      day: 4,
      title: "Speaking",
      subtitle: "Answer real questions out loud",
      goal: "Produce spoken English by answering personal questions about your routine.",
      modules: [
        {
          type: "speakingQuestions",
          data: {
            questions: [
              "What do you usually do after work?",
              "What time do you usually wake up?",
              "What is the hardest part of your day?"
            ],
            ideas: ["morning", "commute", "job", "family", "relax"]
          }
        },
        {
          type: "makeItPersonal",
          data: {
            prompt: "This weekend, I am going to ______.",
            helper: "Say one real plan, even a small one."
          }
        }
      ],
      speakingMission: {
        instructions: "Answer today's questions and speak for at least 60 seconds.",
        minTime: 60,
        hints: ["usually", "wake up", "hardest part"]
      }
    },

    // ---------------------------------------------------- DAY 5
    {
      day: 5,
      title: "Real Life English",
      subtitle: "Use everything in a real situation",
      goal: "Handle a realistic conversation using this week's vocabulary and structures.",
      modules: [
        {
          type: "realLifeConversation",
          data: {
            situation: "Meeting Someone New",
            exchanges: [
              { coach: "Hi! Nice to meet you. What do you do?" },
              { coach: "How long have you been learning English?" },
              { coach: "What are you going to do this weekend?" }
            ]
          }
        }
      ],
      speakingMission: {
        instructions: "Complete the final real-life speaking challenge for this week.",
        minTime: 60,
        hints: ["nice to meet you", "I've been learning", "this weekend"]
      }
    }
  ]
};
