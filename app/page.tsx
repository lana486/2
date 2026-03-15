import Link from "next/link";

const templateCards = [
  {
    title: "Future Forms Workshop",
    meta: "English · A2-B1 · 45 min",
    text: "A ready-made lesson with timeline visuals, guided grammar discovery, and speaking practice.",
    tags: ["future forms", "visual learning", "interactive"],
    author: "Olena Koval",
    rating: "4.9",
    colorClass: "template-card-blue",
  },
  {
    title: "Travel English Essentials",
    meta: "Speaking · A1-A2 · 40 min",
    text: "Role-play driven material for airports, hotels, directions, and survival phrases.",
    tags: ["travel", "role play", "speaking"],
    author: "Mila Brown",
    rating: "4.8",
    colorClass: "template-card-green",
  },
  {
    title: "Professional Email Builder",
    meta: "Writing · B1-B2 · 60 min",
    text: "Structured writing lesson with tone guidance, model phrases, and AI correction prompts.",
    tags: ["business", "writing", "email"],
    author: "James Wilson",
    rating: "4.7",
    colorClass: "template-card-purple",
  },
];

const filterPills = ["Interactive", "Worksheets", "Presentations", "Grammar", "Reading"];

const benefits = [
  "Drag & drop interface",
  "AI content suggestions",
  "Auto-grading quizzes",
  "Export to PDF & LMS",
];

export default function HomePage() {
  return (
    <main className="page-stack">
      <section className="learnflow-hero">
        <div className="learnflow-copy">
          <p className="eyebrow">AI Lesson Platform</p>
          <h1>
            Build lessons
            <br />
            teachers love.
          </h1>
          <p className="lead">
            The premium platform to create, store, and explore educational materials. Build interactive English lessons,
            polished teaching resources, and AI-supported classroom flows in one place.
          </p>
          <div className="cta-actions">
            <Link href="/lesson-studio" className="button learnflow-primary">
              Start for Free
            </Link>
            <Link href="/teachers/grammar-basics" className="button learnflow-secondary">
              Browse Templates
            </Link>
          </div>
          <div className="learnflow-proof">
            <div className="learnflow-avatars">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>Loved by 10,000+ educators</p>
          </div>
        </div>

        <div className="learnflow-visual">
          <div className="learnflow-screen">
            <div className="learnflow-floating-card learnflow-floating-left">
              <span>Lesson saved</span>
              <strong>English Future Forms</strong>
            </div>
            <div className="learnflow-floating-card learnflow-floating-right">
              <span>New usage</span>
              <strong>+24 teachers</strong>
            </div>
            <div className="learnflow-ui-cluster">
              <div className="ui-window ui-window-main" />
              <div className="ui-window ui-window-left" />
              <div className="ui-window ui-window-bottom" />
              <div className="ui-badge-row">
                <span>Reading</span>
                <span>Quiz</span>
                <span>Speaking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="learnflow-search">
        <div className="learnflow-search-copy">
          <p className="eyebrow">Find Materials</p>
          <h2>Find the perfect material for your next class</h2>
        </div>
        <div className="learnflow-searchbar">
          <input
            type="text"
            placeholder="Search subjects, topics, or standards (e.g., Future forms for speaking lessons)"
          />
          <button type="button" className="button learnflow-primary">
            Search
          </button>
        </div>
        <div className="learnflow-pill-row">
          <span className="learnflow-pill-label">Popular filters:</span>
          {filterPills.map((pill) => (
            <span key={pill} className="learnflow-pill">
              {pill}
            </span>
          ))}
        </div>
      </section>

      <section className="learnflow-templates">
        <div className="section-header-row">
          <div>
            <p className="eyebrow">Featured Content</p>
            <h2>Ready-made templates to save you hours</h2>
          </div>
          <Link href="/lesson-studio" className="learnflow-inline-link">
            View all templates
          </Link>
        </div>

        <div className="learnflow-template-grid">
          {templateCards.map((card) => (
            <article key={card.title} className="learnflow-template-card">
              <div className={`learnflow-template-top ${card.colorClass}`}>
                <span className="learnflow-template-badge">Premium</span>
                <h3>{card.title}</h3>
              </div>
              <div className="learnflow-template-body">
                <p className="learnflow-template-meta">{card.meta}</p>
                <p>{card.text}</p>
                <div className="learnflow-tag-row">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="learnflow-template-footer">
                  <div>
                    <strong>{card.author}</strong>
                  </div>
                  <span>{card.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="learnflow-feature-banner">
        <div className="learnflow-feature-copy">
          <p className="eyebrow">Built For Teachers</p>
          <h2>
            Design beautiful materials,
            <br />
            no design skills needed.
          </h2>
          <p className="lead">
            Use a drag-and-drop workflow to create worksheets, interactive presentations, grammar builders, and
            complete lesson modules in minutes.
          </p>
          <ul className="learnflow-benefits">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <Link href="/lesson-studio" className="button learnflow-white-button">
            Try the Builder
          </Link>
        </div>

        <div className="learnflow-feature-visual">
          <div className="feature-mockup">
            <div className="feature-puzzle feature-puzzle-a" />
            <div className="feature-puzzle feature-puzzle-b" />
            <div className="feature-puzzle feature-puzzle-c" />
            <div className="feature-card-mini">Module 1</div>
            <div className="feature-card-mini">Quiz Block</div>
            <div className="feature-card-mini">Drag & Drop</div>
          </div>
        </div>
      </section>
    </main>
  );
}
