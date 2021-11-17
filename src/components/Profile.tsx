import {
  AuxiliaryText,
  BodyText,
  HeaderText,
  Link,
  NumberOfUsersAuxiliaryText,
  NumberOfUsersText,
} from 'components/Text'
import { Suspense } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import { userCount } from 'helpers/userCount'
import IconButton from 'components/IconButton'
import Loader from 'components/Loader'
import currentGradient from 'helpers/currentGradient'
import formatNumber from 'helpers/formatNumber'

const profileContainer = classnames(
  'flex',
  'flex-row',
  'justify-center',
  'flex-wrap',
  'items-center',
  'gap-12'
)
const profileTextContainer = classnames('flex', 'flex-col', 'flex-1')
const imageContainer = classnames('relative', 'overflow-hidden')
const circle = classnames(
  'w-72',
  'h-72',
  'sm:w-96',
  'sm:h-96',
  'rounded-full',
  'bg-gradient-to-tr',
  currentGradient.length > 2 ? 'via-accent-via' : undefined,
  'from-accent-start',
  'to-accent-end'
)
const profileImage = classnames('absolute', 'inset-x-0', 'inset-y-4')
const imageOverlay = classnames('absolute', 'inset-0')
const socialButtonsContainer = classnames(
  'flex',
  'flex-row',
  'mt-4',
  'space-x-4'
)

function NumberOfUsers() {
  const userCountSnapshot = useSnapshot(userCount)
  return (
    <NumberOfUsersText>
      {formatNumber(userCountSnapshot.userCount.count)}
    </NumberOfUsersText>
  )
}

export default function Profile() {
  return (
    <div className={profileContainer}>
      <div className={profileTextContainer}>
        <AuxiliaryText>borodutch</AuxiliaryText>
        <HeaderText>Nikita Kolmogorov</HeaderText>
        <Suspense fallback={<Loader />}>
          <NumberOfUsers />
        </Suspense>
        <NumberOfUsersAuxiliaryText>
          people used my apps today
        </NumberOfUsersAuxiliaryText>
        <BodyText>
          Updated daily. Curious how I calculated this number? Check out the
          code{' '}
          <Link url="https://github.com/backmeupplz/borodutch-stats/blob/master/src/helpers/userCount.ts">
            here
          </Link>
          . Careful: it's not the prettiest code I've written.
        </BodyText>
        <div className={socialButtonsContainer}>
          <IconButton icon="telegram" url="https://t.me/borodutch" />
          <IconButton icon="github" url="https://github.com/backmeupplz" />
          <IconButton
            icon="linkedin"
            url="https://www.linkedin.com/in/nikitakolmogorov"
          />
          <IconButton icon="email" url="mailto:n@borodutch.com" />
          <IconButton icon="facebook" url="https://fb.me/borodutch" />
        </div>
      </div>
      <div className={imageContainer}>
        <div className={circle} />
        <div className={profileImage}>
          <img src="/images/avatar.webp" alt="avatar" />
        </div>
        <div
          className={imageOverlay}
          style={{
            background:
              'linear-gradient(170deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 90%)',
          }}
        />
      </div>
    </div>
  )
}
