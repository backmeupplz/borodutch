import { FC } from 'react'
import {
  GradientText,
  Link,
  NumberOfProjectUsersText,
  ProjectSubtitle,
  ProjectTitle,
} from 'components/Text'
import { appStore } from 'stores/AppStore'
import { projectsData as baseProjectsData } from 'helpers/projectsData'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ArrowButton from 'components/ArrowButton'
import Button from 'components/Button'
import Chart from 'components/Chart'
import Project from 'models/Project'
import formatNumber from 'helpers/formatNumber'

const container = classnames(
  'flex',
  'flex-col',
  'border',
  'border-opacity-25',
  'p-4',
  'rounded-xl'
)
const projectHeaderContainer = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-start',
  'mb-4'
)
const titleAndNumbersContainer = classnames('flex', 'flex-col')
const titleContainer = classnames('flex', 'flex-row', 'gap-2', 'items-center')
const publicationList = classnames('list-inside', 'list-disc')
const chartsContainer = classnames(
  'flex',
  'flex-row',
  'flex-wrap',
  'items-stretch',
  'justify-center'
)
const chartContainer = classnames(
  'flex',
  'flex-col',
  'items-center',
  'w-full',
  'md:w-1/2'
)

const ProjectComponent: FC<{ project: Project }> = ({ project }) => {
  const appStoreSnapshot = useSnapshot(appStore)
  const opened = appStoreSnapshot.opened[project.code]
  const { projectsData } = useSnapshot(baseProjectsData)

  return (
    <div className={container}>
      <div className={projectHeaderContainer}>
        <div className={titleAndNumbersContainer}>
          <div className={titleContainer}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ArrowButton url={project.link} />
          </div>
          {projectsData.userCountSeparate[project.code] && (
            <NumberOfProjectUsersText>
              {formatNumber(projectsData.userCountSeparate[project.code])} users
            </NumberOfProjectUsersText>
          )}
        </div>
        {(project.publications?.length || project.charts?.().length) && (
          <Button
            onClick={() => {
              appStore.opened[project.code] = !appStore.opened[project.code]
            }}
            title={
              appStoreSnapshot.opened[project.code]
                ? 'Hide stats'
                : 'Show stats'
            }
          />
        )}
      </div>
      {project.description()}
      {opened && project.charts && (
        <div className={chartsContainer}>
          {project.charts().map((chart) => (
            <div className={chartContainer} key={chart.title}>
              <Chart title={chart.title} data={chart.data} />
            </div>
          ))}
        </div>
      )}
      {opened && project.publications?.length && (
        <>
          <ProjectSubtitle>Publications</ProjectSubtitle>
          <GradientText>
            <ul className={publicationList}>
              {project.publications.map((publication) => (
                <li key={publication.name}>
                  <Link url={publication.link}>{publication.name}</Link>
                </li>
              ))}
            </ul>
          </GradientText>
        </>
      )}
    </div>
  )
}

export default ProjectComponent
