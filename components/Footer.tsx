"use client";

import { useLang } from "@/lib/providers";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t border-(--border) bg-(--bg-alt)">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-(--text-faint) sm:flex-row sm:px-6">
        <span>
          © {new Date().getFullYear()} {t.nav.name}
        </span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}
