import Link from "next/link";

type Cta = {
  label: string;
  href: string;
};

export function EditorialHero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}) {
  return (
    <section className="hero-slide">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p className="lead">{description}</p>
        <div className="cta-actions">
          <Link href={primaryCta.href} className="button button-primary">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="button button-secondary">
            {secondaryCta.label}
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-cutout hero-cutout-skyline" aria-hidden="true" />
        <div className="hero-cutout hero-cutout-liberty" aria-hidden="true" />
        <div className="hero-cutout hero-cutout-bigben" aria-hidden="true" />
        <div className="globe-orbit">
          <div className="globe-core" />
          <span className="globe-ring ring-a" />
          <span className="globe-ring ring-b" />
          <span className="globe-dot dot-a" />
          <span className="globe-dot dot-b" />
          <span className="globe-dot dot-c" />
        </div>
        <div className="hero-card hero-card-dark">
          <strong>Live AI feedback</strong>
          <p>Grammar correction, vocabulary prompts, and next-step guidance in one stream.</p>
        </div>
        <div className="hero-card hero-card-light">
          <strong>Weekly plan</strong>
          <p>3 speaking sessions, 2 review loops, 1 live lesson.</p>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
    </section>
  );
}

export function MetricsStrip({
  items,
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="metrics-strip">
      {items.map((item) => (
        <div key={item.label} className="metric-card">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

export function FeatureGrid({
  features,
}: {
  features: Array<{ title: string; text: string }>;
}) {
  return (
    <section className="feature-grid">
      {features.map((feature, index) => (
        <article key={feature.title} className={`feature-card feature-card-${index + 1}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </section>
  );
}

export function ConversationDemo() {
  return (
    <section className="conversation-demo">
      <div className="demo-copy">
        <p className="eyebrow">AI Conversation Demo</p>
        <h2>Practice realistic dialogue with instant correction.</h2>
        <p>
          Students can switch between travel, meetings, interviews, or everyday situations. The AI explains mistakes without breaking the flow of the conversation.
        </p>
      </div>
      <div className="chat-window">
        <div className="chat-line ai">
          <span>AI Tutor</span>
          <p>Let&apos;s practice ordering coffee politely in English. How would you begin?</p>
        </div>
        <div className="chat-line student">
          <span>You</span>
          <p>Hello, I want one cappuccino and maybe something sweet.</p>
        </div>
        <div className="chat-line ai">
          <span>AI Tutor</span>
          <p>Good. A more natural version is: “Hi, could I get a cappuccino and something sweet?” Want to try again with extra confidence?</p>
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  const items = [
    "AI tutor chat and voice mode",
    "Lesson generation by level and goals",
    "Pronunciation scoring",
    "Video classroom with AI assistant",
    "Progress dashboard and memory system",
    "Gamified weekly plan",
  ];

  return (
    <section className="comparison-section">
      <div className="comparison-dark">
        <p className="eyebrow">Platform Features</p>
        <h2>Everything connected in one learning flow.</h2>
      </div>
      <div className="comparison-light">
        {items.map((item) => (
          <div key={item} className="comparison-item">
            <span>+</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SlideCallout({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: Cta;
}) {
  return (
    <section className="slide-callout">
      <div className="slide-art" />
      <div className="slide-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <Link href={cta.href} className="button button-primary">
          {cta.label}
        </Link>
      </div>
    </section>
  );
}

export function TestimonialGrid() {
  const items = [
    {
      name: "Mila, Product Designer",
      text: "The AI speaking practice feels far closer to real conversation than any flashcard app I used before.",
    },
    {
      name: "Artem, IELTS Student",
      text: "The lesson generator keeps my weak grammar patterns in focus instead of repeating what I already know.",
    },
    {
      name: "Olena, Teacher",
      text: "The AI summaries save admin time and help me see where students lose confidence between sessions.",
    },
  ];

  return (
    <section className="testimonial-grid">
      {items.map((item) => (
        <article key={item.name} className="testimonial-card">
          <p>{item.text}</p>
          <strong>{item.name}</strong>
        </article>
      ))}
    </section>
  );
}

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      text: "Basic AI tutor access, starter exercises, limited speaking practice, and a simple weekly plan for trying the platform.",
      note: "For trying the workflow",
      cta: "Start Free",
    },
    {
      name: "Starter",
      price: "$19",
      text: "AI tutor, practice modules, weekly plan, and vocabulary memory system.",
      note: "For solo teachers",
      cta: "Choose Starter",
    },
    {
      name: "Pro",
      price: "$49",
      text: "Everything in Starter plus speaking trainer, lesson generator, and live class support.",
      note: "Most complete toolkit",
      cta: "Choose Pro",
      featured: true,
    },
    {
      name: "Teacher",
      price: "Custom",
      text: "Student management, shared content libraries, AI insights, summaries, and hybrid classroom workflows for active teaching teams.",
      note: "For schools and teaching teams",
      cta: "Talk To Us",
    },
  ];

  return (
    <section className="pricing-grid">
      {plans.map((plan) => (
        <article key={plan.name} className={`pricing-card pricing-card-refined ${plan.featured ? "featured" : ""}`}>
          <p className="eyebrow">{plan.name}</p>
          <span className="pricing-note">{plan.note}</span>
          <h3>{plan.price}</h3>
          <p>{plan.text}</p>
          <Link href="/login" className={`button ${plan.featured ? "learnflow-white-button" : "learnflow-secondary"}`}>
            {plan.cta}
          </Link>
        </article>
      ))}
    </section>
  );
}

export function ChatShowcase() {
  return (
    <section className="chat-showcase">
      <div className="panel-dark">
        <p className="eyebrow">Chat Interface</p>
        <h2>Switch from text to voice without changing context.</h2>
        <p>The AI remembers grammar weak points, recent vocabulary, and the current scenario, so every turn compounds rather than restarts.</p>
      </div>
      <div className="panel-light">
        <div className="mini-stat">
          <strong>Grammar</strong>
          <span>Explains mistakes with examples</span>
        </div>
        <div className="mini-stat">
          <strong>Exercises</strong>
          <span>Generates drills from current errors</span>
        </div>
        <div className="mini-stat">
          <strong>Dialogue</strong>
          <span>Simulates realistic situations</span>
        </div>
      </div>
    </section>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  text,
  points,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  inverse?: boolean;
}) {
  return (
    <section className={`split-feature ${inverse ? "inverse" : ""}`}>
      <div className="visual-panel" />
      <div className="copy-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="point-grid">
          {points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatPanels({
  title,
  stats,
}: {
  title: string;
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="stat-panels">
      <h2>{title}</h2>
      <div className="metrics-strip">
        {stats.map((stat) => (
          <div key={stat.label} className="metric-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CourseGrid() {
  const courses = [
    "Everyday Confidence",
    "Business Communication",
    "Travel English",
    "IELTS Preparation",
    "Grammar Intensive",
    "Pronunciation Lab",
  ];

  return (
    <section className="course-grid">
      {courses.map((course, index) => (
        <article key={course} className="course-card">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{course}</h3>
          <p>AI-generated lessons, speaking checkpoints, vocabulary loops, and weekly progress milestones.</p>
        </article>
      ))}
    </section>
  );
}

export function ExerciseMatrix() {
  const items = [
    "Vocabulary trainer",
    "Grammar exercises",
    "Listening tasks",
    "Writing correction",
    "Speaking practice",
    "Spaced repetition",
  ];

  return (
    <section className="exercise-matrix">
      {items.map((item) => (
        <div key={item} className="exercise-tile">
          <h3>{item}</h3>
          <p>Short focused drills with AI review and progress-aware difficulty adjustments.</p>
        </div>
      ))}
    </section>
  );
}

export function SpeakingPanels() {
  return (
    <section className="speaking-panels">
      <div className="panel-dark tall">
        <p className="eyebrow">Speech Recognition</p>
        <h2>Fluency analysis with pacing, hesitation, and confidence markers.</h2>
      </div>
      <div className="panel-light">
        <h3>Pronunciation scoring</h3>
        <p>Track target sounds, compare attempts, and review detailed articulation notes.</p>
      </div>
      <div className="panel-light">
        <h3>Conversation simulations</h3>
        <p>Practice interviews, phone calls, travel issues, and workplace communication.</p>
      </div>
    </section>
  );
}

export function TeacherDashboardPreview() {
  return (
    <section className="teacher-preview">
      <div className="teacher-sidebar">
        <span>Student groups</span>
        <span>Course builder</span>
        <span>AI suggestions</span>
        <span>Session summaries</span>
      </div>
      <div className="teacher-main">
        <h2>Teacher dashboard</h2>
        <p>See attendance, weak skills, speaking confidence, and lesson prep suggestions in one editorial workspace.</p>
        <div className="teacher-cards">
          <div>
            <strong>18 students</strong>
            <span>Active this week</span>
          </div>
          <div>
            <strong>6 alerts</strong>
            <span>Need grammar intervention</span>
          </div>
          <div>
            <strong>14 summaries</strong>
            <span>Generated after classes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DashboardShowcase() {
  return (
    <section className="dashboard-showcase">
      <div className="dashboard-main">
        <h2>Student dashboard</h2>
        <div className="dashboard-grid">
          <article>
            <strong>74%</strong>
            <span>Speaking consistency</span>
          </article>
          <article>
            <strong>128</strong>
            <span>Words in memory loop</span>
          </article>
          <article>
            <strong>12</strong>
            <span>Completed lessons</span>
          </article>
          <article>
            <strong>36k XP</strong>
            <span>Current level progress</span>
          </article>
        </div>
      </div>
      <div className="dashboard-side">
        <h3>AI chat history</h3>
        <p>Business meeting role-play</p>
        <p>Travel check-in simulation</p>
        <p>Grammar recap: articles</p>
      </div>
    </section>
  );
}

export function WeeklyPlan() {
  const plan = [
    "Monday: AI conversation - travel English",
    "Wednesday: grammar drill - conditionals",
    "Thursday: speaking trainer - fluency sprint",
    "Saturday: live lesson + AI summary review",
  ];

  return (
    <section className="weekly-plan">
      <div>
        <p className="eyebrow">Weekly Learning Plan</p>
        <h2>Structured momentum, not random exercises.</h2>
      </div>
      <div className="plan-list">
        {plan.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}
