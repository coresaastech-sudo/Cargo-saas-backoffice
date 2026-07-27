import { BrowserRouter, Routes } from 'react-router-dom'
import CargoModuleIndex from '../components/modules/CargoModuleIndex'
import CargoBackofficeLayout from '../layouts/CargoBackofficeLayout'
import AdminModule from '../Modules/Ad/AdminModule'
import { AD_ROUTE_CONFIG } from '../Modules/Ad/AdminRouteConfig'
import ApplicationModule from '../Modules/Ap/ApplicationModule'
import { APPLICATION_ROUTE_CONFIG } from '../Modules/Ap/ApplicationRouteConfig'
import CargoOperationsModule from '../Modules/Ca/CargoOperationsModule'
import { CARGO_OPERATIONS_ROUTE_CONFIG } from '../Modules/Ca/CargoOperationsRouteConfig'
import CustomerModule from '../Modules/Cr/CustomerModule'
import { CUSTOMER_ROUTE_CONFIG } from '../Modules/Cr/CustomerRouteConfig'
import LedgerModule from '../Modules/Gl/LedgerModule'
import { LEDGER_ROUTE_CONFIG } from '../Modules/Gl/LedgerRouteConfig'
import GeneralSettingsModule from '../Modules/Gp/GeneralSettingsModule'
import { GENERAL_SETTINGS_ROUTE_CONFIG } from '../Modules/Gp/GeneralSettingsRouteConfig'
import PointOfSaleModule from '../Modules/Pos/PointOfSaleModule'
import { POINT_OF_SALE_ROUTE_CONFIG } from '../Modules/Pos/PointOfSaleRouteConfig'
import ReportModule from '../Modules/Re/ReportModule'
import { REPORT_ROUTE_CONFIG } from '../Modules/Re/ReportRouteConfig'
import { renderCargoRoutes } from './createCargoRouteConfig'

export const CARGO_ROUTE_CONFIG = [
  { path: '/', exact: true, element: <CargoModuleIndex /> },
  { path: '/menu/gp', exact: true, element: <GeneralSettingsModule /> },
  { path: '/menu/ad', exact: true, element: <AdminModule /> },
  { path: '/menu/ap', exact: true, element: <ApplicationModule /> },
  { path: '/menu/cr', exact: true, element: <CustomerModule /> },
  { path: '/menu/ca', exact: true, element: <CargoOperationsModule /> },
  { path: '/menu/pos', exact: true, element: <PointOfSaleModule /> },
  { path: '/menu/re', exact: true, element: <ReportModule /> },
  { path: '/menu/gl', exact: true, element: <LedgerModule /> },
  ...GENERAL_SETTINGS_ROUTE_CONFIG,
  ...AD_ROUTE_CONFIG,
  ...APPLICATION_ROUTE_CONFIG,
  ...CUSTOMER_ROUTE_CONFIG,
  ...CARGO_OPERATIONS_ROUTE_CONFIG,
  ...POINT_OF_SALE_ROUTE_CONFIG,
  ...REPORT_ROUTE_CONFIG,
  ...LEDGER_ROUTE_CONFIG,
]

const CargoRouteConfig = () => {
  return <Routes>{renderCargoRoutes(CARGO_ROUTE_CONFIG)}</Routes>
}

export default function CargoBackofficeRoutes() {
  return (
    <BrowserRouter>
      <CargoBackofficeLayout>
        <CargoRouteConfig />
      </CargoBackofficeLayout>
    </BrowserRouter>
  )
}
