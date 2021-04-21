import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import jwt from 'jsonwebtoken'

const App: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Startside | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='bg-primary min-h-screen'>
        <h1 className='text-center'>Velkommen </h1>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { token } = context.req.cookies
  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {} // will be passed to the page component as props
  }
}

export default App
