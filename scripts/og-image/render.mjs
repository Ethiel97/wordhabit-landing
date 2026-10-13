// Renders template.html to the site's Open Graph image (1200x630 PNG).
//
//   node scripts/og-image/render.mjs [output]   (default public/og-image-v3.png)
//
// Needs Google Chrome (override the binary with CHROME_PATH) and network
// access for the Google Fonts the template loads. When the image changes,
// bump the file name and the meta in app/pages/index.vue and pro.vue so
// social caches fetch the new one.
import {execFileSync} from 'node:child_process'
import {mkdtempSync, realpathSync, rmSync} from 'node:fs'
import {createRequire} from 'node:module'
import {tmpdir} from 'node:os'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const output = resolve(root, process.argv[2] ?? 'public/og-image-v3.png')
const chrome = process.env.CHROME_PATH
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// sharp is not a direct dependency: it comes with @nuxt/image through ipx,
// and pnpm only links it next to ipx.
const nuxtImage = realpathSync(join(root, 'node_modules/@nuxt/image'))
const ipx = realpathSync(join(nuxtImage, '../../ipx'))
const sharp = createRequire(join(ipx, 'package.json'))('sharp')

const work = mkdtempSync(join(tmpdir(), 'og-image-'))
const screenshot = join(work, 'screenshot.png')

try {
  execFileSync(chrome, [
    '--headless=new',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    // Lets the web fonts and images load before the capture.
    '--virtual-time-budget=10000',
    `--user-data-dir=${join(work, 'profile')}`,
    `--screenshot=${screenshot}`,
    pathToFileURL(join(here, 'template.html')).href,
  ], {stdio: 'ignore'})

  const {width, height} = await sharp(screenshot).metadata()
  if (width !== 1200 || height !== 630) {
    throw new Error(`Expected a 1200x630 capture, got ${width}x${height}`)
  }

  // A palette PNG keeps the file near 100 KB; some link previews skip
  // large images.
  const {size} = await sharp(screenshot)
    .png({palette: true, quality: 95, effort: 10, compressionLevel: 9})
    .toFile(output)
  console.log(`${output} (${Math.round(size / 1024)} KB)`)
} finally {
  rmSync(work, {recursive: true, force: true})
}
