---
phase: 14
plan: 1
wave: 1
title: Personal Topic Notes
---

# Plan 1 — Personal Topic Notes

## Goal
Enable persistent, cloud-synced journaling for students on every topic page.

## Tasks
1. Implement `TopicNotes` component.
2. Integrate with Firestore for per-topic note storage.
3. Implement 2-second debounced auto-save.
4. Add visual status indicators (Saving... / Saved).

## Verification
- Notes persist across page refreshes.
- Notes are unique to each topic and user.
- Auto-save triggers correctly after typing.
