import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { en } from "@/content/en";
import { getProject, projects } from "@/content/projects";
import ProjectDetail from "@/components/ProjectDetail";

// One pre-built HTML page per project; unknown slugs fall through to 404.html.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name.en} — ${en.nav.name}`, description: project.summary.en } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
