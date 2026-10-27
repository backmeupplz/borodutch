// Prerenders the built site for search engines and AI crawlers that don't run JavaScript. It serves the
// build the way GitHub Pages does, opens each route in headless Chrome and saves the page it settles on as
// that route's HTML file. Requests to other origins are blocked, so the saved page is the app's own first
// render rather than live data, and the app boots over it without a flash.
// Usage: node scripts/prerender.mjs <build dir> <route>...   (Chrome from CHROME_PATH or the usual places)
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { createServer } from 'node:http'
import puppeteer from 'puppeteer-core'

const [dir, ...routes] = process.argv.slice(2)
if (!dir || !routes.length) throw new Error('usage: prerender.mjs <dir> <route>...')
const chrome = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((f) => f && existsSync(f))
if (!chrome) throw new Error('No Chrome found: set CHROME_PATH')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
}
// Like GitHub Pages: /a is a, a.html or a/index.html, and any other path gets 404.html (the app)
const fileFor = (path) =>
  [path, `${path}.html`, join(path, 'index.html')]
    .map((f) => join(dir, f))
    .find((f) => existsSync(f) && statSync(f).isFile())
const fallback = join(dir, existsSync(join(dir, '404.html')) ? '404.html' : 'index.html')
const server = createServer((req, res) => {
  const f = fileFor(decodeURIComponent(new URL(req.url, 'http://x').pathname)) ?? fallback
  res.writeHead(200, { 'content-type': types[extname(f)] ?? 'application/octet-stream' })
  res.end(readFileSync(f))
}).listen(0, '127.0.0.1')
await new Promise((resolve) => server.once('listening', resolve))
const origin = `http://127.0.0.1:${server.address().port}`

const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox'] })
try {
  for (const route of routes) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
    await page.setRequestInterception(true)
    page.on('request', (r) => (/^(data|blob):/.test(r.url()) || r.url().startsWith(origin) ? r.continue() : r.abort()))
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(origin + route, { waitUntil: 'networkidle0' })
    // Links the app added while loading (like Vite's preloads of lazy chunks) are absolute; make them root-relative
    const html = (await page.content()).replaceAll(`${origin}/`, '/')
    if (errors.length) throw new Error(`${route}: ${errors.join('; ')}`)
    if (html.includes(origin)) throw new Error(`${route}: the page wrote ${origin} into its HTML`)
    const out = fileFor(route) ?? join(dir, `${route}.html`)
    writeFileSync(out, html)
    console.log(`prerendered ${route} → ${out} (${Math.round(html.length / 1024)} KB)`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
