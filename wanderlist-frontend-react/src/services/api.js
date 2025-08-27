// Define the base URL to make API calls using the backend server URL
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// Public GET: Function to fetch public data (no authentication required)
const getData = (endpoint) => {
  return fetch(`${BASE_URL}${endpoint}`)  // Make a GET request to the API
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch data');  // Check if the response is successful
      return res.json();  // If successful, parse the response as JSON
    });
};

// Protected GET: Function to fetch data that requires authentication (token needed)
const getProtectedData = (endpoint) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  if (!token) throw new Error('No token found');  // If no token is found, throw an error

  return fetch(`${BASE_URL}${endpoint}`, {  // Make a GET request with the token as authorization
    headers: {
      'Authorization': `Bearer ${token}`  // Add the token in the Authorization header
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');  // Check if the response is successful
      return res.json();  // Parse the response as JSON if successful
    });
};

// Protected POST: Function to send data using POST request, requiring authentication
const postData = (endpoint, data) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  if (!token) throw new Error('No token found');  // If no token, throw an error

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',  // Use POST method to send data
    headers: {
      'Content-Type': 'application/json',  // Set the content type to JSON
      'Authorization': `Bearer ${token}`  // Add the token in the Authorization header
    },
    body: JSON.stringify(data)  // Convert the data to a JSON string and send it in the body
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to post data');  // Check if the response is successful
      return res.json();  // Parse the response as JSON if successful
    });
};

// Protected PUT: Function to update data using PUT request, requiring authentication
const putData = (endpoint, data) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  if (!token) throw new Error('No token found');  // If no token, throw an error

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',  // Use PUT method to update data
    headers: {
      'Content-Type': 'application/json',  // Set the content type to JSON
      'Authorization': `Bearer ${token}`  // Add the token in the Authorization header
    },
    body: JSON.stringify(data)  // Convert the data to a JSON string and send it in the body
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update');  // Check if the response is successful
      return res.json();  // Parse the response as JSON if successful
    });
};

// Protected DELETE: Function to delete data using DELETE request, requiring authentication
const deleteData = (endpoint) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  if (!token) throw new Error('No token found');  // If no token, throw an error

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',  // Use DELETE method to remove data
    headers: {
      'Authorization': `Bearer ${token}`  // Add the token in the Authorization header
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete');  // Check if the response is successful
      return res.json();  // Parse the response as JSON if successful
    });
};

// Export all functions for use in other parts of the app
export { getData, getProtectedData, postData, putData, deleteData };
