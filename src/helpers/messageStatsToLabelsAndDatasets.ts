export default function messageStatsToLabelsAndDatasets(
  messageStats: {
    date: string
    count: number
  }[]
) {
  messageStats.pop()
  const labels = [] as string[]
  const values = [] as number[]
  for (const { date, count } of messageStats) {
    if (!date) continue
    labels.push(new Date(date).toLocaleDateString())
    values.push(count)
  }
  return { labels, datasets: [{ values }] }
}
