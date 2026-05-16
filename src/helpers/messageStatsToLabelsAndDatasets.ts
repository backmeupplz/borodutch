import { useSnapshot } from 'valtio'
import showMoreData from 'helpers/showMoreData'

export default function messageStatsToLabelsAndDatasets(
  messageStats: {
    date: string
    count: number
  }[]
) {
  const showMoreDataSnapshot = useSnapshot(showMoreData)
  const chartStats = messageStats.slice(0, -1)
  const labels = [] as string[]
  const values = [] as number[]
  for (const { date, count } of showMoreDataSnapshot.showMoreData
    ? chartStats
    : chartStats.slice(chartStats.length - 30)) {
    if (!date) continue
    labels.push(new Date(date).toLocaleDateString())
    values.push(count)
  }
  return { labels, datasets: [{ values }] }
}
