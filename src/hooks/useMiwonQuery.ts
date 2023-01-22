import { useEffect, useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonQuery = <T, V>(
  key: string,
  fetcher: () => void,
  normalizer: (res: any) => any,
  config: any
) => {
  const { reflect, miwonQuery, getFetchState, setFetchState } = useMiwonStore()
  const [data, setData] = useState<T | null>(getFetchState()[key])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = async (fetcher: () => void) => {
    try {
      setLoading(true)
      const res = await miwonQuery(fetcher, normalizer)

      setData(res)
      setFetchState(res)
      setLoading(false)
      reflect()
      return res
    } catch (err: any) {
      setError(err)
    }
  }

  if (config.suspense && !data) {
    throw fetch(fetcher)
  }

  useEffect(() => {
    if (fetcher) fetch(fetcher)
  }, [fetcher])

  return { data, loading, error }
}
