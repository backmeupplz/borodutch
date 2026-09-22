import { Link, ProjectSubtitle, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import blogPosts from 'data/blogPosts'

const postsContainer = classnames('flex', 'flex-col', 'gap-2')
const postContainer = classnames(
  'flex',
  'flex-col',
  'border',
  'border-opacity-25',
  'p-3',
  'rounded-xl'
)
const dateText = classnames('text-white', 'opacity-50', 'text-sm', 'mb-1')
const excerptText = classnames('text-white', 'opacity-80', 'text-sm')

const latestPosts = [...blogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogPosts() {
  return (
    <>
      <SubheaderText>Latest writing</SubheaderText>
      <div className={postsContainer}>
        {latestPosts.map((post) => (
          <article className={postContainer} key={post.link}>
            <p className={dateText}>{formatDate(post.date)}</p>
            <ProjectSubtitle>
              <Link url={post.link}>{post.title}</Link>
            </ProjectSubtitle>
            <p className={excerptText}>{post.description}</p>
          </article>
        ))}
      </div>
    </>
  )
}
