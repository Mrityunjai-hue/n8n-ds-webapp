# Implementation Plan - Phase 21: Global Search (Ctrl+K)

This phase implements a professional "Command Palette" search interface, allowing students to instantly find subjects, topics, or interview questions using a keyboard shortcut.

## 1. Technical Overview
- **Library**: `cmdk` (Fast, unstyled command menu React component).
- **Shortcut**: `Ctrl+K` (Windows/Linux) / `Cmd+K` (Mac).
- **Search Scope**: 
    - Subject names and descriptions.
    - Topic titles and descriptions.
    - Interview question text.
- **Navigation**: Instant routing on selection.

## 2. Dependencies to Install
- `cmdk`

## 3. Data Indexing Strategy
We will create a helper to flatten the `subjects` array into a searchable list of `SearchItem`s:
```typescript
interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: 'subject' | 'topic' | 'question';
  href: string;
  subjectName?: string; // For context in topic/question results
}
```

## 4. Implementation Steps

### Step 1: Install Dependencies
Install `cmdk` using `npm`.

### Step 2: Search Index Logic
Create `lib/hooks/use-search.ts`:
- Flatten `subjects` into `SearchItem[]`.
- Implement filtering logic (or use `cmdk`'s built-in filtering).

### Step 3: UI Component
Create `components/search/GlobalSearch.tsx`:
- Use `cmdk` for the command menu structure.
- Add styling using Tailwind CSS (dark mode compatible).
- Add keyboard shortcut listener for `Ctrl+K`.
- Categorize results: `Subjects`, `Topics`, `Questions`.

### Step 4: Integration
- Add the `GlobalSearch` component to `app/layout.tsx` so it's available globally.

## 5. Verification Plan
- **Shortcut Test**: Press `Ctrl+K` from any page.
- **Search Accuracy**: Search for "SQL", "Agent", "Normalization", etc.
- **Categorization**: Ensure results are grouped correctly.
- **Navigation**: Selection should route to the correct URL (e.g., `/learn/agentic-ai/ai-agents-vs-llms`).
- **Responsive**: Ensure it looks good on mobile (search icon vs shortcut).

---
**Note**: This feature is a core requirement of the "Smart Search" design spec.
