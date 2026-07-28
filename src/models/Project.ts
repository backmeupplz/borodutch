import { ChartData } from 'react-frappe-charts'

export default interface Project {
  title: string
  code: string
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
