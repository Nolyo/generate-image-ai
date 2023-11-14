import { useRouteError } from 'react-router-dom'
import LinkButton from 'components/Link/LinkButton'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const error: { statusText?: string; message?: string } = useRouteError()
  console.error(error)

  return (
    <div className="container-v" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <LinkButton href="/" text="Go back home" className="mt-5" />
    </div>
  )
}
