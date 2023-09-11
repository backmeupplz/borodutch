import { BodyText, Link, SubheaderText } from 'components/Text'
import Story from 'components/Story'

export default function Intro() {
  return (
    <>
      <SubheaderText>I wrote a book!</SubheaderText>
      <BodyText>
        Can't wait to tell you this — I finally co-authored and published a
        book! You can buy it on{' '}
        <Link url="https://book.bdut.ch">the book's website</Link> or{' '}
        <Link url="https://a.co/d/8ALfLVd">on Amazon</Link>. Curious about how I
        got from zero to a published author? Check out{' '}
        <Link url="https://blog.borodutch.com/heres-how-i-published-my-book">
          my blog post
        </Link>{' '}
        where I describe the process!
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
