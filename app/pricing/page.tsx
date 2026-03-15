import { PricingCards } from "@/components/sections";

export default function PricingPage() {
  return (
    <main className="page-stack">
      <section className="learnflow-page-hero">
        <div>
          <p className="eyebrow">Pricing</p>
          <h1>Simple plans for teachers, teams, and growing learning businesses.</h1>
          <p className="lead">
            Choose a plan that gives you the right balance of templates, AI tools, teaching workflows, and interactive
            material creation.
          </p>
        </div>
        <div className="learnflow-page-hero-art learnflow-art-blue" />
      </section>

      <PricingCards />

      <section className="learnflow-info-grid">
        <article className="learnflow-info-card">
          <p className="eyebrow">Included</p>
          <h3>AI lesson generation and teacher support</h3>
          <p>Every plan includes core material creation, structured layouts, and AI-assisted preparation.</p>
        </article>
        <article className="learnflow-info-card">
          <p className="eyebrow">Included</p>
          <h3>Interactive exercises and reusable templates</h3>
          <p>Build faster with ready-made structures for grammar, vocabulary, writing, and speaking lessons.</p>
        </article>
        <article className="learnflow-info-card">
          <p className="eyebrow">Included</p>
          <h3>Responsive workspace across devices</h3>
          <p>Teachers can review, edit, and organize content on laptop or tablet without losing the layout.</p>
        </article>
      </section>
    </main>
  );
}
