import { Link, ProjectSubtitle, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { dateLabel } from 'helpers/chartSeries'
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
const descriptionText = classnames('text-white', 'opacity-70', 'text-sm')
const dateText = classnames('text-white', 'opacity-50', 'text-sm', 'mb-1')

export default function BlogPosts() {
  return (
    <>
      <SubheaderText>Latest writing</SubheaderText>
      <div className={postsContainer}>
        {blogPosts.slice(0, 3).map((post) => (
          <article className={postContainer} key={post.link}>
            <p className={dateText}>{dateLabel(post.date)}</p>
            <ProjectSubtitle>
              <Link url={post.link}>{post.title}</Link>
            </ProjectSubtitle>
            <p className={descriptionText}>{post.description}</p>
          </article>
        ))}
      </div>
    </>
  )
}
