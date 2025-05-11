/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import EventManagementHome from './pages/User/AnimateHome'

function ProtectedRoute() {
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const isAuthenticated = true
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: path.asHome,
      element: <EventManagementHome />
    }
  ])
  return routeElements
}
