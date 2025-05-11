/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import EventManagementHome from './pages/User/AnimateHome'

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: path.asHome,
      element: <EventManagementHome />
    }
  ])
  return routeElements
}
