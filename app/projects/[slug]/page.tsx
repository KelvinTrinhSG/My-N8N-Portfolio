import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { en } from "@/content/en";
import { getProject, projects } from "@/content/projects";
import ButtonLink from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import WorkflowCard from "@/components/WorkflowCard";

// One pre-built HTML page per project; unknown slugs fall through to 404.html.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name.en} — ${en.nav.name}`, description: project.summary.en } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const t = en.project;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/#projects" className="text-sm font-semibold text-(--text-muted) hover:text-(--primary)">
        ← {t.back}
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">{project.name.en}</h1>
        <p className="mt-4 leading-relaxed text-(--text-muted)">{project.overview.en}</p>

        <ul className="mt-6 grid grid-cols-3 gap-3">
          {project.stats.map((s) => (
            <li
              key={s.label.en}
              className="rounded-(--radius-md) border border-(--border) bg-(--surface) px-4 py-3 text-center"
            >
              <span className="figure block text-2xl font-extrabold text-(--secondary) sm:text-3xl">{s.value}</span>
              <span className="mt-0.5 block text-xs text-(--text-muted)">{s.label.en}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <section className="mt-10 rounded-(--radius-lg) border border-(--border) bg-(--bg-alt) p-5 sm:p-6">
        <h2 className="text-lg font-bold">{t.principles}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-(--text-muted)">
          {project.principles.map((p) => (
            <li key={p.en} className="flex gap-2">
              <span className="shrink-0 text-(--primary)" aria-hidden>
                ◆
              </span>
              <span>{p.en}</span>
            </li>
          ))}
        </ul>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-(--primary) hover:underline"
        >
          {t.viewRepo} ↗
        </a>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-[-0.02em]">{t.workflows}</h2>
        <p className="mt-1 text-sm text-(--text-muted)">{t.workflowsHint}</p>
        <ol className="mt-6 space-y-3">
          {project.workflows.map((w) => (
            <li key={w.id}>
              <WorkflowCard workflow={w} repo={project.repo} slug={project.slug} />
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14 rounded-(--radius-lg) border border-(--border) bg-(--surface) p-6 text-center">
        <p className="font-bold">{t.ctaTitle}</p>
        <ButtonLink href="/#contact" className="mt-4">
          {t.contact}
        </ButtonLink>
      </div>
    </div>
  );
}
