


import { useAuthContext } from './useAuthContext'

export const useGoogleLogin = () => {
  const { dispatch } = useAuthContext()

  const googlelogin = async (email) => {

    const response = await fetch('/api/user/glogin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email})
    })

    const json = await response.json()

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

    }
  }

  return { googlelogin}
}