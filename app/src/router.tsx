import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import ImagePage from 'pages/image-page/Image-page'
import App from 'components/App'
import Auth from 'pages/auth'

// Vérifie la session côté serveur
async function checkSession(): Promise<boolean> {
  try {
    const res = await fetch('/api/session', { credentials: 'include' })
    if (!res.ok) return false
    const data = (await res.json()) as { authenticated: boolean }
    return !!data?.authenticated
  } catch {
    return false
  }
}

const isAuth = await checkSession()

const router = createBrowserRouter([
  {
    path: '/',
    element: isAuth ? <ImagePage /> : <Auth />,
    errorElement: <ErrorPage />
  },
  {
    path: '/hello-world',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

export default router
