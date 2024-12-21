import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/series')
      .then(response => {
        setSeries(response.data);
      })
      .catch(error => {
        setError('Failed to load series');
        console.error('Error fetching series:', error);
      });
  }, []);

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#343a40',
    },
    error: {
      color: 'red',
      textAlign: 'center',
    },
    seriesList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    seriesCard: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      width: '300px',
      padding: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative',
    },
    seriesCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '5px',
    },
    seriesTitle: {
      margin: '10px 0',
      fontSize: '18px',
      color: '#007bff',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    tooltip: {
      position: 'absolute',
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '5px',
      borderRadius: '5px',
      fontSize: '12px',
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0.3s, opacity 0.3s',
    },
    cardHoverTooltip: {
      visibility: 'visible',
      opacity: 1,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TV Series</h1>
      {error && <p style={styles.error}>{error}</p>}

      {series.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#6c757d' }}>No series available.</p>
      ) : (
        <div style={styles.seriesList}>
          {series.map((seriesItem) => (
            <div
              key={seriesItem.id}
              className="series-card"
              style={styles.seriesCard}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.tooltip').style.visibility = styles.cardHoverTooltip.visibility;
                e.currentTarget.querySelector('.tooltip').style.opacity = styles.cardHoverTooltip.opacity;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.tooltip').style.visibility = '';
                e.currentTarget.querySelector('.tooltip').style.opacity = '';
              }}
            >
              <Link to={`/series/${seriesItem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={seriesItem.image_url}
                  alt={seriesItem.title}
                  style={styles.image}
                />
                <h3 style={styles.seriesTitle}>{seriesItem.title}</h3>
              </Link>
              <p style={styles.tooltip} className="tooltip">Click for details</p>
              <p><strong>Start Year:</strong> {seriesItem.start_year}</p>
              <p><strong>End Year:</strong> {seriesItem.end_year || 'Ongoing'}</p>
              <p><strong>Rating:</strong> {seriesItem.rating}</p>
              <p>{seriesItem.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Series;
