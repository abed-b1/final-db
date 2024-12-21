import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '300px' }}>
      <h2>{movie.title}</h2>
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

export default MovieCard;
