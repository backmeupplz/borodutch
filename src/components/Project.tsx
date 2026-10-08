import {
  BodyText,
  GradientText,
  Link,
  NumberOfProjectUsersText,
  ProjectSubtitle,
  ProjectTitle,
} from 'components/Text'
import { FC, useEffect } from 'react'
import { appStore } from 'stores/AppStore'
import {
  projectsData as baseProjectsData,
  loadProjectData,
  projectDetails,
} from 'helpers/projectsData'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Chart from 'components/Chart'
import Description from 'components/Description'
import Loader from 'components/Loader'
import Project from 'models/Project'
import formatNumber from 'helpers/formatNumber'
import projectSummaryStat from 'helpers/projectSummaryStat'
import showMoreData from 'helpers/showMoreData'

const container = classnames(
  'flex',
  'flex-col',
  'border',
  'border-opacity-25',
  'p-4',
  'rounded-xl'
)
const overviewContainer = classnames(
  'flex',
  'flex-col-reverse',
  'md:flex-row',
  'gap-4'
)
const textContainer = classnames('flex-1', 'min-w-0')
const projectHeaderContainer = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-start',
  'mb-4'
)
const titleRow = classnames('flex', 'flex-row', 'items-center', 'gap-3')
const icon = classnames('w-10', 'h-10', 'rounded-full', 'flex-shrink-0')
const previewLink = classnames(
  'block',
  'md:w-72',
  'flex-shrink-0',
  'self-start'
)
const preview = classnames(
  'w-full',
  'rounded-lg',
  'border',
  'border-opacity-25',
  'object-cover'
)
const publicationList = classnames('list-inside', 'list-disc')
const chartsContainer = classnames(
  'grid',
  'grid-cols-1',
  'md:grid-cols-2',
  'gap-x-8',
  'mt-2'
)

// Imported through Vite so each image gets a content-hashed URL: a changed
// image is never served from a stale browser or Cloudflare cache
const images = import.meta.globEager('../assets/projects/*.webp')
const imageUrl = (project: Project) =>
  images[`../assets/projects/${project.code}.webp`]?.default as string

const ProjectComponent: FC<{ project: Project }> = ({ project }) => {
  const opened = useSnapshot(appStore).opened[project.code]
  const { failed, loaded } = useSnapshot(projectDetails)
  const { projectsData } = useSnapshot(baseProjectsData)
  const { showMoreData: showMore } = useSnapshot(showMoreData)
  const projectStat = projectSummaryStat(projectsData, project.code)
  const detailFailed = failed[project.code]
  const detailsLoaded = loaded[project.code]
  const charts =
    opened && detailsLoaded && project.charts?.(projectsData, showMore)

  useEffect(() => {
    if (opened && project.charts) {
      loadProjectData(project.code)
    }
  }, [opened, project.charts, project.code])

  return (
    <article className={container}>
      <div className={overviewContainer}>
        <div className={textContainer}>
          <div className={projectHeaderContainer}>
            <div className={titleRow}>
              {project.image === 'icon' && (
                <img
                  className={icon}
                  src={imageUrl(project)}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                />
              )}
              <div>
                <a
                  href={project.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ProjectTitle>{project.title}</ProjectTitle>
                </a>
                {projectStat && (
                  <NumberOfProjectUsersText>
                    {formatNumber(projectStat.count)} {projectStat.label}
                  </NumberOfProjectUsersText>
                )}
              </div>
            </div>
            {(project.publications?.length || project.charts) && (
              <Button
                onClick={() => {
                  appStore.opened[project.code] = !appStore.opened[project.code]
                }}
                title={`${opened ? 'Hide' : 'Show'} ${
                  project.charts ? 'stats' : 'more'
                }`}
              />
            )}
          </div>
          <Description description={project.description(projectsData)} />
        </div>
        {project.image === 'wide' && (
          <a
            className={previewLink}
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={preview}
              style={{ aspectRatio: '1200 / 630' }}
              src={imageUrl(project)}
              alt={`${project.title} preview`}
              width={760}
              height={399}
              loading="lazy"
              decoding="async"
            />
          </a>
        )}
      </div>
      {opened && project.charts && !detailsLoaded && !detailFailed && (
        <Loader />
      )}
      {opened && project.charts && !detailsLoaded && detailFailed && (
        <BodyText>Stats are unavailable right now, try again later.</BodyText>
      )}
      {charts && (
        <div className={chartsContainer}>
          {charts.map((chart) => (
            <Chart key={chart.title} title={chart.title} data={chart.data} />
          ))}
        </div>
      )}
      {opened && !!project.publications?.length && (
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
    </article>
  )
}

export default ProjectComponent
