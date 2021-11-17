import { CloudflareData } from 'helpers/projectsData'
import daysAgo from 'helpers/daysAgo'

export default function cloudflareStatsToLabelsAndDatasets(
  stats: CloudflareData
) {
  stats.pop()
  const labels = [] as string[]
  const values = [] as number[]
  for (let i = 0; i < stats.length; i++) {
    labels.push(daysAgo(stats.length - i).toLocaleDateString())
    values.push(stats[i])
  }
  return { labels, datasets: [{ values }] }
}
