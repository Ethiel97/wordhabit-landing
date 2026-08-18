import type {PostHog} from 'posthog-js'

type StoreName = 'play_store' | 'app_store'
type StoreClickContext = 'word_page' | 'landing'
type StoreClickPlacement = 'inline' | 'sticky'

/**
 * The site's analytics vocabulary, kept closed like the app's: pages
 * call these named helpers instead of capturing arbitrary events.
 * No-ops when PostHog is disabled (empty key).
 */
export function useAnalytics() {
  const {$posthog} = useNuxtApp()
  const client = $posthog as PostHog | null

  /**
   * `variant` carries the hero headline in play. Every landing store CTA
   * reports it, not only the badge rendered inside the hero, so the complete
   * conversion funnel can be compared once variants are randomized.
   */
  function trackStoreClick(
    store: StoreName,
    context: StoreClickContext,
    wordId?: string,
    variant?: string,
    placement: StoreClickPlacement = 'inline',
  ) {
    client?.capture('store link clicked', {
      store,
      context,
      placement,
      ...(wordId ? {word_id: wordId} : {}),
      ...(variant ? {hero_variant: variant} : {}),
    })
  }

  function trackIosNotifySubmitted() {
    client?.capture('ios notify submitted')
  }

  return {trackStoreClick, trackIosNotifySubmitted}
}
