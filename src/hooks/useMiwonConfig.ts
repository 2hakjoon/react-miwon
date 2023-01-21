import { useMiwonStore } from './useMiwonStore'

export const useMiwonConfig = () => {
  const { getConfig } = useMiwonStore()

  return getConfig()
}
