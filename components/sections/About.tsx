import { en } from "@/content/en";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  const t = en.about;

  return (
    <section id="about" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4 leading-relaxed text-(--text-muted)">
            {t.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {t.points.map((p) => (
              <li
                key={p.label}
                className="rounded-(--radius-md) border border-(--border) bg-(--surface) px-5 py-4 text-center shadow-(--shadow-sm)"
              >
                <span className="figure block text-3xl font-extrabold text-(--secondary)">{p.value}</span>
                <span className="mt-1 block text-xs text-(--text-muted)">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
