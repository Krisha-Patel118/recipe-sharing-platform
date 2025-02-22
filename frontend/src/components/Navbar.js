import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data
    setIsAuthenticated(false);       // Update authentication state
    navigate('/login');              // Redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/add-recipe">Add Recipe</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
