import React from "react";
import Helmet from "./Helmet";

const About = () => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "3rem 2rem",
    },
    section: {
      marginBottom: "3rem",
    },
    title: {
      color: "#1a1a2e",
      marginBottom: "1rem",
      fontSize: "2rem",
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    },
    featureCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
    },
    linkBox: {
      marginTop: "2rem",
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    link: {
      color: "#00d9ff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      {/* SEO META */}
      <Helmet
        title="About NiteSea - Free Online Image Resizer Tool"
        description="Learn about NiteSea, a free browser-based image resizer. Fast, secure, and no uploads required."
        url="https://nitesea.com/about"
        image="https://nitesea.com/logo512.png"
      />

      {/* SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About NiteSea",
          url: "https://nitesea.com/about",
        })}
      </script>

      {/* TITLE SECTION */}
      <div style={styles.section}>
        <h1 style={styles.title}>About NiteSea</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666" }}>
          NiteSea is a powerful, free online tool that allows you to resize images
          quickly and easily. All processing happens in your browser — no uploads
          to any server, keeping your images private and secure.
        </p>
      </div>

      {/* FEATURES */}
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
            <p>No uploads — everything stays on your device</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💯</div>
            <h3>Free Forever</h3>
            <p>No hidden costs or watermarks</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={styles.section}>
        <h2 style={styles.title}>How It Works</h2>

        <ol style={{ lineHeight: "2", fontSize: "1.1rem", color: "#666" }}>
          <li>Upload your image using the file picker</li>
          <li>Set width and height dimensions</li>
          <li>Choose format and quality</li>
          <li>Click resize and download your image</li>
        </ol>
      </div>

      {/* FAQ SECTION (VERY IMPORTANT FOR SEO) */}
      <div style={styles.section}>
        <h2 style={styles.title}>Frequently Asked Questions</h2>

        <h3>Is NiteSea free to use?</h3>
        <p>Yes, it is completely free forever.</p>

        <h3>Do you upload images to servers?</h3>
        <p>No, all processing happens in your browser.</p>

        <h3>Is my data safe?</h3>
        <p>Yes, your images never leave your device.</p>
      </div>

      {/* INTERNAL LINKS (IMPORTANT FOR SITELINKS) */}
      <div style={styles.linkBox}>
        <a href="/" style={styles.link}>
          Home
        </a>
        <a href="/contact" style={styles.link}>
          Contact
        </a>
      </div>
    </div>
  );
};

export default About;