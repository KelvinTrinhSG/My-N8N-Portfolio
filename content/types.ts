// Shared content shapes (spec.md > Data Model).

/** Bilingual text. A missing `vi` falls back to `en`. */
export type L = { en: string; vi?: string };

export type Screenshot = {
  file: string; // "02-execution-rejected" (no extension)
  label: L;
  kind: "result" | "execution"; // results (HubSpot/Sheets/Email) are listed first
};

export type Workflow = {
  id: string; // "02"
  folder: string; // "02-secure-webhook-gateway"
  name: L;
  problem: L; // one sentence
  tags: string[];
  trigger: L;
  steps: L[]; // 3–4 steps
  highlights: L[]; // 2–4 points
  result?: L; // only when there is a concrete number
  screenshots: Screenshot[];
};

export type Project = {
  slug: string;
  repo: string;
  name: L;
  summary: L; // one sentence, for the card
  overview: L; // 2–3 sentences
  stats: { label: L; value: string }[];
  principles: L[];
  tags: string[];
  cover: string; // screenshot file used on the card
  workflows: Workflow[];
};
