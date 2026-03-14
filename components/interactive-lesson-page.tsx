"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

const lessonNav = [
  "Overview",
  "Vocabulary",
  "Grammar",
  "Listening",
  "Reading",
  "Speaking",
  "Writing",
  "Practice",
  "Quiz",
  "AI conversation",
  "Review",
];

export function InteractiveLessonPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [grammarChoice, setGrammarChoice] = useState<string | null>(null);
  const [sentenceOrder, setSentenceOrder] = useState(["tomorrow", "will", "I", "travel"]);
  const [dictation, setDictation] = useState("");
  const [writingText, setWritingText] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      text: "Hi. I am your AI tutor. Let’s practice talking about the future with clear, natural English.",
    },
  ]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("lesson-studio-draft");

    if (!raw) {
      return;
    }

    setDraft(JSON.parse(raw) as Draft);
  }, []);

  const lesson = useMemo(() => {
    const topic = draft?.topic || "Talking about the Future";

    return {
      title: `Lesson 12 — ${topic}`,
      level: "A2",
      time: "42 min",
      xp: "180 XP",
      progress: 64,
      vocabulary: [
        {
          word: "plan",
          pronunciation: "/plæn/",
          translation: "планувати",
          example: "We plan to visit London next summer.",
          image: "City map and travel schedule",
        },
        {
          word: "probably",
          pronunciation: "/ˈprɒbəbli/",
          translation: "ймовірно",
          example: "I will probably stay at home tonight.",
          image: "Calendar with a question mark",
        },
        {
          word: "arrange",
          pronunciation: "/əˈreɪndʒ/",
          translation: "організовувати",
          example: "She arranged a meeting for tomorrow morning.",
          image: "Notebook and meeting card",
        },
      ],
      reading:
        "Next month, Mila is going to start a new design course. She will study online three evenings a week, and she is going to practice her speaking with an AI tutor every Saturday. Her goal is to feel more confident when she talks about future plans at work.",
      writingPrompt: "Write a short message to your friend about your plans for next weekend.",
      aiFeedback: [
        "Future forms are mostly correct, but continue practicing will vs going to.",
        "Vocabulary range is improving, especially for planning and scheduling.",
        "Pronunciation needs extra repetition on connected speech in full sentences.",
      ],
    };
  }, [draft]);

  if (!draft) {
    return (
      <main className="page-stack">
        <section className="lesson-page-shell">
          <div className="generated-header">
            <p className="eyebrow">No Lesson Data</p>
            <h1>Open the lesson studio first.</h1>
            <p className="lead">Generate a lesson draft first, then this interactive lesson page will be built from that topic.</p>
            <Link href="/lesson-studio" className="button button-primary">
              Back To Lesson Studio
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const activeCard = lesson.vocabulary[flashcardIndex];
  const writingSuggestion =
    writingText.length > 20
      ? "AI suggestion: add one future time marker like tomorrow, next week, or in two days."
      : "AI suggestion: write 1-2 more sentences to make the answer more complete.";

  function cycleFlashcard(direction: "next" | "prev") {
    setFlashcardFlipped(false);
    setFlashcardIndex((current) => {
      if (direction === "next") {
        return (current + 1) % lesson.vocabulary.length;
      }

      return (current - 1 + lesson.vocabulary.length) % lesson.vocabulary.length;
    });
  }

  function rotateSentence() {
    setSentenceOrder((current) => [current[1], current[2], current[3], current[0]]);
  }

  function submitChat() {
    if (!chatInput.trim()) {
      return;
    }

    setChatMessages((current) => [
      ...current,
      { role: "student", text: chatInput },
      {
        role: "ai",
        text: `Better version: "${chatInput}" sounds good. Try adding one future marker and one reason to make it more natural.`,
      },
    ]);
    setChatInput("");
  }

  return (
    <main className="page-stack">
      <section className="lesson-page-shell">
        <div className="lesson-layout">
          <aside className="lesson-sidebar">
            <p className="eyebrow">Lesson Navigation</p>
            {lessonNav.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="lesson-nav-item">
                {item}
              </a>
            ))}
          </aside>

          <div className="lesson-main">
            <section id="overview" className="lesson-hero">
              <div className="lesson-hero-copy">
                <p className="eyebrow">Interactive Lesson</p>
                <h1>{lesson.title}</h1>
                <p className="lead">
                  A modern AI-powered lesson workspace with exercises, tutor support, progress tracking, and gamified practice built directly from your lesson draft.
                </p>
              </div>
              <div className="lesson-hero-side">
                <div className="lesson-stat-grid">
                  <article>
                    <span>Difficulty</span>
                    <strong>{lesson.level}</strong>
                  </article>
                  <article>
                    <span>Estimated time</span>
                    <strong>{lesson.time}</strong>
                  </article>
                  <article>
                    <span>Reward</span>
                    <strong>{lesson.xp}</strong>
                  </article>
                  <article>
                    <span>AI Assistant</span>
                    <strong>Online</strong>
                  </article>
                </div>
                <div className="lesson-progress">
                  <div className="lesson-progress-label">
                    <span>Progress</span>
                    <strong>{lesson.progress}%</strong>
                  </div>
                  <div className="lesson-progress-bar">
                    <span style={{ width: `${lesson.progress}%` }} />
                  </div>
                </div>
                <div className="cta-actions">
                  <button type="button" className="button button-primary">
                    Start Lesson
                  </button>
                  <button type="button" className="button button-secondary">
                    Open AI Tutor
                  </button>
                  <button type="button" className="button button-secondary">
                    Vocabulary List
                  </button>
                </div>
              </div>
            </section>

            <section id="vocabulary" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Vocabulary</p>
                  <h2>Flashcards, matching, drag categories, and gap fill</h2>
                </div>
                <span className="section-badge">Spaced repetition ready</span>
              </div>

              <div className="lesson-two-col">
                <article className="interactive-card flashcard-card">
                  <div className={`flashcard-face ${flashcardFlipped ? "is-flipped" : ""}`}>
                    <p className="eyebrow">Flashcard</p>
                    <h3>{activeCard.word}</h3>
                    <p>{activeCard.pronunciation}</p>
                    <p>{flashcardFlipped ? activeCard.translation : activeCard.example}</p>
                    <span>{activeCard.image}</span>
                  </div>
                  <div className="exercise-actions">
                    <button type="button" className="button button-secondary" onClick={() => cycleFlashcard("prev")}>
                      Prev
                    </button>
                    <button type="button" className="button button-primary" onClick={() => setFlashcardFlipped((value) => !value)}>
                      Flip Card
                    </button>
                    <button type="button" className="button button-secondary" onClick={() => cycleFlashcard("next")}>
                      Next
                    </button>
                  </div>
                </article>

                <article className="interactive-card">
                  <p className="eyebrow">Word Matching</p>
                  <h3>Match word to meaning</h3>
                  <div className="match-grid">
                    {lesson.vocabulary.map((item) => (
                      <span key={item.word} className="match-pill">
                        {item.word} ↔ {item.translation}
                      </span>
                    ))}
                  </div>
                  <div className="category-board">
                    <div>
                      <strong>Formal</strong>
                      <span>arrange</span>
                    </div>
                    <div>
                      <strong>Everyday</strong>
                      <span>plan</span>
                      <span>probably</span>
                    </div>
                  </div>
                  <div className="gap-options">
                    <p>I will ____ to London tomorrow.</p>
                    {["go", "went", "going"].map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={`option-chip ${selectedGap === option ? "selected" : ""}`}
                        onClick={() => setSelectedGap(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="grammar" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Grammar</p>
                  <h2>Short explanation with multiple formats of practice</h2>
                </div>
                <span className="section-badge">Adaptive difficulty</span>
              </div>

              <div className="lesson-three-col">
                <article className="interactive-card">
                  <p className="eyebrow">Explanation</p>
                  <h3>Future with will and going to</h3>
                  <p>Use <strong>will</strong> for instant decisions and predictions. Use <strong>going to</strong> for plans and intentions.</p>
                  <div className="diagram-strip">
                    <span>Idea</span>
                    <span>Decision</span>
                    <span>Future action</span>
                  </div>
                </article>

                <article className="interactive-card">
                  <p className="eyebrow">Multiple Choice</p>
                  <h3>Choose the correct answer</h3>
                  <p>I think she ___ pass the exam.</p>
                  {["will", "is going", "goes"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`option-chip ${grammarChoice === option ? "selected" : ""}`}
                      onClick={() => setGrammarChoice(option)}
                    >
                      {option}
                    </button>
                  ))}
                </article>

                <article className="interactive-card">
                  <p className="eyebrow">Sentence Builder</p>
                  <h3>Rebuild the sentence</h3>
                  <div className="sentence-builder">
                    {sentenceOrder.map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                  </div>
                  <button type="button" className="button button-secondary" onClick={rotateSentence}>
                    Shuffle Order
                  </button>
                  <p className="tiny-note">Target answer: I will travel tomorrow.</p>
                </article>
              </div>

              <div className="lesson-two-col">
                <article className="interactive-card">
                  <p className="eyebrow">Error Correction</p>
                  <h3>Find the mistake</h3>
                  <p>She go to school every day.</p>
                  <p className="tiny-note">AI hint: the verb form after she is incorrect.</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Rewrite + Gap Fill</p>
                  <h3>Transform present into future</h3>
                  <p>We travel next week. → We are going to travel next week.</p>
                </article>
              </div>
            </section>

            <section id="listening" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Listening</p>
                  <h2>Audio tasks with instant checking</h2>
                </div>
                <span className="section-badge">Voice enabled</span>
              </div>
              <div className="lesson-four-grid">
                <article className="interactive-card">
                  <p className="eyebrow">Listen and Choose</p>
                  <div className="audio-bar">
                    <span />
                  </div>
                  <p>The speaker says they will visit their aunt on Friday.</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Listen and Fill</p>
                  <p>We are going to ____ dinner at 7 PM.</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Listen and Order</p>
                  <p>Put the events in order after listening.</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Dictation Mode</p>
                  <textarea
                    rows={4}
                    value={dictation}
                    onChange={(event) => setDictation(event.target.value)}
                    placeholder="Type what you hear..."
                  />
                </article>
              </div>
            </section>

            <section id="reading" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Reading</p>
                  <h2>Article block with comprehension tasks</h2>
                </div>
                <span className="section-badge">Text to speech ready</span>
              </div>
              <div className="lesson-two-col">
                <article className="interactive-card reading-card">
                  <p className="eyebrow">Reading Text</p>
                  <p>{lesson.reading}</p>
                  <div className="highlight-tags">
                    <span>start a new design course</span>
                    <span>practice her speaking</span>
                    <span>future plans</span>
                  </div>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Comprehension</p>
                  <ul className="exercise-list">
                    <li>Multiple choice questions</li>
                    <li>True / False checks</li>
                    <li>Highlight the answer in the text</li>
                    <li>Paragraph matching</li>
                  </ul>
                </article>
              </div>
            </section>

            <section id="speaking" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Speaking</p>
                  <h2>AI speaking trainer with role play and analysis</h2>
                </div>
                <span className="section-badge">Mic ready</span>
              </div>
              <div className="lesson-three-col">
                <article className="interactive-card dark-card">
                  <p className="eyebrow">Repeat After AI</p>
                  <h3>I’m going to visit my grandparents next weekend.</h3>
                  <p>Pronunciation score target: 90+</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Role Play</p>
                  <h3>Ordering in a restaurant</h3>
                  <p>AI plays the waiter. Student responds with future plans and requests.</p>
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Picture Description</p>
                  <div className="image-block-placeholder">Travel scene image</div>
                  <p>Describe what the people are going to do next.</p>
                </article>
              </div>
            </section>

            <section id="writing" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Writing</p>
                  <h2>Short writing tasks with AI suggestions</h2>
                </div>
                <span className="section-badge">Auto-save on</span>
              </div>
              <div className="lesson-two-col">
                <article className="interactive-card">
                  <p className="eyebrow">Writing Task</p>
                  <h3>{lesson.writingPrompt}</h3>
                  <textarea
                    rows={8}
                    value={writingText}
                    onChange={(event) => setWritingText(event.target.value)}
                    placeholder="Write your sentence, short answer, or paragraph here..."
                  />
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">AI Feedback</p>
                  <p>{writingSuggestion}</p>
                  <ul className="exercise-list">
                    <li>Grammar correction</li>
                    <li>Vocabulary suggestions</li>
                    <li>Style improvement</li>
                    <li>Email / message format support</li>
                  </ul>
                </article>
              </div>
            </section>

            <section id="practice" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Practice Arena</p>
                  <h2>Gamified modes for speed, vocabulary, grammar, and sentence puzzles</h2>
                </div>
                <span className="section-badge">XP booster</span>
              </div>
              <div className="lesson-four-grid">
                {["Speed Quiz", "Vocabulary Battle", "Grammar Challenge", "Sentence Puzzle"].map((mode) => (
                  <article key={mode} className="interactive-card arena-card">
                    <p className="eyebrow">{mode}</p>
                    <h3>{mode}</h3>
                    <p>Timed challenge with instant scoring and adaptive difficulty.</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="quiz" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Final Quiz</p>
                  <h2>Mixed assessment with AI explanation</h2>
                </div>
                <span className="section-badge">Final check</span>
              </div>
              <div className="lesson-two-col">
                <article className="interactive-card">
                  <p className="eyebrow">Quiz Card</p>
                  <p>Choose the correct sentence:</p>
                  {[
                    "I will meeting my friend tonight.",
                    "I am going to meet my friend tonight.",
                    "I going meet my friend tonight.",
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`option-chip ${quizAnswer === option ? "selected" : ""}`}
                      onClick={() => setQuizAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </article>
                <article className="interactive-card">
                  <p className="eyebrow">Score Preview</p>
                  <div className="score-panel">
                    <strong>84%</strong>
                    <span>2 grammar mistakes · 1 vocabulary gap</span>
                    <p>AI explanation: review future plans with going to in personal messages and speaking tasks.</p>
                  </div>
                </article>
              </div>
            </section>

            <section id="ai-conversation" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Conversation With AI</p>
                  <h2>Casual chat, travel mode, interview mode, and discussion mode</h2>
                </div>
                <span className="section-badge">Real-time support</span>
              </div>
              <div className="ai-chat-shell">
                <div className="ai-chat-modes">
                  {["Casual", "Topic discussion", "Interview", "Travel", "Business"].map((mode) => (
                    <span key={mode}>{mode}</span>
                  ))}
                </div>
                <div className="ai-chat-window">
                  {chatMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`chat-line ${message.role === "ai" ? "ai" : "student"}`}>
                      <span>{message.role === "ai" ? "AI Tutor" : "Student"}</span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                <div className="ai-chat-input">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="Type your response to the AI..."
                  />
                  <button type="button" className="button button-primary" onClick={submitChat}>
                    Send
                  </button>
                </div>
              </div>
            </section>

            <section id="review" className="lesson-section-shell">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">AI Feedback</p>
                  <h2>Mistakes, weak points, recommendations, and next lesson path</h2>
                </div>
                <span className="section-badge">Smart review</span>
              </div>
              <div className="lesson-two-col">
                <article className="interactive-card">
                  <ul className="exercise-list">
                    {lesson.aiFeedback.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="interactive-card progress-card">
                  <p className="eyebrow">Progress</p>
                  <h3>Lesson completed</h3>
                  <div className="progress-metrics">
                    <span>+180 XP</span>
                    <span>7 day streak</span>
                    <span>82% to next level</span>
                  </div>
                  <button type="button" className="button button-primary">
                    Continue Learning
                  </button>
                </article>
              </div>
            </section>
          </div>
        </div>

        <button type="button" className="floating-ai-button">
          AI
        </button>
      </section>
    </main>
  );
}
