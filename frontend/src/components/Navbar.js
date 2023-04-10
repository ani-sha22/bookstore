import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
        <div className='heading' >
          <img src="https://cdn-icons-png.flaticon.com/128/3771/3771417.png" alt=""></img>
        <h1 >BOOK STORE</h1></div>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <span> Hello, {user.role} </span>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup-seller">Signup Seller</Link>
              <Link to="/signup-buyer">Signup Buyer</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar