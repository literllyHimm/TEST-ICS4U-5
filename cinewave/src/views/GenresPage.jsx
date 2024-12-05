import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/GenresPage.css';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4";
    const BASE_URL = "https://api.themoviedb.org/3/genre/movie/list";

    // List of specific genre IDs to display
    const specificGenres = [
      28, 80, 27, 53, 12, 10751, 10402, 10752, 16, 14, 9648, 37, 35, 36, 878
    ];

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });

      // Filter genres based on specific IDs
      const filteredGenres = response.data.genres.filter(genre =>
        specificGenres.includes(genre.id)
      );

      setGenres(filteredGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <div className="genres-page">
      <h2>Select a Genre</h2>
      <div className="genre-list">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/movies?genre=${genre.id}`}
            className="genre-card"
          >
            <h3>{genre.name}</h3> {/* Only display Genre Name */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
