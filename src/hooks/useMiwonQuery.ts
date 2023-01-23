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

  const fetch = async () => {
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

  const thrower = async () => {
    await miwonQuery(key, fetcher, normalizer)
    reflect()
  }

  useEffect(() => {
    if (config.suspense) {
      if (!data && !fetchData?.loading) {
        throw [thrower()]
      }
    } else {
      fetch()
    }
  }, [fetcher])

  return { data, loading, error }
}
