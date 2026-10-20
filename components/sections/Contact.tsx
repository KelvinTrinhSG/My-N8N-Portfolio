import { en } from "@/content/en";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Contact() {
  const t = en.contact;
  const cards = [
    { label: t.email, value: t.emailAddress, href: `mailto:${t.emailAddress}`, icon: "✉", external: false },
    { label: t.github, value: t.githubHandle, href: `https://github.com/${t.githubHandle}`, icon: "⌥", external: true },
  ];

  return (
    <section id="contact" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card-hover flex items-center gap-4 rounded-(--radius-lg) border border-(--border) bg-(--surface) p-5"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
                  aria-hidden
                >
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{c.label}</span>
                  {/* Shown as text so visitors can copy it. */}
                  <span className="figure block truncate text-sm text-(--text-muted) select-all">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
