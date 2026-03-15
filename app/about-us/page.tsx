export default function AboutUsPage() {
  return (
    <main className="page-stack">
      <section className="learnflow-page-hero">
        <div>
          <p className="eyebrow">About Us</p>
          <h1>We build AI tools that help teachers create stronger learning experiences.</h1>
          <p className="lead">
            LearnFlow combines lesson design, teacher workflows, interactive materials, and AI support in one clean
            workspace built for modern educators.
          </p>
        </div>
        <div className="learnflow-page-hero-art learnflow-art-soft" />
      </section>

      <section className="learnflow-info-grid">
        <article className="learnflow-info-card">
          <p className="eyebrow">What We Believe</p>
          <h3>Great teaching needs structure, flexibility, and room for creativity.</h3>
          <p>We build for teachers who want practical support, not generic automation or empty design templates.</p>
        </article>

        <article className="learnflow-info-card">
          <p className="eyebrow">What We Build</p>
          <h3>Lesson workflows, teacher hubs, and AI-supported material systems.</h3>
          <p>From planning to reflection, the platform is shaped as a modern workspace for language education.</p>
        </article>

        <article className="learnflow-info-card">
          <p className="eyebrow">How We Work</p>
          <h3>We turn methodology into usable digital tools.</h3>
          <p>Every page is designed to help teachers move faster while keeping the pedagogy visible and clear.</p>
        </article>
      </section>
    </main>
  );
}
