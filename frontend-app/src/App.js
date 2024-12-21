import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '/Users/abedbadran/Desktop/imdb-final/frontend-app/src/components/NavBar.js'; // Import the shared navigation bar
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Series from './pages/Series';
import People from './pages/People'; // Add this for the list of people
import PersonDetails from './pages/PersonDetails'; // Shows details for one person
import Search from './pages/Search';
import SeriesDetails from './pages/SeriesDetails';
import Analysis from './pages/Analysis'; // Import the Analysis page

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Conditionally render the Navbar */}
      {location.pathname !== '/' && <Navbar />}
      <div style={{ padding: '20px' }}> {/* Provide consistent padding for the content */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Movies Pages */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />

          {/* TV Series Page */}
          <Route path="/series" element={<Series />} /> {/* Single page for series */}
          <Route path="/series/:id" element={<SeriesDetails />} /> {/* Series Details Page */}

          {/* People Page */}
          <Route path="/people" element={<People />} /> {/* List of people */}
          <Route path="/people/:personId" element={<PersonDetails />} /> {/* Person details */}

          {/* Search Page */}
          <Route path="/search" element={<Search />} />

          {/* Analysis Page */}
          <Route path="/analysis" element={<Analysis />} /> {/* Data analysis and visualization */}
        </Routes>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
