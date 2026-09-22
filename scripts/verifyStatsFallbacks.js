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

assert.deepStrictEqual(
  jevAntispamDescription({
    knownChatCount: 654,
    privateChatCount: 504,
    reachableCommunityCount: 123,
    combinedCommunityAudience: 229771,
    successfulDeletionCount: 5337,
  }),
  [
    'Telegram anti-spam bot powered by the Jev model.',
    'Jev Antispam knows 654 chats, including 504 private chats, and currently reaches 123 communities with 229 771 combined members and subscribers. It has deleted 5 337 spam messages.',
    'Try it [on Telegram](https://t.me/jev_antispam_bot). It is [open source](https://github.com/backmeupplz/jev_antispam_bot).',
  ]
)
assert.strictEqual(jevAntispamDescription()[1], false)
assert.strictEqual(jevAntispamDescription({})[1], false)

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
assert.strictEqual(normalizeUserCountData({ count: '0', history: [] }), undefined)
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
        jevAntispam: { count: 230275, label: 'people reached' },
      },
    },
    'jevAntispam'
  ),
  { count: 230275, label: 'people reached' }
)

assert.deepStrictEqual(
  projectSummaryStat(summaryWithEmptySeparateCounts, 'shieldy'),
  { count: 60472766, label: 'users' }
)
assert.deepStrictEqual(projectSummaryStat(summaryWithEmptySeparateCounts, 'voicy'), {
  count: 4104363,
  label: 'chats',
})
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
assert.strictEqual(projectSummaryStat({ userCountSeparate: {} }, 'shieldy'), undefined)

fs.rmSync(tmp, { recursive: true, force: true })
