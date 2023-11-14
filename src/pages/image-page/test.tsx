import { render, screen } from '@testing-library/react'

import ImagePage from './Image-page'

describe.skip('<ImagePage />', () => {
  it('should render the ImagePage', () => {
    const { container } = render(<ImagePage />)

    expect(
      screen.getByRole('heading', {
        name: /Your Logo!/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Generate your own images, write your own text and let the AI generate the rest./i
      )
    ).toBeInTheDocument()

    expect(screen.getByRole('textbox')).toBeInTheDocument()

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'What do you want to generate?'
    )

    expect(screen.getByRole('textbox')).toHaveClass('input')

    expect(
      screen.getByRole('link', {
        name: /Generate/i
      })
    ).toBeInTheDocument()

    expect(screen.getByRole('img')).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
