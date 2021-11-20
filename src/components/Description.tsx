import { BodyText, Link } from 'components/Text'
import { FC } from 'react'

function replaceMarkdownLinks(text: string) {
  const links = [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
  if (!links.length) {
    return text
  }
  const result = [] as JSX.Element[]
  for (let i = links.length - 1; i >= 0; i--) {
    const link = links[i]
    if (!link.index) {
      continue
    }
    const textOnRight = text.substr(link.index + link[0].length)
    if (textOnRight) {
      result.push(<>{textOnRight}</>)
      text = text.substr(0, link.index + link[0].length)
    }
    result.push(<Link url={link[2]}>{link[1]}</Link>)
    text = text.substr(0, link.index)
    if (i === 0) {
      result.push(<>{text}</>)
    }
  }
  return result.reverse()
}

const Description: FC<{ description: (string | false)[] }> = ({
  description,
}) => {
  const sanitizedDescription = description.filter((v) => !!v) as string[]
  return (
    <>
      {sanitizedDescription.map((v, i) => (
        <BodyText key={i}>{replaceMarkdownLinks(v)}</BodyText>
      ))}
    </>
  )
}

export default Description
