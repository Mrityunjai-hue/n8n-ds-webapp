# ROADMAP.md — N8N Data Science Community Learning Hub

> **Current Phase**: Not started
> **Active Milestone**: Milestone 1 — Foundation & Core Infrastructure
> **Last Updated**: 2026-04-23

---

## Must-Haves (v1.0 Definition of Done)

- [ ] Next.js project initialized with Tailwind, fonts, and design system
- [ ] Homepage: Hero + Interactive Roadmap + Subject Cards + Stats bar
- [ ] Topic page with complete 11-section layout (at least SQL and Python topics populated)
- [ ] Monaco Editor + Pyodide (Python) + sql.js (SQL) running in-browser
- [ ] Mermaid.js diagrams rendering per topic
- [ ] Interview questions with reveal-answer toggles
- [ ] Mark as Complete + progress save to localStorage
- [ ] Firebase Auth (Google + email) + Firestore cloud sync
- [ ] Progress Dashboard (rings, streak, weak areas, bookmarks)
- [ ] Project library (18 projects with full page structure)
- [ ] Global search (Ctrl+K)
- [ ] Dark mode default + light mode toggle
- [ ] Fully responsive (375px → 1920px)
- [ ] Deployed to Vercel

---

## Milestone 1 — Foundation & Core Infrastructure

### Phase 1: Project Setup & Design System
**Status**: ✅ Complete
**Objective**: Initialize the Next.js 14 App Router project, configure Tailwind with the full custom design system (colors, fonts, tokens, dark mode class strategy), set up Google Fonts (Syne, Plus Jakarta Sans, JetBrains Mono), create global CSS variables, and scaffold the complete folder/file structure. Also create reusable base components: Button, Badge, Card, Skeleton, Toast.
**Deliverables**:
- Working Next.js dev server at localhost:3000
- `tailwind.config.ts` with all design tokens
- `globals.css` with CSS custom properties
- Base components: `Button`, `Badge`, `Card`, `Skeleton`, `Toast`
- Dark mode toggle wired up (class-based, localStorage persisted)
- `app/layout.tsx` with fonts, metadata, ThemeProvider

---

### Phase 2: Navigation & Global Layout
**Status**: ✅ Complete
**Objective**: Build the site-wide navigation (desktop topnav + mobile hamburger), footer, and the global layout shell. Include the streak counter (visible when logged in), light/dark toggle, and Ctrl+K search trigger in the nav.
**Deliverables**:
- `Navbar` component — logo, nav links, dark toggle, streak display, auth state (login/avatar)
- Mobile hamburger drawer with full nav links
- `Footer` component — links, community name, zero-cost note
- `app/layout.tsx` consuming these with proper metadata
- Active link highlighting per route
- Skip-to-content accessibility link

---

### Phase 3: Homepage — Hero + Stats Bar
**Status**: ✅ Complete
**Objective**: Build the homepage hero section with animated background (lightweight CSS/canvas floating nodes/network), bold headline, subheading, two CTAs, and the community intro. Add the Stats Bar (topic count, project count, interview question count, "Free forever").
**Deliverables**:
- `HeroSection` component with animated node-network background
- Two CTA buttons: "Start Learning →" and "View Roadmap"
- `StatsBar` with 4 stat tiles
- Responsive layout for 375px, 768px, 1280px

---

### Phase 4: Interactive Learning Roadmap (Homepage + /roadmap)
**Status**: ✅ Complete
**Objective**: Build the interactive node-based learning roadmap. Nodes: SQL → Power BI → Python Basics → NumPy → Pandas → Data Visualization → ML → Deep Learning → Gen AI → Agentic AI. Each node has completion status colors (gray/amber/teal). Clicking a node navigates to that subject. Dependency lines connect nodes. Works on mobile (horizontal scroll or vertical collapse).
**Deliverables**:
- `RoadmapGraph` component (CSS-based or lightweight SVG — no heavy libs)
- Node states: not-started (gray), in-progress (amber), completed (teal)
- Dependency arrows between nodes
- Mobile: horizontal scroll container
- Embedded on homepage below stats bar
- Standalone at `/roadmap` with larger layout
- Node click → navigate to `/learn/[subject]`

---

### Phase 5: Subject Cards Grid
**Status**: ✅ Complete
**Objective**: Below the roadmap on the homepage, show a responsive grid of 10 subject cards. Each card: subject icon, name, topic count, estimated hours, completion progress bar, and a "Start" or "Continue" button. Progress bar reads from the progress store (starts at 0% for guests).
**Deliverables**:
- `SubjectCard` component
- 10 subject definitions in `lib/subjects.ts` (name, icon, topicCount, estimatedHours, slug)
- Progress bar connected to progress store (Zustand or React Context)
- Responsive grid: 1 col (mobile) → 2 col (tablet) → 3–4 col (desktop)
- "Continue" vs "Start" logic based on progress

---

## Milestone 2 — Learning Engine

### Phase 6: Topic Page Shell & Sidebar
**Status**: ⬜ Not Started
**Objective**: Build the topic page layout at `/learn/[subject]/[topic]`. Left sidebar on desktop (subject name, topic list, current highlighted, completion checkmarks, progress %). Hamburger drawer on mobile. Main content area with 11-section structure as empty scaffolding, ready to receive content.
**Deliverables**:
- `app/learn/[subject]/[topic]/page.tsx` route
- `TopicSidebar` — topic list, active highlight, completion marks, progress %
- Mobile hamburger drawer version of sidebar
- 11-section content skeleton (headings rendered, content = placeholder)
- Breadcrumb navigation (Subject > Topic)
- "Previous Topic" / "Next Topic" navigation at bottom
- Keyboard shortcuts: N (next), P (previous), Ctrl+/ (sidebar toggle)

---

### Phase 7: Monaco Editor + Pyodide (Python)
**Status**: ⬜ Not Started
**Objective**: Integrate Monaco Editor for Python topics. Pyodide loads from CDN (with "Setting up Python environment..." skeleton/progress bar on first load). Pre-loaded code example per topic, Run Code button (Ctrl+Enter), output panel, Reset button. Line-by-line breakdown expandable panel below the editor.
**Deliverables**:
- `CodeEditor` component (Monaco, Python mode)
- Pyodide initialization with loading state (skeleton screen, not spinner)
- `OutputPanel` component — shows stdout, errors styled differently
- "Run Code" button (teal) + "Reset to Original" button
- `LineByLineBreakdown` accordion panel below editor
- State: current code (editable), original code (for reset)
- Error handling: Python exceptions displayed cleanly in output panel

---

### Phase 8: Monaco Editor + sql.js (SQL)
**Status**: ⬜ Not Started
**Objective**: Integrate sql.js for SQL topics. Same Monaco Editor shell but with SQL syntax highlighting. Pre-loaded SQL queries + in-memory SQLite dataset. Results rendered as a clean table in the output panel.
**Deliverables**:
- `SqlEditor` component (Monaco, SQL mode, sql.js backend)
- sql.js loaded from CDN with loading state
- Result table renderer (clean, responsive, scrollable)
- Pre-seeded in-memory database per SQL topic (e.g., a `sales` table for GROUP BY topic)
- Run / Reset buttons
- Error messages shown inline in output

---

### Phase 9: Mermaid.js Diagrams
**Status**: ⬜ Not Started
**Objective**: Integrate Mermaid.js to render flow diagrams for every topic (Section 4 of the 11-section structure). Diagrams defined as plain Mermaid syntax strings in topic data files. Rendered client-side. Horizontally scrollable on mobile. Simple, English-labeled, color-coded.
**Deliverables**:
- `MermaidDiagram` component (client-side render, SSR-safe)
- Scrollable container for mobile
- Default styling matching design system colors
- Error boundary: shows raw syntax if render fails

---

### Phase 10: Topic Sections — Content Components
**Status**: ⬜ Not Started
**Objective**: Build all remaining section components for the topic page: WhatIsThis, WhyItExists, HowItWorks, ComponentsBreakdown (accordion), HowToStartCode, CommonMistakes, QuickSummary, InterviewQuestions (with reveal toggle, type + difficulty badges), MarkComplete button (with confetti + toast + next topic reveal), and the ELI5 toggle.
**Deliverables**:
- `WhatIsThis`, `WhyItExists`, `HowItWorks` — styled text sections
- `ComponentsBreakdown` — accordion, each item has heading + explanation + code snippet + note
- `HowToStartCode` — 5-sub-section structured layout (install, imports, skeleton, data format, order of ops)
- `CommonMistakes` — ❌/✅/💡 bullet list
- `QuickSummary` — exactly 3 bullets, visually distinct
- `InterviewQuestion` card — question, Fresher/Mid/Senior badge, type badge, Reveal toggle, answer + meta notes
- `MarkCompleteButton` — large, bottom of page, confetti animation on click, "Next Topic →" appears
- `ELI5Toggle` — switches explanation text content, state saved per topic in localStorage
- `TopicNotepad` — plain text area, auto-saves to Firestore (debounced 2s), pre-loads on return

---

## Milestone 3 — Progress & Auth Systems

### Phase 11: Progress Store (localStorage Tier)
**Status**: ⬜ Not Started
**Objective**: Implement the full client-side progress store using Zustand (or React Context). Tracks: topics visited, topics completed (with timestamp), interview scores, project status, bookmark flags, current streak, last active topic. Persists to localStorage via zustand/persist middleware. No auth required.
**Deliverables**:
- `lib/stores/progressStore.ts` — Zustand store with full schema
- Actions: `markTopicComplete`, `markTopicVisited`, `toggleBookmark`, `saveNote`, `recordInterviewAnswer`, `markProjectStarted/Completed`
- localStorage persistence via zustand/persist
- Streak calculation logic (daily active check)
- Guest progress banner: "Your progress is saved locally. Sign in to sync across devices."

---

### Phase 12: Firebase Auth + Firestore Cloud Sync
**Status**: ⬜ Not Started
**Objective**: Integrate Firebase Authentication (Google OAuth + email/password). On first login, migrate all localStorage progress to Firestore. Subsequent logins load from Firestore and merge with local. Real-time sync on topic complete, bookmark, note, etc.
**Deliverables**:
- `lib/firebase.ts` — Firebase app init
- `AuthProvider` — React context exposing `user`, `signInWithGoogle`, `signInWithEmail`, `signOut`
- Sign-in modal/page with Google button + email form
- Firestore data schema: `users/{userId}/subjects/{subjectId}/topics/{topicId}` (per SPEC)
- Migration function: localStorage → Firestore on first login
- Real-time Firestore listeners for progress updates
- Avatar + display name in navbar when logged in

---

### Phase 13: Progress Dashboard (`/dashboard`)
**Status**: ⬜ Not Started
**Objective**: Build the full progress dashboard page. Sections: Visual Roadmap with progress overlay, Subject Completion Rings (circular indicators), Stats Row (topics done, projects done, streak, interview questions answered), This Week summary, Weak Areas cards, Bookmarks list, Student Notes list.
**Deliverables**:
- `app/dashboard/page.tsx` — protected route (redirect to sign-in if not authed)
- `RoadmapWithOverlay` — same roadmap, progress colors from store
- `CompletionRing` component — SVG circular progress for each subject
- `StatsRow` — 4 stat tiles
- `ThisWeek` section — topics studied, suggested next topic
- `WeakAreas` — topics where interview score < 60%, "Review" button
- `BookmarksList` — filterable by subject
- `NotesList` — all notes filterable by subject

---

## Milestone 4 — Projects & Content

### Phase 14: Project Library (`/projects` + `/projects/[slug]`)
**Status**: ⬜ Not Started
**Objective**: Build the project library page with filter/search. Build the project page template with all 7 sections: Problem Statement, Why It Matters, Dataset, Project Roadmap, Starter Code Skeleton (Monaco), Expected Output, Stretch Goals. Populate all 18 projects with full metadata and at least starter code + problem statement.
**Deliverables**:
- `app/projects/page.tsx` — grid with filter by Subject, Difficulty, Industry, Skills
- `ProjectCard` component with all metadata tags
- Search bar (keyword match on title, skills, domain)
- `app/projects/[slug]/page.tsx` — full 7-section project page
- `lib/projects.ts` — all 18 project definitions with full data
- Monaco editor for starter code skeleton (non-runnable in project pages, just display)
- "Mark Project Complete" button saving to progress store

---

### Phase 15: SQL Subject Content (All 12 Topics)
**Status**: ⬜ Not Started
**Objective**: Write and structure all 12 SQL topic content files with the complete 11-section format. All SQL code examples must run correctly in sql.js with pre-seeded in-memory datasets. Each topic includes a Mermaid diagram and minimum 5 interview questions.
**Deliverables**:
- `lib/content/sql/` — 12 topic content files (TypeScript data objects)
- All sections populated: WhatIsThis, WhyItExists, HowItWorks, Diagram, HowToStartCode, FullExample (runnable in sql.js), CommonMistakes, QuickSummary, InterviewQuestions (5+ each)
- Pre-seeded SQL datasets (customers, orders, products, employees tables)
- Topics: SELECT basics, WHERE, ORDER BY/LIMIT, Aggregates, GROUP BY/HAVING, JOINs, Subqueries, CTEs, Window Functions, CASE WHEN, Indexes, SQL for Analysis

---

### Phase 16: Python Basics + NumPy + Pandas Content (Starter Set)
**Status**: ⬜ Not Started
**Objective**: Write and structure the first 3 topics for each of Python Basics, NumPy, and Pandas (9 topics total). All Python code examples must run in Pyodide. Pandas/NumPy examples use generated data (no file download needed). Each topic gets full 11-section treatment.
**Deliverables**:
- `lib/content/python-basics/` — 3 topics (data types, lists/dicts, control flow)
- `lib/content/numpy/` — 3 topics (arrays vs lists, array creation/shapes, indexing)
- `lib/content/pandas/` — 3 topics (Series/DataFrames, reading data, exploring data)
- All Pyodide-runnable, generating/using in-memory sample data

---

### Phase 17: ML — First 5 Topics (Components Breakdown)
**Status**: ⬜ Not Started
**Objective**: Write the first 5 ML topic content files: What is ML, ML Workflow, Data Preprocessing, Linear Regression, Logistic Regression. ML topics require the full Components Breakdown section (Section 5 accordion) in addition to all other 11 sections. Pyodide-runnable with sklearn via Pyodide (or simplified numpy versions if sklearn unavailable in Pyodide).
**Deliverables**:
- `lib/content/ml/` — 5 topic files with Components Breakdown
- Mermaid architecture/flow diagrams per topic
- Interview questions: minimum 8 per topic (ML interviews are question-heavy)
- Components Breakdown accordion for each topic

---

## Milestone 5 — Polish & Launch

### Phase 18: Global Search (Ctrl+K)
**Status**: ⬜ Not Started
**Objective**: Implement the global command palette search. Opens on Ctrl+K (desktop) or search icon (mobile). Searches topic names, concept keywords, subject names. Results show with subject tag. Clicking navigates to that topic (and section anchor if possible). Results appear within 200ms (static index, no network call).
**Deliverables**:
- `SearchPalette` component — modal overlay, keyboard trap, Esc to close
- Static search index built from `lib/subjects.ts` + `lib/content/` at build time
- Fuse.js or simple substring search (no API calls)
- Results: topic name + subject badge, click → navigate
- Ctrl+K binding site-wide (window-level listener in layout)

---

### Phase 19: Interview Question Bank (`/interview`)
**Status**: ⬜ Not Started
**Objective**: Aggregate all interview questions across all topics into a dedicated browsable page. Filterable by Subject, Difficulty (Fresher/Mid/Senior), and Type (Conceptual/Scenario/Coding/Trap). Reveal-answer toggle works here too. "Jump to Topic" link on each question.
**Deliverables**:
- `app/interview/page.tsx`
- Filter bar: Subject, Difficulty, Type
- `InterviewQuestionCard` component (same as topic page version)
- Question count displayed per filter combination
- "Jump to Topic" link opens the full topic page

---

### Phase 20: Responsive Polish, Accessibility & Performance
**Status**: ⬜ Not Started
**Objective**: Final responsive audit across all breakpoints (375, 768, 1280, 1920). Fix all layout issues. Add proper ARIA labels, keyboard navigation for modals, skip-to-content link. Optimize Pyodide and Monaco to load lazily (not in initial bundle). Add skeleton screens everywhere. Run Lighthouse audit and reach ≥ 80 performance on homepage.
**Deliverables**:
- All pages responsive at 375/768/1280/1920px
- Monaco + Pyodide lazy loaded (dynamic import)
- Skeleton screens for all async-loaded components
- ARIA labels on all interactive elements
- Lighthouse score ≥ 80 on homepage, ≥ 70 on topic page
- All transitions 150ms ease-out
- Code editors scroll horizontally on mobile, never wrap

---

### Phase 21: About Page + Contribution System
**Status**: ⬜ Not Started
**Objective**: Build the `/about` page with community story, values, how to contribute, team (optional), and "Join the Community" CTA. Add "Suggest an edit / Report an error" button to every topic page (opens Google Form pre-filled with topic name). Add social links (Discord/WhatsApp/LinkedIn — placeholder slugs for now).
**Deliverables**:
- `app/about/page.tsx`
- Community story, values (free, open, student-first, honest)
- "How to contribute" section with form link
- "Join the Community" CTA
- `ContributionButton` component for topic pages
- Footer social links

---

### Phase 22: Vercel Deployment & Final QA
**Status**: ⬜ Not Started
**Objective**: Deploy to Vercel. Configure environment variables (Firebase config). Set up correct Next.js build for static + dynamic pages. Run final QA checklist: all routes load, auth works, Pyodide runs, SQL runs, Firestore writes, progress saves, dark mode persists.
**Deliverables**:
- Production deploy at `n8n-ds-hub.vercel.app` (or custom domain)
- All Firebase env vars set in Vercel dashboard
- `next.config.ts` tuned for Pyodide/sql.js WASM loading (headers for SharedArrayBuffer if needed)
- QA checklist: 30-point test run documented
- README.md with setup instructions for contributors

---

## Backlog (v2 Considerations)

- Video lessons embedded per topic (YouTube embeds initially)
- PDF/certificate generation on full subject completion
- Weekly summary emails (Firebase Cloud Functions)
- Light mode content: full separate stylesheet pass
- Deep Learning content (all 19 topics)
- Gen AI + Agentic AI content (all topics)
- Power BI content (Power BI is Windows-only so describe-and-screenshot approach)
- Real-time leaderboard / community streak tracker
- Quiz mode per topic (MCQ / short answer)
- AI-powered ELI5 (replace pre-written simplified content with live LLM call)
