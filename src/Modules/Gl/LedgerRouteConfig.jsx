import { Route, Routes } from 'react-router-dom'
import { createCargoModuleRouteConfig } from '../../routes/createCargoRouteConfig'
import LedgerModule from './LedgerModule'

const PREFIX = ''

export const LEDGER_ROUTE_CONFIG = createCargoModuleRouteConfig('gl', LedgerModule, PREFIX)

const LedgerRouteConfig = () => {
  return (
    <Routes>
      {LEDGER_ROUTE_CONFIG.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}

export default LedgerRouteConfig
