import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import ImagePage from 'pages/image-page/Image-page'
import App from 'components/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ImagePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/hello-world',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

export default router
