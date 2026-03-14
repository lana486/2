"use client";

import { useEffect, useMemo, useState } from "react";

type CheckQuestion = {
  prompt: string;
  options: string[];
  correct: number;
};

type ContentBlock = {
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
};

const blocks: ContentBlock[] = [
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
  },
];

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
  const [activeBlock, setActiveBlock] = useState(blocks[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = window.localStorage.getItem("teacher-grammar-notes");
    if (saved) {
      setNotes(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("teacher-grammar-notes", notes);
  }, [notes]);

  const activeContent = blocks.find((block) => block.id === activeBlock) ?? blocks[0];

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
          </div>
          <div className="teacher-hub-stats">
            <article>
              <span>Format</span>
              <strong>Topic blocks</strong>
            </article>
            <article>
              <span>Content</span>
              <strong>Methodology materials</strong>
            </article>
            <article>
              <span>Teacher Tool</span>
              <strong>Notes + quiz</strong>
            </article>
          </div>
        </div>

        <section className="teacher-topic-grid">
          {blocks.map((block) => (
            <button
              key={block.id}
              type="button"
              className={`teacher-topic-card ${activeBlock === block.id ? "active" : ""}`}
              onClick={() => setActiveBlock(block.id)}
            >
              <div className="teacher-topic-art">{block.imageLabel}</div>
              <div>
                <p className="eyebrow">Material Topic</p>
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
