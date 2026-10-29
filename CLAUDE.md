# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Gabriel Agüero (deployed at https://devgaby.dev). Single-page static site built with Astro 5 + Tailwind CSS v4. All user-facing copy is in Spanish (`<html lang="es">`); keep new content in Spanish.

## Commands

```sh
npm run dev       # dev server at localhost:4321
npm run build     # static build to ./dist/
npm run preview   # serve the built site
npm run astro -- check   # type-check .astro files (needs @astrojs/check)
```

There is no test suite and no lint script. `.eslintrc` and `.prettierrc` (with `prettier-plugin-astro`) exist, but ESLint itself is not installed as a dependency. Both `package-lock.json` (tracked) and `pnpm-lock.yaml` (untracked) are present — npm is the committed package manager.

## Architecture

- `src/pages/index.astro` is the only page. It composes the site from `src/sections/` (Header, Hero, Contacto, Footer) plus `src/components/TechStack.astro` and `src/components/Projects.astro`, all wrapped in `src/layouts/Layout.astro`. Sections must not render their own `<Layout>` (that would nest a second `<html>` document).
- `Layout.astro` holds all SEO/Open Graph/Twitter meta, imports `src/styles/global.css`, and renders `BackgroundParticles` behind a `z-10` content wrapper.
- `src/sections/` = page-level blocks with anchor `id`s used by the header nav (e.g. `#proyectos`); `src/components/` = reusable pieces; `src/icons/` = one inline-SVG `.astro` component per icon, which accept props (spread `{...Astro.props}`) so callers pass `class`.
- Import alias `@/*` → `src/*` (tsconfig, strict Astro preset).

### Projects data

Project entries are defined **inline as a TS array in `src/components/Projects.astro`**. Each entry is passed to `ProjectsCard.astro`, whose exported `Props` interface is the source of truth: `accentColor` must be one of `'blue' | 'teal' | 'red' | 'purple'` (mapped to full Tailwind class strings inside the card — keep them as literal strings so Tailwind detects them), and tags carry an icon component plus a Tailwind text-color class. Preview images live in `public/images/` as `.webp`.

Cards flip front/back via buttons marked `data-flip`; the card's script toggles `is-flipped` and sets `inert` on whichever face is hidden.

### Styling

- Tailwind v4 via `@tailwindcss/vite` (configured in `astro.config.mjs`, no `tailwind.config.js`). Animation utilities (`animate-*`, `timeline-view`, `animate-range-*`) come from `@plugin "@midudev/tailwind-animations"` in `global.css`.
- Scroll-driven reveals (Contacto) only start hidden inside `supports-[animation-timeline:view()]:`, so browsers without `animation-timeline` still show the content. `global.css` also has a global `prefers-reduced-motion` override.
- Custom "space mono" font is self-hosted from `public/fonts/` via `@font-face` in `global.css` (applied to `h1`).
- Dark-only design (`theme-color #0f172a`, dark backgrounds); there is no theme toggle.

### Client-side behavior

Interactivity is plain `<script>` tags inside `.astro` files (no UI framework islands):
- `Header.astro`: scroll-based header background and mobile menu toggle.
- `Contacto.astro`: contact form sent via `@emailjs/browser` (public key, service and template IDs are hardcoded in the script).
- `ProjectsCard.astro`: card flip (see above).

The social preview image is `public/og-image.jpg` (1200×630), referenced with an absolute URL in `Layout.astro`.
