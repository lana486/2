import { ChatShowcase, PageHero, SplitFeature, StatPanels } from "@/components/sections";

export default function AITutorPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="AI Tutor"
        title="Conversation, correction, and coaching in one interface."
        text="A tutor workspace for text chat, voice mode, error explanation, and dynamic role-play. Designed to feel like an intelligent language studio."
      />
      <ChatShowcase />
      <SplitFeature
        inverse
        eyebrow="Voice Mode"
        title="Pronunciation analysis that works at sentence level, not just single words."
        text="Students get phoneme-level accuracy, pacing notes, confidence markers, and replay suggestions. Teachers can review weak sounds and assign targeted drills."
        points={["Live waveform feedback", "Fluency heatmap", "Accent-sensitive coaching", "Scenario-based speaking prompts"]}
      />
      <StatPanels
        title="AI teacher capabilities"
        stats={[
          { value: "12", label: "Dialogue simulation types" },
          { value: "0.8s", label: "Average response latency target" },
          { value: "5x", label: "More speaking turns per session" },
        ]}
      />
    </main>
  );
}
