import React, { useState } from 'react';
import { postData } from '../services/api';
import '../styles/Form.css';

function TagForm({ onAdd }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError('');

    try {
      const newTag = await postData('/api/tags', { name });
      onAdd(newTag);
      setName('');
    } catch (err) {
      setError('Failed to add tag');
    }
  }

  return (
    <form className="tag-form" onSubmit={handleSubmit}>
      <h3>Add New Tag</h3>
      {error && <p className="form-error">{error}</p>}
      <input
        placeholder="Tag name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        required
      />
      <button type="submit">Add Tag</button>
    </form>
  );
}

export default TagForm;
