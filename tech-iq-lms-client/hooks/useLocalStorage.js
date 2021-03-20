import React from 'react'

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error(error)
    }
  }, [key, state])

  return [state, setState]
}