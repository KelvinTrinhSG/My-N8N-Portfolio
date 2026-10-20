# AI Agent & n8n Automation Portfolio

A bilingual (English / Vietnamese) portfolio for production-ready n8n automations and AI agents. Visitors browse projects, expand each workflow to see how it works and the proof from live runs, then get in touch.

The first project is [n8n-form-crm-automations](https://github.com/KelvinTrinhSG/n8n-form-crm-automations): 10 workflows, 63 tests, all run live against HubSpot, Google Sheets and Gmail.

## Features

- One-page home (Home, About, Skills, Projects, Contact) and a page per project
- Workflow cards that expand in place: trigger, steps, production highlights, result, live-run screenshots
- Screenshot thumbnails that load only when a workflow is opened, plus a lightbox (buttons, ← → keys, swipe, Esc)
- EN / VI toggle and light / dark theme, both remembered between visits
- Static export: plain HTML/CSS/JS, no server, no API calls while browsing

## Run it

Needs Node 24+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Preview the exact production build:

```bash
npm run build        # writes out/
npx serve out
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run images` | Downloads a project's screenshots from GitHub and compresses them to WebP (`-sm` 640px, `-lg` ≤1600px), plus the avatar. Run only when screenshots change |
| `npm run check` | Checks content: EN + VI text for every workflow, every screenshot has both image sizes, no duplicate ids |
| `npm run lint` | ESLint |

## Add a project

1. Create `content/projects/<slug>.ts` exporting a `Project` (see `content/types.ts` and the existing project for the shape). Give every text both `en` and `vi`.
2. List it in `content/projects/index.ts`.
3. Add the repo to `SOURCES` in `scripts/images.mjs`, run `npm run images`, then import the generated `<slug>.images.json` in `lib/shots.ts`.
4. Run `npm run check` and `npm run build`.

The home page gets a new card and `/projects/<slug>/` is generated automatically; no component changes needed.

## Structure

```
app/                 pages: home, project detail, 404
components/          Navbar, sections, ProjectCard, WorkflowCard, ScreenshotStrip, Lightbox
content/             UI text (en.ts, vi.ts) and project content
lib/                 language/theme providers, safe localStorage, screenshot paths
public/              compressed avatar and screenshots
scripts/             images.mjs, check-content.mjs
```

## Tech

Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS 4 · sharp. Hosted on Vercel.

Design: layout inspired by the [Bianca](https://github.com/bedimcode/responsive-porfolio-website-Bianca) template; colors and fonts from the [Devpost Learn Skill Pack guide](https://github.com/KelvinTrinhSG/Devpost-Learn-Skill-Pack---How-To-Use).
