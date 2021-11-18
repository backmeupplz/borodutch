import { useSnapshot } from 'valtio'
import showMoreData from 'helpers/showMoreData'

export default function messageStatsToLabelsAndDatasets(
  messageStats: {
    date: string
    count: number
  }[]
) {
  const showMoreDataSnapshot = useSnapshot(showMoreData)
  messageStats.pop()
  const labels = [] as string[]
  const values = [] as number[]
  for (const { date, count } of showMoreDataSnapshot.showMoreData
    ? messageStats
    : messageStats.slice(messageStats.length - 30)) {
    if (!date) continue
    labels.push(new Date(date).toLocaleDateString())
    values.push(count)
  }
  return { labels, datasets: [{ values }] }
}
