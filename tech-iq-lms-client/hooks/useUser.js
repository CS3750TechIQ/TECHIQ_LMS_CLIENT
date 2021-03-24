import React from 'react'
import useLocalStorage from "./useLocalStorage"

const UserContext = React.createContext()

export function UserProvider ({ children }) {
  const [user, setUser] = useLocalStorage('user', null)

  const contextValue = React.useMemo(() => [user, setUser], [user, setUser])

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export function useUser () {
  return React.useContext(UserContext)
}