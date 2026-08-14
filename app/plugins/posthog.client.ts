import posthog, {type PostHog} from 'posthog-js'

/**
 * Client-only PostHog bootstrap.
 *
 * Cookieless on purpose (`persistence: 'memory'`): nothing is stored on
 * the visitor's device, so no consent banner is needed. The cost is
 * returning-visitor dedup, which the funnel this exists for (page view
 * with UTM → store click) does not depend on — it lives inside one
 * session. UTM parameters are attached to events by posthog-js itself.
 */
export default defineNuxtPlugin(() => {
  const {posthogKey, posthogHost} = useRuntimeConfig().public

  let client: PostHog | null = null
  if (posthogKey) {
    client = posthog.init(posthogKey, {
      api_host: posthogHost,
      persistence: 'memory',
      // SPA navigations count as pageviews, not just the first load.
      capture_pageview: 'history_change',
      capture_pageleave: true,
      // Named events only, same closed-vocabulary stance as the app.
      autocapture: false,
      disable_session_recording: true,
    })
  }

  return {provide: {posthog: client}}
})
