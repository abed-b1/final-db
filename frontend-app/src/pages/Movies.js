import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '/Users/abedbadran/Desktop/imdb-final/frontend-app/src/components/MovieCard.js';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Movies</h1>
      <div style={styles.movieGrid}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// IMDb-Style CSS
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#ffcc00', // IMDb signature yellow
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Adds a shadow effect
  },
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
};

export default Movies;
