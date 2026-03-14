"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MaterialItem = {
  name: string;
  type: string;
};

type LessonCard = {
  title: string;
  topic: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  duration: string;
  focus: string;
  imageLabel: string;
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

const lessonCards: LessonCard[] = [
  {
    title: "Talking About Future Plans",
    topic: "Grammar",
    level: "A2",
    duration: "40 min",
    focus: "going to, will, personal arrangements",
    imageLabel: "Future timeline",
  },
  {
    title: "Restaurant Role Play",
    topic: "Speaking",
    level: "A1",
    duration: "35 min",
    focus: "ordering food, polite requests, confidence",
    imageLabel: "Cafe dialogue",
  },
  {
    title: "Travel Problems And Solutions",
    topic: "Travel",
    level: "B1",
    duration: "45 min",
    focus: "airport issues, problem solving, useful phrases",
    imageLabel: "Airport board",
  },
  {
    title: "Professional Emails",
    topic: "Business",
    level: "B2",
    duration: "50 min",
    focus: "email tone, writing structure, formal vocabulary",
    imageLabel: "Inbox layout",
  },
  {
    title: "IELTS Speaking Part 2 Builder",
    topic: "Exam Prep",
    level: "C1",
    duration: "55 min",
    focus: "fluency, coherence, timing, topic expansion",
    imageLabel: "Cue card",
  },
  {
    title: "Daily Routines Vocabulary",
    topic: "Vocabulary",
    level: "A1",
    duration: "30 min",
    focus: "verbs, time phrases, repetition practice",
    imageLabel: "Routine cards",
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

  function useLessonCard(lesson: LessonCard) {
    setTopic(lesson.title);
    setNotes(`Selected studio template: ${lesson.focus}. Adapt for the group and add AI-supported materials if needed.`);
  }

  return (
    <section className="studio-shell">
      <div className="studio-intro">
        <p className="eyebrow">Lesson Studio</p>
        <h1>Browse lesson topics, filter by level, and build your next class.</h1>
        <p className="lead">
          Teachers can first browse ready-made lesson directions by topic and level. Then they can adapt one of them or
          create a custom AI lesson brief below.
        </p>
      </div>

      <section className="studio-browser">
        <div className="section-header-row">
          <div>
            <p className="eyebrow">Lesson Filters</p>
            <h2>Find a lesson direction by topic and level</h2>
          </div>
          <span className="section-badge">{filteredLessons.length} lessons found</span>
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
            <article key={`${lesson.title}-${lesson.level}`} className="studio-lesson-card">
              <div className="studio-lesson-art">{lesson.imageLabel}</div>
              <div className="studio-lesson-meta">
                <div className="studio-lesson-topline">
                  <span>{lesson.topic}</span>
                  <span>{lesson.level}</span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.focus}</p>
                <div className="studio-lesson-footer">
                  <strong>{lesson.duration}</strong>
                  <button type="button" className="button button-secondary" onClick={() => useLessonCard(lesson)}>
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
