import { useEffect, useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonQuery = <T, V>(
  key: string,
  fetcher: () => void,
  normalizer: (res: any) => any,
  config: any
) => {
  const { reflect, miwonQuery, getFetchState } = useMiwonStore()
  const fetchData = getFetchState()[key]
  const [data, setData] = useState<T | null>(fetchData?.data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (config.suspense && !fetchData?.data) {
    throw [miwonQuery(key, fetcher, normalizer)]
  }

  const fetch = async (fetcher: () => void) => {
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

  useEffect(() => {
    if (fetcher && !config.suspense) fetch(fetcher)
  }, [fetcher])

  return { data, loading, error }
}
