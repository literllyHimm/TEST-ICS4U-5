import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 MyMovieApp. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
};

export default Footer;
