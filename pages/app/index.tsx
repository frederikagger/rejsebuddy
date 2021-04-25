import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../hooks/useUser'
import AppLayout from '../../components/AppLayout'

const App: NextPage = () => {
  const [user] = useUser()

  return (
    <div>
      <Head>
        <title>Startside | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout>
        <main>
          {user && <h1 className='text-center'>Velkommen {user.firstname} </h1>}
          <div className='w-1/5 mx-auto'></div>
        </main>
      </AppLayout>
    </div>
  )
}

export default App
