"use client";

import { useId, useState } from "react";
import type { Workflow } from "@/content/types";
import { en } from "@/content/en";
import Tag from "@/components/ui/Tag";
import ScreenshotStrip from "@/components/ScreenshotStrip";

type Props = { workflow: Workflow; repo: string; slug: string };

export default function WorkflowCard({ workflow, repo, slug }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const t = en.workflow;
  const w = workflow;
  const githubUrl = `${repo}/tree/main/projects/${w.folder}`;

  return (
    <article
      className="overflow-hidden rounded-(--radius-lg) border bg-(--surface) transition-colors"
      style={{ borderColor: open ? "color-mix(in srgb, var(--primary) 35%, var(--border))" : "var(--border)" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start gap-4 p-5 text-left transition-colors hover:bg-(--neutral-tint)"
      >
        <span className="figure shrink-0 pt-0.5 text-lg font-extrabold text-(--primary)">{w.id}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-snug">{w.name.en}</span>
          <span className="mt-1 block text-sm leading-relaxed text-(--text-muted)">{w.problem.en}</span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {w.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </span>
        </span>
        <span
          className="shrink-0 pt-1 text-(--text-dim) transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {/* The detail only exists while open, so its screenshots never load with the page. */}
      {open && (
        <div id={panelId} className="space-y-5 border-t border-(--border) px-5 pt-5 pb-6 sm:pl-14">
          <Block title={t.trigger}>
            <p className="figure text-sm leading-relaxed">{w.trigger.en}</p>
          </Block>

          <Block title={t.howItWorks}>
            <ol className="space-y-1.5 text-sm leading-relaxed text-(--text-muted)">
              {w.steps.map((s, i) => (
                <li key={s.en} className="flex gap-2">
                  <span className="figure shrink-0 font-bold text-(--secondary)">{i + 1}.</span>
                  <span>{s.en}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title={t.highlights}>
            <ul className="space-y-1.5 text-sm leading-relaxed">
              {w.highlights.map((h) => (
                <li key={h.en} className="flex gap-2">
                  <span className="shrink-0 text-(--success)" aria-hidden>
                    ✓
                  </span>
                  <span>{h.en}</span>
                </li>
              ))}
            </ul>
          </Block>

          {w.result && (
            <Block title={t.result}>
              <p className="figure text-sm font-bold text-(--secondary)">{w.result.en}</p>
            </Block>
          )}

          {w.screenshots.length > 0 && (
            <Block title={t.proof}>
              <ScreenshotStrip slug={slug} shots={w.screenshots} githubUrl={githubUrl} />
            </Block>
          )}

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-(--primary) hover:underline"
          >
            {t.viewOnGitHub} ↗
          </a>
        </div>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--text-dim)">{title}</h4>
      {children}
    </div>
  );
}
