"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  TEACHER_ACTIVE_MATERIAL_KEY,
  TEACHER_MATERIALS_STORAGE_KEY,
  createPublishedMaterialId,
  normalizeTeacherMaterials,
  teacherCoverOptions,
  teacherTagOptions,
  type TeacherMaterial,
  type TeacherMaterialImage,
} from "@/lib/teacher-materials";

function fileToDataUrl(file: File) {
  return new Promise<TeacherMaterialImage>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ src: String(reader.result), name: file.name });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function TeacherMaterialPublisher() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [article, setArticle] = useState("");
  const [selectedCover, setSelectedCover] = useState<(typeof teacherCoverOptions)[number]["id"]>("sky");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<TeacherMaterialImage[]>([]);

  const preview = useMemo(
    () => ({
      title: title || "Your material title",
      description: description || "A short description for the Teacher Hub card.",
      article:
        article ||
        "This will become the main article text. Use this space for a full teacher note, methodology explanation, worksheet guide, or lesson commentary.",
      coverStyle: selectedCover,
      tags: selectedTags,
      images,
    }),
    [title, description, article, selectedCover, selectedTags, images],
  );

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  async function handleImageFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const uploaded = await Promise.all(files.map(fileToDataUrl));
    setImages((current) => [...current, ...uploaded].slice(0, 6));
  }

  function removeImage(name: string) {
    setImages((current) => current.filter((image) => image.name !== name));
  }

  function publishMaterial() {
    const material: TeacherMaterial = {
      id: createPublishedMaterialId(),
      title: title.trim(),
      description: description.trim(),
      article: article.trim(),
      coverLabel: selectedTags[0] || "Teacher material",
      coverStyle: selectedCover,
      tags: selectedTags,
      images,
      source: "published",
    };

    const current = window.localStorage.getItem(TEACHER_MATERIALS_STORAGE_KEY);
    let existing: TeacherMaterial[] = [];

    if (current) {
      try {
        existing = normalizeTeacherMaterials(JSON.parse(current));
      } catch {
        window.localStorage.removeItem(TEACHER_MATERIALS_STORAGE_KEY);
      }
    }
    const next = [material, ...existing];

    window.localStorage.setItem(TEACHER_MATERIALS_STORAGE_KEY, JSON.stringify(next));
    window.sessionStorage.setItem(TEACHER_ACTIVE_MATERIAL_KEY, material.id);
    router.push("/teachers/grammar-basics");
  }

  const isDisabled = !title.trim() || !description.trim() || !article.trim();

  return (
    <main className="page-stack">
      <section className="teacher-publisher-shell">
        <section className="teacher-publisher-hero">
          <div>
            <p className="eyebrow">Teacher Publisher</p>
            <h1>Create a teacher article for the hub</h1>
            <p className="lead">
              Keep it simple: add a title, a short description, the full article, a few thematic tags, and optional
              images. After publishing, the material appears directly in Teacher Hub.
            </p>
          </div>
        </section>

        <section className="teacher-publisher-layout">
          <section className="teacher-publisher-form">
            <div className="section-header-row">
              <div>
                <p className="eyebrow">Material Form</p>
                <h2>Write the material</h2>
              </div>
            </div>

            <label>
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Teaching future forms through travel plans"
              />
            </label>

            <label>
              Short description
              <textarea
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="A short summary that will appear on the Teacher Hub card."
              />
            </label>

            <label>
              Main article
              <textarea
                rows={14}
                value={article}
                onChange={(event) => setArticle(event.target.value)}
                placeholder="Write the full article here. You can structure it in paragraphs and leave blank lines between sections."
              />
            </label>

            <section className="teacher-cover-chooser">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Cover</p>
                  <h2>Choose a cover style</h2>
                </div>
              </div>
              <div className="teacher-cover-grid">
                {teacherCoverOptions.map((cover) => (
                  <button
                    key={cover.id}
                    type="button"
                    className={`teacher-cover-option teacher-cover-${cover.id} ${
                      selectedCover === cover.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCover(cover.id)}
                  >
                    <span>{cover.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="teacher-tag-chooser">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow">Tags</p>
                  <h2>Choose thematic tags</h2>
                </div>
              </div>
              <div className="teacher-tag-list">
                {teacherTagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`teacher-tag-chip ${selectedTags.includes(tag) ? "active" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            <label>
              Images
              <input type="file" accept="image/*" multiple onChange={handleImageFiles} />
            </label>

            {images.length > 0 ? (
              <div className="teacher-uploaded-images">
                {images.map((image) => (
                  <article key={image.name} className="teacher-uploaded-image-card">
                    <img src={image.src} alt={image.name} />
                    <div>
                      <strong>{image.name}</strong>
                      <button type="button" onClick={() => removeImage(image.name)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className="button learnflow-primary"
              onClick={publishMaterial}
              disabled={isDisabled}
            >
              Publish To Teacher Hub
            </button>
          </section>

          <aside className="teacher-publisher-preview">
            <div className="section-header-row">
              <div>
                <p className="eyebrow">Preview</p>
                <h2>How it will look</h2>
              </div>
            </div>

            <article className="teacher-topic-card teacher-topic-card-preview active">
              <div className={`teacher-topic-art teacher-cover-${preview.coverStyle}`}>{preview.tags[0] || "New material"}</div>
              <div>
                <p className="eyebrow">Published Material</p>
                <h2>{preview.title}</h2>
                <p>{preview.description}</p>
              </div>
            </article>

            <div className="teacher-tag-strip">
              {(preview.tags.length > 0 ? preview.tags : ["Tags will appear here"]).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <section className="teacher-article-card">
              {preview.article.split(/\n\s*\n/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            {preview.images.length > 0 ? (
              <section className="teacher-article-gallery">
                {preview.images.map((image) => (
                  <img key={image.name} src={image.src} alt={image.name} />
                ))}
              </section>
            ) : null}
          </aside>
        </section>
      </section>
    </main>
  );
}
