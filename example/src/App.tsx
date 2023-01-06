import {
  addMiwon,
  MiwonAsyncBoundary,
  MiwonErrorBoundary,
  MiwonProvider
} from 'react-miwon'
import { Posts } from './components/Posts'

const store = addMiwon({})
console.log(store)
function App() {
  return (
    <>
      <MiwonProvider store={store}>
        리액트 앱<Posts />
      </MiwonProvider>
    </>
  )
}

export default App
