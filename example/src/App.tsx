import { addMiwon } from 'miwon'
import React from 'react'
import MiwonProvider from '../../dist/components/MiwonProvider'

function App() {
  const store = addMiwon({})
  return <MiwonProvider store={store}>리액트 앱</MiwonProvider>
}

export default App
