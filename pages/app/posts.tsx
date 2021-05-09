import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../../components/AppLayout'
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import PostComponent, { PostAuthor } from '../../components/PostComponent'

const Posts: NextPage = () => {
  const { loading, error, response, data } = useFetch('/api/posts', [])
  const [posts, setPosts] = useState<[PostAuthor]>()

  useEffect(() => {
    if (response.ok) {
      setPosts(data)
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
          <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10'>
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
