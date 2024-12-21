import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to IMDb Clone</h1>
      <p style={styles.subHeader}>Discover movies, TV series, and more!</p>

      {/* Navigation Links */}
      <div style={styles.navigation}>
        <h2 style={styles.explore}>Explore:</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/movies" style={styles.link}>
              Movies
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/series" style={styles.link}>
              TV Series
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/people" style={styles.link}>
              People
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/search" style={styles.link}>
              Search
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// IMDb-Style CSS
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    padding: '50px 20px',
    color: '#333',
    minHeight: '100vh',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ffcc00',
  },
  subHeader: {
    fontSize: '20px',
    marginBottom: '30px',
    color: '#555',
  },
  navigation: {
    marginTop: '20px',
  },
  explore: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#222',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
    fontSize: '18px',
    color: '#0056b3',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#ffcc00',
  },
};

export default Home;
