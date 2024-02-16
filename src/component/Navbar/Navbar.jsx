import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; 

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired, remove it and set isLoggedIn to false
        localStorage.removeItem('ApiKey');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    // Navigate to the sign-in page or any other desired page
    navigate('/sign-in');
  };

  const handleConnectToGHL = async () => {
    try {
      const url = "https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/oauth/callback&client_id=65845889873f158c7873f2a8-lqfcvf88&scope=businesses.readonly%20businesses.write"


    // You can also redirect the user to the GHL URL if that's what you intend to do
    window.location.href = url;
    } catch (error) {
      // Handle any errors here
      console.error('Error connecting to GHL:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../../../assets/Rozi-logo.png" alt="Logo" />
      </div>
      <div className={`navbar-items ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders">Order</Link></li>
        </ul>
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <>
              <button className="sign-out" onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="connect-ghl" onClick={handleConnectToGHL}>
                Connect to GHL
              </button>
              <button className="sign-up" onClick={() => navigate('/sign-up')}>
                <i className="fas fa-user-plus"></i> Sign Up
              </button>
              <button className="sign-in" onClick={() => navigate('/sign-in')}>
                <i className="fas fa-sign-in-alt"></i> Sign In
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMobileMenuOpen ? 'cross' : ''}`} />
        <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`} />
      </div>
    </nav>
  );
}

export default Navbar;