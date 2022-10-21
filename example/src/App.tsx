import { addMiwon } from 'miwon'
import { MiwonProvider } from 'react-miwon'

function App() {
  const store = addMiwon({})
  console.log(MiwonProvider)
  return (
    <>
      <MiwonProvider store={store}>리액트 앱</MiwonProvider>
    </>
  )
}

export default App
