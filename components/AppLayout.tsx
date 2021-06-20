import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'
import LoadingSpinner from '../components/LoadingSpinner'
import jwt_decode from 'jwt-decode'
import { User } from '@prisma/client'

/** This component is meant to wrap the app part of the project and
 * redirect to login if user is not logged in
 */

const AppLayout: React.FC<{ loading?: boolean; auth?: boolean }> = ({
  children,
  loading,
  auth
}) => {
  const [user, setUser] = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user && auth) {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          .split('=')[1]
        if (token) {
          const { user } = jwt_decode(token) as { user: User }
          setUser(user)
        }
      } catch (error) {
        router.replace('/login')
      }
    }
  }, [user])

  useEffect(() => {
    if (user && !auth) router.replace('/app')
  }, [user])

  if (loading) return <LoadingSpinner />

  return <>{children}</>
}

export default AppLayout
