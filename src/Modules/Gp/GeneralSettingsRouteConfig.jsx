import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import GeneralSettingsModule from './GeneralSettingsModule'

const PREFIX = ''

export const GENERAL_SETTINGS_ROUTE_CONFIG = createCargoModuleRouteConfig('gp', GeneralSettingsModule, PREFIX)

const GeneralSettingsRouteConfig = () => {
  return (
    <Routes>
      {GENERAL_SETTINGS_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default GeneralSettingsRouteConfig
