import { useEffect, useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

interface QueryConfig {
  suspense?: boolean
  fallback?: any
}

export const useMiwonQuery = <T, V>(
  key: string,
  fetcher: () => void,
  normalizer: (res: any) => any,
  config: QueryConfig = {}
) => {
  const { reflect, miwonQuery, getFetchState, setState } = useMiwonStore()

  useEffect(() => {
    if (config?.fallback) setState({ [key]: config?.fallback })
  }, [])

  const fetchData = getFetchState()[key]

  const initData =
    fetchData?.data ||
    (config?.fallback ? Object.keys(config?.fallback) : undefined)

  const [data, setData] = useState<T | null>(initData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadingFetcher = async () => {
    try {
      setLoading(true)
      const res = await miwonQuery(key, fetcher, normalizer)
      setData(res)
      setLoading(false)
      reflect()
      return res
    } catch (err: any) {
      setError(err)
    }
  }

  const suspenseFetcher = async () => {
    await miwonQuery(key, fetcher, normalizer)
    reflect()
  }

  useEffect(() => {
    if (config.suspense) {
      if (config.fallback) {
        loadingFetcher()
      } else if (!data && !fetchData?.loading) {
        throw [suspenseFetcher()]
      }
    } else {
      loadingFetcher()
    }
  }, [fetcher])

  return { data, loading, error }
}
