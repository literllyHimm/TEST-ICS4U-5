import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feature = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
      const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            api_key: API_KEY,
          },
        });
        const randomMovies = response.data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
        setMovies(randomMovies);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    fetchNowPlaying();
  }, []);

  return (
    <section>
      <h2>Featured Movies</h2>
      <div style={styles.container}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.card}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={styles.image}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
  },
  card: {
    textAlign: 'center',
    flex: '1',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default Feature;
