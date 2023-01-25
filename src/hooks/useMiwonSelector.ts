import { useSyncExternalStore } from 'react'
import { isServerSide } from '../components/utils/runtime'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonSelector = <T>(selector: (state: any) => T): T => {
  const { subscribe, getState } = useMiwonStore()

  const getServerSideSnapshot = () => {
    return isServerSide() && selector(getState())
  }

  return useSyncExternalStore(
    subscribe,
    () => selector(getState()) as any,
    getServerSideSnapshot
  ) as T
}
