import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'
import LoadingSpinner from '../components/LoadingSpinner'

/** This component is meant to wrap the app part of the project and
 * redirect to login if user is not logged in
 */

const AppLayout: React.FC<{ loading?: boolean }> = ({ children, loading }) => {
  const [user] = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      console.log('redirecting to login')
      router.replace('/login')
    }
  }, [user])

  if (loading) return <LoadingSpinner />

  return <div>{children}</div>
}

export default AppLayout
