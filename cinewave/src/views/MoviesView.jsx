import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MoviesView = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genre');

  useEffect(() => {
    if (genreId) {
      fetchMoviesByGenre(genreId);
    }
  }, [genreId]);

  const fetchMoviesByGenre = async (genreId) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Movies by Genre</h2>
      <div>
        {isLoading && <p>Loading movies...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && movies.length > 0 && (
          <div style={styles.movieContainer}>
            {movies.map((movie) => (
              <div key={movie.id} style={styles.movieCard}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={styles.movieImage}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  movieCard: {
    textAlign: 'center',
    width: '200px',
  },
  movieImage: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default MoviesView;
