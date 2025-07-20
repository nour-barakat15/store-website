import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [cartKey, setCartKey] = useState('cartItems')

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate('/login')
      return
    }

    const userCartKey = `cart_${currentUser.id}`
    setCartKey(userCartKey)

    try {
      const storedCart = JSON.parse(localStorage.getItem(userCartKey)) || []
      setCartItems(storedCart)
    } catch (e) {
      console.error('Error parsing cart data:', e)
      setCartItems([])
    }
  }, [navigate])

  useEffect(() => {
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems))
    }
  }, [cartItems, cartKey])

  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div style={styles.page}>
        <Navbar />
        <h2 style={styles.header}>Your Cart</h2>
        <p style={styles.empty}>Your cart is empty!</p>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>
          🛍 Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <h2 style={styles.header}>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.title} style={styles.image} />
          <div style={styles.info}>
            <h3 style={styles.title}>{item.title}</h3>
            <p style={styles.price}>${item.price.toFixed(2)}</p>
            <div style={styles.controls}>
              <button onClick={() => decreaseQty(item.id)} style={styles.qtyBtn}>−</button>
              <span style={styles.qty}>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)} style={styles.qtyBtn}>+</button>
            </div>
            <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div style={styles.totalContainer}>
        <h3 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h3>
<button onClick={() => navigate('/checkout')} style={styles.shopBtn}>🛍 Proceed to checkout</button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    margin: '1.5rem 0',
    color: '#333',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    gap: '1rem',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: '200px',
  },
  title: {
    fontSize: '1.1rem',
    margin: '0 0 0.5rem 0',
    color: '#333',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#000',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  qty: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#555',
  },
  qtyBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '10px',
    height: '25px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtn: {
    marginTop: '0.7rem',
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  totalContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  total: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333'
  },
  shopBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginBottom: '1rem',
  },
}



export default CartPage
