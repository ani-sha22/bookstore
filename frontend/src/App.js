import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import SignupBuyer from './pages/SignupBuyer'
import SignupSeller from './pages/SignupSeller'
import Navbar from './components/Navbar'
import Dashboard from "./pages/Dashboard"

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/signup-buyer" 
              element={user ? <Navigate to="/dashboard" /> : <SignupBuyer />} 
            />
            <Route 
              path="/signup-seller" 
              element={user ? <Navigate to="/dashboard" /> : <SignupSeller />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
