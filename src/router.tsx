import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import Example from 'pages/example'
import ImagePage from 'pages/imagePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ImagePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/hello-world',
    element: <Example />,
    errorElement: <ErrorPage />
  }
])

export default router
