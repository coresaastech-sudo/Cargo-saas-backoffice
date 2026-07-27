import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import ReportModule from './ReportModule'

const PREFIX = ''

export const REPORT_ROUTE_CONFIG = createCargoModuleRouteConfig('re', ReportModule, PREFIX)

const ReportRouteConfig = () => {
  return (
    <Routes>
      {REPORT_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default ReportRouteConfig
