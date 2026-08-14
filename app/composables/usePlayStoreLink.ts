/**
 * Play Store URL carrying an install `referrer`.
 *
 * Google Play hands this string back to the app through the Install
 * Referrer API, which is the only way an Android install can be tied to
 * what caused it. Without it a visit is measurable and the install that
 * follows is not, so the funnel stops exactly where it matters.
 *
 * The incoming campaign wins over our own labels: someone who reaches a
 * shared word page from TikTok should install as `tiktok`, not as
 * `shared_word`. Our labels only fill the gaps.
 */
export function usePlayStoreLink(
  context: 'landing' | 'word_page',
  wordId?: Ref<string | undefined> | string,
) {
  const config = useRuntimeConfig()
  const route = useRoute()

  return computed(() => {
    const base = config.public.playStoreUrl
    if (!base) return ''

    const incoming = (key: string) => {
      const value = route.query[key]
      const first = Array.isArray(value) ? value[0] : value
      return typeof first === 'string' && first.trim() ? first.trim() : undefined
    }

    const referrer = new URLSearchParams()
    referrer.set('utm_source', incoming('utm_source')
      ?? (context === 'word_page' ? 'shared_word' : 'landing'))
    referrer.set('utm_medium', incoming('utm_medium') ?? 'web')

    const campaign = incoming('utm_campaign')
    if (campaign) referrer.set('utm_campaign', campaign)

    // Which surface sent the install, kept even when the campaign above
    // came from outside: the two answer different questions.
    referrer.set('utm_content', context)

    const id = unref(wordId)
    if (id) referrer.set('wid', id)

    const separator = base.includes('?') ? '&' : '?'
    return `${base}${separator}referrer=${encodeURIComponent(referrer.toString())}`
  })
}
