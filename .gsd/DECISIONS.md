# DECISIONS.md — Architecture Decision Records

> **Format**: ADR (Architecture Decision Record)
> **Last Updated**: 2026-04-23

---

## ADR-001: Next.js App Router over Pages Router

**Date**: 2026-04-23
**Status**: Accepted

**Context**: Choosing between Next.js App Router (v13+) and the older Pages Router.

**Decision**: Use App Router.

**Rationale**:
- Server Components allow SEO-friendly metadata generation at route level
- Nested layouts simplify the sidebar + main content structure per topic
- Colocated loading.tsx for skeleton screens per route
- Better long-term support (Pages Router is in maintenance mode)

**Consequences**: Client components must be explicitly marked `'use client'`. Monaco, Pyodide, sql.js, Mermaid all require this.

---

## ADR-002: Zustand for Progress State

**Date**: 2026-04-23
**Status**: Accepted

**Context**: Need client-side global state for progress that persists to localStorage.

**Decision**: Use Zustand with `zustand/persist` middleware.

**Rationale**:
- Minimal boilerplate vs Redux
- Built-in localStorage persistence via middleware
- Easy to subscribe selectively (avoid over-rendering)
- Works naturally with React Server Components (store is client-side)

**Consequences**: Progress state is client-only. Server components cannot read it. SSR always renders "0% complete" state; client hydrates real values. This is acceptable (no flash on topic pages because progress is a UI overlay, not content).

---

## ADR-003: Content as Static TypeScript Files

**Date**: 2026-04-23
**Status**: Accepted

**Context**: Need a content management approach for 100+ topics. Options: CMS (Contentful, Sanity), MDX files, or TypeScript data objects.

**Decision**: TypeScript data files in `lib/content/`.

**Rationale**:
- Zero cost (no CMS service)
- Full type safety — TypeScript enforces the 11-section structure via `TopicContent` type
- Easy to code review / community-contributed via PR
- Tree-shaken per route — only the current topic's content is in the JS bundle
- No parsing step (MDX compilation adds build complexity)

**Consequences**: Content changes require a Git commit + Vercel redeploy. This is fine for v1. Community contributions happen via PRs, not a web UI.

---

## ADR-004: Pyodide over JupyterLite / other Python runtimes

**Date**: 2026-04-23
**Status**: Accepted

**Context**: Need Python execution in the browser for data science topics.

**Decision**: Pyodide loaded from CDN.

**Rationale**:
- Full CPython 3.11 with scientific stack (numpy, pandas, matplotlib, sklearn available)
- CDN-loaded (no self-hosting the 10MB WASM binary)
- Active maintenance by Mozilla/community
- Good community support and documentation

**Consequences**: First load is ~8-10MB (WASM + micropip). Mitigated by lazy loading (only when user clicks "Run Code") and browser caching. Matplotlib output requires canvas-based rendering — will use `matplotlib.pyplot.savefig` to base64 PNG for display.

---

## ADR-005: No Backend API Server in v1

**Date**: 2026-04-23
**Status**: Accepted

**Context**: Whether to build any server-side API for progress, content, search, etc.

**Decision**: No backend server. All logic is client-side + Firebase.

**Rationale**:
- Eliminates server costs (₹0 budget constraint)
- Eliminates deployment complexity
- Firebase handles auth and data persistence
- All content is static (TypeScript files)
- Search is a static client-side index
- Code execution is WASM in-browser

**Consequences**: No server-side session management. Firebase SDK handles auth state. No rate limiting or abuse protection on data writes (Firestore security rules must be tight). No analytics beyond Firebase built-ins.
