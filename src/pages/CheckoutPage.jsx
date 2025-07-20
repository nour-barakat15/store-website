import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify' 

function CheckoutPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      toast.error('Please login to proceed to checkout', {
        position: 'top-right',
        autoClose: 2000,
      })
      navigate('/login')
      return
    }
    const userCartKey = `cart_${currentUser.id}`
    const storedCart = JSON.parse(localStorage.getItem(userCartKey)) || []
    setCartItems(storedCart)
  }, [navigate])

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const placeOrder = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      toast.error('Please login to place order', {
        position: 'top-right',
        autoClose: 2000,
      })
      navigate('/login')
      return
    }
    const userCartKey = `cart_${currentUser.id}`
    if (cartItems.length === 0) {
      toast.warn('Your cart is empty!', {
        position: 'top-right',
        autoClose: 2000,
      })
      return
    }
    localStorage.removeItem(userCartKey)
    setCartItems([])
    setOrderPlaced(true)
    toast.success('Order placed successfully! 🎉', {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  if (orderPlaced) {
    return (
      <div style={styles.page}>
        <Navbar />
        <h2 style={styles.header}>Order Successful!</h2>
        <p style={styles.header}>Thank you for your purchase.</p>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          Back to Shop
        </button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.page}>
        <Navbar />
        <h2 style={styles.header}>Your cart is empty.</h2>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <h2 style={styles.header}>Checkout</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.id} style={styles.item}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.details}>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.qty}>Quantity: {item.quantity}</p>
              <p style={styles.qty}>Price: ${item.price.toFixed(2)}</p>
              <p style={styles.qty}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder} style={styles.placeOrderBtn}>
        Place Order
      </button>
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
  item: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    alignItems: 'center',
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
  details: {
    flex: 1,
    minWidth: '200px',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  qty: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.3rem',
  },
  total: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: '2rem',
  },
  placeOrderBtn: {
    marginTop: '1rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}

export default CheckoutPage
