import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Year: {movie.year}</p>
      <p>Length: {movie.length} mins</p>
      <p>Rating: {movie.rating}</p>
      <p>Votes: {movie.votes}</p>
      <p>Is Adult: {movie.is_adult ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default MovieDetails;
