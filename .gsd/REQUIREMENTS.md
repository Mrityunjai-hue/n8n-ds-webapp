# REQUIREMENTS.md — N8N Data Science Community Learning Hub

> **Last Updated**: 2026-04-23
> **Source**: SPEC.md

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| REQ-01 | All topic pages must follow the exact 11-section structure in the defined order | SPEC Goal 1 | Pending |
| REQ-02 | SQL topics must have live code execution via sql.js in Monaco Editor | SPEC Goal 2 | Pending |
| REQ-03 | Python topics must have live code execution via Pyodide in Monaco Editor | SPEC Goal 2 | Pending |
| REQ-04 | Every topic must include a Mermaid.js visual flow diagram | SPEC Goal 2 | Pending |
| REQ-05 | Progress saves to localStorage immediately, no sign-in required | SPEC Goal 3 | Pending |
| REQ-06 | Progress syncs to Firebase Firestore on user login, within 2 seconds | SPEC Goal 3 | Pending |
| REQ-07 | Firebase Google OAuth and email/password sign-in must both work | SPEC Goal 3 | Pending |
| REQ-08 | Each topic must include minimum 5 interview questions (target 8–10) | SPEC Goal 4 | Pending |
| REQ-09 | Interview questions must have Fresher/Mid-level/Senior difficulty badges | SPEC Goal 4 | Pending |
| REQ-10 | Interview questions must have type badges: Conceptual/Scenario/Coding/Trap | SPEC Goal 4 | Pending |
| REQ-11 | Each topic must have at least 1 Conceptual, 1 Scenario, 1 Coding, 1 Trap question | SPEC Goal 4 | Pending |
| REQ-12 | All 18 projects must have the full 7-section project page structure | SPEC Goal 5 | Pending |
| REQ-13 | Interactive node-based roadmap must show dependency paths between subjects | SPEC Goal 1 | Pending |
| REQ-14 | Roadmap nodes must show correct completion status (gray/amber/teal) from progress store | SPEC Goal 3 | Pending |
| REQ-15 | Dashboard must show circular progress rings per subject | SPEC Goal 3 | Pending |
| REQ-16 | Dashboard must track and display daily streak | SPEC Goal 3 | Pending |
| REQ-17 | Mark as Complete button must trigger confetti animation + toast notification | SPEC Goal 3 | Pending |
| REQ-18 | Topic notes must auto-save to Firestore (debounced, 2 seconds) | SPEC Goal 3 | Pending |
| REQ-19 | Bookmarks must be saveable from topic pages, projects, and viewable from dashboard | SPEC Goal 3 | Pending |
| REQ-20 | Global search (Ctrl+K) must return results within 200ms, no network call | SPEC Goal 2 | Pending |
| REQ-21 | Dark mode must be default; preference persists via localStorage | Design | Complete |
| REQ-22 | ELI5 toggle must exist on every topic page; state saved per topic | Design | Pending |
| REQ-23 | Site must be fully responsive at 375px, 768px, 1280px, 1920px | Constraint | Pending |
| REQ-24 | Monaco Editor and Pyodide must load lazily (not in initial bundle) | Constraint | Pending |
| REQ-25 | Pyodide first-load must show "Setting up Python environment..." skeleton screen | Design | Pending |
| REQ-26 | All code editor examples must have line-by-line breakdown expandable panel | SPEC Goal 2 | Pending |
| REQ-27 | ML/DL/Gen AI/Agentic AI topics must have Section 5 Components Breakdown (accordion) | SPEC Goal 1 | Pending |
| REQ-28 | Every topic must have "Suggest an edit / Report an error" contribution button | Design | Pending |
| REQ-29 | Zero ads, zero paywalls, zero popups on every page — verifiable | SPEC | Pending |
| REQ-30 | Deployed to Vercel with all Firebase env vars configured | Constraint | Pending |
| REQ-31 | Lighthouse performance score ≥ 80 on homepage | Constraint | Pending |
| REQ-32 | ARIA labels on all interactive elements; keyboard navigation for all modals | Constraint | Pending |
| REQ-33 | Keyboard shortcuts: Ctrl+K (search), Ctrl+/ (sidebar), Ctrl+Enter (run code), N (next), P (prev) | Design | Pending |
| REQ-34 | Subject completion rings in dashboard are clickable and navigate to that subject | SPEC Goal 3 | Pending |
| REQ-35 | Progress dashboard has Weak Areas section based on interview question scores | SPEC Goal 4 | Pending |
