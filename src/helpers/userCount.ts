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
  loaded: false,
  userCount: fallbackUserCount,
})

function hasUserCountData(data: UserCountData) {
  return data.history.length > 0
}

void fetchJson<UserCountData>(`${baseUrl}/count`, fallbackUserCount).then(
  (data) => {
    if (!hasUserCountData(data)) {
      return
    }

    userCount.userCount = data
    userCount.loaded = true
  }
)
