import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const People = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all people from the backend
    axios.get('http://localhost:5001/people')
      .then(response => {
        setPeople(response.data);
      })
      .catch(error => {
        setError('Failed to load people');
        console.error('Error fetching people:', error);
      });
  }, []);

  return (
    <div>
      <h1>People</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {people.length === 0 ? (
        <p>No people available.</p>
      ) : (
        <div>
          {people.map(person => (
            <div key={person.id}>
              <Link to={`/people/${person.id}`}>
                <h2>{person.name}</h2>
              </Link>
              <p><strong>Birth Year:</strong> {person.birth_year}</p>
              <p><strong>Role:</strong> {person.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
