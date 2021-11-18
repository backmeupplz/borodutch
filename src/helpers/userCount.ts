import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetch from 'unfetch'

export interface UserCountData {
  count: string
  history: string[][]
}

export const userCount = proxy({
  userCount: fetch(`${baseUrl}/count`).then(
    (res) => res.json() as Promise<UserCountData>
  ),
})
