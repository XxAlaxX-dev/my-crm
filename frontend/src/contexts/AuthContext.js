// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap around the app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store the user object
  const [loading, setLoading] = useState(true);  // Loading state while fetching user

  // Fetch current user from local storage or via the API
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);  // Set user from local storage if available
    }
    setLoading(false);  // Set loading to false once user info is fetched
  }, []);

  // Login handler
  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);  // Set user after login
  };

  // Register handler
  const register = async (userData) => {
    const newUser = await authService.register(userData);
    setUser(newUser);  // Set user after registration
  };

  // Logout handler
  const logout = () => {
    authService.logout();  // Call logout from authService
    setUser(null);  // Clear user from state
  };

  // Provide context values to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export context and provider
export { AuthContext, AuthProvider };
