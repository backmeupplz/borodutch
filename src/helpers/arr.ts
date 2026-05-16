import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetchJson from 'helpers/fetchJson'

export interface ArrData {
  configured: boolean
  currency: string
  history: {
    month: string
    monthlyRecurringRevenue: number
    annualRecurringRevenue: number
  }[]
}

const fallbackArr: ArrData = {
  configured: false,
  currency: 'usd',
  history: [],
}

export const arr = proxy({
  arr: fallbackArr,
})

void fetchJson<ArrData>(`${baseUrl}/arr`, fallbackArr).then((data) => {
  arr.arr = data
})
