import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SeriesDetails = () => {
  const { id } = useParams(); // Get series ID from the URL
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
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!series) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{series.title}</h1>
      <p>Start Year: {series.start_year}</p>
      <p>End Year: {series.end_year || 'Ongoing'}</p>
      <p>Rating: {series.rating}</p>
      <p>Votes: {series.votes}</p>
      <p>Description: {series.description}</p>
      <img src={series.image_url} alt={series.title} style={{ width: '300px' }} />

      <h2>Episodes</h2>
      {series.episodes.length > 0 ? (
        <ul>
          {series.episodes.map(episode => (
            <li key={episode.id}>
              <strong>Season {episode.season}, Episode {episode.episode_number}:</strong> {episode.title} 
              ({episode.length} mins, Rating: {episode.rating})
            </li>
          ))}
        </ul>
      ) : (
        <p>No episodes available.</p>
      )}
    </div>
  );
};

export default SeriesDetails;
