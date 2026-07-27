import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import PointOfSaleModule from './PointOfSaleModule'

const PREFIX = ''

export const POINT_OF_SALE_ROUTE_CONFIG = createCargoModuleRouteConfig('pos', PointOfSaleModule, PREFIX)

const PointOfSaleRouteConfig = () => {
  return (
    <Routes>
      {POINT_OF_SALE_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default PointOfSaleRouteConfig
