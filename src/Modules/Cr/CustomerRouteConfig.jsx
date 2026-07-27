import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import CustomerModule from './CustomerModule'

const PREFIX = ''

export const CUSTOMER_ROUTE_CONFIG = createCargoModuleRouteConfig('cr', CustomerModule, PREFIX)

const CustomerRouteConfig = () => {
  return (
    <Routes>
      {CUSTOMER_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default CustomerRouteConfig
