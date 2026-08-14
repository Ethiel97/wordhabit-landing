# Wordhabit Landing

**Wordhabit** is a vocabulary learning platform focused on building a daily word-learning habit through spaced repetition, flashcards, and gamification.

This repository contains the Nuxt 4 marketing/landing app plus server API proxy routes for waitlist actions.

## Tech Stack
- Nuxt 4 (`nuxt`)
- Vue 3 + TypeScript (`<script setup lang="ts">`)
- `@nuxt/ui`
- Tailwind CSS (via CSS imports in `assets/css/main.css`)
- pnpm

## Project Structure
- `app/pages/index.vue` - single assembled landing page (section-by-section composition)
- `app/components/landing/` - page sections and shared landing UI pieces
- `app/composables/useWaitlist.ts` - shared waitlist state + client calls to internal API
- `server/api/waitlist.get.ts` - cached proxy for waitlist count
- `server/api/waitlist.post.ts` - validated waitlist join endpoint (Zod + upstream proxy)
- `assets/css/main.css` - global design tokens and shared utility classes
- `nuxt.config.ts` - modules, global CSS, app head meta, runtime config

## Prerequisites
- Node.js 20+
- pnpm 9+

## Environment Variables
Create a `.env` file in project root:

```dotenv
NUXT_API_URL=http://localhost:4000/api
# Optional (present in runtimeConfig)
POLAR_ACCESS_TOKEN=
# PostHog web analytics — same project as the mobile app.
# Empty or absent disables analytics entirely.
NUXT_PUBLIC_POSTHOG_KEY=
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

`NUXT_API_URL` is used server-side in `useRuntimeConfig().apiUrl` for forwarding waitlist requests.

## Local Development
```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:3000` by default.

## Build and Preview
```bash
pnpm build
pnpm generate
pnpm preview
```

## Waitlist API Contract (Internal)
### `GET /api/waitlist`
Returns cached waitlist count from upstream API (`maxAge: 5 minutes`, `swr: true`).

Example response:
```json
{ "success": true, "count": 123 }
```

### `POST /api/waitlist`
Accepts:
```json
{ "email": "you@example.com" }
```

Behavior:
- Validates email with Zod
- Proxies to `${apiUrl}/waitlist`
- Maps upstream errors to client-safe errors (`409` duplicate, `502` upstream failure)

## Notes
- Components are auto-imported (`pathPrefix: false`), so landing components are used as PascalCase tags without manual imports.
- Section anchors are coupled between `AppNav.vue` link labels and section `id` values (`features`, `how-it-works`, `pricing`, `faq`).
- Several landing SFC files appear truncated in the current repo snapshot (some end at exactly 100 lines); verify completeness before large UI refactors.

