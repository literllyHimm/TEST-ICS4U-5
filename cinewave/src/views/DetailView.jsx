import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailView.css';

const MovieDetailsView = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieTrailer();
  }, [id]);

  const fetchMovieDetails = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4";
    const BASE_URL = `https://api.themoviedb.org/3/movie/${id}`;

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieTrailer = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4";
    const BASE_URL = `https://api.themoviedb.org/3/movie/${id}/videos`;

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      setTrailer(response.data.results[0]);
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }
  };

  return (
    <div className="movie-details-view">
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <p>{movie.overview}</p>
          <h3>Release Date: {movie.release_date}</h3>
          <h3>Rating: {movie.vote_average}</h3>
        </>
      )}
      {trailer && trailer.key && (
        <div className="trailer">
          <h3>Watch the Trailer:</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsView;
