import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  normalize,
  schema,
  useMiwonQuery,
  useMiwonStore,
  useMiwonSelector
} from 'react-miwon'
import { Posts } from './Posts'

const postsNormalizer = (res: any) => {
  const commentEntity = new schema.Entity('comments')

  const postEntity = new schema.Entity('posts', {
    comments: [commentEntity]
  })

  const posts = new schema.Array(postEntity)
  return normalize(res, posts)
}

const caller = async () =>
  axios
    .get('https://my-json-server.typicode.com/2hakjoon/miwon/posts')
    .then(res => {
      return res.data
    })

const fallback = {
  '1': {
    id: 1,
    title: '1번 폴백 제목',
    contents: '1번 폴백 내용',
    comments: [1, 2]
  },
  '2': {
    id: 2,
    title: '2번 폴백 제목',
    contents: '2번 폴백 내용',
    comments: [3, 4]
  },
  '3': {
    id: 3,
    title: '3번 폴백 제목',
    contents: '3번 폴백 내용',
    comments: [5, 6]
  }
}

export const PostCaller = () => {
  const store = useMiwonStore()
  console.log('store: ', store.getFetchState())

  console.log('렌더됨')
  const { data, loading, error } = useMiwonQuery(
    'posts',
    caller,
    postsNormalizer,
    { suspense: true, fallback }
  )
  console.log('data, loading, error: ', data, loading, error)
  return (
    <>
      나는야 포스트 콜러
      {JSON.stringify(data)}
      {/* <Posts /> */}
    </>
  )
}
