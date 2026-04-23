# SPEC.md — N8N Data Science Community Learning Hub

> **Status**: `FINALIZED`
> **Created**: 2026-04-23
> **Owner**: N8N Data Science Community

---

## Vision

A free, professional, structured learning platform that takes students from SQL fundamentals to Agentic AI — entirely in the browser, with zero cost, zero ads, and zero paywalls. Built by students, for students. Every topic follows a rigorous, consistent structure that combines plain-English explanations, visual diagrams, live runnable code, and interview preparation. Progress is remembered across sessions and devices. The experience feels like learning from a brilliant senior student — warm, smart, approachable — not a corporate LMS.

---

## Goals

1. **Structured curriculum coverage** — Full data science stack from SQL → Power BI → Python → NumPy → Pandas → Visualization → ML → Deep Learning → Gen AI → Agentic AI, with every topic following an identical 11-section format.
2. **In-browser interactivity** — Live Python (Pyodide), live SQL (sql.js), and Mermaid.js diagrams embedded per topic so students learn by doing, not just reading.
3. **Persistent progress tracking** — Two-tier storage (localStorage for guests, Firebase Firestore for logged-in users) so progress is never lost across sessions or devices.
4. **Interview readiness** — Every topic includes typed, tagged interview questions (Fresher / Mid / Senior × Conceptual / Scenario / Coding / Trap) with hidden answers.
5. **Real project library** — 18 end-to-end projects covering Data Analysis, ML, Deep Learning, and Gen AI / Agentic AI, each with problem statements, dataset info, starter code, and stretch goals.

---

## Non-Goals (Out of Scope)

- Paid tiers, premium content, subscriptions, or paywalls — **never**
- Ads or sponsored content — **never**
- Server-side code execution (Python/SQL runs entirely in-browser)
- Video hosting or streaming content (no video lessons in v1)
- Mobile app (React Native / Flutter) — web-responsive only
- Custom LLM backend for the ELI5 toggle (v1 uses pre-written simplified content)
- Real-time collaboration or pair-coding features
- Certification generation or PDF export (possible v2)
- Community forums or comments system (link to external Discord/WhatsApp)

---

## Users

**Primary:** College and university students (2nd year and up) in CS, IT, Statistics, or Engineering who want to break into data science. Often self-taught, learning alongside coursework, budget-constrained.

**Secondary:** Early-career professionals (0–2 years) switching to data science or upskilling. Need structured paths and interview prep more than theory.

**Tertiary:** Self-learners and hobbyists with no formal CS background who find other resources too jargon-heavy or poorly organized.

All three groups need: free access, no friction to start (no forced sign-up), mobile-friendly, clearly structured content that doesn't assume prior expertise.

---

## Constraints

- **Zero budget** — all services must be free tier: Firebase (Spark plan), Vercel (free), Pyodide (CDN), sql.js (CDN).
- **No server** — all code execution is client-side (Pyodide WASM, sql.js WASM). No backend API server in v1.
- **Content volume** — ~100+ topics across 10 subjects. Content must be templatized and consistent.
- **Tech stack fixed** — Next.js (App Router) + Tailwind CSS + Monaco Editor + Pyodide + sql.js + Mermaid.js + Firebase Auth + Firestore.
- **Target devices** — mobile-first responsive: works on a 375px phone screen up to 1920px desktop.
- **Accessibility** — keyboard navigation, proper ARIA labels, sufficient color contrast (WCAG AA minimum).

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Framework | Next.js 14 (App Router) | SSG for SEO, file-based routing, React ecosystem |
| Styling | Tailwind CSS | Rapid, consistent design; works well with component libraries |
| Code Editor | Monaco Editor | VS Code in browser, syntax highlighting, intellisense |
| Python Runtime | Pyodide (WASM) | Full CPython in browser, no server needed |
| SQL Runtime | sql.js (SQLite WASM) | Full SQLite in browser, no server needed |
| Diagrams | Mermaid.js | Markdown-style diagram syntax, renders in browser |
| Auth | Firebase Authentication | Google SSO + email/password, free tier |
| Database | Firebase Firestore | Real-time sync, free tier generously sized |
| Hosting | Vercel | Free tier, automatic Next.js deploy |
| Fonts | Syne (headings), Plus Jakarta Sans (body), JetBrains Mono (code) | Google Fonts, zero cost |
| **Total Cost** | **₹0** | |

---

## Design System

| Token | Dark Mode | Light Mode |
|---|---|---|
| Primary BG | `#0D1117` | `#FFFFFF` |
| Surface | `#161B22` | `#F6F8FA` |
| Surface Elevated | `#1C2128` | `#EAECEF` |
| Accent (Teal) | `#00C9A7` | `#00A887` |
| Accent (Amber) | `#F59E0B` | `#D97706` |
| Info (Blue) | `#3B82F6` | `#2563EB` |
| Danger | `#EF4444` | `#DC2626` |
| Success | `#22C55E` | `#16A34A` |
| Text Primary | `#E6EDF3` | `#1C2128` |
| Text Secondary | `#8B949E` | `#57606A` |
| Border | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| Border Radius (sm) | `8px` | |
| Border Radius (card) | `12px` | |
| Border Radius (modal) | `16px` | |
| Transition | `150ms ease-out` | |
| Code Theme | One Dark Pro | GitHub Light |

---

## Site Architecture

```
/                          → Homepage: Hero + Interactive Roadmap + Subject Cards + Stats
/roadmap                   → Full visual learning roadmap (standalone page)
/learn/[subject]/[topic]   → Individual topic page (11-section structure)
/projects                  → Project library (18 projects, filterable)
/projects/[slug]           → Individual project page
/interview                 → Global interview question bank (all subjects)
/dashboard                 → Student progress dashboard
/profile                   → Account settings
/about                     → About N8N Data Science Community
```

---

## Success Criteria

- [ ] All 10 subjects have at least their first 3 topics fully built with the complete 11-section structure
- [ ] Python code examples run live in Pyodide without errors on Chromium-based browsers
- [ ] SQL examples run live in sql.js without errors
- [ ] Progress saves to localStorage on first visit, no sign-in required
- [ ] Progress syncs to Firestore within 2 seconds of a sign-in action
- [ ] Firebase Google login works end-to-end on desktop and mobile
- [ ] Dashboard accurately reflects completed topics, streak, and subject progress
- [ ] All 18 project pages render with correct structure (even if starter code stubs)
- [ ] Site is fully responsive: tested on 375px, 768px, 1280px, 1920px viewports
- [ ] Lighthouse performance score ≥ 80 on homepage (after Pyodide excluded from initial bundle)
- [ ] Ctrl+K search returns correct results within 200ms
- [ ] Dark mode is default; light mode toggle persists via localStorage
- [ ] Zero ads, zero paywalls, zero popups — verified on every page
- [ ] Deployed to Vercel with working custom domain (or `.vercel.app` subdomain)
