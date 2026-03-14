import { PageHero, SpeakingPanels, StatPanels } from "@/components/sections";

export default function SpeakingTrainerPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Speaking Trainer"
        title="A dedicated studio for pronunciation, fluency, and conversation confidence."
        text="Run targeted sound drills, simulate real-world conversations, and watch AI score pacing, clarity, and hesitation patterns."
      />
      <SpeakingPanels />
      <StatPanels
        title="Speaking insights"
        stats={[
          { value: "91", label: "Average pronunciation score" },
          { value: "7", label: "Conversation simulations" },
          { value: "3.4x", label: "Higher speaking frequency" },
        ]}
      />
    </main>
  );
}
