import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 MyMovieApp. All Rights Reserved.</p>
      <nav>
        <a href="#privacy" style={styles.link}>Privacy Policy</a> |{' '}
        <a href="#terms" style={styles.link}>Terms of Service</a>
      </nav>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Footer;
