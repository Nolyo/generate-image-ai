import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import 'index.css'
import router from 'router'

const container = document.getElementById('root') as HTMLDivElement

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
