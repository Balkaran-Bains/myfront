import React, { useState, useContext, createContext } from 'react';
import axios from '../axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/v1/users/logout'); // Make the API call to log out
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
      alert('Logout failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
