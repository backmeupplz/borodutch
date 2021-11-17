import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import currentGradient from 'helpers/currentGradient'

const loader = (line?: boolean) =>
  classnames(
    'animate-pulse',
    'rounded-full',
    'bg-gradient-to-tr',
    'from-accent-start',
    currentGradient.length > 2 ? 'via-accent-via' : undefined,
    'to-accent-end',
    line ? 'h-2' : 'h-4',
    line ? 'w-full' : 'w-24',
    'my-3'
  )

const Loader: FC<{ line?: boolean }> = ({ line }) => {
  return <div className={loader(line)} />
}

export default Loader
