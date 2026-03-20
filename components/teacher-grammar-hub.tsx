"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TEACHER_ACTIVE_MATERIAL_KEY,
  TEACHER_MATERIALS_STORAGE_KEY,
  defaultTeacherMaterials,
  normalizeTeacherMaterials,
  type TeacherMaterial,
} from "@/lib/teacher-materials";

export function TeacherGrammarHub() {
  const [publishedMaterials, setPublishedMaterials] = useState<TeacherMaterial[]>([]);
  const [notes, setNotes] = useState("");
  const allMaterials = useMemo(() => [...publishedMaterials, ...defaultTeacherMaterials], [publishedMaterials]);
  const fallbackMaterial = allMaterials[0] ?? defaultTeacherMaterials[0];
  const [activeBlock, setActiveBlock] = useState(defaultTeacherMaterials[0].id);

  useEffect(() => {
    const savedMaterials = window.localStorage.getItem(TEACHER_MATERIALS_STORAGE_KEY);
    if (savedMaterials) {
      try {
        setPublishedMaterials(normalizeTeacherMaterials(JSON.parse(savedMaterials)));
      } catch {
        window.localStorage.removeItem(TEACHER_MATERIALS_STORAGE_KEY);
      }
    }

    const savedNotes = window.localStorage.getItem("teacher-grammar-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }

    const savedActive = window.sessionStorage.getItem(TEACHER_ACTIVE_MATERIAL_KEY);
    if (savedActive) {
      setActiveBlock(savedActive);
      window.sessionStorage.removeItem(TEACHER_ACTIVE_MATERIAL_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("teacher-grammar-notes", notes);
  }, [notes]);

  useEffect(() => {
    if (!allMaterials.some((material) => material.id === activeBlock) && fallbackMaterial) {
      setActiveBlock(fallbackMaterial.id);
    }
  }, [activeBlock, allMaterials, fallbackMaterial]);

  const activeContent = allMaterials.find((material) => material.id === activeBlock) ?? fallbackMaterial;
  const articleParagraphs = activeContent.article.split(/\n\s*\n/).filter(Boolean);

  return (
    <main className="page-stack">
      <section className="teacher-hub-shell">
        <div className="teacher-hub-hero">
          <div>
            <p className="eyebrow">Teacher Hub</p>
            <h1>Teacher materials in a clean article format</h1>
            <p className="lead">
              Browse materials, open one article, read the full text, and keep your notes on the right. Published
              materials from teachers appear here automatically.
            </p>
            <div className="teacher-hub-actions">
              <Link href="/teachers/publish" className="button learnflow-primary">
                Add Teacher Material
              </Link>
              <span className="teacher-hub-inline-note">Title, short description, article, tags, and images only.</span>
            </div>
          </div>
          <div className="teacher-hub-visual">
            <div className={`teacher-hub-visual-main teacher-cover-${activeContent.coverStyle}`}>
              {activeContent.images[0] ? (
                <img src={activeContent.images[0].src} alt={activeContent.images[0].name} className="teacher-hub-visual-image" />
              ) : null}
              <div className="teacher-hub-visual-overlay">
                <span>{activeContent.source === "published" ? "Published material" : "Core material"}</span>
                <strong>{activeContent.coverLabel}</strong>
                <p>{activeContent.description}</p>
              </div>
            </div>

            <div className="teacher-hub-floating teacher-hub-floating-top">
              <span>Current selection</span>
              <strong>{activeContent.tags[0] ?? "Teacher article"}</strong>
            </div>

            <div className="teacher-hub-floating teacher-hub-floating-bottom">
              <span>Library</span>
              <strong>{allMaterials.length} materials ready</strong>
            </div>
          </div>
        </div>

        <section className="teacher-topic-grid">
          {allMaterials.map((material) => (
            <button
              key={material.id}
              type="button"
              className={`teacher-topic-card ${activeBlock === material.id ? "active" : ""}`}
              onClick={() => setActiveBlock(material.id)}
            >
              <div className={`teacher-topic-art teacher-cover-${material.coverStyle}`}>{material.coverLabel}</div>
              <div>
                <p className="eyebrow">{material.source === "published" ? "Published Material" : "Core Material"}</p>
                <h2>{material.title}</h2>
                <p>{material.description}</p>
                {material.tags.length > 0 ? (
                  <div className="teacher-card-tags">
                    {material.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </button>
          ))}
        </section>

        <section className="teacher-content-layout">
          <div className="teacher-content-main">
            <section className="teacher-lesson-header">
              <div className="teacher-lesson-copy">
                <p className="eyebrow">Selected Material</p>
                <h2>{activeContent.title}</h2>
                <p className="lead">{activeContent.description}</p>
              </div>
              <div className={`teacher-lesson-image teacher-cover-${activeContent.coverStyle}`}>
                <div className="teacher-lesson-image-tag">{activeContent.coverLabel}</div>
              </div>
            </section>

            {activeContent.tags.length > 0 ? (
              <section className="teacher-tag-strip">
                {activeContent.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </section>
            ) : null}

            {activeContent.images.length > 0 ? (
              <section className="teacher-article-gallery">
                {activeContent.images.map((image) => (
                  <img key={`${activeContent.id}-${image.name}`} src={image.src} alt={image.name} />
                ))}
              </section>
            ) : null}

            <section className="teacher-article-card">
              {articleParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          </div>

          <aside className="teacher-notes-sidebar">
            <section className="teacher-notes-panel teacher-notes-sticky">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Notes</p>
                  <h2>Teaching notes</h2>
                </div>
                <span className="section-badge">Saved automatically</span>
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Write reflections, adaptations, follow-up ideas, or reminders for this material..."
                rows={16}
              />
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
