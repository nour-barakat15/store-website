import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err))
  }, [])

  const handleGoToProduct = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <h1 style={styles.header}>🛍️ Our Products</h1>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.description}>
              {product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description}
            </p>
            <p style={styles.price}>${product.price}</p>
            <button
              style={styles.button}
              onClick={() => handleGoToProduct(product.id)}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    paddingBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#222',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '2rem',
    padding: '0',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s',
  },
  image: {
    height: '120px',
    objectFit: 'contain',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    margin: '0.5rem 0',
  },
  price: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '1.1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
}

export default Home
