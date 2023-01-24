import {
  addMiwon,
  MiwonAsyncBoundary,
  MiwonProvider,
  MiwonSuspense
} from 'react-miwon'
import { PostCaller } from './components/PostCaller'
import { Posts } from './components/Posts'

const store = addMiwon({
  initVal: {
    posts: []
  },
  config: {
    baseURL: 'https://my-json-server.typicode.com'
  }
})
function App() {
  console.log('나???', store.getSubscriptions())
  return (
    <>
      <MiwonProvider store={store}>
        리액트 앱
        <br />
        {/* <Posts /> */}
        <br />
        <MiwonAsyncBoundary
          errorFallback={<>에러!</>}
          suspenseFallback={<>로딩중...</>}
        >
          <PostCaller />
        </MiwonAsyncBoundary>
      </MiwonProvider>
    </>
  )
}

export default App
