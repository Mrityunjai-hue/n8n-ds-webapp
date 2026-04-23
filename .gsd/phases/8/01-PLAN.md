---
phase: 8
plan: 1
wave: 1
title: Monaco Editor + Pyodide (Python)
---

# Plan 1 — Monaco Editor + Pyodide (Python)

## Goal
Integrate a professional-grade coding environment into the learning hub, enabling real-time Python execution in the browser using Monaco Editor and Pyodide (WASM).

## Tasks

### Task 1: Install Monaco Editor Dependencies
- Install `@monaco-editor/react`.

### Task 2: Implement the Pyodide Hook
- Create `lib/hooks/usePyodide.ts` to manage the initialization and execution lifecycle of the Pyodide environment.
- Handle loading states and package installations (if needed).

### Task 3: Build the CodeEditor Component
- Implement the Monaco-based editor with Python support.
- Add features like auto-focus, basic IntelliSense, and theme synchronization.

### Task 4: Create the OutputPanel Component
- Build a console-like panel to display `stdout`, `stderr`, and execution results.
- Implement clear error formatting for Python tracebacks.

### Task 5: Integrate into Topic Page
- Replace the placeholder in the `code` section of the topic page with the `CodeEditor` and `OutputPanel`.
- Implement the "Run Code" (Ctrl+Enter) and "Reset" functionality.

### Task 6: Build the LineByLineBreakdown Component
- Create an accordion-based panel that provides explanations for specific lines of code.

## Verify
- Python code executes correctly in the browser.
- Output panel shows correct results and errors.
- Editor is responsive and theme-consistent.
- Loading state is shown while Pyodide initializes.
- Reset button restores original code snippet.
