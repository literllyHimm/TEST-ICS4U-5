import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MoviesView from './views/MoviesView';
import DetailView from './views/DetailView';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movies/details/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const genresList = [
    { genre: 'Action', id: 28 },
    { genre: 'Adventure', id: 12 },
    { genre: 'Animation', id: 16 },
    { genre: 'Comedy', id: 35 },
    { genre: 'Crime', id: 80 },
    { genre: 'Documentary', id: 99 },
    { genre: 'Drama', id: 18 },
    { genre: 'Family', id: 10751 },
    { genre: 'Fantasy', id: 14 },
    { genre: 'History', id: 36 },
  ];

  const fetchMoviesByGenre = async (genreId) => {
    const API_KEY = 'your_tmdb_api_key';
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

  const handleGenreClick = (genreId) => {
    fetchMoviesByGenre(genreId);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Movie Genres</h1>
      <Genres genres={genresList} onGenreClick={handleGenreClick} />
      <h2>Movies:</h2>
      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <strong>{movie.title}</strong> (Rating: {movie.vote_average}/10)
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && movies.length === 0 && (
        <p>Select a genre to display movies.</p>
      )}
    </div>
  );
};

export default App;
