import React from 'react'
import { classNames } from 'utils'

type LinkProps = {
  href?: string
  text?: string
  children?: React.ReactNode
  target?: string
  className?: string
  type?: string
}
const Link = ({
  href = '#',
  children,
  text,
  target = 'self',
  className,
  type = 'link'
}: LinkProps) => {
  return (
    <a
      href={href}
      className={classNames(type === 'link' ? 'link' : 'button', className)}
      target={target}
    >
      {text && text}
      {children && children}
    </a>
  )
}

export default Link
