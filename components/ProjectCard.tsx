import Link from "next/link";
import type { Project } from "@/content/types";
import Tag from "@/components/ui/Tag";
import { shotSrc, thumbSize } from "@/lib/shots";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface)"
    >
      <span className="block aspect-video overflow-hidden bg-(--surface-2)">
        {/* Plain <img>: static export, images are pre-compressed by scripts/images.mjs. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shotSrc(project.slug, project.cover, "sm")}
          alt=""
          {...thumbSize(project.slug, project.cover)}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </span>
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
