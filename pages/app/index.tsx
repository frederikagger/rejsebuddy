import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import jwt from 'jsonwebtoken'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserContext'
import { User } from '@prisma/client'

const App: NextPage<{ user: User }> = ({ user }) => {
  const [, setUser] = useContext(UserContext)

  useEffect(() => {
    setUser(user)
  }, [])

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
  let user: User
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    user = decoded.user
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { user } // will be passed to the page component as props
  }
}

export default App
