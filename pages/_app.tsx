import './../styles/tailwind.css'
import Header from '../components/Header'
import { UserProvider } from '../components/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className='bg-primary min-h-screen relative'>
        <Header />
        <div className='mt-6 sm:mt-20'>
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  )
}

export default MyApp
