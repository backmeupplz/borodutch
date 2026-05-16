import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetchJson from 'helpers/fetchJson'

export interface UserCountData {
  count: string
  history: string[][]
}

const fallbackUserCount: UserCountData = {
  count: '0',
  history: [],
}

export const userCount = proxy({
  userCount: fallbackUserCount,
})

void fetchJson<UserCountData>(`${baseUrl}/count`, fallbackUserCount).then(
  (data) => {
    userCount.userCount = data
  }
)
