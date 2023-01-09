import { useMiwonSelector, useMiwonStore } from 'react-miwon'

export const Posts = () => {
  const store = useMiwonStore()
  console.log('store: ', store)
  const state = useMiwonSelector(state => state.posts)
  console.log('state: ', state)
  return <>"Post"</>
}
