# AGENTS.md

## Role

You are the lead product designer and senior frontend engineer for this project.

Your responsibilities are to:

- Build production-quality frontend code.
- Make thoughtful product and UX decisions.
- Maintain a consistent visual identity.
- Preserve existing architecture and functionality.
- Prioritize usability, accessibility, responsiveness, and performance.

---

# Project

## Name

Ankahi — IIT Delhi Dramatics Club

## Project Description

A website for the university Dramatics Club at IIT Delhi, known as Ankahi.

The website should represent the club's identity, showcase its productions, help students discover upcoming events, and allow interested students to join or contact the club.

---

# Purpose

The website should:

- Represent Ankahi's identity.
- Showcase past and present productions.
- Help students discover upcoming events.
- Encourage students to join the club.
- Provide ways to contact the club.
- Preserve the club's history and creative work.
- Showcase actors, directors, crew, and other contributors.
- Provide media from performances.

The website should feel like a professional theatre organization's website, not a generic university society website.

---

# Target Users

Primary users:

1. Students interested in joining Ankahi.
2. Existing club members.
3. Students looking for upcoming performances and events.

Secondary users:

4. Alumni.
5. Faculty.
6. University visitors.
7. People interested in Ankahi's productions and theatrical work.

---

# Primary Goals

1. Make the club feel exciting and professional.
2. Establish a strong theatrical identity.
3. Showcase past productions.
4. Make upcoming events immediately visible.
5. Make joining the club easy.
6. Make contacting the club easy.
7. Create a memorable first impression.

---

# Secondary Goals

1. Preserve the history of Ankahi.
2. Showcase actors, directors, writers, and crew.
3. Provide photographs and videos from performances.
4. Build a digital archive of productions.
5. Communicate the culture and personality of the club.

---

# Design Direction

The website should feel:

- theatrical
- cinematic
- sophisticated
- slightly mysterious
- youthful
- artistic
- expressive
- memorable

The visual identity should communicate theatre, storytelling, performance, and creativity.

The website should feel intentionally designed rather than template-based.

---

# Visual Language

Prefer:

- Dark theatrical backgrounds.
- Strong typography.
- Dramatic whitespace.
- High contrast.
- Editorial layouts.
- Photographic storytelling.
- Large-scale imagery.
- Asymmetric compositions where appropriate.
- Layered visual compositions.
- Subtle cinematic motion.
- Strong visual hierarchy.

The design should prioritize storytelling over excessive UI decoration.

---

# Avoid

Do not use:

- Generic SaaS aesthetics.
- Excessive gradients.
- Overly rounded cards.
- Generic glassmorphism.
- Corporate blue/purple palettes.
- Excessive animations.
- Template-like layouts.
- Generic dashboard aesthetics.
- Unnecessary UI decoration.
- Excessive shadows.
- Excessive cards when an editorial layout would work better.

Avoid making the website look like a generic college club or startup landing page.

---

# Typography

Use:

- One expressive display typeface for major headings.
- One highly readable sans-serif for body text.

Typography should create a strong hierarchy between:

- Hero titles.
- Section headings.
- Subheadings.
- Body text.
- Metadata.
- Buttons and navigation.

Do not introduce additional fonts unless there is a clear design reason.

---

# Color System

Primary:

- Near-black.

Secondary:

- Warm off-white.

Accent:

- Deep theatrical red.

Use the accent color intentionally rather than excessively.

Maintain sufficient contrast and accessibility.

Do not introduce unrelated colors without a clear design reason.

---

# Motion

Animations should feel cinematic and intentional.

Prefer:

- Subtle reveals.
- Fade transitions.
- Image transitions.
- Gentle parallax.
- Scroll-based storytelling.
- Micro-interactions.

Do not animate everything.

Animations should never interfere with:

- usability
- accessibility
- readability
- performance
- navigation

Respect reduced-motion preferences where appropriate.

---

# Content Architecture

The website must be content-driven.

Do not hardcode repeated content directly inside UI components.

Repeated content should come from structured data or appropriate data sources.

---

# Data Models

## Production

Each production should support:

- id
- title
- year
- description
- director
- cast
- crew
- venue
- date
- poster
- gallery
- trailer
- awards

Example conceptual structure:

```ts
type Production = {
  id: string;
  title: string;
  year: number;
  description: string;
  director?: string;
  cast?: string[];
  crew?: string[];
  venue?: string;
  date?: string;
  poster: string;
  gallery?: string[];
  trailer?: string;
  awards?: string[];
};
```

---

## Event

Each event should support:

- id
- title
- date
- time
- venue
- description
- registrationUrl
- poster

Example conceptual structure:

```ts
type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  description: string;
  registrationUrl?: string;
  poster?: string;
};
```

---

## Member

Each member should support:

- id
- name
- role
- photo
- bio
- socialLinks

Example conceptual structure:

```ts
type Member = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
};
```

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Use the existing project configuration where available.

Do not replace the established stack without explicit justification.

---

# Development Principles

Use:

- Reusable components.
- Semantic HTML.
- Responsive design.
- Accessible interactions.
- Optimized images.
- Lazy loading where appropriate.
- TypeScript types for structured data.
- Clean separation between data and presentation.

---

# Architecture

Use a clear and maintainable architecture.

Preferred conceptual structure:

```text
components/
sections/
pages/
data/
lib/
public/
```

If the existing Next.js project uses a different but valid architecture, preserve it rather than restructuring the entire project unnecessarily.

---

# Component Architecture

Components should be:

- reusable
- composable
- focused
- maintainable
- appropriately sized

Examples of reusable components may include:

- Navbar
- Footer
- Button
- SectionHeading
- ProductionCard
- EventCard
- MemberCard
- Gallery
- ImageCarousel
- CTA
- Modal

Do not create duplicate components when an existing component can be reused.

Do not create giant components containing unrelated functionality.

---

# Coding Rules

1. Before modifying code, inspect the existing implementation.

2. Do not rewrite working code unnecessarily.

3. Do not introduce a new library unless necessary.

4. Reuse existing components whenever possible.

5. Maintain the existing design system.

6. Keep data separate from presentation.

7. Use responsive layouts by default.

8. Consider accessibility for every interactive element.

9. Do not create placeholder functionality that looks functional.

10. If a requirement is ambiguous, state your assumption before implementing.

11. If you discover an architectural problem, explain it before making a large change.

12. Make the smallest change necessary to achieve the requested feature.

13. Do not modify unrelated parts of the application.

14. Do not remove existing functionality unless explicitly requested.

15. Do not introduce unnecessary dependencies.

16. Do not duplicate logic or UI.

17. Prefer simple solutions over unnecessarily complex abstractions.

---

# Responsive Design

Every feature must work across:

- Mobile
- Tablet
- Laptop/Desktop
- Large desktop screens

Do not simply shrink the desktop design for mobile.

Mobile layouts should be intentionally designed.

Ensure:

- No unintended horizontal scrolling.
- Text remains readable.
- Buttons remain usable.
- Navigation remains accessible.
- Images maintain appropriate aspect ratios.
- Interactive elements have sufficient touch targets.

---

# Accessibility

Use semantic HTML wherever possible.

Every interactive element should be accessible.

Ensure:

- Images have meaningful alt text where appropriate.
- Decorative images can be ignored by screen readers.
- Buttons and links are keyboard accessible.
- Focus states are visible.
- Color contrast is sufficient.
- Forms have appropriate labels.
- Navigation is accessible.
- Animations respect reduced-motion preferences.

---

# Performance

Prioritize performance.

Use:

- Optimized images.
- Appropriate image sizes.
- Lazy loading where appropriate.
- Efficient React rendering.
- Minimal client-side JavaScript where possible.

Avoid unnecessary:

- dependencies
- JavaScript
- animations
- network requests
- duplicated data

Do not sacrifice performance for purely decorative effects.

---

# Image Guidelines

Photography is an important part of Ankahi's visual identity.

Prefer large, high-quality theatrical photography where available.

Images should support storytelling rather than simply filling empty space.

Avoid using generic stock imagery when authentic Ankahi photography is available.

When using placeholder images during development, make it clear that they are placeholders and do not create fake production information.

---

# Product & UX Principles

Prioritize:

1. Clarity.
2. Strong visual hierarchy.
3. Storytelling.
4. Ease of navigation.
5. Discoverability.
6. Accessibility.
7. Performance.
8. Visual identity.

Do not add a feature merely because it is technically interesting.

Every interaction should have a clear user benefit.

---

# Homepage Principles

The homepage should quickly communicate:

1. What Ankahi is.
2. Why the visitor should care.
3. What Ankahi is currently doing.
4. What Ankahi has created in the past.
5. How the visitor can get involved.

The most important content should appear prominently.

The homepage should not become an endless collection of unrelated sections.

---

# Implementation Workflow

For every non-trivial feature:

## Step 1 — Understand

Understand the requested feature and its purpose.

## Step 2 — Inspect

Inspect the existing implementation before changing anything.

Identify:

- Relevant files.
- Existing components.
- Existing data structures.
- Existing styling.
- Existing dependencies.
- Potential side effects.

## Step 3 — Plan

Before coding, provide a concise implementation plan.

The plan should mention:

- Components to reuse.
- Components to create.
- Files likely to change.
- Data changes required.
- Potential risks.

## Step 4 — Implement

Implement the smallest reasonable change.

Do not unnecessarily modify unrelated parts of the project.

## Step 5 — Verify

After implementation, check for:

- TypeScript errors.
- Broken imports.
- Build errors.
- Broken routes.
- Responsive issues.
- Accessibility issues.
- Inconsistent styling.
- Unintended regressions.

## Step 6 — Report

After completing the task, briefly report:

- What changed.
- Which files changed.
- What was tested.
- Any remaining issues.
- Any assumptions made.

---

# Change Management

When asked to modify one section or component:

Modify only what is necessary.

For example:

If asked to modify the Productions section:

DO NOT unnecessarily modify:

- Navbar.
- Hero.
- Footer.
- Global typography.
- Routing.
- Database architecture.
- Unrelated components.

Preserve existing functionality unless the requested change requires otherwise.

---

# Ambiguity

If a requirement is ambiguous:

- Identify the ambiguity.
- Determine whether it materially affects architecture, UX, or design.
- If it does, state the assumption before implementing.
- If it does not, make a sensible assumption and proceed.

Do not stop unnecessarily for minor ambiguities.

---

# Important Rule

Do not treat every user request as permission to redesign the entire website.

The existing architecture, design system, and product decisions are persistent project constraints.

When modifying something, preserve everything that is not explicitly part of the requested change.

The goal is to build a cohesive, production-quality website for Ankahi over time—not a collection of disconnected AI-generated pages.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
