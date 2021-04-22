import { User } from '.prisma/client'
import { useState, createContext } from 'react'

export const UserContext = createContext(null)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>()
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
