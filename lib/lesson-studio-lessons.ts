export type LessonPreview = {
  slug: string;
  title: string;
  topic: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "A2-B1" | "A1-A2" | "B1-B2";
  duration: string;
  description: string;
  tags: string[];
  coverLabel: string;
  lessonLink: string;
  colorClass: string;
  author?: string;
  rating?: string;
};

export const lessonCards: LessonPreview[] = [
  {
    slug: "talking-about-future-plans",
    title: "Talking About Future Plans",
    topic: "Grammar",
    level: "A2",
    duration: "40 min",
    description: "Students compare future forms through timeline prompts, pair planning, and short speaking tasks about personal arrangements.",
    tags: ["going to", "will", "arrangements"],
    coverLabel: "Future timeline",
    lessonLink: "https://miro.com/app/board/uXjV-example-future-plans/",
    colorClass: "studio-card-blue",
  },
  {
    slug: "restaurant-role-play",
    title: "Restaurant Role Play",
    topic: "Speaking",
    level: "A1",
    duration: "35 min",
    description: "A beginner-friendly role play lesson for ordering food, practicing polite requests, and building confidence in everyday situations.",
    tags: ["ordering food", "polite requests", "confidence"],
    coverLabel: "Cafe dialogue",
    lessonLink: "https://miro.com/app/board/uXjV-example-restaurant-role-play/",
    colorClass: "studio-card-green",
  },
  {
    slug: "travel-problems-and-solutions",
    title: "Travel Problems And Solutions",
    topic: "Travel",
    level: "B1",
    duration: "45 min",
    description: "Learners work through missed flights, hotel mix-ups, and travel delays using useful phrases for problem solving.",
    tags: ["airport issues", "problem solving", "travel phrases"],
    coverLabel: "Airport board",
    lessonLink: "https://miro.com/app/board/uXjV-example-travel-problems/",
    colorClass: "studio-card-sand",
  },
  {
    slug: "professional-emails",
    title: "Professional Emails",
    topic: "Business",
    level: "B2",
    duration: "50 min",
    description: "A writing-focused lesson on subject lines, tone, paragraph structure, and formal business vocabulary for clear emails.",
    tags: ["email tone", "writing structure", "formal vocabulary"],
    coverLabel: "Inbox layout",
    lessonLink: "https://miro.com/app/board/uXjV-example-professional-emails/",
    colorClass: "studio-card-purple",
  },
  {
    slug: "ielts-speaking-part-2-builder",
    title: "IELTS Speaking Part 2 Builder",
    topic: "Exam Prep",
    level: "C1",
    duration: "55 min",
    description: "Students build stronger long-turn answers with cue-card planning, timing drills, and topic expansion practice.",
    tags: ["fluency", "coherence", "timing"],
    coverLabel: "Cue card",
    lessonLink: "https://miro.com/app/board/uXjV-example-ielts-speaking-builder/",
    colorClass: "studio-card-blue",
  },
  {
    slug: "daily-routines-vocabulary",
    title: "Daily Routines Vocabulary",
    topic: "Vocabulary",
    level: "A1",
    duration: "30 min",
    description: "A simple vocabulary lesson with daily routine verbs, time phrases, picture prompts, and repetition-based recall.",
    tags: ["verbs", "time phrases", "repetition"],
    coverLabel: "Routine cards",
    lessonLink: "https://miro.com/app/board/uXjV-example-daily-routines/",
    colorClass: "studio-card-green",
  },
];

export const featuredTemplates: LessonPreview[] = [
  {
    slug: "future-forms-workshop",
    title: "Future Forms Workshop",
    topic: "English",
    level: "A2-B1",
    duration: "45 min",
    description: "A ready-made lesson with timeline visuals, guided grammar discovery, and speaking practice.",
    tags: ["future forms", "visual learning", "interactive"],
    coverLabel: "Future timeline",
    lessonLink: "https://miro.com/app/board/uXjV-example-future-forms-workshop/",
    colorClass: "studio-card-blue",
    author: "Olena Koval",
    rating: "4.9",
  },
  {
    slug: "travel-english-essentials",
    title: "Travel English Essentials",
    topic: "Speaking",
    level: "A1-A2",
    duration: "40 min",
    description: "Role-play driven material for airports, hotels, directions, and survival phrases.",
    tags: ["travel", "role play", "speaking"],
    coverLabel: "Travel board",
    lessonLink: "https://miro.com/app/board/uXjV-example-travel-english-essentials/",
    colorClass: "studio-card-green",
    author: "Mila Brown",
    rating: "4.8",
  },
  {
    slug: "professional-email-builder",
    title: "Professional Email Builder",
    topic: "Writing",
    level: "B1-B2",
    duration: "60 min",
    description: "Structured writing lesson with tone guidance, model phrases, and AI correction prompts.",
    tags: ["business", "writing", "email"],
    coverLabel: "Inbox layout",
    lessonLink: "https://miro.com/app/board/uXjV-example-professional-email-builder/",
    colorClass: "studio-card-purple",
    author: "James Wilson",
    rating: "4.7",
  },
];

export const allLessonPreviews = [...featuredTemplates, ...lessonCards];

export function getLessonBySlug(slug: string) {
  return allLessonPreviews.find((lesson) => lesson.slug === slug);
}
