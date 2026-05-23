# ROADMAP.md — Project Phases

## Milestone 1 — Foundation & Core Infrastructure

### Phase 1: Project Setup & Design System
**Status**: ✅ Complete

### Phase 2: Navigation & Global Layout
**Status**: ✅ Complete

### Phase 3: Homepage — Hero + Stats Bar
**Status**: ✅ Complete

### Phase 4: Interactive Learning Roadmap (Homepage + /roadmap)
**Status**: ✅ Complete

### Phase 5: Subject Cards Grid
**Status**: ✅ Complete

### Phase 6: Auth UI & LocalProgress Store (Zustand)
**Status**: ✅ Complete

---

## Milestone 2 — Learning Engine

### Phase 7: Topic Page Shell & Sidebar
**Status**: ✅ Complete

### Phase 8: Monaco Editor + Pyodide (Python)
**Status**: ✅ Complete

### Phase 9: Monaco Editor + sql.js (SQL)
**Status**: ✅ Complete

### Phase 10: Mermaid.js Diagrams
**Status**: ✅ Complete

### Phase 11: Topic Sections — Content Components
**Status**: ✅ Complete

### Phase 12: Topic Content System & Static Engine
**Status**: ✅ Complete

---

## Milestone 3 — Community & Persistence

### Phase 13: Firebase Initialization (Auth & Firestore)
**Status**: ✅ Complete

### Phase 14: Personal Topic Notes
**Status**: ✅ Complete

### Phase 15: Bookmarks & Dashboard
**Status**: ✅ Complete

---

## Milestone 4 — Content Waves

### Phase 16: Content Wave 1 — SQL & Python Basics
**Status**: ✅ Complete

### Phase 17: Content Wave 2 — NumPy, Pandas & ML Intro
**Status**: ✅ Complete

---

## Milestone 5 — Advanced AI Frontier

### Phase 18: Content Wave 3 — Deep Learning & Neural Networks
**Status**: ✅ Complete
**Objective**: Populate the Deep Learning module. Topics: Perceptrons, Multi-Layer Perceptrons, Backpropagation, CNNs for Vision, RNNs for Sequence. Interactive Tensor visualization placeholders.
**Deliverables**:
- `lib/content/dl/` — 5 topic files
- Neural network architecture diagrams (Mermaid)
- Interview questions: 10 per topic

---

### Phase 19: Content Wave 4 — Generative AI & LLMs
**Status**: ✅ Complete
**Objective**: The Generative AI curriculum. Topics: Transformers Architecture, Attention Mechanism, RAG (Retrieval Augmented Generation), Fine-tuning Basics, Prompt Engineering.
**Deliverables**:
- `lib/content/genai/` — 5 topic files
- Attention mechanism visualization
- RAG workflow diagrams

---

### Phase 20: Content Wave 5 — Agentic AI & Autonomous Systems
**Status**: ✅ Complete
**Objective**: The final frontier. Topics: AI Agents vs LLMs, Tool Use (Function Calling), ReAct Pattern, Multi-Agent Orchestration, AutoGPT/BabyAGI concepts.
**Deliverables**:
- `lib/content/agentic/` — 5 topic files
- Agent loop diagrams
- Future of AI roadmap lesson

---

## Milestone 6 — Search & Specialized Tools

### Phase 21: Global Search (Ctrl+K)
**Status**: ✅ Complete
**Objective**: Implement a global command palette using `cmdk` or similar. Allow searching across all subjects, topics, and interview questions. Instant navigation with keyboard shortcuts.
**Deliverables**:
- `GlobalSearch` component
- Search indexing logic for `subjects.ts`
- Ctrl+K shortcut implementation

---

### Phase 22: Interview Question Bank (`/interview`)
**Status**: ✅ Complete
**Objective**: Aggregate all interview questions across all topics into a dedicated browsable page. Filterable by Subject, Difficulty (Fresher/Mid/Senior), and Type (Conceptual/Scenario/Coding/Trap). Reveal-answer toggle works here too. "Jump to Topic" link on each question.
**Deliverables**:
- `app/interview/page.tsx`
- Filter bar: Subject, Difficulty, Type
- `InterviewQuestionCard` component (same as topic page version)
- Question count displayed per filter combination
- "Jump to Topic" link opens the full topic page

---

## Milestone 7 — Polish & Launch

### Phase 23: Responsive Polish, Accessibility & Performance
**Status**: ✅ Complete
**Objective**: Final responsive audit across all breakpoints. Fix all layout issues. Add proper ARIA labels, keyboard navigation for modals, skip-to-content link. Optimize Pyodide and Monaco to load lazily. Add skeleton screens everywhere.
**Deliverables**:
- All pages responsive at 375/768/1280/1920px
- All interactive elements have descriptive ARIA labels
- Performance audit results ≥ 80 on mobile/desktop

---

### Phase 24: About Page & Open Source Credits
**Status**: ✅ Complete
**Objective**: Build the About page explaining the N8N Data Science Community mission, the "Free forever" commitment, and how to contribute.
**Deliverables**:
- `app/about/page.tsx`
- Contribution guide link (GitHub)
- Technology stack badges

---

### Phase 25: Deployment & Final Launch
**Status**: ⬜ Not Started
**Objective**: Deploy to Vercel. Configure custom domain. Set up final environment variables for Firebase. Final sanity check.
**Deliverables**:
- Production URL live
- Continuous Deployment (CD) pipeline configured
- Final project archive and handoff
