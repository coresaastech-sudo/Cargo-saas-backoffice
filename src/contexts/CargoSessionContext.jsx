import { useMemo, useState } from 'react'
import { clearCargoToken, getCargoToken, saveCargoToken } from '../services/ApiService'
import { CargoSessionContext } from './CargoSessionStore'

export function CargoSessionProvider({ children }) {
  const [token, setTokenState] = useState(() => getCargoToken() || '')

  const session = useMemo(() => ({
    token,
    setToken(nextToken) {
      saveCargoToken(nextToken)
      setTokenState(nextToken)
    },
    clearToken() {
      clearCargoToken()
      setTokenState('')
    },
  }), [token])

  return <CargoSessionContext.Provider value={session}>{children}</CargoSessionContext.Provider>
}
