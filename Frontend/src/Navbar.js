import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './Frontend/UserContext'; // Adjust the import path as needed
import './Navbar.css'; // Add styling for the Navbar

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and token (if stored)
    setUser(null);
    localStorage.removeItem('token'); // Remove token if stored
    navigate('/'); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">MyApp</Link>
      </div>
      <div className="navbar-middle">
        {user && (
          <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/task" className="navbar-link">Task</Link>
            <Link to="/tasklist" className="navbar-link">Task List</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-info">
              Welcome, {user.firstName} {user.lastName}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
