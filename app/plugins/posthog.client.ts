import posthog, {type PostHog} from 'posthog-js'

/**
 * Client-only PostHog bootstrap.
 *
 * Cookieless on purpose (`persistence: 'memory'`): nothing is stored on
 * the visitor's device, so no consent banner is needed. The cost is
 * returning-visitor dedup, which the funnel this exists for (page view
 * with UTM → store click) does not depend on — it lives inside one
 * session. UTM parameters are attached to events by posthog-js itself.
 *
 * Pageviews go through the router hook below, never posthog-js's own
 * capture_pageview: 'history_change' skips the initial load (verified
 * against production — the very visit a shared word link brings in),
 * and `true` skips SPA navigations. One code path captures both, and
 * cannot double-count.
 */
export default defineNuxtPlugin(() => {
  const {posthogKey, posthogHost} = useRuntimeConfig().public

  let client: PostHog | null = null
  if (posthogKey) {
    client = posthog.init(posthogKey, {
      api_host: posthogHost,
      persistence: 'memory',
      capture_pageview: false,
      capture_pageleave: true,
      // Named events only, same closed-vocabulary stance as the app.
      autocapture: false,
      disable_session_recording: true,
      debug: import.meta.dev,
    })

    const router = useRouter()
    router.afterEach((to) => {
      // nextTick so the URL posthog reads is the settled one.
      nextTick(() => {
        client?.capture('$pageview', {$current_url: window.location.href})
      })
    })
  }

  return {provide: {posthog: client}}
})
