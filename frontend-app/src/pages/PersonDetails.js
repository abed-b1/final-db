import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PersonDetails = () => {
  const { personId } = useParams();  // Get the personId from the route parameters
  const [person, setPerson] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch person details from the backend
    axios.get(`http://localhost:5001/people/${personId}`)
      .then(response => {
        setPerson(response.data);
      })
      .catch(error => {
        setError('Failed to load person details');
        console.error('Error fetching person details:', error);
      });
  }, [personId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {person ? (
        <div>
          <h1>{person.name}</h1>
          <p>Born: {person.birth_year}</p>
          <p>Died: {person.death_year ? person.death_year : 'Still alive'}</p>
          <p>Role: {person.role}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PersonDetails;
