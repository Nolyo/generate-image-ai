import React from 'react'
import { classNames } from 'utils'

type LinkProps = {
  href?: string
  text?: string
  children?: React.ReactNode
  target?: string
  className?: string
}
const Link = ({
  href = '#',
  children,
  text,
  target = 'self',
  className
}: LinkProps) => {
  return (
    <a href={href} className={classNames('link', className)} target={target}>
      {text && text}
      {children && children}
    </a>
  )
}

export default Link
