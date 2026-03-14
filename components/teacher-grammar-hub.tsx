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
  points: string[];
  examples: string[];
  checks: CheckQuestion[];
};

const blocks: ContentBlock[] = [
  {
    id: "context",
    title: "Teach Grammar In Context",
    subtitle: "Use input before pressure: listening, pictures, dialogues, flashcards, and stories.",
    points: [
      "The book repeatedly models grammar through meaningful context before asking learners to produce it immediately.",
      "Listening-and-doing, flashcards, dialogues, and pictures work as cues that lower pressure and make grammar easier to remember.",
      "Stories and reading texts help learners see how grammar functions inside a complete message, not only as isolated forms.",
    ],
    examples: [
      "Imperatives can be combined with classroom actions and prepositions of place.",
      "Flashcards can cue tenses, modal verbs, questions, and comparison structures.",
      "Dialogues are especially useful for functional language such as requests, invitations, and offers.",
    ],
    checks: [
      {
        prompt: "Why does context matter in early grammar teaching?",
        options: [
          "It lets learners understand meaning before focusing on form",
          "It avoids using any target language",
          "It replaces all practice activities",
        ],
        correct: 0,
      },
      {
        prompt: "Which support tool is presented as a flexible cue for many grammar points?",
        options: ["Flashcards", "Only grammar tables", "Translation lists"],
        correct: 0,
      },
    ],
  },
  {
    id: "communication",
    title: "Build Communicative Practice",
    subtitle: "Use information gaps, role play, diaries, and imaginary situations.",
    points: [
      "Information gaps create a real need to communicate because learners hold different pieces of information.",
      "Role play expands classroom reality and makes practice more motivating when the context and roles are clear.",
      "Diaries, schedules, and timetables work especially well for future forms and question practice.",
    ],
    examples: [
      "A diary can introduce going to and later become a pair information-gap task.",
      "A role play preparation box can clarify who is speaking, where, and why.",
      "Imaginary situations improve memorization because they are unusual, funny, or surprising.",
    ],
    checks: [
      {
        prompt: "What makes an information gap effective?",
        options: [
          "Learners need to exchange missing information",
          "Everyone has exactly the same text",
          "The teacher gives all the answers first",
        ],
        correct: 0,
      },
      {
        prompt: "Which structure does the book connect strongly with diary tasks?",
        options: ["Going to for future plans", "Third conditional only", "Reported speech only"],
        correct: 0,
      },
    ],
  },
  {
    id: "noticing",
    title: "Check Meaning And Notice Patterns",
    subtitle: "Use concept questions, noticing tasks, and example sentences.",
    points: [
      "Concept questions are more reliable than simply asking learners if they understand.",
      "Good concept questions usually use simpler language and invite short, clear answers.",
      "Noticing activities help learners compare forms, identify missing language, and detect patterns across examples.",
    ],
    examples: [
      "Learners compare future meanings in timetables versus personal arrangements.",
      "Missing-word tasks can show multiple uses of one common verb like got, make, or go.",
      "Example sentences can be adapted so learners infer rules instead of only receiving them.",
    ],
    checks: [
      {
        prompt: "Why are concept questions valuable?",
        options: [
          "They give the teacher better evidence of learner understanding",
          "They remove the need for practice",
          "They are mainly used to test spelling",
        ],
        correct: 0,
      },
      {
        prompt: "What is the main aim of a noticing task?",
        options: [
          "Help learners detect patterns and constraints in language",
          "Make learners memorize without context",
          "Replace all speaking work",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "revision",
    title: "Recycle And Revise Actively",
    subtitle: "Use quizzes, miming, real objects, auctioning sentences, and short revision games.",
    points: [
      "Revision should be frequent and active, not reserved for the end of term.",
      "Games still serve a serious teaching purpose when they force learners to evaluate accuracy and meaning.",
      "Techniques like sentence auctions are especially useful when learners confuse form details and word order.",
    ],
    examples: [
      "Keyword dictation focuses learners on grammar choices, not only spelling.",
      "Real objects add curiosity and can cue modal verbs, narrative retelling, or speculation.",
      "Auctioning sentences makes learners identify correct and incorrect structures collaboratively.",
    ],
    checks: [
      {
        prompt: "What is the main value of revision games in this book?",
        options: [
          "They revisit previously studied language in engaging ways",
          "They replace lesson planning",
          "They are only for advanced groups",
        ],
        correct: 0,
      },
      {
        prompt: "When does sentence auctioning work particularly well?",
        options: [
          "When grammar meaning is fairly clear but form details cause confusion",
          "Only with pronunciation drills",
          "Only in one-to-one classes",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "glossary",
    title: "Use A Clear Teaching Toolkit",
    subtitle: "Pair work, presentation, practice, tasks, drills, eliciting, monitoring, feedback.",
    points: [
      "The glossary emphasizes the difference between presentation, practice, and task stages.",
      "Pair work and small-group structures dramatically increase learner talking time.",
      "Eliciting, monitoring, scaffolding, and feedback form the core teacher behaviors around grammar practice.",
    ],
    examples: [
      "Pair work allows every learner to speak instead of waiting for whole-class turns.",
      "Monitoring means observing discreetly to check instructions, performance, and emerging errors.",
      "A timeline can support tense comparison visually.",
    ],
    checks: [
      {
        prompt: "Which classroom organization increases learner talking time most directly?",
        options: ["Pair work", "Teacher monologue", "Silent reading only"],
        correct: 0,
      },
      {
        prompt: "What does monitoring mean in the glossary?",
        options: [
          "Watching and listening without unnecessary interruption",
          "Correcting every sentence immediately",
          "Reading from the coursebook aloud",
        ],
        correct: 0,
      },
    ],
  },
];

const finalTest = [
  {
    prompt: "According to the book, what should usually come before detailed language focus in reading-based grammar work?",
    options: ["General understanding of the text", "Translation of each word", "Immediate grammar rules"],
    correct: 0,
  },
  {
    prompt: "Which activity is highlighted for realistic, natural communication practice?",
    options: ["Information gap", "Copying sentences only", "Silent grammar charts"],
    correct: 0,
  },
  {
    prompt: "What is the principle behind an upside-down lesson?",
    options: ["Do the task first, then fill the language gap", "Remove all practice", "Teach only with tests"],
    correct: 0,
  },
  {
    prompt: "Why are concept questions stronger than 'Do you understand'?",
    options: ["They check understanding through evidence", "They take less time because there is no thinking", "They avoid meaning work"],
    correct: 0,
  },
  {
    prompt: "Which technique is recommended for accuracy revision of form details?",
    options: ["Auctioning sentences", "Only storytelling", "Only brainstorming"],
    correct: 0,
  },
  {
    prompt: "What does the glossary say a task usually has?",
    options: ["A real goal or outcome", "Only teacher explanation", "No learner communication"],
    correct: 0,
  },
];

export function TeacherGrammarHub() {
  const [openBlock, setOpenBlock] = useState(blocks[0].id);
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

  const testScore = useMemo(() => {
    return finalTest.reduce((score, item, index) => {
      return score + (testAnswers[index] === item.correct ? 1 : 0);
    }, 0);
  }, [testAnswers]);

  return (
    <main className="page-stack">
      <section className="teacher-hub-shell">
        <div className="teacher-hub-hero">
          <div>
            <p className="eyebrow">Teacher Interactive Materials</p>
            <h1>Teaching Grammar Basics</h1>
            <p className="lead">
              A new interactive page built from the ideas in <em>Basics - Teaching Grammar</em>: contextual presentation,
              communicative practice, concept checking, active revision, and a usable teaching toolkit.
            </p>
          </div>
          <div className="teacher-hub-stats">
            <article>
              <span>Source</span>
              <strong>Oxford teaching guide</strong>
            </article>
            <article>
              <span>Focus</span>
              <strong>Grammar methodology</strong>
            </article>
            <article>
              <span>Format</span>
              <strong>Study + self-check + final test</strong>
            </article>
          </div>
        </div>

        <div className="teacher-hub-layout">
          <aside className="teacher-hub-sidebar">
            <p className="eyebrow">Sections</p>
            {blocks.map((block) => (
              <button
                key={block.id}
                type="button"
                className={`teacher-side-link ${openBlock === block.id ? "active" : ""}`}
                onClick={() => setOpenBlock(block.id)}
              >
                {block.title}
              </button>
            ))}
            <a href="#final-test" className="teacher-side-anchor">
              Final Test
            </a>
            <a href="#teacher-notes" className="teacher-side-anchor">
              Notes
            </a>
          </aside>

          <div className="teacher-hub-main">
            {blocks.map((block) => (
              <section
                key={block.id}
                id={block.id}
                className={`teacher-module ${openBlock === block.id ? "expanded" : ""}`}
              >
                <button type="button" className="teacher-module-toggle" onClick={() => setOpenBlock(block.id)}>
                  <div>
                    <p className="eyebrow">Module</p>
                    <h2>{block.title}</h2>
                    <p>{block.subtitle}</p>
                  </div>
                  <span>{openBlock === block.id ? "−" : "+"}</span>
                </button>

                {openBlock === block.id ? (
                  <div className="teacher-module-body">
                    <div className="teacher-module-grid">
                      <article className="teacher-card">
                        <p className="eyebrow">Key Ideas</p>
                        <ul className="exercise-list">
                          {block.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </article>

                      <article className="teacher-card">
                        <p className="eyebrow">Practical Uses</p>
                        <ul className="exercise-list">
                          {block.examples.map((example) => (
                            <li key={example}>{example}</li>
                          ))}
                        </ul>
                      </article>
                    </div>

                    <article className="teacher-card self-check-card">
                      <p className="eyebrow">Self-Check</p>
                      {block.checks.map((question, index) => {
                        const key = `${block.id}-${index}`;
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
                    </article>
                  </div>
                ) : null}
              </section>
            ))}

            <section id="final-test" className="teacher-final-test">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Final Test</p>
                  <h2>Quick knowledge check for teachers</h2>
                </div>
                <span className="section-badge">
                  Score: {testScore}/{finalTest.length}
                </span>
              </div>

              <div className="teacher-test-grid">
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

            <section id="teacher-notes" className="teacher-notes-panel">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Teacher Notes</p>
                  <h2>Personal notes while studying the material</h2>
                </div>
                <span className="section-badge">Saved automatically</span>
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Write your teaching reflections, lesson ideas, classroom adaptations, or examples you want to reuse..."
                rows={10}
              />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
