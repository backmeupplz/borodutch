import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetchJson from 'helpers/fetchJson'
import normalizeUserCountData, {
  NormalizableUserCountData,
} from 'helpers/normalizeUserCountData'

export type UserCountData = NormalizableUserCountData

const fallbackUserCount: UserCountData = {
  count: '0',
  history: [],
}

export const userCount = proxy({
  loaded: false,
  userCount: fallbackUserCount,
})

void fetchJson<UserCountData>(`${baseUrl}/count`, fallbackUserCount).then(
  (data) => {
    const normalizedData = normalizeUserCountData(data)
    if (!normalizedData) {
      return
    }

    userCount.userCount = normalizedData
    userCount.loaded = true
  }
)
