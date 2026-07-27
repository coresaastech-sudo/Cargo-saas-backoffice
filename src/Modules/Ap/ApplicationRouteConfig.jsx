import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import ApplicationModule from './ApplicationModule'

const PREFIX = ''

export const APPLICATION_ROUTE_CONFIG = createCargoModuleRouteConfig('ap', ApplicationModule, PREFIX)

const ApplicationRouteConfig = () => {
  return (
    <Routes>
      {APPLICATION_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default ApplicationRouteConfig
