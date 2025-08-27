import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../services/api';
import '../styles/Explore.css';

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await getData('/api/destinations/public');
        setDestinations(data);
      } catch (err) {
        console.error('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  return (
    <div className="explore-background">
      <div className="explore-container">
        <h2>Explore Trips</h2>

        {loading ? (
          <p>Loading...</p>
        ) : destinations.length === 0 ? (
          <p>No trips to show.</p>
        ) : (
          <div className="explore-list">
            {destinations.map((trip) => (
              <div key={trip._id} className="explore-card">
                {trip.imageUrl ? (
                  <img
                    src={trip.imageUrl}
                    alt={trip.name}
                    className="explore-image"
                  />
                ) : (
                  <p><em>No image available</em></p>
                )}

                <h3>{trip.name}</h3>
                <p><strong>Location:</strong> {trip.location}</p>
                <p><strong>Priority:</strong> {trip.priority}</p>

                {trip.user?.username && (
                  <p><strong>Posted by:</strong> {trip.user.username}</p>
                )}

                <Link to={`/trips/${trip._id}`}>
                  <button className="view-button">View</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
