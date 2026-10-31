import { NumberOfProjectUsersText, SubheaderText } from 'components/Text'
import { appStore } from 'stores/AppStore'
import { classnames } from 'classnames/tailwind'
import { projectsData } from 'helpers/projectsData'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Project from 'components/Project'
import formatNumber from 'helpers/formatNumber'
import projects from 'data/projects'
import showMoreData from 'helpers/showMoreData'

const projectsContainer = classnames('flex', 'flex-col', 'gap-4')
const totals = classnames('-mt-2', 'mb-4')
const headerContainer = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)

export default function Projects() {
  const { opened } = useSnapshot(appStore)
  const { showMoreData: showMore } = useSnapshot(showMoreData)
  const { github } = useSnapshot(projectsData).projectsData
  return (
    <section>
      <div className={headerContainer}>
        <SubheaderText>Projects</SubheaderText>
        {(!showMore || Object.values(opened).some(Boolean)) && (
          <Button
            onClick={() => {
              if (!showMoreData.showMoreData) {
                showMoreData.showMoreData = true
              } else {
                appStore.opened = {}
              }
            }}
            title={showMore ? 'Hide all stats' : 'Chart full history'}
          />
        )}
      </div>
      {/* Always rendered so the cards don't jump when the numbers land */}
      <div className={totals}>
        <NumberOfProjectUsersText>
          {github
            ? `${formatNumber(github.stars)} GitHub stars on ${formatNumber(
                github.repos
              )} open-source repos · ${formatNumber(
                github.downloads
              )} release and package downloads`
            : '\u00a0'}
        </NumberOfProjectUsersText>
      </div>
      <div className={projectsContainer}>
        {projects.map((project) => (
          <Project key={project.code} project={project} />
        ))}
      </div>
    </section>
  )
}
