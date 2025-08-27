import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';
import '../styles/AuthBackground.css';

function Login() {
  // Component State
  // - form: tracks email and password input values
  // - error: stores error message for display
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  //Hooks
  // - navigate: for programmatic routing
  // - login: auth context function to update global auth state
  const navigate = useNavigate();
  const { login } = useAuth();

  //Form Submission Handler
  //Handles login form submission
  async function handleSubmit(evt) {
    evt.preventDefault(); // Prevent default form behavior
    setError(''); // Clear previous errors

    try {
      //  API Request
      // - Send POST request to login endpoint with form data
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      // Process Response
      const data = await res.json();

      //  Error Handling
      // - If response not OK, show error from server or default message
      if (!res.ok) {
        setError(data.err || 'Login failed');
        return;
      }

      // after successful Login
      // - Update global auth state with user data and token
      // - Redirect to protected route
      login(data.user, data.token);
      navigate('/my-trips');
    } catch (err) {
      // Network/Server Error Handling
      setError('Server error');
    }
  }

  // Input Change Handler
  // Updates form state as user types
  function handleChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }

  // Component Render
  return (
    <div className="auth-background">
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {/* Error Display */}
        {/* Shows error message if present */}
        {error && <p className="form-error">{error}</p>}
        
        {/* Email Input */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        {/*  Password Input */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        
        {/*  Submit Button */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;