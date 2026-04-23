---
phase: 9
plan: 1
wave: 1
title: Monaco Editor + sql.js (SQL)
---

# Plan 1 — Monaco Editor + sql.js (SQL)

## Goal
Integrate an interactive SQL environment into the learning hub, enabling real-time SQL execution against an in-memory SQLite database using `sql.js`.

## Tasks

### Task 1: Install sql.js
- Install `sql.js` via npm.

### Task 2: Implement the useSqlJs Hook
- Create `lib/hooks/useSqlJs.ts` to manage the initialization of the SQLite environment.
- Implement logic to seed the database with mock data per topic.

### Task 3: Build the SqlEditor Component
- Implement the Monaco-based editor with SQL support.
- Reuse the `InteractiveEditor` layout but specialized for SQL.

### Task 4: Create the SqlOutputTable Component
- Build a responsive table renderer for SQL query results.
- Handle different data types and empty result sets.

### Task 5: Integrate into Topic Page
- Update the topic page to dynamically switch between `InteractiveEditor` (Python) and `SqlEditor` (SQL) based on the subject.

## Verify
- SQL queries execute correctly against the in-memory database.
- Results are displayed in a clean, scrollable table.
- Error messages from SQLite are handled gracefully.
- The UI correctly identifies the current subject and loads the appropriate editor.
