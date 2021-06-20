import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../../hooks/useUser'
import AppLayout from '../../../components/AppLayout'
import useFetch from 'use-http'
import { useState, useRef, useEffect } from 'react'

const ProfileSettingPageID: NextPage = () => {
  const [user, setUser] = useUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const node = useRef<HTMLInputElement>()

  const { loading, error, response, del } = useFetch(
    '/api/profile/' + user?.id
  )

  const handleClickOutside: (e: Event) => void = e => {
    if (node.current && !node.current.contains(e.target as Element)) {
      setIsDialogOpen(false) // outside click
    }
  }

  useEffect(() => {
    isDialogOpen
      ? document.addEventListener('click', handleClickOutside)
      : document.removeEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDialogOpen])

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
        <main className='max-w-7xl sm:px-6 mx-auto'>
          <div className='card text-center'>
            <h1>Indstillinger</h1>
            <button
              className='ctabutton bg-red-400 mt-32'
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              Slet Profil
            </button>
            {isDialogOpen && (
              <>
                <div
                  ref={node}
                  className='absolute z-50 card py-6 p-x-10 top-1/3 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2'
                >
                  <h2 className='mb-4'>
                    Er du sikker på du vil slette din profil?
                  </h2>
                  <hr />
                  <div className='flex flex-row w-full py-4 justify-center gap-x-7 mt-4'>
                    <button
                      onClick={deleteUser}
                      className='ctabutton text-lg bg-red-400'
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setIsDialogOpen(!isDialogOpen)}
                      className='ctabutton text-lg bg-green-300'
                    >
                      Nej
                    </button>
                  </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
              </>
            )}
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default ProfileSettingPageID
