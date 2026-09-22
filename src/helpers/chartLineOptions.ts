import type { ChartData } from 'react-frappe-charts'

export default function chartLineOptions(data: ChartData) {
  return {
    regionFill: 1,
    hideDots: data.labels?.length === 1 ? (0 as const) : (1 as const),
  }
}
