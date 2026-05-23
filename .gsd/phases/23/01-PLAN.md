---
phase: 23
plan: 1
wave: 1
---

# Plan: Responsive Polish, Accessibility & Performance

## Goal
Perform a final responsive audit, enhance accessibility with ARIA labels and keyboard navigation, and optimize performance through lazy loading and skeleton screens.

## Tasks

### Wave 1: Accessibility & Foundation
#### Task 1: Add Skip-to-Content Link
- File: `app/layout.tsx`
- Ensure a visible-on-focus "Skip to Content" link is present and correctly linked to the main content area.

#### Task 2: Descriptive ARIA Labels
- Files: `components/**/*.tsx`
- Audit and add `aria-label` to all buttons, links, and interactive elements that lack clear text (e.g., icons, dark mode toggle).

#### Task 3: Keyboard Navigation for Modals
- Files: `components/layout/AuthModal.tsx`, `components/search/GlobalSearch.tsx`
- Ensure modals handle focus trapping and the `Esc` key correctly (though `cmdk` and basic logic might already handle this).

### Wave 2: Responsive Polish
#### Task 4: Responsive Audit & Fixes
- Perform a manual audit of all pages (`/`, `/roadmap`, `/learn`, `/interview`) at 375px, 768px, 1280px.
- Fix overlapping text, overflow issues, and improve padding/spacing on mobile.

### Wave 3: Performance & UX
#### Task 5: Lazy Load Pyodide & Monaco
- File: `components/learn/InteractiveEditor.tsx`, `components/learn/SqlEditor.tsx`
- Ensure code editors and runtimes only load when needed or use dynamic imports where appropriate to reduce initial bundle size.

#### Task 6: Skeleton Screens
- Files: `components/ui/Skeleton.tsx` (create), various page components.
- Implement skeleton loaders for content-heavy sections (subject cards, topic content, interview questions).

## Verification
- Skip-to-content link works.
- ARIA labels present on all icons/buttons.
- No layout breakage at mobile (375px).
- Skeletons visible during loading states.
