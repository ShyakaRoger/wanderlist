import React, { useEffect, useState } from 'react';
import { getData, getProtectedData } from '../services/api';  // Modify getData to allow both public and protected fetches
import DestinationList from '../components/DestinationList';  // Import component to display list of destinations
import DestinationForm from '../components/DestinationForm';  // Import form component to add/update destinations
import '../styles/MyTrips.css';  // Import CSS for styling the page

function MyTrips() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);

  // Fetch user's destinations once the component mounts
  useEffect(() => {
    async function fetchMyTrips() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Fetch private data if the user is logged in
          const all = await getProtectedData('/api/destinations');
          setDestinations(all);
        } else {
          // Fetch public data if the user is not logged in
          const all = await getData('/api/destinations/public');
          setDestinations(all);
        }
      } catch (err) {
        console.log('Failed to fetch user trips');
      }
    }

    fetchMyTrips();  // Call the fetch function
  }, []);  // Empty dependency array ensures this runs only once after the component mounts

  const addToList = (newDest) => {
    setDestinations([...destinations, newDest]);  // Add the new destination to the state
  };

  const updateInList = (updatedDest) => {
    const updatedList = destinations.map(dest =>
      dest._id === updatedDest._id ? updatedDest : dest
    );
    setDestinations(updatedList);  // Update the destinations state with the modified list
  };

  const clearSelected = () => setSelectedDest(null);

  const handleEdit = (dest) => {
    setSelectedDest(dest);  // Set the selected destination for editing
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to the top of the page for better UX
  };

  return (
    <div className="page-container">
      <h2>My Trips</h2>
      <DestinationForm
        onAdd={addToList}
        onUpdate={updateInList}
        selectedDest={selectedDest}
        clearSelected={clearSelected}
      />
      <DestinationList
        destinations={destinations}
        isOwner={true}
        setDestinations={setDestinations}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default MyTrips;
