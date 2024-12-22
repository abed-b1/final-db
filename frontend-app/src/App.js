import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar.js'; 
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Series from './pages/Series';
import People from './pages/People'; 
import PersonDetails from './pages/PersonDetails'; 
import Search from './pages/Search';
import SeriesDetails from './pages/SeriesDetails';
import Analysis from './pages/Analysis'; 

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <div style={{ padding: '20px' }}> 
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Movies Pages */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />

          {/* TV Series Page */}
          <Route path="/series" element={<Series />} /> 
          <Route path="/series/:id" element={<SeriesDetails />} /> 

          {/* People Page */}
          <Route path="/people" element={<People />} /> 
          <Route path="/people/:personId" element={<PersonDetails />} />

          {/* Search Page */}
          <Route path="/search" element={<Search />} />

          {/* Analysis Page */}
          <Route path="/analysis" element={<Analysis />} /> 
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
