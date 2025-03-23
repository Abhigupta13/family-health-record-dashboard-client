import { createContext, useState, useEffect } from 'react';
import { FamilyProvider } from './FamilyContext'; // Import the FamilyProvider

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // Add other global states here
  const [userProfile, setUserProfile] = useState(null);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/isLogged', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.isLoggedIn) {
        setIsAuthenticated(true);
        // Fetch user profile or other data if needed
        setUserProfile(data.userProfile);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        setIsAuthenticated(true);
        // Optionally fetch user profile here
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const signup = async (email, password, role) => {
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        setIsAuthenticated(true);
        // Optionally fetch user profile here
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <StoreContext.Provider 
    value={{ 
     isAuthenticated,
     loading,
     userProfile, 
     logOut, 
     login, 
     signup }}>
      <FamilyProvider>
        {children}
      </FamilyProvider>
    </StoreContext.Provider>
  );
}; 