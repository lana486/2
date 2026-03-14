import { PageHero, PricingCards, StatPanels } from "@/components/sections";

export default function PricingPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Pricing"
        title="Clear plans for students, private teachers, and language teams."
        text="Premium visual design, AI tutor access, live lesson tools, and scalable dashboards packaged without clutter."
      />
      <PricingCards />
      <StatPanels
        title="What every plan includes"
        stats={[
          { value: "AI", label: "Lesson generation and tutor support" },
          { value: "Live", label: "Teacher collaboration workflows" },
          { value: "Mobile", label: "Responsive practice everywhere" },
        ]}
      />
    </main>
  );
}
