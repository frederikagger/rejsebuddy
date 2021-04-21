import { User } from '@prisma/client'
import { useState, useEffect } from 'react'
import useFetch from 'use-http'


const useAuth = (): [User | undefined, boolean, Error | undefined] => {
    const [auth, setAuth] = useState<User>()
    const { get, loading, response, error, abort } = useFetch('/api/user')

    useEffect(() => {
        async function fetch() {
            await get()
            if (!loading) {
                const { user } = response.data
                const userObject = user as User
                setAuth(userObject)
            }
        }
        fetch()
        return () => {
            abort()
        };
    }, []);

    return [auth, loading, error]
}

export default useAuth