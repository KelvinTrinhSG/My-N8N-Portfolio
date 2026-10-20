"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import Tag from "@/components/ui/Tag";
import { shotSrc, thumbSize } from "@/lib/shots";
import { useLang } from "@/lib/providers";

export default function ProjectCard({ project }: { project: Project }) {
  const { pick } = useLang();
  const [coverBroken, setCoverBroken] = useState(false);
  const coverRef = useRef<HTMLImageElement>(null);

  // The cover starts loading from the pre-rendered HTML, so it can fail before onError is attached.
  useEffect(() => {
    const img = coverRef.current;
    if (img?.complete && img.naturalWidth === 0) setCoverBroken(true);
  }, []);

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface)"
    >
      <span
        className="block aspect-video overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--primary) 20%, var(--surface-2)), color-mix(in srgb, var(--secondary) 20%, var(--surface-2)))",
        }}
      >
        {/* Plain <img>: static export, images are pre-compressed by scripts/images.mjs.
            If the cover fails, the gradient stays instead of a broken-image icon. */}
        {!coverBroken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={coverRef}
            src={shotSrc(project.slug, project.cover, "sm")}
            alt=""
            {...thumbSize(project.slug, project.cover)}
            decoding="async"
            onError={() => setCoverBroken(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </span>
      <span className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-lg font-bold leading-snug group-hover:text-(--primary)">{pick(project.name)}</span>
        <span className="text-sm leading-relaxed text-(--text-muted)">{pick(project.summary)}</span>
        <span className="figure text-base font-extrabold text-(--secondary)">
          {project.stats.map((s) => `${s.value} ${pick(s.label)}`).join(" · ")}
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
