import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import { useFetch, CachePolicies } from 'use-http'

const Home: NextPage = () => {
  const { get, loading, error, response, data, abort } = useFetch(
    '/api/posts',
    { cachePolicy: CachePolicies.NO_CACHE }
  )
  return (
    <div>
      <Head>
        <title>Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout>
        <main className='max-w-sm absolute top-1/4 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-6xl mb-5'>Rejsebuddy</h1>
          <hr />
          <h4 className=''>
            <i>- En digital rejseplatform</i>
          </h4>
        </main>
      </AppLayout>
    </div>
  )
}

export default Home
