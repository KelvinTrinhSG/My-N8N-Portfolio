import Link from "next/link";
import { en } from "@/content/en";

const LINKS = ["home", "about", "skills", "projects", "contact"] as const;

export default function Navbar() {
  const t = en.nav;

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
          <span className="truncate">{t.name}</span>
        </Link>

        {/* Links are always "/#id" so they work from the project page too. */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              className="rounded-(--radius-sm) px-3 py-1.5 text-sm font-medium text-(--text-muted) transition-colors hover:bg-(--neutral-tint) hover:text-(--text)"
            >
              {t.links[id]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
