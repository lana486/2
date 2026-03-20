"use client";

import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { featuredTemplates, lessonCards, type LessonPreview } from "@/lib/lesson-studio-lessons";

type MaterialItem = {
  name: string;
  type: string;
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

export function LessonStudioForm() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [lessonFrame, setLessonFrame] = useState(lessonFrames[0]);
  const [methodology, setMethodology] = useState(methodologies[0]);
  const [notes, setNotes] = useState("");
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [activeTopic, setActiveTopic] = useState<(typeof topicFilters)[number]>("All");
  const [activeLevel, setActiveLevel] = useState<(typeof levelFilters)[number]>("All");

  const filteredLessons = useMemo(() => {
    return lessonCards.filter((lesson) => {
      const topicMatch = activeTopic === "All" || lesson.topic === activeTopic;
      const levelMatch = activeLevel === "All" || lesson.level === activeLevel;
      return topicMatch && levelMatch;
    });
  }, [activeTopic, activeLevel]);

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
    router.push(`/lesson-studio/lessons/${lesson.slug}`);
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
          <div className="learnflow-searchbar studio-hero-searchbar">
            <input
              type="text"
              value="Search subjects, topics, or standards (e.g., Future forms for speaking lessons)"
              readOnly
            />
            <button type="button" className="button learnflow-primary">
              Search
            </button>
          </div>
          <div className="studio-hero-stats">
            <span>120+ lesson directions</span>
            <span>AI-ready formats</span>
            <span>Teacher workflows</span>
          </div>
          <div className="learnflow-pill-row studio-hero-pill-row">
            <span className="learnflow-pill-label">Popular filters</span>
            {popularFilters.map((pill) => (
              <span key={pill} className="learnflow-pill">
                {pill}
              </span>
            ))}
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

        <section className="studio-featured-content">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">Featured Content</p>
              <h2>Ready-made templates to save you hours</h2>
            </div>
            <p className="studio-inline-note">Use one as-is or send it into the AI builder below.</p>
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
