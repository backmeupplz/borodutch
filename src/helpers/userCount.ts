import { proxy } from 'valtio'
import fetch from 'unfetch'

export interface UserCountData {
  count: string
  history: string[][]
}

export const userCount = proxy({
  userCount: fetch('https://stats.borodutch.com/count').then(
    (res) => res.json() as Promise<UserCountData>
  ),
})
