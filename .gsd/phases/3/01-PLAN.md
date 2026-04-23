---
phase: 3
plan: 1
wave: 1
title: Homepage Hero + Stats Bar
---

# Plan 1 — Homepage Hero + Stats Bar

## Goal
Build the high-impact homepage hero section and the statistical overview bar. Ensure the hero feels interactive and modern with a node-network animation.

## Tasks

### Task 1: Create the HeroSection Component
- Implement the Hero section with a bold headline, subheading, and primary/secondary CTA buttons.
- Add a lightweight, interactive node-network background using HTML5 Canvas or pure CSS.

### Task 2: Create the StatsBar Component
- Build a responsive bar showing 4 key stats: "X Topics", "X Projects", "X Questions", "Free Forever".
- Ensure it transitions well between desktop and mobile.

### Task 3: Assemble the Homepage
- Update `app/page.tsx` to include the `HeroSection` and `StatsBar`.
- Remove temporary verification content.

### Task 4: Add Micro-animations
- Implement subtle entrance animations for the hero text and stats tiles.

## Verify
- Hero section is visually stunning and responsive.
- Background animation is performant (60fps).
- CTA buttons are functional (navigate to /roadmap).
- Stats bar is correctly aligned and responsive.
