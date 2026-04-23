---
phase: 4
plan: 1
wave: 1
title: Interactive Learning Roadmap
---

# Plan 1 — Interactive Learning Roadmap

## Goal
Build the interactive, node-based learning roadmap that serves as the core navigation and progress visualization for the platform.

## Tasks

### Task 1: Define Subject Metadata
- Create `lib/subjects.ts` with the 10 subjects: SQL, Power BI, Python Basics, NumPy, Pandas, Data Visualization, Machine Learning, Deep Learning, Gen AI, Agentic AI.
- Include slugs, icons, topic counts, and estimated hours.

### Task 2: Create the RoadmapNode Component
- Build a reusable node component that displays the subject name, icon, and completion status colors (Gray/Amber/Teal).

### Task 3: Create the RoadmapGraph Component
- Build the visual tree using SVG or CSS Grid/Flexbox to connect nodes with dependency lines.
- Ensure it's horizontally scrollable on mobile.

### Task 4: Implement Navigation Logic
- Clicking a node should navigate to `/learn/[subject]`.
- Nodes should show 'In Progress' if some topics are visited, and 'Completed' only when fully finished (mocked logic for now until Milestone 3).

### Task 5: Assemble Homepage & /roadmap Page
- Embed the roadmap on the homepage below the `StatsBar`.
- Create `app/roadmap/page.tsx` for the full-screen roadmap view.

## Verify
- Roadmap correctly displays all 10 subjects in the specified order.
- Nodes are clickable and navigate to correct routes.
- Layout is responsive and scrollable on small screens.
- Visual connection lines clearly show the learning path.
