import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import AdminModule from './AdminModule'

const PREFIX = ''

export const AD_ROUTE_CONFIG = createCargoModuleRouteConfig('ad', AdminModule, PREFIX)

const AdminRouteConfig = () => {
  return (
    <Routes>
      {AD_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default AdminRouteConfig
