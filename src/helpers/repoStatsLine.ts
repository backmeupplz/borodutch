import formatNumber from 'helpers/formatNumber'
import type { RepoStats } from 'helpers/projectsData'

const count = (n: number, word: string) =>
  n > 0 && `${formatNumber(n)} ${word}${n === 1 ? '' : 's'}`

// "956 GitHub stars · 1 234 downloads", or '' when both are zero
export default function repoStatsLine(stats?: RepoStats) {
  return stats
    ? [count(stats.stars, 'GitHub star'), count(stats.downloads, 'download')]
        .filter(Boolean)
        .join(' · ')
    : ''
}
