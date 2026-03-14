import { PageHero, SplitFeature, TeacherDashboardPreview } from "@/components/sections";

export default function TeachersPage() {
  return (
    <main className="page-stack">
      <PageHero
        eyebrow="Teachers"
        title="A modern control center for educators working alongside AI."
        text="Manage students, build courses, inspect weak points, and receive suggestions that improve live teaching without removing human judgment."
      />
      <TeacherDashboardPreview />
      <SplitFeature
        eyebrow="Video Lesson System"
        title="Built-in classroom tools with screen sharing, live notes, and AI summaries after every session."
        text="Teachers can launch a video lesson, invite students, share materials, and receive instant recap drafts with action items and vocabulary to revisit."
        points={["Screen sharing", "Teacher dashboard", "AI in-lesson assistant", "Automatic follow-up summaries"]}
      />
    </main>
  );
}
