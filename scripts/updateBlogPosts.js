const fs = require('fs')
const https = require('https')
const path = require('path')

const feedUrl = 'https://blog.borodutch.com/rss/'
const outputPath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts')

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x2019;/g, "'")
    .replace(/&#x201C;/g, '"')
    .replace(/&#x201D;/g, '"')
    .replace(/<[^>]*>/g, '')
    .trim()
}

function truncate(value) {
  const maxLength = 160
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 1)}...`
    : value
}

function getTag(item, tag) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return match ? decodeEntities(match[1]) : ''
}

function fetchFeed() {
  return new Promise((resolve, reject) => {
    https
      .get(feedUrl, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`RSS request failed with ${res.statusCode}`))
          res.resume()
          return
        }

        let body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          body += chunk
        })
        res.on('end', () => resolve(body))
      })
      .on('error', reject)
      .setTimeout(10000, function () {
        this.destroy(new Error('RSS request timed out'))
      })
  })
}

function parsePosts(feed) {
  return [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .slice(0, 5)
    .map((match) => {
      const item = match[1]
      return {
        title: getTag(item, 'title'),
        description: truncate(getTag(item, 'description')),
        link: getTag(item, 'link'),
        date: new Date(getTag(item, 'pubDate')).toISOString(),
      }
    })
    .filter((post) => post.title && post.link && post.date)
}

function renderPosts(posts) {
  const quote = (value) =>
    `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  const renderedPosts = posts
    .map(
      (post) => `  {
    title: ${quote(post.title)},
    description: ${quote(post.description)},
    link: ${quote(post.link)},
    date: ${quote(post.date)},
  }`
    )
    .join(',\n')

  return `export interface BlogPost {
  title: string
  description: string
  link: string
  date: string
}

const blogPosts: BlogPost[] = [
${renderedPosts},
]

export default blogPosts
`
}

async function main() {
  try {
    const posts = parsePosts(await fetchFeed())
    if (posts.length !== 5) {
      throw new Error(`Expected 5 posts, received ${posts.length}`)
    }

    fs.writeFileSync(outputPath, renderPosts(posts))
    console.log(`Updated ${path.relative(process.cwd(), outputPath)}`)
  } catch (error) {
    console.warn(
      `Could not update blog posts from ${feedUrl}; using checked-in fallback. ${error.message}`
    )
  }
}

main()
