// Content safety net (spec.md > Content Check Script). Run with `npm run check`.
// - every workflow has name, problem, trigger, steps and highlights in EN and VI
// - every screenshot (and cover) has -sm/-lg files and recorded dimensions
// - project slugs and workflow ids are unique; every project file is listed in index.ts
// Prints all problems and exits with code 1 if there are any.
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "content", "projects");
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const exists = (p) => fs.access(p).then(() => true, () => false);

// Node 24 runs the .ts content files directly (type-only imports are stripped).
const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const index = await fs.readFile(path.join(DIR, "index.ts"), "utf8");
const projects = [];
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(DIR, f)).href);
  const found = Object.values(mod).filter((v) => v && typeof v === "object" && "slug" in v && "workflows" in v);
  if (!found.length) fail(f, "exports no project");
  if (!index.includes(`./${f.replace(/\.ts$/, "")}"`)) fail(f, "not listed in content/projects/index.ts");
  projects.push(...found);
}

function bilingual(where, field, value) {
  const list = Array.isArray(value) ? value : [value];
  if (!value || !list.length) return fail(where, `missing ${field}`);
  list.forEach((v, i) => {
    const at = Array.isArray(value) ? `${field}[${i}]` : field;
    if (!v?.en?.trim()) fail(where, `${at} has no English text`);
    if (!v?.vi?.trim()) fail(where, `${at} has no Vietnamese text`);
  });
}

const slugs = new Set();
for (const p of projects) {
  if (slugs.has(p.slug)) fail(p.slug, "duplicate project slug");
  slugs.add(p.slug);

  const sizesFile = path.join(DIR, `${p.slug}.images.json`);
  const sizes = (await exists(sizesFile)) ? JSON.parse(await fs.readFile(sizesFile, "utf8")) : {};
  if (!(await exists(sizesFile))) fail(p.slug, `missing ${path.relative(ROOT, sizesFile)} (run npm run images)`);

  async function checkImage(where, file) {
    for (const size of ["sm", "lg"]) {
      const img = path.join(ROOT, "public", "shots", p.slug, `${file}-${size}.webp`);
      if (!(await exists(img))) fail(where, `missing image ${path.relative(ROOT, img)}`);
    }
    if (!sizes[file]) fail(where, `no dimensions for "${file}" in ${p.slug}.images.json`);
  }

  for (const f of ["name", "summary", "overview"]) bilingual(p.slug, f, p[f]);
  await checkImage(`${p.slug} cover`, p.cover);

  const ids = new Set();
  for (const w of p.workflows) {
    const where = `${p.slug} › ${w.id ?? "?"}`;
    if (ids.has(w.id)) fail(where, "duplicate workflow id");
    ids.add(w.id);
    for (const f of ["name", "problem", "trigger", "steps", "highlights"]) bilingual(where, f, w[f]);
    if (w.result) bilingual(where, "result", w.result);
    for (const s of w.screenshots ?? []) {
      bilingual(where, `label of ${s.file}`, s.label);
      await checkImage(where, s.file);
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} content problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
const wf = projects.reduce((n, p) => n + p.workflows.length, 0);
const shots = projects.reduce((n, p) => n + p.workflows.reduce((m, w) => m + w.screenshots.length, 0), 0);
console.log(`✓ content OK: ${projects.length} project(s), ${wf} workflows, ${shots} screenshots`);
