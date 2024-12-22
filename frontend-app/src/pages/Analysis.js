import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  const [ratingTrends, setRatingTrends] = useState([]);
  const [directorRatings, setDirectorRatings] = useState([]);
  const [genreTrends, setGenreTrends] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratingTrendsResponse = await axios.get('http://localhost:5001/analysis/ratings-by-year');
        setRatingTrends(ratingTrendsResponse.data);

        const directorRatingsResponse = await axios.get('http://localhost:5001/analysis/directors-average-ratings');
        setDirectorRatings(directorRatingsResponse.data);

        const genreTrendsResponse = await axios.get('http://localhost:5001/analysis/genre-popularity-over-time');
        setGenreTrends(genreTrendsResponse.data);
      } catch (err) {
        console.error('Error fetching analysis data:', err);
        setError('Failed to load analysis data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const ratingTrendData = {
    labels: ratingTrends.map(item => item.year),
    datasets: [
      {
        label: 'Average Rating by Year',
        data: ratingTrends.map(item => item.avg_rating),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const directorRatingsData = {
    labels: directorRatings.map(item => item.director),
    datasets: [
      {
        label: 'Average Rating',
        data: directorRatings.map(item => item.avg_rating),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const genreTrendData = {
    labels: genreTrends.map(item => `${item.genre} (${item.year})`),
    datasets: [
      {
        label: 'Movies Count',
        data: genreTrends.map(item => item.movie_count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Data Analysis & Visualization</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Rating Trends by Year</h2>
        {ratingTrends.length > 0 ? <Line data={ratingTrendData} /> : <p style={{ textAlign: 'center' }}>Loading...</p>}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Directors' Average Ratings</h2>
        {directorRatings.length > 0 ? <Bar data={directorRatingsData} /> : <p style={{ textAlign: 'center' }}>Loading...</p>}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Genre Popularity Over Time</h2>
        {genreTrends.length > 0 ? <Bar data={genreTrendData} /> : <p style={{ textAlign: 'center' }}>Loading...</p>}
      </div>
    </div>
  );
};

export default Analysis;
