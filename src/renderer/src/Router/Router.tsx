import { createBrowserRouter, RouteObject } from 'react-router'
import { ROUTES } from './Routes'
import { Dashboard } from '@renderer/Modules/Dashboard'
import { AddStaticService } from '@renderer/Modules/StaticService/Pages'
import AddService from '@renderer/Modules/Service/Pages'
import ServiceDetails from '@renderer/Modules/StaticService/Pages/ServiceDetails'

const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />
  },
  {
    path: ROUTES.ADD_STATIC,
    element: <AddStaticService />
  },
  {
    path: ROUTES.ADD_SERVICE,
    element: <AddService />
  },
  {
    path: ROUTES.SERVICE_DETAILS,
    element: <ServiceDetails />
  }
]

export default createBrowserRouter(routes)
