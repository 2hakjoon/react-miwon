import { useEffect, useState, useSyncExternalStore } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonQuery = <T, V>(
  url: string,
  normalizer: (res: any) => any
) => {
  const { reflect, miwonQuery } = useMiwonStore()

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = (url: string) => {
    setLoading(true)
    miwonQuery(url, normalizer)
      .then((res: any) => {
        setData(res)
        setLoading(false)
        reflect()
      })
      .catch((err: any) => {
        setError(err)
      })
  }

  useEffect(() => {
    if (url) fetch(url)
  }, [url])
  return { data, loading, error }
}
