import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../../hooks/useUser'
import AppLayout from '../../../components/AppLayout'
import useFetch from 'use-http'

const ProfileSettingPageID: NextPage = () => {
  const [user, setUser] = useUser()

  const { get, loading, error, response, data, del } = useFetch(
    '/api/profile/' + user?.id
  )

  const deleteUser = async () => {
    await del()
    if (response.ok) {
      document.cookie =
        'token=; expires = Thu, 01 Jan 1970 00:00:00 GMT; PATH=/'
      setUser(null)
    }
  }

  return (
    <div>
      <Head>
        <title>{user?.firstname}s indstillinger | Rejse Buddy </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout auth loading={loading}>
        <main className='container mx-auto'>
          <div className='card text-center'>
            <h1>Indstillinger</h1>
            <button className='ctabutton bg-red-400 mt-32' onClick={deleteUser}>
              Slet Profil
            </button>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default ProfileSettingPageID
