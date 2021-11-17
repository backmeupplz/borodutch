import { CSSProperties, FC } from 'react'
import { classnames } from 'classnames/tailwind'
import currentGradient from 'helpers/currentGradient'

const root = classnames(
  'container',
  'mx-auto',
  'pb-10',
  'max-w-5xl',
  'pt-4',
  'px-4',
  'bg-black'
)
const Root: FC = ({ children }) => {
  return (
    <div
      className={root}
      style={
        {
          '--accent-start': currentGradient[0],
          '--accent-via':
            currentGradient.length > 2 ? currentGradient[1] : '#FFF',
          '--accent-end': currentGradient[currentGradient.length > 2 ? 2 : 1],
        } as unknown as CSSProperties
      }
    >
      {children}
    </div>
  )
}

export default Root
