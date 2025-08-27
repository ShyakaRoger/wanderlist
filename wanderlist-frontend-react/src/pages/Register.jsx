import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importing the authentication context
import '../styles/Form.css';  // Importing styles for the form
import '../styles/AuthBackground.css';  // Importing background styles for authentication

function Register() {
  // State to store form inputs including personal and login details
  const [form, setForm] = useState({
    surname: '',
    givenName: '',
    dob: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State to store any error messages
  const [error, setError] = useState('');

  // Using the useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate();

  // Using the login function from AuthContext to log in the user after successful registration
  const { login } = useAuth();

  // Function to handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();  // Prevent the default form submission behavior
    setError('');  // Reset any previous error messages

    // Check if passwords match before proceeding
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make a POST request to the backend to register the user
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/register`, {
        method: 'POST',  // Use POST method to send the form data
        headers: { 'Content-Type': 'application/json' },  // Set the content type as JSON
        body: JSON.stringify({
          surname: form.surname,
          givenName: form.givenName,
          dob: form.dob,
          username: form.username,
          email: form.email,
          password: form.password
        })  // Only send necessary fields to the server
      });

      // Parse the response from the server
      const data = await res.json();

      // If the response is not ok, set the error message
      if (!res.ok) {
        setError(data.err || 'Registration failed');
        return;
      }

      // If registration is successful, log in the user using the data from the response
      login(data.user, data.token);

      // Redirect the user to the "my-trips" page after successful registration
      navigate('/my-trips');
    } catch (err) {
      // If there’s an error during the fetch request, set a generic error message
      setError('Server error');
    }
  }

  // Function to handle changes in the form fields (surname, given name, etc.)
  function handleChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });  // Update the respective field in form state
  }

  return (
    <div className="auth-background">
      {/* The form for registering a new user */}
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {/* If there is an error, display it */}
        {error && <p className="form-error">{error}</p>}

        {/* Input fields for surname, given name, date of birth, username, email, password */}
        <input
          name="surname"
          placeholder="Surname"
          value={form.surname}
          onChange={handleChange}
          required  // Ensure the field is filled out before submitting
        />
        <input
          name="givenName"
          placeholder="Given Name"
          value={form.givenName}
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Submit button for the registration form */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
