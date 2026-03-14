export default function AboutUsPage() {
  return (
    <main className="page-stack">
      <section className="page-hero">
        <p className="eyebrow">About Us</p>
        <h1>We build AI tools that help teachers design stronger language lessons.</h1>
        <p className="lead">
          Our platform combines modern lesson design, teacher-friendly methodology, and AI support so educators
          can prepare faster, teach more clearly, and create more engaging classroom experiences.
        </p>
      </section>

      <section className="lesson-two-col">
        <article className="interactive-card">
          <p className="eyebrow">What We Believe</p>
          <h3>Good teaching needs structure, flexibility, and space for creativity.</h3>
          <p>
            We design tools for teachers who want practical support, not generic automation. The goal is to help
            educators build better lessons, reflect on methodology, and adapt materials quickly.
          </p>
        </article>

        <article className="interactive-card">
          <p className="eyebrow">What We Build</p>
          <h3>Lesson workflows, interactive materials, and AI-supported teaching spaces.</h3>
          <p>
            From lesson planning to teacher training content and interactive classroom exercises, the platform is
            shaped as a modern editorial workspace for language education.
          </p>
        </article>
      </section>
    </main>
  );
}
