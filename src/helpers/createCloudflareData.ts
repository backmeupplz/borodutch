import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

export function createCloudflareData(color: string, data?: any) {
  return !data
    ? emptyDataSet
    : {
        labels: data.map((_: any, i: number) => daysAgo(i)).reverse(),
        datasets: [
          {
            label: 'Number of website visits',
            backgroundColor: color,
            data: data,
            opacity: 0.3,
          },
        ],
      }
}
