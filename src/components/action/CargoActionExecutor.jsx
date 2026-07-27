import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCargoModuleById } from '../../constants/cargoModuleCatalog'
import { send } from '../../services/RequestService'

const formatJson = (value) => JSON.stringify(value, null, 2)

export default function CargoActionExecutor({ moduleId, selectedActionCode }) {
  const navigate = useNavigate()
  const module = getCargoModuleById(moduleId)

  const activeAction = useMemo(() => {
    if (!module) return null
    return module.actions.find((action) => action.code === selectedActionCode) || module.actions[0]
  }, [module, selectedActionCode])

  const [payload, setPayload] = useState(() => formatJson(activeAction?.samplePayload ?? {}))
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!module) {
    return <div className="panel">Unknown module: {moduleId}</div>
  }

  const chooseAction = (action) => {
    navigate(`/${action.code}`)
  }

  const submit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setResponse('')

    try {
      const data = payload.trim() ? JSON.parse(payload) : {}
      const result = await send(activeAction.code, data)
      setResponse(formatJson(result))
    } catch (error) {
      setResponse(formatJson({ status: 'error', message: error?.message || error?.response_msg || error }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="workspace">
      <aside className="panel">
        <button className="link-button" type="button" onClick={() => navigate('/')}>
          Back to modules
        </button>
        <h2>{module.name}</h2>
        <p className="muted">{module.description}</p>
        <div className="action-list">
          {module.actions.map((action) => (
            <button
              className={`action-item ${activeAction?.code === action.code ? 'active' : ''}`}
              key={action.code}
              type="button"
              onClick={() => chooseAction(action)}
            >
              <strong>{action.name}</strong>
              <span>{action.code}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="panel">
        <h2>{activeAction?.name}</h2>
        <p className="muted">posting_code: {activeAction?.code}</p>
        <form onSubmit={submit}>
          <label className="form-row">
            Action code
            <input value={activeAction?.code || ''} readOnly />
          </label>
          <label className="form-row">
            Payload JSON
            <textarea value={payload} onChange={(event) => setPayload(event.target.value)} />
          </label>
          <button className="primary-button" type="submit" disabled={isLoading || !activeAction}>
            {isLoading ? 'Sending...' : 'POST /api/v1/back/action'}
          </button>
        </form>

        <h3>Response</h3>
        <pre className="response-box">{response || 'No response yet.'}</pre>
      </main>
    </div>
  )
}
