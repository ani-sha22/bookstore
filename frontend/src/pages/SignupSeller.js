import { useState} from "react"
import { useSignup } from "../hooks/useSignup"
import { useGoogleSignup } from "../hooks/useGoogleSignup"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

const SignupSeller = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const {googlesignup, gerror} = useGoogleSignup()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, "seller")
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Hello Seller</h3>
      <h4>Sign Up here !</h4>
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      {gerror && <div className="error">{gerror}</div>}
      <br />
      <h4>Sign Up with : </h4>
      <GoogleLogin
  onSuccess={credentialResponse => {
    var userObj = jwt_decode(credentialResponse.credential)
    googlesignup(userObj.email, "seller")
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </form>
  )
}

export default SignupSeller