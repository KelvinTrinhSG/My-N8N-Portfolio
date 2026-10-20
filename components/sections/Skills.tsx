import { en } from "@/content/en";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Skills() {
  const t = en.skills;

  return (
    <section id="skills" className="scroll-mt-16 bg-(--bg-alt) py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {t.items.map((s) => (
            <li
              key={s.name}
              className="card-hover rounded-(--radius-md) border border-(--border) bg-(--surface) p-4 text-center"
            >
              <span className="block font-bold">{s.name}</span>
              <span className="mt-1 block text-xs text-(--text-muted)">{s.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
