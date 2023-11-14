import React from 'react'
import { Field } from 'formik'
import { classNames } from '../../utils'

type InputProps = {
  type?: string
  name: string
  placeholder?: string
  form?: string
  label?: string
  className?: string
  [key: string]: unknown
}

const Input = ({ name, placeholder, label, ...props }: InputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        id={name}
        name={name}
        placeholder={placeholder || name[0].toUpperCase() + name.slice(1)}
        className={classNames('input', props.className)}
        {...props}
      />
    </>
  )
}

export default Input
