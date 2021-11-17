import { SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { classnames } from 'classnames/tailwind'
import Loader from 'components/Loader'
import Project from 'components/Project'
import projects from 'data/projects'

const projectPlaceholderContainer = classnames('pb-4', 'mx-4')
const projectsContainer = classnames('flex', 'flex-col', 'gap-4')

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
  return (
    <>
      <SubheaderText>Projects</SubheaderText>
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
