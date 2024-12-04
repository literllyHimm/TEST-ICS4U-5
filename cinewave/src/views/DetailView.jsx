import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
      const BASE_URL = `https://api.themoviedb.org/3/movie/${id}`;

      try {
        const response = await axios.get(BASE_URL, {
          params: { api_key: API_KEY, append_to_response: 'videos' },
        });
        setMovie(response.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  const trailers = movie.videos.results.filter((video) => video.type === 'Trailer');

  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.title}</h1>
      <p>Overview: {movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Genres: {movie.genres.map((g) => g.name).join(', ')}</p>
      <p>Language: {movie.original_language}</p>

      <h2>Trailers</h2>
      {trailers.map((trailer) => (
        <div key={trailer.id}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default DetailView;
