import React, { useEffect, useState } from 'react';
import DestinationList from '../components/DestinationList';
import { getData } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await getData('/api/destinations/public');
        setDestinations(data);  // Settin public destinations
        setLoading(false);
      } catch (err) {
        console.error('Failed to load destinations');
      }
    }

    fetchDestinations();  // Fetch data on component mount
  }, []);

  return (
    <div className="home-container">
      <div className="hero-image">
        <div className="hero-text">
          <h1>Welcome to WanderList</h1>
          <p>Explore the world. Discover new places. Share your adventures.</p>
        </div>
      </div>

      {loading ? <p>Loading...</p> : <DestinationList destinations={destinations} />}
    </div>
  );
}

export default Home;
