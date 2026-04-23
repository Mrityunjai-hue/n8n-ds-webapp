---
phase: 6
plan: 1
wave: 1
title: Auth UI & LocalProgress Store
---

# Plan 1 — Auth UI & LocalProgress Store

## Goal
Implement the state management foundation using Zustand and build the visual identity for authentication. Ensure guest progress is persisted locally.

## Tasks

### Task 1: Initialize the Progress Store
- Create `lib/store/useProgressStore.ts` using Zustand.
- Implement persistence using `persist` middleware to save state to `localStorage`.
- Store structure: `completedTopics: string[]`, `visitedTopics: string[]`, `streak: number`, `lastVisit: string`.

### Task 2: Create the AuthModal Component
- Build a beautiful, tabbed modal for "Sign In" and "Create Account".
- Include placeholders for Google and GitHub social login buttons.
- Ensure the modal is accessible and can be triggered from the Navbar.

### Task 3: Update Navbar for Auth State
- Wire up the "Sign In" button to open the `AuthModal`.
- Create a mock `user` state to test the transition from "Sign In" button to Avatar dropdown.

### Task 4: Implement Local Mode Notification
- Create a small "Progress saved locally" toast or badge that appears if the user is not logged in.

## Verify
- Progress store correctly saves and loads from localStorage.
- AuthModal opens and closes correctly with smooth transitions.
- Navbar switches between "Sign In" and Avatar when mock user state changes.
- UI handles both guest and "logged-in" views gracefully.
