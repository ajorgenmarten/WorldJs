import { createBrowserRouter, RouteObject } from 'react-router'
import { ROUTES } from './Routes'
import { DashboardPage } from '@renderer/Modules/Dashboard'
import AddStaticService from '@renderer/Modules/StaticService/Pages'
import AddService from '@renderer/Modules/Service/Pages'

const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />
  },
  {
    path: ROUTES.ADD_STATIC,
    element: <AddStaticService />
  },
  {
    path: ROUTES.ADD_SERVICE,
    element: <AddService />
  }
]

export default createBrowserRouter(routes)
