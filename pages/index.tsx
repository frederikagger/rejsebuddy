import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='bg-indigo-300 min-h-screen'></div>
    </div>
  )
}
