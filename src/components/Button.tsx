import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

type ButtonProps = {
  onClick: () => void
  title: string
}

const button = classnames(
  'bg-gray-900',
  'hover:bg-gray-300',
  'text-gray-50',
  'hover:text-gray-700',
  'py-2',
  'px-4',
  'rounded-xl',
  'focus:outline-none',
  'mx-1',
  'flex-shrink-0'
)
const Button: FC<ButtonProps> = ({ onClick, title }) => {
  return (
    <button className={button} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
