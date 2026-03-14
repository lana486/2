"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type MaterialItem = {
  name: string;
  type: string;
};

const lessonFrames = [
  "Presentation -> Practice -> Production",
  "Warm-up -> Guided discovery -> Communication",
  "Project-based lesson",
  "Exam-focused lesson",
];

const methodologies = [
  "Communicative approach",
  "Lexical approach",
  "Task-based learning",
  "PPP with controlled progression",
];

export function LessonStudioForm() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [lessonFrame, setLessonFrame] = useState(lessonFrames[0]);
  const [methodology, setMethodology] = useState(methodologies[0]);
  const [notes, setNotes] = useState("");
  const [materials, setMaterials] = useState<MaterialItem[]>([]);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setMaterials(
      files.map((file) => ({
        name: file.name,
        type: file.type || "file",
      })),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      topic,
      lessonFrame,
      methodology,
      notes,
      materials,
    };

    window.sessionStorage.setItem("lesson-studio-draft", JSON.stringify(payload));
    router.push("/lesson-studio/generated");
  }

  return (
    <section className="studio-shell">
      <div className="studio-intro">
        <p className="eyebrow">Teacher Workspace</p>
        <h1>Prepare lessons with AI in one clean flow.</h1>
        <p className="lead">
          Write the lesson topic, choose the structure and methodology, attach photo or video references,
          and leave teaching notes. Then we move to a generated lesson draft on the next page.
        </p>
      </div>

      <form className="studio-form" onSubmit={handleSubmit}>
        <label>
          Lesson topic
          <input
            type="text"
            placeholder="For example: Ordering food in a restaurant"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            required
          />
        </label>

        <div className="studio-two-col">
          <label>
            Lesson frame
            <select value={lessonFrame} onChange={(event) => setLessonFrame(event.target.value)}>
              {lessonFrames.map((frame) => (
                <option key={frame} value={frame}>
                  {frame}
                </option>
              ))}
            </select>
          </label>

          <label>
            Methodology
            <select value={methodology} onChange={(event) => setMethodology(event.target.value)}>
              {methodologies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          AI materials
          <input type="file" accept="image/*,video/*" multiple onChange={handleFiles} />
        </label>

        <div className="material-list">
          {materials.length > 0 ? (
            materials.map((material) => (
              <span key={material.name}>
                {material.name} · {material.type.startsWith("video") ? "Video" : "Image"}
              </span>
            ))
          ) : (
            <span>No materials added yet</span>
          )}
        </div>

        <label>
          Notes for AI
          <textarea
            placeholder="Student level, target grammar, vocabulary focus, speaking goal, class timing, special requests..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={7}
          />
        </label>

        <button type="submit" className="button button-primary">
          Generate Lesson Draft
        </button>
      </form>
    </section>
  );
}
