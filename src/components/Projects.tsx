import { SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { appStore } from 'stores/AppStore'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Loader from 'components/Loader'
import Project from 'components/Project'
import projects from 'data/projects'

const projectPlaceholderContainer = classnames('pb-4', 'mx-4')
const projectsContainer = classnames('flex', 'flex-col', 'gap-4')
const headerContainer = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)

function Loaders() {
  return (
    <>
      {Array(projects.length)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={projectPlaceholderContainer}>
            <Loader />
            <Loader line />
            <Loader line />
            <Loader line />
            <Loader line />
          </div>
        ))}
    </>
  )
}

export default function Projects() {
  const appStoreSnapshot = useSnapshot(appStore)
  return (
    <>
      <div className={headerContainer}>
        <SubheaderText>Projects</SubheaderText>
        {Object.keys(appStoreSnapshot.opened).length > 0 && (
          <Button
            onClick={() => {
              appStore.opened = {}
            }}
            title="Hide all stats"
          />
        )}
      </div>
      <Suspense fallback={<Loaders />}>
        <div className={projectsContainer}>
          {projects.map((project) => (
            <Project key={project.code} project={project} />
          ))}
        </div>
      </Suspense>
    </>
  )
}
