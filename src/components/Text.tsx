import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import currentGradient from 'helpers/currentGradient'

const textGradient = classnames(
  'bg-gradient-to-tr',
  'from-accent-start',
  currentGradient.length > 2 ? 'via-accent-via' : undefined,
  'to-accent-end',
  'text-transparent',
  'bg-clip-text'
)
export const GradientText: FC = ({ children }) => (
  <span className={textGradient}>{children}</span>
)

const auxiliaryText = classnames(
  'text-white',
  'text-lg',
  'opacity-60',
  'font-semibold'
)
export const AuxiliaryText: FC = ({ children }) => (
  <p className={auxiliaryText}>{children}</p>
)

const headerText = classnames(
  textGradient,
  'font-bold',
  'text-4xl',
  'md:text-7xl',
  'py-8'
)
export const HeaderText: FC = ({ children }) => (
  <p className={headerText}>{children}</p>
)

const subheaderText = classnames(
  textGradient,
  'font-bold',
  'text-2xl',
  'md:text-3xl',
  'pt-8',
  'pb-4'
)
export const SubheaderText: FC = ({ children }) => (
  <p className={subheaderText}>{children}</p>
)

const numberOfUsersText = classnames(
  'text-white',
  'font-bold',
  'text-4xl',
  'opacity-80'
)
export const NumberOfUsersText: FC = ({ children }) => (
  <p className={numberOfUsersText}>{children}</p>
)

const numberOfUsersAuxiliaryText = classnames(
  'text-white',
  'font-medium',
  'text-3xl',
  'opacity-50',
  'pb-4'
)
export const NumberOfUsersAuxiliaryText: FC = ({ children }) => (
  <p className={numberOfUsersAuxiliaryText}>{children}</p>
)

const bodyText = classnames('text-white', 'opacity-90', 'mb-4')
export const BodyText: FC = ({ children }) => (
  <p className={bodyText}>{children}</p>
)

const link = classnames(textGradient)
export const Link: FC<{ url: string }> = ({ url, children }) => (
  <a className={link} href={url} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
)

const textButton = classnames(textGradient)
export const TextButton: FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => (
  <button className={textButton} onClick={onClick}>
    {children}
  </button>
)

const projectTitle = classnames('text-white', 'text-2xl')
export const ProjectTitle: FC = ({ children }) => (
  <p className={projectTitle}>{children}</p>
)

const projectSubtitle = classnames('text-white', 'text-xl', 'mb-2')
export const ProjectSubtitle: FC = ({ children }) => (
  <p className={projectSubtitle}>{children}</p>
)

const numberOfProjectUsersText = classnames('text-white', 'opacity-50')
export const NumberOfProjectUsersText: FC = ({ children }) => (
  <p className={numberOfProjectUsersText}>{children}</p>
)

const footer = classnames(
  'text-white',
  'opacity-80',
  'text-lg',
  'text-center',
  'my-8'
)
export const Footer: FC = ({ children }) => <p className={footer}>{children}</p>
