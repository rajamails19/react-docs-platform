# ReactDocs — Production ReactJS Tutorial Platform

A production-ready educational platform for learning React from beginner to enterprise level. Inspired by W3Schools, MDN Docs, and official documentation websites.

## Features

- **30+ Tutorial Topics** — Introduction → Enterprise Architecture
- **Live Code Editors** — Powered by Sandpack (CodeSandbox)
- **Mermaid Diagrams** — Architecture and flow visualizations
- **Interview Q&A** — Junior → Enterprise level per topic
- **Full-text Search** — Fuse.js fuzzy search across all content
- **Dark Mode** — System-aware, persisted preference
- **Reading Progress** — Per-topic completion tracking, bookmarks
- **MDX Content System** — Add tutorials without changing app code
- **Code Splitting** — All routes lazy-loaded, optimized bundles
- **SEO Ready** — Meta tags, Open Graph, structured data, sitemap

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS + @tailwindcss/typography |
| Routing | React Router v6 |
| Content | MDX (via @mdx-js/rollup) |
| Code Editor | Sandpack (@codesandbox/sandpack-react) |
| Diagrams | Mermaid |
| Search | Fuse.js |
| Animations | Framer Motion |
| Syntax Highlighting | react-syntax-highlighter (Prism) |

## Quick Start

```bash
# Clone / copy the project
cd react-tutorial-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Sidebar, TableOfContents
│   ├── tutorial/       # CodeBlock, LiveEditor, MermaidDiagram, InterviewQA
│   ├── search/         # SearchModal
│   └── common/         # ReadingProgress, ThemeToggle, Breadcrumb
├── content/            # MDX tutorial files (add topics here)
│   ├── introduction/
│   ├── hooks/
│   ├── redux/
│   └── ...
├── contexts/           # ThemeContext, ProgressContext
├── data/               # Navigation config, search index
├── hooks/              # useSearch, useTableOfContents
├── layouts/            # DocsLayout
├── pages/              # Home, TutorialPage
├── types/              # TypeScript types
└── utils/              # cn, contentRegistry
```

## Adding New Tutorials

Create a `.mdx` file in `src/content/<category>/`:

```mdx
---
title: My Tutorial
description: What this tutorial covers
category: Hooks
order: 10
slug: hooks/my-tutorial
difficulty: intermediate
estimatedTime: 15
tags: [react, hooks]
lastUpdated: 2024-01-15
---

# My Tutorial

Your content here. Use these components:

<Callout type="tip">A helpful tip</Callout>

<MermaidDiagram chart={`flowchart TD; A-->B`} />

<LiveEditor code={`export default function Demo() { return <h1>Hello!</h1> }`} />

<InterviewQA questions={[
  { question: "...", answer: "...", level: "junior" }
]} />
```

Then add it to `src/data/navigation.ts` and `src/data/searchIndex.ts`.

## Deployment

### Vercel (Recommended — 1 click)

```bash
npx vercel
```

The `vercel.json` is already configured with SPA rewrites and caching headers.

### Netlify

```bash
npx netlify deploy --prod
```

`netlify.toml` is pre-configured.

### Docker (VPS / Namecheap)

```bash
# Build image
docker build -t react-tutorial-platform .

# Run container
docker run -d -p 80:80 --name react-tutorial-platform react-tutorial-platform

# Or with Docker Compose
docker compose up -d
```

### Namecheap VPS Hosting

1. Set up a VPS (Ubuntu 22.04) on Namecheap
2. Install Docker: `curl -fsSL https://get.docker.com | sh`
3. Copy files to server: `scp -r . user@your-vps:/app`
4. Run: `cd /app && docker compose up -d`
5. Point your Namecheap domain's A record to the VPS IP

### GitHub Actions CI/CD

The `.github/workflows/deploy.yml` workflow:
- **On every PR**: Type check + lint + build
- **On merge to main**: Deploy to Vercel + build Docker image

Set these repository secrets:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`
- `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Type check + production build |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | TypeScript check only |
| `npm run lint` | ESLint |

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
VITE_APP_NAME=ReactDocs
VITE_APP_URL=https://reacttutorial.dev
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Content Covered (30+ Topics)

| Category | Topics |
|---|---|
| Introduction | What is React, Why React, SPA vs MPA, Virtual DOM |
| Setup | Node.js, Vite Setup, CRA, Project Structure |
| JSX | Basics, Expressions, JSX Rules |
| Components | Functional, Class, Composition, Pure Components |
| Core Concepts | Props, State, Events, Conditional Rendering, Lists, Forms |
| Hooks | useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, Custom Hooks |
| Routing | React Router v6, Nested Routes, Protected Routes |
| State Management | Context API, Redux Toolkit, RTK Query |
| Data Fetching | Fetch/Axios, React Query, Error Handling |
| Auth | JWT, OAuth |
| Testing | Jest + RTL, E2E with Playwright |
| Performance | Code Splitting, Memoization, Virtualization |
| TypeScript | Basics, Typing Hooks, Advanced Patterns |
| Next.js | Intro, App Router, Server Components |
| Design Patterns | HOC, Render Props, Compound Components |
| Enterprise | Monorepo, Micro Frontends, Design System |
| Interview Prep | Beginner, Mid-Level, Senior Q&A |
| Projects | Todo App, Dashboard, E-Commerce |

## License

MIT
