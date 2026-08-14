import type {PostHog} from 'posthog-js'

type StoreName = 'play_store' | 'app_store'
type StoreClickContext = 'word_page' | 'landing'

/**
 * The site's analytics vocabulary, kept closed like the app's: pages
 * call these named helpers instead of capturing arbitrary events.
 * No-ops when PostHog is disabled (empty key).
 */
export function useAnalytics() {
  const {$posthog} = useNuxtApp()
  const client = $posthog as PostHog | null

  /**
   * `variant` carries the hero headline in play. Nothing randomizes it
   * today, so every row reads the same value: it is here so switching
   * the cookie to random is a one-line change with the measurement
   * already in place.
   */
  function trackStoreClick(
    store: StoreName,
    context: StoreClickContext,
    wordId?: string,
    variant?: string,
  ) {
    client?.capture('store link clicked', {
      store,
      context,
      ...(wordId ? {word_id: wordId} : {}),
      ...(variant ? {hero_variant: variant} : {}),
    })
  }

  function trackIosNotifySubmitted() {
    client?.capture('ios notify submitted')
  }

  return {trackStoreClick, trackIosNotifySubmitted}
}
