import Link from "next/link";
import type { Project } from "@/content/types";
import Tag from "@/components/ui/Tag";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface)"
    >
      {/* Cover placeholder — the real screenshot arrives in slice 3. */}
      <span
        className="block aspect-video"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--primary) 20%, var(--surface-2)), color-mix(in srgb, var(--secondary) 20%, var(--surface-2)))",
        }}
        aria-hidden
      />
      <span className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-lg font-bold leading-snug group-hover:text-(--primary)">{project.name.en}</span>
        <span className="text-sm leading-relaxed text-(--text-muted)">{project.summary.en}</span>
        <span className="figure text-base font-extrabold text-(--secondary)">
          {project.stats.map((s) => `${s.value} ${s.label.en}`).join(" · ")}
        </span>
        <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </span>
      </span>
    </Link>
  );
}
