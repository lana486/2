import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-stack">
      <section className="learnflow-page-hero">
        <div>
          <p className="eyebrow">Sign In</p>
          <h1>Access your teaching workspace.</h1>
          <p className="lead">
            Continue building lessons, open teacher materials, and manage your AI-supported classroom flows.
          </p>
        </div>
        <div className="learnflow-page-hero-art learnflow-art-grid" />
      </section>

      <section className="learnflow-auth-shell">
        <div className="learnflow-auth-panel learnflow-auth-brand">
          <p className="eyebrow">Workspace Access</p>
          <h2>Everything in one place: lesson studio, teacher hub, templates, and AI support.</h2>
          <div className="auth-metrics">
            <span>Lesson Studio</span>
            <span>Teacher Hub</span>
            <span>Interactive Materials</span>
          </div>
        </div>
        <div className="learnflow-auth-panel learnflow-auth-form">
          <h2>Login / Register</h2>
          <form className="form-grid">
            <label>
              Email
              <input type="email" placeholder="name@example.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button type="submit" className="button learnflow-primary">
              Continue
            </button>
          </form>
          <p className="muted">
            New here? <Link href="/pricing">Pick a plan</Link> and start in under two minutes.
          </p>
        </div>
      </section>
    </main>
  );
}
