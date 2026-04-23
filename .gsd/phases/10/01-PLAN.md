---
phase: 10
plan: 1
wave: 1
title: Mermaid.js Diagrams
---

# Plan 1 — Mermaid.js Diagrams

## Goal
Integrate visual flow diagrams into the learning process using Mermaid.js, enabling students to visualize architectures and logic flows directly within lessons.

## Tasks

### Task 1: Install Mermaid.js
- Install `mermaid` via npm.

### Task 2: Build the MermaidDiagram Component
- Create a client-side only component that takes a Mermaid syntax string and renders it.
- Ensure the component is SSR-safe (using `useEffect`).
- Add an error boundary or fallback to show the raw syntax if rendering fails.

### Task 3: Apply Custom Styling
- Configure Mermaid to use the project's design tokens (teal accents, dark surfaces).

### Task 4: Implement Responsive Container
- Wrap the diagram in a horizontally scrollable container with a "Scroll to explore" hint for mobile users.

### Task 5: Integrate into Topic Page
- Replace the placeholder in the `diagram` section (Section 4) of the topic page with the `MermaidDiagram` component.

## Verify
- Diagrams render correctly from valid Mermaid syntax.
- Visual style matches the project's dark-mode aesthetic.
- Diagrams are scrollable on mobile devices.
- Invalid syntax displays a fallback instead of crashing the page.
