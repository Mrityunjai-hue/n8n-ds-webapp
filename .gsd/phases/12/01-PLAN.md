---
phase: 12
plan: 1
wave: 1
title: Topic Content System & Static Engine
---

# Plan 1 — Topic Content System & Static Engine

## Goal
Transform the topic page from a mock-data-driven shell into a powerful static content engine that resolves real educational data from a structured library.

## Tasks

### Task 1: Define the Content Schema
- Create `lib/types/content.ts` with TypeScript interfaces for `Subject`, `Topic`, and `LessonSection`.
- Ensure the schema supports both Python (Monaco) and SQL (sql.js) configurations.

### Task 2: Implement the Content Resolver
- Create `lib/content/index.ts` to manage subject and topic resolution.
- Implement helper functions like `getSubjectBySlug` and `getTopicBySlug`.
- Scaffold initial data for SQL and Python basics to test the engine.

### Task 3: Implement Static Params Generation
- Update `app/learn/[subject]/[topic]/page.tsx` to include `generateStaticParams`.
- This ensures Next.js can pre-render all available topic pages at build time.

### Task 4: Connect Engine to UI
- Refactor `TopicPage` to use real data resolved from the engine instead of `mockTopics`.
- Map the 11 sections to actual content fields from the topic object.

### Task 5: Handle 404/Error States
- Implement proper redirection to `notFound()` if a subject or topic slug is invalid.

## Verify
- Navigating to `/learn/sql/intro` loads the real SQL intro content.
- `generateStaticParams` correctly identifies all available subjects and topics.
- Type safety is maintained throughout the content resolution process.
- 404 page is triggered for invalid routes.
