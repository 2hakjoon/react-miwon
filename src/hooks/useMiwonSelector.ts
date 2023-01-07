import { useSyncExternalStore } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonSelector = <T>(selector: (state: any) => T): T => {
  const { subscribe, getState } = useMiwonStore()
  return useSyncExternalStore(subscribe, selector(getState()) as any) as T
}
