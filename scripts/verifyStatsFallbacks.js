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
