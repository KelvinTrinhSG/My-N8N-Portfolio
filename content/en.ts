// English UI text — the source of truth. `vi.ts` mirrors this shape.
// Name, role and intro are placeholders: edit them freely (prd.md > Open Questions).

export const en = {
  meta: {
    title: "Kelvin Trinh — AI Agent & n8n Automation",
    description:
      "Production-ready n8n automations and AI agents: tested, idempotent, integrated with HubSpot, Google Sheets, Calendly and email.",
  },
  nav: {
    name: "Kelvin Trinh",
    links: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Kelvin Trinh",
    role: "AI Agent & n8n Automation",
    intro:
      "I build automations that don't lose leads: tested, secured, and wired into the tools your team already uses.",
    viewProjects: "View projects",
    contact: "Contact",
  },
  about: {
    title: "About",
    subtitle: "Why my automations are production-ready",
    body: [
      "Most workflows work in a demo and break in production. I design n8n automations for the real world: every workflow is covered by unit tests, writes data idempotently so retries never create duplicates, and answers webhooks fast so nothing times out.",
      "When AI is in the loop, its output is validated before anything touches your CRM. Failures go to a dead-letter queue with retries instead of disappearing silently.",
    ],
    points: [
      { value: "63", label: "unit tests" },
      { value: "10", label: "live-tested workflows" },
      { value: "5+", label: "integrations" },
    ],
  },
  skills: {
    title: "Skills & Integrations",
    subtitle: "Tools I connect into reliable workflows",
    items: [
      { name: "n8n", note: "Workflow automation" },
      { name: "HubSpot", note: "CRM" },
      { name: "Google Sheets", note: "Data & reporting" },
      { name: "Calendly", note: "Scheduling" },
      { name: "OpenAI", note: "AI agents & extraction" },
      { name: "Gmail / SMTP", note: "Email" },
      { name: "JavaScript / Node.js", note: "Code nodes" },
      { name: "Testing", note: "Unit tests & live runs" },
    ],
  },
  projects: {
    title: "Projects",
    subtitle: "Real problems, solved with production-grade automation",
  },
  project: {
    back: "Back to projects",
    principles: "Engineering principles",
    viewRepo: "View on GitHub",
    workflows: "Workflows",
    workflowsHint: "Click a workflow to see how it works and the proof from live runs.",
    ctaTitle: "Need automation like this for your team?",
    contact: "Contact me",
  },
  workflow: {
    trigger: "Trigger",
    howItWorks: "How it works",
    highlights: "Production highlights",
    result: "Result",
    viewOnGitHub: "View on GitHub",
  },
  contact: {
    title: "Contact",
    subtitle: "Have a workflow in mind? Let's talk.",
    email: "Email",
    emailAddress: "thkien85@gmail.com",
    github: "GitHub",
    githubHandle: "KelvinTrinhSG",
  },
  footer: {
    rights: "Built with Next.js.",
  },
};

export type Dict = typeof en;
