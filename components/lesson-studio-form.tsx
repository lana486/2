"use client";

import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MaterialItem = {
  name: string;
  type: string;
};

type LessonPreview = {
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

const lessonFrames = [
  "Presentation -> Practice -> Production",
  "Warm-up -> Guided discovery -> Communication",
  "Project-based lesson",
  "Exam-focused lesson",
];

const methodologies = [
  "Communicative approach",
  "Lexical approach",
  "Task-based learning",
  "PPP with controlled progression",
];

const topicFilters = ["All", "Speaking", "Grammar", "Vocabulary", "Business", "Travel", "Exam Prep"] as const;
const levelFilters = ["All", "A1", "A2", "B1", "B2", "C1"] as const;
const popularFilters = ["Interactive", "Worksheets", "Presentations", "Grammar", "Reading"] as const;

const lessonCards: LessonPreview[] = [
  {
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

const featuredTemplates: LessonPreview[] = [
  {
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

export function LessonStudioForm() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [lessonFrame, setLessonFrame] = useState(lessonFrames[0]);
  const [methodology, setMethodology] = useState(methodologies[0]);
  const [notes, setNotes] = useState("");
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [activeTopic, setActiveTopic] = useState<(typeof topicFilters)[number]>("All");
  const [activeLevel, setActiveLevel] = useState<(typeof levelFilters)[number]>("All");
  const [selectedLesson, setSelectedLesson] = useState<LessonPreview | null>(null);

  const filteredLessons = useMemo(() => {
    return lessonCards.filter((lesson) => {
      const topicMatch = activeTopic === "All" || lesson.topic === activeTopic;
      const levelMatch = activeLevel === "All" || lesson.level === activeLevel;
      return topicMatch && levelMatch;
    });
  }, [activeTopic, activeLevel]);

  useEffect(() => {
    if (!selectedLesson) {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLesson(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedLesson]);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setMaterials(
      files.map((file) => ({
        name: file.name,
        type: file.type || "file",
      })),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      topic,
      lessonFrame,
      methodology,
      notes,
      materials,
    };

    window.sessionStorage.setItem("lesson-studio-draft", JSON.stringify(payload));
    router.push("/lesson-studio/generated");
  }

  function useLessonCard(lesson: LessonPreview) {
    setTopic(lesson.title);
    setNotes(`Selected studio template: ${lesson.tags.join(", ")}. Adapt for the group and add AI-supported materials if needed.`);
  }

  function openLesson(lesson: LessonPreview) {
    setSelectedLesson(lesson);
  }

  function closeLesson() {
    setSelectedLesson(null);
  }

  function openCardFromKeyboard(event: KeyboardEvent<HTMLElement>, lesson: LessonPreview) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLesson(lesson);
    }
  }

  return (
    <section className="studio-shell">
      <section className="studio-hero-panel">
        <div className="studio-intro">
          <p className="eyebrow">Lesson Studio</p>
          <h1>Discover ready-made lesson directions for your next class.</h1>
          <p className="lead">
            Filter by topic and level, browse polished lesson cards, and then send the selected idea into the builder
            below for AI adaptation.
          </p>
          <div className="studio-hero-stats">
            <span>120+ lesson directions</span>
            <span>AI-ready formats</span>
            <span>Teacher workflows</span>
          </div>
        </div>
        <div className="studio-hero-visual">
          <div className="studio-hero-window studio-hero-window-main" />
          <div className="studio-hero-window studio-hero-window-side" />
          <div className="studio-hero-chip-row">
            <span>Grammar</span>
            <span>Speaking</span>
            <span>Writing</span>
          </div>
        </div>
      </section>

      <section className="studio-browser">
        <div className="section-header-row">
          <div>
            <p className="eyebrow">Lesson Filters</p>
            <h2>Find a lesson direction by topic and level</h2>
          </div>
          <p className="studio-results-note">{filteredLessons.length} lesson directions match your filters right now.</p>
        </div>

        <section className="studio-market-search">
          <div className="learnflow-search-copy">
            <p className="eyebrow">Find Materials</p>
            <h2>Find the perfect material for your next class</h2>
          </div>
          <div className="learnflow-searchbar">
            <input
              type="text"
              value="Search subjects, topics, or standards (e.g., Future forms for speaking lessons)"
              readOnly
            />
            <button type="button" className="button learnflow-primary">
              Search
            </button>
          </div>
          <div className="learnflow-pill-row">
            <span className="learnflow-pill-label">Popular filters:</span>
            {popularFilters.map((pill) => (
              <span key={pill} className="learnflow-pill">
                {pill}
              </span>
            ))}
          </div>
        </section>

        <section className="studio-featured-content">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">Featured Content</p>
              <h2>Ready-made templates to save you hours</h2>
            </div>
            <span className="studio-inline-note">Use one as-is or send it into the AI builder below.</span>
          </div>

          <div className="learnflow-template-grid studio-template-grid">
            {featuredTemplates.map((card) => (
              <article
                key={card.title}
                className="learnflow-template-card learnflow-template-card-clickable"
                role="button"
                tabIndex={0}
                onClick={() => openLesson(card)}
                onKeyDown={(event) => openCardFromKeyboard(event, card)}
              >
                <div className={`learnflow-template-top ${card.colorClass}`}>
                  <span className="learnflow-template-badge">Premium</span>
                  <h3>{card.title}</h3>
                </div>
                <div className="learnflow-template-body">
                  <p className="learnflow-template-meta">
                    {card.topic} · {card.level} · {card.duration}
                  </p>
                  <p>{card.description}</p>
                  <div className="learnflow-tag-row">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="learnflow-template-footer">
                    <strong>{card.author}</strong>
                    <span>{card.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="studio-toolbar">
          <div className="studio-search-lite">
            <input type="text" value="Search lesson types, outcomes, or grammar targets" readOnly />
          </div>
        </div>

        <div className="studio-filter-groups">
          <div className="studio-filter-row">
            <span className="studio-filter-label">Topics</span>
            <div className="studio-chip-wrap">
              {topicFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`studio-chip ${activeTopic === item ? "active" : ""}`}
                  onClick={() => setActiveTopic(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="studio-filter-row">
            <span className="studio-filter-label">Levels</span>
            <div className="studio-chip-wrap">
              {levelFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`studio-chip ${activeLevel === item ? "active" : ""}`}
                  onClick={() => setActiveLevel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="studio-lesson-grid">
          {filteredLessons.map((lesson) => (
            <article
              key={`${lesson.title}-${lesson.level}`}
              className="studio-lesson-card studio-lesson-card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => openLesson(lesson)}
              onKeyDown={(event) => openCardFromKeyboard(event, lesson)}
            >
              <div className={`studio-lesson-art ${lesson.colorClass}`}>
                <span className="studio-lesson-art-badge">{lesson.topic}</span>
                <strong>{lesson.coverLabel}</strong>
              </div>
              <div className="studio-lesson-meta">
                <div className="studio-lesson-topline">
                  <span>{lesson.level}</span>
                  <span>{lesson.duration}</span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <div className="studio-lesson-footer">
                  <strong>Ready to adapt</strong>
                  <button
                    type="button"
                    className="button learnflow-secondary"
                    onClick={(event) => {
                      event.stopPropagation();
                      useLessonCard(lesson);
                    }}
                  >
                    Use In Builder
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedLesson ? (
        <div className="lesson-modal-backdrop" onClick={closeLesson}>
          <section
            className="lesson-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="lesson-modal-close" onClick={closeLesson} aria-label="Close lesson details">
              ×
            </button>

            <div className={`lesson-modal-cover ${selectedLesson.colorClass}`}>
              <span className="lesson-modal-cover-badge">{selectedLesson.topic}</span>
              <strong>{selectedLesson.coverLabel}</strong>
            </div>

            <div className="lesson-modal-meta">
              <span>{selectedLesson.level}</span>
              {selectedLesson.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              <span>{selectedLesson.duration}</span>
            </div>

            <div className="lesson-modal-body">
              <h3 id="lesson-modal-title">{selectedLesson.title}</h3>
              <p>{selectedLesson.description}</p>
              <a
                href={selectedLesson.lessonLink}
                target="_blank"
                rel="noreferrer"
                className="button button-primary lesson-modal-link"
              >
                Open lesson in Miro
              </a>
            </div>
          </section>
        </div>
      ) : null}

      <form className="studio-form" onSubmit={handleSubmit}>
        <div className="section-header-row">
          <div>
            <p className="eyebrow">Custom Builder</p>
            <h2>Turn a selected topic into an AI lesson brief</h2>
          </div>
        </div>

        <label>
          Lesson topic
          <input
            type="text"
            placeholder="For example: Ordering food in a restaurant"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            required
          />
        </label>

        <div className="studio-two-col">
          <label>
            Lesson frame
            <select value={lessonFrame} onChange={(event) => setLessonFrame(event.target.value)}>
              {lessonFrames.map((frame) => (
                <option key={frame} value={frame}>
                  {frame}
                </option>
              ))}
            </select>
          </label>

          <label>
            Methodology
            <select value={methodology} onChange={(event) => setMethodology(event.target.value)}>
              {methodologies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          AI materials
          <input type="file" accept="image/*,video/*" multiple onChange={handleFiles} />
        </label>

        <div className="material-list">
          {materials.length > 0 ? (
            materials.map((material) => (
              <span key={material.name}>
                {material.name} · {material.type.startsWith("video") ? "Video" : "Image"}
              </span>
            ))
          ) : (
            <span>No materials added yet</span>
          )}
        </div>

        <label>
          Notes for AI
          <textarea
            placeholder="Student level, target grammar, vocabulary focus, speaking goal, class timing, special requests..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={7}
          />
        </label>

        <button type="submit" className="button button-primary">
          Generate Lesson Draft
        </button>
      </form>
    </section>
  );
}
