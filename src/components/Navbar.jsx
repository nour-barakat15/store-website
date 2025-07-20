import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
    setMenuOpen(false)
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const isActive = (path) => location.pathname === path

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(e.target.value)}`)
    } else {
      navigate({
        pathname: '/',
        search: e.target.value ? `?search=${encodeURIComponent(e.target.value)}` : '',
      })
    }
  }

  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      color: '#333',
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
    },
    logo: {
      margin: 0,
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    hamburger: {
      display: windowWidth <= 768 ? 'block' : 'none',
      fontSize: '1.5rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    links: {
      listStyle: 'none',
      display: windowWidth > 768 ? 'flex' : menuOpen ? 'flex' : 'none',
      flexDirection: windowWidth > 768 ? 'row' : 'column',
      gap: windowWidth > 768 ? '1.5rem' : '1rem',
      margin: 0,
      padding: windowWidth > 768 ? 0 : '1rem',
      position: windowWidth > 768 ? 'static' : 'absolute',
      top: windowWidth > 768 ? 'auto' : '60px',
      right: windowWidth > 768 ? 'auto' : '2rem',
      backgroundColor: windowWidth > 768 ? 'transparent' : '#fff',
      border: windowWidth > 768 ? 'none' : '1px solid #ddd',
      borderRadius: windowWidth > 768 ? 0 : '8px',
      boxShadow: windowWidth > 768 ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
      width: windowWidth > 768 ? 'auto' : '200px',
      zIndex: 1100,
      alignItems: 'center',
    },
    link: {
      color: '#333',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '1rem',
      cursor: 'pointer',
    },
    activeLink: {
      color: '#007bff',
      textDecoration: 'underline',
    },
    logoutButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '1rem',
      padding: 0,
    },
    linkItem: {
      marginBottom: windowWidth <= 768 ? '1rem' : 0,
    },
    searchInput: {
  marginLeft: '1rem',
  padding: '0.3rem 0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #007bff',  
  backgroundColor: '#f0f8ff',    
  color: '#333',                 
  minWidth: '180px',
  flexGrow: 1,
  maxWidth: '300px',
},

  }

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🛒 MyShop</h2>

      
      {location.pathname === '/' && (
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
          aria-label="Search products"
        />
      )}

      <button aria-label="Toggle menu" onClick={toggleMenu} style={styles.hamburger}>
        ☰
      </button>

      <ul style={styles.links}>
        <li style={styles.linkItem}>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={isActive('/') ? { ...styles.link, ...styles.activeLink } : styles.link}
          >
            Home
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link to="#" onClick={() => setMenuOpen(false)} style={styles.link}>
            Men's Clothing
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link to="#" onClick={() => setMenuOpen(false)} style={styles.link}>
            Women's Clothing
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link to="#" onClick={() => setMenuOpen(false)} style={styles.link}>
            Electronics
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link to="#" onClick={() => setMenuOpen(false)} style={styles.link}>
            Jewelery
          </Link>
        </li>
        <li style={styles.linkItem}>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            style={isActive('/cart') ? { ...styles.link, ...styles.activeLink } : styles.link}
          >
            Cart
          </Link>
        </li>

        {currentUser ? (
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </li>
        ) : (
          <li style={styles.linkItem}>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              style={isActive('/login') ? { ...styles.link, ...styles.activeLink } : styles.link}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
