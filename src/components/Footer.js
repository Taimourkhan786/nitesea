import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      background: "rgba(26, 26, 46, 0.95)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "60px 20px 20px",
      marginTop: "auto",
      width: "100%",
      boxSizing: "border-box",
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px",
    },

    section: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    title: {
      color: "#fff",
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      letterSpacing: "0.5px",
    },

    link: {
      color: "rgba(255, 255, 255, 0.6)",
      textDecoration: "none",
      fontSize: "14px",
      transition: "all 0.3s ease",
      padding: "4px 0",
      display: "inline-block",
      cursor: "pointer",
    },

    linkHover: {
      color: "#00d9ff",
      transform: "translateX(4px)",
    },

    brand: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#00d9ff",
      fontWeight: "700",
      fontSize: "20px",
      textDecoration: "none",
    },

    description: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "14px",
      lineHeight: "1.6",
      maxWidth: "300px",
    },

    bottom: {
      borderTop: "1px solid rgba(255,255,255,0.06)",
      paddingTop: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    copyright: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "13px",
    },

    bottomLinks: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },

    bottomLink: {
      color: "rgba(255, 255, 255, 0.4)",
      textDecoration: "none",
      fontSize: "13px",
      transition: "all 0.3s ease",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      font: "inherit",
    },

    bottomLinkHover: {
      color: "#00d9ff",
    },

    badge: {
      background: "rgba(0, 217, 255, 0.1)",
      color: "#00d9ff",
      fontSize: "10px",
      padding: "2px 8px",
      borderRadius: "10px",
      fontWeight: "600",
      marginLeft: "6px",
      textTransform: "uppercase",
    },

    // Modal styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(10px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },

    modalContent: {
      background: "rgba(26, 26, 46, 0.98)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      maxWidth: "700px",
      width: "100%",
      padding: "40px",
      position: "relative",
      maxHeight: "80vh",
      overflowY: "auto",
    },

    modalClose: {
      position: "absolute",
      top: "16px",
      right: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      color: "#fff",
      fontSize: "18px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    },

    modalTitle: {
      color: "#fff",
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "8px",
    },

    modalSubtitle: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "14px",
      marginBottom: "24px",
    },

    modalText: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "15px",
      lineHeight: "1.8",
      marginBottom: "16px",
    },

    modalSubtitle2: {
      color: "#00d9ff",
      fontSize: "18px",
      fontWeight: "600",
      marginTop: "24px",
      marginBottom: "12px",
    },

    modalList: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "15px",
      lineHeight: "1.8",
      paddingLeft: "20px",
      marginBottom: "16px",
    },

    modalListItem: {
      marginBottom: "10px",
    },

    modalBadge: {
      display: "inline-block",
      background: "rgba(0, 217, 255, 0.1)",
      color: "#00d9ff",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      marginRight: "8px",
    },

    closeButton: {
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      color: "#fff",
      padding: "14px 32px",
      borderRadius: "10px",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "24px",
      display: "inline-block",
      fontSize: "16px",
    },

    closeButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(0, 217, 255, 0.3)",
    },

    techGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },

    techCard: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
    },

    techIcon: {
      fontSize: "32px",
      marginBottom: "8px",
    },

    techLabel: {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "13px",
      fontWeight: "500",
    },

    faqItem: {
      marginBottom: "20px",
      padding: "16px",
      background: "rgba(255, 255, 255, 0.02)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.04)",
    },

    faqQuestion: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    faqAnswer: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "14px",
      lineHeight: "1.7",
    },

    buttonGroup: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "8px",
      justifyContent: "center",
    },

    communityGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },

    communityCard: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      transition: "all 0.3s ease",
    },

    communityIcon: {
      fontSize: "40px",
      marginBottom: "12px",
    },

    communityName: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "4px",
    },

    communityDesc: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "13px",
    },

    helpGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },

    helpCard: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "12px",
      padding: "20px",
      transition: "all 0.3s ease",
    },

    helpTitle: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "8px",
    },

    helpDesc: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "14px",
      lineHeight: "1.6",
    },

    helpIcon: {
      fontSize: "28px",
      marginBottom: "8px",
    },

    sitemapGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "16px",
    },

    sitemapColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    sitemapTitle: {
      color: "#00d9ff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "4px",
    },

    sitemapLink: {
      color: "rgba(255, 255, 255, 0.6)",
      textDecoration: "none",
      fontSize: "14px",
      transition: "all 0.3s ease",
      padding: "2px 0",
      background: "none",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      font: "inherit",
    },

    sitemapLinkHover: {
      color: "#fff",
      transform: "translateX(4px)",
    },

    // Press Kit specific styles
    pressGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginTop: "16px",
      marginBottom: "16px",
    },

    pressCard: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "12px",
      padding: "16px",
      textAlign: "center",
      transition: "all 0.3s ease",
    },

    pressCardHover: {
      background: "rgba(255, 255, 255, 0.06)",
      transform: "translateY(-2px)",
      borderColor: "rgba(0, 217, 255, 0.3)",
    },

    pressIcon: {
      fontSize: "28px",
      marginBottom: "8px",
      display: "block",
    },

    pressLabel: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "4px",
    },

    pressSubLabel: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "12px",
    },

    sizeGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "12px",
      marginTop: "12px",
      marginBottom: "16px",
    },

    sizeCard: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "8px",
      padding: "12px",
      textAlign: "center",
    },

    sizeDimension: {
      color: "#00d9ff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "4px",
    },

    sizeLabel: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "12px",
    },

    formatGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      gap: "12px",
      marginTop: "12px",
      marginBottom: "16px",
    },

    formatCard: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "8px",
      padding: "12px",
      textAlign: "center",
    },

    formatName: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
      fontWeight: "500",
    },

    formatExt: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "11px",
    },

    qualityGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "12px",
      marginTop: "12px",
      marginBottom: "16px",
    },

    qualityCard: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "8px",
      padding: "12px",
      textAlign: "center",
    },

    qualityDot: {
      display: "inline-block",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      marginRight: "6px",
    },

    qualityName: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
      fontWeight: "500",
    },

    qualityDesc: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "11px",
      marginTop: "4px",
    },

    socialGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "12px",
      marginTop: "12px",
      marginBottom: "16px",
    },

    socialCard: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "8px",
      padding: "12px",
      textAlign: "center",
    },

    socialIcon: {
      fontSize: "24px",
      marginBottom: "4px",
      display: "block",
    },

    socialName: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "13px",
      fontWeight: "500",
    },

    socialSizes: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "12px",
    },
  };

  // Modal state
  const [modalContent, setModalContent] = React.useState(null);

  const openModal = (type) => {
    if (type === "about") {
      setModalContent({
        title: "About NiteSea",
        content: (
          <>
            <p style={styles.modalText}>
              NiteSea is a cutting-edge digital platform dedicated to providing 
              seamless and innovative experiences for users worldwide. Founded 
              in 2026, we've quickly become a trusted name in the tech industry.
            </p>
            <h4 style={styles.modalSubtitle2}>Our Mission</h4>
            <p style={styles.modalText}>
              To empower individuals and businesses through intuitive technology 
              solutions that simplify complex processes and enhance digital 
              interactions.
            </p>
            <h4 style={styles.modalSubtitle2}>Our Values</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>✨ Innovation - Constantly pushing boundaries</li>
              <li style={styles.modalListItem}>🤝 Trust - Building reliable solutions</li>
              <li style={styles.modalListItem}>🌍 Global - Serving users worldwide</li>
              <li style={styles.modalListItem}>💡 Simplicity - Making tech accessible</li>
            </ul>
            <h4 style={styles.modalSubtitle2}>Our Vision</h4>
            <p style={styles.modalText}>
              To become the go-to platform for digital solutions, connecting 
              millions of users through innovative technology and exceptional 
              user experiences.
            </p>
            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "careers") {
      setModalContent({
        title: "Careers at NiteSea",
        content: (
          <>
            <p style={styles.modalText}>
              Join our dynamic team and help shape the future of digital 
              innovation. At NiteSea, we're building a culture of excellence, 
              creativity, and collaboration.
            </p>
            <h4 style={styles.modalSubtitle2}>Why Work With Us?</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>🚀 Work on cutting-edge technology</li>
              <li style={styles.modalListItem}>🌍 Remote-first culture</li>
              <li style={styles.modalListItem}>💼 Competitive salary and benefits</li>
              <li style={styles.modalListItem}>📈 Career growth opportunities</li>
              <li style={styles.modalListItem}>🎯 Impact millions of users</li>
            </ul>
            <h4 style={styles.modalSubtitle2}>Open Positions</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>💻 Senior Full Stack Developer</li>
              <li style={styles.modalListItem}>🎨 UI/UX Designer</li>
              <li style={styles.modalListItem}>📊 Data Scientist</li>
              <li style={styles.modalListItem}>🛡️ Security Engineer</li>
              <li style={styles.modalListItem}>📱 Mobile App Developer</li>
            </ul>
            <h4 style={styles.modalSubtitle2}>Benefits</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>🏥 Health & wellness benefits</li>
              <li style={styles.modalListItem}>🏖️ Unlimited PTO</li>
              <li style={styles.modalListItem}>📚 Learning & development budget</li>
              <li style={styles.modalListItem}>🏠 Work from anywhere</li>
              <li style={styles.modalListItem}>🎉 Team retreats & events</li>
            </ul>
            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "news") {
      setModalContent({
        title: "News & Updates",
        subtitle: "Pioneering the Future of Immersive Technology",
        content: (
          <>
            <p style={styles.modalSubtitle}>
              Stay ahead of the curve with our latest innovations in AR, VR, 
              and emerging technologies.
            </p>

            <h4 style={styles.modalSubtitle2}>🚀 Our Vision for the Future</h4>
            <p style={styles.modalText}>
              At NiteSea, we're not just following technology trends — we're creating them. 
              Our mission is to revolutionize how people interact with digital content through 
              cutting-edge Augmented Reality (AR) and Virtual Reality (VR) solutions.
            </p>

            <h4 style={styles.modalSubtitle2}>🌐 Innovative Technology Focus</h4>
            <div style={styles.techGrid}>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>🥽</div>
                <div style={styles.techLabel}>Virtual Reality</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>📱</div>
                <div style={styles.techLabel}>Augmented Reality</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>🤖</div>
                <div style={styles.techLabel}>AI Integration</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>🌍</div>
                <div style={styles.techLabel}>Spatial Computing</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>🔬 What We're Working On</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>AR</span>
                Next-generation Augmented Reality experiences for education and training
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>VR</span>
                Immersive Virtual Reality environments for collaboration and entertainment
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>AI</span>
                AI-powered content generation for interactive experiences
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>MR</span>
                Mixed Reality solutions for enterprise and industrial applications
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>3D</span>
                Advanced 3D scanning and modeling for digital twins
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>📊 Impact & Innovation</h4>
            <p style={styles.modalText}>
              Our team of engineers, designers, and visionaries are pushing the boundaries 
              of what's possible. From immersive training simulations to interactive 
              entertainment, we're building the metaverse of tomorrow — today.
            </p>

            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>🎯 50+ AR/VR projects in development</li>
              <li style={styles.modalListItem}>🌍 15 countries impacted by our technology</li>
              <li style={styles.modalListItem}>💡 10+ patents filed for immersive technology</li>
              <li style={styles.modalListItem}>🚀 5x revenue growth in immersive tech</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>📰 Latest Updates</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>New</span>
                Launching NiteSea Immersive Platform Q4 2026
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>Update</span>
                AR SDK 2.0 with enhanced spatial mapping
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>Coming</span>
                VR Collaboration Suite for remote teams
              </li>
            </ul>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "press") {
      setModalContent({
        title: "📸 Press Kit",
        subtitle: "Image Resizing & Media Resources for Content Creators",
        content: (
          <>
            <p style={styles.modalText}>
              Welcome to the NiteSea Press Kit. Our platform offers powerful image 
              resizing capabilities to help you create perfect visuals for any 
              platform or use case.
            </p>

            <h4 style={styles.modalSubtitle2}>🖼️ Image Resizing Features</h4>
            <div style={styles.pressGrid}>
              <div style={styles.pressCard}>
                <span style={styles.pressIcon}>📐</span>
                <div style={styles.pressLabel}>Bulk Resize</div>
                <div style={styles.pressSubLabel}>Multiple images at once</div>
              </div>
              <div style={styles.pressCard}>
                <span style={styles.pressIcon}>🎯</span>
                <div style={styles.pressLabel}>Smart Presets</div>
                <div style={styles.pressSubLabel}>Social media optimized</div>
              </div>
              <div style={styles.pressCard}>
                <span style={styles.pressIcon}>🔍</span>
                <div style={styles.pressLabel}>Smart Cropping</div>
                <div style={styles.pressSubLabel}>AI-powered focus</div>
              </div>
              <div style={styles.pressCard}>
                <span style={styles.pressIcon}>⚡</span>
                <div style={styles.pressLabel}>AI Optimization</div>
                <div style={styles.pressSubLabel}>Lightning fast</div>
              </div>
              <div style={styles.pressCard}>
                <span style={styles.pressIcon}>🔄</span>
                <div style={styles.pressLabel}>Format Conversion</div>
                <div style={styles.pressSubLabel}>JPG, PNG, WebP, SVG</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>📏 Standard Image Sizes</h4>
            <div style={styles.sizeGrid}>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>1920×1080</div>
                <div style={styles.sizeLabel}>Full HD</div>
              </div>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>1280×720</div>
                <div style={styles.sizeLabel}>HD Ready</div>
              </div>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>1080×1080</div>
                <div style={styles.sizeLabel}>Square (Instagram)</div>
              </div>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>1200×630</div>
                <div style={styles.sizeLabel}>Social Share</div>
              </div>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>800×800</div>
                <div style={styles.sizeLabel}>Product Image</div>
              </div>
              <div style={styles.sizeCard}>
                <div style={styles.sizeDimension}>400×400</div>
                <div style={styles.sizeLabel}>Avatar/Icon</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>📱 Social Media Presets</h4>
            <div style={styles.socialGrid}>
              <div style={styles.socialCard}>
                <span style={styles.socialIcon}>📷</span>
                <div style={styles.socialName}>Instagram</div>
                <div style={styles.socialSizes}>1080×1080 | 1080×1350 | 1080×608</div>
              </div>
              <div style={styles.socialCard}>
                <span style={styles.socialIcon}>🐦</span>
                <div style={styles.socialName}>Twitter/X</div>
                <div style={styles.socialSizes}>1200×675 | 800×418 | 1200×1200</div>
              </div>
              <div style={styles.socialCard}>
                <span style={styles.socialIcon}>💼</span>
                <div style={styles.socialName}>LinkedIn</div>
                <div style={styles.socialSizes}>1200×627 | 800×420 | 1200×1200</div>
              </div>
              <div style={styles.socialCard}>
                <span style={styles.socialIcon}>📘</span>
                <div style={styles.socialName}>Facebook</div>
                <div style={styles.socialSizes}>1200×630 | 1080×1080 | 820×360</div>
              </div>
              <div style={styles.socialCard}>
                <span style={styles.socialIcon}>▶️</span>
                <div style={styles.socialName}>YouTube</div>
                <div style={styles.socialSizes}>1280×720 | 1920×1080 | 2560×1440</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>🎨 Image Quality Presets</h4>
            <div style={styles.qualityGrid}>
              <div style={styles.qualityCard}>
                <div>
                  <span style={{...styles.qualityDot, background: "#00ff88"}}></span>
                  <span style={styles.qualityName}>High Quality</span>
                </div>
                <div style={styles.qualityDesc}>100% - Print & Professional</div>
              </div>
              <div style={styles.qualityCard}>
                <div>
                  <span style={{...styles.qualityDot, background: "#ffdd00"}}></span>
                  <span style={styles.qualityName}>Web Quality</span>
                </div>
                <div style={styles.qualityDesc}>80% - Optimal for websites</div>
              </div>
              <div style={styles.qualityCard}>
                <div>
                  <span style={{...styles.qualityDot, background: "#ff8800"}}></span>
                  <span style={styles.qualityName}>Social Quality</span>
                </div>
                <div style={styles.qualityDesc}>70% - Fast loading for social media</div>
              </div>
              <div style={styles.qualityCard}>
                <div>
                  <span style={{...styles.qualityDot, background: "#ff4444"}}></span>
                  <span style={styles.qualityName}>Preview Quality</span>
                </div>
                <div style={styles.qualityDesc}>50% - Thumbnails & previews</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>📦 Supported Formats</h4>
            <div style={styles.formatGrid}>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>JPG</div>
                <div style={styles.formatExt}>.jpg .jpeg</div>
              </div>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>PNG</div>
                <div style={styles.formatExt}>.png</div>
              </div>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>WebP</div>
                <div style={styles.formatExt}>.webp</div>
              </div>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>SVG</div>
                <div style={styles.formatExt}>.svg</div>
              </div>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>BMP</div>
                <div style={styles.formatExt}>.bmp</div>
              </div>
              <div style={styles.formatCard}>
                <div style={styles.formatName}>GIF</div>
                <div style={styles.formatExt}>.gif</div>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "faq") {
      setModalContent({
        title: "❓ FAQ",
        subtitle: "Frequently Asked Questions About Image Resizing",
        content: (
          <>
            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>🖼️</span> What is image resizing?
              </div>
              <div style={styles.faqAnswer}>
                Image resizing is the process of changing the dimensions (width and height) 
                of an image while maintaining or adjusting its quality. It's essential for 
                optimizing images for different platforms, devices, and use cases.
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>📐</span> Why do I need to resize images?
              </div>
              <div style={styles.faqAnswer}>
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>📱 Optimize for different screen sizes and devices</li>
                  <li style={styles.modalListItem}>🚀 Improve website loading speed</li>
                  <li style={styles.modalListItem}>📷 Ensure proper display on social media platforms</li>
                  <li style={styles.modalListItem}>💾 Reduce storage space and bandwidth usage</li>
                  <li style={styles.modalListItem}>📧 Meet specific requirements for email or print</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>🎯</span> What are the best image sizes for social media?
              </div>
              <div style={styles.faqAnswer}>
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>📷 Instagram: 1080×1080 (Square) | 1080×1350 (Portrait) | 1080×608 (Landscape)</li>
                  <li style={styles.modalListItem}>🐦 Twitter/X: 1200×675 (Header) | 800×418 (Post) | 1200×1200 (Profile)</li>
                  <li style={styles.modalListItem}>💼 LinkedIn: 1200×627 (Post) | 800×420 (Banner) | 400×400 (Profile)</li>
                  <li style={styles.modalListItem}>📘 Facebook: 1200×630 (Post) | 1080×1080 (Square) | 820×360 (Cover)</li>
                  <li style={styles.modalListItem}>▶️ YouTube: 1280×720 (Thumbnail) | 1920×1080 (HD) | 2560×1440 (4K)</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>🔄</span> What image formats are supported?
              </div>
              <div style={styles.faqAnswer}>
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>🖼️ <strong>JPG</strong> - Best for photos and complex images (small file size)</li>
                  <li style={styles.modalListItem}>🖼️ <strong>PNG</strong> - Best for graphics with transparency (lossless quality)</li>
                  <li style={styles.modalListItem}>🖼️ <strong>WebP</strong> - Modern format with superior compression (recommended)</li>
                  <li style={styles.modalListItem}>🖼️ <strong>SVG</strong> - Best for logos and icons (scalable vector)</li>
                  <li style={styles.modalListItem}>🖼️ <strong>GIF</strong> - Best for simple animations and graphics</li>
                  <li style={styles.modalListItem}>🖼️ <strong>BMP</strong> - Uncompressed format for high-quality prints</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>⚡</span> Does resizing affect image quality?
              </div>
              <div style={styles.faqAnswer}>
                Yes, resizing can affect image quality depending on the method used.
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>🔍 <strong>Upscaling</strong> (enlarging) - Can cause pixelation and blurriness</li>
                  <li style={styles.modalListItem}>🔍 <strong>Downscaling</strong> (reducing) - Usually maintains or improves quality</li>
                  <li style={styles.modalListItem}>🤖 <strong>AI Enhancement</strong> - Uses AI to upscale without losing quality</li>
                  <li style={styles.modalListItem}>🎨 <strong>Quality Presets</strong> - Choose High/Medium/Low based on need</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>📊</span> How does batch processing work?
              </div>
              <div style={styles.faqAnswer}>
                Batch processing allows you to resize multiple images simultaneously with the same settings.
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>📁 Upload multiple images at once</li>
                  <li style={styles.modalListItem}>🎯 Apply same size settings to all images</li>
                  <li style={styles.modalListItem}>🔄 Convert to the same format</li>
                  <li style={styles.modalListItem}>📥 Download all resized images in a ZIP file</li>
                  <li style={styles.modalListItem}>⏱️ Saves time and ensures consistency</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>🤖</span> What is AI-powered smart cropping?
              </div>
              <div style={styles.faqAnswer}>
                AI-powered smart cropping uses artificial intelligence to intelligently determine 
                the most important parts of an image and crop accordingly.
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>🎯 Detects faces, objects, and key elements</li>
                  <li style={styles.modalListItem}>📐 Maintains composition and balance</li>
                  <li style={styles.modalListItem}>🔄 Automatic focus on the subject</li>
                  <li style={styles.modalListItem}>🎨 Preserves the most visually appealing parts</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>💾</span> How do I optimize images for web?
              </div>
              <div style={styles.faqAnswer}>
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>📐 Use appropriate dimensions (usually 800-1920px width)</li>
                  <li style={styles.modalListItem}>🔄 Use WebP format for better compression</li>
                  <li style={styles.modalListItem}>🎨 Compress without visible quality loss (80% quality)</li>
                  <li style={styles.modalListItem}>📱 Use responsive images for different devices</li>
                  <li style={styles.modalListItem}>⚡ Lazy loading for faster page load</li>
                </ul>
              </div>
            </div>

            <div style={styles.faqItem}>
              <div style={styles.faqQuestion}>
                <span>🔒</span> Are my images secure?
              </div>
              <div style={styles.faqAnswer}>
                Yes! We take data security seriously:
                <ul style={styles.modalList}>
                  <li style={styles.modalListItem}>🔐 All uploads are encrypted</li>
                  <li style={styles.modalListItem}>🗑️ Images are deleted after processing</li>
                  <li style={styles.modalListItem}>📁 Secure storage with version control</li>
                  <li style={styles.modalListItem}>🔒 GDPR compliant data handling</li>
                  <li style={styles.modalListItem}>🛡️ No data sharing with third parties</li>
                </ul>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "community") {
      setModalContent({
        title: "🌍 Community",
        subtitle: "Join Our Growing Community of Innovators",
        content: (
          <>
            <p style={styles.modalText}>
              Welcome to the NiteSea community! Connect with developers, creators, 
              and innovators from around the world who are passionate about AR/VR 
              technology and digital innovation.
            </p>

            <h4 style={styles.modalSubtitle2}>👥 Community Stats</h4>
            <div style={styles.communityGrid}>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>👨‍💻</div>
                <div style={styles.communityName}>10K+</div>
                <div style={styles.communityDesc}>Active Members</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>🌍</div>
                <div style={styles.communityName}>50+</div>
                <div style={styles.communityDesc}>Countries</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>💬</div>
                <div style={styles.communityName}>500+</div>
                <div style={styles.communityDesc}>Discussions Monthly</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>🚀</div>
                <div style={styles.communityName}>100+</div>
                <div style={styles.communityDesc}>Projects Launched</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>🌟 Community Highlights</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🎯</span>
                Weekly AR/VR development challenges and hackathons
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📚</span>
                Community-driven learning resources and tutorials
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🤝</span>
                Mentor program connecting experts with beginners
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🏆</span>
                Monthly innovation awards and recognition
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>💬 Community Channels</h4>
            <div style={styles.communityGrid}>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>💬</div>
                <div style={styles.communityName}>Discord</div>
                <div style={styles.communityDesc}>Real-time chat & collaboration</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>📋</div>
                <div style={styles.communityName}>Forum</div>
                <div style={styles.communityDesc}>Discussions & support</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>🎥</div>
                <div style={styles.communityName}>YouTube</div>
                <div style={styles.communityDesc}>Tutorials & demos</div>
              </div>
              <div style={styles.communityCard}>
                <div style={styles.communityIcon}>🐦</div>
                <div style={styles.communityName}>Twitter</div>
                <div style={styles.communityDesc}>Updates & announcements</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>🎯 Upcoming Events</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📅</span>
                AR/VR Hackathon 2026 - July 15-17
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📅</span>
                Community Meetup (Virtual) - August 5
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📅</span>
                NiteSea Innovation Summit - September 20-22
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📅</span>
                Developer Workshop Series - Every Tuesday
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>🤝 How to Get Involved</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>1</span>
                Join our Discord or Forum channels
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>2</span>
                Participate in weekly challenges
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>3</span>
                Share your projects and get feedback
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>4</span>
                Contribute to open-source projects
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>5</span>
                Become a community ambassador
              </li>
            </ul>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "help") {
      setModalContent({
        title: "🆘 Help Center",
        subtitle: "Everything You Need to Get Started",
        content: (
          <>
            <p style={styles.modalText}>
              Welcome to the NiteSea Help Center! Find answers to common questions, 
              troubleshooting guides, and resources to make the most of our platform.
            </p>

            <h4 style={styles.modalSubtitle2}>📚 Getting Started</h4>
            <div style={styles.helpGrid}>
              <div style={styles.helpCard}>
                <div style={styles.helpIcon}>📝</div>
                <div style={styles.helpTitle}>How to Create an Account</div>
                <div style={styles.helpDesc}>
                  Step-by-step guide to creating your NiteSea account and setting up your profile.
                </div>
              </div>
              <div style={styles.helpCard}>
                <div style={styles.helpIcon}>🖼️</div>
                <div style={styles.helpTitle}>First Image Upload</div>
                <div style={styles.helpDesc}>
                  Learn how to upload, resize, and optimize your first image on the platform.
                </div>
              </div>
              <div style={styles.helpCard}>
                <div style={styles.helpIcon}>🔧</div>
                <div style={styles.helpTitle}>Platform Navigation</div>
                <div style={styles.helpDesc}>
                  Discover all features and tools available on the NiteSea dashboard.
                </div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>💡 Popular Help Topics</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🖼️</span>
                How to resize images for social media
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🔄</span>
                Converting images between formats
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📊</span>
                Batch processing multiple images
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🤖</span>
                Using AI-powered smart cropping
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🔒</span>
                Account security and privacy settings
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>🔧 Troubleshooting</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🚀</span>
                Image upload failed - Common solutions
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>⚡</span>
                Slow processing - What to do
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📱</span>
                Mobile app troubleshooting
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🔑</span>
                Password reset and account recovery
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>📞 Contact Support</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📧</span>
                <strong>Contact Us</strong> - Get in touch with our support team
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>💬</span>
                Live Chat: Available 24/7
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📱</span>
                Phone: (+92) 324-6887658
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🌍</span>
                Community Forum: Community support
              </li>
            </ul>

            <h4 style={styles.modalSubtitle2}>📚 Resources</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📖</span>
                Video Tutorials on YouTube
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📄</span>
                API Documentation for Developers
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>📋</span>
                Best Practices Guide
              </li>
              <li style={styles.modalListItem}>
                <span style={styles.modalBadge}>🎓</span>
                Free Online Courses
              </li>
            </ul>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "terms") {
      setModalContent({
        title: "📜 Terms of Service",
        subtitle: "Last Updated: January 2026",
        content: (
          <>
            <p style={styles.modalText}>
              Welcome to NiteSea. By using our platform, you agree to comply with and be bound by the following terms and conditions. 
              Please read them carefully before using our services.
            </p>

            <h4 style={styles.modalSubtitle2}>1. Acceptance of Terms</h4>
            <p style={styles.modalText}>
              By accessing or using the NiteSea platform, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h4 style={styles.modalSubtitle2}>2. User Accounts</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>You must be 13 years or older to create an account</li>
              <li style={styles.modalListItem}>You are responsible for maintaining the security of your account</li>
              <li style={styles.modalListItem}>You agree to provide accurate and complete information</li>
              <li style={styles.modalListItem}>You are solely responsible for all activities under your account</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>3. User Content</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>You retain ownership of your content</li>
              <li style={styles.modalListItem}>You grant NiteSea a license to use your content</li>
              <li style={styles.modalListItem}>You are responsible for the legality of your content</li>
              <li style={styles.modalListItem}>We reserve the right to remove inappropriate content</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>4. Intellectual Property</h4>
            <p style={styles.modalText}>
              All content on the NiteSea platform, including text, graphics, logos, and software, 
              is the property of NiteSea and protected by copyright and intellectual property laws.
            </p>

            <h4 style={styles.modalSubtitle2}>5. User Conduct</h4>
            <p style={styles.modalText}>
              You agree not to use the platform for any unlawful purpose or in any way that could 
              damage, disable, or impair the service. Prohibited activities include:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>❌ Harassment or abusive behavior</li>
              <li style={styles.modalListItem}>❌ Posting illegal or inappropriate content</li>
              <li style={styles.modalListItem}>❌ Attempting to gain unauthorized access</li>
              <li style={styles.modalListItem}>❌ Interfering with other users' experience</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>6. Privacy</h4>
            <p style={styles.modalText}>
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your personal information.
            </p>

            <h4 style={styles.modalSubtitle2}>7. Payment & Subscriptions</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>All payments are processed securely</li>
              <li style={styles.modalListItem}>Subscriptions are billed on a recurring basis</li>
              <li style={styles.modalListItem}>You may cancel your subscription at any time</li>
              <li style={styles.modalListItem}>Refunds are subject to our refund policy</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>8. Termination</h4>
            <p style={styles.modalText}>
              We reserve the right to terminate or suspend your account at any time for violations 
              of these terms or for any other reason. You may also delete your account at any time.
            </p>

            <h4 style={styles.modalSubtitle2}>9. Disclaimer of Warranties</h4>
            <p style={styles.modalText}>
              The platform is provided "as is" without warranties of any kind. We do not guarantee 
              that the service will be uninterrupted, error-free, or secure.
            </p>

            <h4 style={styles.modalSubtitle2}>10. Limitation of Liability</h4>
            <p style={styles.modalText}>
              NiteSea shall not be liable for any indirect, incidental, or consequential damages 
              arising from your use of the platform.
            </p>

            <h4 style={styles.modalSubtitle2}>11. Changes to Terms</h4>
            <p style={styles.modalText}>
              We reserve the right to update these terms at any time. Continued use of the platform 
              constitutes acceptance of the updated terms.
            </p>

            <h4 style={styles.modalSubtitle2}>12. Contact Us</h4>
            <p style={styles.modalText}>
              If you have any questions about these Terms of Service, please <strong>Contact Us</strong>.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "privacy") {
      setModalContent({
        title: "🔒 Privacy Policy",
        subtitle: "Last Updated: January 2026",
        content: (
          <>
            <p style={styles.modalText}>
              At NiteSea, we take your privacy seriously. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h4 style={styles.modalSubtitle2}>1. Information We Collect</h4>
            <p style={styles.modalText}>
              <strong>Personal Data:</strong> We may collect personal information such as your name, 
              email address, phone number, and profile information when you create an account.
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>📱 Account registration information</li>
              <li style={styles.modalListItem}>📧 Email address and communication preferences</li>
              <li style={styles.modalListItem}>🖼️ Images and content you upload</li>
              <li style={styles.modalListItem}>💳 Payment and billing information</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>2. How We Use Your Information</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>✅ Provide and improve our services</li>
              <li style={styles.modalListItem}>✅ Process transactions and payments</li>
              <li style={styles.modalListItem}>✅ Send you updates and notifications</li>
              <li style={styles.modalListItem}>✅ Personalize your experience</li>
              <li style={styles.modalListItem}>✅ Respond to your inquiries and support requests</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>3. Data Security</h4>
            <p style={styles.modalText}>
              We implement appropriate technical and organizational measures to protect your 
              personal data against unauthorized access, alteration, or disclosure.
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>🔐 Industry-standard encryption</li>
              <li style={styles.modalListItem}>🛡️ Regular security audits</li>
              <li style={styles.modalListItem}>📋 Compliance with data protection regulations</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>4. Data Sharing</h4>
            <p style={styles.modalText}>
              We do not sell your personal information. We may share your data with:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>Service providers and partners</li>
              <li style={styles.modalListItem}>Legal authorities when required by law</li>
              <li style={styles.modalListItem}>Third parties with your consent</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>5. Your Rights</h4>
            <p style={styles.modalText}>
              You have the right to access, modify, or delete your personal data. You can manage 
              your privacy settings from your account dashboard.
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>📖 Access your data at any time</li>
              <li style={styles.modalListItem}>✏️ Update or correct your information</li>
              <li style={styles.modalListItem}>🗑️ Request data deletion</li>
              <li style={styles.modalListItem}>🔄 Export your data</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>6. Cookies</h4>
            <p style={styles.modalText}>
              We use cookies to enhance your experience and analyze platform usage. You can 
              control cookie preferences through your browser settings.
            </p>

            <h4 style={styles.modalSubtitle2}>7. Third-Party Services</h4>
            <p style={styles.modalText}>
              Our platform may contain links to third-party services. We are not responsible for 
              their privacy practices. Please review their privacy policies before using them.
            </p>

            <h4 style={styles.modalSubtitle2}>8. Children's Privacy</h4>
            <p style={styles.modalText}>
              NiteSea is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected such information, 
              please contact us immediately.
            </p>

            <h4 style={styles.modalSubtitle2}>9. International Data Transfers</h4>
            <p style={styles.modalText}>
              Your information may be transferred to and processed in countries other than your 
              country of residence. We take appropriate measures to ensure your data is protected.
            </p>

            <h4 style={styles.modalSubtitle2}>10. Changes to Policy</h4>
            <p style={styles.modalText}>
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes through the platform or via email.
            </p>

            <h4 style={styles.modalSubtitle2}>11. Contact Us</h4>
            <p style={styles.modalText}>
              If you have any questions or concerns about this Privacy Policy, please <strong>Contact Us</strong>.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "cookies") {
      setModalContent({
        title: "🍪 Cookie Policy",
        subtitle: "Last Updated: January 2026",
        content: (
          <>
            <p style={styles.modalText}>
              This Cookie Policy explains how NiteSea uses cookies and similar technologies 
              to recognize you when you visit our platform. It explains what these technologies 
              are and why we use them, as well as your rights to control our use of them.
            </p>

            <h4 style={styles.modalSubtitle2}>1. What Are Cookies?</h4>
            <p style={styles.modalText}>
              Cookies are small text files that are stored on your device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information 
              to the owners of the site.
            </p>

            <h4 style={styles.modalSubtitle2}>2. How We Use Cookies</h4>
            <p style={styles.modalText}>
              We use cookies for the following purposes:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>✅ <strong>Essential Cookies:</strong> Required for the platform to function properly</li>
              <li style={styles.modalListItem}>✅ <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li style={styles.modalListItem}>✅ <strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
              <li style={styles.modalListItem}>✅ <strong>Marketing Cookies:</strong> Deliver relevant advertisements to you</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>3. Types of Cookies We Use</h4>
            <div style={styles.techGrid}>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>🔐</div>
                <div style={styles.techLabel}>Essential</div>
                <div style={{...styles.techLabel, fontSize: "11px", color: "rgba(255,255,255,0.4)"}}>Session & Security</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>⚙️</div>
                <div style={styles.techLabel}>Preference</div>
                <div style={{...styles.techLabel, fontSize: "11px", color: "rgba(255,255,255,0.4)"}}>Settings & Language</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>📊</div>
                <div style={styles.techLabel}>Analytics</div>
                <div style={{...styles.techLabel, fontSize: "11px", color: "rgba(255,255,255,0.4)"}}>Usage & Performance</div>
              </div>
              <div style={styles.techCard}>
                <div style={styles.techIcon}>📢</div>
                <div style={styles.techLabel}>Marketing</div>
                <div style={{...styles.techLabel, fontSize: "11px", color: "rgba(255,255,255,0.4)"}}>Advertising & Targeting</div>
              </div>
            </div>

            <h4 style={styles.modalSubtitle2}>4. Third-Party Cookies</h4>
            <p style={styles.modalText}>
              We may also use third-party cookies from trusted partners for analytics and marketing purposes:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>Google Analytics - Website traffic analysis</li>
              <li style={styles.modalListItem}>Facebook Pixel - Advertising optimization</li>
              <li style={styles.modalListItem}>Twitter Analytics - Social media tracking</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>5. How to Control Cookies</h4>
            <p style={styles.modalText}>
              You can control and manage cookies in various ways. Most browsers allow you to:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>🔍 View cookies stored on your device</li>
              <li style={styles.modalListItem}>🗑️ Delete cookies</li>
              <li style={styles.modalListItem}>🚫 Block cookies from specific websites</li>
              <li style={styles.modalListItem}>⚙️ Change your cookie preferences</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>6. Cookie Duration</h4>
            <p style={styles.modalText}>
              Cookies can be either session-based or persistent:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>⏱️ <strong>Session Cookies:</strong> Temporary and deleted when you close your browser</li>
              <li style={styles.modalListItem}>📅 <strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>7. Changes to This Policy</h4>
            <p style={styles.modalText}>
              We may update this Cookie Policy from time to time. We will notify you of any 
              significant changes through the platform or via email.
            </p>

            <h4 style={styles.modalSubtitle2}>8. Contact Us</h4>
            <p style={styles.modalText}>
              If you have any questions about our use of cookies, please <strong>Contact Us</strong>.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "gdpr") {
      setModalContent({
        title: "🛡️ GDPR Compliance",
        subtitle: "General Data Protection Regulation Compliance",
        content: (
          <>
            <p style={styles.modalText}>
              NiteSea is fully committed to protecting your privacy and complying with the 
              General Data Protection Regulation (GDPR) (EU) 2016/679. This page explains 
              how we comply with GDPR requirements.
            </p>

            <h4 style={styles.modalSubtitle2}>1. What is GDPR?</h4>
            <p style={styles.modalText}>
              The General Data Protection Regulation (GDPR) is a regulation in EU law on 
              data protection and privacy. It aims to give individuals control over their 
              personal data and simplify the regulatory environment for international business.
            </p>

            <h4 style={styles.modalSubtitle2}>2. Our Commitment</h4>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>✅ We fully comply with all GDPR requirements</li>
              <li style={styles.modalListItem}>✅ We protect your personal data with industry-standard security</li>
              <li style={styles.modalListItem}>✅ We are transparent about how we collect and use your data</li>
              <li style={styles.modalListItem}>✅ We respect your privacy rights</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>3. Data Protection Principles</h4>
            <p style={styles.modalText}>
              We adhere to the following GDPR data protection principles:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>📋 <strong>Lawfulness, Fairness, and Transparency:</strong> We process data lawfully and transparently</li>
              <li style={styles.modalListItem}>🎯 <strong>Purpose Limitation:</strong> We collect data for specific, legitimate purposes</li>
              <li style={styles.modalListItem}>📊 <strong>Data Minimization:</strong> We only collect data that is necessary</li>
              <li style={styles.modalListItem}>🔒 <strong>Data Security:</strong> We protect data with appropriate security measures</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>4. Your Rights Under GDPR</h4>
            <p style={styles.modalText}>
              Under GDPR, you have the following rights:
            </p>
            <ul style={styles.modalList}>
              <li style={styles.modalListItem}>📖 <strong>Right to Access:</strong> Request access to your personal data</li>
              <li style={styles.modalListItem}>✏️ <strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li style={styles.modalListItem}>🗑️ <strong>Right to Erasure:</strong> Request deletion of your data</li>
              <li style={styles.modalListItem}>⛔ <strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              <li style={styles.modalListItem}>🔄 <strong>Right to Data Portability:</strong> Request transfer of your data</li>
              <li style={styles.modalListItem}>❌ <strong>Right to Object:</strong> Object to processing of your data</li>
            </ul>

            <h4 style={styles.modalSubtitle2}>5. Data Processor and Controller</h4>
            <p style={styles.modalText}>
              <strong>Data Controller:</strong> NiteSea Inc. is the data controller for all personal data collected through our platform.
              <br />
              <strong>Data Processor:</strong> We use trusted third-party services as data processors.
            </p>

            <h4 style={styles.modalSubtitle2}>6. Data Retention</h4>
            <p style={styles.modalText}>
              We retain your personal data only for as long as necessary to provide our services 
              and fulfill the purposes outlined in this policy. Data is securely deleted when 
              no longer needed.
            </p>

            <h4 style={styles.modalSubtitle2}>7. International Data Transfers</h4>
            <p style={styles.modalText}>
              When transferring personal data outside the EEA, we ensure appropriate safeguards 
              are in place, including standard contractual clauses and adequacy decisions.
            </p>

            <h4 style={styles.modalSubtitle2}>8. Data Breach Notification</h4>
            <p style={styles.modalText}>
              In the event of a data breach, we will notify the relevant supervisory authority 
              within 72 hours and inform affected individuals without undue delay.
            </p>

            <h4 style={styles.modalSubtitle2}>9. Data Protection Officer (DPO)</h4>
            <p style={styles.modalText}>
              We have appointed a Data Protection Officer to oversee our compliance with GDPR:
              <br />
              <strong>Contact Us</strong> for DPO inquiries.
            </p>

            <h4 style={styles.modalSubtitle2}>10. Supervisory Authority</h4>
            <p style={styles.modalText}>
              You have the right to lodge a complaint with a supervisory authority if you believe 
              your data protection rights have been violated.
            </p>

            <h4 style={styles.modalSubtitle2}>11. Contact Us</h4>
            <p style={styles.modalText}>
              For any questions or concerns regarding GDPR compliance, please <strong>Contact Us</strong>.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else if (type === "sitemap") {
      setModalContent({
        title: "🗺️ Sitemap",
        subtitle: "Navigate Our Platform",
        content: (
          <>
            <p style={styles.modalText}>
              Welcome to the NiteSea sitemap. Use this page to quickly find what you're looking for 
              and navigate through our platform.
            </p>

            <div style={styles.sitemapGrid}>
              <div style={styles.sitemapColumn}>
                <div style={styles.sitemapTitle}>🏠 Main Pages</div>
                <button
                  onClick={() => { closeModal(); navigate("/"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Home
                </button>
                <button
                  onClick={() => { closeModal(); navigate("/about"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  About Us
                </button>
                <button
                  onClick={() => { closeModal(); navigate("/contact"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Contact Us
                </button>
              </div>

              <div style={styles.sitemapColumn}>
                <div style={styles.sitemapTitle}>🔐 Account</div>
                <button
                  onClick={() => { closeModal(); navigate("/login"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => { closeModal(); navigate("/signup"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div style={styles.sitemapColumn}>
                <div style={styles.sitemapTitle}>🆘 Support</div>
                <button
                  onClick={() => { closeModal(); openModal("help"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Help Center
                </button>
                <button
                  onClick={() => { closeModal(); openModal("faq"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  FAQ
                </button>
                <button
                  onClick={() => { closeModal(); openModal("community"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Community
                </button>
                <button
                  onClick={() => { closeModal(); openModal("press"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Press Kit
                </button>
              </div>

              <div style={styles.sitemapColumn}>
                <div style={styles.sitemapTitle}>⚖️ Legal</div>
                <button
                  onClick={() => { closeModal(); openModal("terms"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => { closeModal(); openModal("privacy"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => { closeModal(); openModal("cookies"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  Cookie Policy
                </button>
                <button
                  onClick={() => { closeModal(); openModal("gdpr"); }}
                  style={styles.sitemapLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, styles.sitemapLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, {
                      color: "rgba(255, 255, 255, 0.6)",
                      transform: "translateX(0)",
                    });
                  }}
                >
                  GDPR Compliance
                </button>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.closeButtonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    }
  };

  const closeModal = () => setModalContent(null);

  const footerSections = [
    {
      title: "Company",
      links: [
        { 
          label: "About Us", 
          action: () => openModal("about"),
          icon: "ℹ️"
        },
        { 
          label: "Careers", 
          action: () => openModal("careers"),
          icon: "💼",
          badge: "Hiring"
        },
        { 
          label: "News & Updates", 
          action: () => openModal("news"),
          icon: "📰",
          badge: "AR/VR"
        },
        { 
          label: "Press Kit", 
          action: () => openModal("press"),
          icon: "📸"
        },
      ],
    },
    {
      title: "Support",
      links: [
        { 
          label: "Help Center", 
          action: () => openModal("help"),
          icon: "🆘"
        },
        { 
          label: "Contact Us", 
          path: "/contact" 
        },
        { 
          label: "FAQ", 
          action: () => openModal("faq"),
          icon: "❓"
        },
        { 
          label: "Community", 
          action: () => openModal("community"),
          icon: "🌍"
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { 
          label: "Terms of Service", 
          action: () => openModal("terms"),
          icon: "📜"
        },
        { 
          label: "Privacy Policy", 
          action: () => openModal("privacy"),
          icon: "🔒"
        },
        { 
          label: "Cookie Policy", 
          action: () => openModal("cookies"),
          icon: "🍪"
        },
        { 
          label: "GDPR Compliance", 
          action: () => openModal("gdpr"),
          icon: "🛡️"
        },
      ],
    },
  ];

  // Render link or button based on whether it has an action or path
  const renderLink = (link, index) => {
    if (link.action) {
      return (
        <button
          key={index}
          onClick={link.action}
          style={{
            ...styles.link,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 0",
          }}
          onMouseEnter={(e) => {
            Object.assign(e.target.style, styles.linkHover);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.target.style, {
              color: "rgba(255, 255, 255, 0.6)",
              transform: "translateX(0)",
            });
          }}
        >
          {link.icon && <span>{link.icon}</span>}
          {link.label}
          {link.badge && <span style={styles.badge}>{link.badge}</span>}
        </button>
      );
    }
    return (
      <NavLink
        key={index}
        to={link.path}
        style={styles.link}
        onMouseEnter={(e) => {
          Object.assign(e.target.style, styles.linkHover);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.target.style, {
            color: "rgba(255, 255, 255, 0.6)",
            transform: "translateX(0)",
          });
        }}
      >
        {link.icon && <span style={{ marginRight: "6px" }}>{link.icon}</span>}
        {link.label}
      </NavLink>
    );
  };

  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.container}>
          {/* Brand Section */}
          <div style={styles.brand}>
            <NavLink to="/" style={styles.logo}>
              <img src="/logo192.png" width="38" height="38" alt="NiteSea Logo" />
              <span>NiteSea</span>
            </NavLink>
            <p style={styles.description}>
              Your trusted platform for seamless experiences. 
              Building the future of digital interaction.
            </p>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section, index) => (
            <div key={index} style={styles.section}>
              <h3 style={styles.title}>{section.title}</h3>
              {section.links.map((link, linkIndex) => renderLink(link, linkIndex))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottom}>
          <div style={styles.copyright}>
            © {currentYear} NiteSea. All rights reserved.
          </div>
          <div style={styles.bottomLinks}>
            <button
              onClick={() => openModal("terms")}
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.bottomLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  color: "rgba(255, 255, 255, 0.4)",
                });
              }}
            >
              Terms
            </button>
            <button
              onClick={() => openModal("privacy")}
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.bottomLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  color: "rgba(255, 255, 255, 0.4)",
                });
              }}
            >
              Privacy
            </button>
            <button
              onClick={() => openModal("cookies")}
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.bottomLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  color: "rgba(255, 255, 255, 0.4)",
                });
              }}
            >
              Cookies
            </button>
            <button
              onClick={() => openModal("sitemap")}
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.bottomLinkHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  color: "rgba(255, 255, 255, 0.4)",
                });
              }}
            >
              Sitemap
            </button>
            <span style={{ ...styles.bottomLink, cursor: "default" }}>
              🇺🇸 English
              <span style={styles.badge}>New</span>
            </span>
          </div>
        </div>

        {/* CSS for responsive design */}
        <style>{`
          @media (max-width: 768px) {
            .footer-container {
              grid-template-columns: 1fr 1fr !important;
              gap: 30px !important;
            }
          }

          @media (max-width: 480px) {
            .footer-container {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .bottom-bar {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .bottom-links {
              flex-wrap: wrap !important;
            }
          }
        `}</style>
      </footer>

      {/* Modal for all pages */}
      {modalContent && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ✕
            </button>
            <h2 style={styles.modalTitle}>{modalContent.title}</h2>
            {modalContent.subtitle && (
              <p style={styles.modalSubtitle}>{modalContent.subtitle}</p>
            )}
            {modalContent.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;