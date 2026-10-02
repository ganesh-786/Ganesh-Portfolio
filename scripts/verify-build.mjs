#!/usr/bin/env node
/**
 * Checks the finished static export (./out) before it can reach GitHub Pages.
 *
 * `next build` proves the code compiles. It does not prove the result is still a healthy
 * website: a deleted CV, a weakened Content-Security-Policy, a broken in-page link, a page
 * that quietly asks search engines to go away or a bundle that doubled in size all build fine.
 * This script reads the output files and fails loudly when one of those has slipped through.
 *
 * Node only, no dependencies.
 *   npm run build && node scripts/verify-build.mjs [outDir]
 *
 * Every check states what it found. If a failure is intentional (a new third-party host in
 * the CSP, a bigger bundle after a real feature), change the constants below in the same
 * pull request, so the decision is visible in review.
 */
import { appendFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import { gzipSync } from 'node:zlib'

const ORIGIN = 'https://ganeshtharu.com.np'
const DOMAIN = 'ganeshtharu.com.np'

// The only third-party hosts the Content-Security-Policy may name.
const ALLOWED_CSP_HOSTS = ['https://api.web3forms.com']

// Where the contact form posts. The page bundle has to contain exactly this address.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'

// About 15 percent above the build measured on 2026-09-20 with Next 16.3.5, in bytes. The JavaScript
// numbers are the same on a Windows laptop and on the CI runner (Linux, Node 22), because Turbopack
// output does not depend on the machine. Next 16 ships a larger client runtime than Next 15 (about
// 29 kB more gzipped up front, 124,612 before) and loads no lazy chunks, so it has less JavaScript in
// total but more of it up front.
//
// The limits were left where they were when the project pages arrived on 2026-10-02. That build
// measures 657,893 of JavaScript, about 155,800 gzipped up front and 39,823 of CSS, so the room
// left is smaller than 15 percent now, on purpose: the next feature has to earn its bytes.
const BUDGET = {
  totalJs: 733_000, // all JavaScript under _next/static, measured 637,629 (Next 15 had 874,185)
  initialJsGzip: 176_000, // JavaScript the home page loads up front, gzipped, measured 153,270
  css: 43_000, // all CSS, measured 37,545
  anyFile: 500_000, // any published file that is not JavaScript or a PDF, largest today 185,185 (index.html)
  pdf: 2_000_000, // a CV heavier than this is nearly always an uncompressed image, today 164,163 (the one-page September resume)
}

// Sections the navigation links to (NAV_ITEMS and CONTACT_CTA in lib/constants.ts) plus the skip
// link and back-to-top targets. Case study pages link to them as "/#work", so a renamed section
// would leave links on other pages that land at the top of the home page without a word.
const SECTION_IDS = [
  'main', 'top', 'work', 'services', 'questions', 'about', 'experience', 'skills', 'education', 'contact',
]

const REQUIRED_FILES = [
  'index.html',
  '404.html',
  'resume.html',
  'projects.html',
  'CNAME',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  'favicon.ico',
  'icon.svg',
  'apple-icon.png',
  'og-image.png',
  '_next/static',
]

// High-confidence token formats only. The Web3Forms access key is public by design and is
// a plain UUID, so it does not match any of these.
const SECRET_PATTERNS = [
  ['private key block', /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/],
  ['AWS access key id', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b/],
  ['Slack token', /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/],
  ['Stripe live key', /\b[rs]k_live_[A-Za-z0-9]{20,}\b/],
  ['npm token', /\bnpm_[A-Za-z0-9]{36}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
]

// Leftovers that mean a template or a test value reached the page. Each pattern is narrow on
// purpose: prose about localhost or a TEMP sensor is legitimate in a developer portfolio.
const LEFTOVER_PATTERNS = [
  ['link to a localhost address', /https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)\b/i],
  ['TODO or FIXME marker', /\b(?:TODO|FIXME)\s*[:(]/],
  ['TEMP_ placeholder token', /\bTEMP_[A-Z_]+\b/],
  ['lorem ipsum', /lorem ipsum/i],
  ['unfilled YOUR_ token', /\bYOUR_[A-Z_]+\b/],
  ['stringified object', /\[object Object\]/],
  ['"undefined" or "null" attribute', /="(?:undefined|null)"/],
]

const FORBIDDEN_FILE = /(?:\.(?:map|log|bak|orig|swp|tsbuildinfo)|(?:^|\/)\.env[^/]*|(?:^|\/)\.DS_Store|(?:^|\/)node_modules(?:\/|$)|(?:^|\/)\.git(?:\/|$))$/i

const outDir = resolve(process.argv[2] ?? 'out')
if (!existsSync(join(outDir, 'index.html'))) {
  console.error(`verify-build: no build found at ${outDir}. Run "npm run build" first.`)
  process.exit(2)
}

// ---------------------------------------------------------------- helpers

const results = []
const pass = (note = '') => ({ ok: true, note })
const fail = (problem) => ({ ok: false, problem })
const expect = (condition, problem, note) => (condition ? pass(note) : fail(problem))

function check(group, name, test) {
  let outcome
  try {
    outcome = test()
  } catch (error) {
    outcome = fail(`could not run: ${error.message}`)
  }
  if (!outcome || typeof outcome.ok !== 'boolean') outcome = fail('check reported no result')
  results.push({ group, name, ...outcome })
}

const abs = (rel) => join(outDir, rel)
const exists = (rel) => existsSync(abs(rel))
const readBytes = (rel) => {
  if (!exists(rel)) throw new Error(`${rel} is missing`)
  return readFileSync(abs(rel))
}
const readText = (rel) => readBytes(rel).toString('utf8').replace(/\r\n/g, '\n')
const kb = (bytes) => `${(bytes / 1000).toFixed(1)} kB`

function walk(dir = outDir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  )
}
const files = walk().map((full) => ({
  full,
  rel: full.slice(outDir.length + 1).split(sep).join('/'),
  size: statSync(full).size,
}))

const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

// Next and React always write double quoted attributes, so this small reader is enough.
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([^\s"'<>/=]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]),
  )
const tagsOf = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => ({
    index: m.index,
    attr: attributes(m[0]),
  }))
// Leaves out the <script> elements, so the checks only look at markup. This is a scan and not a
// replace(): there is no pattern that a crafted fragment could rebuild after removal, and an end
// tag such as </script > is still recognised.
function withoutScripts(html) {
  const opening = /<script(?=[\s/>])/gi
  const closing = /<\/script[^>]*>/gi
  let markup = ''
  let from = 0
  for (;;) {
    opening.lastIndex = from
    const start = opening.exec(html)
    if (!start) return markup + html.slice(from)
    markup += html.slice(from, start.index)
    closing.lastIndex = start.index
    const end = closing.exec(html)
    if (!end) return markup
    from = end.index + end[0].length
  }
}
const metaWhere = (html, key, value) =>
  tagsOf(html, 'meta').filter((t) => t.attr[key]?.toLowerCase() === value.toLowerCase())

// True when an absolute URL belongs to this site. The origin is compared exactly, because a prefix
// test such as startsWith(ORIGIN) would also accept https://ganeshtharu.com.np.example.org.
const isOurs = (url) => {
  try {
    return new URL(url).origin === ORIGIN
  } catch {
    return false
  }
}

// The host of a URL given as text, or an empty string when it is not a URL.
const hostOf = (value) => {
  try {
    return new URL(String(value)).hostname
  } catch {
    return ''
  }
}

// Turns a URL from the page into a path inside out/, or null when it points to another site.
// A relative URL is resolved against `base`: the site root for a page, and the stylesheet's own
// address for a url() inside CSS, because some bundlers write those relative to the stylesheet.
function localPath(url, base = `${ORIGIN}/`) {
  let parsed
  try {
    parsed = new URL(url.trim(), base)
  } catch {
    return null
  }
  if (parsed.origin !== ORIGIN) return null
  const path = decodeURIComponent(parsed.pathname)
  return path.endsWith('/') ? `${path}index.html`.slice(1) : path.slice(1)
}
function resolvesToFile(url, base) {
  const rel = localPath(url, base)
  if (rel === null) return null
  const inside = (p) => resolve(abs(p)).startsWith(outDir + sep) || resolve(abs(p)) === outDir
  return [rel, `${rel}.html`, `${rel}/index.html`].some((p) => inside(p) && exists(p) && statSync(abs(p)).isFile())
}

function parseCsp(html) {
  const metas = metaWhere(html, 'http-equiv', 'Content-Security-Policy')
  if (metas.length !== 1) return { count: metas.length }
  const directives = new Map()
  for (const part of metas[0].attr.content.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/)
    if (name) directives.set(name.toLowerCase(), values)
  }
  return { count: 1, directives, index: metas[0].index }
}

// ---------------------------------------------------------------- read the pages once

const home = readText('index.html')
const homeMarkup = withoutScripts(home)
const notFound = exists('404.html') ? readText('404.html') : ''
const resume = exists('resume.html') ? readText('resume.html') : ''
// The page that lists the projects, and one case study page per project (app/projects/[slug]).
const caseStudies = files.filter((f) => /^projects\/[^/]+\.html$/.test(f.rel)).map((f) => f.rel).sort()
const projectPages = ['projects.html', ...caseStudies].filter(exists).map((rel) => [rel, readText(rel)])
const pages = [
  ['index.html', home],
  ['404.html', notFound],
  ['resume.html', resume],
  ...projectPages,
]
// "projects/untangler.html" is served at "/projects/untangler".
const pathOf = (rel) => `/${rel.replace(/\.html$/, '')}`
// Links from the home page to a PDF on this site, that is, the CV.
const cvLinks = tagsOf(homeMarkup, 'a').filter((t) => localPath(t.attr.href ?? '')?.toLowerCase().endsWith('.pdf'))
const ids = [...homeMarkup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])

// ---------------------------------------------------------------- checks

check('Files', 'required files are present', () => {
  const missing = REQUIRED_FILES.filter((f) => !exists(f))
  return expect(missing.length === 0, `missing: ${missing.join(', ')}`, `${files.length} files`)
})
check('Files', 'CNAME names the custom domain', () => {
  const value = readText('CNAME').trim()
  return expect(value === DOMAIN, `CNAME contains "${value}", expected "${DOMAIN}"`)
})
check('Files', 'nothing private is published (source maps, env files, logs, backups)', () => {
  const stray = files.filter((f) => FORBIDDEN_FILE.test(f.rel)).map((f) => f.rel)
  return expect(stray.length === 0, `should not be published: ${stray.join(', ')}`)
})
check('Files', 'no credentials in any published text file', () => {
  const found = []
  for (const f of files.filter((x) => /\.(?:html|js|css|txt|xml|json|webmanifest|svg)$/i.test(x.rel))) {
    const text = readFileSync(f.full, 'latin1')
    for (const [label, pattern] of SECRET_PATTERNS) if (pattern.test(text)) found.push(`${label} in ${f.rel}`)
  }
  return expect(found.length === 0, found.join('; '))
})

check('Home page', 'language, title, description and viewport are set', () => {
  const title = /<title>([\s\S]*?)<\/title>/.exec(home)?.[1].trim()
  const description = metaWhere(home, 'name', 'description')[0]?.attr.content?.trim()
  const problems = []
  if (!/<html[^>]*\slang="[a-z]{2}/i.test(home)) problems.push('html lang')
  if (!title) problems.push('title')
  if (!description) problems.push('meta description')
  if (!metaWhere(home, 'name', 'viewport').length) problems.push('viewport')
  return expect(problems.length === 0, `missing: ${problems.join(', ')}`)
})
check('Home page', 'exactly one h1 and one main landmark', () => {
  const h1 = (homeMarkup.match(/<h1\b/g) ?? []).length
  const main = (homeMarkup.match(/<main\b/g) ?? []).length
  return expect(h1 === 1 && main === 1, `found ${h1} h1 and ${main} main`)
})
check('Home page', 'canonical link points at the live domain', () => {
  const link = tagsOf(home, 'link').find((t) => t.attr.rel === 'canonical')
  return expect(link?.attr.href?.replace(/\/$/, '') === ORIGIN, `canonical is "${link?.attr.href}"`)
})
check('Home page', 'search engines are allowed to index it', () => {
  const blocked = ['robots', 'googlebot']
    .flatMap((name) => metaWhere(home, 'name', name))
    .filter((t) => /noindex|nofollow|none/i.test(t.attr.content ?? ''))
  return expect(blocked.length === 0, `robots meta blocks indexing: ${blocked.map((t) => t.attr.content).join(' | ')}`)
})
check('Home page', 'link previews use an image that exists at the size it claims', () => {
  const urls = ['og:image', 'twitter:image'].map((key) => {
    const tag = metaWhere(home, key.startsWith('og') ? 'property' : 'name', key)[0]
    return [key, tag?.attr.content]
  })
  const problems = urls.filter(([, u]) => !u || !isOurs(u) || !resolvesToFile(u)).map(([k]) => k)
  if (problems.length) return fail(`${problems.join(', ')} missing or not a file on ${DOMAIN}`)
  const png = readBytes(localPath(urls[0][1]))
  const isPng = png.subarray(0, 8).toString('hex') === '89504e470d0a1a0a'
  const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]
  const claimed = ['og:image:width', 'og:image:height'].map((k) => Number(metaWhere(home, 'property', k)[0]?.attr.content))
  return expect(isPng && w === claimed[0] && h === claimed[1], `image is ${isPng ? `${w}x${h}` : 'not a PNG'}, page claims ${claimed.join('x')}`, `${w}x${h}`)
})
check('Home page', 'structured data (JSON-LD) is valid and describes the person', () => {
  const block = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(home)
  if (!block) return fail('no JSON-LD block found')
  const data = JSON.parse(block[1])
  const problems = []
  if (hostOf(data['@context']) !== 'schema.org') problems.push('@context')
  if (data['@type'] !== 'Person') problems.push('@type is not Person')
  if (!data.name) problems.push('name')
  if (data.url?.replace(/\/$/, '') !== ORIGIN) problems.push('url')
  if (!Array.isArray(data.sameAs) || !data.sameAs.length || !data.sameAs.every((u) => u.startsWith('https://'))) problems.push('sameAs')
  return expect(problems.length === 0, `problems: ${problems.join(', ')}`)
})
check('Home page', 'ids are unique and every in-page link has a target', () => {
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))]
  const hashes = tagsOf(homeMarkup, 'a')
    .map((t) => t.attr.href ?? '')
    .filter((h) => /^\/?#./.test(h))
    .map((h) => h.replace(/^\/?#/, ''))
  const dangling = [...new Set(hashes.filter((h) => !ids.includes(h)))]
  if (!hashes.length) return fail('found no in-page links, the navigation may be missing')
  return expect(!dupes.length && !dangling.length, `duplicate ids: [${dupes}], links without a target: [${dangling}]`, `${hashes.length} links`)
})
check('Home page', 'every section the navigation scrolls to exists', () => {
  const missing = SECTION_IDS.filter((id) => !ids.includes(id))
  return expect(missing.length === 0, `no element with id: ${missing.join(', ')}`, `${SECTION_IDS.length} sections`)
})
check('Home page', 'external links open safely and use https', () => {
  const anchors = tagsOf(homeMarkup, 'a')
  const unsafe = anchors.filter((t) => t.attr.target === '_blank' && !/\bnoopener\b/.test(t.attr.rel ?? '')).map((t) => t.attr.href)
  const insecure = [...anchors, ...tagsOf(homeMarkup, 'img'), ...tagsOf(home, 'script'), ...tagsOf(home, 'link')]
    .map((t) => t.attr.href ?? t.attr.src ?? '')
    .filter((u) => u.startsWith('http://'))
  return expect(!unsafe.length && !insecure.length, `target=_blank without noopener: [${unsafe}], http:// URLs: [${insecure}]`)
})
check('Home page', 'every image has alt text', () => {
  const missing = tagsOf(homeMarkup, 'img').filter((t) => !('alt' in t.attr)).map((t) => t.attr.src)
  return expect(missing.length === 0, `no alt attribute on: ${missing.join(', ')}`)
})
check('Home page', 'no template or test leftovers in the text', () => {
  const text = `${homeMarkup}\n${exists('index.txt') ? readText('index.txt') : ''}`
  const found = LEFTOVER_PATTERNS.flatMap(([label, pattern]) => {
    const hit = pattern.exec(text)
    if (!hit) return []
    const around = text.slice(Math.max(0, hit.index - 25), hit.index + hit[0].length + 25).replace(/\s+/g, ' ')
    return [`${label} near "${around}"`]
  })
  return expect(found.length === 0, found.join('; '))
})

check('References', 'every local file the pages and stylesheets point to exists', () => {
  const missing = []
  for (const [name, html] of pages) {
    const markup = withoutScripts(html)
    const urls = [
      ...tagsOf(html, 'script').map((t) => t.attr.src),
      ...tagsOf(html, 'link').map((t) => t.attr.href),
      ...tagsOf(markup, 'a').map((t) => t.attr.href),
      ...tagsOf(markup, 'img').map((t) => t.attr.src),
    ].filter((u) => u && !u.startsWith('#'))
    for (const url of urls) if (resolvesToFile(url) === false) missing.push(`${url} (from ${name})`)
  }
  for (const css of files.filter((f) => f.rel.endsWith('.css'))) {
    const text = readFileSync(css.full, 'utf8')
    const base = `${ORIGIN}/${css.rel}`
    for (const m of text.matchAll(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g)) {
      if (!m[2].startsWith('data:') && resolvesToFile(m[2], base) === false) missing.push(`${m[2]} (from ${css.rel})`)
    }
  }
  return expect(missing.length === 0, `not found in the build: ${[...new Set(missing)].join(', ')}`)
})
check('References', 'scripts and stylesheets all come from this site, and fonts are self-hosted', () => {
  const foreign = [...tagsOf(home, 'script').map((t) => t.attr.src), ...tagsOf(home, 'link').filter((t) => t.attr.rel === 'stylesheet').map((t) => t.attr.href)]
    .filter((u) => u && localPath(u) === null)
  const googleFonts = pages.some(([, html]) => /fonts\.(?:googleapis|gstatic)\.com/.test(html)) ||
    files.some((f) => f.rel.endsWith('.css') && /fonts\.(?:googleapis|gstatic)\.com/.test(readFileSync(f.full, 'utf8')))
  return expect(!foreign.length && !googleFonts, `external: [${foreign}]${googleFonts ? ', requests Google Fonts at runtime' : ''}`)
})
check('References', 'the CV link leads to a complete PDF', () => {
  const pdfs = [...new Set(cvLinks.map((t) => t.attr.href))]
  if (!pdfs.length) return fail('the page links to no PDF, the CV link is missing')
  const problems = []
  for (const url of pdfs) {
    const rel = localPath(url)
    if (!exists(rel)) { problems.push(`${rel} is missing`); continue }
    const bytes = readBytes(rel)
    if (bytes.subarray(0, 5).toString('latin1') !== '%PDF-') problems.push(`${rel} is not a PDF`)
    else if (!bytes.subarray(-2048).toString('latin1').includes('%%EOF')) problems.push(`${rel} looks truncated (no %%EOF)`)
    else if (bytes.length < 5000) problems.push(`${rel} is only ${bytes.length} bytes`)
  }
  return expect(problems.length === 0, problems.join('; '), pdfs.join(', '))
})
check('References', 'the CV opens in the browser in a new tab, not as a forced download', () => {
  if (!cvLinks.length) return fail('the page links to no PDF')
  const forced = cvLinks.filter((t) => 'download' in t.attr).length
  const sameTab = cvLinks.filter((t) => t.attr.target !== '_blank').length
  return expect(!forced && !sameTab, `${forced} CV link(s) force a download, ${sameTab} open in the same tab`, `${cvLinks.length} link`)
})
check('References', '/resume forwards to the same CV and stays out of search results', () => {
  if (!resume) return fail('resume.html is missing')
  const target = cvLinks[0]?.attr.href
  if (!target) return fail('the home page links to no CV to compare with')
  const head = resume.slice(0, resume.indexOf('</head>'))
  const refresh = metaWhere(head, 'http-equiv', 'refresh')[0]?.attr.content ?? ''
  const refreshUrl = /^\s*0\s*;\s*url=(.+)$/i.exec(refresh)?.[1].trim()
  const scriptUrl = /<script>location\.replace\(("[^"<]*")\)<\/script>/.exec(resume)?.[1]
  const problems = []
  if (refreshUrl !== target) problems.push(`refresh tag in the head goes to "${refreshUrl}"`)
  if (!scriptUrl || JSON.parse(scriptUrl) !== target) problems.push(`script goes to ${scriptUrl}`)
  if (!tagsOf(withoutScripts(resume), 'a').some((t) => t.attr.href === target)) problems.push('no visible link to the CV')
  // Starting a navigation stops the parser, so a script above the links would leave a blank page
  // whenever the browser hands the PDF off instead of showing it.
  else if (scriptUrl && resume.search(/<script>location\.replace\(/) < resume.lastIndexOf(`href="${target}"`)) problems.push('the script runs before the links are on the page')
  if (!metaWhere(resume, 'name', 'robots').some((t) => /noindex/.test(t.attr.content ?? ''))) problems.push('not marked noindex')
  return expect(problems.length === 0, `expected ${target}: ${problems.join('; ')}`, target)
})

check('Contact form', 'the home page has the form, and its scripts carry the endpoint and an access key', () => {
  // The bundler may put the endpoint and the key in different files, so this looks at every
  // script the home page loads. Without a key the page shows a plain email button and no form.
  const uuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
  const loaded = [...new Set(tagsOf(home, 'script').map((t) => t.attr.src).filter((src) => src?.startsWith('/_next/static/')))]
    .map((src) => readText(localPath(src)))
  const endpoint = loaded.some((text) => (text.match(/https:\/\/[^\s"'`\\)]+/g) ?? []).some((u) => u === FORM_ENDPOINT))
  const key = loaded.some((text) => uuid.test(text))
  const form = /<form\b/.test(homeMarkup) && tagsOf(homeMarkup, 'input').some((t) => t.attr.name === 'email')
  const problems = []
  if (!form) problems.push('no form with an email field on the home page, the site fell back to the email button')
  if (!endpoint) problems.push('no loaded script contains the Web3Forms endpoint')
  if (!key) problems.push('no loaded script contains an access key')
  return expect(problems.length === 0, problems.join('; '))
})

check('Project pages', 'the home page links to the project list and to every case study', () => {
  if (!caseStudies.length) return fail('found no case study pages under projects/')
  const linked = new Set(tagsOf(homeMarkup, 'a').map((t) => t.attr.href))
  const missing = ['projects.html', ...caseStudies].map(pathOf).filter((path) => !linked.has(path))
  return expect(missing.length === 0, `not linked from the home page: ${missing.join(', ')}`, `${caseStudies.length} case studies`)
})
check('Project pages', 'each one is a complete page with its own title, description and address', () => {
  const problems = []
  const titleOf = (html) => /<title>([\s\S]*?)<\/title>/.exec(html)?.[1].trim()
  const titles = new Map([[titleOf(home), 'index.html']])
  for (const [rel, html] of projectPages) {
    const markup = withoutScripts(html)
    const title = titleOf(html)
    const canonical = tagsOf(html, 'link').find((t) => t.attr.rel === 'canonical')?.attr.href
    const blocked = ['robots', 'googlebot'].flatMap((name) => metaWhere(html, 'name', name)).some((t) => /noindex|none/i.test(t.attr.content ?? ''))
    const h1 = (markup.match(/<h1\b/g) ?? []).length
    const main = (markup.match(/<main\b/g) ?? []).length
    if (h1 !== 1 || main !== 1) problems.push(`${rel} has ${h1} h1 and ${main} main`)
    if (!title) problems.push(`${rel} has no title`)
    else if (titles.has(title)) problems.push(`${rel} has the same title as ${titles.get(title)}`)
    else titles.set(title, rel)
    if (!metaWhere(html, 'name', 'description')[0]?.attr.content?.trim()) problems.push(`${rel} has no description`)
    if (canonical !== `${ORIGIN}${pathOf(rel)}`) problems.push(`${rel} canonical is "${canonical}"`)
    if (blocked) problems.push(`${rel} is marked noindex`)
  }
  return expect(problems.length === 0, problems.join('; '), `${projectPages.length} pages`)
})
check('Project pages', 'every case study leads to the contact form and back to the list', () => {
  const problems = []
  for (const [rel, html] of projectPages.filter(([rel]) => rel !== 'projects.html')) {
    const hrefs = tagsOf(withoutScripts(html), 'a').map((t) => t.attr.href)
    if (!hrefs.includes('/#contact')) problems.push(`${rel} has no link to /#contact`)
    if (!hrefs.includes('/projects')) problems.push(`${rel} has no link to /projects`)
  }
  return expect(problems.length === 0, problems.join('; '))
})
check('Project pages', 'links into the home page point at sections that exist', () => {
  const dangling = []
  let count = 0
  for (const [rel, html] of pages.slice(1)) {
    const markup = withoutScripts(html)
    const own = [...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    for (const href of tagsOf(markup, 'a').map((t) => t.attr.href ?? '')) {
      const toHome = /^\/#(.+)$/.exec(href)?.[1]
      const toSelf = /^#(.+)$/.exec(href)?.[1]
      if (toHome || toSelf) count++
      if (toHome && !ids.includes(toHome)) dangling.push(`${href} (from ${rel})`)
      if (toSelf && !own.includes(toSelf)) dangling.push(`${href} (from ${rel})`)
    }
  }
  return expect(dangling.length === 0, `no such section: ${[...new Set(dangling)].join(', ')}`, `${count} links`)
})
check('Project pages', 'external links open safely and every image has alt text', () => {
  const problems = []
  for (const [rel, html] of projectPages) {
    const markup = withoutScripts(html)
    const anchors = tagsOf(markup, 'a')
    const images = tagsOf(markup, 'img')
    for (const t of anchors) {
      if (t.attr.target === '_blank' && !/\bnoopener\b/.test(t.attr.rel ?? '')) problems.push(`${rel}: target=_blank without noopener on ${t.attr.href}`)
    }
    for (const t of [...anchors, ...images]) {
      if ((t.attr.href ?? t.attr.src ?? '').startsWith('http://')) problems.push(`${rel}: http:// URL ${t.attr.href ?? t.attr.src}`)
    }
    for (const t of images) if (!('alt' in t.attr)) problems.push(`${rel}: no alt attribute on ${t.attr.src}`)
  }
  return expect(problems.length === 0, problems.join('; '))
})

check('Security', 'a Content-Security-Policy is set once per page, before the body', () => {
  const problems = pages.flatMap(([name, html]) => {
    const csp = parseCsp(html)
    if (csp.count !== 1) return [`${name} has ${csp.count} CSP meta tags`]
    return csp.index < html.indexOf('<body') ? [] : [`${name} declares it after the body starts`]
  })
  return expect(problems.length === 0, problems.join('; '))
})
check('Security', 'the policy denies by default and names no unexpected source', () => {
  const { directives } = parseCsp(home)
  if (!directives) return fail('no policy to inspect')
  const is = (name, value) => directives.get(name)?.length === 1 && directives.get(name)[0] === value
  const problems = []
  if (!is('default-src', "'self'")) problems.push("default-src must be 'self'")
  if (!is('object-src', "'none'")) problems.push("object-src must be 'none'")
  if (!is('base-uri', "'self'")) problems.push("base-uri must be 'self'")
  for (const [directive, values] of directives) {
    for (const v of values) {
      const allowed =
        v === "'self'" || v === "'none'" || ALLOWED_CSP_HOSTS.includes(v) ||
        (v === "'unsafe-inline'" && (directive === 'script-src' || directive === 'style-src')) ||
        (v === 'data:' && directive === 'img-src')
      if (!allowed) problems.push(`${directive} allows ${v}`)
    }
  }
  return expect(problems.length === 0, problems.join('; '))
})
check('Security', 'a referrer policy is set and does not leak full URLs', () => {
  const value = metaWhere(home, 'name', 'referrer')[0]?.attr.content
  return expect(value && !/unsafe-url|no-referrer-when-downgrade/.test(value), `referrer policy is "${value}"`, value)
})

check('404 page', 'the custom 404 is a real page with a way back', () => {
  const h1 = (withoutScripts(notFound).match(/<h1\b/g) ?? []).length
  const homeLink = tagsOf(withoutScripts(notFound), 'a').some((t) => t.attr.href === '/')
  const noindex = metaWhere(notFound, 'name', 'robots').some((t) => /noindex/.test(t.attr.content ?? ''))
  return expect(h1 === 1 && homeLink && noindex, `h1 count ${h1}, link to home: ${homeLink}, noindex: ${noindex}`)
})

check('404 page', 'a project address typed with a slash on the end is passed on', () => {
  // GitHub Pages serves projects.html at /projects but answers /projects/ with the 404 page.
  const missing = projectPages.map(([rel]) => `${pathOf(rel)}/`).filter((path) => !notFound.includes(JSON.stringify(path)))
  return expect(projectPages.length > 0 && missing.length === 0, `the 404 page does not forward: ${missing.join(', ')}`, `${projectPages.length} addresses`)
})

check('Crawlers', 'robots.txt welcomes crawlers and lists the sitemap', () => {
  const robots = readText('robots.txt')
  const problems = []
  if (!/^user-agent:\s*\*/im.test(robots)) problems.push('no rule for all crawlers')
  if (/^disallow:\s*\/\s*$/im.test(robots)) problems.push('"Disallow: /" blocks the whole site')
  if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) problems.push('sitemap line missing')
  return expect(problems.length === 0, problems.join('; '))
})
check('Crawlers', 'sitemap.xml only lists pages on the live domain', () => {
  const locs = [...readText('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const wrong = locs.filter((u) => !isOurs(u))
  return expect(locs.length > 0 && wrong.length === 0, locs.length ? `off-domain: ${wrong.join(', ')}` : 'no URLs listed', `${locs.length} URL`)
})
check('Crawlers', 'sitemap.xml lists the home page and every project page', () => {
  const locs = new Set([...readText('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/\/$/, '')))
  const expected = [ORIGIN, ...projectPages.map(([rel]) => `${ORIGIN}${pathOf(rel)}`)]
  const missing = expected.filter((url) => !locs.has(url))
  const unknown = [...locs].filter((url) => !expected.includes(url))
  return expect(!missing.length && !unknown.length, `missing: [${missing.join(', ')}], not a page of this site: [${unknown.join(', ')}]`, `${locs.size} URLs`)
})
check('Crawlers', 'the web app manifest parses and its icons exist', () => {
  const manifest = JSON.parse(readText('manifest.webmanifest'))
  const missing = (manifest.icons ?? []).filter((i) => !resolvesToFile(i.src)).map((i) => i.src)
  const ok = manifest.name && manifest.start_url && manifest.icons?.length && !missing.length
  return expect(ok, `name/start_url/icons incomplete, missing icon files: [${missing}]`)
})

check('Size', 'total JavaScript is within budget', () => {
  const total = files.filter((f) => /^_next\/static\/.*\.js$/.test(f.rel)).reduce((n, f) => n + f.size, 0)
  return expect(total <= BUDGET.totalJs, `${kb(total)} is over the ${kb(BUDGET.totalJs)} budget`, `${kb(total)} of ${kb(BUDGET.totalJs)}`)
})
check('Size', 'JavaScript loaded up front is within budget (gzip)', () => {
  const srcs = new Set(
    tagsOf(home, 'script')
      .filter((t) => t.attr.src?.startsWith('/_next/static/') && !('nomodule' in t.attr))
      .map((t) => t.attr.src),
  )
  if (!srcs.size) return fail('found no scripts on the home page')
  const total = [...srcs].reduce((n, src) => n + gzipSync(readBytes(localPath(src))).length, 0)
  return expect(total <= BUDGET.initialJsGzip, `${kb(total)} is over the ${kb(BUDGET.initialJsGzip)} budget`, `${kb(total)} of ${kb(BUDGET.initialJsGzip)}`)
})
check('Size', 'CSS is within budget', () => {
  const total = files.filter((f) => f.rel.endsWith('.css')).reduce((n, f) => n + f.size, 0)
  return expect(total <= BUDGET.css, `${kb(total)} is over the ${kb(BUDGET.css)} budget, check that no build output or generated folder is being scanned by Tailwind`, `${kb(total)} of ${kb(BUDGET.css)}`)
})
check('Size', 'no single published file is oversized', () => {
  const limit = (f) => (f.rel.toLowerCase().endsWith('.pdf') ? BUDGET.pdf : BUDGET.anyFile)
  const big = files.filter((f) => !f.rel.endsWith('.js') && f.size > limit(f)).map((f) => `${f.rel} (${kb(f.size)}, limit ${kb(limit(f))})`)
  return expect(big.length === 0, `too large: ${big.join(', ')}`)
})

// ---------------------------------------------------------------- report

const failed = results.filter((r) => !r.ok)
const escapeCommand = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
let group = ''
console.log(`verify-build: checking ${outDir}`)
for (const r of results) {
  if (r.group !== group) console.log(`\n${(group = r.group)}`)
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok && r.note ? `  (${r.note})` : ''}`)
  if (!r.ok) console.log(`        ${r.problem}`)
}
console.log(`\n${results.length} checks, ${failed.length} failed.`)

if (process.env.GITHUB_ACTIONS) {
  for (const r of failed) console.log(`::error title=Build check failed::${escapeCommand(`${r.name}: ${r.problem}`)}`)
}
if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = failed.length
    ? [`### Build checks: ${failed.length} of ${results.length} failed`, '', ...failed.map((r) => `- **${r.name}**: ${r.problem}`)]
    : [`### Build checks: all ${results.length} passed`]
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`)
}
process.exit(failed.length ? 1 : 0)
