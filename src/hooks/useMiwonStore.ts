import { Store } from 'miwon'
import { useContext } from 'react'
import { MiwonContext } from '../components/MiwonContext'

export const useMiwonStore = () => {
  const { setState, getState } = useContext<Store>(MiwonContext)

  return { setState, getState }
}
