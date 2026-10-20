"use client";

import { useLang } from "@/lib/providers";
import ButtonLink from "@/components/ui/Button";

// Exported as out/404.html; Vercel serves it for any unknown path.
export default function NotFound() {
  const t = useLang().t.notFound;

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="figure text-6xl font-extrabold text-(--primary)">404</span>
      <h1 className="mt-4 text-2xl font-extrabold tracking-[-0.02em]">{t.title}</h1>
      <p className="mt-2 text-(--text-muted)">{t.body}</p>
      <ButtonLink href="/#projects" className="mt-8">
        ← {t.back}
      </ButtonLink>
    </section>
  );
}
