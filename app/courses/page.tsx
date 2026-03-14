import { CourseGrid, PageHero, SplitFeature } from "@/components/sections";

export default function CoursesPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Courses"
        title="Goal-based course design with AI-generated lesson arcs."
        text="Choose business English, travel, exam prep, pronunciation bootcamps, or custom objectives. The platform builds a structured route and refreshes it based on progress."
      />
      <CourseGrid />
      <SplitFeature
        eyebrow="Lesson Generator"
        title="Every course expands into vocabulary, explanation, practice, conversation, and quiz."
        text="Generate lessons by CEFR level, grammar focus, vocabulary themes, and weekly intensity. Students get consistency. Teachers keep the final editorial control."
        points={["A1-C2 templates", "Topic-specific vocabulary sets", "Grammar sequencing", "AI-generated recap notes"]}
      />
    </main>
  );
}
