import CargoBackofficeRoutes from './routes/CargoBackofficeRoutes'
import { CargoSessionProvider } from './contexts/CargoSessionContext'
import './App.css'

export default function App() {
  return (
    <CargoSessionProvider>
      <CargoBackofficeRoutes />
    </CargoSessionProvider>
  )
}
