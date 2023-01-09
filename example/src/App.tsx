import { addMiwon, MiwonProvider } from 'react-miwon'
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
console.log(store)
function App() {
  console.log('나?')
  return (
    <>
      <MiwonProvider store={store}>
        리액트 앱
        <br />
        <Posts />
        <br />
        <PostCaller />
      </MiwonProvider>
    </>
  )
}

export default App
