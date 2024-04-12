import { render, screen } from '@testing-library/react'
import Input from './Input'
import Form from '../Form/Form'

describe('<Input />', () => {
  it('should be appear with default params', () => {
    render(
      <Form onSubmit={async () => void 0} initialValues={{}}>
        <Input name={'test'} />
      </Form>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('input')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test')
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Test')
  })

  it('should be appear with custom params', () => {
    render(
      <Form onSubmit={async () => void 0} initialValues={{}}>
        <Input
          name={'test'}
          className={'input mt-5'}
          type="text"
          label={'My Test'}
          placeholder={'My Test'}
        />
      </Form>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('input', 'mt-5')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test')
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'My Test'
    )
  })
})
