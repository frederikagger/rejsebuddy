import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import { useEffect, useState } from 'react'
import { PostAuthor } from '../../../components/PostComponent'
import Link from 'next/link'
import posts from '../../api/posts'

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
              <hr className='mt-3' />
              <div className='grid w-64 grid-cols-6 gap-y-3 mb-6 mt-6'>
                <img
                  className='w-6 h-full row'
                  src='/images/calendar.svg'
                  alt='calendar'
                />
                <p className='font-medium -ml-2 col-span-5'>
                  {'Fra ' + new Date(post?.startDate).toLocaleDateString()}
                  {' - ' + new Date(post?.endDate).toLocaleDateString()}
                </p>
                <Link href={'/app/profile/' + post?.authorId}>
                  <a>
                    <img
                      className='w-6 h-full rounded-full'
                      src={
                        post?.author.avatar
                          ? 'https://rejsebuddy.s3.amazonaws.com/' +
                            post.author.avatar
                          : '/images/user.svg'
                      }
                      alt='avatar'
                    />
                  </a>
                </Link>
                <div className='-ml-2 col-span-5'>
                  <Link href={'/app/user/' + post?.authorId}>
                    <a>
                      <p className='font-medium'>
                        {post?.author?.firstname + ' ' + post?.author?.lastname}
                      </p>
                    </a>
                  </Link>
                </div>
                <img
                  className='w-6 h-full gap-2'
                  src='/images/location.svg'
                  alt='location'
                />
                <div className='-ml-2 col-span-5 flex flex-row'>
                  {post?.destinations.map(destination => (
                    <p className='font-medium' key={destination.id}>
                      {destination.name}
                      {post?.destinations.length > 1 ? ', ' : ''}
                    </p>
                  ))}
                </div>
              </div>
              <hr className='' />
              <p className='mt-6'>{post?.description}</p>
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default App
