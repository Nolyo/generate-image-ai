import React from 'react'
import { classNames } from 'utils'

type LinkProps = {
  href?: string
  text?: string
  children?: React.ReactNode
  className?: string
  target?: string
}
const LinkButton = (props: LinkProps) => {
  const { href = '#', children, text, className, target = 'self' } = props

  return (
    <a href={href} className={classNames('button', className)} target={target}>
      {text && text}
      {children && children}
    </a>
  )
}

export default LinkButton
