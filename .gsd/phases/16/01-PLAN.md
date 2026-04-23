---
phase: 16
plan: 1
wave: 1
title: Content Wave 1 — SQL & Python Basics
---

# Plan 1 — Content Wave 1 — SQL & Python Basics

## Goal
Populate the platform with high-quality, structured learning content for the first two core modules: SQL and Python Basics.

## Content Scope

### SQL Mastery (5 Topics)
1. **The SQL Mindset**: Why relational databases matter.
2. **SELECT & FROM**: The bread and butter of data retrieval.
3. **Filtering with WHERE**: Mastering logic and operators.
4. **Ordering & Limiting**: Sorting your insights.
5. **Interview Focus**: Top 5 entry-level SQL query challenges.

### Python for Data (5 Topics)
1. **Python as a Calculator**: Variables, types, and math.
2. **Control Flow**: If/Else logic for data cleaning.
3. **Loops & Lists**: Processing collections.
4. **Functions**: Reusable code patterns.
5. **Interview Focus**: Common Python algorithmic pitfalls for freshers.

## Tasks

### Task 1: Expand `lib/content/subjects.ts`
- Populate the `subjects` array with detailed metadata for SQL and Python.
- Write the actual lesson content (11 sections per topic) for all 10 topics.
- Ensure each topic has unique `InterviewQuestion` sets.

### Task 2: Implement "Pro-Tips" and "Warnings"
- Ensure every lesson includes at least one `ProTip` and one `Warning` component to provide high-value industry context.

### Task 3: Interactive Code Snippets
- Add functional code blocks to all Python lessons using the `SyntaxHighlighter` (or standard pre/code tags with our styling).

## Verify
- Navigation: Clicking a topic in the Sidebar loads the correct content.
- Visuals: Topic headers display correct icons and durations.
- Interactive: Interview question cards reveal correct answers on click.
- Layout: 11-section structure renders consistently across all topics.
