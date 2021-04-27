import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'
import jwt_decode from 'jwt-decode'
import LoadingSpinner from './LoadingSpinner'
import { User } from '.prisma/client'


/** This component is meant to wrap the landingpage part of
 *  the project to keep a user logged in when the user has a
 *  valid jwt token
 */

const LandingPageLayout: React.FC<{loading?: boolean}> = ({ children, loading }) => {
  const [user, setUser] = useUser()
  const router = useRouter()

   useEffect(() => {
     if (user) router.replace('/app')
   }, [user])

   useEffect(() => {
     try {
       const token = document.cookie
         .split('; ')
         .find(row => row.startsWith('token='))
         .split('=')[1]
       if (token) {
         const { user } = jwt_decode(token) as {user: User}
         setUser(user)
       }
     } catch (error) {}
   }, [])

   if (loading) return <LoadingSpinner />

  return <div>{children}</div>
}

export default LandingPageLayout
