import type { ProjectCount, ProjectsData } from 'helpers/projectsData'

type ProjectCode =
  | keyof ProjectCount
  | 'veydrift'
  | 'plainwallet'
  | 'agentboard'
  | 'absplus'
  | 'meshplus'

export interface ChartSeries {
  labels: string[]
  values: number[]
}

export default interface Project {
  title: string
  code: ProjectCode
  link: string
  // Wide 1.91:1 preview (OG card or screenshot) or a square avatar, both in public/images/projects
  image?: 'wide' | 'icon'
  publications?: {
    name: string
    link: string
  }[]
  description: (data: ProjectsData) => (string | false | undefined)[]
  charts?: (
    data: ProjectsData,
    showMore: boolean
  ) => {
    title: string
    data: ChartSeries
  }[]
}
