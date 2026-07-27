import { useNavigate } from 'react-router-dom'
import CargoAuthPanel from '../Auth/CargoAuthPanel'
import { cargoModuleCatalog } from '../constants/cargoModuleCatalog'

export default function CargoBackofficeLayout({ children }) {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Cargo SaaS Backoffice</h1>
          <p>Core-style route config, Cargo action codes and Cargo API service.</p>
        </div>
        <CargoAuthPanel />
      </header>

      <nav className="module-nav" aria-label="Module navigation">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        {cargoModuleCatalog.map((module) => (
          <button key={module.id} type="button" onClick={() => navigate(`/menu/${module.route}`)}>
            {module.name2}
          </button>
        ))}
      </nav>

      {children}
    </div>
  )
}
