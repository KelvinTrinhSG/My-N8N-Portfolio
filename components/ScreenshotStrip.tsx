"use client";

import { useState } from "react";
import type { Screenshot } from "@/content/types";
import { en } from "@/content/en";
import { shotSrc, thumbSize } from "@/lib/shots";

type Props = {
  slug: string;
  shots: Screenshot[];
  githubUrl: string; // workflow folder, used when an image fails to load
};

// Horizontal, swipeable row of thumbnails with bilingual labels.
// Fixed 16:10 frames (top-aligned crop) keep the row even and reserve space before load.
export default function ScreenshotStrip({ slug, shots, githubUrl }: Props) {
  return (
    <ul className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
      {shots.map((s) => (
        <li key={s.file} className="w-56 shrink-0 snap-start sm:w-64">
          <Thumb slug={slug} shot={s} githubUrl={githubUrl} />
        </li>
      ))}
    </ul>
  );
}

function Thumb({ slug, shot, githubUrl }: { slug: string; shot: Screenshot; githubUrl: string }) {
  const [broken, setBroken] = useState(false);
  const { width, height } = thumbSize(slug, shot.file);
  const label = shot.label.en;

  return (
    <figure className="overflow-hidden rounded-(--radius-md) border border-(--border) bg-(--surface-2)">
      {broken ? (
        // Never a broken-image icon: show the label and a way to see it on GitHub.
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 p-3 text-center text-xs text-(--text-muted) hover:text-(--primary)"
          style={{ aspectRatio: "16 / 10" }}
        >
          <span className="font-semibold">{label}</span>
          <span>{en.workflow.viewOnGitHub} ↗</span>
        </a>
      ) : (
        // Plain <img>: static export, images are pre-compressed by scripts/images.mjs.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shotSrc(slug, shot.file, "sm")}
          alt={label}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="block h-auto w-full object-cover object-top"
          style={{ aspectRatio: "16 / 10" }}
        />
      )}
      <figcaption className="border-t border-(--border) px-3 py-2 text-xs font-medium text-(--text-muted)">
        {label}
      </figcaption>
    </figure>
  );
}
