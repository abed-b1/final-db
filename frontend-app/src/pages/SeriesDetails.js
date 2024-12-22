import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch series details from the backend
    axios.get(`http://localhost:5001/series/${id}`)
      .then(response => {
        setSeries(response.data);
      })
      .catch(err => {
        setError('Failed to load series details');
        console.error(err);
      });
  }, [id]);

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  if (!series) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#343a40',
    },
    header: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px',
    },
    image: {
      width: '300px',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    details: {
      flex: 1,
    },
    title: {
      fontSize: '32px',
      marginBottom: '10px',
      color: '#007bff',
    },
    subtitle: {
      fontSize: '18px',
      margin: '5px 0',
    },
    description: {
      marginTop: '15px',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    episodesSection: {
      marginTop: '40px',
    },
    episodesHeader: {
      fontSize: '24px',
      marginBottom: '20px',
      borderBottom: '2px solid #ddd',
      paddingBottom: '5px',
    },
    episodesList: {
      listStyleType: 'none',
      padding: 0,
    },
    episodeItem: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    episodeTitle: {
      fontWeight: 'bold',
    },
    metaInfo: {
      fontSize: '14px',
      color: '#6c757d',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img src={series.image_url} alt={series.title} style={styles.image} />
        <div style={styles.details}>
          <h1 style={styles.title}>{series.title}</h1>
          <p style={styles.subtitle}>Start Year: {series.start_year}</p>
          <p style={styles.subtitle}>End Year: {series.end_year || 'Ongoing'}</p>
          <p style={styles.subtitle}>Rating: {series.rating} / Votes: {series.votes}</p>
          <p style={styles.description}>{series.description}</p>
        </div>
      </div>

      {/* Episodes Section */}
      <div style={styles.episodesSection}>
        <h2 style={styles.episodesHeader}>Episodes</h2>
        {series.episodes.length > 0 ? (
          <ul style={styles.episodesList}>
            {series.episodes.map(episode => (
              <li key={episode.id} style={styles.episodeItem}>
                <p style={styles.episodeTitle}>
                  Season {episode.season}, Episode {episode.episode_number}: {episode.title}
                </p>
                <p style={styles.metaInfo}>
                  {episode.length} mins | Rating: {episode.rating} | Votes: {episode.votes}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.metaInfo}>No episodes available.</p>
        )}
      </div>
    </div>
  );
};

export default SeriesDetails;
