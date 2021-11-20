import {
  BodyText,
  GradientText,
  Link,
  NumberOfProjectUsersText,
  ProjectSubtitle,
  ProjectTitle,
} from 'components/Text'
import { FC } from 'react'
import { appStore } from 'stores/AppStore'
import { projectsData as baseProjectsData } from 'helpers/projectsData'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
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

  const description = project.description()

  return (
    <div className={container}>
      <div className={projectHeaderContainer}>
        <div className={titleAndNumbersContainer}>
          <a href={project.link} rel="noopener noreferrer" target="_blank">
            <ProjectTitle>{project.title}</ProjectTitle>
          </a>
          {projectsData.userCountSeparate?.[project.code] && (
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
      {Array.isArray(description) ? (
        <>
          {description
            .filter((v) => !!v)
            .map((d, i) => (
              <BodyText key={i}>{d}</BodyText>
            ))}
        </>
      ) : (
        description
      )}
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
