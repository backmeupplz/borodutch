import { BodyText, Link, SubheaderText, TextButton } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useState } from 'react'

const storyContainer = (extraBottomPadding: boolean) =>
  classnames('relative', extraBottomPadding ? 'pb-2' : undefined)
const fade = classnames(
  'absolute',
  'inset-0',
  'w-full',
  'h-full',
  'bg-gradient-to-t',
  'from-black',
  'via-transparent'
)
const showMoreContainer = classnames(
  'absolute',
  'bottom-0',
  'w-full',
  'flex',
  'flex-row',
  'items-end',
  'justify-center'
)

export default function Story() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className={storyContainer(!showMore)}>
      <SubheaderText>My story</SubheaderText>
      <BodyText>
        Hi there! My name is Nikita, and I'm a serial product launcher. I'm half
        developer, half entrepreneur.
      </BodyText>
      <BodyText>
        I started as an iOS developer. Over the years, I've mastered backend,
        frontend, Android, React Native development, management, hiring,
        consulting, public speaking, and other soft skills. You can find my
        up-to-date tech stack in{' '}
        <Link url="https://templates.borodutch.com">
          the list of my code templates
        </Link>
        .
      </BodyText>
      {showMore ? (
        <>
          <BodyText>
            My mission is to bring value to the people around me. If I see a
            pain point, I try to fix it as soon as possible. Aside from my main
            tech stack, programming languages I use include Python, Ruby,
            Objective-C, Java, C, C++, Assembly, Bash, Groovy, Dart, JavaScript,
            Solidity, Circom, and some R. I host all of my servers on dedicated
            instances in the cloud running various Linux distros (mainly Debian
            based). I build hardware solutions for fun based on Raspberry Pi's
            and connect much random stuff to its GPIO. I'm fluent in Vue, React,
            and Angular. I'm fond of AI, ML, web3, and social. As per databases,
            I favor MongoDB (and PostgreSQL when it just has to be relational)
            on the server and WatermelonDB locally — always trying to be a step
            ahead of the current tech.
          </BodyText>
          <BodyText>
            Please, find my contacts, the list of the products I'm most proud of
            with some of their stats, and the list of publications on this page.
            Cheers!
          </BodyText>
        </>
      ) : (
        <>
          <div className={fade} />
          <div className={showMoreContainer}>
            <TextButton onClick={() => setShowMore(true)}>Show more</TextButton>
          </div>
        </>
      )}
    </div>
  )
}
