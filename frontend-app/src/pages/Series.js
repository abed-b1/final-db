import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the series data from the backend
    axios.get('http://localhost:5001/series')
      .then(response => {
        setSeries(response.data); // Set the fetched series data
      })
      .catch(error => {
        setError('Failed to load series');
        console.error('Error fetching series:', error);
      });
  }, []);

  return (
    <div>
      <h1>TV Series</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {series.length === 0 ? (
        <p>No series available.</p>  // Display a message if no series are available
      ) : (
        <div className="series-list">
          {series.map((seriesItem) => (
            <div key={seriesItem.id} className="series-card">
              {/* The code you provided should go here */}
              <img 
                src={seriesItem.image_url} 
                alt={seriesItem.title} 
                style={{ width: '150px', height: 'auto' }} 
              />
              <h3>{seriesItem.title}</h3>
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
