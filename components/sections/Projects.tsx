"use client";

import { useLang } from "@/lib/providers";
import { projects } from "@/content/projects";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const t = useLang().t.projects;

  return (
    <section id="projects" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={t.title} subtitle={t.subtitle} />
        {/* One card centered while there's a single project; grows into a grid as repos are added. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {projects.map((p) => (
            <li key={p.slug} className="w-full max-w-md">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
