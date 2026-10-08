const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'borodutch-stats-test-'))
const helperOutDir = path.join(tmp, 'helpers')

fs.mkdirSync(helperOutDir, { recursive: true })

for (const helper of [
  'formatNumber.ts',
  'chartScale.ts',
  'chartSeries.ts',
  'hasPositiveNumbers.ts',
  'jevAntispamDescription.ts',
  'normalizeUserCountData.ts',
  'projectSummaryStat.ts',
]) {
  const sourcePath = path.join(root, 'src/helpers', helper)
  const outputPath = path.join(helperOutDir, helper.replace(/\.ts$/, '.js'))
  const source = fs.readFileSync(sourcePath, 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
    },
  }).outputText

  fs.writeFileSync(outputPath, output)
}

process.env.NODE_PATH = tmp
require('module').Module._initPaths()

const formatNumber = require(path.join(helperOutDir, 'formatNumber.js')).default
const { linePath, niceMax } = require(path.join(helperOutDir, 'chartScale.js'))
const { cloudflareSeries, countSeries, jevSeries } = require(path.join(
  helperOutDir,
  'chartSeries.js'
))
const jevAntispamDescription = require(path.join(
  helperOutDir,
  'jevAntispamDescription.js'
)).default
const normalizeUserCountData = require(path.join(
  helperOutDir,
  'normalizeUserCountData.js'
)).default
const projectSummaryStat = require(path.join(
  helperOutDir,
  'projectSummaryStat.js'
)).default

assert.strictEqual(formatNumber(0), '0')
assert.strictEqual(formatNumber('0'), '0')
assert.strictEqual(formatNumber(undefined), '')
assert.strictEqual(niceMax(0), 1)
assert.strictEqual(niceMax(658), 1000)
assert.strictEqual(niceMax(106148769), 200000000)
assert.strictEqual(niceMax(3), 4)
assert.strictEqual(niceMax(5000), 5000)
assert.strictEqual(linePath([0, 50, 100], 100), 'M0 100L50 50L100 0')
assert.strictEqual(linePath([658], 1000), 'M50 34.2')

const now = Date.parse('2026-10-08T15:00:00.000Z')
// _id 0 is the unfinished day and null ids are dropped; the rest keep their order
assert.deepStrictEqual(
  countSeries(
    [
      { _id: 2, count: 5 },
      { _id: 1, count: 6 },
      { _id: 0, count: 7 },
      { _id: null, count: 8 },
    ],
    true,
    'day',
    now
  ).values,
  [5, 6]
)
assert.strictEqual(
  countSeries(
    Array.from({ length: 40 }, (_, i) => ({ _id: 40 - i, count: i })),
    false
  ).values.length,
  30
)
// Repeated values must still map to consecutive days (today is dropped)
const visits = cloudflareSeries([3, 3, 3, 9], now)
assert.deepStrictEqual(visits.values, [3, 3, 3])
assert.strictEqual(new Set(visits.labels).size, 3)

assert.deepStrictEqual(
  jevAntispamDescription({
    knownChatCount: 658,
    privateChatCount: 508,
    reachableCommunityCount: 123,
    combinedCommunityAudience: 229771,
    successfulDeletionCount: 5337,
    processedMessageCount: 12345,
  }),
  [
    'Telegram anti-spam bot powered by the Jev model.',
    'Jev Antispam knows 658 chats and has successfully deleted 5 337 spam messages.',
    'Try it [on Telegram](https://t.me/jev_antispam_bot). It is [open source](https://github.com/backmeupplz/jev_antispam_bot).',
  ]
)
assert.strictEqual(jevAntispamDescription()[1], false)
assert.strictEqual(jevAntispamDescription({})[1], false)

assert.deepStrictEqual(jevSeries([], 'knownChatCount'), {
  labels: [],
  values: [],
})
const jev = jevSeries(
  [
    {
      date: '2026-09-22',
      knownChatCount: 658,
      processedMessageCount: 12345,
      successfulDeletionCount: 5337,
    },
    {
      date: '2026-09-23',
      knownChatCount: -1,
      processedMessageCount: 1,
      successfulDeletionCount: 1,
    },
  ],
  'knownChatCount'
)
assert.deepStrictEqual(jev.values, [658])
assert.ok(jev.labels[0].includes('22'), jev.labels[0])

assert.deepStrictEqual(
  normalizeUserCountData({
    count: '0',
    history: [
      ['1776000000000', '0'],
      ['1776176459819', '110924319'],
    ],
  }),
  {
    count: '110924319',
    history: [
      ['1776000000000', '0'],
      ['1776176459819', '110924319'],
    ],
  }
)
assert.strictEqual(
  normalizeUserCountData({ count: '0', history: [] }),
  undefined
)
assert.strictEqual(
  normalizeUserCountData({ count: '110924319', history: null }),
  undefined
)

const summaryWithEmptySeparateCounts = {
  userCountSeparate: {},
  projectCounts: {
    voicy: { count: 4104363, label: 'chats' },
  },
  shieldy: { userCount: 60472766, chatCount: 780587 },
  voicy: { stats: { chatCount: 1 } },
  banofbot: { chatCount: 326449 },
  temply: { userCount: 12046 },
}

assert.deepStrictEqual(
  projectSummaryStat(
    {
      projectCounts: {
        jevAntispam: { count: 230275, label: 'users' },
      },
    },
    'jevAntispam'
  ),
  { count: 230275, label: 'users' }
)
assert.deepStrictEqual(
  projectSummaryStat(
    {
      projectCounts: {
        jevAntispam: { count: 230275, label: 'people reached' },
      },
    },
    'jevAntispam'
  ),
  { count: 230275, label: 'users' }
)

const renderedCopy = [
  fs.readFileSync(path.join(root, 'src/components/Profile.tsx'), 'utf8'),
  fs.readFileSync(path.join(root, 'src/data/projects.ts'), 'utf8'),
  fs.readFileSync(
    path.join(root, 'src/helpers/jevAntispamDescription.ts'),
    'utf8'
  ),
]
  .join('\n')
  .replace(/\s+/g, ' ')
for (const removed of [
  'people reached',
  'including 508 private chats',
  'reaches 126 communities with 230 220 combined members and subscribers',
  'agentic development / bots / self-hosting',
  'I build products and the agentic development loops that keep them moving: Kaneo tasks, OpenClaw workers, Codex PRs, product QA, and boring deployment proof.',
  'Updated daily from lightweight stats',
  'This website: simple profile, current projects, recent writing, and lightweight stats first.',
]) {
  assert.strictEqual(renderedCopy.includes(removed), false)
}
assert.strictEqual(renderedCopy.includes('Updated daily'), true)
assert.strictEqual(
  renderedCopy.includes('This website. The future is now, old man'),
  true
)

assert.deepStrictEqual(
  projectSummaryStat(summaryWithEmptySeparateCounts, 'shieldy'),
  { count: 60472766, label: 'users' }
)
assert.deepStrictEqual(
  projectSummaryStat(summaryWithEmptySeparateCounts, 'voicy'),
  {
    count: 4104363,
    label: 'chats',
  }
)
assert.deepStrictEqual(
  projectSummaryStat(summaryWithEmptySeparateCounts, 'banofbot'),
  { count: 326449, label: 'chats' }
)
assert.deepStrictEqual(
  projectSummaryStat(summaryWithEmptySeparateCounts, 'temply'),
  { count: 12046, label: 'users' }
)
assert.deepStrictEqual(
  projectSummaryStat({ userCountSeparate: { shieldy: 123 } }, 'shieldy'),
  { count: 123, label: 'users' }
)
assert.strictEqual(
  projectSummaryStat({ userCountSeparate: {} }, 'shieldy'),
  undefined
)

fs.rmSync(tmp, { recursive: true, force: true })
console.log('Stats fallback assertions passed')
