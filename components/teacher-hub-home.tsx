import Link from "next/link";

const popularFilters = ["CEFR B1", "Speaking", "Grammar focus", "Ready-made lessons", "Methodology guides"];

const featuredMaterials = [
  {
    title: "Present Perfect Through Real-Life Stories",
    badge: "Ready-made lesson",
    text: "A complete 45-minute sequence with an opening hook, guided practice, pair task, and exit reflection.",
    tags: ["B1", "Grammar", "Speaking"],
    meta: "Lesson plan + teacher notes",
    cover: "sky",
  },
  {
    title: "Low-Prep Discussion Kit for Teens",
    badge: "Discussion pack",
    text: "Prompts, timing suggestions, and adaptation ideas for teachers who need a confident speaking lesson fast.",
    tags: ["A2-B1", "Conversation", "Warm-up"],
    meta: "Printable prompts + follow-up ideas",
    cover: "forest",
  },
  {
    title: "Methodology Guide for Mixed-Level Classes",
    badge: "Teacher guide",
    text: "Peer-authored strategies for pacing, differentiation, and keeping stronger and quieter students engaged.",
    tags: ["Methodology", "Classroom flow", "Teacher-made"],
    meta: "Guide + classroom examples",
    cover: "midnight",
  },
];

const teacherBenefits = [
  "Curated materials written with real classroom constraints in mind",
  "Ready-made lessons you can teach as-is or adapt in minutes",
  "Methodology guides that explain the why, not just the worksheet",
  "A publishing space where teachers contribute back to the hub",
];

const workflowSteps = [
  {
    step: "01",
    title: "Discover something worth opening",
    text: "Browse peer-authored cards by topic, skill, level, and lesson objective instead of hunting across tabs.",
  },
  {
    step: "02",
    title: "Read the full teaching logic",
    text: "Open the article view to see the complete lesson structure, methodology, and practical teacher notes.",
  },
  {
    step: "03",
    title: "Adapt, teach, and publish your own",
    text: "Use what helps, add your classroom insight, and contribute a polished material back into TeacherHub.",
  },
];

const testimonials = [
  {
    quote:
      "I stopped rebuilding the same B1 speaking lessons every week. TeacherHub gives me a strong starting point I can trust.",
    name: "Marta, secondary teacher",
  },
  {
    quote:
      "The materials feel written by someone who has actually taught the lesson, not by a content farm chasing volume.",
    name: "Danylo, private tutor",
  },
  {
    quote:
      "The methodology guides are the reason I stayed. They help me explain my choices and not just deliver activities.",
    name: "Sofiia, teacher trainer",
  },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/teachers/grammar-basics", label: "Teacher Hub" },
  { href: "/teachers/publish", label: "Publish" },
  { href: "/pricing", label: "Pricing" },
];

export function TeacherHubHome() {
  return (
    <main className="page-stack">
      <section className="teacherhub-home-shell">
        <section className="teacher-hub-hero teacherhub-home-hero">
          <div className="teacherhub-home-copy">
            <span className="teacherhub-home-pill">For Teachers, By Teachers</span>
            <h1>Every great lesson starts here</h1>
            <p className="lead">
              Discover peer-authored teaching materials, ready-made lesson plans, and methodology guides - all in one
              focused workspace.
            </p>

            <div className="teacherhub-home-actions">
              <Link href="/teachers/grammar-basics" className="button learnflow-primary">
                Explore the Hub
              </Link>
              <Link href="/teachers/publish" className="button learnflow-secondary">
                Publish a Material
              </Link>
            </div>

            <div className="learnflow-proof teacherhub-home-proof">
              <div className="learnflow-avatars teacherhub-home-avatars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <span>Joined by 2,400+ educators from 38 countries</span>
            </div>
          </div>

          <div className="teacherhub-home-stage">
            <div className="learnflow-screen teacherhub-home-screen">
              <article className="teacherhub-home-screen-card teacherhub-home-screen-card-main">
                <p className="eyebrow">Curated Today</p>
                <h2>Peer-made materials for tomorrow&apos;s lesson</h2>
                <div className="teacher-tag-strip">
                  <span>B1 speaking</span>
                  <span>Lesson plan</span>
                  <span>Teacher notes</span>
                </div>
              </article>

              <article className="teacherhub-home-screen-card teacherhub-home-screen-card-side">
                <span>Top format</span>
                <strong>Ready-made lessons</strong>
                <p>Shortlist practical sequences you can teach without extra setup.</p>
              </article>

              <article className="teacherhub-home-screen-card teacherhub-home-screen-card-bottom">
                <span>Saved time</span>
                <strong>From search to usable material in minutes</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="learnflow-search">
          <div className="learnflow-search-copy">
            <p className="eyebrow">Start With What You Teach</p>
            <h2>Find the right material before planning from scratch.</h2>
            <p>
              Search by level, classroom goal, or lesson format and go straight to something worth using and adapting.
            </p>
          </div>

          <div className="learnflow-searchbar teacherhub-home-searchbar">
            <input readOnly value="B1 speaking lesson with ready-made warm-up and exit ticket" />
            <Link href="/teachers/grammar-basics" className="button learnflow-primary">
              Browse Materials
            </Link>
          </div>

          <div className="learnflow-pill-row">
            <span className="learnflow-pill-label">Popular filters</span>
            {popularFilters.map((filter) => (
              <span key={filter} className="learnflow-pill">
                {filter}
              </span>
            ))}
          </div>
        </section>

        <section className="learnflow-templates">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">Curated Materials</p>
              <h2>Open lessons and guides that already feel classroom-ready.</h2>
            </div>
            <span className="section-badge">Built for clarity, pacing, and real teacher use</span>
          </div>

          <div className="learnflow-template-grid">
            {featuredMaterials.map((material) => (
              <article key={material.title} className="learnflow-template-card">
                <div className={`learnflow-template-top teacher-cover-${material.cover}`}>
                  <span className="learnflow-template-badge">{material.badge}</span>
                  <h3>{material.title}</h3>
                </div>

                <div className="learnflow-template-body">
                  <p>{material.text}</p>

                  <div className="learnflow-tag-row">
                    {material.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="learnflow-template-footer">
                    <span className="learnflow-template-meta">{material.meta}</span>
                    <Link href="/teachers/grammar-basics" className="learnflow-inline-link">
                      View material
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="learnflow-feature-banner teacherhub-home-banner">
          <div className="learnflow-feature-copy">
            <p className="eyebrow">Why Teachers Stay</p>
            <h2>Because the platform is shaped around real teaching flow.</h2>
            <p>
              TeacherHub helps with the moments that usually drain time and confidence: finding a strong starting
              point, understanding the teaching logic, and keeping your method consistent from class to class.
            </p>

            <ul className="learnflow-benefits">
              {teacherBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="teacherhub-home-banner-grid">
            <article className="teacherhub-home-banner-card">
              <span>Most explored</span>
              <strong>Ready-made lessons</strong>
              <p>Teachers come for usable materials first and stay for the methodology that sits behind them.</p>
            </article>

            <article className="teacherhub-home-banner-card">
              <span>Most valued</span>
              <strong>Teacher voice</strong>
              <p>Everything feels authored by peers who understand pacing, prep time, and classroom trade-offs.</p>
            </article>

            <article className="teacherhub-home-banner-card teacherhub-home-banner-card-wide">
              <span>What makes it different</span>
              <strong>One focused workspace for discovering, reading, saving, and publishing materials.</strong>
            </article>
          </div>
        </section>

        <section className="teacherhub-home-panel">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">How It Works</p>
              <h2>Move from discovery to delivery without losing momentum.</h2>
            </div>
          </div>

          <div className="teacherhub-home-workflow-grid">
            {workflowSteps.map((step) => (
              <article key={step.step} className="teacher-card teacherhub-home-step-card">
                <span className="teacherhub-home-step-number">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="teacherhub-home-panel">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">Teacher Proof</p>
              <h2>This is where teachers land when they want better material, not more noise.</h2>
            </div>
            <span className="section-badge">Focused on trust, curation, and classroom usefulness</span>
          </div>

          <div className="teacher-hub-stats">
            <article>
              <span>Educators joined</span>
              <strong>2,400+</strong>
            </article>
            <article>
              <span>Countries represented</span>
              <strong>38</strong>
            </article>
            <article>
              <span>Core promise</span>
              <strong>Teacher-made quality</strong>
            </article>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <p>{testimonial.quote}</p>
                <strong>{testimonial.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <footer className="teacherhub-home-footer">
          <div className="teacherhub-home-footer-copy">
            <p className="eyebrow">TeacherHub</p>
            <h2>Stay for the materials. Keep coming back for the teaching clarity.</h2>
            <p>
              Explore the hub, save time on planning, and publish the kind of material you wish you had found sooner.
            </p>
          </div>

          <div className="teacherhub-home-footer-actions">
            <div className="teacherhub-home-footer-links">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="teacherhub-home-actions">
              <Link href="/teachers/grammar-basics" className="button learnflow-primary">
                Explore the Hub
              </Link>
              <Link href="/teachers/publish" className="button learnflow-secondary">
                Publish a Material
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
