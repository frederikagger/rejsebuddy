import { useContext, Dispatch, SetStateAction } from 'react'
import { UserContext } from '../components/UserContext'
import { User } from '@prisma/client'

const useUser = (): [user: User | undefined, setUser: Dispatch<SetStateAction<User>>] => {
    const [user, setUser] = useContext(UserContext)
    return [user, setUser]
}

export default useUser
