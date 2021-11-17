import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const iconButtonContainer = classnames()
const IconButton: FC<{ icon: string; url: string }> = ({ icon, url }) => {
  return (
    <div className={iconButtonContainer}>
      <a href={url}>
        <img src={`images/${icon}.svg`} alt={icon} />
      </a>
    </div>
  )
}

export default IconButton
