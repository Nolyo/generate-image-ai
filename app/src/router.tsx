import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import ImagePage from 'pages/image-page/Image-page'
import App from 'components/App'
import Auth from 'pages/auth'

// get local storage
const isAuth =
  window.localStorage.getItem('password') ===
  import.meta.env.VITE_PASSWORD_FRONT

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
