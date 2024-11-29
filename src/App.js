import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Frontend/Dashboard';
import Task from './Frontend/Task';
import TaskList from './Frontend/TaskList';
import Login from './Frontend/Login';
import Signup from './Frontend/Signup';
import { UserProvider } from './Frontend/UserContext';

// Component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Conditionally hide Navbar on Login and Signup pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Private Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task" element={<Task />} />
            <Route path="/tasklist" element={<TaskList />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
