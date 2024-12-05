import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../styles/MoviesView.css'; // Add your CSS file for styling

const MoviesView = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]); // Store genres
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genre'); // Get the selected genre from URL

  // Fetch genres when the component mounts
  useEffect(() => {
    fetchGenres();
    if (genreId) {
      fetchMovies(genreId);
    }
  }, [genreId]);

  // Fetch movies based on selected genre
  const fetchMovies = async (genreId) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY, with_genres: genreId },
      });
      setMovies(response.data.results); // Save the movies to state
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch genres from API
  const fetchGenres = async () => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      setGenres(response.data.genres); // Save the genres to state
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  return (
    <div className="movies-view">
      {/* Left Sidebar: Genres */}
      <div className="genres-container">
        <h3>Select a Genre</h3>
        <div className="genre-list">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/movies?genre=${genre.id}`}
              className="genre-card"
            >
              <h4>{genre.name}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Content Area: Movies */}
      <div className="movies-container">
        <div className="movies-box">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                to={`/movies/details/${movie.id}`}
                key={movie.id}
                className="movie-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <h3>{movie.title}</h3>
              </Link>
            ))
          ) : (
            <p>No movies available for this genre.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesView;
