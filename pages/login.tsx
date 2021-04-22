import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useContext } from 'react'
import useFetch from 'use-http'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UserContext } from '../components/UserContext'

type FormData = {
  password: string
  email: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const [user] = useContext(UserContext)
  const { post, response, error, loading } = useFetch('/api/login')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    const { token } = await post(data)
    if (response.ok) {
      document.cookie = 'token=' + token
      router.push('/app')
    }
  })

  useEffect(() => {
    if (user) router.replace('/app')
  }, [])

  if (loading)
    return (
      <div className='container mx-auto'>
        <img
          className='animate-spin h-10 w-10 mx-auto text-secondary'
          src='/images/loader.svg'
          alt='loader'
        />
      </div>
    )

  return (
    <div>
      <Head>
        <title>Login | Rejsebuddy </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='container mx-auto'>
          <form
            onSubmit={onSubmit}
            className='max-w-xl bg-white rounded-md mx-auto pt-2 pb-7 px-10 flex flex-col gap-4'
          >
            <h1 className='text-center mb-2'>Login</h1>
            <input
              {...register('email', {
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Indtast venligst en gyldig email'
                },
                required: { message: 'Email er påkrævet', value: true }
              })}
              placeholder='Email'
              className='inputfield'
              type='email'
            />
            {errors.email && (
              <div className='text-red-500'> {errors.email.message} </div>
            )}
            <input
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password skal være på mindst 6 tegn'
                },
                required: { value: true, message: 'Password er påkrævet' }
              })}
              placeholder='Password'
              className='inputfield'
              type='password'
            />
            {errors.password && (
              <div className='text-red-500'> {errors.password.message} </div>
            )}
            <button type='submit' disabled={isSubmitting} className='button'>
              Login
            </button>
            <div className='inline-block text-center'>
              Har du ikke en profil?
              <Link href='/signup'>
                <a className='text-secondary font-bold'> Opret profil</a>
              </Link>
              {error && (
                <div className='text-red-500'>Noget gik galt. Prøv igen.</div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
