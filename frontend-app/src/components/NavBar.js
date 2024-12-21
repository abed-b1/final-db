import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
            end // Ensures exact matching for Home
          >
            Home
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/movies"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Movies
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/series"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            TV Series
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/people"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            People
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/search"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Search
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink
            to="/analysis"
            style={({ isActive }) =>
              isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink
            }
          >
            Analysis
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333', // Dark background
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  navItem: {
    textAlign: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff', // White text by default
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'color 0.3s, border-bottom 0.3s',
    borderBottom: '2px solid transparent',
  },
  activeNavLink: {
    borderBottom: '2px solid #808080', // Silver underline
    color: '#808080', // Silver for active link
  },
  hoverNavLink: {
    color: '#a9a9a9', // Dark gray on hover
    borderBottom: '2px solid #a9a9a9',
  },
};

export default Navbar;
