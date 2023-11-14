import React, { PropsWithoutRef, ReactNode, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const FORM_ERROR = 'FORM_ERROR'
export interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: unknown
}

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>['initialValues']
}

function Form<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { initialValues, onSubmit, children, submitText, ...otherProps } = props
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <Formik
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-expect-error */
      validationSchema={toFormikValidationSchema(props.schema)}
      initialValues={initialValues || {}}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}
        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} {...otherProps}>
          {children}

          {formError && (
            <div role="alert" style={{ color: 'red' }}>
              {formError}
            </div>
          )}

          {submitText && (
            <div className="mt-5">
              <button className="button" type="submit" disabled={isSubmitting}>
                {submitText}
              </button>
            </div>
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
