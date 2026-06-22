import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem'
    },
    contactWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      marginTop: '2rem'
    },
    infoSection: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    formSection: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      color: '#1a1a2e'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '150px'
    },
    button: {
      backgroundColor: '#00d9ff',
      color: '#1a1a2e',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1rem',
      width: '100%'
    },
    contactInfo: {
      marginTop: '2rem'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '1rem',
      backgroundColor: '#f5f7fa',
      borderRadius: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Have questions or feedback? We'd love to hear from you!
      </p>

      <div style={styles.contactWrapper}>
        <div style={styles.infoSection}>
          <h2>Get in Touch</h2>
          <div style={styles.contactInfo}>
            <div style={styles.infoItem}>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <div>
                <strong>Email</strong>
                <p style={{ margin: 0 }}>support@nitesea.com</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <span style={{ fontSize: '1.5rem' }}>📱</span>
              <div>
                <strong>Phone</strong>
                <p style={{ margin: 0 }}>+1 (555) 123-4567</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <span style={{ fontSize: '1.5rem' }}>📍</span>
              <div>
                <strong>Address</strong>
                <p style={{ margin: 0 }}>123 Digital Street, Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.formSection}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <span style={{ fontSize: '3rem' }}>✅</span>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={styles.textarea}
                />
              </div>
              <button type="submit" style={styles.button}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;