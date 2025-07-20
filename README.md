# MyShop - React E-commerce App

This is a simple React e-commerce web application built with Vite.  
Features include user signup/login, product browsing, cart management, and checkout functionality.  
User data and cart information are stored locally using `localStorage`.

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nour-barakat15/store-website.git
   cd store-website
2. **Install dependencies:**
    npm install
3. **Start the development server:**
    npm run dev
4. **Open your browser and navigate to:**
    http://localhost:5173

5. **Folder Structure:**
    /src
  /components      # Reusable UI components (Navbar)
  /pages           # Main pages (Home, Login, Signup, Cart, Checkout)
  /assets          # Static assets (images, icons)
  main.jsx         # React app entry point
  App.jsx          # Main app component and routes
 /public            # Static public files
 vite.config.js     # Vite configuration
 package.json       # Project dependencies and scripts
 README.md          # This file
 

6. **Known Limitations:**
- No backend server: user data and cart info stored only in localStorage.
- No password encryption or secure authentication.
- Limited form validation.
- No real payment gateway integration
- Products data is static or fetched from a public API without admin controls.
- Responsive design and accessibility can be improved


7. **Future Improvements:**
- Implement backend API for user authentication and product data storage.
- Integrate payment gateway for secure checkout (Stripe, PayPal).
- Enhance UI/UX with responsive design and accessibility.
- Add proper form validation and password encryption.
- Connect to a real product database with admin panel.
- Use JWT tokens for authentication.

