import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

type FormData = {
  firstname: string
  lastname: string
  password: string
  email: string
  city: string
  birthday: Date
  profileText: string
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting, errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    console.log(data)
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const res = await response.json()
    console.log(res)
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div>
      <Head>
        <title>Signup | Rejsebuddy </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='bg-indigo-300 min-h-screen'>
        <div className='container mx-auto'>
          <form
            onSubmit={onSubmit}
            className='max-w-xl bg-white rounded-md mx-auto pt-2 pb-7 px-10 flex flex-col gap-4'
          >
            <h1 className='text-center mb-2'>Signup</h1>
            <input
              {...register('firstname', {
                required: { message: 'Firstname required', value: true }
              })}
              placeholder='First name'
              className='inputfield'
              type='text'
            />
            {errors.firstname && (
              <div className='text-red-500'> {errors.firstname.message} </div>
            )}
            <input
              {...register('lastname', {
                required: { value: true, message: 'Lastname required' }
              })}
              placeholder='Last name'
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
                  message: 'Password needs to be at least 6 characters'
                },
                required: { value: true, message: 'Password required' }
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
                  message: 'You must enter an valid email'
                },
                required: { message: 'Email required', value: true }
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
                required: { message: 'City is required', value: true }
              })}
              placeholder='City'
              className='inputfield'
              type='text'
            />
            {errors.city && (
              <div className='text-red-500'> {errors.city.message} </div>
            )}
            <input
              {...register('birthday', {
                required: { message: 'Birthday is required', value: true }
              })}
              placeholder='birthday'
              className='inputfield'
              type='date'
            />
            {errors.birthday && (
              <div className='text-red-500'> {errors.birthday.message} </div>
            )}
            <textarea
              {...register('profileText', {
                required: { message: 'Profiletext is required', value: true }
              })}
              placeholder='Profiletext'
              className='textarea'
            />
            {errors.profileText && (
              <div className='text-red-500'> {errors.profileText.message} </div>
            )}
            <button type='submit' disabled={isSubmitting} className='button'>
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Signup
