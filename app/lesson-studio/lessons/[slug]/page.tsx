import Link from "next/link";
import { notFound } from "next/navigation";
import { allLessonPreviews, getLessonBySlug } from "@/lib/lesson-studio-lessons";

export function generateStaticParams() {
  return allLessonPreviews.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export default async function LessonPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="page-stack">
      <section className="lesson-detail-page">
        <div className="lesson-detail-actions">
          <Link href="/lesson-studio" className="button button-secondary">
            Back to lessons
          </Link>
          <a href={lesson.lessonLink} target="_blank" rel="noreferrer" className="button button-primary">
            Open lesson in Miro
          </a>
        </div>

        <article className="lesson-detail-card">
          <div className={`lesson-detail-cover ${lesson.colorClass}`}>
            <span className="lesson-detail-topic">{lesson.topic}</span>
            <strong>{lesson.coverLabel}</strong>
          </div>

          <div className="lesson-detail-body">
            <div className="lesson-detail-meta">
              <span>{lesson.level}</span>
              {lesson.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              <span>{lesson.duration}</span>
            </div>

            <div className="lesson-detail-copy">
              <p className="eyebrow">Lesson Preview</p>
              <h1>{lesson.title}</h1>
              <p>{lesson.description}</p>
            </div>

            {lesson.author || lesson.rating ? (
              <div className="lesson-detail-footer">
                {lesson.author ? <strong>{lesson.author}</strong> : <span />}
                {lesson.rating ? <span>{lesson.rating}</span> : null}
              </div>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}
