import { BodyText, Link, SubheaderText } from 'components/Text'
import Story from 'components/Story'

export default function Intro() {
  return (
    <>
      <SubheaderText>I wrote a book!</SubheaderText>
      <BodyText>
        Can't wait to tell you this — I finally co-authored and published a
        book! You can buy it on{' '}
        <Link url="https://book.bdut.ch">the book's website</Link>. Note that
        it's written and published in Russian, and the English edition is
        scheduled to be published sometime in 2023.
      </BodyText>
      <Story />
      <SubheaderText>Ways to contribute</SubheaderText>
      <BodyText>
        In case if you want, you can always become a sponsor of my work on{' '}
        <Link url="https://github.com/sponsors/backmeupplz">
          my GitHub Sponsor profile
        </Link>{' '}
        or on{' '}
        <Link url="https://www.buymeacoffee.com/borodutch">
          my Buy Me a Coffee profile
        </Link>
        . I fund all of my projects personally and the donations help me a lot
        to keep the products free and open. Thank you.
      </BodyText>
    </>
  )
}
