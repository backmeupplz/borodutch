import { useSnapshot } from 'valtio'
import showMoreData from 'helpers/showMoreData'

export default function responseTimeToLabelsAndDatasets(responseTime: {
  [timestamp: number]: number
}) {
  const showMoreDataSnapshot = useSnapshot(showMoreData)
  const labels = [] as string[]
  const values = [] as number[]
  const keys = Object.keys(responseTime).map((k) => parseInt(k, 10))
  for (const key of showMoreDataSnapshot.showMoreData
    ? keys
    : keys.slice(keys.length - 100)) {
    const date = new Date(+key * 1000)
    labels.push(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
    values.push(responseTime[key])
  }
  return { labels, datasets: [{ values }] }
}
