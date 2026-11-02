import formatNumber from 'helpers/formatNumber'
import type { RepoStats } from 'helpers/projectsData'

// Small numbers hurt more than they help, so only show the impressive ones
const count = (n: number, min: number, word: string) =>
  n >= min && `${formatNumber(n)} ${word}s`

// "956 GitHub stars · 41 228 downloads", or '' when neither clears its bar
export default function repoStatsLine(stats?: RepoStats) {
  return stats
    ? [
        count(stats.stars, 100, 'GitHub star'),
        count(stats.downloads, 10_000, 'download'),
      ]
        .filter(Boolean)
        .join(' · ')
    : ''
}
