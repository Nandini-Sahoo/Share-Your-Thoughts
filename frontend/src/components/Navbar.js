import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">💭 SYT</Link>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/create-post">📫 New Post</Link>
            <Link to="/profile">🙎‍♂️ Profile ({user?.username})</Link>
            <button onClick={logout} className="logout-btn">📤 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">📥 Login</Link>
            <Link to="/register">🔐 Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;