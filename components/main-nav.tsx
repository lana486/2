import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/lesson-studio", label: "Lesson Studio" },
  { href: "/teachers/grammar-basics", label: "Teacher Hub" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about-us", label: "About Us" },
];

export function MainNav() {
  return (
    <header className="topbar">
      <Link href="/" className="brand-mark">
        <span className="brand-badge">◧</span>
        <span>LearnFlow</span>
      </Link>
      <nav className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href="/login" className="button learnflow-primary topbar-cta">
        Get Started
      </Link>
    </header>
  );
}
