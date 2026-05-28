import type { ProjectCount, ProjectsData } from 'helpers/projectsData'

export interface ProjectSummaryStat {
  count: number
  label: string
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function stat(count: unknown, label: string): ProjectSummaryStat | undefined {
  return isPositiveNumber(count) ? { count, label } : undefined
}

export default function projectSummaryStat(
  projectsData: ProjectsData,
  code: string
): ProjectSummaryStat | undefined {
  const summaryStat = projectsData.projectCounts?.[code as keyof ProjectCount]
  if (summaryStat && isPositiveNumber(summaryStat.count)) {
    return summaryStat
  }

  const separateCounts = projectsData.userCountSeparate as
    | { [code: string]: number | undefined }
    | undefined
  const separateCount = separateCounts?.[code]
  if (isPositiveNumber(separateCount)) {
    return { count: separateCount, label: 'users' }
  }

  switch (code) {
    case 'voicy':
      return stat(projectsData.voicy?.stats?.chatCount, 'chats')
    case 'banofbot':
      return (
        stat(projectsData.banofbot?.userCount, 'users') ||
        stat(projectsData.banofbot?.chatCount, 'chats')
      )
    case 'randy':
      return stat(projectsData.randym?.chatCount, 'chats')
    case 'todorant':
      return stat(projectsData.todorant?.db?.userCount, 'users')
    case 'shieldy':
      return (
        stat(projectsData.shieldy?.userCount, 'users') ||
        stat(projectsData.shieldy?.chatCount, 'chats')
      )
    case 'temply':
      return stat(projectsData.temply?.userCount, 'users')
    default:
      return undefined
  }
}
