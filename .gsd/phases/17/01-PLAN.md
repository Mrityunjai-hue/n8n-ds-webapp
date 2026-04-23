---
phase: 17
plan: 1
wave: 1
title: Content Wave 2 — NumPy, Pandas & ML Intro
---

# Plan 1 — Content Wave 2 — NumPy, Pandas & ML Intro

## Goal
Establish the Machine Learning curriculum and implement the "Components Breakdown" specialized UI for complex architectural topics.

## Tasks

### Task 1: Implement `ComponentsBreakdown` Component
- Create a reusable accordion-based component in `components/learn/ComponentsBreakdown.tsx`.
- Support a list of items with titles and detailed descriptions.
- Style it to match the premium, dark-mode aesthetic.

### Task 2: Update `TopicPage` and Types
- Add `components` property to `SectionContent` type in `lib/types/content.ts`.
- Update `TopicPage` to render `ComponentsBreakdown` when `section.id === 'components'`.

### Task 3: Populate ML Content
- Expand `lib/content/subjects.ts` with 5 ML topics:
    1. **What is Machine Learning?**: The paradigm shift from explicit programming.
    2. **The ML Workflow**: From data collection to deployment.
    3. **Data Preprocessing**: Cleaning, scaling, and encoding.
    4. **Linear Regression**: Predicting continuous values.
    5. **Logistic Regression**: The foundation of classification.
- Ensure each topic has a `ComponentsBreakdown` section (Section 5).
- Add 8+ interview questions per topic.

### Task 4: Add NumPy & Pandas Placeholders
- Add at least 3 detailed topics for NumPy and Pandas to bridge the gap between Python and ML.

## Verify
- "Components Breakdown" accordion functions correctly on ML topic pages.
- Mermaid diagrams correctly visualize the ML Workflow.
- Python code examples for Regression are correct.
- 8+ interview questions render for every ML topic.
