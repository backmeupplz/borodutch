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
  'chartLineOptions.ts',
  'hasPositiveNumbers.ts',
  'jevAntispamDescription.ts',
  'jevHistoryToLabelsAndDatasets.ts',
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
const chartLineOptions = require(path.join(
  helperOutDir,
  'chartLineOptions.js'
)).default
const jevAntispamDescription = require(path.join(
  helperOutDir,
  'jevAntispamDescription.js'
)).default
const jevHistoryToLabelsAndDatasets = require(path.join(
  helperOutDir,
  'jevHistoryToLabelsAndDatasets.js'
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
assert.deepStrictEqual(
  chartLineOptions({ labels: ['0'], datasets: [{ values: [658] }] }),
  { regionFill: 1, hideDots: 0 }
)
assert.deepStrictEqual(
  chartLineOptions({ labels: ['1', '0'], datasets: [{ values: [657, 658] }] }),
  { regionFill: 1, hideDots: 1 }
)

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

assert.deepStrictEqual(jevHistoryToLabelsAndDatasets([], 'knownChatCount'), {
  labels: [],
  datasets: [{ values: [] }],
})
assert.deepStrictEqual(
  jevHistoryToLabelsAndDatasets(
    [
      {
        date: '2026-09-22',
        knownChatCount: 658,
        processedMessageCount: 12345,
        successfulDeletionCount: 5337,
      },
    ],
    'processedMessageCount',
    new Date('2026-09-22T12:00:00.000Z')
  ),
  { labels: ['0'], datasets: [{ values: [12345] }] }
)

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

const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><div id="chart"></div>', {
  pretendToBeVisual: true,
})

global.window = dom.window
global.document = dom.window.document
global.Element = dom.window.Element
global.HTMLElement = dom.window.HTMLElement
global.SVGElement = dom.window.SVGElement
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(dom.window.HTMLElement.prototype, 'clientWidth', {
  configurable: true,
  get: () => 600,
})
dom.window.SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})

const { Chart: FrappeChart } = require('frappe-charts')
new FrappeChart('#chart', {
  type: 'line',
  height: 200,
  data: { labels: ['0'], datasets: [{ values: [658] }] },
  lineOptions: chartLineOptions({ labels: ['0'] }),
})

setTimeout(() => {
  assert.strictEqual(document.querySelectorAll('circle').length, 1)
  dom.window.close()
  fs.rmSync(tmp, { recursive: true, force: true })
}, 800)
