import { en } from "@/content/en";
import ButtonLink from "@/components/ui/Button";

export default function Hero() {
  const t = en.hero;

  return (
    <section id="home" className="hero-glow scroll-mt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-24">
        <div className="order-2 md:order-1">
          <p className="text-sm font-semibold text-(--text-muted)">{t.greeting}</p>
          <h1 className="headline mt-2">{t.name}</h1>
          <p className="gradient-text mt-3 text-xl font-bold sm:text-2xl">{t.role}</p>
          <p className="mt-5 max-w-xl leading-relaxed text-(--text-muted)">{t.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects">{t.viewProjects}</ButtonLink>
            <ButtonLink href="#contact" variant="outline">
              {t.contact}
            </ButtonLink>
          </div>
        </div>

        {/* Avatar placeholder — replaced by the compressed photo in slice 3. */}
        <div className="order-1 mx-auto md:order-2">
          <div
            className="flex h-56 w-56 items-center justify-center rounded-full border-[3px] border-(--secondary) text-5xl font-extrabold text-white sm:h-72 sm:w-72"
            style={{ background: "linear-gradient(135deg, var(--secondary), var(--primary))" }}
            aria-hidden
          >
            KT
          </div>
        </div>
      </div>
    </section>
  );
}
