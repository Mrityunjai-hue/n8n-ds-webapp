---
phase: 2
plan: 1
wave: 1
title: Navigation & Global Layout
---

# Plan 1 — Navigation & Global Layout

## Goal
Build the site-wide navigation (desktop topnav + mobile hamburger), footer, and the global layout shell. Ensure consistent branding and responsive behavior.

## Tasks

### Task 1: Create the Navbar Component
- Implement the desktop navigation bar with logo, links (Roadmap, Projects, Interview, About), DarkModeToggle, and placeholder for Search (Ctrl+K) and Auth state.
- Ensure active link highlighting.

### Task 2: Create the Mobile Drawer Component
- Build a responsive hamburger menu that opens a side drawer with all navigation links.

### Task 3: Create the Footer Component
- Implement a professional footer with links, social placeholders, and the "Free forever" community note.

### Task 4: Integrate into Root Layout
- Update `app/layout.tsx` to include `Navbar` and `Footer`.
- Add a "Skip to Content" accessibility link.

### Task 5: Implement Link Utility for Active State
- Create a helper or component to handle active route highlighting in the navigation.

## Verify
- Navbar is visible and responsive across all breakpoints.
- Dark mode toggle works within the Navbar.
- Links navigate correctly (even if pages are placeholders).
- Active link is visually distinct.
- Footer is present and consistent.
