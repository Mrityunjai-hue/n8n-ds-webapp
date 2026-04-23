---
phase: 13
plan: 1
wave: 1
title: Firebase Initialization (Auth & Firestore)
---

# Plan 1 — Firebase Initialization (Auth & Firestore)

## Goal
Establish the cloud foundation for the N8N Learning Hub by initializing Firebase, enabling persistent user authentication, and preparing Firestore for progress synchronization.

## Tasks

### Task 1: Install Firebase SDK
- Install the `firebase` npm package.

### Task 2: Configure Firebase Client
- Create `lib/firebase/config.ts` to initialize the Firebase app with environment variables.
- Export `auth` and `db` (Firestore) instances.

### Task 3: Setup Auth Hooks & Context
- Create `lib/hooks/useAuth.ts` to manage the authentication state.
- Implement login with Google/GitHub logic.
- Update the `AuthModal` to trigger real Firebase auth flows.

### Task 4: Implement Local-to-Cloud Sync Logic
- Create a `SyncService` that detects when a guest user logs in for the first time.
- Move local progress (from `useProgressStore`) to Firestore.
- Merge local and cloud progress to ensure no data loss.

### Task 5: Setup Firestore Schema Helpers
- Create helper functions to read/write `progress`, `notes`, and `bookmarks` in Firestore.

## Verify
- Users can sign in using Google/GitHub.
- Authentication state is persisted across page refreshes.
- Local progress correctly syncs to Firestore upon the first login.
- Firestore collections are updated in real-time as the user completes topics.
