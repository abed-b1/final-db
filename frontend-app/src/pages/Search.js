import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setError('');
    axios
      .get(`http://localhost:5001/search`, { params: { query } })
      .then((response) => setResults(response.data))
      .catch((err) => setError('Failed to fetch search results.'));
  };

  return (
    <div>
      <h1>Search</h1>
      <p>Search for movies, TV series, or people.</p>
      
      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter a search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px' }}>
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Results */}
      {results && (
        <div>
          <h2>Results:</h2>

          {/* Movies */}
          {results.movies && results.movies.length > 0 && (
            <div>
              <h3>Movies</h3>
              <ul>
                {results.movies.map((movie) => (
                  <li key={movie.id}>
                    {movie.title} ({movie.year})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TV Series */}
          {results.series && results.series.length > 0 && (
            <div>
              <h3>TV Series</h3>
              <ul>
                {results.series.map((series) => (
                  <li key={series.id}>
                    {series.title} ({series.start_year} - {series.end_year || 'Ongoing'})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* People */}
          {results.people && results.people.length > 0 && (
            <div>
              <h3>People</h3>
              <ul>
                {results.people.map((person) => (
                  <li key={person.id}>{person.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* No Results */}
          {results.movies.length === 0 &&
            results.series.length === 0 &&
            results.people.length === 0 && <p>No results found.</p>}
        </div>
      )}
    </div>
  );
};

export default Search;
