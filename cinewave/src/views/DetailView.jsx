import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  const fetchMovieDetails = async (id) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = `https://api.themoviedb.org/3/movie/${id}`;
    const TRAILER_URL = `https://api.themoviedb.org/3/movie/${id}/videos`;

    try {
      const movieResponse = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      setMovie(movieResponse.data);

      const trailerResponse = await axios.get(TRAILER_URL, {
        params: { api_key: API_KEY },
      });
      setTrailers(trailerResponse.data.results);
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading movie details...</p>;

  return (
    <div style={styles.container}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movie && (
        <div style={styles.detailsContainer}>
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Vote Average:</strong> {movie.vote_average}</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Language:</strong> {movie.original_language}</p>
          
          <h3>Trailer</h3>
          {trailers.length > 0 ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailers[0].key}`}
              title="Movie Trailer"
              allowFullScreen
            />
          ) : (
            <p>No trailers available.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  detailsContainer: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};

export default DetailView;
