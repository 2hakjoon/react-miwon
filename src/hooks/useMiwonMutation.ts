import { useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonMutation = <T, V>(
  fetcher: () => void,
  body: V,
  config: any
) => {
  const { miwonMutation } = useMiwonStore()

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = async (fetcher: () => void) => {
    try {
      setLoading(true)
      const res = await miwonMutation(fetcher, body)
      setData(res)
      setLoading(false)
    } catch (err: any) {
      setError(err)
    }
  }

  return [fetch, { data, loading, error }]
}
