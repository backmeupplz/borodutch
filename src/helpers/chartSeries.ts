import type { ChartSeries } from 'models/Project'
import type {
  CloudflareData,
  CountAggregation,
  JevAntispamHistoryPoint,
  VeydriftDay,
} from 'helpers/projectsData'

const recentPoints = 30
const hour = 3600 * 1000
const day = 24 * hour
// UTC dates are shifted to noon so they render as the same day in any timezone
const noon = 12 * hour

export function dateLabel(date: Date | number | string, withHour = false) {
  return new Date(date).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: withHour ? undefined : 'numeric',
    hour: withHour ? 'numeric' : undefined,
  })
}

function series<T>(
  points: readonly T[],
  showMore: boolean,
  toPoint: (point: T) => [Date, number] | undefined,
  withHour = false
): ChartSeries {
  const labels: string[] = []
  const values: number[] = []
  for (const point of showMore ? points : points.slice(-recentPoints)) {
    const parsed = toPoint(point)
    if (!parsed || !Number.isFinite(parsed[0].getTime())) continue
    labels.push(dateLabel(parsed[0], withHour))
    values.push(parsed[1])
  }
  return { labels, values }
}

// _id is "days ago" (or "hours ago"); 0 is the unfinished current period
export function countSeries(
  stats: readonly CountAggregation[] = [],
  showMore: boolean,
  unit: 'day' | 'hour' = 'day',
  now = Date.now()
) {
  const step = unit === 'day' ? day : hour
  return series(
    stats,
    showMore,
    ({ _id, count }) => (_id ? [new Date(now - _id * step), count] : undefined),
    unit === 'hour'
  )
}

// One value per day ending today; today is partial, so it is dropped
export function cloudflareSeries(stats: CloudflareData = [], now = Date.now()) {
  const days = stats.slice(0, -1)
  const points = days.map(
    (count, i) => [new Date(now - (days.length - i) * day), count] as const
  )
  return series(points, true, ([date, count]) => [date, count])
}

export function messageSeries(
  stats: readonly { date: string; count: number }[] = [],
  showMore: boolean
) {
  return series(stats.slice(0, -1), showMore, ({ date, count }) => [
    new Date(Date.parse(date) + noon),
    count,
  ])
}

export function jevSeries(
  history: readonly JevAntispamHistoryPoint[] = [],
  metric: Exclude<keyof JevAntispamHistoryPoint, 'date'>
) {
  return series(history, true, (point) => {
    const value = point[metric]
    return Number.isSafeInteger(value) && value >= 0
      ? [new Date(Date.parse(point.date) + noon), value]
      : undefined
  })
}

// Running total over the published days, walked back from the all-time total
export function runningTotalSeries(
  daily: readonly VeydriftDay[] = [],
  metric: Exclude<keyof VeydriftDay, 'date'>,
  total = 0
) {
  let later = 0
  const totals: [string, number][] = []
  for (let i = daily.length - 1; i >= 0; i--) {
    totals.unshift([daily[i].date, total - later])
    later += daily[i][metric]
  }
  return series(totals, true, ([date, value]) => [
    new Date(Date.parse(date) + noon),
    value,
  ])
}
