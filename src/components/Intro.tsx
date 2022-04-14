import { BodyText, Link, SubheaderText } from 'components/Text'
import Story from 'components/Story'

export default function Intro() {
  return (
    <>
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
