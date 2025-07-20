import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductPage from './pages/ProductPage'
import './index.css'

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'))
    if (!users || users.length === 0) {
      localStorage.setItem('users', JSON.stringify([
        { id: 1, email: 'john@example.com', password: '123456' },
        { id: 2, email: 'jane@example.com', password: 'abcdef' },
        { id: 3, email: 'mike@example.com', password: 'password' },
      ]))
    }
  }, [])

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </Router>
  )
}

export default App
