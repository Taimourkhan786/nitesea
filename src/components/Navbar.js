import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navStyles = {
    nav: {
      backgroundColor: "#1a1a2e",
      padding: "1rem 2rem",
      position: "sticky",
      top: 0,
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
    },
    active: {
      color: "#00d9ff",
      backgroundColor: "rgba(0,217,255,0.1)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#00d9ff",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "20px",
    },
  };

  const styleLink = ({ isActive }) => ({
    ...navStyles.link,
    ...(isActive ? navStyles.active : {}),
  });

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>

        {/* LOGO */}
        <NavLink to="/" style={navStyles.logo}>
          <img src="/logo192.png" width="40" alt="logo" />
          NiteSea
        </NavLink>

        {/* LINKS */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <NavLink to="/" style={styleLink}>
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