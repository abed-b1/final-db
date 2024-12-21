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
    <div style={styles.container}>
      <h1 style={styles.header}>People</h1>
      {error && <p style={styles.error}>{error}</p>}
      {people.length === 0 ? (
        <p style={styles.noPeople}>No people available.</p>
      ) : (
        <div style={styles.grid}>
          {people.map(person => (
            <div key={person.id} style={styles.card}>
              <Link to={`/people/${person.id}`} style={styles.link}>
                <h2 style={styles.name}>
                  {person.name}
                  <span style={styles.icon}>➡️</span> {/* Icon for clickable indicator */}
                </h2>
              </Link>
              <p style={styles.info}>
                <strong>Birth Year:</strong> {person.birth_year || 'Unknown'}
              </p>
              <p style={styles.info}>
                <strong>Role:</strong> {person.role || 'Unknown'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f3f3f3',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  noPeople: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer', // Indicates the card is clickable
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  name: {
    fontSize: '1.5rem',
    color: '#007BFF',
    marginBottom: '10px',
    display: 'inline-block',
  },
  icon: {
    marginLeft: '8px',
    fontSize: '1rem',
    color: '#007BFF',
  },
  info: {
    fontSize: '1rem',
    color: '#555',
  },
};

// Adding hover effects using JavaScript
styles.cardHover = { ...styles.card, transform: 'scale(1.05)', boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)' };

export default People;
