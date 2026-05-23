---
phase: 22
plan: 1
wave: 1
---

# Plan: Interview Question Bank (/interview)

## Goal
Build a dedicated `/interview` page that aggregates ALL interview questions from every subject and topic into a single, filterable, browsable page.

## Tasks

### Task 1: Upgrade InterviewQuestionCard with "Jump to Topic" link
- File: `components/learn/InterviewQuestionCard.tsx`
- Add optional `topicHref` and `subjectName` / `topicName` props
- Wire the existing "Read full concept" button to `topicHref`

### Task 2: Create the /interview page
- File: `app/interview/page.tsx`
- Aggregate all questions from `subjects` using a helper
- Filter bar: Subject, Difficulty (Fresher/Mid/Senior), Type (Conceptual/Scenario/Coding/Trap)
- Display question count per active filter
- Render `InterviewQuestionCard` for each result
- Empty state when no results match

## Verification
- Page renders at `/interview`
- Filter bar correctly narrows results
- Question count updates dynamically
- "Jump to Topic" navigates correctly
