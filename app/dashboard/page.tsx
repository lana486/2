import { DashboardShowcase, PageHero, WeeklyPlan } from "@/components/sections";

export default function DashboardPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Dashboard"
        title="Track progress, review vocabulary, and keep the week moving."
        text="A student-facing dashboard with progress metrics, lesson history, AI conversations, vocabulary retention, and a guided weekly plan."
      />
      <DashboardShowcase />
      <WeeklyPlan />
    </main>
  );
}
