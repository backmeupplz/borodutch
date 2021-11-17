export default function responseTimeToLabelsAndDatasets(responseTime: {
  [timestamp: number]: number
}) {
  const labels = [] as string[]
  const values = [] as number[]
  for (const key in responseTime) {
    labels.push(new Date(+key * 1000).toLocaleDateString())
    values.push(responseTime[key])
  }
  return { labels, datasets: [{ values }] }
}
