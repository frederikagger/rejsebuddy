import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../../components/AppLayout'
import useFetch, { CachePolicies } from 'use-http'
import { useState, useEffect } from 'react'
import PostComponent, { PostAuthor } from '../../components/PostComponent'

const Posts: NextPage = () => {
  const { get, loading, error, response, data, abort } = useFetch(
    '/api/posts',
    { cachePolicy: CachePolicies.NO_CACHE }
  )

  const [posts, setPosts] = useState<[PostAuthor]>()
  useEffect(() => {
    get()
    return () => {
      abort()
    }
  }, [])

  useEffect(() => {
    if (response.ok) setPosts(data)
    return () => {
      abort()
    }
  }, [data])

  return (
    <div>
      <Head>
        <title>Opslag | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout loading={loading} auth>
        <main>
          <div className='max-w-7xl px-4 sm:px-6 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 sm:mx-0'>
              {posts?.map(post => (
                <PostComponent post={post} key={post.id} />
              ))}
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default Posts
