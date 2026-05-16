import { CloudflareData } from 'helpers/projectsData'
import daysAgo from 'helpers/daysAgo'

export default function cloudflareStatsToLabelsAndDatasets(
  stats: CloudflareData
) {
  const chartStats = stats.slice(0, -1)
  const labels = [] as string[]
  const values = [] as number[]
  for (let i = 0; i < chartStats.length; i++) {
    labels.push(daysAgo(chartStats.length - i).toLocaleDateString())
    values.push(chartStats[i])
  }
  return { labels, datasets: [{ values }] }
}
