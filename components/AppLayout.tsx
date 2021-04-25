import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser'

/** This component is meant to wrap the app part of project and 
 * redirect to login if user is not logged in to reduce 
 */
const AppLayout = ({ children }) => {
  const [user] = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user])

  return <div>{children}</div>
}

export default AppLayout
