import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Check login status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "User");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName("");
    setIsDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%",
      background: "rgba(26, 26, 46, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      boxSizing: "border-box",
      overflowX: "hidden",
    },

    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
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
      whiteSpace: "nowrap",
    },

    desktopLinks: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "nowrap",
    },

    hamburger: {
      display: "none",
      flexDirection: "column",
      gap: "5px",
      cursor: "pointer",
      padding: "4px",
      background: "none",
      border: "none",
      outline: "none",
    },

    hamburgerLine: {
      width: "25px",
      height: "2px",
      background: "#eaeaea",
      borderRadius: "2px",
      transition: "all 0.3s ease",
      transformOrigin: "center",
    },

    link: {
      color: "#eaeaea",
      textDecoration: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "15px",
      transition: "all 0.2s ease",
      fontWeight: "500",
      whiteSpace: "nowrap",
    },

    active: {
      color: "#00d9ff",
      backgroundColor: "rgba(0, 217, 255, 0.12)",
    },

    loginButton: {
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      color: "#fff",
      padding: "8px 20px",
      borderRadius: "20px",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 217, 255, 0.3)",
      textDecoration: "none",
      fontSize: "15px",
    },

    userTrigger: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "6px 16px 6px 6px",
      borderRadius: "30px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },

    userAvatar: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "600",
      fontSize: "14px",
      flexShrink: 0,
    },

    userName: {
      color: "#eaeaea",
      fontSize: "14px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    },

    userChevron: {
      color: "rgba(255,255,255,0.4)",
      fontSize: "12px",
      transition: "transform 0.3s ease",
      marginLeft: "4px",
    },

    chevronOpen: {
      transform: "rotate(180deg)",
    },

    // Mobile Menu
    mobileMenuOverlay: {
      display: "none",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 997,
    },

    mobileMenu: {
      display: "none",
      position: "fixed",
      top: "72px",
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(26, 26, 46, 0.98)",
      backdropFilter: "blur(20px)",
      zIndex: 998,
      padding: "24px 20px",
      overflowY: "auto",
      transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },

    mobileMenuOpen: {
      transform: "translateX(0)",
    },

    // Mobile User Profile
    mobileUserProfile: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "20px",
    },

    mobileAvatar: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "700",
      fontSize: "22px",
      flexShrink: 0,
    },

    mobileUserInfo: {
      flex: 1,
    },

    mobileUserName: {
      color: "#fff",
      fontSize: "17px",
      fontWeight: "600",
    },

    mobileUserEmail: {
      color: "rgba(255,255,255,0.5)",
      fontSize: "13px",
      marginTop: "2px",
    },

    mobileUserStatus: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "4px",
      fontSize: "12px",
      color: "#00d9ff",
    },

    mobileStatusDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#00d9ff",
      display: "inline-block",
      animation: "pulse 2s infinite",
    },

    // Mobile Navigation Items
    mobileNavItems: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },

    mobileNavSection: {
      marginBottom: "16px",
    },

    mobileSectionTitle: {
      color: "rgba(255,255,255,0.3)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: "600",
      padding: "8px 16px",
      marginBottom: "4px",
    },

    mobileLink: {
      color: "#eaeaea",
      textDecoration: "none",
      padding: "14px 16px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },

    mobileLinkActive: {
      color: "#00d9ff",
      backgroundColor: "rgba(0, 217, 255, 0.12)",
    },

    mobileLinkIcon: {
      fontSize: "20px",
      width: "28px",
      textAlign: "center",
    },

    mobileLoginButton: {
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      color: "#fff",
      padding: "14px 20px",
      borderRadius: "12px",
      fontWeight: "600",
      textDecoration: "none",
      textAlign: "center",
      fontSize: "16px",
      marginTop: "12px",
      display: "block",
      boxShadow: "0 4px 15px rgba(0, 217, 255, 0.3)",
    },

    mobileLogout: {
      color: "#ff4757",
      padding: "14px 16px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "500",
      border: "1px solid rgba(255, 71, 87, 0.2)",
      background: "rgba(255, 71, 87, 0.05)",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
      transition: "all 0.2s ease",
      marginTop: "8px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },

    // Desktop Dropdown - Only Settings & Logout
    dropdownWrapper: {
      position: "fixed",
      top: "72px",
      right: "20px",
      zIndex: 999,
      background: "rgba(26, 26, 46, 0.98)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
      minWidth: "200px",
      transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
      opacity: isDropdownOpen ? 1 : 0,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      visibility: isDropdownOpen ? "visible" : "hidden",
      pointerEvents: isDropdownOpen ? "auto" : "none",
      transformOrigin: "top right",
      overflow: "hidden",
    },

    dropdownList: {
      padding: "8px",
      margin: 0,
      listStyle: "none",
    },

    dropdownItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 14px",
      borderRadius: "8px",
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      cursor: "pointer",
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
    },

    dropdownItemIcon: {
      fontSize: "16px",
      width: "20px",
      textAlign: "center",
      flexShrink: 0,
    },

    logoutItem: {
      color: "#ff4757",
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      marginTop: "4px",
      paddingTop: "12px",
    },

    userInfo: {
      padding: "12px 14px 16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      marginBottom: "4px",
    },

    userInfoName: {
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
    },

    userInfoEmail: {
      color: "rgba(255,255,255,0.4)",
      fontSize: "12px",
      marginTop: "2px",
    },
  };

  const styleLink = ({ isActive }) => ({
    ...styles.link,
    ...(isActive ? styles.active : {}),
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Mobile navigation items - Removed Dashboard and Profile
  const mobileMainNav = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/about", icon: "ℹ️", label: "About" },
    { path: "/contact", icon: "📞", label: "Contact" },
  ];

  return (
    <>
      <nav style={styles.nav} aria-label="Main navigation">
        <div style={styles.container}>
          <NavLink to="/" style={styles.logo} aria-label="NiteSea Home">
            <img
              src="/logo192.png"
              width="38"
              height="38"
              alt="NiteSea Logo"
            />
            <span>NiteSea</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="desktop-links" style={styles.desktopLinks}>
            <NavLink to="/" style={styleLink} end>
              Home
            </NavLink>

            <NavLink to="/about" style={styleLink}>
              About
            </NavLink>

            <NavLink to="/contact" style={styleLink}>
              Contact
            </NavLink>

            {isLoggedIn ? (
              <div 
                ref={triggerRef}
                style={styles.userTrigger}
                onClick={toggleDropdown}
              >
                <div style={styles.userAvatar}>
                  {getInitials(userName)}
                </div>
                <span style={styles.userName}>{userName}</span>
                <span style={{
                  ...styles.userChevron,
                  ...(isDropdownOpen ? styles.chevronOpen : {})
                }}>
                  ▼
                </span>
              </div>
            ) : (
              <NavLink to="/login" style={styles.loginButton}>
                Login
              </NavLink>
            )}
          </div>

          {/* Hamburger Menu - Mobile */}
          <button 
            ref={hamburgerRef}
            className="hamburger"
            style={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span style={{
              ...styles.hamburgerLine,
              transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)"
            }}></span>
            <span style={{
              ...styles.hamburgerLine,
              opacity: isMobileMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              ...styles.hamburgerLine,
              transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)"
            }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          style={styles.mobileMenuOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="mobile-menu"
        style={{
          ...styles.mobileMenu,
          ...(isMobileMenuOpen ? styles.mobileMenuOpen : {})
        }}
      >
        {/* User Profile - Only when logged in */}
        {isLoggedIn && (
          <div style={styles.mobileUserProfile}>
            <div style={styles.mobileAvatar}>
              {getInitials(userName)}
            </div>
            <div style={styles.mobileUserInfo}>
              <div style={styles.mobileUserName}>{userName}</div>
              <div style={styles.mobileUserEmail}>
                {localStorage.getItem("userEmail") || "user@example.com"}
              </div>
              <div style={styles.mobileUserStatus}>
                <span style={styles.mobileStatusDot}></span>
                Online
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation - Only Home, About, Contact */}
        <div style={styles.mobileNavSection}>
          <div style={styles.mobileSectionTitle}>Navigation</div>
          {mobileMainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.mobileLink,
                ...(isActive ? styles.mobileLinkActive : {}),
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={styles.mobileLinkIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Settings - Only when logged in */}
        {isLoggedIn && (
          <div style={styles.mobileNavSection}>
            <div style={styles.mobileSectionTitle}>Account</div>
            <NavLink
              to="/dashboard/settings"
              style={({ isActive }) => ({
                ...styles.mobileLink,
                ...(isActive ? styles.mobileLinkActive : {}),
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={styles.mobileLinkIcon}>⚙️</span>
              <span>Settings</span>
            </NavLink>
          </div>
        )}

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            style={styles.mobileLogout}
          >
            <span style={styles.mobileLinkIcon}>🚪</span>
            <span>Logout</span>
          </button>
        ) : (
          <NavLink 
            to="/login" 
            style={styles.mobileLoginButton}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Desktop Dropdown - Only Settings & Logout */}
      <div 
        ref={dropdownRef}
        style={styles.dropdownWrapper}
      >
        <div style={styles.dropdownList}>
          {/* User Info */}
          <div style={styles.userInfo}>
            <div style={styles.userInfoName}>{userName}</div>
            <div style={styles.userInfoEmail}>
              {localStorage.getItem("userEmail") || "user@example.com"}
            </div>
          </div>

          {/* Settings */}
          <NavLink
            to="/dashboard/settings"
            style={({ isActive }) => ({
              ...styles.dropdownItem,
              ...(isActive ? { background: "rgba(0,217,255,0.08)", color: "#00d9ff" } : {}),
            })}
            onClick={() => setIsDropdownOpen(false)}
          >
            <span style={styles.dropdownItemIcon}>⚙️</span>
            <span>Settings</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              ...styles.dropdownItem,
              ...styles.logoutItem,
            }}
          >
            <span style={styles.dropdownItemIcon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* CSS for responsive design */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Desktop styles */
        @media (min-width: 769px) {
          .mobile-menu,
          .mobile-overlay {
            display: none !important;
          }
          .hamburger {
            display: none !important;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
          .mobile-menu {
            display: block !important;
          }
          .mobile-overlay {
            display: block !important;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px 16px !important;
          }
          .logo {
            font-size: 18px !important;
          }
          .logo img {
            width: 32px !important;
            height: 32px !important;
          }
          .mobile-menu {
            padding: 16px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;