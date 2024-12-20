import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Length: {movie.length} mins</p>
      <p>Rating: {movie.rating}</p>
      <p>Votes: {movie.votes}</p>
    </div>
  );
};

export default MovieCard;
