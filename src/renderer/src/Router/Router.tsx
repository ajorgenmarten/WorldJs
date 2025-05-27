import { createBrowserRouter, RouteObject } from 'react-router'
import { ROUTES } from './Routes'
import { Dashboard } from '@renderer/Modules/Dashboard'
import CreateStaticService from '@renderer/Modules/Services/Pages/CreateStaticService'
import SelectService from '@renderer/Modules/Services/Pages/SelectService'
import CreateNodejsService from '@renderer/Modules/Services/Pages/CreateNodeJsService'
import CreatePostgresService from '@renderer/Modules/Services/Pages/CreatePostgresService'
import PageNotFound from '@renderer/Common/Components/PageNotFound'

const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />
  },
  {
    path: ROUTES.NEW_STATIC,
    element: <CreateStaticService />
  },
  {
    path: ROUTES.NEW_SERVICE,
    element: <SelectService />
  },
  {
    path: ROUTES.NEW_NODEJS,
    element: <CreateNodejsService />
  },
  {
    path: ROUTES.NEW_POSTGRES,
    element: <CreatePostgresService />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]

export default createBrowserRouter(routes)
