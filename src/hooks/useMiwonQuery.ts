import { useState, useSyncExternalStore } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonQuery = <T, V>(
  url: string,
  normalizer: (res: any) => any
) => {
  const { getState, subscribe, miwonQuery } = useMiwonStore()
  const state = useSyncExternalStore(subscribe, getState)

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = () => {
    setLoading(true)
    miwonQuery(url, normalizer)
      .then((res: any) => {
        setData(res)
        setLoading(false)
      })
      .catch((err: any) => {
        setError(err)
      })
  }
  fetch()
  return { data, loading, error }
}