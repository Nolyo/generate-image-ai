import { render, screen } from '@testing-library/react'
import Link from './Link'

const url = 'https://google.com'
describe('<Link />', () => {
  it('should be appear with default params', () => {
    render(<Link />)

    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveClass('link')
    expect(screen.getByRole('link')).toHaveAttribute('href', '#')
    expect(screen.getByRole('link')).toHaveAttribute('target', 'self')
  })

  it('should be appear with custom params', () => {
    render(
      <Link
        href={url}
        text="Click here"
        target="_blank"
        className="mt-5"
        type="button"
      />
    )
    expect(screen.getByRole('link', { name: 'Click here' })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveClass('button mt-5')
    expect(screen.getByRole('link')).toHaveAttribute('href', url)
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })
})
