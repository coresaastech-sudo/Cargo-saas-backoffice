import { Route, Routes } from 'react-router-dom'
import { getCargoModuleById } from '../constants/cargoModuleCatalog'

export const createCargoModuleRouteConfig = (moduleId, Component, prefix = '') => {
  const module = getCargoModuleById(moduleId)

  if (!module) {
    return []
  }

  return module.actions.map((action) => ({
    path: `${prefix}/${action.code}`,
    exact: true,
    action_code: action.code,
    element: <Component selectedActionCode={action.code} />,
  }))
}

export const renderCargoRoutes = (routeConfig) => {
  return routeConfig.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ))
}

export const CargoRouteConfigSwitch = ({ routeConfig }) => {
  return <Routes>{renderCargoRoutes(routeConfig)}</Routes>
}
