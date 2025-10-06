import * as React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import ImagePage from 'pages/image-page/Image-page'
import App from 'components/App'
import Auth from 'pages/auth'

// Composant qui gère la protection de route
function ProtectedRoute() {
  const [isAuth, setIsAuth] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/session', { credentials: 'include' })
        if (!res.ok) {
          setIsAuth(false)
          return
        }
        const data = (await res.json()) as { authenticated: boolean }
        setIsAuth(!!data?.authenticated)
      } catch {
        setIsAuth(false)
      }
    }
    checkSession()
  }, [])

  if (isAuth === null) {
    return <div>Loading...</div>
  }

  return isAuth ? <ImagePage /> : <Navigate to="/auth" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />
  },
  {
    path: '/hello-world',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

export default router
