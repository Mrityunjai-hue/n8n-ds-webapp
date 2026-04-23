# ROADMAP.md — Project Phases

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

### Phase 6: Auth UI & LocalProgress Store (Zustand)
**Status**: ✅ Complete
**Objective**: Implement the global state management for user progress (Zustand with persistence). Build the Auth UI (Login/Register modals) as placeholders (logic in Milestone 3). Implement the "Local Mode" for guests where progress is saved only to localStorage.
**Deliverables**:
- `useProgressStore` (Zustand) — tracks visited topics, completed topics, current streak.
- `AuthModal` component — tabs for Login/Register, social buttons (Google/GitHub placeholders).
- Navbar update: "Sign In" button opens `AuthModal`.
- Progress persistence in localStorage for guest users.

---

## Milestone 2 — Learning Engine

### Phase 7: Topic Page Shell & Sidebar
**Status**: ✅ Complete
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

### Phase 8: Monaco Editor + Pyodide (Python)
**Status**: ✅ Complete
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

### Phase 9: Monaco Editor + sql.js (SQL)
**Status**: ✅ Complete
**Objective**: Integrate sql.js for SQL topics. Same Monaco Editor shell but with SQL syntax highlighting. Pre-loaded SQL queries + in-memory SQLite dataset. Results rendered as a clean table in the output panel.
**Deliverables**:
- `SqlEditor` component (Monaco, SQL mode, sql.js backend)
- sql.js loaded from CDN with loading state
- Result table renderer (clean, responsive, scrollable)
- Pre-seeded in-memory database per SQL topic (e.g., a `sales` table for GROUP BY topic)
- Run / Reset buttons
- Error messages shown inline in output

---

### Phase 10: Mermaid.js Diagrams
**Status**: ✅ Complete
**Objective**: Integrate Mermaid.js to render flow diagrams for every topic (Section 4 of the 11-section structure). Diagrams defined as plain Mermaid syntax strings in topic data files. Rendered client-side. Horizontally scrollable on mobile. Simple, English-labeled, color-coded.
**Deliverables**:
- `MermaidDiagram` component (client-side render, SSR-safe)
- Scrollable container for mobile
- Default styling matching design system colors
- Error boundary: shows raw syntax if render fails

---

### Phase 11: Topic Sections — Content Components
**Status**: ✅ Complete
**Objective**: Build all remaining section components for the topic page: WhatIsThis, WhyItExists, HowItWorks, ComponentsBreakdown (accordion), HowToStartCode, CommonMistakes, QuickSummary, InterviewQuestions (with reveal toggle, type + difficulty badges), MarkComplete button (with confetti + toast + next topic reveal), and the ELI5 toggle.
**Deliverables**:
- Standard content components for all 11 sections
- `InterviewQuestionCard` — question, difficulty, type, reveal button, answer (hidden by default)
- `MarkCompleteButton` — updates Zustand store, triggers confetti, reveals next topic link
- `ELI5Toggle` — shifts text complexity between simplified and professional

---

### Phase 12: Topic Content System & Static Engine
**Status**: ✅ Complete
**Objective**: Create the engine that pulls static topic data from `lib/content/` and renders it through the topic shell. Subject data includes: array of topic IDs. Topic data includes: content for all 11 sections, Monaco code snippet, Mermaid string. Type safety for all content files.
**Deliverables**:
- `lib/content/index.ts` — main resolver for subjects and topics
- Type definitions for `Topic` and `Subject` objects
- Error handling for invalid topic/subject slugs (404 page)
- Dynamic route segment config for static generation (generateStaticParams)

---

## Milestone 3 — Community & Persistence

### Phase 13: Firebase Initialization (Auth & Firestore)
**Status**: ✅ Complete
**Objective**: Initialize Firebase project and integrate Client SDK. Configure Google & GitHub providers. Setup Firestore collections: `users`, `progress`, `notes`, `bookmarks`. Implement a "Sync Logic" that moves progress from localStorage to Firestore upon first login.
**Deliverables**:
- `lib/firebase.ts` — initialized app and services
- Firebase configuration environment variables
- `useAuth` hook for user state
- Transition logic: Guest (localStorage) → User (Firestore)

---

### Phase 14: Personal Topic Notes
**Status**: ✅ Complete
**Objective**: Add a "My Notes" section to every topic page (Section 11). Rich text or Markdown editor (simple textarea or minimal editor). Auto-saves to Firestore with debounce (2 seconds). Notes are per-user, per-topic.
**Deliverables**:
- `TopicNotes` component
- Auto-save status indicator (Saving... / Saved)
- Persistent notes storage per topic

---

### Phase 15: Bookmarks & Dashboard
**Status**: ✅ Complete
**Objective**: Add "Bookmark" toggle to topic headers, projects, and interview questions. Build the User Dashboard (`/dashboard`) showing: streak, overall progress %, bookmarked items list, recent topics visited, and "Next Recommended Topic".
**Deliverables**:
- `BookmarkButton` component
- `app/dashboard/page.tsx`
- Dashboard widgets: Stats summary, Bookmarks list, Continue Learning CTA

---

## Milestone 4 — Content Waves

### Phase 16: Content Wave 1 — SQL & Python Basics
**Status**: ✅ Complete
**Objective**: Write and integrate the first 10 SQL topics and first 5 Python topics. SQL topics require in-memory database seeds. Content must follow the 11-section standard rigorously. English only for launch.
**Deliverables**:
- `lib/content/sql/` — 10 topic files
- `lib/content/python/` — 5 topic files
- Verified Monaco/sql.js functionality for every topic

---

### Phase 17: Content Wave 2 — NumPy, Pandas & ML Intro
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
- All interactive elements have descriptive ARIA labels
- Performance audit results ≥ 80 on mobile/desktop
- Final code cleanup and documentation update

---

### Phase 21: About Page & Open Source Credits
**Status**: ⬜ Not Started
**Objective**: Build the About page explaining the N8N Data Science Community mission, the "Free forever" commitment, and how to contribute to the open-source repository. List core contributors and technologies used.
**Deliverables**:
- `app/about/page.tsx`
- Contribution guide link (GitHub)
- Technology stack badges

---

### Phase 22: Deployment & Final Launch
**Status**: ⬜ Not Started
**Objective**: Deploy to Vercel (or similar). Configure custom domain if available. Set up final environment variables for Firebase. Final sanity check of all links and interactive elements in production.
**Deliverables**:
- Production URL live
- Continuous Deployment (CD) pipeline configured
- Final project archive and handoff
