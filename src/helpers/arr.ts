import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetch from 'unfetch'

export interface ArrData {
  configured: boolean
  currency: string
  history: {
    month: string
    monthlyRecurringRevenue: number
    annualRecurringRevenue: number
  }[]
}

export const arr = proxy({
  arr: fetch(`${baseUrl}/arr`).then((res) => res.json() as Promise<ArrData>),
})
