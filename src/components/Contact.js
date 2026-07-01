import React from "react";
import Helmet from "./Helmet";

const Contact = () => {
  const phoneNumber = "923246887658";
  const prefillMessage = "Hi I have a question about NiteSea";

  const whatsappWithMessage =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefillMessage)}`;

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "3rem 1rem",
        textAlign: "center",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Helmet
        title="Contact NiteSea"
        description="Get in touch with NiteSea support via WhatsApp."
        url="https://nitesea.com/contact"
        image="https://nitesea.com/logo512.png"
      />

      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "0.5rem",
          color: "#1a1a2e",
        }}
      >
        Contact Us
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "2.5rem",
          fontSize: "1.1rem",
        }}
      >
        Reach out anytime. We'd love to hear from you!
      </p>

      {/* WhatsApp - Main Contact Method */}
      <a
        href={whatsappWithMessage}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          display: "block",
          maxWidth: "400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "3rem 2rem",
            backgroundColor: "#25D366",
            borderRadius: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 30px rgba(37, 211, 102, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(37, 211, 102, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.3)";
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>💬</div>
          <h2 style={{ color: "white", marginBottom: "0.5rem", fontSize: "1.8rem" }}>
            Chat on WhatsApp
          </h2>
          <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "1.1rem" }}>
            Click to chat instantly with our team
          </p>
          <div
            style={{
              marginTop: "1rem",
              display: "inline-block",
              background: "rgba(255,255,255,0.2)",
              padding: "0.5rem 1.5rem",
              borderRadius: "50px",
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            +92 324 6887658
          </div>
        </div>
      </a>

      {/* Quick Response Time */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#666",
            fontSize: "0.95rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>⏱️</span>
          <span>Response within 24 hours</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#666",
            fontSize: "0.95rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🌍</span>
          <span>Available worldwide</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#666",
            fontSize: "0.95rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>💬</span>
          <span>Instant messaging</span>
        </div>
      </div>

      {/* Alternative Contact Note */}
      <p
        style={{
          marginTop: "2.5rem",
          color: "#999",
          fontSize: "0.85rem",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        💡 For urgent inquiries, WhatsApp is the fastest way to reach us.
        We're here to help with any questions or concerns.
      </p>
    </main>
  );
};

export default Contact;