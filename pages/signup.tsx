import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { NextPage } from 'next'
import useFetch from 'use-http'
import { useRouter } from 'next/router'
import LandingPageLayout from '../components/LandingPageLayout'

type FormData = {
  firstname: string
  lastname: string
  password: string
  email: string
  city: string
  birthday: Date
  profileText: string
}

const Signup: NextPage = () => {
  const { post, response, error, loading } = useFetch('/api/user')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    await post(data)
    if (response.ok) router.replace('/login')
  })

  return (
    <div>
      <Head>
        <title>Signup | Rejsebuddy </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LandingPageLayout loading={loading}>
        <main>
          <div className='container mx-auto'>
            <form
              onSubmit={onSubmit}
              className='form flex flex-col gap-4'
            >
              <h1 className='text-center mb-2'>Signup</h1>
              <input
                {...register('firstname', {
                  required: { message: 'Fornavn er påkrævet', value: true }
                })}
                placeholder='Fornavn'
                className='inputfield'
                type='text'
              />
              {errors.firstname && (
                <div className='text-red-500'> {errors.firstname.message} </div>
              )}
              <input
                {...register('lastname', {
                  required: { value: true, message: 'Efternavn er påkrævet' }
                })}
                placeholder='Efternavn'
                className='inputfield'
                type='text'
              />
              {errors.lastname && (
                <div className='text-red-500'> {errors.lastname.message} </div>
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
                {...register('city', {
                  required: { message: 'By er påkrævet', value: true }
                })}
                placeholder='By'
                className='inputfield'
                type='text'
              />
              {errors.city && (
                <div className='text-red-500'> {errors.city.message} </div>
              )}
              <input
                {...register('birthday', {
                  required: { message: 'Fødselsdato er påkrævet', value: true }
                })}
                placeholder='Fødselsdag'
                className='inputfield'
                type='date'
              />
              {errors.birthday && (
                <div className='text-red-500'> {errors.birthday.message} </div>
              )}
              <textarea
                {...register('profileText', {
                  required: {
                    message: 'Indtast venligst en profiltekst',
                    value: true
                  }
                })}
                placeholder='Profiletext'
                className='textarea'
              />
              {errors.profileText && (
                <div className='text-red-500'>{errors.profileText.message}</div>
              )}
              <button type='submit' disabled={isSubmitting} className='button'>
                Opret konto
              </button>
              <div className='inline-block text-center'>
                Har du allerede en profil?
                <Link href='/login'>
                  <a className='text-secondary font-bold'> Login</a>
                </Link>
                {error && (
                  <div className='text-red-500'>Noget gik galt. Prøv igen.</div>
                )}
              </div>
            </form>
          </div>
        </main>
      </LandingPageLayout>
    </div>
  )
}

export default Signup
