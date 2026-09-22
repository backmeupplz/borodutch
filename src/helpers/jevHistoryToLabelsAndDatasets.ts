import type { JevAntispamHistoryPoint } from 'helpers/projectsData'

type Metric = Exclude<keyof JevAntispamHistoryPoint, 'date'>

export default function jevHistoryToLabelsAndDatasets(
  history: readonly JevAntispamHistoryPoint[] | undefined,
  metric: Metric,
  now: Date = new Date()
) {
  const labels: string[] = []
  const values: number[] = []
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )

  for (const point of history || []) {
    const date = Date.parse(point.date + 'T00:00:00.000Z')
    const value = point[metric]
    if (!Number.isFinite(date) || !Number.isSafeInteger(value) || value < 0) {
      continue
    }
    labels.push(String(Math.max(0, Math.round((today - date) / 86400000))))
    values.push(value)
  }

  return { labels, datasets: [{ values }] }
}
