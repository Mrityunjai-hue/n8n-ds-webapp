---
phase: 7
plan: 1
wave: 1
title: Topic Page Shell & Sidebar
---

# Plan 1 — Topic Page Shell & Sidebar

## Goal
Create the core learning interface where students will spend most of their time. This includes the sidebar for navigation and the 11-section layout for content.

## Tasks

### Task 1: Create the Topic Page Route
- Implement the dynamic route `app/learn/[subject]/[topic]/page.tsx`.
- Set up the main layout structure: Sidebar on left (desktop), Content on right.

### Task 2: Build the TopicSidebar Component
- Display the current subject name and the list of topics within that subject.
- Add progress tracking indicators (checkmarks for completed topics).
- Implement an "Active" state highlight for the current topic.
- Add a progress percentage bar at the top of the sidebar.

### Task 3: Implement Mobile Topic Navigation
- Create a mobile version of the sidebar that opens as a drawer.
- Add a "Topic Menu" trigger button visible only on mobile.

### Task 4: Scaffold the 11-Section Content Layout
- Define the standard 11 sections (What is this, Why it exists, etc.) as components or clear visual regions.
- Use placeholder content with proper heading hierarchy (H1, H2).

### Task 5: Add Breadcrumbs & Pagination
- Implement breadcrumb navigation (Subject > Topic) at the top.
- Add "Previous Topic" and "Next Topic" buttons at the bottom of the content area.

### Task 6: Implement Keyboard Shortcuts
- Add event listeners for 'N' (Next Topic), 'P' (Previous Topic), and 'Ctrl+/' (Toggle Sidebar).

## Verify
- Sidebar displays topics correctly and highlights the active one.
- Navigation between topics works via sidebar and bottom buttons.
- Layout is responsive and correctly handles the sidebar on mobile.
- Keyboard shortcuts trigger the expected actions.
- 11-section structure is visually clear.
