import { AddMiwonReturns } from 'miwon'
import React, { ReactNode, useMemo } from 'react'
import { MiwonContext } from './MiwonContext'

interface MiwonProviderProps {
  store: AddMiwonReturns
  children: ReactNode
}

export function MiwonProvider({ store, children }: MiwonProviderProps) {
  const context = useMemo(() => {
    return { ...store }
  }, [store])

  return (
    <MiwonContext.Provider value={context}>{children}</MiwonContext.Provider>
  )
}
