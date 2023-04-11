import { useState} from "react"
import { useSignup } from "../hooks/useSignup"
import { useGoogleSignup } from "../hooks/useGoogleSignup"
import { GoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import jwt_decode from 'jwt-decode'

const SignupSeller = () => {
  const [email, setEmail] = useState('')
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const {signup, error, isLoading} = useSignup()
  const {googlesignup, gerror} = useGoogleSignup()
  
  const githubHandle = () => {
    var url = 'https://github.com/login/oauth/authorize?client_id=273fabb2103e5ab1940c&redirect_uri=http://localhost:3000/home?path=/&scope=user:email'
    window.location.href = url
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, p1, p2, "seller")
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
        onChange={(e) => setP1(e.target.value)} 
        value={p1} 
      />
      <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setP2(e.target.value)} 
        value={p2} 
      />

      <button disabled={isLoading} className="login-btn">Sign up</button>
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

<LoginSocialFacebook
appId="906279810598693"
onResolve = {(response) => {
  console.log(response);
}}
onReject = {(error) => {
  console.log(error)
}}
>
<FacebookLoginButton/>
</LoginSocialFacebook>
<button onClick={githubHandle} className="github-login"><img src="https://img.icons8.com/ios-filled/2x/github.png" alt="#"/>Login with GitHub</button>
    </form>
  )
}

export default SignupSeller