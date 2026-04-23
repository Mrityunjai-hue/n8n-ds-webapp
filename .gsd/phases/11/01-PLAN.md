---
phase: 11
plan: 1
wave: 1
title: Topic Sections — Content Components
---

# Plan 1 — Topic Sections — Content Components

## Goal
Build the specialized UI components that populate the 11-section lesson structure, transforming placeholders into interactive and engaging learning modules.

## Tasks

### Task 1: Create the InterviewQuestionCard Component
- Build a card to display interview questions with metadata (Difficulty, Category).
- Implement a "Reveal Answer" toggle with smooth transition.
- Add a "Jump to Topic" link placeholder.

### Task 2: Build the MarkCompleteButton Component
- Create a high-impact button for the end of the lesson.
- Integrate with `useProgressStore` to mark the current topic as complete.
- Implement a confetti effect upon completion (using `canvas-confetti`).
- Display a "Next Topic" recommendation/link after completion.

### Task 3: Implement the ELI5Toggle Component
- Create a toggle that switches the "Explain Like I'm 5" state.
- Wire it to the page state so content can conditionally render simplified vs. professional text.

### Task 4: Create Generic Section Components
- Build `WhatIsThis`, `WhyItExists`, `HowItWorks`, and `CommonMistakes` standard layout components.
- Ensure consistent typography and spacing.

### Task 5: Implement Topic Notes Component
- Build a basic textarea-based notes component for Section 11.
- Add a "Save" status indicator (mock logic for now).

## Verify
- Interview questions are revealable and correctly styled.
- Mark Complete button triggers state update and visual feedback.
- ELI5 toggle changes the visual state of the page.
- Section components provide a cohesive and professional look.
- Layout remains responsive and accessible.
