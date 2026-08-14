const SITE = 'https://wordhabit.app'

/**
 * Static pages only.
 *
 * The /words/:id pages are the long-tail SEO value, but listing them
 * needs a public index the API does not expose yet: /vocabulary/words
 * requires authentication. Until it does, those pages are discovered
 * through the links people share, which is how they already get
 * crawled. Add them here the day an unauthenticated index exists.
 *
 * i18n runs with `no_prefix`, so each page has exactly one URL and the
 * locale is negotiated per visitor: no alternates to declare.
 */
const PAGES: {path: string; priority: string; changefreq: string}[] = [
  {path: '/', priority: '1.0', changefreq: 'weekly'},
  {path: '/support', priority: '0.5', changefreq: 'monthly'},
  {path: '/privacy', priority: '0.3', changefreq: 'yearly'},
  {path: '/terms', priority: '0.3', changefreq: 'yearly'},
  {path: '/delete-account', priority: '0.3', changefreq: 'yearly'},
]

export default defineEventHandler((event) => {
  const urls = PAGES.map(({path, priority, changefreq}) => `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
