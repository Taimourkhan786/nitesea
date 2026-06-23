import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%",               // ✅ FULL WIDTH FIX
      background: "rgba(26, 26, 46, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      boxSizing: "border-box",     // ✅ prevents overflow
      overflowX: "hidden",         // ❌ prevents horizontal scroll
    },

    container: {
      width: "100%",               // ✅ full width container
      maxWidth: "100%",            // ❌ remove limit
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#00d9ff",
      fontWeight: "700",
      fontSize: "20px",
      textDecoration: "none",
      whiteSpace: "nowrap",        // ✅ prevents breaking
    },

    links: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "nowrap",          // ❌ no wrapping overflow
    },

    link: {
      color: "#eaeaea",
      textDecoration: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "15px",
      transition: "all 0.2s ease",
      fontWeight: "500",
      whiteSpace: "nowrap",        // ✅ prevents text breaking
    },

    active: {
      color: "#00d9ff",
      backgroundColor: "rgba(0, 217, 255, 0.12)",
    },
  };

  const styleLink = ({ isActive }) => ({
    ...styles.link,
    ...(isActive ? styles.active : {}),
  });

  return (
    <nav style={styles.nav} aria-label="Main navigation">
      <div style={styles.container}>

        {/* LOGO */}
        <NavLink to="/" style={styles.logo} aria-label="NiteSea Home">
          <img
            src="/logo192.png"
            width="38"
            height="38"
            alt="NiteSea Logo"
          />
          <span>NiteSea</span>
        </NavLink>

        {/* LINKS */}
        <div style={styles.links}>
          <NavLink to="/" style={styleLink} end>
            Home
          </NavLink>

          <NavLink to="/about" style={styleLink}>
            About
          </NavLink>

          <NavLink to="/contact" style={styleLink}>
            Contact
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;