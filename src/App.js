import React, { useState } from 'react';

// Navbar Component
const Navbar = ({ activeTab, setActiveTab }) => {
  const navStyles = {
    nav: {
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    logo: {
      color: '#00d9ff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none'
    },
    link: {
      color: '#fff',
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      transition: 'all 0.3s ease',
      borderRadius: '5px'
    },
    activeLink: {
      color: '#00d9ff',
      backgroundColor: 'rgba(0, 217, 255, 0.1)'
    }
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <div style={navStyles.logo} onClick={() => setActiveTab('home')}>
        <img 
        src="favicon.ico" 
        alt="Styled"
        style={{ width: '50px', height: 'auto', borderRadius: '10px' }}
      />  NiteSea
        </div>
        <ul style={navStyles.navLinks}>
          {['home', 'about', 'contact'].map((tab) => (
            <li
              key={tab}
              style={{
                ...navStyles.link,
                ...(activeTab === tab ? navStyles.activeLink : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Image Resizer Component
const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState(0.9);

  const resizeImage = (file, newWidth, newHeight) => {
    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setResizedImage(url);
          setLoading(false);
        }, mimeType, quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      resizeImage(file, width, height);
    }
  };

  const handleResize = () => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (file) {
      resizeImage(file, width, height);
    }
  };

  const downloadImage = () => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.href = resizedImage;
      link.download = `resized-image.${format}`;
      link.click();
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    uploadArea: {
      border: '2px dashed #00d9ff',
      borderRadius: '15px',
      padding: '3rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      marginBottom: '2rem',
      transition: 'all 0.3s ease'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    input: {
      padding: '0.5rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      width: '80px'
    },
    select: {
      padding: '0.5rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    button: {
      padding: '0.5rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    primaryButton: {
      backgroundColor: '#00d9ff',
      color: '#1a1a2e'
    },
    successButton: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    imageContainer: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '2rem'
    },
    imageCard: {
      flex: 1,
      minWidth: '300px',
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '1rem',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    image: {
      maxWidth: '100%',
      maxHeight: '400px',
      borderRadius: '10px',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadArea}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>
          🖼️ Resize Your Images Instantly
        </h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Upload an image and adjust dimensions to resize
        </p>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          style={{ marginBottom: '1rem' }}
          id="imageInput"
        />
        
        <div style={styles.controls}>
          <div style={styles.inputGroup}>
            <label>Width:</label>
            <input 
              type="number" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Height:</label>
            <input 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Format:</label>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              style={styles.select}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>
          
          <div style={styles.inputGroup}>
            <label>Quality:</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={quality} 
              onChange={(e) => setQuality(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <span>{Math.round(quality * 100)}%</span>
          </div>
          
          <button 
            onClick={handleResize}
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '⏳ Resizing...' : '🔄 Resize Image'}
          </button>
        </div>
      </div>
      
      <div style={styles.imageContainer}>
        {originalImage && (
          <div style={styles.imageCard}>
            <h3>📷 Original Image</h3>
            <img src={originalImage} alt="Original" style={styles.image} />
          </div>
        )}
        
        {resizedImage && (
          <div style={styles.imageCard}>
            <h3>✨ Resized Image ({width}x{height})</h3>
            <img src={resizedImage} alt="Resized" style={styles.image} />
            <br />
            <button 
              onClick={downloadImage}
              style={{
                ...styles.button,
                ...styles.successButton,
                marginTop: '1rem'
              }}
            >
              💾 Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// About Component
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
        <h1 style={styles.title}>About ImageResizer Pro</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
          ImageResizer Pro is a powerful, free online tool that allows you to resize images 
          quickly and easily. Built with modern web technologies, it provides a seamless 
          experience for all your image resizing needs.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Features</h2>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚀</div>
            <h3>Fast Processing</h3>
            <p>Resize images instantly with our optimized algorithm</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎨</div>
            <h3>Multiple Formats</h3>
            <p>Support for JPEG and PNG formats</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3>Privacy Focused</h3>
            <p>All processing happens in your browser - no server uploads</p>
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

// Contact Component
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
                <p style={{ margin: 0 }}>support@imageresizerpro.com</p>
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

// Home Component
const Home = () => {
  return <ImageResizer />;
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default App;