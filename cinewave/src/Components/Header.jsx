import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Cinewave</h1>
      <nav>
        <Link to="/" className="navLink">Home</Link>
        <Link to="/login" className="navLink">Login</Link>
        <Link to="/register" className="navLink">Register</Link>
        <Link to="/genres" className="navLink">Movie List</Link>
      </nav>
    </header>
  );
};

export default Header;
