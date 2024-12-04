import React from 'react';
import { Link } from 'react-router-dom';

const GenresPage = () => {
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

  return (
    <div style={styles.pageContainer}>
      <h2>Genres</h2>
      <div style={styles.buttonContainer}>
        {genresList.map((genre) => (
          <Link to={`/movies?genre=${genre.id}`} key={genre.id}>
            <button style={styles.button}>
              {genre.genre}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    textAlign: 'center',
    marginTop: '20px',
    backgroundColor: 'white',
    padding: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GenresPage;
