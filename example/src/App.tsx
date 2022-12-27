import { addMiwon } from 'miwon'
import { MiwonAsyncBoundary, MiwonProvider } from 'react-miwon'

function App() {
  const store = addMiwon({})
  console.log(MiwonProvider)
  return (
    <>
      <MiwonAsyncBoundary />
      <MiwonProvider store={store}>리액트 앱</MiwonProvider>
    </>
  )
}

export default App
