import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import { useEffect, useState } from 'react'
import { PostAuthor } from '../../../components/PostComponent'

const App: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState<PostAuthor>()

  const { loading, error, response, data, get, abort } = useFetch(
    '/api/post/' + id
  )

  useEffect(() => {
    if (id) get()
    return () => {
      abort()
    }
  }, [])

  useEffect(() => {
    if (response.ok) setPost(data)
  }, [data])

  return (
    <div>
      <Head>
        <title> {post?.title} | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout loading={loading} auth>
        <main>
          <div className='max-w-7xl px-4 sm:px-6 mx-auto'>
            <div className='card w-full mx-auto pb-10'>
              <h1 className=''>{post?.title}</h1>
              <p className='mt-6'>{post?.description}</p>
              <hr className='mt-14' />
              <div className='flex flex-col sm:flex-row items-start sm:items-center -mb-4 sm:justify-between mt-3'>
                <p className='font-medium'>
                  {' ' + new Date(post?.startDate).toLocaleDateString()}
                  {' - ' + new Date(post?.endDate).toLocaleDateString()}
                </p>
                <div className='flex flex-row items-center gap-2'>
                  <img
                    className='w-8 h-full rounded-full'
                    src={
                      post?.author.avatar
                        ? 'https://rejsebuddy.s3.amazonaws.com/' +
                          post.author.avatar
                        : '/images/user.svg'
                    }
                    alt='avatar'
                  />
                  <p className='font-medium'>
                    {post?.author?.firstname + ' ' + post?.author?.lastname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default App
