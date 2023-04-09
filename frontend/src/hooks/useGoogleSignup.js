import { useAuthContext } from './useAuthContext'
import { useState } from 'react'

export const useGoogleSignup = () => {
  const [gerror, setGError] = useState(null)
  const { dispatch } = useAuthContext()

  const googlesignup = async (email, role) => {

    const response = await fetch('/api/user/gsignup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email , role})
    })
    const json = await response.json()

    setGError(null)

    if (!response.ok) {
      setGError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

    }
  }

  return { googlesignup, gerror }
}