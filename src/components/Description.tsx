import { BodyText, Link } from 'components/Text'
import { FC } from 'react'

// Turns [text](url) into links; split() with two capture groups yields text, label, url, text, ...
function replaceMarkdownLinks(text: string) {
  return text.split(/\[([^\]]+)\]\(([^)]+)\)/).map((part, i, parts) =>
    i % 3 === 0 ? (
      part
    ) : i % 3 === 1 ? (
      <Link key={i} url={parts[i + 1]}>
        {part}
      </Link>
    ) : null
  )
}

const Description: FC<{ description: (string | false | undefined)[] }> = ({
  description,
}) => (
  <>
    {description.filter(Boolean).map((v, i) => (
      <BodyText key={i}>{replaceMarkdownLinks(v as string)}</BodyText>
    ))}
  </>
)

export default Description
