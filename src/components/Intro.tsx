import { BodyText, Link, SubheaderText } from 'components/Text'
import Story from 'components/Story'

export default function Intro() {
  return (
    <>
      <SubheaderText>What I do now</SubheaderText>
      <BodyText>
        I am focused on agentic development: turning vague product work into
        scoped tasks, repo-isolated implementation, automated validation, and
        real QA evidence. The goal is simple: ship useful projects without
        babysitting every step.
      </BodyText>
      <BodyText>
        My current work spans Telegram bots, crypto and trading tools,
        self-hosted infrastructure, and the local automation that keeps those
        projects healthy.
      </BodyText>
      <SubheaderText>Book</SubheaderText>
      <BodyText>
        I also co-authored a productivity book. You can buy it on{' '}
        <Link url="https://book.bdut.ch">the book's website</Link> or{' '}
        <Link url="https://a.co/d/8ALfLVd">Amazon</Link>. I wrote about the
        publishing process on{' '}
        <Link url="https://blog.borodutch.com/heres-how-i-published-my-book">
          my blog
        </Link>{' '}
        too.
      </BodyText>
      <Story />
      <SubheaderText>Ways to contribute</SubheaderText>
      <BodyText>
        In case you want, you can always become a sponsor of my work on{' '}
        <Link url="https://github.com/sponsors/backmeupplz">
          my GitHub Sponsor profile
        </Link>{' '}
        or on{' '}
        <Link url="https://www.buymeacoffee.com/borodutch">
          my Buy Me a Coffee profile
        </Link>
        . I fund all of my projects personally, and the donations help me a lot
        to keep the products free and open. Thank you.
      </BodyText>
    </>
  )
}
