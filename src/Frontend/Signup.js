// src/components/Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making API calls
import '../Frontend/Style/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/auth/signup', formData);
      if (response.status === 201) {
        setMessage('Signup successful! Redirecting to login...');
        // Redirect to the login page after successful signup
        setTimeout(() => {
          navigate('/'); // Adjust the path according to your routes
        }, 2000); // Redirect after 2 seconds (you can adjust this time)
      }
    } catch (error) {
      setMessage('Signup failed. Please check your details.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to login page
  };

  return (

    <div className="main-container">

 
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      
      {message && <p className="message">{message}</p>}

      <button onClick={handleLoginRedirect} className="login-btn">
          Already have an account? Login
        </button>
    </div>
    </div>
  );
};

export default Signup;
