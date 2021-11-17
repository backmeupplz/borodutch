import { BodyText, Link, SubheaderText } from 'components/Text'
import Story from 'components/Story'

export default function Intro() {
  return (
    <>
      <SubheaderText>Do you invest in startups?</SubheaderText>
      <BodyText>
        If you do and thought of coming to this page frequently to check on my
        progress, worry no more! I've created a blog specifically for you —{' '}
        <Link url="https://invest.borodutch.com">Borodutch Invest Updates</Link>
        . Subscribe there and receive my monthly update with all the vital
        things and metrics once a month. User growth, insights from my projects'
        data, new ideas and updates on the things I'm launching. Even investment
        opportunities and new partnerships! I promise, just one email a month,
        no spam.
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
