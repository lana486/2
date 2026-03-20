export type TeacherMaterialImage = {
  src: string;
  name: string;
};

export type TeacherMaterial = {
  id: string;
  title: string;
  description: string;
  article: string;
  coverLabel: string;
  coverStyle: string;
  tags: string[];
  images: TeacherMaterialImage[];
  source: "core" | "published";
  authorId?: string;
};

type LegacyTeacherMaterial = {
  id?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  imageLabel?: string;
  spotlight?: string;
  points?: string[];
  examples?: string[];
  tips?: string[];
  source?: "core" | "published";
};

export const TEACHER_MATERIALS_STORAGE_KEY = "teacher-hub-published-materials";
export const TEACHER_ACTIVE_MATERIAL_KEY = "teacher-hub-active-material";
export const TEACHER_AUTHOR_ID_KEY = "teacher-hub-author-id";

export const teacherTagOptions = [
  "Grammar",
  "Speaking",
  "Writing",
  "Reading",
  "Methodology",
  "Activities",
  "Revision",
  "Visual support",
  "Communicative",
  "Young learners",
  "Adults",
  "A1-A2",
  "B1-B2",
] as const;

export const teacherCoverOptions = [
  { id: "sky", label: "Soft Blue" },
  { id: "forest", label: "Forest Green" },
  { id: "plum", label: "Deep Plum" },
  { id: "sand", label: "Warm Sand" },
  { id: "midnight", label: "Midnight Navy" },
  { id: "coral", label: "Coral Glow" },
] as const;

export const defaultTeacherMaterials: TeacherMaterial[] = [
  {
    id: "context",
    title: "Teach Grammar In Context",
    description: "How to introduce grammar through situations, visuals, and meaning before explanation.",
    article: `A strong grammar lesson usually starts with meaning, not with the rule written on the board. When learners first see the language inside a real situation, they can connect form with purpose. A short dialogue, a visual scene, a story, or a listening excerpt gives grammar a reason to exist.

The practical implication is simple: before naming the tense or structure, give students something concrete to react to. A picture of a busy airport can introduce requests, future plans, or modal verbs. A short classroom dialogue can model polite offers. A story or diary entry can show how grammar works over time instead of as a single sentence in isolation.

Context also lowers resistance. Learners are less likely to freeze if the first task is understanding who is speaking, what is happening, and why the language matters. After that, the teacher can guide students toward the pattern itself.

One of the most useful classroom habits is to delay the full explanation for a moment. Let students notice repeated chunks, compare examples, and make an initial guess. This makes the explanation shorter later, because students already have something meaningful to attach it to.

In practice, this means we do not begin with "Today we learn the future tense." We begin with a plan, a schedule, a conversation, or a choice. The grammar point becomes easier to remember because students remember the scene first.`,
    coverLabel: "Dialogue + visual scene",
    coverStyle: "sky",
    tags: ["Grammar", "Methodology", "Visual support", "Communicative", "A1-A2"],
    images: [],
    source: "core",
  },
  {
    id: "communication",
    title: "Build Communicative Practice",
    description: "Turn grammar into decisions, exchanges, and pair work instead of static gap fills only.",
    article: `Grammar becomes durable when learners need it in order to do something. That is why communicative practice matters: students are not just repeating forms, they are exchanging missing information, solving a small problem, planning together, or reacting to someone else's ideas.

Information-gap tasks are especially useful because they create a genuine reason to speak. If one student knows the travel schedule and the other does not, future forms and question structures suddenly become purposeful. The same idea works with diaries, role cards, picture differences, menus, timetables, and classroom maps.

Role play is another powerful bridge between form and use. A polite request feels different when the student is actually "in" a restaurant, hotel, or meeting. The grammar becomes part of a social action. This is much stronger than practising the same sentence as an isolated example.

The teacher's job here is to make the task clear enough that students understand the goal, but open enough that the target language has to be produced. If the task can be completed with one-word answers or by reading directly from the worksheet, the communicative value drops quickly.

The best communicative grammar tasks have three qualities: a clear objective, a real information gap or interaction need, and a natural reason for the target structure to appear. When those are present, grammar stops feeling like an academic exercise and starts feeling like usable language.`,
    coverLabel: "Role play + pair task",
    coverStyle: "forest",
    tags: ["Speaking", "Grammar", "Communicative", "Activities", "Adults"],
    images: [],
    source: "core",
  },
  {
    id: "noticing",
    title: "Check Meaning And Notice Patterns",
    description: "Use concept questions and guided comparison to verify understanding instead of asking 'Do you understand?'.",
    article: `One of the biggest teaching mistakes in grammar work is assuming that a student's confidence means real understanding. A learner can say "yes" to a rule explanation and still misuse the structure a minute later. That is why concept questions are so valuable.

Good concept questions test meaning, not terminology. They are short, simpler than the target language, and focused on the exact distinction the student needs to understand. For example, instead of asking whether a form is "future continuous", a teacher can ask whether the action is arranged, imagined, finished, or happening at a specific future time.

Noticing tasks work well before or after explanation. Students compare two or three examples and identify what changes. They look for repeated shapes, time markers, auxiliary verbs, or limits on what sounds possible. This turns grammar into something discoverable rather than something delivered as a lecture.

Comparison is especially effective when two forms are often confused. Learners can compare a timetable future with a personal arrangement, or a rule with a polite suggestion, and then explain why each example works. That kind of contrast builds accuracy much faster than memorising one isolated model sentence.

In short, concept questions check meaning, noticing tasks reveal pattern, and comparison tasks sharpen boundaries. Together they make grammar teaching much more precise and much less dependent on vague teacher intuition.`,
    coverLabel: "Concept board + contrasts",
    coverStyle: "plum",
    tags: ["Grammar", "Methodology", "Revision", "B1-B2"],
    images: [],
    source: "core",
  },
  {
    id: "revision",
    title: "Recycle And Revise Actively",
    description: "Revision works best as a regular design principle, not as a last-minute recap before a test.",
    article: `Grammar fades quickly if students only meet it once. Revision is not a rescue tool for the end of a unit; it is part of the teaching cycle. Effective teachers bring target forms back through short, active tasks that require attention and choice.

This does not mean endless worksheet repetition. Good revision can be light, fast, and still serious. Mime, sentence auctions, mini quizzes, keyword dictation, object prompts, and sorting tasks all work because they force learners to notice form again while staying alert.

Sentence auctions are particularly useful when students broadly understand the meaning but keep making form errors. Learners have to decide which sentence is acceptable, justify their choice, and often defend it. That process exposes uncertainty much more clearly than silent correction.

Physical prompts also help. Real objects, flashcards, movement, and board races make language easier to recall because students connect the form to an action or image. This is especially useful in mixed-energy groups or after a dense explanation stage.

The practical takeaway is that revision should be planned in small loops. A lesson can open with a quick retrieval task, recycle the target structure during communication, and then revisit it in a fast reflective activity at the end. Frequent, deliberate returns beat occasional long reviews almost every time.`,
    coverLabel: "Auction + game cards",
    coverStyle: "sand",
    tags: ["Revision", "Activities", "Grammar", "Methodology", "Young learners"],
    images: [],
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

export function createTeacherAuthorId() {
  if (typeof globalThis !== "undefined" && typeof globalThis.crypto?.randomUUID === "function") {
    return `author-${globalThis.crypto.randomUUID()}`;
  }

  return `author-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getTeacherAuthorId(storage: Pick<Storage, "getItem" | "setItem">) {
  const savedAuthorId = storage.getItem(TEACHER_AUTHOR_ID_KEY);
  if (savedAuthorId) {
    return savedAuthorId;
  }

  const nextAuthorId = createTeacherAuthorId();
  storage.setItem(TEACHER_AUTHOR_ID_KEY, nextAuthorId);
  return nextAuthorId;
}

export function getTeacherMaterialHref(materialId: string) {
  return `/teachers/grammar-basics/${encodeURIComponent(materialId)}`;
}

export function normalizeTeacherMaterial(input: unknown): TeacherMaterial | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const material = input as Partial<TeacherMaterial & LegacyTeacherMaterial>;

  if (typeof material.title !== "string" || !material.title.trim()) {
    return null;
  }

  if (typeof material.article === "string" && typeof material.description === "string") {
    return {
      id: typeof material.id === "string" && material.id ? material.id : createPublishedMaterialId(),
      title: material.title.trim(),
      description: material.description.trim(),
      article: material.article.trim(),
      coverLabel: typeof material.coverLabel === "string" && material.coverLabel.trim() ? material.coverLabel.trim() : material.title.trim(),
      coverStyle: typeof material.coverStyle === "string" && material.coverStyle.trim() ? material.coverStyle.trim() : "sky",
      tags: Array.isArray(material.tags) ? material.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0) : [],
      images: Array.isArray(material.images)
        ? material.images.filter(
            (image): image is TeacherMaterialImage =>
              Boolean(image) &&
              typeof image === "object" &&
              typeof image.src === "string" &&
              typeof image.name === "string",
          )
        : [],
      source: material.source === "published" ? "published" : "core",
      authorId: typeof material.authorId === "string" && material.authorId.trim() ? material.authorId.trim() : undefined,
    };
  }

  const legacySections = [
    typeof material.summary === "string" ? material.summary.trim() : "",
    typeof material.spotlight === "string" && material.spotlight.trim()
      ? `Teaching focus: ${material.spotlight.trim()}`
      : "",
    Array.isArray(material.points) && material.points.length > 0
      ? `Key ideas:\n${material.points.map((point) => `- ${point}`).join("\n")}`
      : "",
    Array.isArray(material.examples) && material.examples.length > 0
      ? `Classroom applications:\n${material.examples.map((example) => `- ${example}`).join("\n")}`
      : "",
    Array.isArray(material.tips) && material.tips.length > 0
      ? `Teaching tips:\n${material.tips.map((tip) => `- ${tip}`).join("\n")}`
      : "",
  ].filter(Boolean);

  return {
    id: typeof material.id === "string" && material.id ? material.id : createPublishedMaterialId(),
    title: material.title.trim(),
    description:
      (typeof material.subtitle === "string" && material.subtitle.trim()) ||
      (typeof material.summary === "string" && material.summary.trim()) ||
      "Teacher material",
    article: legacySections.join("\n\n"),
    coverLabel:
      typeof material.imageLabel === "string" && material.imageLabel.trim()
        ? material.imageLabel.trim()
        : material.title.trim(),
    coverStyle: "sky",
    tags: [],
    images: [],
    source: material.source === "published" ? "published" : "core",
    authorId: typeof material.authorId === "string" && material.authorId.trim() ? material.authorId.trim() : undefined,
  };
}

export function normalizeTeacherMaterials(input: unknown): TeacherMaterial[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.map(normalizeTeacherMaterial).filter((material): material is TeacherMaterial => material !== null);
}

export function assignTeacherMaterialOwnership(materials: TeacherMaterial[], authorId: string) {
  let hasChanges = false;

  const nextMaterials = materials.map((material) => {
    if (material.source === "published" && !material.authorId) {
      hasChanges = true;
      return { ...material, authorId };
    }

    return material;
  });

  return { materials: nextMaterials, hasChanges };
}

export function savePublishedTeacherMaterials(
  storage: Pick<Storage, "setItem">,
  materials: TeacherMaterial[],
) {
  storage.setItem(TEACHER_MATERIALS_STORAGE_KEY, JSON.stringify(materials));
}

export function readPublishedTeacherMaterials(
  storage: Pick<Storage, "getItem" | "setItem" | "removeItem">,
  authorId: string,
) {
  const savedMaterials = storage.getItem(TEACHER_MATERIALS_STORAGE_KEY);
  if (!savedMaterials) {
    return [];
  }

  try {
    const normalizedMaterials = normalizeTeacherMaterials(JSON.parse(savedMaterials));
    const { materials, hasChanges } = assignTeacherMaterialOwnership(normalizedMaterials, authorId);

    if (hasChanges) {
      savePublishedTeacherMaterials(storage, materials);
    }

    return materials;
  } catch {
    storage.removeItem(TEACHER_MATERIALS_STORAGE_KEY);
    return [];
  }
}
