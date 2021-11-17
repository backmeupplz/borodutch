import { CountAggregation } from 'helpers/projectsData'

export default function dailyStatsToLabelsAndDatasets(
  dailyStats: CountAggregation[]
) {
  const labels = [] as string[]
  const values = [] as number[]
  for (const { _id, count } of dailyStats) {
    if (!_id) continue
    labels.push(`${_id}`)
    values.push(count)
  }
  return { labels, datasets: [{ values }] }
}
