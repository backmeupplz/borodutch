import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const container = classnames(
  'p-2',
  'rounded-full',
  'hover:bg-gray-900',
  'text-gray-50'
)

const ArrowButton: FC<{ url: string }> = ({ url }) => (
  <a href={url} rel="noopener noreferrer" target="_blank">
    <div className={container}>
      <img src="images/arrow.svg" alt="go to" />
    </div>
  </a>
)

export default ArrowButton
