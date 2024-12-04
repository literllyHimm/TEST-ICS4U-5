import React from 'react';
import Header from '../Components/Header';
import Genres from '../Components/Genres';
import Footer from '../Components/Footer';

const MoviesView = () => {
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
    <div>
      <Header />
      <Genres genresList={genresList} />
      <Footer />
    </div>
  );
};

export default MoviesView;
