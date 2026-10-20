// Downloads a project's screenshots from GitHub and compresses them for the web,
// plus the avatar. Run with `npm run images` when screenshots change (spec.md > Image Script).
//   public/shots/<slug>/<name>-sm.webp   640px wide, quality 70  (thumbnails)
//   public/shots/<slug>/<name>-lg.webp   ≤1600px wide, quality 82 (lightbox)
//   content/projects/<slug>.images.json  { "<name>": { "w": …, "h": … } } for layout placeholders
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCES = [
  { slug: "n8n-form-crm-automations", repo: "KelvinTrinhSG/n8n-form-crm-automations", dir: "docs/screenshots" },
];

const exists = (p) => fs.access(p).then(() => true, () => false);
const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function download(url, dest) {
  if (await exists(dest)) return;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function processProject({ slug, repo, dir }) {
  const cache = path.join(ROOT, ".cache", slug);
  const out = path.join(ROOT, "public", "shots", slug);
  await fs.mkdir(cache, { recursive: true });
  await fs.mkdir(out, { recursive: true });

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${dir}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const files = (await res.json()).filter((f) => /\.(png|jpe?g|webp)$/i.test(f.name));

  const sizes = {};
  let before = 0;
  let after = 0;
  for (const f of files) {
    const name = f.name.replace(/\.[^.]+$/, "");
    const src = path.join(cache, f.name);
    await download(f.download_url, src);
    before += (await fs.stat(src)).size;

    const sm = path.join(out, `${name}-sm.webp`);
    const lg = path.join(out, `${name}-lg.webp`);
    await sharp(src).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 70 }).toFile(sm);
    const info = await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(lg);
    sizes[name] = { w: info.width, h: info.height };
    after += (await fs.stat(sm)).size + (await fs.stat(lg)).size;
  }

  const sorted = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
  await fs.writeFile(path.join(ROOT, "content", "projects", `${slug}.images.json`), JSON.stringify(sorted, null, 2) + "\n");
  console.log(`${slug}: ${files.length} screenshots, ${kb(before)} → ${kb(after)} (sm + lg)`);
}

async function processAvatar() {
  const src = path.join(ROOT, "assets", "avatar-original.png");
  if (!(await exists(src))) return console.log("avatar: assets/avatar-original.png not found, skipped");
  let after = 0;
  for (const w of [320, 640]) {
    const dest = path.join(ROOT, "public", `avatar-${w}.webp`);
    await sharp(src).resize({ width: w, height: w, fit: "cover" }).webp({ quality: 82 }).toFile(dest);
    after += (await fs.stat(dest)).size;
  }
  console.log(`avatar: ${kb((await fs.stat(src)).size)} → ${kb(after)} (320 + 640)`);
}

for (const s of SOURCES) await processProject(s);
await processAvatar();
