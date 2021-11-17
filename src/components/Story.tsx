import { BodyText, SubheaderText, TextButton } from 'components/Text'
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
        Hi there! My name is Nikita, and I'm a serial product launcher. I'm a
        half developer, half entrepreneur. If I can build something quick and
        efficient, I make it myself. If I cannot (whether I'm not at the right
        level of expertise or don't have time), I delegate tasks to my trusted
        list of contractors.
      </BodyText>
      <BodyText>
        I started as an iOS developer, but over the years, I've mastered
        backend, frontend, Android, React Native development, management,
        hiring, consulting, public speaking and a variety of other soft skills.
        My favorite stack at this time is Node + TypeScript + Koa + Mongo +
        amala on backend, React + TypeScript + Tailwind on frontend, React
        Native + Swift + Kotlin on Mobile, Node + TypeScript + grammY for
        Telegram bots.
      </BodyText>
      {showMore ? (
        <>
          <BodyText>
            My mission is to bring value to the people around me. If I see a
            pain point, I try to fix it as soon as possible. Aside from my main
            tech stack, programming languages I use include Python, Ruby,
            Objective-C, Java, C, C++, Assembly, Bash, Groovy, Dart, JavaScript,
            Solidity and some R. I host all of my servers on dedicated instances
            in the cloud running various Linux distros (mainly Debian based). I
            build hardware solutions for fun based on Raspberry Pi's and connect
            much random stuff to its GPIO. I'm fluent with Vue, React and
            Angular. I'm fond of AI and ML as well as I've built multiple
            blockchain-based solutions. As per databases, I favour MongoDB (and
            PostgreSQL when it just has to be relational) on server and
            WatermelonDB locally — always trying to be a step ahead of the
            current tech.
          </BodyText>

          <BodyText>
            Please, find my contacts, the list of the products I'm most proud of
            with some of their stats, as well as the list of publications on
            this page. Cheers!
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