import { FC } from 'react'

const IconButton: FC<{ icon: string; url: string }> = ({ icon, url }) => {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank" aria-label={icon}>
      <img src={`/images/${icon}.svg`} alt="" width={30} height={30} />
    </a>
  )
}

export default IconButton
