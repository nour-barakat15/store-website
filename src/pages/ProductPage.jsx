import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify' 

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to load product:', error)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      toast.error('Please login to add to cart', {
        position: 'top-right',
        autoClose: 2000,
      })
      navigate('/login')
      return
    }

    const cartKey = `cart_${currentUser.id}`
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || []

    const existingItem = existingCart.find(item => item.id === product.id)

    let updatedCart

    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        }
      ]
    }

    localStorage.setItem(cartKey, JSON.stringify(updatedCart))

    toast.success('✅ Added to cart!', {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  if (loading) return <p style={styles.loading}>Loading product...</p>
  if (!product) return <p style={styles.error}>Product not found</p>

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.header}>{product.title}</h2>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}><strong>${product.price}</strong></p>
          <button style={styles.cartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
    padding: '2rem',
  },
  image: {
    width: '100%',
    maxWidth: '350px',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  details: {
    maxWidth: '600px',
    textAlign: 'center',
  },
  header: {
    fontSize: '1.8rem',
    color: '#222',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '1rem',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  cartButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.8rem 1.5rem',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  loading: {
    textAlign: 'center',
    marginTop: '3rem',
    fontSize: '1.2rem',
    color: '#888',
  },
  error: {
    textAlign: 'center',
    marginTop: '3rem',
    fontSize: '1.2rem',
    color: 'red',
  },
  // Responsive: stack image and details side-by-side on wider screens
  '@media (min-width: 768px)': {
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    details: {
      textAlign: 'left',
      marginLeft: '2rem',
    },
  },
}

export default ProductPage
