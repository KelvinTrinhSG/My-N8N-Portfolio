"use client";

import Link from "next/link";
import { useLang, useTheme, type Lang } from "@/lib/providers";

const LINKS = ["home", "about", "skills", "projects", "contact"] as const;
const LANGS: Lang[] = ["en", "vi"];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  const iconBtn =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-(--radius-sm) border border-(--border) bg-(--surface) text-base transition-colors hover:border-(--border-strong)";

  return (
    <header
      className="sticky top-0 z-40 border-b border-(--border) backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/#home" className="flex min-w-0 items-center gap-2 font-extrabold tracking-tight">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-sm) text-sm text-white"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            aria-hidden
          >
            ✻
          </span>
          <span className="truncate">{t.nav.name}</span>
        </Link>

        {/* Links are always "/#id" so they work from the project page too. */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              className="rounded-(--radius-sm) px-3 py-1.5 text-sm font-medium text-(--text-muted) transition-colors hover:bg-(--neutral-tint) hover:text-(--text)"
            >
              {t.nav.links[id]}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div
            role="group"
            aria-label={t.nav.language}
            className="flex rounded-(--radius-sm) border border-(--border) bg-(--surface) p-0.5"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className="figure cursor-pointer rounded-md px-2.5 py-1 text-xs font-bold uppercase transition-colors"
                style={lang === l ? { background: "var(--primary)", color: "var(--on-primary)" } : { color: "var(--text-dim)" }}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={iconBtn}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
            title={theme === "dark" ? t.nav.toLight : t.nav.toDark}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}
