---
phase: 5
plan: 1
wave: 1
title: Subject Cards Grid
---

# Plan 1 — Subject Cards Grid

## Goal
Implement the subject cards grid on the homepage to provide detailed access to each learning module. Each card will show metadata and progress.

## Tasks

### Task 1: Create the SubjectCard Component
- Build a card component that displays:
    - Subject icon and name.
    - Topic count and estimated hours.
    - A completion progress bar (visual only for now, tied to mock data or 0%).
    - "Start Learning" or "Continue" button.

### Task 2: Create the SubjectGrid Component
- Build a responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop) that maps through the subjects from `lib/subjects.ts`.

### Task 3: Assemble onto Homepage
- Embed the `SubjectGrid` on `app/page.tsx` below the `RoadmapGraph`.
- Add a "Browse Subjects" header section.

### Task 4: Implement Progress Bar Utility
- Create a reusable `ProgressBar` component that can be used in cards and later in the dashboard.

## Verify
- Grid is responsive and correctly displays all 10 subjects.
- Cards are visually consistent with the design system.
- Buttons link to the correct subject routes.
- Progress bars are correctly rendered.
