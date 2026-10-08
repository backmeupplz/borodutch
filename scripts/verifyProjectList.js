const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')
const ts = require('typescript')

const source = fs.readFileSync(
  path.join(__dirname, '../src/data/projects.ts'),
  'utf8'
)
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText
// Imports are only used inside the existing dynamic descriptions/charts.
// Keep the project definitions real without starting live statistics requests.
const context = { exports: {}, require: () => ({}) }
vm.runInNewContext(compiled, context)
const projects = context.exports.default

const absplus = projects.filter((project) => project.title === 'ABS+')
assert.strictEqual(absplus.length, 1, 'ABS+ must appear exactly once')
assert.strictEqual(absplus[0].code, 'absplus')
assert.strictEqual(absplus[0].link, 'https://absplus.app')
assert.strictEqual(
  absplus[0].description().join(' '),
  'Free, open-source Android app for Audiobookshelf. Stream or download audiobooks and podcasts, with synced listening progress.'
)
assert.strictEqual(absplus[0].charts, undefined)
assert.strictEqual(absplus[0].publications, undefined)
assert.strictEqual(
  projects.some((project) =>
    /please.?no/i.test([project.title, project.code, project.link].join(' '))
  ),
  false,
  'The entire Please, no card must be absent'
)
assert.strictEqual(
  new Set(projects.map((project) => project.code)).size,
  projects.length
)
assert.strictEqual(
  projects.filter((project) => project.link === 'https://absplus.app').length,
  1
)
assert.deepStrictEqual(
  Array.from(
    projects.filter((project) => project.code !== 'absplus'),
    (project) => [project.title, project.code, project.link]
  ),
  [
    ['Veydrift', 'veydrift', 'https://veydrift.com'],
    ['Plain Wallet', 'plainwallet', 'https://plainwallet.app'],
    ['Agentboard', 'agentboard', 'https://agentboard.win'],
    ['Mesh+', 'meshplus', 'https://meshplus.app'],
    ['Jev Antispam', 'jevAntispam', 'https://t.me/jev_antispam_bot'],
    ['Voicy', 'voicy', 'https://t.me/voicybot'],
    ['MyGround', 'myground', 'https://myground.online'],
    ['Banofbot', 'banofbot', 'https://t.me/banofbot'],
    ['Randy Marsh', 'randy', 'https://t.me/randymbot'],
    ['Todorant', 'todorant', 'https://todorant.com'],
    ['Shieldy', 'shieldy', 'https://t.me/shieldy_bot'],
    ['Borodutch.com', 'borodutch', 'https://borodutch.com'],
    ['Temply', 'temply', 'https://t.me/temply_bot'],
  ]
)
for (const project of projects.filter((project) => project.image)) {
  assert.ok(
    fs.existsSync(
      path.join(__dirname, `../public/images/projects/${project.code}.webp`)
    ),
    `${project.code} image is missing`
  )
}
console.log(
  `Project list regression assertions passed (${projects.length} projects)`
)
