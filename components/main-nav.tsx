import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/ai-tutor", label: "AI Tutor" },
  { href: "/lesson-studio", label: "Lesson Studio" },
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/speaking-trainer", label: "Speaking Trainer" },
  { href: "/teachers", label: "Teachers" },
  { href: "/teachers/grammar-basics", label: "Teacher Hub" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function MainNav() {
  return (
    <header className="topbar">
      <Link href="/" className="brand-mark">
        EN.AI
      </Link>
      <nav className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href="/login" className="button button-secondary">
        Login
      </Link>
    </header>
  );
}
