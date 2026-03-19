export type CheckQuestion = {
  prompt: string;
  options: string[];
  correct: number;
};

export type TeacherMaterial = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  imageLabel: string;
  spotlight: string;
  points: string[];
  examples: string[];
  tips: string[];
  checks: CheckQuestion[];
  source: "core" | "published";
};

export const TEACHER_MATERIALS_STORAGE_KEY = "teacher-hub-published-materials";
export const TEACHER_ACTIVE_MATERIAL_KEY = "teacher-hub-active-material";

export const defaultTeacherMaterials: TeacherMaterial[] = [
  {
    id: "context",
    title: "Teach Grammar In Context",
    subtitle: "Dialogues, pictures, stories, flashcards, and listening cues.",
    summary:
      "This material focuses on presenting grammar through meaningful classroom situations. Instead of isolating forms too early, the teacher gives learners context, visual support, and understandable input first.",
    imageLabel: "Dialogue + picture cues",
    spotlight: "The teaching guide keeps returning to one principle: grammar is easier to learn when meaning comes before pressure.",
    points: [
      "Use context to help learners connect grammar with situation, people, and purpose.",
      "Pictures and dialogues support understanding without heavy explanation.",
      "Listening and reading can model grammar naturally before students speak.",
      "Context makes later practice more memorable because learners remember the situation, not just the rule.",
    ],
    examples: [
      "Imperatives combine well with movement and classroom actions.",
      "Flashcards can cue tense forms, modal verbs, questions, and comparisons.",
      "Dialogues are especially useful for requests, invitations, and offers.",
    ],
    tips: [
      "Start with scene and meaning.",
      "Use visuals before metalanguage.",
      "Let learners notice examples first.",
    ],
    checks: [
      {
        prompt: "Why does context matter in early grammar teaching?",
        options: [
          "It helps learners understand meaning before focusing on form",
          "It avoids target language completely",
          "It replaces all practice work",
        ],
        correct: 0,
      },
      {
        prompt: "Which support tool is presented as flexible for many grammar points?",
        options: ["Flashcards", "Only translation lists", "Only grammar tables"],
        correct: 0,
      },
    ],
    source: "core",
  },
  {
    id: "communication",
    title: "Build Communicative Practice",
    subtitle: "Information gaps, role plays, diaries, and imaginary situations.",
    summary:
      "This material turns grammar into communication. Learners use the language to exchange information, make plans, ask questions, and respond in realistic or semi-realistic tasks.",
    imageLabel: "Role play + diary board",
    spotlight: "The guide treats grammar as something learners do together, not only something they label.",
    points: [
      "Information gaps create a genuine need to speak because learners do not hold the same information.",
      "Role play expands classroom reality and helps grammar feel purposeful.",
      "Diaries, schedules, and timetables are practical tools for future forms and question work.",
      "Imaginary situations improve memory because they are surprising, unusual, or humorous.",
    ],
    examples: [
      "A diary can first introduce going to and later become a pair information-gap task.",
      "A role play preparation frame helps clarify the situation and speaker roles.",
      "Future plans are easier to practise when learners compare schedules and make decisions.",
    ],
    tips: [
      "Make the information gap real.",
      "Clarify who is speaking and why.",
      "Use strange or memorable scenarios.",
    ],
    checks: [
      {
        prompt: "What makes an information gap effective?",
        options: [
          "Learners need to exchange missing information",
          "Everyone has identical content",
          "The teacher gives all the answers first",
        ],
        correct: 0,
      },
      {
        prompt: "Which language area does the guide connect strongly with diary work?",
        options: ["Going to for future plans", "Reported speech only", "Third conditional only"],
        correct: 0,
      },
    ],
    source: "core",
  },
  {
    id: "noticing",
    title: "Check Meaning And Notice Patterns",
    subtitle: "Concept questions, comparison work, and example-based noticing.",
    summary:
      "This material is about clarity and evidence. Instead of asking vague comprehension questions, teachers use concept questions and noticing activities to verify what learners really understand.",
    imageLabel: "Concept questions board",
    spotlight: "The strongest idea here is that accurate checking beats vague confirmation every time.",
    points: [
      "Concept questions are more reliable than asking learners if they understand.",
      "Good concept questions use language simpler than the target item.",
      "Noticing tasks help learners compare structures and discover usage patterns.",
      "Example sentences can be adapted so learners infer rules instead of receiving long explanations first.",
    ],
    examples: [
      "Learners compare timetable future and personal arrangement future.",
      "Missing-word tasks reveal common structural patterns.",
      "Sentence comparison helps students see what is possible and impossible in English.",
    ],
    tips: [
      "Ask short questions with short answers.",
      "Check meaning before pushing accuracy.",
      "Use contrast to make patterns visible.",
    ],
    checks: [
      {
        prompt: "Why are concept questions valuable?",
        options: [
          "They provide better evidence of learner understanding",
          "They remove the need for practice",
          "They mainly test spelling",
        ],
        correct: 0,
      },
      {
        prompt: "What is the aim of a noticing task?",
        options: [
          "Help learners detect patterns and constraints in language",
          "Replace all speaking work",
          "Force memorization without context",
        ],
        correct: 0,
      },
    ],
    source: "core",
  },
  {
    id: "revision",
    title: "Recycle And Revise Actively",
    subtitle: "Miming, quizzes, real objects, sentence auctions, and revision games.",
    summary:
      "This material emphasizes that revision is not an optional extra. Learners need repeated, active returns to grammar through short, engaging, accuracy-focused activities.",
    imageLabel: "Auction + game cards",
    spotlight: "Revision is presented as ongoing teaching design, not as an emergency activity before a test.",
    points: [
      "Revision should happen frequently, not only at the end of a unit.",
      "Games can support serious teaching when they require careful decisions about language.",
      "Sentence auctions are useful when learners confuse form detail and word order.",
      "Real objects and mime make grammar more physical and more memorable.",
    ],
    examples: [
      "Keyword dictation shifts attention from spelling to grammar choice.",
      "Sentence auctions push learners to judge correctness collaboratively.",
      "Real objects can support speculation, retelling, and modal meaning.",
    ],
    tips: [
      "Keep revision short and regular.",
      "Use competition only when it supports noticing.",
      "Choose games that require decisions, not passive recall.",
    ],
    checks: [
      {
        prompt: "What is the main value of revision games in this guide?",
        options: [
          "They revisit previously studied language in engaging ways",
          "They replace lesson planning",
          "They are useful only for advanced learners",
        ],
        correct: 0,
      },
      {
        prompt: "When does sentence auctioning work especially well?",
        options: [
          "When meaning is fairly clear but form detail causes confusion",
          "Only in pronunciation lessons",
          "Only in one-to-one teaching",
        ],
        correct: 0,
      },
    ],
    source: "core",
  },
];

export function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function createPublishedMaterialId() {
  return `published-${Date.now()}`;
}
