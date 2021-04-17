import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { PrismaClient, User } from 'prisma/prisma-client'

const prisma = new PrismaClient({})

const Home: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {user ? <div> {user.firstname} </div> : <div> Ingen brugere! </div>}
      <div className='bg-indigo-300 min-h-screen'></div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()
  const user = users[0]
  return {
    props: { user }
  }
}

export default Home
