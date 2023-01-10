import { useState } from 'react'
import { useMiwonStore } from './useMiwonStore'

export const useMiwonMutation = <T, V>(url: string, body: V) => {
  const { miwonMutation } = useMiwonStore()

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = async (url: string) => {
    setLoading(true)
    return miwonMutation(url, body)
      .then((res: any) => {
        setData(res)
        setLoading(false)
      })
      .catch((err: any) => {
        setError(err)
      })
  }

  return [fetch, { data, loading, error }]
}
