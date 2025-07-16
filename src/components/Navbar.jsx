import React from 'react'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🛒 MyShop</h2>
      <ul style={styles.links}>
        <li><a href="#" style={styles.link}>Home</a></li>
        <li><a href="#" style={styles.link}>Men's Clothing</a></li>
        <li><a href="#" style={styles.link}>Women's Clothing</a></li>
        <li><a href="#" style={styles.link}>Electronics</a></li>
        <li><a href="#" style={styles.link}>Jewelery</a></li>
      </ul>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    color: '#333',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  
  },
  logo: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
  },
}

export default Navbar
