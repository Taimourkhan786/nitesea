import React, { useState, useEffect, useCallback, useMemo } from 'react';

const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState(0.9);
  const [resizeCount, setResizeCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [lastResetDate, setLastResetDate] = useState(null);

  const MAX_FREE_RESIZES = 10;
  const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

  // Update time remaining display
  const updateTimeRemaining = useCallback((milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      setTimeRemaining(`${minutes}m ${seconds}s`);
    } else {
      setTimeRemaining(`${seconds}s`);
    }
  }, []);

  // Check if reset interval has passed and reset if needed
  const checkAndResetIfNeeded = useCallback((count, lastDate) => {
    if (count < MAX_FREE_RESIZES) {
      // Don't show timer if under limit
      setTimeRemaining('');
      return;
    }

    const now = new Date();
    const timeDiff = now.getTime() - lastDate.getTime();

    if (timeDiff >= RESET_INTERVAL) {
      setResizeCount(0);
      localStorage.setItem("resizeCount", "0");
      setTimeRemaining('');
      setLastResetDate(null);
      localStorage.removeItem("lastResetDate");
    } else {
      const remaining = RESET_INTERVAL - timeDiff;
      updateTimeRemaining(remaining);
    }
  }, [RESET_INTERVAL, MAX_FREE_RESIZES, updateTimeRemaining]);

  // Load resize data from localStorage
  const loadResizeData = useCallback(() => {
    const savedCount = localStorage.getItem("resizeCount");
    const savedDate = localStorage.getItem("lastResetDate");
    
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      setResizeCount(count);
      
      if (savedDate) {
        const date = new Date(parseInt(savedDate, 10));
        setLastResetDate(date);
        checkAndResetIfNeeded(count, date);
      } else {
        // First time user or missing date
        const now = new Date();
        setLastResetDate(now);
        localStorage.setItem("lastResetDate", now.getTime().toString());
        localStorage.setItem("resizeCount", "0");
        setResizeCount(0);
      }
    } else {
      // First time user
      const now = new Date();
      setLastResetDate(now);
      localStorage.setItem("lastResetDate", now.getTime().toString());
      localStorage.setItem("resizeCount", "0");
      setResizeCount(0);
    }
  }, [checkAndResetIfNeeded]);

  // Check login status and load data
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      loadResizeData();
    }
  }, [loadResizeData]);

  // Timer to update time remaining - ONLY when limit is reached
  useEffect(() => {
    let timer = null;
    
    if (isLoggedIn && lastResetDate && resizeCount >= MAX_FREE_RESIZES) {
      timer = setInterval(() => {
        const now = new Date();
        const timeDiff = now.getTime() - lastResetDate.getTime();
        
        if (timeDiff >= RESET_INTERVAL) {
          // Reset count
          setResizeCount(0);
          localStorage.setItem("resizeCount", "0");
          const newDate = new Date();
          setLastResetDate(newDate);
          localStorage.setItem("lastResetDate", newDate.getTime().toString());
          setTimeRemaining('');
          clearInterval(timer);
        } else {
          const remaining = RESET_INTERVAL - timeDiff;
          updateTimeRemaining(remaining);
        }
      }, 1000);
    } else {
      // Hide timer when resets are available
      setTimeRemaining('');
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoggedIn, lastResetDate, resizeCount, RESET_INTERVAL, MAX_FREE_RESIZES, updateTimeRemaining]);

  const checkResizeLimit = useCallback(() => {
    if (!isLoggedIn) {
      setShowUpgradeModal(true);
      return false;
    }
    if (resizeCount >= MAX_FREE_RESIZES) {
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  }, [isLoggedIn, resizeCount, MAX_FREE_RESIZES]);

  const incrementResizeCount = useCallback(() => {
    const newCount = resizeCount + 1;
    setResizeCount(newCount);
    localStorage.setItem("resizeCount", newCount.toString());

    // Start timer ONLY when limit reaches MAX
    if (newCount === MAX_FREE_RESIZES) {
      const now = new Date();
      setLastResetDate(now);
      localStorage.setItem("lastResetDate", now.getTime().toString());
    }
  }, [resizeCount, MAX_FREE_RESIZES]);

  const resizeImage = useCallback((file, newWidth, newHeight) => {
    if (!checkResizeLimit()) {
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        
        // Enable high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 
                         format === 'png' ? 'image/png' : 'image/webp';
        const qualityValue = format === 'png' ? 1 : quality;
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setResizedImage(url);
          setLoading(false);
          // Increment count after successful resize
          incrementResizeCount();
        }, mimeType, qualityValue);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [checkResizeLimit, format, quality, incrementResizeCount]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Check limit before uploading
      if (!checkResizeLimit()) {
        e.target.value = '';
        return;
      }
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      resizeImage(file, width, height);
    }
  }, [checkResizeLimit, resizeImage, width, height]);

  const handleResize = useCallback(() => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];
    if (file) {
      resizeImage(file, width, height);
    }
  }, [resizeImage, width, height]);

  const downloadImage = useCallback(() => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.href = resizedImage;
      const ext = format === 'jpeg' ? 'jpg' : format;
      link.download = `resized-image.${ext}`;
      link.click();
    }
  }, [resizedImage, format]);

  const handleUpgrade = useCallback((plan) => {
    setShowUpgradeModal(false);
    alert(`🚀 Upgrading to ${plan} plan! Redirecting to payment...`);
  }, []);

  // Wrap styles in useMemo to prevent re-creation on every render
  const styles = useMemo(() => ({
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
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
    limitInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '1rem',
      backgroundColor: 'rgba(0, 217, 255, 0.1)',
      borderRadius: '10px',
      marginBottom: '1rem',
      gap: '10px'
    },
    limitText: {
      color: '#1a1a2e',
      fontWeight: '600',
      margin: 0
    },
    limitProgress: {
      flex: 1,
      minWidth: '150px',
      margin: '0 1rem',
      height: '8px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    limitProgressBar: {
      height: '100%',
      background: 'linear-gradient(90deg, #00d9ff, #0077ff)',
      borderRadius: '4px',
      transition: 'width 0.5s ease'
    },
    timeRemaining: {
      color: '#ff4757',
      fontSize: '13px',
      fontWeight: '600',
      padding: '4px 12px',
      backgroundColor: 'rgba(255, 71, 87, 0.1)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 71, 87, 0.3)',
      whiteSpace: 'nowrap',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    upgradeLink: {
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '8px 20px',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '14px'
    },
    upgradeLinkHover: {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)'
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
    primaryButtonHover: {
      backgroundColor: '#00c4e8',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0, 217, 255, 0.4)'
    },
    successButton: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    successButtonHover: {
      backgroundColor: '#218838',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
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
    },
    // Upgrade Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    modalContent: {
      background: 'rgba(26, 26, 46, 0.98)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      maxWidth: '700px',
      width: '100%',
      padding: '40px',
      position: 'relative',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    modalClose: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    modalTitle: {
      color: '#fff',
      fontSize: '24px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '8px'
    },
    modalSubtitle: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '24px'
    },
    modalText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      textAlign: 'center',
      lineHeight: '1.6',
      marginBottom: '24px'
    },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginTop: '16px'
    },
    pricingCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    pricingCardPopular: {
      border: '2px solid #667eea',
      background: 'rgba(102, 126, 234, 0.08)',
      boxShadow: '0 0 30px rgba(102, 126, 234, 0.15)'
    },
    popularBadge: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontSize: '10px',
      fontWeight: '700',
      padding: '4px 14px',
      borderRadius: '20px',
      display: 'inline-block',
      marginBottom: '8px',
      textTransform: 'uppercase'
    },
    pricingName: {
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600'
    },
    pricingPrice: {
      color: '#667eea',
      fontSize: '24px',
      fontWeight: '700',
      marginTop: '8px'
    },
    pricingPriceSub: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '12px'
    },
    pricingFeature: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '13px',
      padding: '4px 0'
    },
    upgradeButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      padding: '14px 28px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      marginTop: '16px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    upgradeButtonHover: {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.6)'
    },
    upgradeButtonPro: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#fff',
      padding: '14px 28px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      marginTop: '16px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
    },
    upgradeButtonProHover: {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 8px 30px rgba(245, 87, 108, 0.6)'
    },
    upgradeButtonEnterprise: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#fff',
      padding: '14px 28px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      marginTop: '16px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
    },
    upgradeButtonEnterpriseHover: {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 8px 30px rgba(79, 172, 254, 0.6)'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '8px',
      justifyContent: 'center'
    },
    closeButton: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.7)',
      padding: '12px 28px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '16px',
      display: 'inline-block',
      fontSize: '15px'
    },
    closeButtonHover: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#fff'
    },
    signupButton: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#1a1a2e',
      padding: '14px 28px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      marginTop: '16px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(67, 233, 123, 0.4)'
    },
    signupButtonHover: {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 8px 30px rgba(67, 233, 123, 0.6)'
    },
    currencyBadge: {
      display: 'inline-block',
      background: 'rgba(255, 215, 0, 0.15)',
      color: '#ffd700',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      marginLeft: '6px'
    },
    limitReachedBanner: {
      background: 'linear-gradient(135deg, #ff4757, #ff6b81)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      marginTop: '12px',
      animation: 'pulse-banner 2s infinite'
    },
    resetInfo: {
      fontSize: '13px',
      color: '#666',
      padding: '4px 12px',
      backgroundColor: 'rgba(0, 217, 255, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(0, 217, 255, 0.1)'
    }
  }), []); // Empty dependency array since styles don't change

  // Render Upgrade Modal
  const renderUpgradeModal = useCallback(() => {
    const remaining = MAX_FREE_RESIZES - resizeCount;

    return (
      <div style={styles.modalOverlay} onClick={() => setShowUpgradeModal(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button 
            style={styles.modalClose} 
            onClick={() => setShowUpgradeModal(false)}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, {
                background: 'rgba(255, 255, 255, 0.1)'
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, {
                background: 'rgba(255, 255, 255, 0.05)'
              });
            }}
          >
            ✕
          </button>

          <h2 style={styles.modalTitle}>🚀 Upgrade Your Plan</h2>
          <p style={styles.modalSubtitle}>
            {!isLoggedIn ? 'Sign in or create an account to get started' : 
             resizeCount >= MAX_FREE_RESIZES ? 
             `⚠️ You've used all ${MAX_FREE_RESIZES} free resizes! (Resets in ${timeRemaining})` :
             `You've used ${resizeCount} of ${MAX_FREE_RESIZES} free resizes`}
          </p>

          {!isLoggedIn ? (
            <>
              <p style={styles.modalText}>
                Create a free account to get <strong>10 free image resizes</strong> and access 
                to premium features. Upgrade to our paid plans for unlimited access.
              </p>
              <div style={styles.buttonGroup}>
                <button 
                  style={styles.signupButton}
                  onClick={() => {
                    setShowUpgradeModal(false);
                    window.location.href = '/signup';
                  }}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.signupButtonHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      transform: 'translateY(0) scale(1)',
                      boxShadow: '0 4px 15px rgba(67, 233, 123, 0.4)'
                    });
                  }}
                >
                  📝 Sign Up Free
                </button>
                <button 
                  style={styles.closeButton}
                  onClick={() => {
                    setShowUpgradeModal(false);
                    window.location.href = '/login';
                  }}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.closeButtonHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.7)'
                    });
                  }}
                >
                  🔐 Login
                </button>
              </div>
            </>
          ) : resizeCount >= MAX_FREE_RESIZES ? (
            <>
              <p style={styles.modalText}>
                ⏰ You've used all <strong style={{ color: '#ff4757' }}>10 free resizes</strong>!
                <br />
                <strong style={{ color: '#667eea' }}>🔄 Resets in: {timeRemaining}</strong>
              </p>
              <p style={styles.modalText}>
                Upgrade to our paid plans for <strong>unlimited resizes</strong>, faster processing, 
                and high-resolution exports. Don't wait for the timer to reset!
              </p>
            </>
          ) : (
            <p style={styles.modalText}>
              You have <strong style={{ color: '#667eea' }}>{remaining}</strong> free resizes remaining. 
              Upgrade to our paid plans for unlimited resizes, faster processing, and high-resolution exports.
            </p>
          )}

          <h4 style={{ color: '#fff', fontSize: '16px', textAlign: 'center', marginTop: '16px' }}>
            Choose Your Plan <span style={styles.currencyBadge}>🇵🇰 PKR</span>
          </h4>

          <div style={styles.pricingGrid}>
            {/* Free Plan */}
            <div style={styles.pricingCard}>
              <div style={styles.pricingName}>Free</div>
              <div style={styles.pricingPrice}>₨ 0</div>
              <div style={styles.pricingPriceSub}>Forever</div>
              <div style={styles.pricingFeature}>📸 10 free resizes</div>
              <div style={styles.pricingFeature}>🔄 Resets after 24 hours</div>
              <div style={styles.pricingFeature}>🖼️ Standard quality</div>
              <div style={styles.pricingFeature}>📁 Basic formats</div>
              {!isLoggedIn ? (
                <button 
                  style={styles.signupButton}
                  onClick={() => {
                    setShowUpgradeModal(false);
                    window.location.href = '/signup';
                  }}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.signupButtonHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      transform: 'translateY(0) scale(1)',
                      boxShadow: '0 4px 15px rgba(67, 233, 123, 0.4)'
                    });
                  }}
                >
                  📝 Sign Up Free
                </button>
              ) : resizeCount >= MAX_FREE_RESIZES ? (
                <button 
                  style={{
                    ...styles.upgradeButton,
                    opacity: 0.5,
                    cursor: 'default'
                  }}
                >
                  ⏰ Limit Reached
                </button>
              ) : (
                <button 
                  style={{
                    ...styles.upgradeButton,
                    opacity: 0.5,
                    cursor: 'default'
                  }}
                >
                  ✅ Current Plan
                </button>
              )}
            </div>

            {/* Pro Plan - Popular */}
            <div style={{...styles.pricingCard, ...styles.pricingCardPopular}}>
              <div style={styles.popularBadge}>⭐ Popular</div>
              <div style={styles.pricingName}>Pro</div>
              <div style={styles.pricingPrice}>₨ 2,799</div>
              <div style={styles.pricingPriceSub}>Monthly</div>
              <div style={styles.pricingFeature}>♾️ Unlimited resizes</div>
              <div style={styles.pricingFeature}>✨ High quality (100%)</div>
              <div style={styles.pricingFeature}>📁 All formats (JPEG, PNG, WebP, SVG)</div>
              <div style={styles.pricingFeature}>⚡ 5x faster processing</div>
              <div style={styles.pricingFeature}>📱 4K resolution support</div>
              <div style={styles.pricingFeature}>📦 Batch processing (up to 50 images)</div>
              <button 
                style={styles.upgradeButtonPro}
                onClick={() => handleUpgrade('Pro')}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.upgradeButtonProHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: 'translateY(0) scale(1)',
                    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
                  });
                }}
              >
                🚀 Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div style={styles.pricingCard}>
              <div style={styles.pricingName}>Enterprise</div>
              <div style={styles.pricingPrice}>₨ 8,399</div>
              <div style={styles.pricingPriceSub}>Monthly</div>
              <div style={styles.pricingFeature}>♾️ Everything in Pro</div>
              <div style={styles.pricingFeature}>⚡ 10x faster processing</div>
              <div style={styles.pricingFeature}>📱 8K resolution support</div>
              <div style={styles.pricingFeature}>📦 Batch processing (unlimited)</div>
              <div style={styles.pricingFeature}>🤖 AI-powered enhancement</div>
              <div style={styles.pricingFeature}>🛡️ Priority support 24/7</div>
              <div style={styles.pricingFeature}>👥 Team collaboration</div>
              <button 
                style={styles.upgradeButtonEnterprise}
                onClick={() => handleUpgrade('Enterprise')}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.upgradeButtonEnterpriseHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: 'translateY(0) scale(1)',
                    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
                  });
                }}
              >
                🚀 Upgrade to Enterprise
              </button>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              style={styles.closeButton}
              onClick={() => setShowUpgradeModal(false)}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.closeButtonHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.7)'
                });
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }, [isLoggedIn, resizeCount, timeRemaining, MAX_FREE_RESIZES, handleUpgrade, styles]);

  return (
    <div style={styles.container}>
      <div style={styles.uploadArea}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '1rem' }}>
          🖼️ Resize Your Images Instantly
        </h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Upload an image and adjust dimensions to resize
        </p>

        {/* Limit Info */}
        <div style={styles.limitInfo}>
          <p style={styles.limitText}>
            🔒 {isLoggedIn ? `${resizeCount} / ${MAX_FREE_RESIZES} Free Resizes` : 'Sign in to resize'}
          </p>
          <div style={styles.limitProgress}>
            <div style={{
              ...styles.limitProgressBar,
              width: isLoggedIn ? `${(resizeCount / MAX_FREE_RESIZES) * 100}%` : '0%',
              background: resizeCount >= MAX_FREE_RESIZES ? '#ff4757' : 'linear-gradient(90deg, #667eea, #764ba2)'
            }}></div>
          </div>
          {/* Show timer ONLY when limit is reached (10/10) */}
          {isLoggedIn && resizeCount >= MAX_FREE_RESIZES && timeRemaining && (
            <span style={styles.timeRemaining}>
              ⏰ Resets in {timeRemaining}
            </span>
          )}
          {isLoggedIn && resizeCount >= MAX_FREE_RESIZES && (
            <span 
              style={styles.upgradeLink} 
              onClick={() => setShowUpgradeModal(true)}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.upgradeLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  transform: 'translateY(0) scale(1)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                });
              }}
            >
              ⚡ Upgrade Now - Get Unlimited!
            </span>
          )}
          {!isLoggedIn && (
            <span 
              style={styles.upgradeLink} 
              onClick={() => setShowUpgradeModal(true)}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.upgradeLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  transform: 'translateY(0) scale(1)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                });
              }}
            >
              🔐 Sign in to start resizing
            </span>
          )}
        </div>

        {/* Limit Reached Banner - ONLY when limit is reached (10/10) */}
        {isLoggedIn && resizeCount >= MAX_FREE_RESIZES && (
          <div style={styles.limitReachedBanner}>
            <span>⚠️ You've used all 10 free resizes!</span>
            <span>⏰ Next reset in: <strong>{timeRemaining || '0s'}</strong></span>
            <span 
              style={{...styles.upgradeLink, padding: '6px 16px', fontSize: '13px'}}
              onClick={() => setShowUpgradeModal(true)}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.upgradeLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  transform: 'translateY(0) scale(1)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                });
              }}
            >
              🚀 Upgrade Now
            </span>
          </div>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          style={{ 
            marginBottom: '1rem',
            opacity: (isLoggedIn && resizeCount >= MAX_FREE_RESIZES) ? 0.5 : 1,
            cursor: (isLoggedIn && resizeCount >= MAX_FREE_RESIZES) ? 'not-allowed' : 'pointer'
          }}
          id="imageInput"
          disabled={isLoggedIn && resizeCount >= MAX_FREE_RESIZES}
        />
        
        <div style={styles.controls}>
          <div style={styles.inputGroup}>
            <label>Width:</label>
            <input 
              type="number" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value))}
              style={styles.input}
              min="1"
              max="7680"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Height:</label>
            <input 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              style={styles.input}
              min="1"
              max="7680"
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
              <option value="webp">WebP</option>
            </select>
          </div>
          
          <div style={styles.inputGroup}>
            <label>Quality:</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={quality} 
              onChange={(e) => setQuality(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <span>{Math.round(quality * 100)}%</span>
          </div>
          
          <button 
            onClick={handleResize}
            disabled={loading || (isLoggedIn && resizeCount >= MAX_FREE_RESIZES)}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: (loading || (isLoggedIn && resizeCount >= MAX_FREE_RESIZES)) ? 0.6 : 1,
              cursor: (isLoggedIn && resizeCount >= MAX_FREE_RESIZES) ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!(loading || (isLoggedIn && resizeCount >= MAX_FREE_RESIZES))) {
                Object.assign(e.target.style, styles.primaryButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!(loading || (isLoggedIn && resizeCount >= MAX_FREE_RESIZES))) {
                Object.assign(e.target.style, {
                  backgroundColor: '#00d9ff',
                  transform: 'scale(1)',
                  boxShadow: 'none'
                });
              }
            }}
          >
            {loading ? '⏳ Resizing...' : 
             (isLoggedIn && resizeCount >= MAX_FREE_RESIZES) ? '🔒 Limit Reached' : 
             '🔄 Resize Image'}
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
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.successButtonHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  backgroundColor: '#28a745',
                  transform: 'scale(1)',
                  boxShadow: 'none'
                });
              }}
            >
              💾 Download Image
            </button>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && renderUpgradeModal()}
    </div>
  );
};

export default ImageResizer;