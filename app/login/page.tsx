import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-stack">
      <section className="auth-shell">
        <div className="auth-panel auth-brand">
          <p className="eyebrow">Welcome Back</p>
          <h1>Access your AI classroom.</h1>
          <p>
            Continue lessons, reopen tutor conversations, and review your weekly learning plan across devices.
          </p>
          <div className="auth-metrics">
            <span>AI Tutor</span>
            <span>Courses</span>
            <span>Speaking</span>
          </div>
        </div>
        <div className="auth-panel auth-form">
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
            <button type="submit" className="button button-primary">
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
