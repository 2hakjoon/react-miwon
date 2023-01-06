import { AddMiwonReturns } from 'miwon'
import { useContext } from 'react'
import { MiwonContext } from '../components/MiwonContext'

export const useMiwonStore = () => {
  const store = useContext<AddMiwonReturns>(MiwonContext)

  return { ...store }
}
