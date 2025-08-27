import React, { useEffect, useState } from 'react';
import { getData } from '../services/api';
import '../styles/TagList.css';

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const data = await getData('/api/tags');
        setTags(data);
      } catch (err) {
        console.log('Failed to load tags');
      }
    }

    fetchTags();
  }, []);

  return (
    <div className="tag-list">
      <h3>Available Tags</h3>
      <ul>
        {tags.map(tag => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;
