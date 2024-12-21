import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PersonDetails = () => {
  const { personId } = useParams(); // Get the personId from the route parameters
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
    return <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</div>;
  }

  if (!person) {
    return <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</div>;
  }

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      color: '#333',
      maxWidth: '800px',
      margin: '20px auto',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    name: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    details: {
      marginTop: '10px',
    },
    detailItem: {
      fontSize: '18px',
      margin: '5px 0',
    },
    metadata: {
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* Placeholder for an optional person image */}
        <div>
          <h1 style={styles.name}>{person.name}</h1>
        </div>
      </div>
      <div style={styles.details}>
        <p style={styles.detailItem}>
          <strong>Born:</strong> <span style={styles.metadata}>{person.birth_year || 'Unknown'}</span>
        </p>
        <p style={styles.detailItem}>
          <strong>Died:</strong>{' '}
          <span style={styles.metadata}>
            {person.death_year ? person.death_year : 'Still alive'}
          </span>
        </p>
        <p style={styles.detailItem}>
          <strong>Role:</strong> <span style={styles.metadata}>{person.role || 'Unknown'}</span>
        </p>
      </div>
    </div>
  );
};

export default PersonDetails;
