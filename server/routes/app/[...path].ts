/**
 * Where an /app/* link lands on a phone without the app.
 *
 * Neither platform sends a tapped link to a store by itself: without
 * the app, the OS opens the URL in the browser and the site answers.
 * This answers with the store the phone installs from, the campaign
 * parameters carried into Play's install referrer the way the badges
 * carry them. Desktops go home.
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const userAgent = getRequestHeader(event, 'user-agent') ?? ''
  const query = getQuery(event)
  const path = (getRouterParam(event, 'path') ?? '').replace(/[^\w/-]+/g, '')

  const incoming = (key: string): string | undefined => {
    const value = query[key]
    const first = Array.isArray(value) ? value[0] : value
    return typeof first === 'string' && first.trim() ? first.trim() : undefined
  }

  // A redirect chosen by user agent must not be cached for the next visitor.
  setHeader(event, 'cache-control', 'no-store')

  if (/android/i.test(userAgent)) {
    const referrer = new URLSearchParams()
    referrer.set('utm_source', incoming('utm_source') ?? 'app_link')
    referrer.set('utm_medium', incoming('utm_medium') ?? 'web')
    const campaign = incoming('utm_campaign')
    if (campaign) referrer.set('utm_campaign', campaign)
    referrer.set('utm_content', `app_link/${path}`)

    const base = config.public.playStoreUrl
    const separator = base.includes('?') ? '&' : '?'
    return sendRedirect(event, `${base}${separator}referrer=${encodeURIComponent(referrer.toString())}`, 302)
  }

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return sendRedirect(event, config.public.appStoreUrl, 302)
  }

  return sendRedirect(event, '/', 302)
})
