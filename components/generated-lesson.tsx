"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MaterialItem = {
  name: string;
  type: string;
};

type Draft = {
  topic: string;
  lessonFrame: string;
  methodology: string;
  notes: string;
  materials: MaterialItem[];
};

function buildLesson(draft: Draft) {
  const objective = `Students will use English confidently around "${draft.topic}" through structured speaking, guided language focus, and contextual practice.`;
  const vocabulary = [
    `Core topic language related to ${draft.topic}`,
    "Useful collocations for natural speaking",
    "High-frequency classroom support phrases",
    "Functional expressions for pair discussion",
  ];
  const grammar = [
    "Target structure explained in short, teacher-friendly steps",
    "Model sentences connected to the lesson topic",
    "Common learner mistakes to anticipate and correct",
  ];
  const speakingTasks = [
    `Pair role-play connected to ${draft.topic}`,
    "Prompt cards for guided discussion",
    "Fluency round with timed speaking turns",
  ];
  const homework = [
    "Short written reflection using target vocabulary",
    "Audio or speaking task for homework follow-up",
    "Review worksheet with 6 to 8 focused questions",
  ];
  const printable = [
    "Lesson objective and timing",
    "Vocabulary bank",
    "Grammar focus and examples",
    "Speaking prompts",
    "Homework block",
  ];

  return {
    objective,
    sections: [
      {
        title: "Warm-up",
        text: `Quick activation around ${draft.topic}. Start with visual prompts, simple discussion questions, and prior knowledge recall.`,
      },
      {
        title: "Language Focus",
        text: `Use the ${draft.methodology.toLowerCase()} to highlight target vocabulary, grammar patterns, and useful functional phrases.`,
      },
      {
        title: "Controlled Practice",
        text: `Move through the frame "${draft.lessonFrame}" with short guided drills, substitution tasks, and pair-check moments.`,
      },
      {
        title: "Communication Task",
        text: `Students complete a speaking task connected to ${draft.topic}, using target language in a realistic scenario.`,
      },
      {
        title: "Reflection and Homework",
        text: "Finish with a recap, error review, self-assessment prompt, and one short follow-up task for independent practice.",
      },
    ],
    vocabulary,
    grammar,
    speakingTasks,
    homework,
    printable,
  };
}

export function GeneratedLesson() {
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("lesson-studio-draft");

    if (!raw) {
      return;
    }

    setDraft(JSON.parse(raw) as Draft);
  }, []);

  if (!draft) {
    return (
      <main className="page-stack">
        <section className="generated-shell">
          <div className="generated-header">
            <p className="eyebrow">No Draft Found</p>
            <h1>There is no lesson data yet.</h1>
            <p className="lead">Go back to the teacher workspace, fill in the form, and generate the lesson draft again.</p>
            <Link href="/lesson-studio" className="button button-primary">
              Back To Lesson Studio
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const lesson = buildLesson(draft);

  return (
    <main className="page-stack">
      <section className="generated-shell">
        <div className="generated-header">
          <p className="eyebrow">AI Generated Draft</p>
          <h1>{draft.topic}</h1>
          <p className="lead">{lesson.objective}</p>
        </div>

        <div className="generated-meta">
          <article>
            <span>Lesson frame</span>
            <strong>{draft.lessonFrame}</strong>
          </article>
          <article>
            <span>Methodology</span>
            <strong>{draft.methodology}</strong>
          </article>
          <article>
            <span>Materials</span>
            <strong>{draft.materials.length ? `${draft.materials.length} attached` : "No uploads"}</strong>
          </article>
        </div>

        <div className="generated-grid">
          {lesson.sections.map((section) => (
            <article key={section.title} className="generated-card">
              <p className="eyebrow">{section.title}</p>
              <p>{section.text}</p>
            </article>
          ))}
        </div>

        <section className="lesson-pack-grid">
          <article className="lesson-pack-card">
            <p className="eyebrow">Vocabulary</p>
            <h2>Target language set</h2>
            <ul>
              {lesson.vocabulary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="lesson-pack-card">
            <p className="eyebrow">Grammar</p>
            <h2>Language focus</h2>
            <ul>
              {lesson.grammar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="lesson-pack-card">
            <p className="eyebrow">Speaking Tasks</p>
            <h2>Production stage</h2>
            <ul>
              {lesson.speakingTasks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="lesson-pack-card">
            <p className="eyebrow">Homework</p>
            <h2>Follow-up practice</h2>
            <ul>
              {lesson.homework.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="printable-block">
          <div className="printable-copy">
            <p className="eyebrow">Printable Structure</p>
            <h2>One-page teacher handout structure</h2>
            <p>
              This condensed format is designed for printing or exporting later as a clean lesson outline for classroom use.
            </p>
          </div>
          <div className="printable-list">
            {lesson.printable.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="generated-notes">
          <div>
            <p className="eyebrow">Teacher Notes</p>
            <p>{draft.notes || "No additional notes were provided."}</p>
          </div>
          <div>
            <p className="eyebrow">Attached Materials</p>
            <div className="material-list">
              {draft.materials.length ? (
                draft.materials.map((material) => (
                  <span key={material.name}>
                    {material.name} · {material.type.startsWith("video") ? "Video" : "Image"}
                  </span>
                ))
              ) : (
                <span>No materials attached</span>
              )}
            </div>
          </div>
        </section>

        <div className="cta-actions">
          <Link href="/lesson-studio" className="button button-secondary">
            Edit Input
          </Link>
          <Link href="/lesson-studio/builder" className="button button-primary">
            Continue To Full Lesson Builder
          </Link>
        </div>
      </section>
    </main>
  );
}
