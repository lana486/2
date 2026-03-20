"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TEACHER_ACTIVE_MATERIAL_KEY,
  TEACHER_MATERIALS_STORAGE_KEY,
  defaultTeacherMaterials,
  getTeacherAuthorId,
  getTeacherMaterialHref,
  readPublishedTeacherMaterials,
  savePublishedTeacherMaterials,
  type TeacherMaterial,
} from "@/lib/teacher-materials";

const TEACHER_NOTES_STORAGE_KEY = "teacher-grammar-notes";

export function TeacherGrammarHub() {
  const [publishedMaterials, setPublishedMaterials] = useState<TeacherMaterial[]>([]);
  const [notes, setNotes] = useState("");
  const [featuredMaterialId, setFeaturedMaterialId] = useState(defaultTeacherMaterials[0]?.id ?? "");
  const [currentAuthorId, setCurrentAuthorId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const allMaterials = useMemo(() => [...publishedMaterials, ...defaultTeacherMaterials], [publishedMaterials]);
  const featuredMaterial = allMaterials.find((material) => material.id === featuredMaterialId) ?? allMaterials[0];
  const featuredTags = featuredMaterial?.tags.slice(0, 3) ?? [];

  useEffect(() => {
    const authorId = getTeacherAuthorId(window.localStorage);
    setCurrentAuthorId(authorId);

    const syncPublishedMaterials = () => {
      setPublishedMaterials(readPublishedTeacherMaterials(window.localStorage, authorId));
    };

    syncPublishedMaterials();

    const savedNotes = window.localStorage.getItem(TEACHER_NOTES_STORAGE_KEY);
    if (savedNotes) {
      setNotes(savedNotes);
    }

    const savedActive = window.sessionStorage.getItem(TEACHER_ACTIVE_MATERIAL_KEY);
    if (savedActive) {
      setFeaturedMaterialId(savedActive);
      window.sessionStorage.removeItem(TEACHER_ACTIVE_MATERIAL_KEY);
    }

    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === TEACHER_MATERIALS_STORAGE_KEY) {
        syncPublishedMaterials();
      }

      if (!event.key || event.key === TEACHER_NOTES_STORAGE_KEY) {
        setNotes(window.localStorage.getItem(TEACHER_NOTES_STORAGE_KEY) ?? "");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem(TEACHER_NOTES_STORAGE_KEY, notes);
    }
  }, [isReady, notes]);

  useEffect(() => {
    if (!featuredMaterial && allMaterials[0]) {
      setFeaturedMaterialId(allMaterials[0].id);
    }
  }, [allMaterials, featuredMaterial]);

  function openMaterial(materialId: string) {
    window.open(getTeacherMaterialHref(materialId), "_blank", "noopener,noreferrer");
  }

  function handleDeleteMaterial(materialId: string) {
    if (!currentAuthorId) {
      return;
    }

    const existingMaterials = readPublishedTeacherMaterials(window.localStorage, currentAuthorId);
    const materialToDelete = existingMaterials.find((material) => material.id === materialId);

    if (!materialToDelete || materialToDelete.authorId !== currentAuthorId) {
      return;
    }

    const isConfirmed = window.confirm(`Delete "${materialToDelete.title}" from Teacher Hub?`);
    if (!isConfirmed) {
      return;
    }

    const nextMaterials = existingMaterials.filter((material) => material.id !== materialId);
    savePublishedTeacherMaterials(window.localStorage, nextMaterials);
    setPublishedMaterials(nextMaterials);

    if (featuredMaterialId === materialId) {
      setFeaturedMaterialId(nextMaterials[0]?.id ?? defaultTeacherMaterials[0]?.id ?? "");
    }
  }

  return (
    <main className="page-stack">
      <section className="teacher-hub-shell">
        <div className="teacher-hub-hero">
          <div>
            <p className="eyebrow">Teacher Hub</p>
            <h1>Open each article in its own window</h1>
            <p className="lead">
              Browse materials, open the full article in a separate window, and keep your notes on the right. Materials
              published from this browser can also be deleted by their author.
            </p>
            <div className="teacher-hub-actions">
              <Link href="/teachers/publish" className="button learnflow-primary">
                Add Teacher Material
              </Link>
              {featuredMaterial ? (
                <button
                  type="button"
                  className="button learnflow-secondary"
                  onClick={() => openMaterial(featuredMaterial.id)}
                >
                  Open Featured Article
                </button>
              ) : null}
            </div>
          </div>
          {featuredMaterial ? (
            <div className="teacher-hub-visual">
              <div className={`teacher-hub-visual-main teacher-cover-${featuredMaterial.coverStyle}`}>
                {featuredMaterial.images[0] ? (
                  <img
                    src={featuredMaterial.images[0].src}
                    alt={featuredMaterial.images[0].name}
                    className="teacher-hub-visual-image"
                  />
                ) : null}
                <div className="teacher-hub-visual-overlay">
                  <span>{featuredMaterial.source === "published" ? "Published material" : "Core material"}</span>
                  <strong>{featuredMaterial.coverLabel}</strong>
                  <p>{featuredMaterial.description}</p>
                </div>
              </div>

              <div className="teacher-hub-floating teacher-hub-floating-top">
                <span>Featured now</span>
                <strong>{featuredTags[0] ?? "Teacher article"}</strong>
              </div>

              <div className="teacher-hub-floating teacher-hub-floating-bottom">
                <span>Library</span>
                <strong>{allMaterials.length} materials ready</strong>
              </div>
            </div>
          ) : null}
        </div>

        <section className="teacher-topic-grid">
          {allMaterials.map((material) => {
            const canDelete = material.source === "published" && material.authorId === currentAuthorId;

            return (
              <article
                key={material.id}
                className="teacher-topic-card teacher-topic-card-clickable"
                role="link"
                tabIndex={0}
                onClick={() => {
                  setFeaturedMaterialId(material.id);
                  openMaterial(material.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setFeaturedMaterialId(material.id);
                    openMaterial(material.id);
                  }
                }}
              >
                <div className={`teacher-topic-art teacher-cover-${material.coverStyle}`}>{material.coverLabel}</div>
                <div className="teacher-topic-card-body">
                  <div className="teacher-topic-card-copy">
                    <p className="eyebrow">{material.source === "published" ? "Published Material" : "Core Material"}</p>
                    <h2>{material.title}</h2>
                    <p>{material.description}</p>
                  </div>

                  {material.tags.length > 0 ? (
                    <div className="teacher-card-tags">
                      {material.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  ) : null}

                  <div className="teacher-card-actions">
                    <span className="teacher-card-open-link">Open article in a new window</span>
                    {canDelete ? (
                      <button
                        type="button"
                        className="teacher-card-delete"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteMaterial(material.id);
                        }}
                      >
                        Delete article
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {featuredMaterial ? (
          <section className="teacher-content-layout">
            <div className="teacher-content-main">
              <section className="teacher-lesson-header">
                <div className="teacher-lesson-copy">
                  <p className="eyebrow">Featured Material</p>
                  <h2>{featuredMaterial.title}</h2>
                  <p className="lead">{featuredMaterial.description}</p>
                </div>
                <div className={`teacher-lesson-image teacher-cover-${featuredMaterial.coverStyle}`}>
                  <div className="teacher-lesson-image-tag">{featuredMaterial.coverLabel}</div>
                </div>
              </section>

              {featuredMaterial.tags.length > 0 ? (
                <section className="teacher-tag-strip">
                  {featuredMaterial.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </section>
              ) : null}

              <section className="teacher-article-card">
                <p>
                  Full materials now open on their own page, so each article has a separate browser window and direct
                  URL.
                </p>
                <p>
                  Open any card above to read the full text. If a published material belongs to the current author in
                  this browser, the card also shows a delete action.
                </p>
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
        ) : null}
      </section>
    </main>
  );
}
