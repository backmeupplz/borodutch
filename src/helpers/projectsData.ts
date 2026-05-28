import { UserCountData } from 'helpers/userCount'
import { proxy } from 'valtio'
import baseUrl from 'helpers/baseUrl'
import fetchJson from 'helpers/fetchJson'

export interface CountAggregation {
  _id: number | null
  count: number
}

export type CloudflareData = number[]

export type ProjectCount = {
  pigeon?: number
  myground?: number
  symphony?: number
  friday?: number
  omens?: number
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
  casBanChecker?: number
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
  mintit?: number
  chatgpt?: number
  health?: number
  farcantasy?: number
  lightnftd?: number
}

export interface ProjectCountSummary {
  count: number
  label: string
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
  projectCounts?: Partial<Record<keyof ProjectCount, ProjectCountSummary>>
}

export const projectsData = proxy({
  projectsData: {} as ProjectsData,
})

void fetchJson<ProjectsData>(`${baseUrl}/summary`, {}).then((data) => {
  projectsData.projectsData = data
})

export const projectDetails = proxy({
  failed: {} as { [code: string]: boolean },
  loaded: {} as { [code: string]: boolean },
})

const loadedProjects: { [code: string]: boolean } = {}
const loadingProjects: { [code: string]: boolean } = {}

export function loadProjectData(code: string) {
  if (loadedProjects[code] || loadingProjects[code]) {
    return
  }
  loadingProjects[code] = true
  void fetchJson<ProjectsData>(`${baseUrl}/stats/${code}`, {}).then(
    (details) => {
      loadingProjects[code] = false
      if (Object.keys(details).length) {
        loadedProjects[code] = true
        projectDetails.loaded[code] = true
      } else {
        projectDetails.failed[code] = true
      }
      projectsData.projectsData = {
        ...projectsData.projectsData,
        ...details,
      }
    }
  )
}
