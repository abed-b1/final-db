import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch movie details from the backend
    axios.get(`http://localhost:5001/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details.');
      });
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', maxWidth: '600px', margin: '20px auto' }}>
      <h1>{movie.title}</h1>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Length:</strong> {movie.length} mins</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Votes:</strong> {movie.votes}</p>
      <p><strong>Adult Content:</strong> {movie.is_adult ? 'Yes' : 'No'}</p>

      {/* Display Genres */}
      {movie.genres && movie.genres.length > 0 && (
        <div>
          <strong>Genres:</strong>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display People */}
      {movie.people && movie.people.length > 0 && (
        <div>
          <strong>People:</strong>
          <ul>
            {movie.people.map((person) => (
              <li key={person.id}>
                {person.name} - {person.role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
