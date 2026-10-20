"use client";

import { useLang } from "@/lib/providers";
import ButtonLink from "@/components/ui/Button";

export default function Hero() {
  const t = useLang().t.hero;

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

        <div className="order-1 mx-auto md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar-640.webp"
            srcSet="/avatar-320.webp 320w, /avatar-640.webp 640w"
            sizes="(min-width: 640px) 288px, 224px"
            alt={t.avatarAlt}
            width={640}
            height={640}
            fetchPriority="high"
            className="avatar h-56 w-56 rounded-full border-[3px] border-(--secondary) object-cover sm:h-72 sm:w-72"
          />
        </div>
      </div>
    </section>
  );
}
