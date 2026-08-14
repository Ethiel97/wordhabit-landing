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

  function trackStoreClick(
    store: StoreName,
    context: StoreClickContext,
    wordId?: string,
  ) {
    client?.capture('store link clicked', {
      store,
      context,
      ...(wordId ? {word_id: wordId} : {}),
    })
  }

  return {trackStoreClick}
}
