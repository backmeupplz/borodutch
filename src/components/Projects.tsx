import { SubheaderText } from 'components/Text'
import { appStore } from 'stores/AppStore'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Project from 'components/Project'
import projects from 'data/projects'
import showMoreData from 'helpers/showMoreData'

const projectsContainer = classnames('flex', 'flex-col', 'gap-4')
const headerContainer = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)

export default function Projects() {
  const { opened } = useSnapshot(appStore)
  const { showMoreData: showMore } = useSnapshot(showMoreData)
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
      <div className={projectsContainer}>
        {projects.map((project) => (
          <Project key={project.code} project={project} />
        ))}
      </div>
    </section>
  )
}
