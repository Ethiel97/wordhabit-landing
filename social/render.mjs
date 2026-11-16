// Run from the repo root: node social/render.mjs [week-02]
// (default: the latest social/weeks/week-NN.json).
//
// Renders every slide of a week to a 1080x1350 PNG with headless Chrome in
// public/social/en/<week>/ (served at wordhabit.app/social/en/<week>/), then
// writes social/weeks/<week>.schedule.json: for each post its publish time,
// image URLs with alt text, caption and link. Publishers read only that file.
// Never publishes anything.
//
// The week is refused when its copy breaks a rule of social/GUIDE.md that a
// script can check, when a slide's text overflows, or when the fonts did not
// load. CHROME overrides the browser path.
import { execFile } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)
const root = resolve(import.meta.dirname, '..')
const social = join(root, 'social')
const weeksDir = join(social, 'weeks')
const publicBase = 'https://wordhabit.app/social/en'
const chrome =
  process.env.CHROME ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const pitch = '📲 Enrichis ton anglais, un mot par jour, avec Wordhabit.'
const poses = ['idle', 'curious', 'pleased', 'celebrate']

const required = {
  cover: ['kicker', 'title', 'subtitle'],
  fix: ['label', 'wrong', 'right', 'note'],
  phrase: ['phrase', 'meaning', 'example', 'translation'],
  falsefriend: ['word', 'notWord', 'meaning', 'trap', 'example', 'translation'],
  prompt: ['kicker', 'title', 'body', 'footer'],
  quiz: ['kicker', 'question', 'footer'],
  word: [
    'kicker',
    'word',
    'phonetic',
    'pos',
    'meaning',
    'example',
    'translation',
    'trap',
    'prompt',
  ],
  cta: [],
}

// The /app/* route of this site sends Android to Play (utm_source in the
// install referrer, utm_content = app_link/fb/<slug>), iPhone to the App
// Store and desktops home; with the app installed, the app opens instead.
const link = (slug) =>
  `https://wordhabit.app/app/fb/${slug}?utm_source=facebook`

// `caption` puts the tappable link in the post; `page` sends readers to the
// page's own link, the fallback if Meta limits link posts for the page.
function cta(placement, slug) {
  if (placement === 'caption') return `${pitch} C’est gratuit 👉 ${link(slug)}`
  if (placement === 'page') {
    return `${pitch} C’est gratuit : le lien est sur notre page.`
  }
  throw new Error(`linkPlacement is caption or page, not ${placement}`)
}

const plain = (text) => String(text).replace(/[*~]/g, '').replace(/\n/g, ' ')

const describe = {
  cover: (s) => `${s.title}. ${s.subtitle}`,
  fix: (s) => `Faux : ${s.wrong} Correct : ${s.right} ${s.note}`,
  phrase: (s) => `${s.phrase} Le sens : ${s.meaning} Exemple : ${s.example}`,
  falsefriend: (s) =>
    `${s.word}, à ne pas confondre avec ${s.notWord}. Le vrai sens : ` +
    `${s.meaning} ${s.trap} Exemple : ${s.example}`,
  prompt: (s) => `${s.title} ${s.body}`,
  quiz: (s) =>
    `${s.question} A. ${s.options[0]} B. ${s.options[1]} C. ${s.options[2]}`,
  word: (s) =>
    `${s.word} ${s.phonetic}, ${s.pos}. ${s.meaning} Exemple : ` +
    `${s.example} ${s.trap}`,
  cta: () =>
    'Ara, la mascotte de Wordhabit. Un mot par jour. Appris en profondeur. ' +
    'Retenu pour la vie. Gratuit sur Android et iPhone. wordhabit.app',
}

const pad = (n) => String(n).padStart(2, '0')
const weekFiles = () =>
  readdirSync(weeksDir)
    .filter((file) => /^week-\d{2}\.json$/.test(file))
    .sort()

function validate(week, raw, data) {
  const errors = []
  const fail = (message) => errors.push(message)
  if (raw.includes('—')) fail('no em dashes in the copy')
  if (raw.includes('WordHabit')) fail('the brand is written Wordhabit')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.startDate ?? '')) {
    fail('startDate must be YYYY-MM-DD')
  }
  if (!/^\d{2}:\d{2}$/.test(data.publishTimeUtc ?? '')) {
    fail('publishTimeUtc must be HH:MM')
  }
  if (!['caption', 'page'].includes(data.linkPlacement)) {
    fail('linkPlacement must be caption or page')
  }
  const posts = data.posts ?? []
  const days = posts.map((post) => post.day).sort((a, b) => a - b)
  if (days.join() !== '1,2,3,4,5,6,7') fail('a week has days 1 to 7, once each')

  const earlier = new Set(
    weekFiles()
      .filter((file) => file !== `${week}.json`)
      .flatMap((file) =>
        JSON.parse(readFileSync(join(weeksDir, file), 'utf8')).posts.map(
          (post) => post.slug,
        ),
      ),
  )
  const slugs = new Set()
  for (const post of posts) {
    const slug = post.slug
    if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
      fail(`invalid slug: ${slug}`)
    } else if (slugs.has(slug)) {
      fail(`${slug}: used twice this week`)
    } else if (earlier.has(slug)) {
      fail(`${slug}: already used in an earlier week`)
    }
    slugs.add(slug)
    for (const key of ['series', 'caption', 'hashtags']) {
      if (typeof post[key] !== 'string' || !post[key].trim()) {
        fail(`${slug}: missing ${key}`)
      }
    }
    if (/https?:\/\//.test(post.caption ?? '')) {
      fail(`${slug}: the caption gets its link from the script`)
    }
    const slides = post.slides ?? []
    if (slides.length === 0) fail(`${slug}: no slides`)
    if (slides.length > 1 && slides.at(-1).type !== 'cta') {
      fail(`${slug}: a carousel ends with the cta slide`)
    }
    const hasQuiz = slides.some((slide) => slide.type === 'quiz')
    if (hasQuiz && post.day === 7) {
      fail(`${slug}: day 7 cannot be a quiz, its answer would never be posted`)
    }
    if (hasQuiz && typeof post.answer !== 'string') {
      fail(`${slug}: a quiz needs an answer`)
    }
    for (const slide of slides) {
      const fields = required[slide.type]
      if (!fields) {
        fail(`${slug}: unknown slide type ${slide.type}`)
        continue
      }
      for (const key of fields) {
        if (typeof slide[key] !== 'string' || !slide[key].trim()) {
          fail(`${slug}: ${slide.type} needs ${key}`)
        }
      }
      if (slide.type === 'quiz' && slide.options?.length !== 3) {
        fail(`${slug}: a quiz has 3 options`)
      }
      if (slide.ara && !poses.includes(slide.ara)) {
        fail(`${slug}: Ara has no pose ${slide.ara} (${poses.join(', ')})`)
      }
    }
  }
  if (errors.length) {
    throw new Error(`${week} refused:\n- ${errors.join('\n- ')}`)
  }
}

const flags = [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--allow-file-access-from-files',
  '--force-device-scale-factor=1',
  '--window-size=1080,1350',
  '--virtual-time-budget=10000',
]

// One pass reads the laid-out DOM (fonts, overflow), the other takes the PNG.
async function shoot(url, png) {
  const { stdout } = await run(chrome, [...flags, '--dump-dom', url], {
    maxBuffer: 1 << 24,
  })
  const name = relative(root, png)
  if (!stdout.includes('data-ready="1"')) {
    throw new Error(`${name}: the slide never finished its layout`)
  }
  if (!stdout.includes('data-fonts="ok"')) {
    throw new Error(`${name}: Fraunces or Plus Jakarta Sans did not load`)
  }
  if (/class="slide [a-z]+ overflow"/.test(stdout)) {
    throw new Error(`${name}: the text does not fit the slide`)
  }
  await run(chrome, [...flags, `--screenshot=${png}`, url])
  if (!existsSync(png)) throw new Error(`${name}: Chrome wrote no PNG`)
}

async function inBatches(jobs, size) {
  const errors = []
  for (let i = 0; i < jobs.length; i += size) {
    const results = await Promise.allSettled(
      jobs.slice(i, i + size).map((job) => job()),
    )
    for (const result of results) {
      if (result.status === 'rejected') errors.push(result.reason.message)
    }
  }
  if (errors.length) throw new Error(`rendering failed:\n- ${errors.join('\n- ')}`)
}

function contactSheet(week, entries, folder) {
  const images = entries.flatMap((post) =>
    post.images.map(
      (image) =>
        `<img src="../../../public/social/en/${week}/${image.url.split(`/${week}/`)[1]}">`,
    ),
  )
  const columns = 6
  const rows = Math.ceil(images.length / columns)
  writeFileSync(
    join(folder, 'sheet.html'),
    `<!doctype html><body style="margin:0;background:#777;display:flex;flex-wrap:wrap;gap:6px;width:${columns * 306}px">` +
      images.map((img) => img.replace('<img', '<img width="300"')).join('') +
      '</body>',
  )
  const review = entries
    .map(
      (post) =>
        `<section><h2>Jour ${post.day} · ${post.publishAt}</h2><div class="row">` +
        post.images
          .map((image) => `<img src="../../../public/social/en/${week}/${image.url.split(`/${week}/`)[1]}" title="${image.alt.replace(/"/g, '&quot;')}">`)
          .join('') +
        `</div><pre>${post.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre></section>`,
    )
    .join('')
  writeFileSync(
    join(folder, 'review.html'),
    `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Wordhabit Facebook, ${week}</title>` +
      '<style>body{font:15px/1.5 -apple-system,sans-serif;margin:32px;background:#f4f4f2;color:#101828}' +
      'section{background:#fff;border-radius:16px;padding:24px;margin-bottom:28px}' +
      '.row{display:flex;gap:12px;overflow-x:auto}.row img{width:270px;border-radius:8px;border:1px solid #e5e5e5}' +
      `pre{white-space:pre-wrap;background:#f8f8f6;padding:14px;border-radius:8px}</style><h1>Wordhabit Facebook, ${week}</h1>${review}</html>`,
  )
  return run(chrome, [
    ...flags.filter((flag) => !flag.startsWith('--window-size')),
    `--window-size=${columns * 306},${rows * 381}`,
    `--screenshot=${join(folder, 'sheet.png')}`,
    pathToFileURL(join(folder, 'sheet.html')).href,
  ])
}

async function main() {
  const week = process.argv[2] ?? weekFiles().at(-1)?.replace('.json', '')
  if (!week) throw new Error('no week in social/weeks')
  const raw = readFileSync(join(weeksDir, `${week}.json`), 'utf8')
  const data = JSON.parse(raw)
  validate(week, raw, data)

  writeFileSync(
    join(social, 'data.js'),
    `window.POSTS = ${JSON.stringify(data.posts)};\n`,
  )
  const out = join(root, 'public', 'social', 'en', week)
  rmSync(out, { recursive: true, force: true })
  const template = pathToFileURL(join(social, 'template.html')).href
  const start = Date.parse(`${data.startDate}T${data.publishTimeUtc}:00Z`)

  const jobs = []
  const entries = []
  let previousAnswer
  for (const post of [...data.posts].sort((a, b) => a.day - b.day)) {
    const folder = `${pad(post.day)}-${post.slug}`
    mkdirSync(join(out, folder), { recursive: true })
    const images = post.slides.map((slide, i) => {
      const png = join(out, folder, `${pad(i + 1)}.png`)
      jobs.push(() => shoot(`${template}#${post.slug}/${i + 1}`, png))
      return {
        url: `${publicBase}/${week}/${folder}/${pad(i + 1)}.png`,
        alt: `Wordhabit, image ${i + 1} sur ${post.slides.length}. ${plain(describe[slide.type](slide))}`,
      }
    })
    entries.push({
      day: post.day,
      slug: post.slug,
      publishAt: new Date(start + (post.day - 1) * 86_400_000).toISOString(),
      images,
      caption: [
        previousAnswer && `✅ ${previousAnswer}`,
        post.caption,
        cta(data.linkPlacement, post.slug),
        post.hashtags,
      ]
        .filter(Boolean)
        .join('\n\n'),
      link: link(post.slug),
    })
    previousAnswer = post.answer
  }

  await inBatches(jobs, 4)
  writeFileSync(
    join(weeksDir, `${week}.schedule.json`),
    `${JSON.stringify({ week: data.week, campaign: data.campaign, posts: entries }, null, 2)}\n`,
  )
  const review = join(social, '.out', week)
  mkdirSync(review, { recursive: true })
  await contactSheet(week, entries, review)
  console.log(
    `${week}: ${jobs.length} slides, ${entries.length} posts\n` +
      `  images   ${relative(root, out)}/\n` +
      `  schedule social/weeks/${week}.schedule.json\n` +
      `  review   ${relative(root, review)}/review.html and sheet.png`,
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
