import { en } from "@/content/en";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-(--border) bg-(--bg-alt)">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-(--text-faint) sm:flex-row sm:px-6">
        <span>
          © {new Date().getFullYear()} {en.nav.name}
        </span>
        <span>{en.footer.rights}</span>
      </div>
    </footer>
  );
}
