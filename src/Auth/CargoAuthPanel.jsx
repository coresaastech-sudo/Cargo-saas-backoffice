import { useState } from 'react'
import { useCargoSession } from '../contexts/CargoSessionStore.js'

export default function CargoAuthPanel() {
  const { token, setToken, clearToken } = useCargoSession()
  const [draftToken, setDraftToken] = useState(token)

  return (
    <div className="auth-panel">
      <input
        aria-label="Bearer token"
        placeholder="Bearer token"
        value={draftToken}
        onChange={(event) => setDraftToken(event.target.value)}
      />
      <button type="button" onClick={() => setToken(draftToken)}>
        Save token
      </button>
      <button type="button" onClick={clearToken}>
        Clear
      </button>
    </div>
  )
}
