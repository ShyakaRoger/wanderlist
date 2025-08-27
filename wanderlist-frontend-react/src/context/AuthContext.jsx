import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context to hold user authentication data
const AuthContext = createContext();

function AuthProvider({ children }) {
  // State to store user information
  const [user, setUser] = useState(null);

  // Hook to navigate between pages
  const navigate = useNavigate();

  // useEffect hook to check if user data and token are stored in localStorage
  useEffect(() => {
    // Retrieve stored user and token from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    // If both user and token exist, set the user state to the stored user data
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));  // Parse the user data and set it
    }
  }, []);  // Empty dependency array means this effect runs only once after the component mounts

  // Function to log the user in, saving user data and token to localStorage
  function login(userData, token) {
    // Store the user and token in localStorage for persistence across sessions
    localStorage.setItem('user', JSON.stringify(userData));  // Store user data as a string
    localStorage.setItem('token', token);  // Store token
    setUser(userData);  // Set the user state to the new user data
  }

  // Function to log the user out, clearing user data and token from localStorage
  function logout() {
    // Remove user data and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);  // Reset the user state to null (not logged in)
    navigate('/');  // Redirect the user to the homepage after logout
  }

  // Return the AuthContext provider with the value of user, login, and logout functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}  
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context values
function useAuth() {
  return useContext(AuthContext);  // Access the context value (user, login, logout)
}

export { AuthProvider, useAuth };  // Export the AuthProvider and useAuth hook for use in other components
