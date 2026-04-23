# ARCHITECTURE.md — N8N Data Science Community Learning Hub

> **Last Updated**: 2026-04-23
> **Status**: Planned (greenfield — no code exists yet)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                          │
│                                                             │
│  ┌──────────────┐  ┌────────────┐  ┌───────────────────┐   │
│  │  Next.js App │  │  Pyodide   │  │    sql.js         │   │
│  │  (React)     │  │  (Python   │  │  (SQLite WASM)    │   │
│  │  Tailwind CSS│  │   WASM)    │  │                   │   │
│  └──────┬───────┘  └────────────┘  └───────────────────┘   │
│         │                                                   │
│  ┌──────▼──────────────────────────────────────────────┐   │
│  │              Application State                       │   │
│  │  Zustand (Progress Store) + localStorage persist    │   │
│  └──────┬──────────────────────────────────────────────┘   │
│         │                                                   │
│  ┌──────▼──────────────────────────────────────────────┐   │
│  │              Firebase SDK                            │   │
│  │  Auth (Google/Email) + Firestore (real-time sync)   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  ┌─────────────┐              ┌─────────────────┐
  │   Vercel    │              │   Firebase      │
  │  (Hosting + │              │  (Auth +        │
  │   CDN)      │              │   Firestore)    │
  └─────────────┘              └─────────────────┘
```

---

## Folder Structure (Planned)

```
n8n-webapp/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers, nav, footer)
│   ├── page.tsx                  # Homepage
│   ├── roadmap/
│   │   └── page.tsx              # Standalone roadmap page
│   ├── learn/
│   │   └── [subject]/
│   │       ├── page.tsx          # Subject overview (redirect to first topic)
│   │       └── [topic]/
│   │           └── page.tsx      # Individual topic page (11 sections)
│   ├── projects/
│   │   ├── page.tsx              # Project library
│   │   └── [slug]/
│   │       └── page.tsx          # Individual project page
│   ├── interview/
│   │   └── page.tsx              # Global interview question bank
│   ├── dashboard/
│   │   └── page.tsx              # Progress dashboard (auth required)
│   ├── profile/
│   │   └── page.tsx              # Account settings
│   └── about/
│       └── page.tsx              # About page
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Primitive components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── RoadmapGraph.tsx
│   │   ├── SubjectCard.tsx
│   │   └── StatsBar.tsx
│   ├── topic/                    # All 11-section components
│   │   ├── WhatIsThis.tsx
│   │   ├── WhyItExists.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── MermaidDiagram.tsx
│   │   ├── ComponentsBreakdown.tsx
│   │   ├── HowToStartCode.tsx
│   │   ├── CodeEditor.tsx        # Monaco wrapper (Python)
│   │   ├── SqlEditor.tsx         # Monaco wrapper (SQL)
│   │   ├── OutputPanel.tsx
│   │   ├── LineByLineBreakdown.tsx
│   │   ├── CommonMistakes.tsx
│   │   ├── QuickSummary.tsx
│   │   ├── InterviewQuestion.tsx
│   │   ├── MarkCompleteButton.tsx
│   │   ├── TopicNotepad.tsx
│   │   └── ELI5Toggle.tsx
│   ├── dashboard/
│   │   ├── CompletionRing.tsx
│   │   ├── StatsRow.tsx
│   │   ├── WeakAreas.tsx
│   │   └── BookmarksList.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectFilters.tsx
│   └── search/
│       └── SearchPalette.tsx
│
├── lib/                          # Data, utilities, services
│   ├── subjects.ts               # 10 subject definitions
│   ├── projects.ts               # 18 project definitions
│   ├── search-index.ts           # Static search index built from content
│   ├── firebase.ts               # Firebase app init
│   ├── stores/
│   │   ├── progressStore.ts      # Zustand progress store
│   │   └── themeStore.ts         # Dark/light mode store
│   └── content/                  # Topic content files
│       ├── sql/
│       │   ├── what-is-sql.ts
│       │   ├── select-from-where.ts
│       │   └── ... (12 topics)
│       ├── python-basics/
│       ├── numpy/
│       ├── pandas/
│       ├── visualization/
│       ├── ml/
│       ├── deep-learning/
│       ├── gen-ai/
│       └── agentic-ai/
│
├── types/                        # TypeScript types
│   ├── topic.ts                  # TopicContent, Section, InterviewQuestion types
│   ├── progress.ts               # ProgressState, SubjectProgress types
│   └── project.ts                # Project, ProjectSection types
│
├── public/                       # Static assets
│   └── icons/                    # Subject icons (SVG)
│
├── tailwind.config.ts            # Full design system tokens
├── next.config.ts                # WASM headers, CORS for Pyodide
└── firebase.json                 # Firebase project config
```

---

## Key Architectural Decisions

### 1. No Server-Side Code Execution
All Python (Pyodide WASM) and SQL (sql.js WASM) run entirely in the browser. This eliminates any backend infrastructure cost and complexity. Trade-off: first-time Pyodide load is ~8-10MB; mitigated by lazy loading and a clear loading state.

### 2. Static Content + Dynamic Progress
Topic content is static TypeScript data (no CMS). Progress is dynamic (localStorage + Firestore). This means pages can be statically generated at build time (fast, SEO-friendly) while progress data is client-side reactive.

### 3. Two-Tier Progress Storage
- **Tier 1 (localStorage)**: Zero friction, no signup required. Zustand store with `zustand/persist`. Works offline.
- **Tier 2 (Firestore)**: Cloud sync after login. Firebase Auth gates this tier. Migration runs once on first login.

### 4. Content as TypeScript Objects
Each topic is a TypeScript file exporting a `TopicContent` object. This gives type safety, easy imports, and no CMS dependency. Trade-off: content changes require a redeploy. Acceptable for v1 (Vercel redeploys are instant and free).

### 5. App Router (Next.js 14)
Using the App Router for file-based routing, server components for SEO metadata, and client components where interactivity is needed (editors, progress, auth). Monaco and Pyodide are always client components.

---

## Data Flow — Topic Page

```
1. Next.js SSG → generates HTML with topic metadata (title, SEO tags) at build time
2. Client hydrates → loads React components
3. Progress store reads localStorage → highlights completed topics, shows progress %
4. If user is logged in → Firestore listener merges/overrides localStorage
5. Monaco Editor loads lazily (dynamic import) → no initial bundle impact
6. Pyodide loads from CDN on first Python code interaction → cached by browser
7. User clicks "Run Code" → Pyodide executes, output shown in OutputPanel
8. User clicks "Mark Complete" → progressStore.markTopicComplete() → writes to localStorage AND Firestore (if logged in)
```

---

## Firebase Firestore Schema

```
users/{userId}
├── profile: { name, email, joinDate, avatar, displayName }
├── streak: { current: number, longest: number, lastActiveDate: string }
├── subjects/{subjectId}
│   ├── completionPercent: number
│   └── topics/{topicId}
│       ├── visited: boolean
│       ├── visitedAt: Timestamp
│       ├── completed: boolean
│       ├── completedAt: Timestamp | null
│       ├── eli5Mode: boolean
│       ├── interviewScore: { correct: number, total: number }
│       ├── notes: string
│       └── bookmarked: boolean
└── projects/{projectId}
    ├── started: boolean
    ├── startedAt: Timestamp | null
    ├── completed: boolean
    └── completedAt: Timestamp | null
```

---

## Security Rules (Firestore)

```
// Users can only read/write their own data
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

## Performance Strategy

| Concern | Strategy |
|---|---|
| Pyodide (~10MB) | Lazy load; only import when user first clicks "Run Code" |
| Monaco Editor (~2MB) | Dynamic import; lazy loaded per page |
| sql.js (~1MB) | Lazy load same as Pyodide |
| Mermaid.js | Dynamic import; renders after hydration |
| Fonts | Google Fonts with `display=swap`; preloaded in `<head>` |
| Images | Next.js `<Image>` with automatic optimization |
| Topic content | Statically bundled TypeScript; tree-shaken per route |
| Firestore reads | Listener-based (not polling); unsubscribed on unmount |
