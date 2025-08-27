import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/TripDetails.css';

function TripDetails() {
  const { id } = useParams(); // Trip ID from the URL
  const [trip, setTrip] = useState(null); // Trip data
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get JWT token

    // Making sure token exists
    if (!token) {
      setError('You must be logged in to view this trip.');
      return;
    }

    // Fetching the trip data
    fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please log in.');
        }
        if (!res.ok) {
          throw new Error('Trip not found or server error.');
        }
        return res.json();
      })
      .then((data) => {
        setTrip(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  // if there's an error
  if (error) {
    return <div className="trip-details-container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  //  while loading
  if (!trip) {
    return <div className="trip-details-container"><p>Loading trip details...</p></div>;
  }

  //  once trip is loaded
  return (
    <div className="trip-details-container">
      <h2>{trip.name}</h2>
      <p><strong>Location:</strong> {trip.location}</p>
      <p><strong>Description:</strong> {trip.description}</p>
      <p><strong>Priority:</strong> {trip.priority}</p>
      <p><strong>Tags:</strong> {trip.tags?.length ? trip.tags.join(', ') : 'None'}</p>
      {trip.imageUrl && (
        <img
          src={trip.imageUrl}
          alt={trip.name}
          style={{ maxWidth: '100%', marginTop: '1rem', borderRadius: '8px' }}
        />
      )}
    </div>
  );
}

export default TripDetails;
