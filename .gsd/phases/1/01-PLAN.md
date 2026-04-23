---
phase: 1
plan: 1
wave: 1
title: Next.js Init + Tailwind Design System
---

# Plan 1 — Next.js Initialization & Tailwind Design System

## Goal
Initialize the Next.js 14 App Router project, configure Tailwind CSS with the full custom design token system, set up Google Fonts, create global CSS variables, and scaffold the complete folder structure.

## Tasks

### Task 1: Initialize Next.js 14 with App Router
- Run `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src/ OFF, import alias @/*
- Verify dev server starts at localhost:3000

### Task 2: Configure Tailwind with Design System Tokens
- Extend `tailwind.config.ts` with all custom colors, fonts, border-radius, transitions from SPEC.md
- Add dark mode: 'class' strategy

### Task 3: Set up Google Fonts + Global CSS
- Add Syne, Plus Jakarta Sans, JetBrains Mono via next/font/google
- Set CSS custom properties in globals.css for all design tokens
- Apply base body styles (dark bg, font, antialiasing)

### Task 4: Scaffold Folder Structure
- Create all directories from ARCHITECTURE.md: components/ui, components/layout, components/home, components/topic, components/dashboard, components/projects, components/search, lib/stores, lib/content/sql, lib/content/python-basics, lib/content/numpy, lib/content/pandas, lib/content/ml, types/

### Task 5: Build Base UI Components
- Button (variants: primary, secondary, ghost, danger; sizes: sm, md, lg)
- Badge (variants: teal, amber, blue, gray, red, green)
- Card (with hover effect, surface background)
- Skeleton (animated pulse placeholder)
- Toast (success, error, info variants)

### Task 6: Dark Mode ThemeProvider + Toggle
- Create ThemeProvider context (class-based, localStorage persisted)
- Create DarkModeToggle component (sun/moon icon swap)
- Wire into app/layout.tsx

## Verify
- `npm run dev` starts with no errors
- localhost:3000 loads with dark background (#0D1117)
- No TypeScript errors: `npx tsc --noEmit`
- All base components render in a test page
