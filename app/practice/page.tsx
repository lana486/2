import { ExerciseMatrix, PageHero, SplitFeature } from "@/components/sections";

export default function PracticePage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Practice"
        title="Interactive drills designed as crisp, focused slide modules."
        text="Vocabulary trainers, grammar loops, listening tasks, writing feedback, and review challenges live in one responsive practice space."
      />
      <ExerciseMatrix />
      <SplitFeature
        inverse
        eyebrow="Adaptive Review"
        title="Spaced repetition that prioritizes weak vocabulary and fragile grammar patterns."
        text="The system mixes confidence ratings, error frequency, and lesson history to schedule the next best review set automatically."
        points={["Vocabulary memory system", "Writing correction with AI feedback", "Timed review mode", "XP and achievement loops"]}
      />
    </main>
  );
}
