// Centered section heading with a muted subtitle (Bianca layout).
export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-(--text-muted) sm:text-base">{subtitle}</p>}
    </div>
  );
}
