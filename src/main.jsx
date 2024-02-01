import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Summary from './pages/Summary.jsx'
import Form from './pages/form.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/Summary/:id',
        element:<Summary/>
      },
      {
        path:'/Form/:id',
        element:<Form/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
