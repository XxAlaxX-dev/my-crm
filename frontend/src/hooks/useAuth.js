// frontend/src/hooks/useAuth.js
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Use the AuthContext

const useAuth = () => {
  const { user, login, logout, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a user session in localStorage or API when the app loads
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage if available
    if (storedUser) {
      setUser(storedUser); // Set the user in context if found
    }
    setIsLoading(false); // End the loading state once the check is done
  }, [setUser]);

  return {
    user,
    login,
    logout,
    isLoading
  };
};

export default useAuth;
