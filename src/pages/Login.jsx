import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify' // ✅ import toast

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    // email regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { position: 'top-right', autoClose: 2500 })
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: 'top-right', autoClose: 2500 })
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      toast.success('Login successful! 👋', {
        position: 'top-right',
        autoClose: 2000,
      })
      setTimeout(() => navigate('/'), 1500)
    } else {
      toast.error('Invalid email or password ❌', {
        position: 'top-right',
        autoClose: 2500,
      })
    }
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headerStyle}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>

      <div style={signupPromptStyle}>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" style={signupLinkStyle}>
            Create one here
          </Link>
        </p>
      </div>
    </div>
  )
}

// ✅ New and updated styles

const pageStyle = {
  backgroundColor: '#fff',
  minHeight: '100vh',
  paddingTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const formStyle = {
  width: '90%',
  maxWidth: '420px',
  margin: '3rem auto',
  padding: '2rem',
  backgroundColor: '#0000',
  borderRadius: '10px',
  boxShadow: '0 -6px 20px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.15)', // top + bottom shadow
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const headerStyle = {
  fontSize: '2.2rem',
  marginBottom: '1.5rem',
  color: '#222',
  fontWeight: '600',
}

const signupPromptStyle = {
  maxWidth: '420px',
  margin: '0 auto',
  textAlign: 'center',
  color: '#555',
  fontSize: '1rem',
}

const signupLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600',
}

const inputStyle = {
  marginBottom: '1.2rem',
  padding: '0.8rem 1rem',
  fontSize: '1.1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '100%',
   backgroundColor: '#555',
  boxSizing: 'border-box',
}

const buttonStyle = {
  padding: '0.8rem',
  fontSize: '1.1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%',
  fontWeight: '500',
}

export default Login
