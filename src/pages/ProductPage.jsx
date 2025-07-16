import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch product')
        }
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading product...</p>
  if (error) return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</p>
  if (!product) return null

  return (
    <div style={styles.page}>
      <Navbar />
     
      <div style={styles.container}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <div style={styles.info}>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>${product.price}</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  backButton: {
    margin: '1rem 0',
    padding: '0.5rem 1rem',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    flex: '1 1 300px',
    maxWidth: '300px',
    objectFit: 'contain',
    borderRadius: '10px',
  },
  info: {
    flex: '2 1 400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    marginBottom: '1rem',
  },
  description: {
    marginBottom: '1rem',
    color: '#555',
    lineHeight: '1.4',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#000',
  },
}

export default ProductPage
