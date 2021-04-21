import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import jwt from 'jsonwebtoken'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserContext'
import useAuth from '../../hooks/useAuth'

const App: NextPage = () => {
  const [userObject, loading, error] = useAuth()
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    if (!loading && !error) setUser(userObject)
  }, [userObject])

  return (
    <div>
      <Head>
        <title>Startside | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {user && <h1 className='text-center'>Velkommen {user?.firstname} </h1>}
        <div className='w-1/5 mx-auto'></div>
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
