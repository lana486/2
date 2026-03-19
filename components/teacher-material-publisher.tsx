"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  TEACHER_ACTIVE_MATERIAL_KEY,
  TEACHER_MATERIALS_STORAGE_KEY,
  createPublishedMaterialId,
  parseLines,
  type TeacherMaterial,
} from "@/lib/teacher-materials";

type QuestionDraft = {
  prompt: string;
  options: [string, string, string];
  correct: number;
};

const defaultQuestion = (): QuestionDraft => ({
  prompt: "",
  options: ["", "", ""],
  correct: 0,
});

export function TeacherMaterialPublisher() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [imageLabel, setImageLabel] = useState("");
  const [spotlight, setSpotlight] = useState("");
  const [points, setPoints] = useState("");
  const [examples, setExamples] = useState("");
  const [tips, setTips] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([defaultQuestion(), defaultQuestion()]);

  const preview = useMemo(
    () => ({
      title: title || "Your material title",
      subtitle: subtitle || "Short subtitle for the topic card",
      summary:
        summary ||
        "This summary will appear inside Teacher Hub as the main introduction to your teaching material.",
      imageLabel: imageLabel || "Visual label",
      spotlight: spotlight || "Add the one-sentence teaching idea you want the reader to remember.",
      points: parseLines(points),
      examples: parseLines(examples),
      tips: parseLines(tips),
    }),
    [title, subtitle, summary, imageLabel, spotlight, points, examples, tips],
  );

  function updateQuestion(index: number, field: keyof QuestionDraft, value: string | number) {
    setQuestions((current) =>
      current.map((question, questionIndex) =>
        questionIndex === index ? { ...question, [field]: value } : question,
      ),
    );
  }

  function updateOption(questionIndex: number, optionIndex: number, value: string) {
    setQuestions((current) =>
      current.map((question, currentIndex) => {
        if (currentIndex !== questionIndex) {
          return question;
        }

        const options = [...question.options] as [string, string, string];
        options[optionIndex] = value;
        return { ...question, options };
      }),
    );
  }

  function publishMaterial() {
    const publishedChecks = questions
      .filter((question) => question.prompt.trim() && question.options.every((option) => option.trim()))
      .map((question) => ({
        prompt: question.prompt.trim(),
        options: question.options.map((option) => option.trim()),
        correct: question.correct,
      }));

    const material: TeacherMaterial = {
      id: createPublishedMaterialId(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      summary: summary.trim(),
      imageLabel: imageLabel.trim() || "Teacher-created material",
      spotlight: spotlight.trim(),
      points: parseLines(points),
      examples: parseLines(examples),
      tips: parseLines(tips),
      checks:
        publishedChecks.length > 0
          ? publishedChecks
          : [
              {
                prompt: "What is the key teaching aim of this material?",
                options: ["Clarify the method", "Skip structured practice", "Avoid learner interaction"],
                correct: 0,
              },
            ],
      source: "published",
    };

    const current = window.localStorage.getItem(TEACHER_MATERIALS_STORAGE_KEY);
    let existing: TeacherMaterial[] = [];

    if (current) {
      try {
        const parsed = JSON.parse(current) as TeacherMaterial[];
        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      } catch {
        window.localStorage.removeItem(TEACHER_MATERIALS_STORAGE_KEY);
      }
    }

    const next = [material, ...existing];

    window.localStorage.setItem(TEACHER_MATERIALS_STORAGE_KEY, JSON.stringify(next));
    window.sessionStorage.setItem(TEACHER_ACTIVE_MATERIAL_KEY, material.id);
    router.push("/teachers/grammar-basics");
  }

  const isDisabled =
    !title.trim() || !subtitle.trim() || !summary.trim() || !spotlight.trim() || parseLines(points).length === 0;

  return (
    <main className="page-stack">
      <section className="teacher-publisher-shell">
        <section className="teacher-publisher-hero">
          <div>
            <p className="eyebrow">Teacher Publisher</p>
            <h1>Create a new material for Teacher Hub</h1>
            <p className="lead">
              Fill in the teaching summary, key ideas, classroom applications, and quick self-check questions. After
              publishing, the material appears directly in Teacher Hub.
            </p>
          </div>
          <div className="teacher-publisher-stat-grid">
            <article>
              <span>Flow</span>
              <strong>Create -> Publish -> Review in Hub</strong>
            </article>
            <article>
              <span>Storage</span>
              <strong>Saved locally in browser</strong>
            </article>
            <article>
              <span>Best for</span>
              <strong>Teacher-created methodology materials</strong>
            </article>
          </div>
        </section>

        <section className="teacher-publisher-layout">
          <section className="teacher-publisher-form">
            <div className="section-header-row">
              <div>
                <p className="eyebrow">Material Form</p>
                <h2>Build the content block</h2>
              </div>
            </div>

            <div className="teacher-publisher-grid">
              <label>
                Material title
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Teach modal verbs through scenarios" />
              </label>
              <label>
                Subtitle
                <input
                  value={subtitle}
                  onChange={(event) => setSubtitle(event.target.value)}
                  placeholder="Real-life choices, advice tasks, and controlled comparison"
                />
              </label>
            </div>

            <label>
              Summary
              <textarea
                rows={5}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="Describe what this material teaches and how a teacher should use it."
              />
            </label>

            <div className="teacher-publisher-grid">
              <label>
                Image label
                <input value={imageLabel} onChange={(event) => setImageLabel(event.target.value)} placeholder="Scenario cards + modal chart" />
              </label>
              <label>
                Teaching spotlight
                <input
                  value={spotlight}
                  onChange={(event) => setSpotlight(event.target.value)}
                  placeholder="State the single most important teaching idea."
                />
              </label>
            </div>

            <div className="teacher-publisher-grid teacher-publisher-grid-wide">
              <label>
                Key ideas
                <textarea
                  rows={6}
                  value={points}
                  onChange={(event) => setPoints(event.target.value)}
                  placeholder={"One point per line\nUse context before isolated drilling\nGive learners decisions to make"}
                />
              </label>
              <label>
                Classroom applications
                <textarea
                  rows={6}
                  value={examples}
                  onChange={(event) => setExamples(event.target.value)}
                  placeholder={"One example per line\nRole-play with advice scenarios\nCard sort for obligation vs suggestion"}
                />
              </label>
            </div>

            <label>
              Quick teaching tips
              <textarea
                rows={4}
                value={tips}
                onChange={(event) => setTips(event.target.value)}
                placeholder={"One short tip per line\nKeep concept questions shorter than the target language"}
              />
            </label>

            <section className="teacher-publisher-question-block">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Self-Check</p>
                  <h2>Add quick questions</h2>
                </div>
              </div>

              <div className="teacher-publisher-question-grid">
                {questions.map((question, index) => (
                  <article key={`question-${index}`} className="teacher-card teacher-builder-question-card">
                    <label>
                      Question {index + 1}
                      <input
                        value={question.prompt}
                        onChange={(event) => updateQuestion(index, "prompt", event.target.value)}
                        placeholder="What should learners understand first?"
                      />
                    </label>

                    {question.options.map((option, optionIndex) => (
                      <label key={`option-${index}-${optionIndex}`}>
                        Option {optionIndex + 1}
                        <input
                          value={option}
                          onChange={(event) => updateOption(index, optionIndex, event.target.value)}
                          placeholder={`Answer option ${optionIndex + 1}`}
                        />
                      </label>
                    ))}

                    <label>
                      Correct option
                      <select
                        value={question.correct}
                        onChange={(event) => updateQuestion(index, "correct", Number(event.target.value))}
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            </section>

            <button type="button" className="button learnflow-primary" onClick={publishMaterial} disabled={isDisabled}>
              Publish To Teacher Hub
            </button>
          </section>

          <aside className="teacher-publisher-preview">
            <div className="section-header-row">
              <div>
                <p className="eyebrow">Preview</p>
                <h2>How it will look in Teacher Hub</h2>
              </div>
            </div>

            <article className="teacher-topic-card teacher-topic-card-preview active">
              <div className="teacher-topic-art">{preview.imageLabel}</div>
              <div>
                <p className="eyebrow">Published Material</p>
                <h2>{preview.title}</h2>
                <p>{preview.subtitle}</p>
              </div>
            </article>

            <section className="teacher-card rich-teacher-card">
              <p className="eyebrow">Summary</p>
              <p>{preview.summary}</p>
            </section>

            <section className="teacher-spotlight-card">
              <p className="eyebrow">Teaching Spotlight</p>
              <h3>{preview.spotlight}</h3>
            </section>

            <section className="teacher-card">
              <p className="eyebrow">Key ideas preview</p>
              <ul className="exercise-list">
                {(preview.points.length > 0 ? preview.points : ["Add a few lines in Key ideas to preview them here."]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="teacher-tip-strip">
              {(preview.tips.length > 0 ? preview.tips : ["Tips will appear here after you add them."]).map((tip) => (
                <span key={tip}>{tip}</span>
              ))}
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
