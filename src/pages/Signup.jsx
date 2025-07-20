import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignup = (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const emailExists = users.find(user => user.email === email)

    if (emailExists) {
      toast.error('Email already registered. Please log in.', {
        position: 'top-right',
        autoClose: 2500,
      })
      return
    }

    const newUser = {
      id: Date.now(),
      email,
      password
    }

    const updatedUsers = [...users, newUser]
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('currentUser', JSON.stringify(newUser))

    toast.success('Account created successfully! 🎉', {
      position: 'top-right',
      autoClose: 2000,
    })

    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSignup} style={formStyle}>
        <h2 style={headerStyle}>Sign Up</h2>
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
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Create Account</button>
      </form>

      <div style={signupPromptStyle}>
        <p>
          Already have an account?{' '}
          <Link to="/login" style={signupLinkStyle}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

const pageStyle = {
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  padding: '2rem',
}

const formStyle = {
  width: '90%',
  maxWidth: '420px',
  margin: '3rem auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 -6px 20px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.15)', // top-heavy shadow
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

const inputStyle = {
  marginBottom: '1.2rem',
  padding: '0.8rem 1rem',
  fontSize: '1.1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '100%',
   backgroundColor: '#c4d2e3ff',
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

const signupPromptStyle = {
  maxWidth: '420px',
  margin: '1rem auto',
  textAlign: 'center',
  color: '#555',
  fontSize: '1rem',
}

const signupLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600',
}

export default Signup
