import { CountAggregation } from 'helpers/projectsData'
import { useSnapshot } from 'valtio'
import showMoreData from 'helpers/showMoreData'

export default function dailyStatsToLabelsAndDatasets(
  dailyStats: CountAggregation[]
) {
  const showMoreDataSnapshot = useSnapshot(showMoreData)
  const labels = [] as string[]
  const values = [] as number[]
  for (const { _id, count } of showMoreDataSnapshot.showMoreData
    ? dailyStats
    : dailyStats.slice(dailyStats.length - 30)) {
    if (!_id) continue
    labels.push(`${_id}`)
    values.push(count)
  }
  return { labels, datasets: [{ values }] }
}
