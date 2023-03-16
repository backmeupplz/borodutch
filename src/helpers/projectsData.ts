import { UserCountData } from 'helpers/userCount'
import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetch from 'unfetch'

export interface CountAggregation {
  _id: number | null
  count: number
}

export type CloudflareData = number[]

export type ProjectCount = {
  deletenudesbot?: number
  shieldy?: number
  goldenBorodutch?: number
  todorant?: number
  mt?: number
  temply?: number
  arbeitBot?: number
  speller?: number
  randy?: number
  banofbot?: number
  tlgcoin?: number
  voicy?: number
  dosu?: number
  checkMyTextBot?: number
  borodutch?: number
  localizer?: number
  postyourstartup?: number
  fondu?: number
  pleaseno?: number
  resetbot?: number
  fixsleep?: number
  botfinder?: number
  borodutchclub?: number
  magicpill?: number
  commoncrypto?: number
  cryptogranny?: number
  nftru?: number
  isbotdown?: number
  videoDownloadBot?: number
  remindme?: number
  essay?: number
  unlovely?: number
  crosscaster?: number
  mintit?: number
  chatgpt?: number
  health?: number
  farcantasy?: number
  lightnftd?: number
}

export interface ProjectsData {
  shieldy?: {
    chatDaily: CountAggregation[]
    chatCount: number
    userCount: number
  }
  deletenudesbot?: {
    chatDaily: CountAggregation[]
    chatCount: number
  }
  tlgcoin?: {
    userDaily: CountAggregation[]
    userCount: number
    coinsCount: number
  }
  banofbot?: {
    userDaily: CountAggregation[]
    userCount: number
    chatDaily: CountAggregation[]
    chatCount: number
    requestDaily: CountAggregation[]
    requestCount: number
  }
  randym?: {
    raffleDaily: CountAggregation[]
    raffleCount: number
    chatDaily: CountAggregation[]
    chatCount: number
  }
  temply?: {
    userDaily: CountAggregation[]
    userCount: number
    templatesCount: number
  }
  arbeitbot?: {
    jobDaily: CountAggregation[]
    jobCount: number
    userDaily: CountAggregation[]
    userCount: number
    website: CloudflareData
  }
  voicy?: {
    stats: {
      responseTime: { [timestamp: number]: number }
      chatCount: number
      voiceCount: number
      hourlyStats: CountAggregation[]
      duration: number
      chatDailyStats: CountAggregation[]
      messageStats: {
        date: string
        count: number
      }[]
    }
    cloudflare: CloudflareData
  }
  fondu?: CloudflareData
  borodutch?: CloudflareData
  pleaseno?: CloudflareData
  botfinder?: CloudflareData
  fixsleep?: CloudflareData
  magicpill?: CloudflareData
  commoncrypto?: CloudflareData
  localizer?: CloudflareData
  postyourstartup?: CloudflareData
  resetbot?: CloudflareData
  goldenBorodutch?: { subCount: number }
  todorant?: {
    db: {
      userDaily: CountAggregation[]
      userCount: number
      todoDaily: CountAggregation[]
      todoCount: number
    }
    cloudflare: CloudflareData
  }
  checkMyTextBot?: {
    userDaily: CountAggregation[]
    userCount: number
  }
  mt?: {
    userDaily: CountAggregation[]
    userCount: number
    orderDaily: CountAggregation[]
    orderCount: number
  }
  userCountSeparate?: ProjectCount
  userCount?: UserCountData
}

export const projectsData = proxy({
  projectsData: fetch(`${baseUrl}/stats`).then(
    (res) => res.json() as Promise<ProjectsData>
  ),
})
