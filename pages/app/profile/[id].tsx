import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../../hooks/useUser'
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router'
import useFetch from 'use-http'
import { useEffect } from 'react'

const ProfilePageID: NextPage = () => {
  const [user] = useUser()
  const router = useRouter()
  const { id } = router.query
  const { get, loading, error, response, data } = useFetch('/api/profile/' + id)

  useEffect(() => {
    if (id) {
      get()
    }
  }, [])

  if (id === user?.id.toString()) {
    return <div>Velkommen til din profil {user?.firstname}</div>
  }
  return (
    <div>
      <Head>
        <title>{user?.firstname}'s Profil | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout auth loading={loading}>
        <main>
          {user && (
            <h2 className='card'>
              En andens profil {id} {user?.lastname}
            </h2>
          )}
        </main>
      </AppLayout>
    </div>
  )
}

export default ProfilePageID
