import { ChartData } from 'react-frappe-charts'
import type { ProjectCount } from 'helpers/projectsData'

type ProjectCode = keyof ProjectCount | 'veydrift' | 'plainwallet'

export default interface Project {
  title: string
  code: ProjectCode
  link: string
  publications?: {
    name: string
    link: string
  }[]
  description: () => (string | false)[]
  charts?: () => {
    title: string
    data: ChartData
  }[]
}
