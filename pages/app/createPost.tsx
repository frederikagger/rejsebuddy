import { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../../hooks/useUser'
import AppLayout from '../../components/AppLayout'
import useFetch from 'use-http'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  description: string
  destinations: string[]
  travelTypes: string[]
  startDate: Date
  endDate: Date
}

const CreatePost: NextPage = () => {
  const { post, loading, error, response } = useFetch('/api/post')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    await post(data)
    console.log(response.data)
    if (response.ok) {
      console.log(response.data)
    }
  })

  return (
    <div>
      <Head>
        <title>Opret opslag | Rejse Buddy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppLayout loading={loading}>
        <main>
          <div className='container mx-auto'>
            <form onSubmit={onSubmit} className='form flex flex-col gap-4'>
              <h1 className='text-center'>Opret opslag</h1>
              <input
                {...register('title', {
                  required: {
                    message: 'Title er påkrævet',
                    value: true
                  },
                  minLength: {
                    value: 2,
                    message: 'Titel skal være mindst 2 karaktere'
                  },
                  maxLength: {
                    value: 5,
                    message: 'Titel er for lang'
                  }
                })}
                className='inputfield'
                name='title'
                placeholder='Titel'
                type='text'
              />
              {errors.title && console.log(errors.title.message)}
              {errors.title && (
                <div className='text-red-500'>{errors.title.message}</div>
              )}
              <textarea
                className='textarea'
                {...register('description', {
                  required: {
                    message: 'En beskrivelse er påkrævet',
                    value: true
                  }
                })}
                placeholder='Beskrivelse'
              ></textarea>
              <select
                {...register('destinations', {
                  required: { message: 'Destination er påkrævet', value: true }
                })}
                className='inputfield'
                name='destinations'
              >
                <option value='Spanien'>Spanien</option>
                <option value='Italien'>Italien</option>
                <option value='Frankrig'>Frankrig</option>
                <option value='Sverige'>Sverige</option>
              </select>
              <select
                {...register('travelTypes', {
                  required: {
                    message: 'Transportmiddel er påkrævet',
                    value: true
                  }
                })}
                className='inputfield'
                name='travelTypes'
              >
                <option value='Fly'>Fly</option>
                <option value='Bil'>Bil</option>
                <option value='Båd'>Båd</option>
                <option value='Cykel'>Cykel</option>
              </select>
              <input
                {...register('startDate', {
                  required: { message: 'Startdato er påkrævet', value: true }
                })}
                placeholder='Start dato'
                className='inputfield'
                type='date'
              />
              <input
                {...register('endDate', {
                  required: { message: 'Slutdato er påkrævet', value: true }
                })}
                placeholder='Slut dato'
                className='inputfield'
                type='date'
              />
              <button className='button' type='submit'>
                Opret
              </button>
              {error && <div className='text-red-500'>{error.message}</div>}
              {response.ok && (
                <div className='text-green-500 text-lg'>
                  Opslaget blev oprettet!
                </div>
              )}
            </form>
          </div>
        </main>
      </AppLayout>
    </div>
  )
}

export default CreatePost
