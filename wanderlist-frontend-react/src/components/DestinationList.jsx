import React from 'react';
import { deleteData } from '../services/api';
import '../styles/destinationList.css';

function DestinationList({ destinations, isOwner = false, setDestinations, onEdit }) {
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this destination?');
    if (!confirm) return;

    try {
      await deleteData(`/api/destinations/${id}`);
      const updated = destinations.filter(d => d._id !== id);
      setDestinations(updated);
    } catch (err) {
      alert('Failed to delete destination.');
    }
  };

  return (
    <div className="destination-list">
      {destinations.map(dest => (
        <div className="destination-card" key={dest._id}>
          <h3>{dest.name}</h3>
          <p><strong>Location:</strong> {dest.location}</p>

          {dest.user?.username && (
            <p><strong>Posted by:</strong> {dest.user.username}</p>
          )}

          {dest.description && <p>{dest.description}</p>}
          {dest.tags?.length > 0 && (
            <p><strong>Tags:</strong> {dest.tags.join(', ')}</p>
          )}
          <p><strong>Priority:</strong> {dest.priority || 'Planned'}</p>
          {dest.imageUrl ? (
            <img src={dest.imageUrl} alt={`View of ${dest.name}`} />
          ) : (
            <p><em>No image available.</em></p>
          )}
          {isOwner && (
            <div className="card-actions">
              <button onClick={() => handleDelete(dest._id)}>Delete</button>
              {onEdit && (
                <button onClick={() => onEdit(dest)}>Edit</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DestinationList;
