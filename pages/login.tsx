import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import useFetch from 'use-http'
import { NextPage } from 'next'
import jwt_decode from 'jwt-decode'
import AppLayout from '../components/AppLayout'
import useUser from '../hooks/useUser'
import { User } from '@prisma/client'

type FormData = {
  password: string
  email: string
}

const Login: NextPage = () => {
  const [, setUser] = useUser()
  const { post, response, error, loading } = useFetch('/api/login')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    const { token } = await post(data)
    if (response.ok) {
      const { user } = jwt_decode(token) as { user: User }
      document.cookie =
        'token=' + token + '; expires=Fri, 31 Dec 2021 23:59:59 GMT; Path=/;'
      setUser(user)
    }
  })

  return (
    <div>
      <Head>
        <title>Login | Rejsebuddy </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout loading={loading}>
        <main>
          <div className='container mx-auto'>
            <form onSubmit={onSubmit} className='form flex flex-col gap-4'>
              <h1 className='text-center mb-2'>Log ind</h1>
              <label>
                Email
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
              </label>
              <label>
                Kodeord
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
                  <div className='text-red-500'>{errors.password.message}</div>
                )}
              </label>
              <button type='submit' disabled={isSubmitting} className='button'>
                Log ind
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
      </AppLayout>
    </div>
  )
}

export default Login
