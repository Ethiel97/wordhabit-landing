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
- Styling is Tailwind-first. Keep visual rules in utility classes, factor repeated groups into small UI components, and reserve `assets/css/main.css` for Tailwind imports, design tokens, global base rules, and named animation keyframes.
- Repeated CTA behavior uses direct DOM scroll to `#hero-form` (see `AppNav.vue`, `PricingSection.vue`) instead of router navigation.
- Hero variant selection is cookie-driven (`useCookie('wh-hero')` in `HeroSection.vue`) for persistent A/B-style toggles.

## Integrations and External Dependencies
- `@nuxt/ui` is enabled in `nuxt.config.ts`; app-level UI color config is in `app/app.config.ts` (`primary: 'green'`).
- Fonts are loaded via Google Fonts links in `nuxt.config.ts` head config.
- Analytics: PostHog via `app/plugins/posthog.client.ts` (cookieless, disabled when `NUXT_PUBLIC_POSTHOG_KEY` is empty). Pages capture named events through `useAnalytics()` only — keep the vocabulary closed, no ad-hoc `capture` calls.

## Known Repository Anomalies (Verify Before Refactors)
- `nuxt.config.ts` references `./app/assets/css/main.css`, but stylesheet exists at `assets/css/main.css`.
- The OG image renderer intentionally uses inline styles because Takumi does not consume the browser Tailwind stylesheet.

## Agent Guardrails for This Repo
- Keep new work inside the existing section-based landing architecture unless asked to introduce routes/features.
- Reuse `useWaitlist()` for any new waitlist UI to preserve synchronized state across sections.
- Prefer existing Tailwind theme tokens and shared UI components over repeating long utility groups or introducing component-scoped CSS.
- If you change navigation labels/anchors, update both `AppNav.vue` labels and section `id` attributes together.
