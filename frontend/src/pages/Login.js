import { useState} from "react"
import { useLogin } from "../hooks/useLogin"
import { useGoogleLogin } from "../hooks/useGoogleLogin"
import { GoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import jwt_decode from 'jwt-decode'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const {googlelogin} = useGoogleLogin()

  const githubHandle = () => {
    var url = 'https://github.com/login/oauth/authorize?client_id=273fabb2103e5ab1940c&redirect_uri=http://localhost:3000/home?path=/&scope=user:email'
    window.location.href = url
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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

      <button disabled={isLoading} className="login-btn">Log in</button>
      {error && <div className="error">{error}</div>}
      <br />
      <h4>Log in with : </h4>
      <GoogleLogin
  onSuccess={credentialResponse => {
    var userObj = jwt_decode(credentialResponse.credential)
    googlelogin(userObj.email)
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
    </>
  )
}

export default Login