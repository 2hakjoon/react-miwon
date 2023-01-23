import { useMiwonSelector, useMiwonStore } from 'react-miwon'

export const Posts = () => {
  const store = useMiwonStore()
  const state = useMiwonSelector(state => state.posts)
  console.log('state: ', state)
  console.log(store.getSubscriptions())
  return <>"Post"{JSON.stringify(state)}</>
}
