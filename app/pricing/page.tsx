import { PricingCards } from "@/components/sections";

export default function PricingPage() {
  return (
    <main className="page-stack">
      <section className="learnflow-page-hero">
        <div>
          <p className="eyebrow">Pricing</p>
          <h1>Simple plans for teachers, small teams, and growing learning studios.</h1>
          <p className="lead">
            Choose a plan that gives you the right balance of templates, AI tools, teaching workflows, and interactive
            material creation.
          </p>
        </div>
        <div className="learnflow-page-hero-art learnflow-art-blue" />
      </section>

      <PricingCards />

      <section className="pricing-support-grid">
        <article className="learnflow-info-card">
          <p className="eyebrow">Included</p>
          <h3>AI lesson generation and classroom support</h3>
          <p>Every plan includes core material creation, structured layouts, and AI-assisted preparation.</p>
        </article>
        <article className="learnflow-info-card">
          <p className="eyebrow">Included</p>
          <h3>Interactive exercises and reusable templates</h3>
          <p>Build faster with ready-made structures for grammar, vocabulary, writing, and speaking lessons.</p>
        </article>
        <article className="learnflow-info-card">
          <p className="eyebrow">Custom setup</p>
          <h3>Flexible onboarding for schools and teaching teams</h3>
          <p>Teacher plans can be adapted to your workflow instead of locking you into one fixed high price.</p>
        </article>
      </section>

      <section className="pricing-bottom-banner">
        <div>
          <p className="eyebrow">Need something specific?</p>
          <h2>Start small now, then scale when your teaching workflow grows.</h2>
        </div>
        <p>
          You can begin with Free or Starter, build materials, test the AI workflows, and only move to a team setup
          when you actually need collaboration, reporting, or managed rollout.
        </p>
      </section>
    </main>
  );
}
