---
phase: 15
plan: 1
wave: 1
title: Bookmarks & Dashboard
---

# Plan 1 — Bookmarks & Dashboard

## Goal
Establish a central "Mission Control" for the user, allowing them to bookmark content and track their learning progress across the entire platform.

## Tasks

### Task 1: Implement Bookmark System
- Create `BookmarkButton` component to toggle bookmark state in Firestore.
- Add bookmarking logic to `lib/firebase/db.ts`.
- Integrate `BookmarkButton` into the `TopicPage` header.

### Task 2: Build Dashboard Layout
- Create `app/dashboard/page.tsx` with a premium, grid-based layout.
- Implement dashboard sections:
    - **Welcome Hero**: User profile info and motivation.
    - **Stats Grid**: Total topics completed, current streak, and estimated learning hours.
    - **Continue Learning**: A "Resume" card for the last visited topic.
    - **Bookmarks List**: A searchable/filterable list of saved topics.

### Task 3: Implement Dashboard Data Hooks
- Create `lib/hooks/useDashboardData.ts` to fetch user-specific stats and bookmarks from Firestore.
- Integrate with `useUserStore` and `useProgressStore`.

### Task 4: Add "Recent Activity" Tracking
- Implement logic to store the "Last Visited Topic" in Firestore/LocalStorage.
- Display this as a primary CTA on the dashboard.

## Verify
- Clicking the bookmark icon on a topic page updates the cloud state.
- Dashboard correctly displays the total count of completed topics.
- The "Resume" card correctly links to the most recently visited topic.
- Bookmarks list displays real-time data from Firestore.
