import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to IMDb Clone</h1>
      <p>Discover movies, TV series, and more!</p>
      
      {/* Navigation Links */}
      <div style={{ marginTop: '20px' }}>
        <h2>Explore:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/movies" style={{ textDecoration: 'none', color: 'blue' }}>
              Movies
            </Link>
          </li>
          <li>
            <Link to="/series" style={{ textDecoration: 'none', color: 'blue' }}>
              TV Series
            </Link>
          </li>
          <li>
            <Link to="/people" style={{ textDecoration: 'none', color: 'blue' }}>
              People
            </Link>
          </li>
          <li>
            <Link to="/search" style={{ textDecoration: 'none', color: 'blue' }}>
              Search
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
