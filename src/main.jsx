import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Permissions from './pages/Permissions/Permissions.jsx'
import BasePage from './pages/Bases/BasePage.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([{
  path: '/',
  element: <Login />,
  errorElement: <NotFound />
}, {
  path: '/dashboard',
  element: <BasePage />,
  children: [{
    path:"permissions",
    element: <Permissions />
  }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
