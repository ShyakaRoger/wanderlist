import React, { useState, useEffect } from 'react';
import { postData, putData } from '../services/api';
import '../styles/DestinationForm.css';

function DestinationForm({ onAdd, onUpdate, selectedDest, clearSelected }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    tags: '',
    imageUrl: '',
    priority: 'Planned',
    public: false
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDest) {
      setForm({
        ...selectedDest,
        tags: selectedDest.tags.join(', '),
        priority: selectedDest.priority || 'Planned',
        public: selectedDest.public || false
      });
    }
  }, [selectedDest]);

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const val = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError('');

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim())
    };

    try {
      if (selectedDest) {
        const updated = await putData(`/api/destinations/${selectedDest._id}`, data);
        onUpdate(updated);
        clearSelected();
      } else {
        const newDest = await postData('/api/destinations', data);
        onAdd(newDest);
      }

      setForm({
        name: '',
        location: '',
        description: '',
        tags: '',
        imageUrl: '',
        priority: 'Planned',
        public: false
      });
    } catch (err) {
      setError('Failed to save destination');
    }
  };

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <h3>{selectedDest ? 'Edit Trip' : 'Add a New Trip'}</h3>

      {error && <p className="form-error">{error}</p>}

      <input
        name="name"
        placeholder="Destination Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Enter a Location"
        value={form.location}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Add Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="tags"
        placeholder="Add Tags"
        value={form.tags}
        onChange={handleChange}
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="Planned">Planned</option>
        <option value="Visited">Visited</option>
      </select>

      {/* Improved checkbox layout */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          name="public"
          id="public"
          checked={form.public}
          onChange={handleChange}
        />
        <label htmlFor="public">Make this trip public</label>
      </div>

      <button type="submit">{selectedDest ? 'Update' : 'Add Destination'}</button>
      {selectedDest && <button type="button" onClick={clearSelected}>Cancel</button>}
    </form>
  );
}

export default DestinationForm;
