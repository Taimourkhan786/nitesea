import React from 'react';

const About = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem'
    },
    section: {
      marginBottom: '3rem'
    },
    title: {
      color: '#1a1a2e',
      marginBottom: '1rem',
      fontSize: '2rem'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h1 style={styles.title}>About NiteSea</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
          NiteSea is a powerful, free online tool that allows you to resize images 
          quickly and easily. All processing happens in your browser - no uploads to 
          any server, keeping your images private and secure.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Features</h2>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚀</div>
            <h3>Fast Processing</h3>
            <p>Resize images instantly in your browser</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎨</div>
            <h3>Multiple Formats</h3>
            <p>Support for JPEG and PNG formats</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3>100% Private</h3>
            <p>All processing happens locally - no server uploads</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💯</div>
            <h3>Free Forever</h3>
            <p>No hidden costs, no watermarks, completely free</p>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>How It Works</h2>
        <ol style={{ lineHeight: '2', fontSize: '1.1rem', color: '#666' }}>
          <li>Upload your image using the file picker</li>
          <li>Set your desired width and height</li>
          <li>Choose output format and quality</li>
          <li>Click resize and download your optimized image</li>
        </ol>
      </div>
    </div>
  );
};

export default About;