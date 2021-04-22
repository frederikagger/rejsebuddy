import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { User } from 'prisma/prisma-client'
import prisma from '../utils/prisma'

const Home: NextPage<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      <Head>
        <title>Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {users.length === 0 ? (
          <div> Ingen brugere! </div>
        ) : (
          <div className='text-center text-2xl'>
            {users.map(user => (
              <h1 className='' key={user.id}>
                hej {user.firstname}
              </h1>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let users = await prisma.user.findMany()
  users = JSON.parse(JSON.stringify(users)) // this is done because createdAt and updatedAt is not automatically being transformed to JSON
  return {
    props: { users }
  }
}

export default Home
