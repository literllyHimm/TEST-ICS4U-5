import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Feature.css';

const Feature = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4";
    const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="feature-container">
      <h2>Featured Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movies/details/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
