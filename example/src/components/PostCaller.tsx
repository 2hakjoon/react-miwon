import { useState, useEffect } from 'react'
import {
  normalize,
  schema,
  useMiwonQuery,
  useMiwonStore,
  useMiwonSelector
} from 'react-miwon'

const postsNormalizer = (res: any) => {
  const commentEntity = new schema.Entity('comments')

  const postEntity = new schema.Entity('posts', {
    comments: [commentEntity]
  })

  const posts = new schema.Array(postEntity)
  return normalize(res, posts)
}

export const PostCaller = () => {
  const store = useMiwonStore()
  const { data, loading, error } = useMiwonQuery(
    '/2hakjoon/miwon/posts',
    postsNormalizer
  )
  console.log('data, loading, error: ', data, loading, error)
  return <>나는야 포스트 콜러</>
}
