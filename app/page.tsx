import Link from "next/link";
import {
  ComparisonSection,
  ConversationDemo,
  EditorialHero,
  FeatureGrid,
  MetricsStrip,
  SectionIntro,
  SlideCallout,
  TestimonialGrid,
  PricingCards,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main className="page-stack">
      <EditorialHero
        eyebrow="AI English Platform"
        title="Learn English with AI"
        subtitle="Smart lessons. Real conversation. Personalized learning."
        description="An editorial, presentation-style platform for self-study, live teaching, and AI-driven coaching. Every lesson adapts to level, goals, and speaking confidence."
        primaryCta={{ label: "Start Learning", href: "/dashboard" }}
        secondaryCta={{ label: "Try AI Tutor", href: "/ai-tutor" }}
      />

      <MetricsStrip
        items={[
          { value: "A1-C2", label: "Adaptive lesson paths" },
          { value: "24/7", label: "AI tutor availability" },
          { value: "98%", label: "Pronunciation feedback coverage" },
          { value: "+42%", label: "Weekly speaking consistency" },
        ]}
      />

      <SectionIntro
        eyebrow="How It Works"
        title="A presentation deck feel with an active learning engine underneath."
        text="The platform combines lesson generation, chat, speaking analysis, spaced repetition, and live teaching in one clean interface."
      />

      <FeatureGrid
        features={[
          {
            title: "AI Teacher",
            text: "Conducts conversations, corrects grammar, explains mistakes, and adjusts difficulty in real time.",
          },
          {
            title: "Lesson Generator",
            text: "Builds level-based lesson flows with vocabulary, grammar focus, practice loops, conversation, and quizzes.",
          },
          {
            title: "Speaking Trainer",
            text: "Scores pronunciation, tracks fluency, and simulates interviews, travel, and workplace scenarios.",
          },
          {
            title: "Teacher + AI Hybrid",
            text: "Live teachers get AI insights, summaries, and intervention prompts during student sessions.",
          },
        ]}
      />

      <ConversationDemo />

      <ComparisonSection />

      <SlideCallout
        eyebrow="Hybrid System"
        title="Human teachers stay in control. AI removes the repetitive load."
        body="Teachers manage cohorts, personalize assignments, and review AI-generated summaries. Students get structured guidance between live sessions, so every week feels continuous instead of fragmented."
        cta={{ label: "Explore Teachers", href: "/teachers" }}
      />

      <TestimonialGrid />

      <PricingCards />

      <section className="cta-slide">
        <div>
          <p className="eyebrow">Ready To Start</p>
          <h2>Build an English routine that feels like a premium product, not homework.</h2>
        </div>
        <div className="cta-actions">
          <Link href="/login" className="button button-primary">
            Create Account
          </Link>
          <Link href="/courses" className="button button-secondary">
            Browse Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
