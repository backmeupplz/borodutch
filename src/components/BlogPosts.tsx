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
        {blogPosts.slice(0, 3).map((post) => (
          <article className={postContainer} key={post.link}>
            <p className={dateText}>{formatDate(post.date)}</p>
            <ProjectSubtitle>
              <Link url={post.link}>{post.title}</Link>
            </ProjectSubtitle>
          </article>
        ))}
      </div>
    </>
  )
}
