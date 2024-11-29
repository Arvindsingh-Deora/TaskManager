import React, { useState , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from './UserContext';

import '../Frontend/Style/Login.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get setUser from context
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:5000/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });
      
  //     const data = await response.json();
  //     if (response.ok) {
  //       // Assuming the response contains user details (first name and last name)
      
  //       navigate('/Dashboard'); // Redirect to home or dashboard
  //     } else {
  //       alert(data.message); // Show error message
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        // Save user details in UserContext
        setUser({ firstName: data.firstName, lastName: data.lastName });
        localStorage.setItem('token', data.token); // Save token if using authentication
        navigate('/dashboard');
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

  return (
    <div className= "main-box">


    
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      
      {/* Add link to Signup page */}
      <p className="signup-link">
        New User? <Link to="/Signup">Register at Signup Page</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;