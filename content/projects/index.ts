// All projects shown on the site. To add a repo: create its content file and list it here.
import type { Project } from "@/content/types";
import { n8nFormCrmAutomations } from "./n8n-form-crm-automations";

export const projects: Project[] = [n8nFormCrmAutomations];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
