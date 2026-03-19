"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TEACHER_ACTIVE_MATERIAL_KEY,
  TEACHER_MATERIALS_STORAGE_KEY,
  defaultTeacherMaterials,
  type TeacherMaterial,
} from "@/lib/teacher-materials";

const finalTest = [
  {
    prompt: "What usually comes before detailed language focus in reading-based grammar work?",
    options: ["General understanding of the text", "Word-by-word translation", "Immediate rule explanation"],
    correct: 0,
  },
  {
    prompt: "Which activity is highlighted for realistic communication practice?",
    options: ["Information gap", "Silent grammar copying", "Only substitution drill"],
    correct: 0,
  },
  {
    prompt: "What is the core logic of an upside-down lesson?",
    options: ["Do the task first, then fill language gaps", "Skip practice completely", "Teach only through tests"],
    correct: 0,
  },
  {
    prompt: "Why are concept questions stronger than 'Do you understand'?",
    options: ["They check understanding through evidence", "They avoid meaning work", "They only test memory"],
    correct: 0,
  },
];

export function TeacherGrammarHub() {
  const [publishedMaterials, setPublishedMaterials] = useState<TeacherMaterial[]>([]);
  const allMaterials = useMemo(() => [...publishedMaterials, ...defaultTeacherMaterials], [publishedMaterials]);
  const fallbackMaterial = allMaterials[0] ?? defaultTeacherMaterials[0];
  const [activeBlock, setActiveBlock] = useState(defaultTeacherMaterials[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedMaterials = window.localStorage.getItem(TEACHER_MATERIALS_STORAGE_KEY);
    if (savedMaterials) {
      try {
        const parsed = JSON.parse(savedMaterials) as TeacherMaterial[];
        if (Array.isArray(parsed)) {
          setPublishedMaterials(parsed);
        }
      } catch {
        window.localStorage.removeItem(TEACHER_MATERIALS_STORAGE_KEY);
      }
    }

    const saved = window.localStorage.getItem("teacher-grammar-notes");
    if (saved) {
      setNotes(saved);
    }

    const savedActive = window.sessionStorage.getItem(TEACHER_ACTIVE_MATERIAL_KEY);
    if (savedActive) {
      setActiveBlock(savedActive);
      window.sessionStorage.removeItem(TEACHER_ACTIVE_MATERIAL_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("teacher-grammar-notes", notes);
  }, [notes]);

  useEffect(() => {
    if (!allMaterials.some((block) => block.id === activeBlock) && fallbackMaterial) {
      setActiveBlock(fallbackMaterial.id);
    }
  }, [activeBlock, allMaterials, fallbackMaterial]);

  const activeContent = allMaterials.find((block) => block.id === activeBlock) ?? fallbackMaterial;

  const testScore = useMemo(
    () => finalTest.reduce((score, item, index) => score + (testAnswers[index] === item.correct ? 1 : 0), 0),
    [testAnswers],
  );

  return (
    <main className="page-stack">
      <section className="teacher-hub-shell">
        <div className="teacher-hub-hero">
          <div>
            <p className="eyebrow">Teacher Hub</p>
            <h1>Interactive materials for grammar teachers</h1>
            <p className="lead">
              When a teacher opens this page, they should first see clear topic blocks. After choosing one, they get
              a structured material page with key ideas, examples, quick checks, and space for notes.
            </p>
            <div className="teacher-hub-actions">
              <Link href="/teachers/publish" className="button learnflow-primary">
                Add Teacher Material
              </Link>
              <span className="teacher-hub-inline-note">Published materials appear here automatically.</span>
            </div>
          </div>
          <div className="teacher-hub-stats">
            <article>
              <span>Format</span>
              <strong>Topic blocks</strong>
            </article>
            <article>
              <span>Content</span>
              <strong>{allMaterials.length} materials available</strong>
            </article>
            <article>
              <span>Teacher Tool</span>
              <strong>Notes + quiz</strong>
            </article>
          </div>
        </div>

        <section className="teacher-topic-grid">
          {allMaterials.map((block) => (
            <button
              key={block.id}
              type="button"
              className={`teacher-topic-card ${activeBlock === block.id ? "active" : ""}`}
              onClick={() => setActiveBlock(block.id)}
            >
              <div className="teacher-topic-art">{block.imageLabel}</div>
              <div>
                <p className="eyebrow">{block.source === "published" ? "Published Material" : "Material Topic"}</p>
                <h2>{block.title}</h2>
                <p>{block.subtitle}</p>
              </div>
            </button>
          ))}
        </section>

        <section className="teacher-content-layout">
          <div className="teacher-content-main">
            <section className="teacher-lesson-header">
              <div className="teacher-lesson-copy">
                <p className="eyebrow">Selected Material</p>
                <h2>{activeContent.title}</h2>
                <p className="lead">{activeContent.summary}</p>
              </div>
              <div className="teacher-lesson-image">
                <div className="teacher-lesson-image-tag">{activeContent.imageLabel}</div>
              </div>
            </section>

            <section className="teacher-spotlight-card">
              <p className="eyebrow">Teaching Spotlight</p>
              <h3>{activeContent.spotlight}</h3>
            </section>

            <section className="teacher-module-grid">
              <article className="teacher-card rich-teacher-card">
                <p className="eyebrow">Key Ideas</p>
                <ul className="exercise-list">
                  {activeContent.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>

              <article className="teacher-card rich-teacher-card">
                <p className="eyebrow">Classroom Applications</p>
                <ul className="exercise-list">
                  {activeContent.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="teacher-tip-strip">
              {activeContent.tips.map((tip) => (
                <span key={tip}>{tip}</span>
              ))}
            </section>

            <section className="teacher-card self-check-card">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Self-Check</p>
                  <h2>Questions after the material</h2>
                </div>
                <span className="section-badge">Quick understanding check</span>
              </div>

              {activeContent.checks.map((question, index) => {
                const key = `${activeContent.id}-${index}`;
                return (
                  <div key={key} className="teacher-question">
                    <h3>{question.prompt}</h3>
                    <div className="teacher-option-list">
                      {question.options.map((option, optionIndex) => {
                        const selected = answers[key] === optionIndex;
                        const isCorrect = optionIndex === question.correct;

                        return (
                          <button
                            key={option}
                            type="button"
                            className={`teacher-option ${selected ? "selected" : ""} ${
                              selected && isCorrect ? "correct" : ""
                            }`}
                            onClick={() => setAnswers((current) => ({ ...current, [key]: optionIndex }))}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="teacher-final-test">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Final Test</p>
                  <h2>Short methodology quiz</h2>
                </div>
                <span className="section-badge">
                  Score {testScore}/{finalTest.length}
                </span>
              </div>

              <div className="teacher-test-grid compact-test-grid">
                {finalTest.map((item, index) => (
                  <article key={item.prompt} className="teacher-card">
                    <p className="eyebrow">Question {index + 1}</p>
                    <h3>{item.prompt}</h3>
                    <div className="teacher-option-list">
                      {item.options.map((option, optionIndex) => (
                        <button
                          key={option}
                          type="button"
                          className={`teacher-option ${testAnswers[index] === optionIndex ? "selected" : ""}`}
                          onClick={() => setTestAnswers((current) => ({ ...current, [index]: optionIndex }))}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="teacher-notes-sidebar">
            <section className="teacher-notes-panel teacher-notes-sticky">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Notes</p>
                  <h2>Teaching notes</h2>
                </div>
                <span className="section-badge">Saved automatically</span>
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Write your reflections, lesson ideas, adaptations, classroom reminders, or examples you want to reuse..."
                rows={16}
              />
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
