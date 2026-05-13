import { BodyText, Link, ProjectSubtitle, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import blogPosts from 'data/blogPosts'

const postsContainer = classnames('flex', 'flex-col', 'gap-4')
const postContainer = classnames(
  'flex',
  'flex-col',
  'border',
  'border-opacity-25',
  'p-4',
  'rounded-xl'
)
const dateText = classnames('text-white', 'opacity-50', 'text-sm', 'mb-2')

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
        {blogPosts.map((post) => (
          <article className={postContainer} key={post.link}>
            <p className={dateText}>{formatDate(post.date)}</p>
            <ProjectSubtitle>
              <Link url={post.link}>{post.title}</Link>
            </ProjectSubtitle>
            {post.description && <BodyText>{post.description}</BodyText>}
          </article>
        ))}
      </div>
    </>
  )
}
