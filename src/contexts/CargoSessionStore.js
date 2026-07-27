import { createContext, useContext } from 'react'

export const CargoSessionContext = createContext(null)

export function useCargoSession() {
  const session = useContext(CargoSessionContext)
  if (!session) {
    throw new Error('useCargoSession must be used inside CargoSessionProvider')
  }
  return session
}
