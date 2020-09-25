import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

export function aggregateCount(color: string, title: string, data?: any) {
  return !data
    ? emptyDataSet
    : {
        labels: data.map((a: any) => daysAgo(a._id)).reverse(),
        datasets: [
          {
            label: title,
            backgroundColor: color,
            data: data.map((o: any) => o.count).reverse(),
          },
        ],
      }
}
