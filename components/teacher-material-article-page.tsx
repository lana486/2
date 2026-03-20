"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  TEACHER_MATERIALS_STORAGE_KEY,
  defaultTeacherMaterials,
  getTeacherAuthorId,
  readPublishedTeacherMaterials,
  savePublishedTeacherMaterials,
  type TeacherMaterial,
} from "@/lib/teacher-materials";

const TEACHER_NOTES_STORAGE_KEY = "teacher-grammar-notes";

type TeacherMaterialArticlePageProps = {
  materialId: string;
};

export function TeacherMaterialArticlePage({ materialId }: TeacherMaterialArticlePageProps) {
  const router = useRouter();
  const [publishedMaterials, setPublishedMaterials] = useState<TeacherMaterial[]>([]);
  const [notes, setNotes] = useState("");
  const [currentAuthorId, setCurrentAuthorId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const authorId = getTeacherAuthorId(window.localStorage);
    setCurrentAuthorId(authorId);

    const syncPublishedMaterials = () => {
      setPublishedMaterials(readPublishedTeacherMaterials(window.localStorage, authorId));
    };

    syncPublishedMaterials();
    setNotes(window.localStorage.getItem(TEACHER_NOTES_STORAGE_KEY) ?? "");
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

  const material = useMemo(() => {
    const allMaterials = [...publishedMaterials, ...defaultTeacherMaterials];
    return allMaterials.find((item) => item.id === materialId) ?? null;
  }, [materialId, publishedMaterials]);

  const articleParagraphs = material?.article.split(/\n\s*\n/).filter(Boolean) ?? [];
  const canDelete = Boolean(
    material && material.source === "published" && material.authorId && material.authorId === currentAuthorId,
  );

  function handleDeleteMaterial() {
    if (!material || !currentAuthorId || material.authorId !== currentAuthorId) {
      return;
    }

    const isConfirmed = window.confirm(`Delete "${material.title}" from Teacher Hub?`);
    if (!isConfirmed) {
      return;
    }

    const existingMaterials = readPublishedTeacherMaterials(window.localStorage, currentAuthorId);
    const nextMaterials = existingMaterials.filter((item) => item.id !== material.id);

    savePublishedTeacherMaterials(window.localStorage, nextMaterials);
    setPublishedMaterials(nextMaterials);
    router.replace("/teachers/grammar-basics");
  }

  if (!isReady) {
    return (
      <main className="page-stack">
        <section className="teacher-hub-shell">
          <section className="teacher-article-card">
            <p>Loading article...</p>
          </section>
        </section>
      </main>
    );
  }

  if (!material) {
    return (
      <main className="page-stack">
        <section className="teacher-hub-shell">
          <section className="teacher-article-card">
            <p>This material was not found. It may have been deleted from Teacher Hub.</p>
            <div className="teacher-inline-actions">
              <Link href="/teachers/grammar-basics" className="button learnflow-primary">
                Back To Teacher Hub
              </Link>
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="page-stack">
      <section className="teacher-hub-shell">
        <section className="teacher-lesson-header teacher-article-header">
          <div className="teacher-lesson-copy">
            <p className="eyebrow">{material.source === "published" ? "Published Material" : "Core Material"}</p>
            <h2>{material.title}</h2>
            <p className="lead">{material.description}</p>
            <div className="teacher-inline-actions">
              <Link href="/teachers/grammar-basics" className="button learnflow-secondary">
                Back To Teacher Hub
              </Link>
              {canDelete ? (
                <button type="button" className="button teacher-danger-button" onClick={handleDeleteMaterial}>
                  Delete Article
                </button>
              ) : null}
            </div>
          </div>
          <div className={`teacher-lesson-image teacher-cover-${material.coverStyle}`}>
            <div className="teacher-lesson-image-tag">{material.coverLabel}</div>
          </div>
        </section>

        {material.tags.length > 0 ? (
          <section className="teacher-tag-strip">
            {material.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </section>
        ) : null}

        <section className="teacher-content-layout">
          <div className="teacher-content-main">
            {material.images.length > 0 ? (
              <section className="teacher-article-gallery">
                {material.images.map((image) => (
                  <img key={`${material.id}-${image.name}`} src={image.src} alt={image.name} />
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
