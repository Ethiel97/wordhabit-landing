# AGENTS.md

## Project at a Glance
- Nuxt 4 marketing/landing site with one assembled page (`app/pages/index.vue`) and section components in `app/components/landing`.
- App shell is minimal: `app/app.vue` renders only `<NuxtPage />`.
- Primary UI stack: Nuxt + Vue SFCs (`<script setup lang="ts">`) + `@nuxt/ui` + Tailwind v4-style CSS imports.
- There is no backend/API integration in this repo; waitlist behavior is currently local UI state.

## Architecture and Data Flow
- `app/pages/index.vue` composes sections in order: nav -> hero -> features -> how-it-works -> pricing -> FAQ -> CTA -> footer.
- Shared waitlist state lives in `app/composables/useWaitlist.ts` using `useState('waitlist-email')` and `useState('waitlist-joined')`.
- `app/components/landing/WaitlistForm.vue` is the only mutation point (`submit`) and validates email with a regex before updating state.
- Multiple sections reuse this shared state (`HeroSection.vue`, `FinalCta.vue`), so one submit updates all form instances.
- Anchor navigation pattern: link labels are converted to ids (`AppNav.vue::anchorId`) and sections expose matching ids (`features`, `how-it-works`, `pricing`, `faq`).

## Critical Workflows
- Package manager is pnpm (`pnpm-lock.yaml` present).
- Install deps:
```bash
pnpm install
```
- Start local dev server:
```bash
pnpm dev
```
- Production build / static generation / preview:
```bash
pnpm build
pnpm generate
pnpm preview
```
- No test runner or lint script is defined in `package.json`; rely on Nuxt build/dev validation unless new scripts are added.

## Codebase-Specific Conventions
- Components are auto-imported via `nuxt.config.ts` with `pathPrefix: false`; use PascalCase tags directly (example: `<HeroSection />`, `<AppLogo />`).
- Styling is mostly component-scoped CSS blocks plus shared token classes from `assets/css/main.css` (`.display`, `.pill`, button primitives).
- Repeated CTA behavior uses direct DOM scroll to `#hero-form` (see `AppNav.vue`, `PricingSection.vue`) instead of router navigation.
- Hero variant selection is cookie-driven (`useCookie('wh-hero')` in `HeroSection.vue`) for persistent A/B-style toggles.

## Integrations and External Dependencies
- `@nuxt/ui` is enabled in `nuxt.config.ts`; app-level UI color config is in `app/app.config.ts` (`primary: 'green'`).
- Fonts are loaded via Google Fonts links in `nuxt.config.ts` head config.
- No analytics, API clients, server routes, or external state stores are currently wired.

## Known Repository Anomalies (Verify Before Refactors)
- `nuxt.config.ts` references `./app/assets/css/main.css`, but stylesheet exists at `assets/css/main.css`.
- Several SFCs are exactly 100 lines and appear truncated mid-style block (`HeroSection.vue`, `PricingSection.vue`, others). Confirm file completeness before editing large style regions.
- `app/components/landing/PhoneMock.vue` currently duplicates hero layout logic; validate intended responsibility before using it as a reusable phone mock.

## Agent Guardrails for This Repo
- Keep new work inside the existing section-based landing architecture unless asked to introduce routes/features.
- Reuse `useWaitlist()` for any new waitlist UI to preserve synchronized state across sections.
- Prefer updating existing design tokens/classes in `assets/css/main.css` over introducing parallel style systems.
- If you change navigation labels/anchors, update both `AppNav.vue` labels and section `id` attributes together.
