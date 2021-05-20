import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../../hooks/useUser'
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router'
import useFetch, { CachePolicies } from 'use-http'
import { useEffect, useState } from 'react'
import { User } from '.prisma/client'

const Profile: NextPage = () => {
  const [user, setUser] = useUser()
  const router = useRouter()
  const [profile, setProfile] = useState<User>()
  const { id } = router.query
  const {
    get,
    loading,
    error,
    response,
    data,
    patch
  } = useFetch('/api/profile/' + id, { cachePolicy: CachePolicies.NO_CACHE })

  const isUsersOwnProfilePage = id === user?.id.toString()

  const uploadImage: (file: File) => void = async file => {
    const data = new FormData()
    data.append('avatar', file)
    const user = await patch('/upload', data)
    setUser(user)
  }

  useEffect(() => {
    if (id && !isUsersOwnProfilePage) get()
  }, [])

  useEffect(() => {
    if (response.ok) {
      setProfile(data)
    }
  }, [data])

  if (isUsersOwnProfilePage) {
    return (
      <div>
        <Head>
          <title>
            {user?.firstname} {user?.lastname} | Rejse Buddy
          </title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <AppLayout auth loading={loading}>
          <main>
            <div className='max-w-7xl h-96 card px-4 sm:px-6 mx-auto'>
              <div className='grid grid-cols-12 gap-10'>
                <div className='col-span-3'>
                  <img
                    className='object-cover bg-no-repeat items-center mb-4'
                    src={
                      user?.avatarBig
                        ? process.env.NEXT_PUBLIC_AWS_S3_URL + user?.avatarBig
                        : '/images/user.svg'
                    }
                    alt='profile pic'
                  />
                  <input
                    type='file'
                    accept='image/*'
                    id='files'
                    className='hidden'
                    onChange={e => uploadImage(e.target.files[0])}
                  />
                  <label htmlFor='files' className='custom-file-input' />
                </div>
                <div className='mb-6 col-span-9'>
                  <h1>
                    {user?.firstname} {user?.lastname}
                  </h1>
                  <h5 className='mt-4'>{user?.profileText}</h5>
                </div>
              </div>
            </div>
          </main>
        </AppLayout>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>
          {profile?.firstname} {profile?.lastname} | Rejse Buddy
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout auth loading={loading}>
        <main>
          <div className='max-w-7xl card px-4 sm:px-6 mx-auto'>
            <h1>
              {profile?.firstname} {profile?.lastname}
            </h1>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default Profile
