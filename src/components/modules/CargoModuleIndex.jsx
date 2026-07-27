import { useNavigate } from 'react-router-dom'
import { cargoModuleCatalog } from '../../constants/cargoModuleCatalog'

export default function CargoModuleIndex() {
  const navigate = useNavigate()

  return (
    <section className="module-grid" aria-label="Cargo modules">
      {cargoModuleCatalog.map((module) => (
        <button
          className="module-card"
          key={module.id}
          type="button"
          onClick={() => navigate(`/menu/${module.route}`)}
        >
          <strong>{module.name}</strong>
          <span>{module.name2}</span>
          <p className="muted">{module.description}</p>
        </button>
      ))}
    </section>
  )
}
