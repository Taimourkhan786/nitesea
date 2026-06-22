import React, { useState } from 'react';

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

export default ImageResizer;