import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import CargoOperationsModule from './CargoOperationsModule'

const PREFIX = ''

export const CARGO_OPERATIONS_ROUTE_CONFIG = createCargoModuleRouteConfig('ca', CargoOperationsModule, PREFIX)

const CargoOperationsRouteConfig = () => {
  return (
    <Routes>
      {CARGO_OPERATIONS_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default CargoOperationsRouteConfig
