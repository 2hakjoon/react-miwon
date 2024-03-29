import { useEffect, useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

interface QueryConfig {
  suspense?: boolean
  fallback?: any
  variables?: any
}

export const useMiwonQuery = <T, V>(
  key: string,
  fetcher: (variables?: V) => any,
  normalizer: (res: any) => any,
  config: QueryConfig = {}
) => {
  const {
    reflect,
    miwonQuery,
    getFetchState,
    setState,
    setFetchState,
    getConfig
  } = useMiwonStore()

  useEffect(() => {
    if (config?.fallback) setFetchState({ [key]: config?.fallback })
  }, [])

  const fetchData = getFetchState()[key]

  const initData =
    fetchData?.data ||
    (config?.fallback ? Object.keys(config?.fallback) : undefined)

  const [data, setData] = useState<T | undefined>(initData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadingFetcher = async (variables: V) => {
    try {
      setLoading(true)
      const res = await miwonQuery(key, () => fetcher(variables), normalizer)
      setData(res)
      setLoading(false)
      reflect()
      return res
    } catch (err: any) {
      setError(err)
    }
  }

  const suspenseFetcher = async (variables: V) => {
    await miwonQuery(key, () => fetcher(variables), normalizer)
    reflect()
  }

  const refetch = async (variables: V, config?: QueryConfig) => {
    if (config?.suspense) {
      suspenseFetcher(variables)
    } else {
      loadingFetcher(variables)
    }
  }

  const isStaleFetchedData = () => {
    if (fetchData?.lastFetched) {
      return Date.now() - fetchData.lastFetched > getConfig().minFetchInterval
    } else {
      return true
    }
  }

  useEffect(() => {
    if (config.suspense) {
      if (!data) {
        throw [suspenseFetcher(config?.variables)]
      } else {
        if (isStaleFetchedData()) {
          loadingFetcher(config?.variables)
        }
      }
    } else {
      if (isStaleFetchedData()) {
        loadingFetcher(config?.variables)
      }
    }
  }, [])

  return { data, loading, error, refetch }
}
